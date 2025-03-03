/**
 * Created by Yunus Emre Vurgun
 * Copyright ©Panoptic Pen.
 **/
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
function removeURLParameters() {
	// Get the current URL without parameters and hash fragment
	var urlWithoutParams = window.location.origin + window.location.pathname;
	// Update the URL without parameters and hash fragment
	window.history.replaceState({}, document.title, urlWithoutParams);
}
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
function getQueryParam(name) {
	// Get query string from URL
	var queryString = window.location.search.substring(1);
	// Split the query string into individual parameters
	var params = queryString.split("&");
	// Loop through the parameters to find the one with the specified name
	for (var i = 0; i < params.length; i++) {
		var pair = params[i].split("=");
		// Check if the parameter name matches the desired one
		if (pair[0] === name) {
			// Decode and return the parameter value
			return decodeURIComponent(pair[1]);
		}
	}
	// Return null if parameter not found
	return null;
}
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
//*****GENERAL FUNCTIONS*****///
function addTriggersToButtons() {
	const copyLinkButton = document.querySelector('#copy-button');
	const aboutButton = document.querySelector('#about-button');
	const contactButton = document.querySelector('#contact-button');
	copyLinkButton.addEventListener('click', function() {
		removeURLParameters();
		// Check if the clipboard API is supported
		if (navigator.clipboard) {
			// Get the current page URL
			var currentPageUrl = window.location.href;
			// Copy the URL to the clipboard
			navigator.clipboard.writeText(currentPageUrl)
				.then(function() {
					alert('URL copied to clipboard successfully! ');
				})
				.catch(function(error) {
					alert('Unable to copy page URL to clipboard: ', error);
				});
		} else {
			alert('Clipboard API not supported');
		}
	});
	aboutButton.addEventListener('click', function() {
		document.querySelector('.about').style.display = "none";
		document.querySelector('.contact').style.display = "none";
		removeURLParameters();
		document.querySelector('.about').style.display = 'block';
	});
	contactButton.addEventListener('click', function() {
		document.querySelector('.about').style.display = "none";
		document.querySelector('.contact').style.display = "none";
		removeURLParameters();
		document.querySelector('.contact').style.display = 'block';
	});
}
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
const handleActionClick = function(algorithmObj) {
	algorithmObj.run();
};
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
function turnActionButtonOn(algorithmObj) {
	const button = document.querySelector('.action');

	button.addEventListener('click', () => handleActionClick(algorithmObj));
	isClickListenerAdded = true; // You should set this to false when you add the listener

	button.disabled = false;
}
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
let isClickListenerAdded = false; // You should set this to true when you add the listener

function turnActionButtonOff() {
	const button = document.querySelector('.action');
	if (button && isClickListenerAdded) {
		// If the button exists and the event listener has been added
		button.removeEventListener('click', handleActionClick);
		isClickListenerAdded = false; // Update the flag since the listener has been removed
	}
	if (button) {
		button.disabled = true; // Disable the button whether the event listener existed or not
	}
}

///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////


function bubbleSort() {
	const inputArray = document.querySelector('#bubble-sort-input-field').value;
	let newArr = [...inputArray];
	for (let i = 0; i < newArr.length; i++) {
		for (let j = 0; j < newArr.length - i - 1; j++) {
			if (newArr[j] > newArr[j + 1]) {
				let temp = newArr[j];
				newArr[j] = newArr[j + 1];
				newArr[j + 1] = temp;
			}
		}
	}
	let sortedString = newArr.join(', ');

	// Set the sorted string as the inner text of the element with ID 'bubble-sort-result'
	document.querySelector('#bubble-sort-result').innerText = sortedString;
	turnActionButtonOff();

}


///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
function dijkstrasAlgorithm() {
    // Extracting input from DOM and parsing.
    const inputString = document.querySelector('#dijkstras-input-field').value;
    const graphString = inputString.match(/\{.*\}\s*,/)?.[0];
    const startNodeMatch = inputString.match(/start node=(\w)/);
    if (!graphString || !startNodeMatch) {
        alert('Invalid input format.');
        return;
    }
let graph;
let formattedGraphString = graphString.replace(/,\s*}/g, '}').replace(/,\s*\]/g, ']').replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
formattedGraphString=formattedGraphString.substring(0,formattedGraphString.length-1);
try {
        graph = JSON.parse(formattedGraphString); 

    } catch (error) {
          alert('Invalid input format.');
         location.reload();
        return;
}
console.log(formattedGraphString);
console.log(graph);

    const startNode = startNodeMatch[1];

    // Initialization of Dijkstra's algorithm variables.
    const shortestPaths = {};
    const previousNodes = {};
    const unvisitedNodes = new Set(Object.keys(graph));
    for (const vertex of Object.keys(graph)) {
        shortestPaths[vertex] = Infinity;
    }
    shortestPaths[startNode] = 0;

    // Dijkstra's algorithm implementation.
    while (unvisitedNodes.size > 0) {
        let currentMinNode = null;
        for (const node of unvisitedNodes) {
            if (currentMinNode === null || shortestPaths[node] < shortestPaths[currentMinNode]) {
                currentMinNode = node;
            }
        }

        unvisitedNodes.delete(currentMinNode);
        for (const [neighbour, weight] of Object.entries(graph[currentMinNode])) {
            let tentativeValue = shortestPaths[currentMinNode] + weight;
            if (tentativeValue < shortestPaths[neighbour]) {
                shortestPaths[neighbour] = tentativeValue;
                previousNodes[neighbour] = currentMinNode;
            }
        }
    }

    // Displaying results in the DOM.
    document.querySelector('#dijkstras-result').innerHTML =
        `<strong>Shortest Paths:</strong> ${JSON.stringify(shortestPaths)}<br><strong>Previous Nodes:</strong> ${JSON.stringify(previousNodes)}`;
}

///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
function quickSort() {
    const inputArray = document.querySelector('#quick-sort-input-field').value.split(',').map(Number);

    function sort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[arr.length - 1];
        const left = [];
        const right = [];

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [...sort(left), pivot, ...sort(right)];
    }

    const sortedArray = sort(inputArray);
    const sortedString = sortedArray.join(', ');

    document.querySelector('#quick-sort-result').innerText = sortedString;
    turnActionButtonOff();
}


///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////

///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
function validateBubbleSortInput(input) {
	const regexPattern = /^\d+(,\s*\d+)*$/;
	if (regexPattern.test(input.value) && input.value.includes(',')) {
		turnActionButtonOn(algorithms['Bubble Sort']);

	} else {
		turnActionButtonOff();

		alert('Input is not valid! Please enter a comma-separated list of integers.');
	}
}
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
function validateDijkstrasInput(input) {
 	const regexPattern1 = /\{ [a-zA-Z]: \d+,/;
  	const regexPattern2 = /\ [A-Z]\: /;
	if (regexPattern1.test(input.value) && regexPattern2.test(input.value) && input.value.includes(',') && input.value.includes(' } }, start node=')
	&& input.value.includes(': { ')  && input.value.includes(' }, ')) {
		turnActionButtonOn(algorithms['Dijkstras Algorithm']);

	} else {
		turnActionButtonOff();

		alert('Input is not valid! Please enter the valid graph and node format.');
	}

}

///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
function validateQuickSortInput(input) {
    	const regexPattern = /^\d+(,\s*\d+)*$/;
	if (regexPattern.test(input.value) && input.value.includes(',')) {
		turnActionButtonOn(algorithms['Quick Sort']);

	} else {
		turnActionButtonOff();

		alert('Input is not valid! Please enter a comma-separated list of integers.');
	}
}
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
 
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
 
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
///////*****ALGORITHMS*****//////
const algorithms = {
	'Bubble Sort': {
		run: bubbleSort,
		validate: validateBubbleSortInput
	},
	'Dijkstras Algorithm': {
		run: dijkstrasAlgorithm,
		validate: validateDijkstrasInput
	},
	'Quick Sort': {
		run: quickSort,
		validate: validateQuickSortInput
	} 
};

///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
function insertPlayground(dropdown, terminal, action) {
	const DOM_ELEMENT = document.querySelector('.playground');
	DOM_ELEMENT.innerHTML = '';
	DOM_ELEMENT.appendChild(dropdown);
	DOM_ELEMENT.appendChild(terminal);
	DOM_ELEMENT.appendChild(action);
}
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
///////*****PLAYGROUND*****//////
function createPlayground() {
	const dropdown = document.createElement('select');
	dropdown.classList.add('dropdown');

	const options = [
		'select...',
		'Bubble Sort',
		'Dijkstras Algorithm',
		'Quick Sort',
	
	];

	options.forEach(optionText => {
		const option = document.createElement('option');
		option.value = optionText;
		option.textContent = optionText;
		dropdown.appendChild(option);
	});

	const terminal = document.createElement('div');
	terminal.classList.add('terminal');

	const action = document.createElement('button');
	action.classList.add('action');
	action.textContent = 'Run Code';
	action.disabled = true;

	dropdown.addEventListener('change', function() {
		terminal.innerHTML = '';

		if (this.value === 'Bubble Sort') {
			terminal.innerHTML = `
        <label>Enter an Array of Integers separated by commas (e.g. "1,2,3,4"): </label>
        <input id="bubble-sort-input-field" type="text">
<button onclick="validateBubbleSortInput(document.querySelector('#bubble-sort-input-field'))">Validate</button>
<br><br>
        <p>Results: <span id="bubble-sort-result"></span></p>
      `;
		} else if (this.value === 'Dijkstras Algorithm') {
			terminal.innerHTML = `
        <label>Enter a Graph and a start node (e.g. "{ A: { B: 4, C: 2 }, B: { A: 4, C: 5, D: 10 }, C: { A: 2, B: 5, D: 3 }, D: { B: 10, C: 3 } }, start node=A"): </label>
        <input id="dijkstras-input-field" type="text">
<button onclick="validateDijkstrasInput(document.querySelector('#dijkstras-input-field'))">Validate</button>
        <br><br>
        <p>Results: <span id="dijkstras-result"></span></p>
      `;
		} else if (this.value === 'Quick Sort') {
			terminal.innerHTML = `
        <label>Enter an Array of Integers separated by commas (e.g. "1,2,3,4"): </label>
        <input id="quick-sort-input-field" type="text">
<button onclick="validateQuickSortInput(document.querySelector('#quick-sort-input-field'))">Validate</button>
        <br><br>
        <p>Results: <span id="quick-sort-result"></span></p>
      `;
		}
	});

	const playground = document.querySelector('.playground');
	playground.innerHTML = '';
	playground.appendChild(dropdown);
	playground.appendChild(terminal);
	playground.appendChild(action);
}


///////*****MAIN ENTER*****//////
///////*****MAIN ENTER*****//////
///////*****MAIN ENTER*****//////
///////*****MAIN ENTER*****//////
///////*****MAIN ENTER*****//////
///////*****MAIN ENTER*****//////
const main = () => {
	addTriggersToButtons();
	createPlayground();
	setTimeout(() => document.querySelector('loader').remove(), 1000);
}
///////*****MAIN ENTER*****//////
///////*****MAIN ENTER*****//////
///////*****MAIN ENTER*****//////
document.addEventListener("DOMContentLoaded", main);
///////*****MAIN ENTER*****//////
///////*****MAIN ENTER*****//////
///////*****MAIN ENTER*****//////