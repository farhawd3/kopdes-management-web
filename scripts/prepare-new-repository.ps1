param([string]$Destination = 'D:\Koding\kopdes-dunia-koperasi')
$ErrorActionPreference = 'Stop'
$sourceRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$targetRoot = [System.IO.Path]::GetFullPath($Destination)
if ($targetRoot.StartsWith($sourceRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase) -or $targetRoot -eq $sourceRoot) {
  throw 'Folder tujuan harus di luar checkout lama.'
}
if (Test-Path -LiteralPath $targetRoot) { throw 'Folder tujuan sudah ada. Pilih folder baru agar tidak menimpa pekerjaan.' }
$trackedFiles = @(git -C $sourceRoot ls-files)
if ($LASTEXITCODE -ne 0) { throw 'Daftar berkas Git tidak dapat dibaca.' }
foreach ($relative in $trackedFiles) {
  if ($relative -match '(^|/)(\.env(?!\.example$)[^/]*|[^/]+\.(pem|key|p12|pfx))$' -or $relative -match '^(artifacts|backups|\.local-backup|node_modules|\.next)/') {
    throw "Berkas lokal/rahasia terlacak: $relative. Periksa sebelum menyiapkan repo publik."
  }
}
New-Item -ItemType Directory -Path $targetRoot | Out-Null
foreach ($relative in $trackedFiles) {
  $sourceFile = Join-Path $sourceRoot $relative
  if (-not (Test-Path -LiteralPath $sourceFile -PathType Leaf)) { continue }
  $targetFile = Join-Path $targetRoot $relative
  New-Item -ItemType Directory -Force -Path (Split-Path $targetFile -Parent) | Out-Null
  Copy-Item -LiteralPath $sourceFile -Destination $targetFile
}
git -C $targetRoot init -b codex/dunia-koperasi
if ($LASTEXITCODE -ne 0) { throw 'Inisialisasi repo gagal.' }
Write-Output "Salinan kode siap: $targetRoot"
Write-Output 'Periksa perubahan, lalu git add dan git commit. Remote lama tidak diubah. .env.local tidak disalin.'
