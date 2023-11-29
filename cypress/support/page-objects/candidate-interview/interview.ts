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

  loadingData() {
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

  clickOnMarkInterviewPassedButton() {
    this.elements.passedButton().click({ force: true });
  }

  clickOnMarkInterviewFailedButton() {
    this.elements.buttonsContainer().children().eq(1).click({ force: true });
  }

  saveForm() {
    this.loadingData();
    this.elements.submitBtn().invoke("show").click();
  }


  checkCandidateStatusIsExist(status: string) {
    this.loadingData();
    this.elements.passedStatus().should("contain", status);
  }


  assertRejectButton(buttonContent: string) {
    this.firstResultedButton(buttonContent);
  }

  assertScheduleInterviewButton(buttonContent: string) {
    this.secondResultedButton(buttonContent);
  }

  assertOfferJobButton(buttonContent: string) {
    this.thirdResultedButton(buttonContent);
  }

}
export default Interview;

