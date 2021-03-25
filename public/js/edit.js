const edit = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    console.log(id);
    // Trim and get the values of the title and content.
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    // If title and content exist, go to update.
    if (title && content) {
        const response = await fetch(`/dashboard/dashboard/${id}`, 
        {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json'},
        });

        // If everything is ok, replace route with /dashboard.
        if (response.ok) {
            alert('Post Updated!');
            document.location.replace('/dashboard/dashboard');
        }
        else {
            alert('Update failed.')
        }
    }
};

document.querySelector('#edit').addEventListener('click', edit);


const destroy = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/dashboard/dashboard/${id}`, 
    {
        method: 'DELETE',
    });

    // If everything is ok, replace route with /dashboard.
    if (response.ok) {
        alert('Post Deleted!');
        document.location.replace('/dashboard/dashboard');
    }
    else {
        alert('Delete failed.')
    }
};

document.querySelector('#delete').addEventListener('click', destroy);





