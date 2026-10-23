param([string]$BaseUrl = 'http://localhost:5035', [switch]$IncludeWrites)
$ErrorActionPreference = 'Stop'
function Assert-Check($Condition, $Label) { if (!$Condition) { throw "Failed: $Label" }; Write-Output "PASS $Label" }
function Get-Json($Path) { return (Invoke-WebRequest ($BaseUrl + $Path)).Content | ConvertFrom-Json -NoEnumerate }
$health = Get-Json '/health/ready'
Assert-Check ($health.status -eq 'ready') 'PostgreSQL readiness'
$airports = Get-Json '/API/Admin/Airport'
Assert-Check ($airports.Count -ge 13) 'Airport inventory'
$operators = Get-Json '/API/Admin/Operator'
Assert-Check ($operators.Count -ge 3) 'Operator inventory'
$flights = Get-Json '/API/Admin/Airport/Flight'
Assert-Check ($flights.Count -ge 32) 'Flight inventory'
$date = (Get-Date).AddDays(7).ToString('dd/MM/yyyy', [Globalization.CultureInfo]::InvariantCulture)
$return = (Get-Date).AddDays(10).ToString('dd/MM/yyyy', [Globalization.CultureInfo]::InvariantCulture)
function Search-Flights($Itinerary, $Trip) {
  Get-Json ('/API/SerachFlight?tripType=' + $Trip + '&paxType=A-1_C-0_I-0&cabinClass=Economy&itinerary=' + [Uri]::EscapeDataString($Itinerary))
}
$one = Search-Flights "MAA-DEL-$date" 'O'
Assert-Check ($one.Count -ge 2) 'One-way direct alternatives'
$connecting = Search-Flights "MAA-GAU-$date" 'O'
Assert-Check (@($connecting | Where-Object { $_.Count -ge 2 }).Count -gt 0) 'Connecting flight search'
$round = Search-Flights "MAA-DEL-${date}_$return" 'R'
Assert-Check ($round.Count -eq 2 -and $round[0].Count -gt 0 -and $round[1].Count -gt 0) 'Round-trip outbound and return'
$multi = Search-Flights "MAA-DEL-${date}_DEL-BOM-$return" 'M'
Assert-Check ($multi.Count -eq 2 -and $multi[0].Count -gt 0 -and $multi[1].Count -gt 0) 'Multicity leg results'
if ($IncludeWrites) {
  if (!$env:AdminEmail -or !$env:AdminPassword) { throw 'Set admin credentials privately in process environment first.' }
  $loginBody = @{ email=$env:AdminEmail; password=$env:AdminPassword } | ConvertTo-Json
  $login = Invoke-RestMethod "$BaseUrl/API/Auth/login" -Method Post -ContentType 'application/json' -Body $loginBody
  $headers = @{ Authorization='Bearer ' + $login.idToken }
  Assert-Check ([bool]$login.idToken) 'Admin authentication'
  $anonymous = Invoke-WebRequest "$BaseUrl/API/Admin/Airport" -Method Post -ContentType 'application/json' -Body '{"airportName":"Rejected","abbreviation":"ZZZ"}' -SkipHttpErrorCheck
  Assert-Check ([int]$anonymous.StatusCode -eq 401) 'Anonymous mutations blocked'
  $created = $false
  try {
    $null = Invoke-RestMethod "$BaseUrl/API/Admin/Airport" -Method Post -Headers $headers -ContentType 'application/json' -Body '{"airportName":"Demo Validation Airport","abbreviation":"ZZZ"}'
    $created = $true
    $null = Invoke-RestMethod "$BaseUrl/API/Admin/Airport/ZZZ" -Method Patch -Headers $headers -ContentType 'application/json-patch+json' -Body '[{"op":"replace","path":"/airportName","value":"Demo Updated Airport"}]'
    Assert-Check ((Get-Json '/API/Admin/Airport/ZZZ').airportName -eq 'Demo Updated Airport') 'Admin airport create and update persisted'
  } finally {
    if ($created) { $null = Invoke-RestMethod "$BaseUrl/API/Admin/Airport/ZZZ" -Method Delete -Headers $headers }
  }
  Assert-Check ((Get-Json '/API/Admin/Airport').Count -eq $airports.Count) 'Admin test cleanup'
  $bookingBody = @{ phoneNumber='0000000000'; passengerDetails=@(@{name='Demo Smoke Passenger';age=30;gender='Male'}) } | ConvertTo-Json -Depth 4
  $reference = Invoke-RestMethod "$BaseUrl/API/Booking" -Method Post -ContentType 'application/json' -Body $bookingBody
  Assert-Check ([bool]$reference) 'Synthetic booking returns confirmation reference'
}
Write-Output 'API verification completed.'
