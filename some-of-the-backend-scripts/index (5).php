<?php
require_once '../../../bedtime_stories_SQL/db.php';


// Function to convert plain text to HTML
function textToHtml($text) {
    // Convert special characters to HTML entities
    $text = htmlspecialchars($text);
    // Convert newlines to <br> tags
    $text = nl2br($text);
    return $text;
}

// Function to convert img tag to HTML
function imgToHtml($imgTag) {
    // Regular expression to match img tag
    $pattern = '/<img\s+src="([^"]+)"\s+width="([^"]+)"\s*\/?>/i';
    // Check if there's a match
    if (preg_match($pattern, $imgTag, $matches)) {
        // Construct HTML image tag
        $htmlImg = "<img src=\"" . $matches[1] . "\" width=\"" . $matches[2] . "\">";
        return $htmlImg;
    } else {
        return $imgTag; // Return original img tag if no match
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET["story"]) || isset($_GET["all-posts"])) {

        if (isset($_SERVER["HTTP_REFERER"]) && strpos($_SERVER["HTTP_REFERER"], "panopticpen") !== false) {

            $conn = sqlConnect(); // Establish SQL connection

            // Here, we're just creating a simple HTML string
            $htmlString = "<div><h1>Oh no! An error occurred! Please try again later!</h1></div>";

            if (isset($_GET["story"])) {
                $story = $_GET["story"];
                if ($story == "rand") {
                    // Fetch a random story from the database
                    $sql = "SELECT ID, title, body FROM stories ORDER BY RAND() LIMIT 1";
                } elseif (preg_match('/^\d+$/', $story)) {
                    // Fetch a story by ID
                    $sql = "SELECT ID, title, body FROM stories WHERE ID = $story";
                }
                $result = $conn->query($sql);
                if ($result && $result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $title = textToHtml($row["title"]);
                    $body = textToHtml($row["body"]);
                    // Convert img tag to HTML image tag
                    $body = imgToHtml($body);
                    $htmlString = "<div><h1>$title</h1><p>$body</p></div>";
                }
            } elseif (isset($_GET["all-posts"])) {
                // Fetch all posts
                $sql = "SELECT ID, title FROM stories";
                $result = $conn->query($sql);
                if ($result && $result->num_rows > 0) {
                    $htmlString = "<ul>";
                    while ($row = $result->fetch_assoc()) {
                        $id = $row["ID"];
                        $title = textToHtml($row["title"]);
                        $htmlString .= "<li><a href=\"https://panopticpen.space/bedtime-stories/story.html?story=$id\">$title</a></li>";
                    }
                    $htmlString .= "</ul>";
                }
            }

            // Close SQL connection
            $conn->close();

            // Set the appropriate headers to indicate that the response contains HTML content
            header('Content-Type: text/html');

            // Output the HTML string without escaping
            echo html_entity_decode($htmlString);
        } else { // If the referer is not from "panopticpen", return an error
            http_response_code(403); // Forbidden
            echo "Access Forbidden";
        }
    } else { // If the required parameters are missing, return an error
        http_response_code(400); // Bad Request
        echo "Bad Request";
    }
} else { // If the request method is not GET, return an error
    http_response_code(405); // Method Not Allowed
    echo "Method Not Allowed";
}
?>
