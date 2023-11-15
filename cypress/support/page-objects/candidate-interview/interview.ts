class Interview {
  elements = {
    passedButton: () => cy.get(".oxd-button--success"),
    buttonsContainer: () => cy.get(".orangehrm-recruitment-actions"),
    passedStatus: () => cy.get(".orangehrm-recruitment-status > .oxd-text"),
    submitBtn: () => cy.get("[type='submit']"),
    loadingSpinner: () => cy.get(".oxd-loading-spinner"),
    passedForm: () => cy.get(".orangehrm-card-container > .oxd-text"),
  };

  // I use the loadingSpinner to wait until the data gets loaded to prevent the system crash

  loadingData(){
    this.elements.loadingSpinner().should("not.exist");

  }
  firstResultedButton(buttonContent: string) {
    this.elements
      .buttonsContainer()
      .children()
      .eq(0)
      .should("contain", buttonContent);
  }
  secondResultedButton(buttonContent: string) {
    this.elements
      .buttonsContainer()
      .children()
      .eq(1)
      .should("contain", buttonContent);
  }
  thirdResultedButton(buttonContent: string) {
    this.elements
      .buttonsContainer()
      .children()
      .eq(2)
      .should("contain", buttonContent);
  }

  // Here are the functions used for implementing the interview results feature

  markInterviewPassed() {
    this.elements.passedButton().click({ force: true });
    this.loadingData()
  }
  markInterviewFailed() {
    this.elements.buttonsContainer().children().eq(1).click({ force: true });
    this.loadingData()

  }
  saveForm(formName: string) {
    this.elements.passedForm().should("contain", formName);
    this.elements.submitBtn().invoke("show").click();
  }

  assertCandidateStatus(status: string) {
    this.loadingData()
    this.elements.passedStatus().should("contain", status);
  }

  buttonsAfterPassedInterview(
    buttonContent1: string,
    buttonContent2: string,
    buttonContent3: string
  ) {

    this.loadingData()
    this.firstResultedButton(buttonContent1);
    this.secondResultedButton(buttonContent2);
    this.thirdResultedButton(buttonContent3);
  }
  buttonsAfterFailedInterview(buttonContent: string) {
    this.loadingData()

    this.firstResultedButton(buttonContent);
  }
}
export default Interview;
