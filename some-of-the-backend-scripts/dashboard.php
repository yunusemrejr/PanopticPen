<?php
session_start();

// Check if all required session tokens are set
if(isset($_SESSION['username'], $_SESSION['email'], $_SESSION['status'], $_SESSION['security_code'])) {
    // Extract email from the session
    $email = $_SESSION['email'];

    // Extract security code from the session
    $securityCode = $_SESSION['security_code'];

    // Check if the security code includes the email within it
    if(strpos($securityCode, $email) !== false) {
    
?>



 <!DOCTYPE html>
<html lang="en">

  <head>
    <meta name="robots" content="nofollow"> 

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <title>Dashboard | BrainstormerX - AI Idea Generator</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">


    <!-- Additional CSS Files -->
        <link href="assets/css/dashboard-specific.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/templatemo-574-BrainstormerX.css">
    <link rel="stylesheet" href="assets/css/owl.css">
    <link rel="stylesheet" href="assets/css/animate.css">
    <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css">
        <link rel="icon" type="image/webp" href="assets/images/icon.webp">

 
  </head>

<body>


  <!-- ***** Header Area Start ***** -->
  <header class="header-area header-sticky">
      <div class="container">
          <div class="row">
              <div class="col-12">
                  <nav class="main-nav">
                      <!-- ***** Logo Start ***** -->
                      <a href="https://panopticpen.space/BrainstormerX/dashboard.php" class="logo">
                          <img src="assets/images/logo.webp" alt="">
                      </a>
                      <!-- ***** Logo End ***** -->
           <!-- ***** BrainstormerX Menu Start ***** -->
<ul class="nav">
 
        <li><a href="https://panopticpen.space/BrainstormerX/dashboard.php"><b>DASHBOARD</b></a></li> 
            <li id=logout><a href="logout.php"><b>log out</b></a></li> 
    <li></li> 

</ul>        
<a class='menu-trigger'>
    <span>Menu</span>
</a>
<!-- ***** BrainstormerX Menu End ***** -->

                  </nav>
              </div>
          </div>
      </div>
  </header>
  <!-- ***** Header Area End ***** -->
    <!-- ***** Main Banner Area Start ***** -->
  <div class="swiper-container" id="top" style='height:200px !important;'>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="slide-inner" style="background-image:url(assets/images/1111.webp); "></div></div></div>
      

  </div><div id=other-pg-inner-div>
    
<?php

    // Security code includes the email, continue with dashboard display
        echo "<p id=welcomeP>Welcome to the dashboard, " . $_SESSION['username'] . "!</p>";
        // Additional dashboard content goes here
    } else {
        // Security code does not include the email, redirect to login page
        header("Location: login.html");
        session_destroy();
        exit();
    }
} else {
    // Required session tokens are not set, redirect to login page
    header("Location: login.html");
        session_destroy();
        exit();
}


?>
    <p><br>

        Here, you can interact with our cutting-edge AI, configure your user settings, or explore guides.
 <br> 
</p>
<section id="dashboard-buttons">
    <a href="ai.php">Interact with AI</a>
    <a href="account_settings.php">Your Account Settings</a>
    <a href="guides.php">Guides</a>
</section>
</div>
    <!-- ***** Main Banner Area End ***** -->
<section class="services" id="services"> <div class="container"> </div> </section>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <p>Copyright © 2024 BrainstormerX, All Rights Reserved. 
          
          <br>Powered by <a  href="https://panopticpen.space" target="_blank">Panoptic Pen</a> Created By <a  href="https://yunusemrevurgun.com" target="_blank">Yunus Emre Vurgun</a></p>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <script src="assets/js/isotope.min.js"></script>
    <script src="assets/js/owl-carousel.js"></script>

    <script src="assets/js/tabs.js"></script>
    <script src="assets/js/swiper.js"></script>
    <script src="assets/js/custom.js"></script>
    
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-T40HS5J15L"></script> <script> window.dataLayer = window.dataLayeer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-T40HS5J15L'); </script> <script type=text/javascript> var owa_baseUrl = 'https://gor.bio/analytics/'; var owa_cmds = owa_cmds || []; owa_cmds.push(['setSiteId', '594bbc82fba7393d8cc07057cd7f2d18']); owa_cmds.push(['trackPageView']); owa_cmds.push(['trackClicks']); (function() { var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true; owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl); _owa.src = owa_baseUrl + 'modules/base/dist/owa.tracker.js'; var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s); }()); </script> <!-- Yandex.Metrika counter --> <script type="text/javascript"> (function(m, e, t, r, i, k, a) { m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments) }; m[i].l = 1 * new Date(); for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } } k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a) })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(94623792, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true }); </script> <noscript> <div> <img src="https://mc.yandex.ru/watch/94623792" style="position:absolute; left:-9999px;" alt="" /> </div> </noscript> <!-- /Yandex.Metrika counter --> 
   </body>
</html>
