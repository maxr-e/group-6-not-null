
const newFormHandler = async (event) => {
  event.preventDefault();


  const post_id = event.target.getAttribute('data-id');
  const route_id = event.target.getAttribute('route-id');
  const description = document.querySelector('#cmt-val').value.trim();
  console.log(post_id);
  console.log(description);
  console.log(route_id)

  // alert(post_id)
  if (description) {
    const response = await fetch(`/api/post/${route_id}`, {
      method: 'POST',
      body: JSON.stringify({ description, post_id, route_id }),
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



// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');


//     const response = await fetch(`/api/posts/${id}`, {
//       method: 'DELETE',
//     });


//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete comment');
//     }
//   }
// };


document.querySelector('#add-cmt').addEventListener('click', newFormHandler);

// var deleteThis = document.querySelectorAll('.delete');
// for (var i = 0; i < deleteThis.length; i++) {
//   deleteThis[i].addEventListener("click", delButtonHandler)
// }