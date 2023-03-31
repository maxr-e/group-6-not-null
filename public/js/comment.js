const attributes = document.getElementById('thisOne');
const attributes2 = document.getElementById('thisOne');



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

  const tally = attributes2.getAttribute('tally-id');
  const post_id = attributes2.getAttribute('likes-id');
  const user_id = attributes2.getAttribute('data-user');
  console.log(user_id);
  console.log(post_id);
  console.log(tally);

  // Promise.all([
  //   fetch(`/api/post/${post_id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({ tally, post_id, user_id }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },

  //   }).catch(err => console.log(err)),
  //   fetch(`/api/users/${user_id}`, {
  //     method: 'POST',
  //     body: JSON.stringify({ post_id, user_id }),
  //     headers: {
  //       'Content-Types': 'application/json',
  //     },
  //   }).catch(err => console.log(err))
  // ]).then(function (responses) {

  //   return Promise.all(responses.map(function (response) {
  //     return response.json();
  //   }));

  // }).catch(function (error) {
  //   console.log(error);
  //   console.log(ab);
  // })

  console.log(user_id);
  console.log(post_id);
  console.log(tally);

  // update post likes
  const response1 = await fetch(`/api/post/${post_id}`, {

    method: 'PUT',
    body: JSON.stringify({ tally, post_id, user_id }),
    headers: {
      'Content-Type': 'application/json',
    },

  });

  // create like

  if (response1.ok) {
    // document.location.replace('/');
    console.log(response1);
    console.log(response1.json());
  } else {
    alert('Failed to update likes');
  }
}

const createLikes = async (event) => {
  event.preventDefault();

  // if(req.session.hasLiked === true) {
  //   alert('You have already liked this post!');
  //   return;
  // }

  const tally = attributes.getAttribute('tally-id');
  const post_id = attributes.getAttribute('likes-id');
  const user_id = attributes.getAttribute('data-user');
  console.log(user_id);
  console.log(post_id);

  const response2 = await fetch(`/api/users/${user_id}`, {
    method: 'POST',
    body: JSON.stringify({ post_id, user_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if(response2.ok) {
    console.log(response2);
    document.location.reload();
  } else {
    alert('Failed to add like :(')
  }
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


document.querySelector('.like-btn').addEventListener('click', createLikes);

document.querySelector('#add-cmt').addEventListener('click', newFormHandler);

var deleteThis = document.querySelectorAll('.delete');
for (var i = 0; i < deleteThis.length; i++) {
  deleteThis[i].addEventListener("click", delButtonHandler)
}