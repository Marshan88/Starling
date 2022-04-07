function updateUserSignupView() {
  const userSignup = model.inputs.userSignup;
  const userSignupViewInputs = {
    firstName: {
      labelText: 'Fornavn:',
      value: userSignup.firstName,
      onChange: 'model.inputs.userSignup.firstName = this.value',
      placeholderText: 'Skriv inn fornavn..',
      isRequired: true,
    },
    lastName: {
      labelText: 'Etternavn:',
      value: userSignup.lastName,
      onChange: 'model.inputs.userSignup.lastName = this.value',
      placeholderText: 'Skriv inn etternavn..',
      isRequired: true,
    },
    email: {
      labelText: 'E-post: ',
      value: userSignup.email,
      onChange: 'model.inputs.userSignup.email = this.value',
      placeholderText: 'Skriv inn e-post..',
      isRequired: true,
    },
    password: {
      labelText: 'Passord:',
      savePass: false,
      value: userSignup.password,
      onChange: 'model.inputs.userSignup.password = this.value',
      placeholderText: 'Skriv inn passord..'
    },
    confirmPassword: {
      labelText: 'Bekreft passord:',
      savePass: false,
      value: userSignup.confirmPassword,
      onChange: 'model.inputs.userSignup.confirmPassword = this.value',
      placeholderText: 'Skriv inn passord igjen..'
    },
  }

  return /*html*/`
       <div>
       <h1 style="margin-bottom: 1.5rem">Registrer bruker</h1>
       <form id="signup-form" onsubmit="handleSignupOnClick(); return false">
          ${inputTextWithLabelHTML(userSignupViewInputs.firstName)}
          ${inputTextWithLabelHTML(userSignupViewInputs.lastName)}
          ${inputEmailWithLabeHTML(userSignupViewInputs.email)}
          ${passwordInputWithLabelHTML(userSignupViewInputs.password)}
          ${passwordInputWithLabelHTML(userSignupViewInputs.confirmPassword)}
       </form>
       <button form="signup-form" type="submit">Registrer</button>
       <button onclick="redirectToPage('UserLogin')">Tilbake</button>
       ${userSignup.confirmCreation === false ? '<p style="color: red;">Passordene er ikke like</p>' : ''}
       ${userSignup.confirmEmail === false ? '<p style="color: red;">E-post er allerede brukt</p>' : ''}
      </div>`
}