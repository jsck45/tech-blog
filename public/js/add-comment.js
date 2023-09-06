const addNewComment = async (event) => {
  event.preventDefault();
  const comment = document.getElementById('comment-textarea').value;
  const postId = window.location.pathname.split('/').pop();
  const reqBody = {
    comment,
    postId,
  };

  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    location.reload();
  } else {
    alert('Failed to add comment.');
  }
};

document
  .getElementById('comment-form')
  .addEventListener('submit', addNewComment);

const onDeleteComment = async (event) => {
  const commentId = event?.target?.dataset?.id;
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    location.reload();
  } else {
    alert('Failed to delete comment.');
  }
}

document
  .getElementById('delete-btn')
  .addEventListener('click', onDeleteComment)