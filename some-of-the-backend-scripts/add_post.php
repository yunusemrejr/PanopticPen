<?php
ini_set('session.gc_maxlifetime', 600);
session_start();
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
        header("Location: https://panopticpen.space?error=gbgvgg-t5t565r");
        exit;
    }
}
geocheck();
// check if the user is authenticated
if (!isset($_SESSION['username']) || $_SESSION['secret_phrase'] != "we are all good" || $_SESSION['username'] != "yunusemrejr") {
    // User is not authenticated, redirect to the login page
    session_destroy();
    session_unset();
    ini_set('session.gc_max_lifetime', 0);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 1);
        header("Location: https://panopticpen.space?error=mmnmnn-bgbvv-4r466tgg-vcdcdf5-frft65-bnh6-ggtt55");
    exit;
}
// rule 1: check if the request comes from admin/yun.php
$allowedReferer = 'https://panopticpen.space/admin/yun.php';
if ($_SERVER['HTTP_REFERER'] !== $allowedReferer) {
    session_destroy();
    session_unset();
    ini_set('session.gc_max_lifetime', 0);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 1);
        header("Location: https://panopticpen.space?error=ee3e-dd3d4-fvf44-cvf64r");
    exit();
}
////////////
function search_engine_pinger($post_file_name) {
    $with_bases = array('https://panopticpen.gor.bio/posts/' . substr($post_file_name, 0, -4), 'https://panopticpen.space/posts/' . substr($post_file_name, 0, -4));
    $search_engine_urls = array('https://check-host.net/check-ping?host=', 'https://pingomatic.com/ping/?title=' . urlencode($_POST['title']) . '&blogurl=', 'https://www.pingmylinks.com/seo-tools/website-reviewer-seo-tool/', 'https://aprc.it/api/820x312/', 'https://duckduckgo.com/?q=', 'https://www.websquash.com/cgi-bin/search/search.pl?Mode=AnonAdd&URL=', 'https://www.anoox.com/add_for_indexing_free.php?sub_res=yes&ifm=off&url_subed=', 'https://sitecheck.sucuri.net/results/', 'https://validator.w3.org/i18n-checker/check?uri=', 'https://www.ask.com/web?o=0&l=dir&qo=serpSearchTopBox&q=', 'https://seocheki.net/http-header.php?url=', 'https://pingability.com/zoneinfo.jsp?domain=', 'https://www.bing.com/search?q=site%3A', 'https://search.aol.com/aol/search?s_it=searchbox.webhome&v_t=na&q=', 'https://search.daum.net/nate?w=tot&q=', 'https://search.taobao.com/search?initiative_id=staobaoz_20120515&q=', 'https://search.walla.co.il/?q=', 'https://search.yahoo.com/search?ei=UTF-8&trackingType=go_search_home&p=', 'https://www.semrush.com/analytics/keywordoverview/?q=', 'https://securityheaders.com/?q=', 'http://dict.youdao.com/search?q=', 'http://www.oxfordeye.co.uk/redirect.aspx?url=', 'https://search.grainger.illinois.edu/searchaidlog3/sourcelognew.asp?ID=782151&goog--', 'http://lodserver.iula.upf.edu/describe/?url=', 'https://onlinemanuals.txdot.gov/help/urlstatusgo.html?url=', 'https://aprc.it/api/820x312/http://www.oxfordeye.co.uk/redirect.aspx?url=', 'https://aprc.it/api/820x312/https://search.grainger.illinois.edu/searchaidlog3/sourcelognew.asp?ID=782151&goog--', 'https://aprc.it/api/820x312/http://lodserver.iula.upf.edu/describe/?url=', 'https://aprc.it/api/820x312/https://onlinemanuals.txdot.gov/help/urlstatusgo.html?url=', 'https://arcticstorm.net/__media__/js/netsoltrademark.php?d=', 'https://arsmagica.it/__media__/js/netsoltrademark.php?d=', 'https://backtoorigin.com/__media__/js/netsoltrademark.php?d=', 'https://pandora.nla.gov.au/external.html?link=');
    // Initialize the multi-cURL handle
    $multiHandle = curl_multi_init();
    $output = '';
    $results = array();
    foreach ($search_engine_urls as $search_engine_url) {
        foreach ($with_bases as $el) {
            if (strpos($search_engine_url, 'pingomatic')) {
                $ping_url = $search_engine_url . $el . '&rssurl=https%3A%2F%2Fpanopticpen.space%2FRSS%2Frss.xml&chk_blogs=on&chk_feedburner=on&chk_tailrank=on&chk_superfeedr=on';
            } else if (strpos($search_engine_url, 'pingmylinks')) {
                $el = str_replace("https://", '', $el);
                $ping_url = $search_engine_url . $el;
            } else {
                $ping_url = $search_engine_url . $el;
            }
            // Create individual cURL handle
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $ping_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch, CURLOPT_TIMEOUT, 20);

            curl_multi_add_handle($multiHandle, $ch);
            // Append to results array
            $results[] = array('ch' => $ch, 'ping_url' => $ping_url,);
        }
    }
    // Execute the multi-cURL requests
    $active = null;
    do {
        $status = curl_multi_exec($multiHandle, $active);
    } while ($status === CURLM_CALL_MULTI_PERFORM);
    // Wait for all requests to finish
    while ($active && $status === CURLM_OK) {
        if (curl_multi_select($multiHandle) === - 1) {
            usleep(100);
        }
        do {
            $status = curl_multi_exec($multiHandle, $active);
        } while ($status === CURLM_CALL_MULTI_PERFORM);
    }
    // Process responses and close handles
    foreach ($results as $result) {
        $ch = $result['ch'];
        $ping_url = $result['ping_url'];
        $response_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($response_code === 200) {
            $result = "Loaded successfully";
        } else {
            $result = "Failed to load";
        }
        $output.= "Ping sent to: \n$ping_url\n\n\n";
        $results[] = "URL: \n\n$ping_url\n\n, Result: \n\n$result\n\n";
        curl_multi_remove_handle($multiHandle, $ch);
        curl_close($ch);
    }
    // Close the multi-cURL handle
    curl_multi_close($multiHandle);
    // Save results to a file
    $output.= implode("\n", $results);
    file_put_contents('ping-logs.txt', $output);
}
///////////



// retrieve the values from the form
if (isset($_POST['title']) && isset($_POST['image']) && isset($_POST['desc']) && isset($_POST['body']) && isset($_POST['keywords']) && isset($_POST['date'])) {
    $title = $_POST['title'];
    $image = $_POST['image'];
    $desc = $_POST['desc'];
    $body = $_POST['body'];
    $keywords = $_POST['keywords'];
    $date = $_POST['date'];
    // 3: temp string for the blog post file
    $fileContent = '<?php include_once "../admin/maintenanceSwitchFunction.php"; ?>' . PHP_EOL;
    $fileContent.= '<?php if ($url == "https://panopticpen.gor.bio/template.txt") : ?>' . PHP_EOL;
    $fileContent.= "\t" . '<?php $content = file_get_contents($url); ?>' . PHP_EOL;
    $fileContent.= "\t" . '<?php $content = str_replace("{@headDescriptionMeta}", "%REPLACE-THIS-WITH-DESC%", $content); ?>' . PHP_EOL;
    $fileContent.= "\t" . '<?php $content = str_replace("{@headTitle}", "%REPLACE-THIS-WITH-TITLE%", $content); ?>' . PHP_EOL;
    $fileContent.= "\t" . '<?php $content = str_replace("{@PostDisplayUnit}", \'%REPLACE-THIS-WITH-POST-TITLE-BODY-IMG%\', $content); ?>' . PHP_EOL;
    $fileContent.= "\t" . '<?php $content = str_replace("<!--keywords-->", "%REPLACE-THIS-WITH-KEYWORDS%", $content); ?>' . PHP_EOL;
    $fileContent.= "\t" . '<?php echo $content; ?>' . PHP_EOL;
    $fileContent.= '<?php else : ?>' . PHP_EOL;
    $fileContent.= "\t" . '<?php $content = file_get_contents($url); ?>' . PHP_EOL;
    $fileContent.= "\t" . '<?php echo $content; ?>' . PHP_EOL;
    $fileContent.= '<?php endif; ?>' . PHP_EOL;
    // 4: replace placeholders with form data in the template string
    $fileContent = str_replace("%REPLACE-THIS-WITH-DESC%", htmlspecialchars($desc, ENT_QUOTES), $fileContent);
    $fileContent = str_replace("%REPLACE-THIS-WITH-TITLE%", htmlspecialchars($title, ENT_QUOTES), $fileContent);
    $fileContent = str_replace("%REPLACE-THIS-WITH-KEYWORDS%", htmlspecialchars($keywords, ENT_QUOTES), $fileContent);
    // 5: create the structure for "%REPLACE-THIS-WITH-POST-TITLE-BODY-IMG%"
    $postContent = '<div class="post-container">';
    $postContent.= '<p>' . htmlspecialchars($date, ENT_QUOTES) . '</p>';
    $postContent.= '<h2>' . htmlspecialchars($title, ENT_QUOTES) . '</h2>';
    // add the image tag with the url
    $postContent.= '<img class="blogpostimage" style="max-height:400px;" src="' . htmlspecialchars($image, ENT_QUOTES) . '">';
    $postContent.= '<p>' . htmlspecialchars($body, ENT_QUOTES) . '</p>';
    $postContent.= '</div>';
    $fileContent = str_replace("%REPLACE-THIS-WITH-POST-TITLE-BODY-IMG%", $postContent, $fileContent);
    // 6--> create the blog post file
    $slug = strtolower(str_replace(' ', '-', $title));
    $folderpath = '../posts/';
    $filename = $slug;
    $fileextension = '.php';
    // validate and sanitize the filename
    $filename = preg_replace('/[^a-zA-Z0-9\-]/', '', $filename);
    $filenameforRedirectionatEnd = $filename . $fileextension;
    $filename = $folderpath . $filename . $fileextension;
    echo $filename;
    echo "<script>console.log('$filename')</script>";
    $file = fopen($filename, 'w');
    if ($file) {
        fwrite($file, $fileContent);
        fclose($file);
        echo '\nBlog post created successfully!';
        // trigger the sitemap updater script
        $secret_sitemap_refresh_phrase = 'fhfyrtr6493GFHF64Gfyf';
        $url = 'https://panopticpen.space/posts/sitemap_generator.php';
        $data = array('secret_sitemap_refresh_phrase' => $secret_sitemap_refresh_phrase);
        $options = array('http' => array('header' => "Content-type: application/x-www-form-urlencoded\r\n", 'method' => 'POST', 'content' => http_build_query($data),),);
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        if ($result === FALSE) {
            echo '\nFailed to trigger the sitemap updater script.';
        } else {
            echo '\nSitemap updater script triggered successfully.';
            $secret_rss_refresh_phrase = 'jhftYYt4f4f4f4fGFHuu64Gfazx';
            $url = 'https://panopticpen.space/RSS/index.php';
            $data = array('secret_rss_refresh_phrase' => $secret_rss_refresh_phrase);
            $options = array('http' => array('header' => "Content-type: application/x-www-form-urlencoded\r\n", 'method' => 'POST', 'content' => http_build_query($data),),);
            $context = stream_context_create($options);
            $result = file_get_contents($url, false, $context);
            if ($result === FALSE) {
                echo '\nFailed to trigger the rss updater script.';
            } else {
                echo '\nRSS updater script triggered successfully.';
            }
            search_engine_pinger($filenameforRedirectionatEnd);
            $redirectpostname = substr($filenameforRedirectionatEnd, 0, -4);
            echo '  <script>
        function redirectToNewPost() {
            var newPostURL = "https://panopticpen.space/posts/' . $redirectpostname . '";
            window.open(newPostURL, "_blank");
            
            
            var indexkings = "http://www.indexkings.com/?urls=https://panopticpen.space/posts/' . $redirectpostname . '&action=rapidPing";
            window.open(indexkings, "_blank");
            
            
        
        }
        redirectToNewPost();
        
        
        
        function redirectToYunPage() {
            setTimeout(function() {
                window.location.href = "https://panopticpen.gor.bio/admin/yun.php";
            }, 3000); // 3000 milliseconds (3 seconds) delay
        }
        redirectToYunPage();
    </script>';
             
        }
    } else {
        echo '\nFailed to create the blog post.';
        session_unset();
        session_destroy();
    }
} else {
    echo '\nMissing or invalid form data.';
session_destroy();
    session_unset();
    ini_set('session.gc_max_lifetime', 0);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 1);
}
?>
