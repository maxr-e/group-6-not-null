
const newFormHandler = async (event) => {
  event.preventDefault();
 

    const post_id = event.target.getAttribute('data-id');
    const description = document.querySelector('#textArea').value.trim();

    alert(post_id)
    if (description) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ post_id, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };



const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
 
 
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
 
 
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete comment');
    }
  }
 };


document.querySelector('#addComment').addEventListener('click', newFormHandler);

var deleteThis = document.querySelectorAll('.delete');
 for( var i=0; i<deleteThis.length;i++){
  deleteThis[i].addEventListener("click", delButtonHandler)}