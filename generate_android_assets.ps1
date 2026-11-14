Add-Type -AssemblyName System.Drawing

function Generate-Image {
    param(
        [string]$SourcePath,
        [string]$TargetPath,
        [int]$CanvasWidth,
        [int]$CanvasHeight,
        [int]$LogoWidth,
        [int]$LogoHeight,
        [System.Drawing.Color]$BgColor,
        [bool]$MakeCircular = $false
    )

    $sourceImage = [System.Drawing.Bitmap]::FromFile($SourcePath)
    $destBitmap = New-Object System.Drawing.Bitmap $CanvasWidth, $CanvasHeight
    $graphics = [System.Drawing.Graphics]::FromImage($destBitmap)

    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $graphics.Clear($BgColor)

    $destX = [int](($CanvasWidth - $LogoWidth) / 2)
    $destY = [int](($CanvasHeight - $LogoHeight) / 2)

    if ($MakeCircular) {
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddEllipse(0, 0, $CanvasWidth, $CanvasHeight)
        $graphics.SetClip($path)
        $brush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#FFF9F5'))
        $graphics.FillEllipse($brush, 0, 0, $CanvasWidth, $CanvasHeight)
        $brush.Dispose()
    }

    $graphics.DrawImage($sourceImage, $destX, $destY, $LogoWidth, $LogoHeight)

    $parentDir = [System.IO.Path]::GetDirectoryName($TargetPath)
    if (-not [System.IO.Directory]::Exists($parentDir)) {
        [System.IO.Directory]::CreateDirectory($parentDir) | Out-Null
    }

    $destBitmap.Save($TargetPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $graphics.Dispose()
    $destBitmap.Dispose()
    $sourceImage.Dispose()
}

$src = (Resolve-Path 'src\assets\logo.png').Path
$resDir = (Resolve-Path 'android\app\src\main\res').Path
$ivoryBg = [System.Drawing.ColorTranslator]::FromHtml('#FFF9F5')
$transparentBg = [System.Drawing.Color]::Transparent

# Mipmap densities
$densities = @(
    @{ Name = 'mipmap-mdpi'; IconSize = 48; ForeSize = 108; ForeLogo = 66 },
    @{ Name = 'mipmap-hdpi'; IconSize = 72; ForeSize = 162; ForeLogo = 99 },
    @{ Name = 'mipmap-xhdpi'; IconSize = 96; ForeSize = 216; ForeLogo = 132 },
    @{ Name = 'mipmap-xxhdpi'; IconSize = 144; ForeSize = 324; ForeLogo = 198 },
    @{ Name = 'mipmap-xxxhdpi'; IconSize = 192; ForeSize = 432; ForeLogo = 264 }
)

foreach ($d in $densities) {
    $targetDir = Join-Path $resDir $d.Name

    # 1. Standard ic_launcher
    $iconSize = [int]$d.IconSize
    $logoSize = [int]($iconSize * 0.9)
    Generate-Image -SourcePath $src -TargetPath (Join-Path $targetDir 'ic_launcher.png') -CanvasWidth $iconSize -CanvasHeight $iconSize -LogoWidth $logoSize -LogoHeight $logoSize -BgColor $ivoryBg

    # 2. Round ic_launcher_round
    $roundLogoSize = [int]($iconSize * 0.85)
    Generate-Image -SourcePath $src -TargetPath (Join-Path $targetDir 'ic_launcher_round.png') -CanvasWidth $iconSize -CanvasHeight $iconSize -LogoWidth $roundLogoSize -LogoHeight $roundLogoSize -BgColor $ivoryBg -MakeCircular $true

    # 3. Adaptive foreground ic_launcher_foreground
    $foreSize = [int]$d.ForeSize
    $foreLogo = [int]$d.ForeLogo
    Generate-Image -SourcePath $src -TargetPath (Join-Path $targetDir 'ic_launcher_foreground.png') -CanvasWidth $foreSize -CanvasHeight $foreSize -LogoWidth $foreLogo -LogoHeight $foreLogo -BgColor $transparentBg
}
Write-Host "Android mipmap icons generated successfully!"

# Splash screens
$splashes = @(
    @{ Dir = 'drawable'; W = 480; H = 800; LogoW = 200; LogoH = 200 },
    @{ Dir = 'drawable-port-mdpi'; W = 320; H = 480; LogoW = 160; LogoH = 160 },
    @{ Dir = 'drawable-port-hdpi'; W = 480; H = 800; LogoW = 220; LogoH = 220 },
    @{ Dir = 'drawable-port-xhdpi'; W = 720; H = 1280; LogoW = 320; LogoH = 320 },
    @{ Dir = 'drawable-port-xxhdpi'; W = 960; H = 1600; LogoW = 420; LogoH = 420 },
    @{ Dir = 'drawable-port-xxxhdpi'; W = 1280; H = 1920; LogoW = 540; LogoH = 540 },
    @{ Dir = 'drawable-land-mdpi'; W = 480; H = 320; LogoW = 160; LogoH = 160 },
    @{ Dir = 'drawable-land-hdpi'; W = 800; H = 480; LogoW = 220; LogoH = 220 },
    @{ Dir = 'drawable-land-xhdpi'; W = 1280; H = 720; LogoW = 300; LogoH = 300 },
    @{ Dir = 'drawable-land-xxhdpi'; W = 1600; H = 960; LogoW = 400; LogoH = 400 },
    @{ Dir = 'drawable-land-xxxhdpi'; W = 1920; H = 1280; LogoW = 500; LogoH = 500 }
)

foreach ($s in $splashes) {
    $targetPath = Join-Path $resDir (Join-Path $s.Dir 'splash.png')
    Generate-Image -SourcePath $src -TargetPath $targetPath -CanvasWidth $s.W -CanvasHeight $s.H -LogoWidth $s.LogoW -LogoHeight $s.LogoH -BgColor $ivoryBg
}
Write-Host "Android splash screens generated successfully!"
