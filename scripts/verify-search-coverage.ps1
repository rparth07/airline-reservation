param([string]$BaseUrl='http://localhost:5035')
$ErrorActionPreference='Stop'
$airports=Invoke-RestMethod "$BaseUrl/API/Admin/Airport"
$cases=@(foreach($a in $airports) { foreach($b in $airports) { if($a.abbreviation -ne $b.abbreviation) { [pscustomobject]@{Route="$($a.abbreviation)-$($b.abbreviation)";Date='29/02/2028';Cabin='Economy'} } } })
$cases += @(foreach($offset in 0..6) { foreach($cabin in @('Economy','Business')) { [pscustomobject]@{Route='MAA-DEL';Date=(Get-Date).AddDays(30+$offset).ToString('dd/MM/yyyy',[Globalization.CultureInfo]::InvariantCulture);Cabin=$cabin} } })
$results=$cases | ForEach-Object -Parallel {
  $case=$_
  $url=$using:BaseUrl+'/API/SerachFlight?tripType=O&paxType=A-1_C-0_I-0&cabinClass='+$case.Cabin+'&itinerary='+[Uri]::EscapeDataString($case.Route+'-'+$case.Date)
  try { $response=Invoke-RestMethod $url -TimeoutSec 60; if(!$response.Count) { throw 'Empty result' }; [pscustomobject]@{Pass=$true;Case=$case.Route} } catch { [pscustomobject]@{Pass=$false;Case=$case.Route;Error=$_.Exception.Message} }
} -ThrottleLimit 4
$failed=@($results | Where-Object {!$_.Pass})
if($failed.Count) { $failed | Format-Table; throw 'Coverage check failed' }
Write-Output "PASS $($results.Count) API searches: all distinct airport pairs, leap day, all weekdays and both cabin classes"
