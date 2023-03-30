const newPostHandler = async (event) => {
  event.preventDefault();


  const title = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-desc').value.trim();
  const image = document.querySelector('.file-input')//add;

  console.log(title, description)
  if (title && description) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create post');
    }
  }
};

console.log("here we are")
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newPostHandler);