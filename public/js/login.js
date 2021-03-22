const loginForm = async (event) => {
    event.preventDefault();

    // Trim and get the values of the user name and password.
    const user_name = document.querySelector('#userName').value.trim();
    const password = document.querySelector('#password').value.trim();

    // If userName and password exist go to post.
    if (user_name && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ user_name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If everything is ok, replace /login with root.
        if (response.ok) {
            document.location.replace('/home');
        }
        else {
            alert('Login unsuccessful.');
        }
    }
};

document.querySelector('.personal-form').addEventListener('submit', loginForm);

const signUp = async (event) => {
    event.preventDefault();
    document.location.replace('/signup')
}

document.querySelector('#signup').addEventListener('click', signUp);


