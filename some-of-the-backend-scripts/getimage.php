<?php

ini_set('session.gc_maxlifetime', 600);
session_start();
if (!isset($_SESSION['username']) || $_SESSION['secret_phrase'] != "we are all good" || $_SESSION['username'] != "yunusemrejr") {
session_destroy();
    session_unset();
    ini_set('session.gc_max_lifetime', 0);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 1);    header("Location: panel.php");
    exit;
} 


function getPixabaySearchURLs($keyword, $apiKey) {
    // Check if a keyword is provided
    if (!empty($keyword)) {
        // Construct the Pixabay API URL for image search
        $search_url = "https://pixabay.com/api/?key=$apiKey&q=" . urlencode($keyword);

        // Initialize cURL session
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $search_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute the cURL request and store the response
        $response = curl_exec($ch);

        // Close cURL session
        curl_close($ch);

        // Check if the cURL request was successful
        if ($response === false) {
            return null; // Return null on cURL error
        }

        // Decode the JSON response
        $data = json_decode($response, true);

        // Check if the JSON decoding was successful
        if (json_last_error() === JSON_ERROR_NONE) {
            // Extract and return the image URLs
            $imageURLs = array();
            foreach ($data['hits'] as $hit) {
                $imageURLs[] = $hit['webformatURL'];
            }
            return $imageURLs[0];
        }
    }

    // If no keyword is provided or there was an error, return null
    return null;
}

// Usage example
$keyword = isset($_GET['keyword']) ? $_GET['keyword'] : '';
$apiKey = '38203661-b5c7e16d9f2ed157e4da01e5d';
$imageURLs = getPixabaySearchURLs($keyword, $apiKey);

if ($imageURLs !== null) {
    // Output the image URLs as JSON
    header('Content-Type: application/json');
    echo json_encode($imageURLs);
} else {
    echo "Error: Unable to fetch image URLs.";
}
?>
