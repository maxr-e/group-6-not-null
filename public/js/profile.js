const delButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete project');
        }
    }
};


const delButtons = document.querySelectorAll('.post-list');
delButtons.forEach((button) => {
    button.addEventListener('click', delButtonHandler);
})

// .addEventListener('click', delButtonHandler);