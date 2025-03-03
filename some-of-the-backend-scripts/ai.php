<?php
session_start();


// Check if all required session tokens are set
if (!isset($_SESSION['username'], $_SESSION['email'], $_SESSION['status'], $_SESSION['security_code'])) {
    header("Location: login.html");
    session_destroy();
    exit();
}

 
$continueGPT=true;



// Include the file containing the API key
require_once('../../openaiapi.php');

$userMessageGlobal='';
// Function to call the ChatGPT API
function callChatGPT_API($userMessage, $apiKey) {
    if(strlen($userMessage) < 100){
       $keywords = array(" "," ");
    $containsAllKeywords = true;
  foreach ($keywords as $keyword) {
        if (stripos($userMessage, $keyword) == false) {
            $containsAllKeywords = false;
            break;
        }
        
        global $userMessageGlobal,$continueGPT;
        $userMessageGlobal=$userMessage;
        
    }

    // If the message does not contain any relevant keywords, return an error
    if (!$containsAllKeywords) {
        return "I can only help you with idea generation and brainstorming. Must include 'idea', 'can you'. Here is an example prompt: 'Hey AI, can you give me 5 ideas for a party?'";
    }else{
        require_once "internal_ai_requester.php";
        if(!request_internal_ai($userMessageGlobal)){
            echo " ! Opps! Your message does not align with our policy. Please try again. Thank you. Remember to always ask for ideas.";
                global $continueGPT;
                $continueGPT=false;
            
        };
    }
    if($continueGPT){
        
     
    // API endpoint
$endpoint = 'https://api.openai.com/v1/chat/completions';
sleep(7);
    // Request data
   $requestData = array(
    'model' => 'gpt-3.5-turbo', // Chat model
    'messages' => array(
        array(
            'role' => 'user',
            'content' => $userMessage
        )
    ),
    'max_tokens' => 65, // Maximum number of tokens in the response
    'temperature' => 1.0, // Controls the randomness of the generated response
        'stop' => ['\n'], // Stop generation at the end of a sentence
        'n' => 1 // Generate a single response
);

    // Initialize cURL session
    $curl = curl_init();

    // Set cURL options
    curl_setopt_array($curl, array(
        CURLOPT_URL => $endpoint,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($requestData),
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKey
        )
    ));

    // Execute cURL request
    $response = curl_exec($curl);

    // Check for errors
    if (curl_errno($curl)) {
        $error = curl_error($curl);
        curl_close($curl);
        die("Error calling the LLM's API: $error");
    }

    // Close cURL session
    curl_close($curl);

    // Decode JSON response
 
$responseData = json_decode($response, true);

// Check if 'choices' key exists and is not null
if (isset($responseData['choices']) && is_array($responseData['choices']) && isset($responseData['choices'][0]['text'])) {
    // Access the 'text' key
    return $responseData['choices'][0]['text'];
} else {
    // Handle the case when the key is not set or is null
    // Add debugging statements to understand the actual response
    
    // Parse the response and display only the message content
if (isset($responseData['choices'][0]['message']['content'])) {
    echo $responseData['choices'][0]['message']['content'];
} else {
    echo "Error: Unexpected response format";
}
}

}else{
        
        return "I can only help you with idea generation and brainstorming. Must include words and phrases like 'idea', 'can you help me find an idea', 'concepts'. Also don't exceed a 100 characters at most. Here is an example prompt: 'Hey AI, can you give me 5 ideas for a party?'";
   
}

}
}

// Check if user has sent a message
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userMessage"])) {
    // Get user message from POST request
    $userMessage = $_POST["userMessage"];

    // Call ChatGPT API to generate response
   if($continueGPT===true){
        $botMessage = callChatGPT_API($userMessage, $GLOBALS['globalVar']); // Use API key from included file
   }else{
       echo "Error. Try again with an idea request.";
       exit;
   }

    // Output bot message
    echo $botMessage;
    exit(); // Exit after sending response
}

?>
<!DOCTYPE HTML>
<html>
    <head>        <link rel="icon" type="image/webp" href="assets/images/icon.webp">

         <script async src="https://www.googletagmanager.com/gtag/js?id=G-T40HS5J15L"></script> <script> window.dataLayer = window.dataLayeer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-T40HS5J15L'); </script> <script type=text/javascript> var owa_baseUrl = 'https://gor.bio/analytics/'; var owa_cmds = owa_cmds || []; owa_cmds.push(['setSiteId', '594bbc82fba7393d8cc07057cd7f2d18']); owa_cmds.push(['trackPageView']); owa_cmds.push(['trackClicks']); (function() { var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true; owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl); _owa.src = owa_baseUrl + 'modules/base/dist/owa.tracker.js'; var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s); }()); </script> <!-- Yandex.Metrika counter --> <script type="text/javascript"> (function(m, e, t, r, i, k, a) { m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments) }; m[i].l = 1 * new Date(); for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } } k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a) })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(94623792, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true }); </script> <noscript> <div> <img src="https://mc.yandex.ru/watch/94623792" style="position:absolute; left:-9999px;" alt="" /> </div> </noscript> <!-- /Yandex.Metrika counter --> 
      <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BrainStormerX - Chat</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            
            
              background: url(background-5369195_1280.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  
  
        }
/* Modal styles */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 9999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
}

.modal-content {
  margin: 10% auto; /* 10% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  max-width: 800px; /* Could be more or less, depending on screen size */
  background-color: #fff;
  position: relative;
}

/* Close button */
.close {
  position: absolute;
  right: 20px;
  top: 10px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

/* Close button on hover */
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
        .container {
            max-width: 80vw;
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

        .chat-box {
            height: 300px;
            width:80vw;
            overflow-y: scroll;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
        }

        .user-message {
            background-color: #f0f0f0;
            padding: 5px 10px;
            border-radius: 5px;
            margin-bottom: 5px;
            text-align: right;
        }

        .bot-message {
            background-color: #ff5200;
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            margin-bottom: 5px;
            text-align: left;
        }

        input[type="text"] {
            width: calc(100% - 50px);
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px 0 0 5px;
            box-sizing: border-box;
        }

        input[type="submit"] {
            width: 50px;
            padding: 10px;
            border: none;
            border-radius: 0 5px 5px 0;
            background-color: #00c238;
            color: #fff;
            cursor: pointer;
        }

        #timer {
            text-align: center;
            margin-top: 10px;
        }
    </style>
    
    <script>
        function removeUrlParameter(parameterName) {
    // Get the current URL
    var url = window.location.href;

    // Split the URL into parts using the '?' character as the separator
    var urlParts = url.split('?');

    // Check if there are query parameters
    if (urlParts.length >= 2) {
        // Split the query string into individual parameters
        var parameters = urlParts[1].split('&');

        // Initialize an empty array to store the modified parameters
        var updatedParameters = [];

        // Iterate over each parameter
        for (var i = 0; i < parameters.length; i++) {
            // Split the parameter into key-value pairs
            var parameter = parameters[i].split('=');

            // Check if the parameter name matches the one to be removed
            if (parameter[0] !== parameterName) {
                // Add the parameter to the updated parameters array
                updatedParameters.push(parameters[i]);
            }
        }

        // Reconstruct the query string without the removed parameter
        var updatedQueryString = updatedParameters.join('&');

        // Rebuild the URL with the updated query string
        var updatedUrl = urlParts[0] + '?' + updatedQueryString;

        // Replace the current URL in the browser's history
        window.history.replaceState({}, document.title, updatedUrl);
    }
}

    </script>
</head>
<body>
<?php
echo "<h1 style='color:wheat' id='wait'>Please wait...</h1>";
echo '<div class="container">';
if (isset($_GET['tmrpsd']) && $_GET['tmrpsd'] == "45667754331") {
    echo '<h1>🧠 BrainStormerX - Chat 💬</h1>
        
        <div class="chat-box" id="chat-box">
            <div class="bot-message">Welcome to BrainStormerX! I am the BrainStormer AI Agent. I can generate and help you with ANY ideas! How can I assist you today? Make sure to only ask questions related to idea generation and brainstorming. Your prompts should always include these phrases: "idea", "can you".</div>
        </div>

        <form id="chat-form">
            <input type="text" id="user-input" placeholder="Type your message here...">
            <input type="submit" value="Send" id="send-button">
        </form>

        <div id="timer"></div>';

    echo '<script>removeUrlParameter(\'tmrpsd\');</script>';
} else {
    echo '<script>';
    echo 'setTimeout(function() {';
    echo 'window.location.href="?tmrpsd=45667754331";';
    echo '}, 3000);'; // 3000 milliseconds = 3 seconds
    echo '</script>';
}
echo '</div>';
?>


    <script>
        let isMessageBlocked = false;
let timerInterval;

document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    sendMessage();
});

function blockMessageEntry() {
    isMessageBlocked = true;
    let timer = 20;
    updateTimer(timer);

    timerInterval = setInterval(function() {
        timer--;
        updateTimer(timer);
        if (timer === 0) {
            clearInterval(timerInterval);
            isMessageBlocked = false;
        }
    }, 1000); // Update timer every second
}

function updateTimer(time) {
    document.getElementById('timer').innerText = "Next message in " + time + " seconds";
}

function sendMessage() {
    var userMessage = document.getElementById('user-input').value;
    userMessage=userMessage.toLowerCase();
    userMessage="..... "+userMessage;
    if (userMessage.trim() === '') return;

    if (isMessageBlocked) {
        console.log("Message entry is blocked. Please wait before sending another message.");
        return;
    }

    var chatBox = document.getElementById('chat-box');
    var userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = userMessage;
    chatBox.appendChild(userDiv);

    document.getElementById('user-input').value = '';

    blockMessageEntry();

    // Send user message to backend PHP script
    var formData = new FormData();
    formData.append('userMessage', userMessage);

    fetch('https://panopticpen.space/BrainstormerX/ai.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        var botMessage = data;
        var botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.textContent = botMessage.replace('Allowed','');
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

    </script>
    
    <div style='text-align:center;'>
        <a href="https://go.fiverr.com/visit/?bta=237457&nci=17035" Target="_Top"><img border="0" src="https://fiverr.ck-cdn.com/tn/serve/?cid=34805685"  width="250" height="250"></a> <a href="https://go.fiverr.com/visit/?bta=237457&nci=17044" Target="_Top"><img border="0" src="https://fiverr.ck-cdn.com/tn/serve/?cid=32995220"  width="250" height="250"></a><a href='https://s.click.aliexpress.com/e/_DEdccpp?bz=500*500' target='_parent'><img width='250' height='250' src='https://ae01.alicdn.com/kf/Se55f6244e0564595a7dada517a6701edq.jpg' /></a> <a href="https://fststvpn.com/65476a5bb379f/08fccd3b" target="_top"><img src="//affiliate.fastestvpn.com/accounts/default1/ogm1xb/08fccd3b.png" alt="FastestVPN Logo" title="FastestVPN Logo" width="250" height="250" /></a><img style="border:0" src="https://affiliate.fastestvpn.com/scripts/ogm1xi?a_aid=65476a5bb379f&amp;a_bid=08fccd3b" width="1" height="1" alt="" /> <a href="https://a.seoclerks.com/linkin/761347" rel="nofollow" title="SEOClerks"><img width=250 height=250 class="padding-top-1x"src="https://www.seoclerk.com/images/promotional/animated/SeoClerks300x300anim.gif" alt="SEOClerks" /></a>
    <a href="https://go.coinmama.com/visit/?bta=60983&brand=coinmama" Target="_Top"><img border="0" src="https://coinmama.ck-cdn.com/tn/serve/?cid=676867"  width="250" height="250"></a></div>
    
    
    <!-- Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <!-- Your HTML content here -->
     <br><a href="https://go.coinmama.com/visit/?bta=60983&brand=coinmama" target="_blank"><img src="https://coinmama.ck-cdn.com/tn/serve/?cid=778110" border="0" style="max-width: 100%; height: auto;"></a></p>
  </div>
</div>

<script>
// Get the modal
var modal = document.getElementById("myModal");

// Get the close button
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
   setTimeout(()=>{modal.style.display = "block";},5000);

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.querySelector('*[type="submit"]').addEventListener('click',function(){
   setTimeout(()=>{modal.style.display = "block";},21000);
 
});


document.addEventListener('DOMContentLoaded',function(){
   setTimeout(()=>{document.querySelector('h1').style.display = "none";},2000);
 
});
</script>


 
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const input = document.querySelector('#user-input');
        document.addEventListener('click', () => {
            if (input.value) {
                if (/^[a-zA-Z0-9,.!?'" ]*$/.test(input.value)) {
                    // Input contains only English letters, numbers, and basic punctuation
                    // Proceed with your logic here
                } else {
                     input.value='';
                    alert('Invalid characters detected.');
                }
            }
        });
    });
    
    
    
    
function showAdPopup() {
    document.addEventListener("DOMContentLoaded", function() {
        // Function to create and show the popup
        function createPopup() {
            // Create the overlay
            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.zIndex = 1000;

            // Create the popup container
            const popup = document.createElement("div");
            popup.style.position = "relative";
            popup.style.width = "70%";
            popup.style.maxWidth = "400px";
            popup.style.backgroundColor = "#fff";
            popup.style.padding = "10px";
            popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
            popup.style.borderRadius = "10px";

            // Create the close button
            const closeButton = document.createElement("span");
            closeButton.innerHTML = "&times;";
            closeButton.style.position = "absolute";
            closeButton.style.top = "10px";
            closeButton.style.right = "0";
            closeButton.style.cursor = "pointer";
            closeButton.style.fontSize = "24px";

            // Add event listener to close the popup
            closeButton.addEventListener("click", function() {
                document.body.removeChild(overlay);
            });

            // Create the ad container (You will insert your ad here)
            const adContainer = document.createElement("div");
            adContainer.innerHTML = `<a href="https://s.click.aliexpress.com/e/_DdWDOXF?bz=300*250" target="_parent"><img width="250" height="250" src="https://ae01.alicdn.com/kf/S3619e57974f148d087c950fe497cdf55q/300x250.jpg"></a><a href="https://www.popads.net/users/refer/2765585"><img src="http://banners.popads.net/300x250.gif" alt="PopAds.net - The Best Popunder Adnetwork" /></a>`; // Replace this with your ad content

            // Append elements to the popup and overlay
            popup.appendChild(closeButton);
            popup.appendChild(adContainer);
            overlay.appendChild(popup);
            document.body.appendChild(overlay);
        }

        // Random delay between 15 to 50 seconds
        const delay = Math.floor(Math.random() * (50000 - 15000 + 1)) + 15000;
        setTimeout(createPopup, delay);
    });
}

showAdPopup();


</script>

    
    
     
    </body>
</html>