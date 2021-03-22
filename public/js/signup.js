const signUpForm = async (event) => {
    event.preventDefault();

    // Trim and get the values of the user name and password.
    const signUpUser = document.querySelector('#signUpUser').value.trim();
    const signUpPass = document.querySelector('#signUpPass').value.trim();

    // If signUpUser and signUpPass exist, go to post.
    if (signUpUser && signUpPass) {
        const response = await fetch('/api/users/signup', 
        {
            method: 'POST',
            body: JSON.stringify({ signUpUser, signUpPass }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If everything is ok, replace /signup with /login.
        if (response.ok) {
            document.location.replace('/login');
        }
        else {
            alert('Signup unsuccessful.');
        }
    }
};

document.querySelector('.signup-form').addEventListener('sumbit', signUpForm);