/**
 * Sign up
 * @description Checks if email and password is ok, then adds new user if there's no error.
 */
function handleSignupOnClick() {
    if (model.app.page != 'UserSignup') {
        return;
    }

    let signupInputs = model.inputs.userSignup;
    signupInputs.confirmEmail = null;
    signupInputs.confirmCreation = null;
    checkIfEmailUsed(model.inputs.userSignup.email);
    checkPasswords();
    if(signupInputs.confirmEmail === false || signupInputs.confirmCreation === false) {
        updateMainView();
        model.inputs.userSignup.password = "";
        return;
    }
    createNewUserFromSignup();
    model.app.page = 'UserLogin';
    updateMainView();
    setDefaultSignupInput();
    return;
}

function setDefaultSignupInput() {
    model.inputs.userSignup = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        confirmEmail: null,
        confirmCreation: null,
    }
}


/**
 * Create new user
 * @description creates new user and gives the user an ID.
 */
function createNewUserFromSignup() {
    const userSignupInputs = model.inputs.userSignup;
    let highestId = getHighestIdFromArrayObj(model.data.users);
    let newUserId = highestId + 1;
    let newUser = {
        id: newUserId,
        firstName: userSignupInputs.firstName,
        lastName: userSignupInputs.lastName,
        email: userSignupInputs.email,
        password: userSignupInputs.password,
        roleId: 2,
        avatarId: 0,
    }
    model.data.users.push(newUser);
}

/**
 * Email verification
 * @description if email is used by another user,
 * then change userSignup.confirmEmail in model to be false.
 * @param {string} email 
 */
function checkIfEmailUsed(email) {
    if (getUserFromEmail(email) != null ) model.inputs.userSignup.confirmEmail = false;
    else model.inputs.userSignup.confirmEmail = true;
}

/**
 * Password verification
 * @description checks if passwords are equal.
 */
function checkPasswords() {
    if (model.inputs.userSignup.password === model.inputs.userSignup.confirmPassword) {
        model.inputs.userSignup.confirmCreation = true;
    }
    else model.inputs.userSignup.confirmCreation = false;
}