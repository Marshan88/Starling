function onClickSignupDev() {
    if (model.app.page != 'UserSignup') {
        return;
    }

    model.inputs.userSignup = {
        firstName: 'User',
        lastName: 'lastname',
        email: 'user@example.no',
        password: 'LastnamePassword1',
        confirmPassword: 'LastnamePassword1',
        confirmEmail: true,
        confirmCreation: true,
    }

    handleSignupOnClick()
}

/**
 * Dev login
 * @description Automatically logins on click instead of developers having to type in login details
 */
function onClickLoginDev() {
    if (model.app.page != 'UserLogin') {
        return;
    }

    model.inputs.userLogin = {
        email: 'ola@example.com',
        password: 'N0rdp@ssw0rd99_',
        isCorrect: true,
    }

    handleLoginOnClick();
}