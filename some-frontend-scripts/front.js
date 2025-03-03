document.addEventListener('DOMContentLoaded',()=>{
    
 

 const suggesterDiv = document.getElementById('keyword-engine-app-div');

 const inputField = document.createElement('input');
 inputField.setAttribute('id','inputField');
inputField.addEventListener('input', (event) => {
    const keyword = event.target.value;
    makeAjaxRequest(keyword);
});

const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
submitButton.setAttribute('id','submitButton');
submitButton.addEventListener('click', () => {
    const keyword = inputField.value;
    makeAjaxRequest(keyword);
});


const dataHolder = document.createElement('div');
dataHolder.setAttribute('id','dataHolder');
 

suggesterDiv.appendChild(inputField);
suggesterDiv.appendChild(submitButton);
suggesterDiv.appendChild(dataHolder);



   function makeAjaxRequest(keyword) {
       keyword=keyword.toLowerCase();
  fetch(`https://panopticpen.space/keyword-engine/suggest?keyword=${encodeURIComponent(keyword)}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.suggestions);
      makeHTML(document.querySelector('#dataHolder'),displayJsonResults(data.suggestions));
    })
    .catch(error => {
      console.error('Error:', error);
      makeHTML(document.querySelector('#dataHolder'),displayJsonResults("error"));
    });
 }

   

});

const displayJsonResults=(values)=>{
    
    const fine=(values)=>{
        
        values=values.toString();
        
        return values;
    };
    
    
    values==='error'?values==='Error Occured.' : fine(values);
    
    return values;
};


const makeHTML=(dataHolder, values)=>{
    dataHolder.innerHTML=`<br>${values}<br>`;
};


const viewcateglist = (dataHolder) => {
    dataHolder.innerHTML = `
        programming <br>
        technology <br>
        food <br>
        science <br>
        language <br>
        history <br>
        arts <br>
        travel <br>
        sports <br>
        fashion <br>
    `;
};

