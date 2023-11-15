class LogOut{
    elements={
        logoutDropdown: () => cy.get(".oxd-userdropdown"),
        logoutBtn: () => cy.contains("Logout"),
    }
    logout() {
        cy.visit(`/web/index.php/dashboard/index`)
        this.elements.logoutDropdown().invoke('show').click();
        this.elements.logoutBtn().click();
      }
}
export default LogOut