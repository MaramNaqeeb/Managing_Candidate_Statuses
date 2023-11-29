class Login {
  elements = {
    userName: () => cy.getByCy("sername"), // I ignore the first letter to avoid the system crash when the placeholder changes
    password: () => cy.getByCy("assword"), // I ignore the first letter to avoid the system crash when the placeholder changes
    loginBTN: () => cy.get("[type=submit]"),
  };
  

  loginFUNC(userName: string, password: string) {
    cy.visit("/");
    this.elements.userName().type(userName),
    this.elements.password().type(password),
    this.elements.loginBTN().click();
  }

}
export default Login;

