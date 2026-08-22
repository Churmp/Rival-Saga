param(
  [switch]$SkipDownloads
)

$ErrorActionPreference = "Stop"
$rootDir = Resolve-Path (Join-Path $PSScriptRoot "..")
$itemsDir = Join-Path $rootDir "assets\shop\items"
$teraDir = Join-Path $rootDir "assets\shop\tera-types"
$cacheDir = Join-Path $PSScriptRoot ".sprite-cache"
$sheetPath = Join-Path $cacheDir "showdown-itemicons-sheet.png"

New-Item -ItemType Directory -Force -Path $itemsDir, $teraDir, $cacheDir | Out-Null

if (-not (Test-Path -LiteralPath $sheetPath) -and -not $SkipDownloads) {
  Invoke-WebRequest -Uri "https://play.pokemonshowdown.com/sprites/itemicons-sheet.png" -OutFile $sheetPath -UseBasicParsing -TimeoutSec 30
}

$manifestJson = & node (Join-Path $PSScriptRoot "audit-item-shop-sprites.js") --restore-manifest
$manifest = $manifestJson | ConvertFrom-Json

Add-Type -AssemblyName System.Drawing
$sheet = $null
if (Test-Path -LiteralPath $sheetPath) {
  $sheet = [System.Drawing.Image]::FromFile($sheetPath)
}

function Convert-ToLocalPath([string]$relativePath) {
  return Join-Path $rootDir ($relativePath -replace "/", "\")
}

function Save-AtlasCrop($record) {
  if (-not $sheet) {
    throw "Pokemon Showdown item icon sheet is required for atlas crops."
  }
  $outPath = Convert-ToLocalPath $record.localSprite
  if ((Test-Path -LiteralPath $outPath) -and $SkipDownloads) { return }
  $spritenum = [int]$record.spritenum
  $tileSize = 24
  $columns = 16
  $srcX = ($spritenum % $columns) * $tileSize
  $srcY = [Math]::Floor($spritenum / $columns) * $tileSize
  $srcRect = New-Object System.Drawing.Rectangle($srcX, $srcY, $tileSize, $tileSize)
  $dstRect = New-Object System.Drawing.Rectangle(0, 0, $tileSize, $tileSize)
  $bitmap = New-Object System.Drawing.Bitmap($tileSize, $tileSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.DrawImage($sheet, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  $graphics.Dispose()
  $bitmap.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
}

function Save-CustomBlankPlate($record) {
  $outPath = Convert-ToLocalPath $record.localSprite
  if ((Test-Path -LiteralPath $outPath) -and $SkipDownloads) { return }
  $bitmap = New-Object System.Drawing.Bitmap(48, 48, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(70, 20, 20, 28))
  $bodyBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Rectangle(8, 6, 32, 34)),
    [System.Drawing.Color]::FromArgb(255, 238, 240, 246),
    [System.Drawing.Color]::FromArgb(255, 168, 174, 189),
    70
  )
  $edgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 98, 105, 122), 2)
  $shinePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 255, 255, 255), 2)
  $graphics.FillEllipse($shadowBrush, 11, 34, 26, 7)
  $points = @(
    (New-Object System.Drawing.Point(24, 4)),
    (New-Object System.Drawing.Point(39, 14)),
    (New-Object System.Drawing.Point(34, 38)),
    (New-Object System.Drawing.Point(14, 38)),
    (New-Object System.Drawing.Point(9, 14))
  )
  $graphics.FillPolygon($bodyBrush, $points)
  $graphics.DrawPolygon($edgePen, $points)
  $graphics.DrawArc($shinePen, 15, 10, 18, 16, 205, 98)
  $graphics.Dispose()
  $shadowBrush.Dispose()
  $bodyBrush.Dispose()
  $edgePen.Dispose()
  $shinePen.Dispose()
  $bitmap.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
}

$metadataItems = [ordered]@{}
$downloaded = 0
$cropped = 0
$custom = 0

foreach ($record in $manifest.records) {
  if (-not $record.localSprite) { continue }
  $outPath = Convert-ToLocalPath $record.localSprite
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $outPath) | Out-Null
  switch ($record.restoreMethod) {
    "download" {
      if (-not (Test-Path -LiteralPath $outPath) -or -not $SkipDownloads) {
        Invoke-WebRequest -Uri $record.originalSourceUrl -OutFile $outPath -UseBasicParsing -TimeoutSec 30
        $downloaded += 1
      }
    }
    "atlas-crop" {
      Save-AtlasCrop $record
      $cropped += 1
    }
    "custom-blank-plate" {
      Save-CustomBlankPlate $record
      $custom += 1
    }
  }
  $key = $record.name.ToLowerInvariant().Normalize([Text.NormalizationForm]::FormD) -replace "[\u0300-\u036f]", ""
  $key = $key -replace "[’']", ""
  $key = $key -replace "\+", " "
  $key = $key -replace "[^a-z0-9]+", "-"
  $key = $key -replace "^-+|-+$", ""
  $key = $key -replace "-+", "-"
  $metadataItems[$key] = [ordered]@{
    name = $record.name
    productId = $record.id
    productType = $record.productType
    localSprite = $record.localSprite
    sourceProvider = $record.sourceProvider
    providerKey = $record.providerKey
    originalSourceUrl = $record.originalSourceUrl
    restoreMethod = $record.restoreMethod
    spritenum = $record.spritenum
    renderMode = $record.renderMode
  }
}

if ($sheet) { $sheet.Dispose() }

$payload = [ordered]@{
  schemaVersion = 1
  generatedAt = (Get-Date).ToUniversalTime().ToString("o")
  sourceNotes = @(
    "PokeAPI item sprites are localized from raw.githubusercontent.com/PokeAPI/sprites.",
    "Pokemon Showdown item atlas crops are used only when PokeAPI item records have no usable sprite.",
    "Pokemon Showdown Tera type icons are localized for Rival Saga mechanic products.",
    "Blank Plate has no usable PokeAPI or Pokemon Showdown item sprite and uses an intentional Rival Saga custom plate asset."
  )
  items = $metadataItems
}

$json = $payload | ConvertTo-Json -Depth 8
$content = @"
const rivalSagaShopSpriteData = Object.freeze($json);

if (typeof window !== "undefined") {
  window.rivalSagaShopSpriteData = rivalSagaShopSpriteData;
}

if (typeof module !== "undefined") {
  module.exports = rivalSagaShopSpriteData;
}
"@
Set-Content -Path (Join-Path $rootDir "shop-sprite-data.js") -Value $content -Encoding UTF8

Write-Host "Downloaded: $downloaded"
Write-Host "Atlas crops: $cropped"
Write-Host "Custom assets: $custom"
Write-Host "Metadata entries: $($metadataItems.Count)"
