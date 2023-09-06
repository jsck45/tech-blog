// profile.js

document.addEventListener('DOMContentLoaded', () => {
  // Fetch the logged-in user's ID from the server-side rendered HTML
  const userId = document.querySelector('#userId').value;

  // Fetch the user's posts based on their ID
  fetch(`/api/posts/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data.posts.length > 0) {
        // Render the posts on the page
        const postList = document.querySelector('.user-posts');
        data.posts.forEach((post) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
          `;
          postList.appendChild(listItem);
        });
      } else {
        // Display a message if no posts are found
        const message = document.createElement('p');
        message.textContent = 'No posts found for this user.';
        document.querySelector('.user-posts').appendChild(message);
      }
    })
    .catch((error) => {
      console.error('Error fetching user posts:', error);
    });
});
