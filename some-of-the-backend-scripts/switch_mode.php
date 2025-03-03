<?php
// rule 1: check if the request comes from admin/yun.php
$allowedReferer = 'https://panopticpen.space/admin/yun.php';
if ($_SERVER['HTTP_REFERER'] !== $allowedReferer) {
    header('Location: /');
    exit();
}
// Retrieve the selected mode from the form
$selectedMode = $_POST['mode'];
// Define the file path
$filePath = 'systemmaintenancestatusinformation.txt';
// Open the file in write mode, erasing any existing data
$file = fopen($filePath, 'w');
// Write the corresponding value based on the selected mode
if ($selectedMode === 'live') {
    $value = '01010100 01101000 01100101 01010011 01111001 01110011 01110100 01100101 01101101 01001001 01110011 01000011 01110101 01110010 01110010 01100101 01101110 01110100 01101100 01111001 01001001 01101110 01001110 01101111 01110010 01101101 01100001 01101100 01001101 01101111 01100100 01100101';
} elseif ($selectedMode === 'maintenance') {
    $value = '01010100 01101000 01100101 01010011 01111001 01110011 01110100 01100101 01101101 01001001 01110011 01000011 01110101 01110010 01110010 01100101 01101110 01110100 01101100 01111001 01001001 01101110 01001101 01100001 01101001 01101110 01110100 01100101 01101110 01100001 01101110 01100011 01100101 01001101 01101111 01100100 01100101';
} else {
    header('Location: https://panopticpen.gor.bio/admin/');
    exit();
}
// Write the value to the file
fwrite($file, $value);
// Close the file
fclose($file);
// Redirect back to the admin panel
header('Location: yun.php');
exit();
?>
