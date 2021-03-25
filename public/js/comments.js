const comments = async (event) => {
    event.preventDefault();

    // Trim and get the value on the comment.
    const user_comment = document.querySelector('#postContent').value.trim();

    // If comment exists, go to post.
    if (user_comment) {
        const response = await fetch('/home/:id',
        {
            method: 'POST',
            body: JSON.stringify({ user_comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If everything is ok, refresh page.
        if (response.ok) {
            alert('New Comment Created')
            document.location.replace('/home/:id');
        }
        else {
            alert('Comment failed.')
        }
    }
};

document.querySelector('#commentBtn').addEventListener('click', comments);