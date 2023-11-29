
import './commands';
import "cypress-plugin-api";
import '@shelex/cypress-allure-plugin';


Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  
  