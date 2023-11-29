class CommonFixtureHelper {
  static loadDataFromFixture(filePath: any, fixtureName: any) {
    cy.fixture(filePath).as(fixtureName);
    return cy.get(`@${fixtureName}`);
  }
  
}
export default CommonFixtureHelper;
