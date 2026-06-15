$Port = 5173

$connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue

if ($connections) {
  $connections | ForEach-Object {
    Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
  }

  Start-Sleep -Milliseconds 500
}

vite --host 0.0.0.0 --port $Port
