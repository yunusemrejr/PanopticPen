const allalerts=(status_for_allalerts_req)=>{
    if(status_for_allalerts_req){

const url_base="https://panopticpen.space/extreme-weather-alerts/";
if(url_base+"?section=allalerts"){
 
     // Define the URL to which you want to send the POST request
const apiUrl = 'https://panopticpen.space/extreme-weather-alerts/api.php';  

// Create a JSON object to be sent as the request body
const requestBody = {
  message: "https://news.sky.com/topic/extreme-weather-9472",
};

// Define the options for the Fetch API request, including the method, headers, and body
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Specify that you are sending JSON data
  },
  body: JSON.stringify(requestBody), // Convert the JSON object to a string
};
            document.querySelector('main').innerHTML += `<p class="fetching-wait"><i class="fa-solid fa-spinner"></i></p>`;

// Make the Fetch API POST request
fetch(apiUrl, requestOptions)
  .then((response) => {

    if (!response.ok) {
      document.querySelector('main').innerHTML += `OOPS! WE COULDN'T FETCH ALL LIVE WEATHER DATA! COME BACK LATER! SORRY!`;
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text(); // Use response.text() to get the response as a text
    
  })
  .then((data) => {
    console.log(data); // Log the response to the console
   parseHTML(data);
   document.querySelector('.fetching-wait').remove();
  })
  .catch((error) => {
    console.error('Error:', error);
    // Handle errors here
    document.querySelector('main').innerHTML += `OOPS! WE COULDN'T FETCH ALL LIVE WEATHER DATA! COME BACK LATER! SORRY!`;
  });


///////////////
function parseHTML(response) {

const parser = new DOMParser();
const htmlDoc = parser.parseFromString(response, 'text/html');
    // Extracting data from each <item> element
    var items = htmlDoc.getElementsByClassName("ui-story-headline");

    if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
            var currentItem = items[i];

            // Extract 'link' from the current item
            var link = "https://news.sky.com/"+currentItem.querySelector("a").href.replace("panopticpen.space",'');
            var title = currentItem.querySelector("a").textContent;
           let CountryCode ="World";
           let CountryFullName ="World";
           
           
   ////////////////////        
    const titleLowerCase = title.toLowerCase();
const usaKeywords = [ "united states", "usa", "america", "united states of america", "us", "american", "washington", "new york", "los angeles", "chicago", "boston", "san francisco", "miami", "texas", "florida", "california", "illinois", "massachusetts", "texas", "florida", "california", "illinois", "massachusetts", "arizona", "nevada", "colorado", "georgia", "hawaii", "alaska", "michigan", "ohio", "pennsylvania", "tennessee", "virginia", "carolina", "idaho", "kansas", "louisiana", "oregon", "utah", "wisconsin", "alabama", "montana", "oklahoma", "arkansas", "new mexico", "minnesota", "iowa", "mississippi", "missouri", "nebraska", "new hampshire", "new jersey", "north dakota", "rhode island", "south dakota", "vermont", "west virginia", "wyoming" ];
 const africaKeywords = [ "africa", "african", "north africa", "sub-saharan africa", "east africa", "west africa", "central africa", "south africa", "nigeria", "egypt", "kenya", "south africa", "morocco", "ethiopia", "tanzania", "ghana", "uganda", "algeria", "sudan", "libya", "tunisia", "niger", "mali", "mauritania", "chad", "cameroon", "niger", "mali", "mauritania", "chad", "cameroon", "ivory coast", "cote d'ivoire", "liberia", "sierra leone", "senegal", "gambia", "guinea", "guinea-bissau", "burkina faso", "benin", "togo", "gabon", "congo", "angola", "zambia", "zimbabwe", "malawi", "mozambique", "namibia", "botswana", "south sudan", "eritrea", "djibouti", "somalia", "rwanda", "burundi", "seychelles", "comoros", "madagascar", "cape verde", "mauritius", "lesotho", "swaziland", "eswatini", "reunion", "mayotte", "saint helena", "ascension island", "tristan da cunha" ];
const asiaCapitalCities = [ "hong kong","beijing", "new delhi", "tokyo", "seoul", "pyongyang", "ulaanbaatar", "taipei", "islamabad", "dhaka", "colombo", "kathmandu", "thimphu", "male", "kabul", "tehran", "baghdad", "damascus", "ankara", "jerusalem", "ramallah", "beirut", "amman", "riyadh", "sanaa", "muscat", "abu dhabi", "doha", "kuwait city", "manama", "nicosia", "astana", "tashkent", "ashgabat", "dushanbe", "bishkek", "kabul", "islamabad", "kathmandu", "thimphu", "male", "colombo", "naypyidaw", "bangkok", "vientiane", "phnom penh", "hanoi", "kuala lumpur", "singapore", "jakarta", "bandar seri begawan", "manila", "ulaanbaatar", "lhasa", "kathmandu", "tehran", "baghdad", "jerusalem", "ramallah", "beirut", "amman", "riyadh", "sanaa", "muscat", "abu dhabi", "doha", "kuwait city", "manama", "nicosia", ]; 
const ukKeywords = [ "united kingdom", "england", "english", "uk", "britain", "scotland", "london", "wales", "northern ireland", "british", "british isles", "great britain", "westminster", "edinburgh", "cardiff", "belfast", "glasgow", "liverpool", "manchester" ];
 const europeCountryNames = [ "albania", "andorra", "austria", "belarus", "belgium", "bosnia and herzegovina", "bulgaria", "croatia", "cyprus", "czech republic", "denmark", "estonia", "finland", "france", "germany", "greece", "hungary", "iceland", "ireland", "italy", "kosovo", "latvia", "liechtenstein", "lithuania", "luxembourg", "malta", "moldova", "monaco", "montenegro", "netherlands", "north macedonia", "norway", "poland", "portugal", "romania", "russia", "san marino", "serbia", "slovakia", "slovenia", "spain", "sweden", "switzerland", "ukraine", "united kingdom", "vatican city", ];
const southamericaKeywords = [ "argentina", "bolivia", "brazil", "chile", "colombia", "ecuador", "guyana", "paraguay", "peru", "suriname", "uruguay", "venezuela" ];    if (ukKeywords.some(keyword => titleLowerCase.includes(keyword))) {
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
        case title.toLowerCase().includes("united states"):
            CountryCode = "US";
            CountryFullName = "United States";
            break;
        case title.toLowerCase().includes("canada"):
            CountryCode = "CA";
            CountryFullName = "Canada";
            break;
        case title.toLowerCase().includes("australia"):
            CountryCode = "AU";
            CountryFullName = "Australia";
            break;
        case title.toLowerCase().includes("german"):
            CountryCode = "DE";
            CountryFullName = "Germany";
            break;

        case title.toLowerCase().includes("italy"):
            CountryCode = "IT";
            CountryFullName = "Italy";
            break;
        case title.toLowerCase().includes("spain"):
            CountryCode = "ES";
            CountryFullName = "Spain";
            break;
 
        case title.toLowerCase().includes("ukraine"):
            CountryCode = "UA";
            CountryFullName = "Ukraine";
            break;
        case title.toLowerCase().includes("greece"):
            CountryCode = "GR";
            CountryFullName = "Greece";
            break;
        case title.toLowerCase().includes("japan"):
            CountryCode = "JP";
            CountryFullName = "Japan";
            break;
        case title.toLowerCase().includes("china"):
            CountryCode = "CN";
            CountryFullName = "China";
            break;
             
        case title.toLowerCase().includes("india"):
            CountryCode = "IN";
            CountryFullName = "India";
            break;
        case title.toLowerCase().includes("korea"):
            CountryCode = "KR";
            CountryFullName = "South Korea";
            break;
        case title.toLowerCase().includes("thailand"):
            CountryCode = "TH";
            CountryFullName = "Thailand";
            break;
        case title.toLowerCase().includes("vietnam"):
            CountryCode = "VN";
            CountryFullName = "Vietnam";
            break;
        case title.toLowerCase().includes("malaysia"):
            CountryCode = "MY";
            CountryFullName = "Malaysia";
            break;
        case title.toLowerCase().includes("indonesia"):
            CountryCode = "ID";
            CountryFullName = "Indonesia";
            break;
        case title.toLowerCase().includes("philippines"):
            CountryCode = "PH";
            CountryFullName = "Philippines";
            break;
        case title.toLowerCase().includes("sri lanka"):
            CountryCode = "LK";
            CountryFullName = "Sri Lanka";
            break;
        // Add more cases for additional countries
        default:
            // Default case if category doesn't match any specific case
            break;
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
    </div>`;

  }
        setTimeout(()=>alert_adjust(arr=document.querySelectorAll(".location")),1500);
    } else {
        console.log("No item elements found.");
    }
}

////////



}


 }
};
