/**
 * Login Button OnClick
 * @description Checks if user exists, and if user password is correct.
 * Sends error to user if login is wrong.
 */

function handleLoginOnClick() {
    if (model.app.page != 'UserLogin') {
        return;
    }
    
    const user = getUserFromEmail(model.inputs.userLogin.email);
    if(user === null || user?.password != model.inputs.userLogin.password) {
        model.inputs.userLogin.isCorrect = false;
        model.inputs.userLogin.password = "";
    }
    if(model.inputs.userLogin.isCorrect === false) {
        updateMainView();
        model.inputs.userLogin.isCorrect = null;
        return;
    }

    model.inputs.userLogin.isCorrect = true;
    model.app.userLoggedInId = user.id;
    model.app.page = 'Dashboard';
    updateMainView();
    setDefaultLoginSignup();
}

function setDefaultLoginSignup() {
    model.inputs.userLogin = {
        email: '',
        password: '',
        isCorrect: null,
    }
}
