Add-Type -AssemblyName System.Drawing
$photosDir = "C:\Users\Ryan\OneDrive\Desktop\projects\mark-and-glenda\public\photos"
$files = Get-ChildItem -Path $photosDir -Filter "*.jpg"

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $maxDim = 1200
    $w = $img.Width
    $h = $img.Height

    if ($w -gt $maxDim -or $h -gt $maxDim) {
        if ($w -gt $h) {
            $newW = $maxDim
            $newH = [int]($h * ($maxDim / $w))
        } else {
            $newH = $maxDim
            $newW = [int]($w * ($maxDim / $h))
        }

        $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $newW, $newH)
        $g.Dispose()
        $img.Dispose()

        $tempPath = "$($file.FullName).tmp.jpg"
        $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $bmp.Dispose()

        Remove-Item $file.FullName
        Move-Item $tempPath $file.FullName
        Write-Host "Done $($file.Name): $newW x $newH"
    } else {
        $img.Dispose()
    }
}
