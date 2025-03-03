document.addEventListener("DOMContentLoaded",()=>{
    
    const searcher = () => {
  const alerts = document.getElementsByClassName("location");
  const holder = document.querySelector("main");
  const query = prompt("Search Query: ");
  const search_title = document.createElement("h1");
  search_title.textContent = "Search Results: ";
  search_title.setAttribute('class','location-group-h1');
  holder.insertBefore(search_title, holder.firstChild);

  for (let i = 0; i < alerts.length; i++) {
    let el = alerts[i];
    if (el.textContent.includes(query)) {
      el.classList.add("matched-in-search");
      el.classList.remove("not-in-search");
      
    } else {
      el.classList.remove("matched-in-search");
      el.classList.add("not-in-search");

    }
  }
  setTimeout(()=>{
      document.querySelectorAll('.not-in-search').forEach((el)=>{
          el.remove();
      });
  },500);
};

// Function to be executed when .location element is added to <main>
function handleLocationElementAdded(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Check if the added nodes include an element with class .location
      const addedNodes = Array.from(mutation.addedNodes);
      const hasLocationElement = addedNodes.some((node) =>
        node.classList && node.classList.contains('location')
      );

      if (hasLocationElement) {
        // Your code to handle the presence of .location element in <main>
        console.log('Element with class .location added to <main>');
        searcher();
        observer.disconnect();
        return;
      }
    }
  }
}


// Select the <main> element to observe
const mainElement = document.querySelector('main');

// Configure the MutationObserver to watch for child list changes
const observer = new MutationObserver(handleLocationElementAdded);
observer.observe(mainElement, { childList: true })
// Start observing the <main> element for changes
});
