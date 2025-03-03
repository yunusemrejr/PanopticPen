 
    function refreshPg(){
    window.location.reload();
}
function sitemap(){
    const main=document.querySelector('main');
    main.innerHTML=null;
    
    const HTML_H2=document.createElement('h2');
    HTML_H2.setAttribute('id','sitemapTitle');
    HTML_H2.textContent='Complete Sitemap';
    main.appendChild(HTML_H2);

    const sitemap_elements_array={
        "welcome_page":{
            "text":"Welcome Page (here)",
            "url":"https://panopticpen.space/landing2/"
        },
        "online_writing_tools_v2":{
            "text":"Online Writing Tools V.2",
            "url":"https://panopticpen.space/v2/writing-tools"
        },
        "Offline_CLI_Tools":{
            "text":"Offline CLI Tools",
            "url":"https://panopticpen.space/v2/CLI-applications"
        },  
        "Articles_Hub":{
            "text":"Articles Hub / Old House",
            "url":"https://panopticpen.space/"
        }, 
        "landing_page":{
            "text":"Landing Page",
            "url":"https://panopticpen.space/landing.html"
        }, 
        "discount_monster":{
            "text":"Discount Monster",
            "url":"https://panopticpen.space/discount-monster/"
        }, 
        "online_quizzes":{
            "text":"Online Quizzes",
            "url":"https://panopticpen.space/Quizzes/"
        }, 
        "various_html5_tools":{
            "text":"Various HTML5 Tools (V.1)",
            "url":"https://panopticpen.space/Tools/"
        }, 
        "coffee_blog":{
            "text":"Coffee Blog",
            "url":"https://panopticpen.space/coffee"
        }, 
        "unix_blog":{
            "text":"Unix Blog",
            "url":"https://panopticpen.space/unixshellexplorations"
        }, 
        "spanish_blog":{
            "text":"Spanish Articles",
            "url":"https://panopticpen.space/spanish"
        }, 
        "lists_section":{
            "text":"Various Lists Page",
            "url":"https://panopticpen.space/lists/"
        }, 
        "gifts_section":{
            "text":"Gifts Section",
            "url":"https://panopticpen.space/Gifts/"
        }, 
        "ebooks_section":{
            "text":"E-Books Section",
            "url":"https://panopticpen.space/more/ebooks/"
        }, 
        "more_section":{
            "text":"More (+) [contains paths to various sub-sections]",
            "url":"https://panopticpen.space/more/"
        }, 
   
    };
    const arr_length = Object.keys(sitemap_elements_array).length;

    for (const key in sitemap_elements_array) {
        if (sitemap_elements_array.hasOwnProperty(key)) {
            let sitemap_element = document.createElement('a');
            sitemap_element.setAttribute('class', 'sitemapElement');
            sitemap_element.textContent = sitemap_elements_array[key].text;
            sitemap_element.href = sitemap_elements_array[key].url;
            main.appendChild(sitemap_element);
            let breakTg=document.createElement('br');
            main.appendChild(breakTg);
        }
    }
 

  
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

function bottomAds(){
    
    const section=document.querySelector('#bottom-text-ad-section');
    section.style.visibility='hidden';
    let array_of_text_ads={
        "fiverr":{
            "text":"Come to Fiverr and find awesome freelancers!",
            "url":"https://go.fiverr.com/visit/?bta=237457&nci=9373"
        },
        "coinmama":{
            "text":"Come to Coinmama and trade any crypto you want!",
            "url":"https://go.coinmama.com/visit/?bta=60983&brand=coinmama"
        },
        "fastestvpn":{
            "text":"Protect your data with fastest and cheapest VPN ever! Lifetime Special Deal!",
            "url":"https://fststvpn.com/65476a5bb379f/eca3b4ac"
        },
        "hostinger":{
            "text":"Cheap & reliable hosting! Come to Hostinger for hosting & SSL!",
            "url":"https://hostinger.com/?REFERRALCODE=1YUNUSAPOSS08"
        },
        "seoclerks":{
            "text":"Come to SEOClerks & let us handle your SEO!",
            "url":"https://a.seoclerks.com/linkin/761347"
        },
        "popads":{
            "text":"Come to PopAds, the best popunder network for publishers & advertisers!",
            "url":"https://www.popads.net/users/refer/2765585"
        },
        "ledger":{
            "text":"Order your Ledger Nano S Plus, the secure gateway to your crypto needs!",
            "url":"https://shop.ledger.com/pages/ledger-nano-s-plus/?r=76e2e8e33cb3"
        },
        "cexio":{
            "text":"Come & buy Bitcoins with credit card at CEX.IO!",
            "url":"https://cex.io/r/0/up130880992/0/"
        },
        "cryptohopper":{
            "text":"Automate your crypto trading with Crypto Hopper! Free Trial!",
            "url":"https://www.cryptohopper.com/?atid=22050"
        }
    }
    const keysArray = Object.keys(array_of_text_ads);

    shuffleArray(keysArray);
    const shuffledObject = {};
    keysArray.forEach((key) => {
      shuffledObject[key] = array_of_text_ads[key];
    });
    
    array_of_text_ads=shuffledObject;

    let i=1;
    let objectkeys=Object.keys(array_of_text_ads);
    section.style.visibility='visible';
    let index=Math.floor(objectkeys.length-i);
    let randomKey=objectkeys[index];
    section.innerHTML=`<a style='text-decoration:none;color:#DDF2FD' href=${array_of_text_ads[randomKey].url}>${array_of_text_ads[randomKey].text}</a>`;
    setInterval(()=>{
        let objectkeys=Object.keys(array_of_text_ads);
        section.style.visibility='visible';
        let index=Math.floor(objectkeys.length-i);
        let randomKey=objectkeys[index];
        section.innerHTML=`<a style='text-decoration:none;color:#DDF2FD' href=${array_of_text_ads[randomKey].url}>${array_of_text_ads[randomKey].text}</a>`;
        i < objectkeys.length ? i++ : i=1;

    },5000);
}
document.addEventListener('DOMContentLoaded',bottomAds);
 
function randomNumberForOrangeAd(){
    return Math.floor(Math.random()*20);
}
function randomOrangeAd(){
     if(randomNumberForOrangeAd()==5){
    orangeColor='#ff5722cf';
    const el=document.querySelector('#bottom-text-ad-section');
    el.style.backgroundColor=orangeColor;
}
}
document.addEventListener('DOMContentLoaded',randomOrangeAd);


///
function isMobileDevice() {
  // Check user agent string
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // Check screen size
  const isMobileScreenSize = window.innerWidth <= 768; // You can adjust this threshold as needed
  // Return true if either the user agent or screen size indicates a mobile device
  return isMobileUserAgent || isMobileScreenSize;
}

function showBannerAdsIfUserOnDesktop() {
    let bannerArr;
    const styleOfBanners=document.createElement('style');
  if (!isMobileDevice()) {
        bannerArr = [
      '<a href="https://www.popads.net/users/refer/2765585"><img src="http://banners.popads.net/728x90.gif" alt="PopAds.net - The Best Popunder Adnetwork"></a>',
      `<a href="https://s.click.aliexpress.com/e/_DkkP1Zj?bz=725*90" target="_parent"><img width="725" height="90" src="https://ae01.alicdn.com/kf/Sb50b07a2e80749d49d5b652d4a4befda7.jpg"></a>`,
      `<a href="https://go.fiverr.com/visit/?bta=237457&amp;nci=9325" rel="sponsored" target="_Top"><img border="0" src="https://panopticpen.gor.bio/media/FiverrTopAds/everygreaygame.jpeg" width="728" height="90"></a>`,
      `<a target="_blank" href="https://prposting.com/ref/d5jjZp5K" style="font-size: 48px;"> <img src="https://cloudflare-ipfs.com/ipfs/QmQuEf77top42BxCSf3TeJN78PmyMcc4xv6LCZwhe2PMJ7" alt="PRPosting.com - Content Distribution Platform" style="width: 1050px; height: auto; max-width: 100%; max-height: 400px; font-size: 48px;"> </a>`,
      `<a href="https://a.seoclerks.com/linkin/761347" rel="nofollow" title="SEOClerks"><img style="max-width:100%;height:auto;border:0;border-radius:5px" class="padding-top-1x" src="https://www.panopticpen.space/media/SeoClerks728x90anim.gif" alt="SEOClerks"></a>`
    ];
styleOfBanners.innerText=`
    #bannerAdContainer{
        width:100vw !important;
        max-width:600px !important;
        text-align:center !important;
        margin:0 auto;
    }
    `;
  }else{
        bannerArr = [
            `<a href="https://fststvpn.com/65476a5bb379f/121e5f53"><img src="https://panopticpen.space/media/121e5f53.jpg" style="max-width: 1166px; height: 403px;"></a>`,
            `<a href="https://go.coinmama.com/visit/?bta=60983&amp;nci=5364" target="_Top"><img border="0" src="https://coinmama.ck-cdn.com/tn/serve/?cid=676867" width="250" height="250"></a>`,
            `<a href="https://www.popads.net/users/refer/2765585"><img src="http://banners.popads.net/250x250.gif" alt="PopAds.net - The Best Popunder Adnetwork"></a>`,
            `<a href="https://s.click.aliexpress.com/e/_DdWDOXF?bz=300*250" target="_parent"><img width="250" height="250" src="https://ae01.alicdn.com/kf/S3619e57974f148d087c950fe497cdf55q/300x250.jpg"></a>`,
            `<a href="https://go.fiverr.com/visit/?bta=237457&amp;nci=16893" target="_Top"><img border="0" src="https://fiverr.ck-cdn.com/tn/serve/?cid=27385337" width="250" height="250"></a>`,
            `<a href="https://go.fiverr.com/visit/?bta=237457&amp;nci=10899" rel="sponsored" target="_Top"><img border="0" src="https://fiverr.ck-cdn.com/tn/serve/?cid=27500376" width="300" height="250"></a>`,
            `<a href="https://popcash.net/home/318852" target="_blank" title="PopCash - The Popunder network"> <img src="https://static.popcash.net/img/affiliate/300x250.jpg" alt="PopCash.net"> </a>`,
            `<iframe width="336" height="280" src="https://www.cryptohopper.com/html5banners/show.php?banner=336x280&amp;version=1&amp;atid=22050" frameborder="0" allowfullscreen="" style="width:336px;height:280px;overflow:hidden"></iframe>`
        ];
styleOfBanners.innerText=`
    #bannerAdContainer img{
         
max-width:300px !important;
max-height:250px !important;
 
    }
    #bannerAdContainer{
text-align:center !important;
margin:0 auto;
    }
    `;
  }
    const header = document.querySelector('header');
    // Create a new div element to hold the bannerAd content
    const bannerAdContainer = document.createElement('div');
    bannerAdContainer.setAttribute('id','bannerAdContainer');
    bannerAdContainer.innerHTML = bannerArr[Math.floor(Math.random() * bannerArr.length)];
    // Insert the bannerAdContainer as the first child of the header
    document.body.insertBefore(bannerAdContainer, header);
    document.head.appendChild(styleOfBanners); 
}
const rando=Math.floor(Math.random()*8);
if(rando==2){
    document.addEventListener('DOMContentLoaded', showBannerAdsIfUserOnDesktop);
   
}


function randomDallEImages(){
    const div = document.querySelector('#randomDallE');
    const img = document.createElement('img');
    img.setAttribute('id','dallEImg');
    const baseURL='https://panopticpen.space/media/landing2DallE/';
    const imgArr=[
        baseURL+'billboardComputersNight.png',
        baseURL+'bilboardCompNIGHTPENCILSMUG.png',
        baseURL+'bilboardCompNIGHTPENCILSMUG2.png',
        baseURL+'bilboardCompNIGHTPENCILSMUG3.png',
        baseURL+'bilboardCompNIGHTPENCILSMUG4.png',
        baseURL+'board5.png',
        baseURL+'board6.png'
       
        ];
    img.src=imgArr[Math.floor(Math.random()*imgArr.length)];
    div.appendChild(img);
}
document.addEventListener('DOMContentLoaded',randomDallEImages);

function logoSwitch() {
    const secondImg = 'ezgif.com-gif-to-webp.webp';
    const currentImgTag = document.querySelector('img[src="logo.webp"]');
    const preloadImage = new Image();
    preloadImage.onload = function(){currentImgTag.src=preloadImage.src}
    preloadImage.src=secondImg;
  
}

document.addEventListener('DOMContentLoaded', logoSwitch);


document.addEventListener("DOMContentLoaded", function () {
        const menuToggle = document.querySelector(".menu-toggle");
        const sidebar = document.querySelector(".sidebar");
        
        menuToggle.addEventListener("click", function () {
            sidebar.classList.toggle("open");
            menuToggle.classList.toggle("colorbrown");
        });
        
        setTimeout(()=>{
            if (!isMobileDevice()) {
    menuToggle.click();
}else{
    menuToggle.querySelector('img').classList.add('mobileCompass');
        menuToggle.classList.add('mobileMenuToggle');

}
  
        },100);
        
    });





function goYunus(){
    window.location.href='https://yunusemrevurgun.com/about';
}