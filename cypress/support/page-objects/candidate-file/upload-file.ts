class UploadFile{
    elements={
        editSwitchButton:()=>cy.get(".oxd-switch-input"),
        uploadFileInput: () => cy.get('input[type="file"]'),
        saveBtn: () => cy.get('button[type="submit"]'),
        uploadedFileExistense:()=>cy.get(".orangehrm-file-preview"),
        loadingSpinner:()=>cy.get(".oxd-loading-spinner")
    }

    
  // I use the loadingSpinner to wait until the data gets loaded to prevent the system crash

  loadingData(){
    this.elements.loadingSpinner().should('not.exist')
  }

    switchTheEditButtn(){
        this.loadingData()
        this.elements.editSwitchButton().click({force:true})
    }

    uploadFile(filePath:any){
        this.elements.uploadFileInput().selectFile(filePath, { force: true })
    }

    saveEditForm(){
        this.elements.saveBtn().click({force:true})
    }

    assertUploadedFile(filePath:string){
        this.loadingData()
        this.elements.uploadedFileExistense().should("contain",(filePath.substring(filePath.lastIndexOf("/") + 1)))
    }

}
export default UploadFile
