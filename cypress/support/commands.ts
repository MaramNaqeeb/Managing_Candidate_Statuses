declare namespace Cypress {
  interface Chainable<Subject> {
    getByCy: typeof getByCy;
  }


  interface Chainable<Subject> {
    API: typeof API;
  }

}

function getByCy(field: string) {
  return cy.get(`[placeholder$='${field}']`);
}


function API(
  method: "POST" | "GET" | "PUT" | "DELETE",
  url: string,
  data: object
) {
  return cy
    .api({
      method,
      url,
      body: "" || data,
      failOnStatusCode: false,
    })
    .then((response) => {
      expect(response.status).to.equal(200);
    });

}

Cypress.Commands.add("getByCy", getByCy);
Cypress.Commands.add("API", API); // I use this command as I will reuse it multiple times in the api-helpers.ts file

