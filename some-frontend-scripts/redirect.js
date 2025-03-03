function isUrlSafe(url){
if(/foxweather.com\/extreme-weather|news.sky.com/.test(url)){
    return true;
}else{
    return false;
}
}

const redirectLogic=()=>{
document.addEventListener('DOMContentLoaded', () => {
  // Get the URL of the current page
  let url = window.location.href;
  let redirectValue=null;
  
  if(url.includes("?redirect=")){
      redirectValue = url.substring(url.indexOf('redirect=')+9,url.length);
  }

  const badUrl = `
    ${redirectValue}
  `;
console.log(redirectValue);
  if (redirectValue !== null) { 
    // Decode the URL parameter
   

    // Parameter exists, display the URL
    // You should also validate and sanitize the redirectValue here.
    // For example, you can check if it's a valid URL before displaying it.
    if (/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(redirectValue)
    && isUrlSafe(redirectValue)
    ) {
      const goodUrl = `<style>main { display: block !important; }</style>
         <div class='redirectionDiv'><h3>Redirect Notice:</h3><br>The page you were on is trying to send you to  
        <a href="${redirectValue}" target="_blank">${redirectValue}</a>. <br>
        If you do not want to visit that page, you can <a href='https://panopticpen.space/extreme-weather-alerts/'>return to the home page</a>.
     </div>  `;
      document.querySelector('main').innerHTML = goodUrl;
    } else {
      document.querySelector('main').innerHTML = `Invalid URL provided. <br> Your URL:  ${badUrl}`;
    }
  } else {
    // Parameter doesn't exist, display a message or handle the error
    document.querySelector('main').innerHTML = badUrl;
  }
});


};redirectLogic();