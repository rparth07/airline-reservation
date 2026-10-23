param([string]$BaseUrl='https://rparth07-airline-api.onrender.com')
$ErrorActionPreference='Stop'
$login=Invoke-RestMethod "$BaseUrl/API/Auth/login" -Method Post -ContentType application/json -Body (@{email=$env:AdminEmail;password=$env:AdminPassword}|ConvertTo-Json)
$headers=@{Authorization='Bearer '+$login.idToken}
$operator='Demo Validation Air'
$flight='DEMO-TEST-9001'
$operatorCreated=$false
$flightCreated=$false
try {
  $operators=@(Invoke-RestMethod "$BaseUrl/API/Admin/Operator")
  $flights=@(Invoke-RestMethod "$BaseUrl/API/Admin/Airport/Flight")
  if($operators.companyName -contains $operator -or $flights.flightNumber -contains $flight) { throw 'Validation fixture already exists; leaving it untouched.' }
  $null=Invoke-RestMethod "$BaseUrl/API/Admin/Operator" -Method Post -Headers $headers -ContentType application/json -Body (@{companyName=$operator;baseFare=1000;tax=5;convenience=100}|ConvertTo-Json)
  $operatorCreated=$true
  $operatorPath="$BaseUrl/API/Admin/Operator/$([Uri]::EscapeDataString($operator))"
  $null=Invoke-RestMethod $operatorPath -Method Patch -Headers $headers -ContentType application/json-patch+json -Body '[{"op":"replace","path":"/baseFare","value":1200}]'
  if((Invoke-RestMethod $operatorPath).baseFare -ne 1200) { throw 'Operator update did not persist' }
  Write-Output 'PASS operator create and update'
  $data=@{flightNumber=$flight;flightOperatorName=$operator;totalSeatEconomy=120;totalSeatBusiness=12;seatingFormatEconomy=0;seatingFormatBusiness=0;operatingDays=0;sourceDepartureTime='12:00:00';destinationArrivalTime='15:00:00';sourceCity='Chennai';destinationCity='Delhi';distance=1750;charges=2000}
  $null=Invoke-RestMethod "$BaseUrl/API/Admin/Airport/Flight" -Method Post -Headers $headers -ContentType application/json -Body ($data|ConvertTo-Json)
  $flightCreated=$true
  $flightPath="$BaseUrl/API/Admin/Airport/Flight/$flight"
  $null=Invoke-RestMethod $flightPath -Method Patch -Headers $headers -ContentType application/json-patch+json -Body '[{"op":"replace","path":"/operatingDays","value":1}]'
  if((Invoke-RestMethod $flightPath).operatingDays -ne 1) { throw 'Flight update did not persist' }
  Write-Output 'PASS flight create and update'
} finally {
  if($flightCreated) { $null=Invoke-RestMethod "$BaseUrl/API/Admin/Airport/Flight/$flight" -Method Delete -Headers $headers }
  if($operatorCreated) { $null=Invoke-RestMethod "$BaseUrl/API/Admin/Operator/$([Uri]::EscapeDataString($operator))" -Method Delete -Headers $headers }
}
if(@(Invoke-RestMethod "$BaseUrl/API/Admin/Operator").Count -ne $operators.Count -or @(Invoke-RestMethod "$BaseUrl/API/Admin/Airport/Flight").Count -ne $flights.Count) { throw 'Inventory cleanup mismatch' }
Write-Output 'PASS flight and operator delete and cleanup'
