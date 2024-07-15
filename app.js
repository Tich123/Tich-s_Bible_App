const searchInput = document.getElementById('searchInput');
const resultDiv = document.getElementById('result');

searchInput.addEventListener('keyup', async (e) => {
    const searchTerm = e.target.value.trim();
    
    if (searchTerm.length > 0) {
        const response = await fetch(`/search?book=${searchTerm}`);
        const data = await response.json();
        
        resultDiv.innerHTML = JSON.stringify(data);
    } else {
        resultDiv.innerHTML = '';
    }
});
