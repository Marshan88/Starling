function updateUserLoginView() {
  const userLogin = model.inputs.userLogin;
    const userLoginViewInputs = {
        email: {
          labelText: 'E-post:',
          value: userLogin.email,
          onChange: 'model.inputs.userLogin.email = this.value',
          placeholderText: 'Skriv inn e-post..',
          isRequired: true,
        },
        password: {
          labelText: 'Passord:',
          savePass: false,
          value: userLogin.password,
          onChange: 'model.inputs.userLogin.password = this.value',
          placeholderText: 'Skriv inn passord..'
        }
      }
        
  return /*html*/`
       <div class="user-login">
        <h1>Logg inn</h1>
        <div class="user-login-content">
          <form id="login-form" onsubmit="handleLoginOnClick(); return false">
            ${inputEmailWithLabeHTML(userLoginViewInputs.email)}
            ${passwordInputWithLabelHTML(userLoginViewInputs.password)}
          </form>
          <button form="login-form"  type="submit">Logg inn</button>
          <button onclick="redirectToPage('UserSignup')">Registrer ny bruker</button>
            ${userLogin.isCorrect === false ? '<p style="color: red;">E-post eller passord er feil</p>' : ''}
        </div>
      </div>`
}