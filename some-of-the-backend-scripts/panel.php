 
<?php
ini_set('session.gc_maxlifetime', 600);
session_start();
$currentURL = 'http';
if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
    $currentURL.= 's';
}
$currentURL.= '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    if ($id === 'yun') {
    } else {
        session_destroy();
    session_unset();
    ini_set('session.gc_max_lifetime', 0);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 1);
        header('Location: https://panopticpen.gor.bio');
        exit;
    }
} else {
    session_destroy();
    session_unset();
    ini_set('session.gc_max_lifetime', 0);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 1);
    header('Location: https://panopticpen.gor.bio');
    exit;
}
function auth($username, $password, $secondPassword) {
    $yunPas = "4567654666/6456754674467/yunusemrejr.txt"; // This is the server internal path
    $storedHash = file_get_contents($yunPas);
    if ($username === "yunusemrejr" && hash('sha256', $password) === $storedHash && $secondPassword === "vurgun8899") {
        return true; // Authentication successful
        
    }
    return false; // Authentication failed
    
}
function geocheck() {
    //check IP
    $allowedCountries = ['TR'];
    $requesterIP = $_SERVER['REMOTE_ADDR'];
    $response = file_get_contents("http://www.geoplugin.net/json.gp?ip=$requesterIP");
    $data = json_decode($response, true);
    $CountryCode = $data['geoplugin_countryCode'];
    if (!in_array($CountryCode, $allowedCountries)) {
        session_destroy();
    session_unset();
    ini_set('session.gc_max_lifetime', 0);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 1);
        header("Location: about:blank");
        exit;
    }
}
geocheck();
// Check if the user has submitted the login form
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['second_password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $secondPassword = $_POST['second_password'];
    // Call the auth function to authenticate the user
    if (auth($username, $password, $secondPassword)) {
        // Authentication successful
        $_SESSION['username'] = $username;
        $_SESSION['secret_phrase'] = "we are all good";
        // Redirect to the admin panel or display a success message
        echo "<style>#loginform1{display:none;}</style>";
        echo "<h1>Welcome admin yunus!</h1><br>";
        echo "<p>Please wait while you are redirected...</p>";
        // Redirect after a short delay
        echo "<script>setTimeout(function() { window.location.href = 'https://panopticpen.gor.bio/admin/yun.php'; }, 2000);</script>";
    } else {
        // Authentication failed
        session_destroy();
    session_unset();
    ini_set('session.gc_max_lifetime', 0);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 1);
        header('Location: https://panopticpen.gor.bio');
        exit;
    }
}
?>



<!-- HTML login form -->
<html>
<head>    <link rel="stylesheet" type="text/css" href="panel.css">
 

</head>
<body>
    <img id='mrrobotimg' src='https://panopticpen.gor.bio/admin/pngwing.com.png'/>
    
    
    
    <form method="POST" action="" id='loginform1'>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <label for="second_password">Second Password:</label>
        <input type="password" id="second_password" name="second_password" required><br><br>

        <input type="submit" value="Submit"> 
    
    </form>
     <script>
        function listpanel(){
            window.location.href="https://panopticpen.space/admin/listpanel.php?38938767=22254yunlist111admin33432";
        }
    </script>
    <button id="listpanelbtn" onclick="listpanel()">List Posting Panel</button>
    <br>
   
    <script src="panel.js"></script>
 

    
   <script src="https://panopticpen.gor.bio/messagingSystem.js"></script>

</body>
</html>
