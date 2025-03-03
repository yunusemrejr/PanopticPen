function convertToBlackAndWhite() {
  const elementsToGrayscale = document.querySelectorAll('body *:not(main)');
  for (const element of elementsToGrayscale) {
    element.style.filter = 'grayscale(100%)';
  }
}

function copyLocationData(event) {
    var getPostURL= event.target.parentNode.querySelector('a').href;
    var shareText = event.target.parentNode.querySelector('a p').textContent +
    ` | Read More: https://panopticpen.space/extreme-weather-alerts/?redirect=${getPostURL}`; // Text to be copied

    // Using clipboard API to copy text
    navigator.clipboard.writeText(shareText).then(function() {
        // Success: Text successfully copied
        alert("Copied to Clipboard!");
    }).catch(function(error) {
        // Error handling
        console.error('Error in copying text: ', error);
        alert("Failed to copy text. Please try again.");
    });
}


function addCopyLinkBtns() {
  const elements = document.querySelectorAll('.location');
  let i=0;
  elements.forEach((location) => {
    let copyButton = document.createElement('img');
    copyButton.setAttribute('class', 'copyButton');
    copyButton.setAttribute('id', 'copyButton'+i);
    i+=1;
    copyButton.src = "sharebuttongif.webp";
    
    // Add a click event listener to the copy button
    copyButton.addEventListener('click', function() {
      copyLocationData(event);
    });

    let lastChildOflocation = location.lastChild;
    location.insertBefore(copyButton, lastChildOflocation.nextSibling);
  });
}

document.addEventListener('DOMContentLoaded', convertToBlackAndWhite);

document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.body.querySelector('main');
  if (mainElement) {
    function handleMutations(mutationList, observer) {
      const locationElements = mainElement.querySelectorAll('.location');
      // Check if there are multiple elements with class "location"
      if (locationElements.length > 1) {
        addCopyLinkBtns();
        observer.disconnect(); // Disconnect the observer
      }
    }

    const observer = new MutationObserver(handleMutations);
    const observerOptions = {
      childList: true,
      subtree: true,
    };
    observer.observe(mainElement, observerOptions);
  }
});

