<?php
session_start();

// Check if all required session tokens are set
if(isset($_SESSION['username'], $_SESSION['email'], $_SESSION['status'], $_SESSION['security_code'])) {
    // Extract email from the session
    $email = $_SESSION['email'];

    // Extract security code from the session
    $securityCode = $_SESSION['security_code'];

    // Check if the security code includes the email within it
    if(strpos($securityCode, $email) == false) {
             header("Location: login.html");
        session_destroy();
        exit();
    }
}else{
                 header("Location: login.html");
        session_destroy();
        exit();
}
?>


<!DOCTYPE HTML>
<html>
    <head>
         <script async src="https://www.googletagmanager.com/gtag/js?id=G-T40HS5J15L"></script> <script> window.dataLayer = window.dataLayeer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-T40HS5J15L'); </script> <script type=text/javascript> var owa_baseUrl = 'https://gor.bio/analytics/'; var owa_cmds = owa_cmds || []; owa_cmds.push(['setSiteId', '594bbc82fba7393d8cc07057cd7f2d18']); owa_cmds.push(['trackPageView']); owa_cmds.push(['trackClicks']); (function() { var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true; owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl); _owa.src = owa_baseUrl + 'modules/base/dist/owa.tracker.js'; var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s); }()); </script> <!-- Yandex.Metrika counter --> <script type="text/javascript"> (function(m, e, t, r, i, k, a) { m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments) }; m[i].l = 1 * new Date(); for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } } k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a) })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(94623792, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true }); </script> <noscript> <div> <img src="https://mc.yandex.ru/watch/94623792" style="position:absolute; left:-9999px;" alt="" /> </div> </noscript> <!-- /Yandex.Metrika counter --> 
    </head>
    <body>
        <?php
 

// Step 1: Connect to the database
require "../../GENERAL_SQL/db.php";
sleep(2);
$servername = $GLOBALS['servername'];
$dbname = $GLOBALS['dbname'];
$username = $GLOBALS['username'];
$password_for_db = $GLOBALS['password'];
$conn = new mysqli($servername, $username, $password_for_db, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " /*. $conn->connect_error*/)));
}


    // Get username from session
    $username = $_SESSION['username'];

    // Delete user from database
    $sql = "DELETE FROM brainstormerx_user WHERE username = '$username'";

    if ($conn->query($sql) === TRUE) {
        // User deleted successfully
        echo "User deleted successfully.";
        // Destroy session
        session_destroy();
    } else {
        echo "Error deleting user: " . $conn->error;
    }

    $conn->close();
 
?>

    </body>
</html>



