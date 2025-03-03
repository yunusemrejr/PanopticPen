<?php
$url;
$target = 'https://panopticpen.gor.bio/admin/systemmaintenancestatusinformation.txt';
$content = "";
if (file_get_contents($target) == "01010100 01101000 01100101 01010011 01111001 01110011 01110100 01100101 01101101 01001001 01110011 01000011 01110101 01110010 01110010 01100101 01101110 01110100 01101100 01111001 01001001 01101110 01001110 01101111 01110010 01101101 01100001 01101100 01001101 01101111 01100100 01100101") {
    $url = "https://panopticpen.gor.bio/template.txt";
} elseif (file_get_contents($target) == "01010100 01101000 01100101 01010011 01111001 01110011 01110100 01100101 01101101 01001001 01110011 01000011 01110101 01110010 01110010 01100101 01101110 01110100 01101100 01111001 01001001 01101110 01001101 01100001 01101001 01101110 01110100 01100101 01101110 01100001 01101110 01100011 01100101 01001101 01101111 01100100 01100101") {
    $url = "https://panopticpen.gor.bio/maintenanceTemplate.txt";
} else {
    echo "<br><br><br><h1 style='color:darkgray;font-family:arial;width:60%;'>Sorry! We are having an internal problem within our codebase, please be patient as we work on fixing the issue! - The Panoptic Pen Team</h1><br><br><br><br><h2 style='color:gray;font-family:courier;width:60%;'>www.panopticpen.space | panopticpen.gor.bio</h2>";
}
?>