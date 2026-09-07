$ErrorActionPreference = "Stop"

$Project = "C:\Users\grdez\Downloads\Compressed\iraq-home-expo-next-design-progress\iraq-home-expo-next"
$Patch = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Applying corrected SEO/UI patch..."

Get-ChildItem -Path $Patch -Recurse -File | Where-Object {
    $_.FullName -notlike "*\seo-append.css" -and
    $_.Name -ne "APPLY_CORRECTED_PATCH.ps1" -and
    $_.Name -ne "CORRECTED_PATCH_README.md"
} | ForEach-Object {
    $relative = $_.FullName.Substring($Patch.Length).TrimStart('\')
    $destination = Join-Path $Project $relative
    New-Item -ItemType Directory -Force -Path (Split-Path $destination -Parent) | Out-Null
    Copy-Item $_.FullName $destination -Force
}

$cssSource = Join-Path $Patch "src\app\seo-append.css"
$globals = Join-Path $Project "src\app\globals.css"
$marker = "/* IHE SEO UI CORRECTED PATCH */"

if (Test-Path $cssSource) {
    $current = Get-Content $globals -Raw
    if ($current -notmatch [regex]::Escape($marker)) {
        Add-Content $globals "`r`n$marker`r`n"
        Get-Content $cssSource | Add-Content $globals
        Write-Host "CSS appended."
    } else {
        Write-Host "CSS marker already present; not appended twice."
    }
}

Write-Host "Patch applied."
Write-Host 'Next: cd to project, then run "npm.cmd run build" and "git status".'
