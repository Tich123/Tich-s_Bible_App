const searchInput = document.getElementById('search-input');  
const searchButton = document.getElementById('search-button');  
const resultsContainer = document.getElementById('results-container');  
  
searchButton.addEventListener('click', (e) =&gt; {  
  e.preventDefault();  
  const searchTerm = searchInput.value.trim();  
  fetch(`/search?searchTerm=${searchTerm}`)  
  .then((response) =&gt; response.json())  
  .then((data) =&gt; {  
    const resultsHtml = data.map((row) =&gt; {  
      return `  
       <h2>${row.Book} ${row.Chapter}:${row.Verse}</h2>  
       <p>${row.Text}</p>  
      `;  
    }).join('');  
    resultsContainer.innerHTML = resultsHtml;  
   });  
});  

