const loginForm = async (event) => {
    event.preventDefault();

    // Trim and get the values of the user name and password.
    const userName = document.querySelector('#userName').value.trim();
    const password = document.querySelector('#password').value.trim();

    // If userName and password exist go to post.
    if (userName && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If everything is ok, replace /login with root.
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert('Login unsuccessful.');
        }
    }
};

document.querySelector('.personal-form').addEventListener('submit', loginForm);
