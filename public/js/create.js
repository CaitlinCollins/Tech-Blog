const create = async (event) => {
    event.preventDefault();

    // Trim and get the values of the title and content.
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    // If title and content exist, go to post.
    if (title && content) {
        const response = await fetch('/dashboard/create', 
        {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If everything is ok, replace with /dashboard.
        if (response.ok) {
            alert('New Post Created!');
            document.location.replace('/dashboard/dashboard');
        }
        else {
            alert('Post failed.');
        }
    }
};


document.querySelector('#create').addEventListener('click', create);








