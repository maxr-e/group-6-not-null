const attributes = document.getElementById('thisOne');



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

const updateLikes = async (event) => {
  event.preventDefault();

  const tally = attributes.getAttribute('tally-id');
  const post_id = attributes.getAttribute('likes-id');
  const user_id = attributes.getAttribute('data-user');
  console.log(user_id);
  console.log(post_id);
  console.log(tally);

  Promise.all([
    fetch(`/api/post/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({ tally, post_id, user_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    fetch(`/api/users/${user_id}`, {
      method: 'POST',
      body: JSON.stringify({ post_id, user_id }),
      headers: {
        'Content-Types': 'application/json',
      },
    })
  ]).then(function (responses) {
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).catch(function (error) {
    console.log(error);
  })

  // update post likes
  // const response1 = await fetch(`/api/post/${post_id}`, {

  //   method: 'PUT',
  //   body: JSON.stringify({ tally, post_id, user_id }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },

  // });

  // // create like
  // const response2 = await fetch(`/api/users/${user_id}`, {
  //   method: 'POST',
  //   body: JSON.stringify({ post_id, user_id }),
  //   headers: {
  //     'Content-Types': 'application/json',
  //   },
  // });

  // if (response1.ok && response2.ok) {
  //   // document.location.replace('/');
  //   console.log(response1);
  //   console.log(response2);
  // } else {
  //   alert('Failed to update likes');
  // }
}

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('del-id')) {
    const id = event.target.getAttribute('del-id');


    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });


    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
  }
};


document.querySelector('.like-btn').addEventListener('click', updateLikes);

document.querySelector('#add-cmt').addEventListener('click', newFormHandler);

var deleteThis = document.querySelectorAll('.delete');
for (var i = 0; i < deleteThis.length; i++) {
  deleteThis[i].addEventListener("click", delButtonHandler)
}