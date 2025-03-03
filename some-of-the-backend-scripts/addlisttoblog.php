<?php
ini_set('session.gc_maxlifetime', 600);
session_start();
$listTitle;
$numElements;
$listElements;
if (isset($_SERVER['HTTP_REFERER'])) {
    $referring_url = $_SERVER['HTTP_REFERER'];
    if (strpos($referring_url, "https://panopticpen.space/admin") !== false) {
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
        if (!isset($_SESSION["username4List"])) {
            session_destroy();
    session_unset();
    ini_set('session.gc_max_lifetime', 0);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 1);
            header("Location: https://panopticpen.space/?err=6y6y6gg-nbhbhg-gtt66655-gbfv-ytgh78gg");
            exit;
        }
        if ($_SERVER['REQUEST_METHOD'] == "GET" && isset($_GET["command"])) {
            $command = $_GET["command"];
            if ($command === "publishNow") {
                echo "got it, will be published!";
                session_start();
                $numElements = $_SESSION['numberOfElements'];
                $listTitle = $_SESSION['listTitle'];
                $listElements = array();
                for ($i = 1;$i <= $numElements;$i++) {
                    $elementTitle = $_SESSION["elementTitle$i"];
                    $elementDescription = $_SESSION["elementDescription$i"];
                    $listElements[] = array("title" => $elementTitle, "description" => $elementDescription);
                }
                $currentDate = date("Y-m-d H:i:s");
                // Prepare the HTML form
                echo '<form id="dummyForm" action="https://panopticpen.space/admin/addlisttoblog_ACTION.php" method="post" style="display: none;">';
                echo '<input type="hidden" name="listTitle" value="' . htmlspecialchars($listTitle) . '">';
                echo '<input type="hidden" name="numElements" value="' . htmlspecialchars($numElements) . '">';
                echo '<input type="hidden" name="listElements" value="' . htmlspecialchars(json_encode($listElements)) . '">';
                echo '<input type="hidden" name="currentDate" value="' . htmlspecialchars($currentDate) . '">';
                echo '</form>';
                // Automatically submit the form using JavaScript
                echo '<script>';
                echo 'document.getElementById("dummyForm").submit();';
                echo '</script>';
                // Clean up session data
                for ($i = 1;$i <= $numElements;$i++) {
                    unset($_SESSION["elementTitle$i"]);
                    unset($_SESSION["elementDescription$i"]);
                }
                unset($_SESSION['numberOfElements']);
                unset($_SESSION['listTitle']);
                exit;
            }
        }
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Get the list title and number of elements from the form
            $listTitle = $_POST["listTitle"];
            $numElements = intval($_POST["numElements"]);
            // Create an array to store elements
            $listElements = array();
            // Loop through each element and retrieve its information
            for ($i = 1;$i <= $numElements;$i++) {
                $elementTitle = $_POST["elementTitle$i"];
                $_SESSION["elementTitle$i"] = $elementTitle;
                $elementDescription = $_POST["elementDescription$i"];
                $_SESSION["elementDescription$i"] = $elementDescription;
                // Create an array to represent an element
                $element = array("title" => $elementTitle, "description" => $elementDescription);
                // Add the element to the list
                $listElements[] = $element;
            }
            // Here, you can perform additional actions such as storing the list in a database, etc.
            // For demonstration purposes, let's just print the list information.
            echo "List Title: $listTitle<br>";
            echo "Number of Elements: $numElements<br>";
            echo "<h3>List Elements:</h3>";
            foreach ($listElements as $index => $element) {
                echo "<div>";
                echo "Element " . ($index + 1) . "<br>";
                echo "Title: " . $element["title"] . "<br>";
                echo "Description: " . $element["description"] . "<br>";
                echo "</div><br>";
            }
            $_SESSION['listTitle'] = $listTitle;
            $_SESSION['numberOfElements'] = $_POST["numElements"];
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
} else {
    session_destroy();
    session_unset();
    ini_set('session.gc_max_lifetime', 0);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 1);
    header('Location: https://panopticpen.gor.bio');
    exit;
}
?>
<br><br><br>
<a style="background-color:orange;color:blue;padding:10px;color:white;border-radius:10px" href="https://panopticpen.space/admin/addlisttoblog.php?command=publishNow">Approve and publish</a>
<style>
    *{
        font-family:arial;
        color:white;
        background-color:black;
    }
</style>

 