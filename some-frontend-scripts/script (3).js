let popAdRunnerAfterDownload=null;
// This function needs to accept `arr` to know its length for the random value calculation.
const getRandomIndex = (arrLength) => {
    return Math.floor(Math.random() * arrLength);
  };
  
  const isItSize = (arr) => {
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|Windows Phone/i.test(
      navigator.userAgent
    );
  
    // Choose the appropriate array based on the device type.
    const subArr = isMobile ? arr[1] : arr[0];
  
    // Now call `getRandomIndex` with the length of the chosen array.
    return subArr[getRandomIndex(subArr.length)];
  };
  
  const ad_logic = () => {
    const arr = [
      [
        `<a href="https://go.fiverr.com/visit/?bta=237457&nci=8621" rel="sponsored" target="_top"><img border="0" src="027logoanimation728x90B_6f3ec3d0.jpg" width="728" height="90"></a>`,
        `<a href="https://fststvpn.com/65476a5bb379f/121e5f53" target="_top"><img src="121e5f53-2.jpg" alt="fastestvpn exclusive deal" title="fastestvpn exclusive deal" width="700" height="450" /></a><img style="border:0" src="https://affiliate.fastestvpn.com/scripts/ogm1xi?a_aid=65476a5bb379f&amp;a_bid=121e5f53" width="1" height="1" alt="" />`,
        `<a href="https://fststvpn.com/65476a5bb379f/d5692d1e" target="_top"><img src="d5692d1e.jpg" alt="fastestVPN exclusive deal" title="fastestVPN exclusive deal" width="944" height="412" /></a><img style="border:0" src="https://affiliate.fastestvpn.com/scripts/ogm1xi?a_aid=65476a5bb379f&amp;a_bid=d5692d1e" width="1" height="1" alt="" />`,
        `<a href="https://fststvpn.com/65476a5bb379f/eca3b4ac" target="_top"><img src="eca3b4ac.PNG" alt="fastestVPN exclusive deal" title="fastestVPN exclusive deal" width="600" height="300" /></a><img style="border:0" src="https://affiliate.fastestvpn.com/scripts/ogm1xi?a_aid=65476a5bb379f&amp;a_bid=eca3b4ac" width="1" height="1" alt="" />`,
      ],
      [
        `<a href="https://go.fiverr.com/visit/?bta=237457&nci=8620" rel="sponsored" target="_top"><img border="0" src="027logoanimation300x250A_0e618879.jpg" width="300" height="250"></a>`,
        `<a href="https://fststvpn.com/65476a5bb379f/eca3b4ac" target="_top"><img src="eca3b4ac.PNG" alt="fastestVPN exclusive deal" title="fastestVPN exclusive deal" width="400" height="300" /></a><img style="border:0" src="https://affiliate.fastestvpn.com/scripts/ogm1xi?a_aid=65476a5bb379f&amp;a_bid=eca3b4ac" width="1" height="1" alt="" />`,

      ],
    ];
  
    // Call `isItSize` with `arr` only, it will handle the rest.
    document.querySelector('#ad-holder').innerHTML = isItSize(arr);
  };
  
  document.addEventListener('DOMContentLoaded', ad_logic);
 
 
/*


SHOW POPUP AD AFTER DOWNLOAD


*/
const adversitementPopWrapperFunction=()=>{
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  let chosenAd;
const displayPopupAd = () => {
	let overlay, popupAd;
	const removeElements = () => {
		if (overlay) overlay.remove();
		if (popupAd) popupAd.remove();
	};
	const closePopupAd = () => {
		overlay.style.display = "none";
		popupAd.style.display = "none";
	};
	const addClickListeners = () => {
		overlay = document.querySelector('#overlay');
		popupAd = document.querySelector('#popupAd');
		document.addEventListener('click', (event) => {
			if (event.target === overlay) {
				closePopupAd();
			}
		});
		const closeButton = document.getElementById("closeButton");
		closeButton.addEventListener("click", closePopupAd);
	};
	const popupAdsJson={
	    "fiverr":{
	        "link":"https://go.fiverr.com/visit/?bta=237457&nci=9373",
	         "img":"https://panopticpen.space/media/General_1X1-min-1_94a0a5d1.jpg"
	    },
	    "fastestVpn":{
	        "link":"https://fststvpn.com/65476a5bb379f/121e5f53",
	        "img":"https://panopticpen.space/media/121e5f53.jpg"
	    }
	};
  let RandomVal=()=>{return Math.floor(Math.random()*2)};
  if(RandomVal()===0){
  chosenAd = popupAdsJson['fiverr'];
  }else{
  chosenAd = popupAdsJson['fastestVpn'];
  }
	const createPopupAd = (chosenAd,deviceType) => {
		const popupAd = document.createElement("div");
		popupAd.id = "popupAd";
		popupAd.style.cssText = "display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999999; background-color: #ffffff9c; color: black; padding: 20px; text-align: center; max-width: 80%; min-width: 300px; animation: zoomIn .5s;border:0;border-radius:10px;";
		const link = document.createElement("a");
		link.href = chosenAd.link;
		const image = document.createElement("img");
		if(deviceType=="desktop"){image.style.cssText = "max-width: 90%; max-height: %90;"}else{
image.style.cssText = `max-width: ${window.innerWidth}px; height: ${window.innerHeight / 2}px;`;
		}
		image.src = chosenAd.img;
		const closeButton = document.createElement("button");
		closeButton.id = "closeButton";
		closeButton.style.cssText = "position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; background-color: #a20000de; color: white; font-weight: bold; font-size: 16px; border: 0;border-radius:50%; cursor: pointer;";
		closeButton.textContent = "X";
		link.appendChild(image);
		popupAd.appendChild(link);
		popupAd.appendChild(closeButton);
		return popupAd;
	};
	const createOverlay = () => {
		const overlay = document.createElement("div");
		overlay.id = "overlay";
		overlay.style.cssText = "display: none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 99999;";
		document.body.appendChild(overlay);
		return overlay;
	};
	const showPopupAd = (deviceType) => {
		const overlay = createOverlay();
		popupAd = createPopupAd(chosenAd,deviceType);
		setTimeout(() => {
			popupAd.style.display = "block";
			overlay.style.display = "block";
			addClickListeners();
		}, 800);
		document.body.appendChild(popupAd);
	};
	document.addEventListener("DOMContentLoaded", () => {
		if(!isMobileDevice){
		    popAdRunnerAfterDownload=()=>{showPopupAd('desktop')};
		}else{
		    popAdRunnerAfterDownload=()=>{showPopupAd('mobile')};
		}
	});
};displayPopupAd();  
};adversitementPopWrapperFunction();


/*
//
//
//
BELOW IS THE IMAGE TO MELTING GIF CONVERTION SCRIPTS AREA
//
//
//
*/

// Declare imgElement at a higher scope
const imgElement = document.createElement("img");

function handleFileSelect(event) {
  const fileInput = event.target;

  if (fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];
    const filename = selectedFile.name;

    // Set the src attribute to a data URL representing the selected file
    const reader = new FileReader();
    reader.onload = function (event) {
      imgElement.src = event.target.result;

      // Append the image to the result div
      const resultDiv = document.getElementById("selectedIMG");
      resultDiv.innerHTML = "";
      resultDiv.appendChild(imgElement);
    };

    reader.readAsDataURL(selectedFile);
  }
}

// Get the file input element
const fileInput = document.getElementById("imageFile");

// Bind the custom function to the file input's change event
fileInput.addEventListener("change", handleFileSelect);

////

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = document.getElementById("myForm");
  const fileInput = form.elements.imageFile;

  if (fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];
    const filename = selectedFile.name;

    // Set the src attribute to a loading image or message if desired
    imgElement.src = "loading.gif"; // You can set a loading image here

    // Append the loading image to the result div
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    resultDiv.appendChild(imgElement);

    // Call the melt function and handle the generated GIF
    melt(selectedFile, function (generatedGifUrl) {
      // Update the <img> element with the generated GIF URL
      imgElement.src = generatedGifUrl;
    });
  }
  
  document.querySelector('.btn-primary').remove();
  document.querySelector('#imageFile').remove();

 
}

// Bind the custom function to the form's submit event
const form = document.getElementById("myForm");
form.addEventListener("submit", handleFormSubmit);


function melt(selectedFile, callback) {
    
    
    
  // Check if the selected file is valid
  if (!(selectedFile instanceof Blob)) {
    console.error('The selected file is invalid.');
    return;
  }

  // Create the necessary elements for processing the image and GIF
  const img = new Image();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Create a new GIF instance
  const gif = new GIF({
    workers: 24,
    quality: 30,
    workerScript: 'https://panopticpen.space/image-melt/gif.worker.js', // Ensure you have gif.worker.js hosted at the correct path
  });

function downloadGIF(url) {
  const downloadLink = document.getElementById('hiddenAnchorElement');

  if (downloadLink) {
    downloadLink.href = url;
    downloadLink.download = 'result.gif';
    downloadLink.click();
document.querySelector('#download_gif_button').style.opacity = '0.3';
document.querySelector('#download_gif_button').disabled = true;
document.querySelector('#download_gif_button').removeEventListener('click', downloadGIF);
popAdRunnerAfterDownload();
  } else {
    console.error("Element with ID 'hiddenAnchorElement' not found in the DOM.");
  }
}


const fixedWidth = 300;
let fixedHeight; // This will be calculated based on the image's aspect ratio

// Image load event
img.onload = function() {
  // Calculate the aspect ratio and corresponding height
  const aspectRatio = img.height / img.width;
  fixedHeight = fixedWidth * aspectRatio;

  // Set canvas dimensions
  canvas.width = fixedWidth;
  canvas.height = fixedHeight;

  const numFrames = 65; // Number of animation frames
  const meltAmount = 4.1; // Amount of melting per frame (adjust as needed)

  for (let frame = 0; frame < numFrames; frame++) {
    // Calculate the melting ratio for the current frame
    const meltingHeightRatio = frame / numFrames;

    // Clear the canvas on each frame
    context.clearRect(0, 0, fixedWidth, fixedHeight);

    // Draw the static top half of the image
    context.drawImage(
      img,
      0,
      0,
      img.width,
      img.height / 2,
      0,
      0,
      fixedWidth,
      fixedHeight / 2
    );
    
  let lastDripHeight = 0; // Variable to store the last calculated drip height

    // Loop through each column to simulate melting upwards
    for (let x = 0; x < fixedWidth; x += meltAmount) {
      let dripHeight = Math.random() * frame * 4.4; // Randomize the drip height, increasing with the frame number
      let sourceX = (x / fixedWidth) * img.width; // Calculate the corresponding x position on the source image

      // Calculate the source and destination heights based on the melting effect
      let sourceHeight = (img.height / 2) * (1 - meltingHeightRatio);
      let destHeight = (fixedHeight / 2) * (1 - meltingHeightRatio);

      // Draw the melting part of the image, adjusting the Y-coordinate to simulate melting upwards
      context.drawImage(
        img,
        sourceX,
        img.height / 2 + dripHeight, // Adjust the Y-coordinate to start higher up for each slice
        meltAmount, // Source width - small slice
        sourceHeight - dripHeight, // Source height - reduced by drip height
        x,
        fixedHeight / 2 - destHeight + dripHeight, // Adjust destination Y to simulate melting upwards
        meltAmount, // Destination width - same as source width
        destHeight - dripHeight // Destination height - reduced by drip height
      );
      
       if (dripHeight > lastDripHeight) {
      lastDripHeight = dripHeight;
    }
    }
      // Apply wave distortion to the melting part
  let imageData = context.getImageData(0, 0, fixedWidth, fixedHeight);
  let pixels = imageData.data;

  // Parameters for wave distortion
  let waveAmplitude = 5; // Maximum pixel displacement
  let waveFrequency = 2 * Math.PI / 50; // Frequency of the wave

  // Apply distortion to each row
  for (let y = fixedHeight / 2; y < fixedHeight; y++) {
    let wave = waveAmplitude * Math.sin(frame * 0.2 + y * waveFrequency);

    for (let x = 0; x < fixedWidth; x++) {
      let newX = x + wave;

      // Boundary checks
      if (newX < 0) newX = 0;
      if (newX >= fixedWidth) newX = fixedWidth - 1;

      let originalPosition = (y * fixedWidth + x) * 4;
      let newPosition = (y * fixedWidth + Math.floor(newX)) * 4;

      // Swap pixels
      for (let p = 0; p < 4; p++) {
        let temp = pixels[originalPosition + p];
        pixels[originalPosition + p] = pixels[newPosition + p];
        pixels[newPosition + p] = temp;
      }
    }
  }

  // Put the distorted image data back on the canvas
  context.putImageData(imageData, 0, 0);
      let voidHeight = fixedHeight / 2 - lastDripHeight;
if (voidHeight > 0) {
    // Here, you would fill the void with the upside-down image
    context.save(); // Save the current context state
    // Translate context to bottom of the canvas and flip it vertically
    context.translate(0, fixedHeight);
    context.scale(1, -1);

    // Draw the flipped image only in the void area
    context.drawImage(
      img,
      0, // Start from the left of the image
      img.height - img.height / 2, // Start from the middle of the image
      img.width, // Full width of the image
      img.height / 2, // Full half height of the image
      0, // Start from the left of the canvas
      0, // Start from the bottom of the canvas because the context is flipped
      fixedWidth, // Full width of the canvas
      voidHeight // Fill the void area
    );

    context.restore(); // Restore the context to its original state
  }

  // Add each frame to the GIF
  gif.addFrame(canvas, { copy: true, delay: 1 });
  
}


    // Render the GIF
    gif.on('finished', function (blob) {
        document.querySelector('#labelforfile').remove();
      // Create an object URL for the GIF blob
      const url = URL.createObjectURL(blob);

      console.log('GIF generation completed. URL:', url);

      // Call the callback function with the generated GIF URL
      callback(url);

      // Set the src of the imgElement to the generated GIF URL
      imgElement.src = url;
      
      const downloadButton = document.createElement('button');
      downloadButton.setAttribute('id','download_gif_button');
      downloadButton.innerText="DOWNLOAD GIF";
      downloadButton.addEventListener('click',function(){downloadGIF(url)});
      document.querySelector('.container').appendChild(downloadButton);
      document.querySelector('#download_gif_button').style.margin='15px';
      document.querySelector('#download_gif_button').classList.add('downloadGifButton');

      // Release the memory for the object URL
    setTimeout(()=>{URL.revokeObjectURL(url);
    document.querySelector('#download_gif_button').style.opacity = '0.3';
document.querySelector('#download_gif_button').disabled = true;
document.querySelector('#download_gif_button').removeEventListener('click', downloadGIF);


    },120000);
    });

    // Handle GIF creation errors
    gif.on('error', function (error) {
      console.error('Error in GIF creation:', error);
    });

    // Start creating the GIF
    gif.render();
  };

  // Handle image loading errors
  img.onerror = function () {
    console.error('Error in image loading.');
  };

  // Set the source of the image to the Object URL of the file
  img.src = URL.createObjectURL(selectedFile);
      

}


     function extra_loading_info(){
         document.querySelector('#labelforfile').innerText="loading please wait...";
         document.querySelector('#labelforfile').style.fontSize='25px';
         document.querySelector('#labelforfile').style.color="brown";
     }




