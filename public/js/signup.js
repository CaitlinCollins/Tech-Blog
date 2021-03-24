const signUpForm = async (event) => {
    event.preventDefault();

    // Trim and get the values of the user name and password.
    const user_name = document.querySelector('#signUpUser').value.trim();
    const password = document.querySelector('#signUpPass').value.trim();

    // If signUpUser and signUpPass exist, go to post.
    if (user_name && password) {
        const response = await fetch('/api/users/signup', 
        {
            method: 'POST',
            body: JSON.stringify({ user_name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If everything is ok, replace /signup with /home.
        if (response.ok) {
            document.location.replace('/home');
        }
        else {
            alert('Signup unsuccessful.');
        }
    }
};

document.querySelector('.signup-form').addEventListener('sumbit', signUpForm);

const logIn = async (event) => {
    event.preventDefault();
    document.location.replace('/login')
}

document.querySelector('#login').addEventListener('click', logIn);