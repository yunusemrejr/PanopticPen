function isMobileDevice() {
  // Check user agent string
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // Check screen size
  const isMobileScreenSize = window.innerWidth <= 768; // You can adjust this threshold as needed
  // Return true if either the user agent or screen size indicates a mobile device
  return isMobileUserAgent || isMobileScreenSize;
}
 document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.querySelector(".menu-toggle");

    // Function to open the sidebar
    function openSidebar() {
        sidebar.style.left = "0";
    }

    // Function to close the sidebar
    function closeSidebar() {
        sidebar.style.left = "-250px";
    }
     let firstTimeInSession=true;
    // Toggle the sidebar when the menu button is clicked
    menuToggle.addEventListener("click", function () { 
        if(firstTimeInSession){
            menuToggle.click();
            firstTimeInSession=false;
        }
        if (sidebar.style.left === "0px" || sidebar.style.left === "") {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
});

////////NEW GEN. POPAD SCRIPT ADDER
const insertNewGrenAdScript=()=>{
    const url='https://panopticpen.gor.bio/scripts/new-generation-pop-ad.js';
    const scriptElement=document.createElement('script');
    scriptElement.src=url;
    document.body.appendChild(scriptElement);
};document.addEventListener('DOMContentLoaded',insertNewGrenAdScript);
///////end


 const loadingScreen = document.getElementById("loading-screen");
 
 
// Wait for the page to fully load
window.addEventListener("load", function () {
    // Hide the loading screen
    loadingScreen.style.display = "none";
});

document.addEventListener('DOMContentLoaded',()=>{
   setTimeout(()=>{
       if(document.getElementById("loading-screen")){
    document.getElementById("loading-screen").remove();
}
   },7000); 
});




const tickerHover = (action) => {
    let tickerElement = document.querySelector(".ticker-container ul");

    if (action === 'enter') {
        tickerElement.style.animationPlayState = "paused";
    } else if (action === 'leave') {
        tickerElement.style.animationPlayState = "running";
    }
};

document.addEventListener('DOMContentLoaded',()=>{
    let paramValue = new URLSearchParams(window.location.search).get('section');
    if(paramValue!==null){
    let arr=['emergencycontacts','weatherresources','faq'];
    arr.forEach((page)=>{
      if(page==(paramValue)){
        document.querySelector('main').classList.add('content-styles-other-li');
    }  
    });
    }
    
});


document.addEventListener('DOMContentLoaded',function(){
   const searchParams = new URLSearchParams(window.location.search);
  const sectionValue = searchParams.get('section');
  if(sectionValue === 'redirect'){
      alert();
  }
});


document.addEventListener('DOMContentLoaded',function(){
    
    
const header = document.querySelector('header');
const arr=['headerbg.webp','headerbg2.webp'];
const rand =()=>{return Math.floor(Math.random()*arr.length)};
header.style.backgroundImage = `url(${arr[rand()]})`;

 setInterval(()=>{const header = document.querySelector('header');
const arr=['headerbg.webp','headerbg2.webp'];
const rand =()=>{return Math.floor(Math.random()*arr.length)};
header.style.backgroundImage = `url(${arr[rand()]})`;},5000);   
    
    
    
    
    
});