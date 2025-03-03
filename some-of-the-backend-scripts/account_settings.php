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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BrainStormerX - Account Settings</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            color: #333;
        }

        .option {
            margin-bottom: 20px;
        }

        .option h2 {
            color: #444;
        }

        .option p {
            color: #777;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }

        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Account Settings</h1>
        
        <div class="option">
            <h2>Change Password</h2>
            <p>
                You can change your password here. Click the button below to proceed.
            </p>
            <a href="change_password.php" class="button">Change Password</a>
        </div>

        <div class="option">
            <h2>Delete Account</h2>
            <p>
                If you want to permanently delete your account, click the button below. Please note that this action is irreversible.
            </p>
            <a href="#" class="button" onclick="confirmDelete()">Delete Account</a>
        </div>

        <script>
            function confirmDelete() {
                if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                    // Proceed with account deletion
                     
                    // Redirect to homepage or logout
                    window.location.href = "delete_account.php";
                }
            }
        </script>
    </div>
             <script async src="https://www.googletagmanager.com/gtag/js?id=G-T40HS5J15L"></script> <script> window.dataLayer = window.dataLayeer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-T40HS5J15L'); </script> <script type=text/javascript> var owa_baseUrl = 'https://gor.bio/analytics/'; var owa_cmds = owa_cmds || []; owa_cmds.push(['setSiteId', '594bbc82fba7393d8cc07057cd7f2d18']); owa_cmds.push(['trackPageView']); owa_cmds.push(['trackClicks']); (function() { var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true; owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl); _owa.src = owa_baseUrl + 'modules/base/dist/owa.tracker.js'; var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s); }()); </script> <!-- Yandex.Metrika counter --> <script type="text/javascript"> (function(m, e, t, r, i, k, a) { m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments) }; m[i].l = 1 * new Date(); for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } } k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a) })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(94623792, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true }); </script> <noscript> <div> <img src="https://mc.yandex.ru/watch/94623792" style="position:absolute; left:-9999px;" alt="" /> </div> </noscript> <!-- /Yandex.Metrika counter --> 

</body>
</html>

    