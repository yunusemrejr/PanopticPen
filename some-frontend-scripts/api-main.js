
let base="https://panopticpen.space/extreme-weather-alerts/";
if(window.location.href==base||window.location.href==base+"?section=allalerts"||window.location.href==base+"?section=searchalerts"||window.location.href==base+"?section=sharealerts"){
 

let status_for_allalerts_req=false;
const red_keywords = [
  "tornado",
  "hurricane",
  "typhoon",
  "blizzard",
  "extreme cold",
  "heavy snow",
  "flash flood",
  "severe thunderstorm",
  "tropical storm",
  "storm surge",
  "high winds",
  "tsunami",
  "wildfire",
  "earthquake",
  "volcano eruption",
  "hailstorm",
  "avalanche",
  "landslide",
  "heatwave",
  "cyclone",
  "heat index",
  "tornado warning",
  "severe thunderstorm warning",
  "volcanic ash",
];

const orange_keywords = [
  "heavy rain",
  "flood",
  "winter storm",
  "freezing rain",
  "dense fog",
  "sleet",
  "ice storm",
  "heat wave",
  "tropical depression",
  "tornado watch",
  "severe thunderstorm watch",
  "hurricane watch",
  "typhoon watch",
  "wildfire warning",
  "flash flood watch",
  "flash flood warning",
  "heavy rainfall",
  "coastal flood",
  "mudslide",
  "blizzard warning",
  "wind chill",
  "heat advisory",
  "hail warning",
];



const alert_adjust=(arr)=>{
    arr.forEach((el)=>{
        el_TXT = el.textContent.toLowerCase();
      red_keywords.forEach((kw)=>{
          if(el_TXT.includes(kw)){
          el.querySelector('.redwarngif').src="a1fyRka.gif";
          
          }
      });
      orange_keywords.forEach((kw)=>{
          if(el_TXT.includes(kw)){
          el.querySelector('.redwarngif').src="midwarning.gif";
          }
      });
    });
};

const url_base="https://panopticpen.space/extreme-weather-alerts/";
if(window.location.href==url_base||url_base+"?section=allalerts"){
    document.addEventListener('DOMContentLoaded',()=>{
 document.querySelector('main').innerHTML=`<p class="fetching-wait">Fetching live weather data... please wait...<i class="fa-solid fa-spinner"></i></p>`;

    // Creating a new XMLHttpRequest
var xhr = new XMLHttpRequest();
var response;
// Define the URL of the PHP script
var url = 'https://panopticpen.space/extreme-weather-alerts/api.php'; // Replace with the actual URL of your PHP script

// Configure the request
xhr.open('GET', url, true);

// Set up a function to handle the response
xhr.onreadystatechange = function() {
    // Check if the request is complete
    if (xhr.readyState === XMLHttpRequest.DONE) {
        // Check if the request was successful
        if (xhr.status === 200) {
            // Here you can handle the XML response
            response=xhr.responseText;
            console.log(xhr.responseText);
            document.querySelector('main').innerHTML=``;
            parseXML(response);
            status_for_allalerts_req = true;

            
        } else {
            // Handle errors here
            console.error('Error in request: ' + xhr.statusText);
            document.querySelector('main').innerHTML=`OOPS! WE COULDN'T FETCH LIVE WEATHER DATA! COME BACK LATER! SORRY!`;
        }
          allalerts(status_for_allalerts_req);
    }
};
// Send the request
xhr.send();

///////////////
function parseXML(response) {
    // Parse the XML string
    var parser = new DOMParser();
var xmlDoc = parser.parseFromString(response, "text/xml");

    // Extracting data from each <item> element
    var items = xmlDoc.getElementsByTagName("item");

    if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
            var currentItem = items[i];

            // Extract 'link' from the current item
            var linkElements = currentItem.getElementsByTagName("link");
            var link = linkElements.length > 0 ? linkElements[0].textContent : "Link not found";

            // Extract 'title' from the current item
            var titleElements = currentItem.getElementsByTagName("title");
            var title = titleElements.length > 0 ? titleElements[0].textContent : "Title not found";

            // Extract 'category' from the current item
            var categoryElements = currentItem.getElementsByTagName("category");
          

// Extract 'description' from the current item
            var descriptionElements = currentItem.getElementsByTagName("description");
            var description = titleElements.length > 0 ? descriptionElements[0].textContent : "Description not found";
             /////////

            console.log("Item " + (i + 1) + ":");
            console.log("Link: " + link);
            console.log("Title: " + title);
           console.log("Title: " + description);
           let content = description;
           let CountryCode ="World";
           let CountryFullName ="World";
        
    
for (let i = 0; i < categoryElements.length; i++) {
    let category = categoryElements[i].textContent;
   ////////////////////        
    const titleLowerCase = title.toLowerCase();
const usaKeywords = [ "united states", "usa", "america", "united states of america", "us", "american", "washington", "new york", "los angeles", "chicago", "boston", "san francisco", "miami", "texas", "florida", "california", "illinois", "massachusetts", "texas", "florida", "california", "illinois", "massachusetts", "arizona", "nevada", "colorado", "georgia", "hawaii", "alaska", "michigan", "ohio", "pennsylvania", "tennessee", "virginia", "carolina", "idaho", "kansas", "louisiana", "oregon", "utah", "wisconsin", "alabama", "montana", "oklahoma", "arkansas", "new mexico", "minnesota", "iowa", "mississippi", "missouri", "nebraska", "new hampshire", "new jersey", "north dakota", "rhode island", "south dakota", "vermont", "west virginia", "wyoming" ];
 const africaKeywords = [ "africa", "african", "north africa", "sub-saharan africa", "east africa", "west africa", "central africa", "south africa", "nigeria", "egypt", "kenya", "south africa", "morocco", "ethiopia", "tanzania", "ghana", "uganda", "algeria", "sudan", "libya", "tunisia", "niger", "mali", "mauritania", "chad", "cameroon", "niger", "mali", "mauritania", "chad", "cameroon", "ivory coast", "cote d'ivoire", "liberia", "sierra leone", "senegal", "gambia", "guinea", "guinea-bissau", "burkina faso", "benin", "togo", "gabon", "congo", "angola", "zambia", "zimbabwe", "malawi", "mozambique", "namibia", "botswana", "south sudan", "eritrea", "djibouti", "somalia", "rwanda", "burundi", "seychelles", "comoros", "madagascar", "cape verde", "mauritius", "lesotho", "swaziland", "eswatini", "reunion", "mayotte", "saint helena", "ascension island", "tristan da cunha" ];
const asiaCapitalCities = [ "hong kong","beijing", "new delhi", "tokyo", "seoul", "pyongyang", "ulaanbaatar", "taipei", "islamabad", "dhaka", "colombo", "kathmandu", "thimphu", "male", "kabul", "tehran", "baghdad", "damascus", "ankara", "jerusalem", "ramallah", "beirut", "amman", "riyadh", "sanaa", "muscat", "abu dhabi", "doha", "kuwait city", "manama", "nicosia", "astana", "tashkent", "ashgabat", "dushanbe", "bishkek", "kabul", "islamabad", "kathmandu", "thimphu", "male", "colombo", "naypyidaw", "bangkok", "vientiane", "phnom penh", "hanoi", "kuala lumpur", "singapore", "jakarta", "bandar seri begawan", "manila", "ulaanbaatar", "lhasa", "kathmandu", "tehran", "baghdad", "jerusalem", "ramallah", "beirut", "amman", "riyadh", "sanaa", "muscat", "abu dhabi", "doha", "kuwait city", "manama", "nicosia", ]; 
const ukKeywords = [ "united kingdom", "england", "english", "uk", "britain", "scotland", "london", "wales", "northern ireland", "british", "british isles", "great britain", "westminster", "edinburgh", "cardiff", "belfast", "glasgow", "liverpool", "manchester" ];
 const europeCountryNames = [ "albania", "andorra", "austria", "belarus", "belgium", "bosnia and herzegovina", "bulgaria", "croatia", "cyprus", "czech republic", "denmark", "estonia", "finland", "france", "germany", "greece", "hungary", "iceland", "ireland", "italy", "kosovo", "latvia", "liechtenstein", "lithuania", "luxembourg", "malta", "moldova", "monaco", "montenegro", "netherlands", "north macedonia", "norway", "poland", "portugal", "romania", "russia", "san marino", "serbia", "slovakia", "slovenia", "spain", "sweden", "switzerland", "ukraine", "united kingdom", "vatican city", ];
const southamericaKeywords = [ "argentina", "bolivia", "brazil", "chile", "colombia", "ecuador", "guyana", "paraguay", "peru", "suriname", "uruguay", "venezuela" ];  

if (ukKeywords.some(keyword => titleLowerCase.includes(keyword))) {
        CountryCode = "GB";
        CountryFullName = "United Kingdom";
    }
    
    else if (africaKeywords.some(keyword => titleLowerCase.includes(keyword))) {
        CountryCode = "AFRICA";
        CountryFullName = "Africa";
    }    
    
    else if (southamericaKeywords.some(keyword => titleLowerCase.includes(keyword))) {
        CountryCode = "SOUTHAMERICA";
        CountryFullName = "South America";
    }
    
    else if (asiaCapitalCities.some(keyword => titleLowerCase.includes(keyword))) {
        CountryCode = "ASIA";
        CountryFullName = "Asia";
    }
    
    else if (usaKeywords.some(keyword => titleLowerCase.includes(keyword))) {
        CountryCode = "US";
        CountryFullName = "United States";
    }
    
    else if (europeCountryNames.some(keyword => titleLowerCase.includes(keyword))) {
        CountryCode = "EU";
        CountryFullName = "European Union";
    }
 //////////
    switch (true) {
        case category.includes("us-regions")||title.toLowerCase().includes("united states"):
            CountryCode = "US";
            CountryFullName = "United States";
            break;
        case category.includes("canada")||title.toLowerCase().includes("canada"):
            CountryCode = "CA";
            CountryFullName = "Canada";
            break;
        case category.includes("australia")||title.toLowerCase().includes("australia"):
            CountryCode = "AU";
            CountryFullName = "Australia";
            break;
        case category.includes("germany")||title.toLowerCase().includes("germany"):
            CountryCode = "DE";
            CountryFullName = "Germany";
            break;
        // Add more cases for additional countries
        case category.includes("italy")||title.toLowerCase().includes("italy"):
            CountryCode = "IT";
            CountryFullName = "Italy";
            break;
        case category.includes("spain")||title.toLowerCase().includes("spain"):
            CountryCode = "ES";
            CountryFullName = "Spain";
            break;
        case category.includes("uk")||title.toLowerCase().includes("united kingdom")
        ||title.toLowerCase().includes("england")||title.toLowerCase().includes("english"):
            CountryCode = "GB";
            CountryFullName = "United Kingdom";
            break;
        case category.includes("ukraine")||title.toLowerCase().includes("ukraine"):
            CountryCode = "UA";
            CountryFullName = "Ukraine";
            break;
        case category.includes("japan")||title.toLowerCase().includes("japan"):
            CountryCode = "JP";
            CountryFullName = "Japan";
            break;
        case category.includes("china")||title.toLowerCase().includes("china"):
            CountryCode = "CN";
            CountryFullName = "China";
            break;
             
        case category.includes("india")||title.toLowerCase().includes("india"):
            CountryCode = "IN";
            CountryFullName = "India";
            break;
        case category.includes("south-korea")||title.toLowerCase().includes("korea"):
            CountryCode = "KR";
            CountryFullName = "South Korea";
            break;
                    case title.toLowerCase().includes("greece"):
            CountryCode = "GR";
            CountryFullName = "Greece";
            break;
        case category.includes("thailand")||title.toLowerCase().includes("thailand"):
            CountryCode = "TH";
            CountryFullName = "Thailand";
            break;
        case category.includes("vietnam")||title.toLowerCase().includes("vietnam"):
            CountryCode = "VN";
            CountryFullName = "Vietnam";
            break;
        case category.includes("malaysia")||title.toLowerCase().includes("malaysia"):
            CountryCode = "MY";
            CountryFullName = "Malaysia";
            break;
        case category.includes("indonesia")||title.toLowerCase().includes("indonesia"):
            CountryCode = "ID";
            CountryFullName = "Indonesia";
            break;
        case category.includes("philippines")||title.toLowerCase().includes("philippines"):
            CountryCode = "PH";
            CountryFullName = "Philippines";
            break;
        case category.includes("sri-lanka")||title.toLowerCase().includes("sri lanka"):
            CountryCode = "LK";
            CountryFullName = "Sri Lanka";
            break;
        // Add more cases for additional countries
        default:
            // Default case if category doesn't match any specific case
            break;
    }
}

const main = document.querySelector('main');
const flagsSrc = (CountryCode !== "World" && CountryCode !== "AFRICA" && CountryCode !== "ASIA" && CountryCode !== "SOUTHAMERICA") ?
    `http://purecatamphetamine.github.io/country-flag-icons/3x2/${CountryCode}.svg` :
    (CountryCode === "AFRICA" ? "https://panopticpen.space/extreme-weather-alerts/2802682.png" :
     CountryCode === "ASIA" ? "https://panopticpen.space/extreme-weather-alerts/6195239.png" :
     CountryCode === "SOUTHAMERICA" ? "https://panopticpen.space/extreme-weather-alerts/1017609.png" :
     "https://panopticpen.space/extreme-weather-alerts/earth.png");

 link = link.replace("https:///",'');

main.innerHTML += `
    <div class="location">
        <span><img class="flags" alt="${CountryCode}" src="${flagsSrc}"/><h3>${CountryFullName}</h3><img src="graywarning.gif" class="redwarngif" /></span>
        <a style="text-decoration:none;" href="${link}"><p><b><i>${title}</i></b></p></a>
        <p>${content}</p>
    </div>`;

  }
        setTimeout(()=>alert_adjust(arr=document.querySelectorAll(".location")),1500);
    } else {
        console.log("No item elements found.");
    }
}

////////

});

}


}
const breakingnewsTicker = () => {
  const rssUrl = 'https://moxie.foxweather.com/google-publisher/weather-news.xml';
  const tickerUL = document.querySelector('.ticker-container ul');

  const url = 'https://panopticpen.space/extreme-weather-alerts/api.php';

  // Create an object with the data to send in the POST request
  const postData = {
    message: rssUrl,
  };

  // Define the options for the fetch request
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
    body: JSON.stringify(postData), // Convert the data to JSON format
  };

  // Make the POST request
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      // Handle the response data here
      console.log(data);

      try {
        // Parse the XML string
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, "text/xml");

        // Extracting data from each <item> element
        var items = xmlDoc.getElementsByTagName("item");

        if (items.length > 0) {
          for (var i = 0; i < items.length; i++) {
            var currentItem = items[i];

            // Extract 'link' from the current item
            var linkElements = currentItem.getElementsByTagName("link");
            var link = linkElements.length > 0 ? linkElements[0].textContent : "Link not found";

            // Extract 'title' from the current item
            var titleElements = currentItem.getElementsByTagName("title");
            var title = titleElements.length > 0 ? titleElements[0].textContent : "Title not found";

            let li = document.createElement('li');
            let li_a = document.createElement('a');
            li_a.href = link;
            li_a.textContent = title;
            li.appendChild(li_a);
            tickerUL.appendChild(li);
          }
        }
      } catch (error) {
        console.error('Error parsing XML:', error);
      }
    })
    .catch((error) => {
      // Handle errors here
      console.error('Error in request:', error);
    });
};

document.addEventListener('DOMContentLoaded', breakingnewsTicker);
