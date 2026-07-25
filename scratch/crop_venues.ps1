Add-Type -AssemblyName System.Drawing

$src = "C:\Users\Ryan\Downloads\2eb702b7-4077-469b-842f-eed158fca251.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($src)

# Mt Carmel Church Photo Crop (exact venue photo rectangle)
$rectChurch = New-Object System.Drawing.Rectangle(250, 665, 205, 135)
$cropChurch = $bmp.Clone($rectChurch, $bmp.PixelFormat)
$cropChurch.Save("C:\Users\Ryan\OneDrive\Desktop\projects\mark-and-glenda\public\venues\mt-carmel-church.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropChurch.Dispose()

# Oasis Manila Photo Crop (exact venue photo rectangle)
$rectOasis = New-Object System.Drawing.Rectangle(250, 980, 205, 135)
$cropOasis = $bmp.Clone($rectOasis, $bmp.PixelFormat)
$cropOasis.Save("C:\Users\Ryan\OneDrive\Desktop\projects\mark-and-glenda\public\venues\oasis-manila.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropOasis.Dispose()

$bmp.Dispose()
Write-Output "Cleanly cropped exact real venue photos!"
