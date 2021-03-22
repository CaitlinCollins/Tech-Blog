// If everything is successful user is logged out. Otherwise alerted.
const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
        document.location.replace('/login');
    }
    else {
        alert('Logout unsuccessful.');
    }
};

// On "logout" click.
document.querySelector('#logout').addEventListener('click', logout);