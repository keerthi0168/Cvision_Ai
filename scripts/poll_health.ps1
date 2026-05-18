$max=30
for($i=0;$i -lt $max;$i++){
  $code = & curl.exe -s -o NUL -w '%{http_code}' 'https://cvision-aibackend.vercel.app/health'
  Write-Output ("check {0}: {1}" -f $i, $code)
  if($code -eq '200'){
    Write-Output 'OK'
    exit 0
  }
  Start-Sleep -Seconds 10
}
Write-Output "Still not 200, last status: $code"
exit 1
