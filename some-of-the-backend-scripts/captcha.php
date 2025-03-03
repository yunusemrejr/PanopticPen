<?php
session_start();

// Generate a random CAPTCHA code
$captchaCode = substr(str_shuffle("ARSTWXYZabcdefghijklmnpqrstwx123456789"), 0, 2);

// Store the CAPTCHA code in the session
$_SESSION['captcha_code'] = $captchaCode;

// Create a blank image with a white background
$image = imagecreatetruecolor(120, 40);
$bgColor = imagecolorallocate($image, 255, 255, 255);
imagefill($image, 0, 0, $bgColor);

// Add random lines to the image for noise
for ($i = 0; $i < 10; $i++) {
    $lineColor = imagecolorallocate($image, rand(0, 255), rand(0, 255), rand(0, 255));
    imageline($image, rand(0, 120), rand(0, 40), rand(0, 120), rand(0, 40), $lineColor);
}

// Add the CAPTCHA code to the image
$textColor = imagecolorallocate($image, 0, 0, 0);
imagestring($image, 5, 10, 10, $captchaCode, $textColor);

// Output the image
header("Content-type: image/png");
imagepng($image);

// Clean up
imagedestroy($image);
?>
