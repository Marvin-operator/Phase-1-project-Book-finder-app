document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const bookList = document.getElementById('bookList');
  
    // Event listener for search button
    searchBtn.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        searchBooks(searchTerm);
      }
    });
  
    // Function to fetch books based on search term
    async function searchBooks(searchTerm) {
      try {
        const response = await fetch(`http://localhost:3000/books?q=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayBooks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Function to display books in the UI
    function displayBooks(books) {
      bookList.innerHTML = '';
      if (books.length === 0) {
        bookList.innerHTML = '<p>No books found</p>';
      } else {
        books.forEach(book => {
          const bookItem = document.createElement('div');
          bookItem.classList.add('book-item');
          bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
          `;
          bookList.appendChild(bookItem);
        });
      }
    }
  });
  