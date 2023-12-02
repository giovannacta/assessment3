document.getElementById('sign-in-traditional')
document.addEventListener('click', function () {


    var emailTxt = document.getElementById('account_email').value;
    var passTxt = document.getElementById('account_passwd').value;

    firebase.auth().signInWithEmailAndPassword(emailTxt, passTxt)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });

});

window.addEventListener('load', function () {
    document.getElementById('gmail-login')
    document.addEventListener('click', function () {

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log('Loging successfully', result.user);
            })
            .catch(function (error) {
                console.log('login fail', error);
            });
    });
});

function getPhoneNumberFromUserInput() {
    return "+12368620940";
}

document.getElementById('phone-login')
document.addEventListener('click', function () {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    const phoneNumber = getPhoneNumberFromUserInput();
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;

            const code = 123456;
            confirmationResult.confirm(code).then((result) => {
                // User signed in successfully.
                const user = result.user;
            }).catch((error) => {

            });

            // ...
        }).catch((error) => {

        });
});