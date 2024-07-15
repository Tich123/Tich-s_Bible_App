document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-button').addEventListener('click', () => {
        const bookName = document.getElementById('search-input').value;
        if (bookName) {
            fetch(`/search?book=${bookName}`)
                .then(response => response.json())
                .then(data => {
                    const resultsContainer = document.getElementById('results');
                    resultsContainer.innerHTML = '';
                    if (data.length === 0) {
                        resultsContainer.innerHTML = '<p>No results found</p>';
                    } else {
                        data.forEach(item => {
                            const verseElement = document.createElement('div');
                            verseElement.className = 'verse';
                            verseElement.innerHTML = `<strong>${item.book} ${item.chapter}:${item.verse}</strong> - ${item.text}`;
                            resultsContainer.appendChild(verseElement);
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    const resultsContainer = document.getElementById('results');
                    resultsContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
                });
        } else {
            alert('Please enter a book name');
        }
    });
});

