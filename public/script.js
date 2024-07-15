document.getElementById('search-button').addEventListener('click', () => {
    const bookName = document.getElementById('search-input').value;
    fetch(`/search?book=${bookName}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';
            data.forEach(item => {
                const verseElement = document.createElement('div');
                verseElement.className = 'verse';
                verseElement.innerHTML = `<strong>${item.book} ${item.chapter}:${item.verse}</strong> - ${item.text}`;
                resultsContainer.appendChild(verseElement);
            });
        });
});

