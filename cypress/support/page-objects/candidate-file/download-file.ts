class DownloadFile {
  elements = {
    downloadIcon: () => cy.get(".oxd-icon.bi-download.orangehrm-file-download"),
    loadingSpinner: () => cy.get(".oxd-loading-spinner"),
  };
  
  // I use the loadingSpinner to wait until the data gets loaded to prevent the system crash

  downloadFile() {
    this.elements.loadingSpinner().should("not.exist");
    this.elements.downloadIcon().click({ force: true });
  }
}
export default DownloadFile;
