class AssertFileContent {
  static assertDownloadedFile(uploadedFileName: any) {
    cy.fixture(uploadedFileName).then((fileContent) => {
      const downloadsFolder = Cypress.config("downloadsFolder");
      const downloadPath = `${downloadsFolder}/${uploadedFileName}`;
      cy.readFile(downloadPath).then((downloadedFileContent) => {
        expect(downloadedFileContent).equals(fileContent);
      });
    });
  }
}
export default AssertFileContent;
