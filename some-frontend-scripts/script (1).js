// Function to convert image to ASCII art
function imageToAscii(imageData, width, height) {
    let asciiArt = '';

    // Loop through each pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Get the grayscale value of the pixel
            const grayscale = getGrayscale(imageData, x, y, width);

            // Map grayscale value to ASCII character
            const asciiChar = mapToAscii(grayscale);

            // Append ASCII character to the result
            asciiArt += asciiChar;
        }
        // Add newline after each row
        asciiArt += '\n';
    }

    return asciiArt;
}

// Function to get grayscale value of a pixel
function getGrayscale(imageData, x, y, width) {
    const offset = (y * width + x) * 4;
    const r = imageData[offset];
    const g = imageData[offset + 1];
    const b = imageData[offset + 2];
    // Convert RGB to grayscale using luminance formula
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Function to map grayscale value to ASCII character
function mapToAscii(grayscale) {
    const asciiChars = ['@', '#', '$', '%', '?', '*', '+', ';', ':', ',', '.'];
    // Map grayscale value to ASCII character index
    const index = Math.floor((grayscale / 255) * (asciiChars.length - 1));
    return asciiChars[index];
}


// Function to handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return; // Handle no file selected

    const reader = new FileReader();
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block'; // Show loading indicator

    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let scale;
            const artSize = document.getElementById('artSize').value;
            switch (artSize) {
                case 'small':
                    scale = Math.min(100 / img.width, 100 / img.height);
                    break;
                case 'medium':
                    scale = Math.min(300 / img.width, 300 / img.height);
                    break;
                case 'large':
                    scale = Math.min(500 / img.width, 500 / img.height);
                    break;
                default:
                    scale = 1;
                    break;
            }

            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const asciiArt = imageToAscii(imageData.data, canvas.width, canvas.height);

            const asciiArtContainer = document.getElementById('asciiArtContainer');
            asciiArtContainer.textContent = asciiArt;
            loadingIndicator.style.display = 'none'; // Hide loading indicator
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
    
    jpegerListen();
}

document.querySelector('#copyAsciiButton').addEventListener('click',function(){
    const text=document.querySelector('#asciiArtContainer').innerHTML;
   navigator.clipboard.writeText(text)
    .then(() => {
      alert('Text copied to clipboard successfully');
    })
    .catch(err => {
      alert('Could not copy text: ', err);
    });
 
});

 const jpegerListen = () => {
    document.querySelector('#downloadAsciiButton').addEventListener('click', function() {
        const asciiArtContainer = document.getElementById('asciiArtContainer');
        const asciiText = asciiArtContainer.innerText.trim(); // Use innerText to preserve line breaks

        // Create a temporary div element to hold the ASCII text
        const tempDiv = document.createElement('div');
        tempDiv.textContent = asciiText;
        tempDiv.style.fontFamily = 'monospace'; // Set font to monospace for accurate representation
        tempDiv.style.color = '#fff'; // Set text color to white
        tempDiv.style.position = 'absolute'; // Ensure correct measurement of dimensions
        tempDiv.style.visibility = 'hidden'; // Hide the temporary div

        // Append the temporary div to the document body to measure its dimensions
        document.body.appendChild(tempDiv);

        // Calculate the dimensions of the ASCII art
        const width = tempDiv.offsetWidth;
        const height = tempDiv.offsetHeight;

        // Create a canvas with the same dimensions as the ASCII art
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        // Set canvas background to black
        const context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0, 0, width, height);

        // Set text color to white and font
        context.fillStyle = '#fff';
        context.font = '12px monospace'; // Set font to match the temporary div

        // Split the ASCII text into lines and render each line on the canvas
        const lines = asciiText.split('\n');
        const lineHeight = 12; // Adjust based on the font size
        lines.forEach((line, index) => {
            context.fillText(line, 0, (index + 1) * lineHeight); // Adjust the Y coordinate according to line index
        });

        // Convert canvas to JPEG image data URL
        const imageDataURL = canvas.toDataURL('image/jpeg');

        // Create a link element to download the image
        const link = document.createElement('a');
        link.download = 'ascii_art.jpeg';
        link.href = imageDataURL;

        // Trigger the download
        link.click();

        // Clean up: remove the temporary elements from the document body
        document.body.removeChild(tempDiv);
        document.body.removeChild(canvas);
    });
};


