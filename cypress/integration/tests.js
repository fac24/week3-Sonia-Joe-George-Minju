beforeEach(() => {
  cy.task("resetDb");
});

/* it("test test :)", () => {
  // Visit the baseURL.
  // Don't fail on 401, which is our app's default response to users that aren't logged in!
  cy.visit("/", { failOnStatusCode: false });
}); */

// Visiting without logging in should result in:
// A 401 status code, a login link, and a signup link.
describe("When not logged in, any route should show a prompt with a 401 response", () => {
  it("Root route", () => {
    cy.request({
      url: "/",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("Login and signup link", () => {
    cy.visit("/", { failOnStatusCode: false });
    cy.get("a");
  });
});

after(() => {
  cy.task("resetDb");
});
