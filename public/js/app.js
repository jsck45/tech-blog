// app.js

// Function to fetch posts from the backend API
const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/posts'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  // Function to render posts on the webpage
  const renderPosts = (posts) => {
    const container = document.querySelector('.post-container'); // Assuming you have a container element in your HTML
    if (!container) {
      console.error('Container element not found');
      return;
    }
  
    // Clear existing content
    container.innerHTML = '';
  
    // Loop through posts and create HTML elements
    posts.forEach((post) => {
      const card = document.createElement('div');
      card.className = 'card';
  
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
  
      const title = document.createElement('h5');
      title.className = 'card-title';
      title.textContent = post.title;
  
      const content = document.createElement('p');
      content.className = 'card-text';
      content.textContent = post.content;
  
      cardBody.appendChild(title);
      cardBody.appendChild(content);
      card.appendChild(cardBody);
      container.appendChild(card);
    });
  };
  
  // Fetch posts and render them when the page loads
  window.addEventListener('load', async () => {
    try {
      const posts = await fetchPosts();
      renderPosts(posts);
    } catch (error) {
      console.error('Failed to fetch and render posts:', error);
    }
  });
  