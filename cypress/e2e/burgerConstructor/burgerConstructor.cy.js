const mockOrder = [
  '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0941"]',
  '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0943"]',
]

describe('service is available', function () {
  before(function() {
    cy.visit('http://localhost:3000');
    cy.viewport(1920, 1024);
  });

  it('should drag & drop', () => {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });

    // Construct burger
    cy.get('[data-cy="dragableIngredients-643d69a5c3f7b9001cfa093d"]').first().trigger('dragstart');
    cy.get('[data-cy="burgerConstructor"]').trigger('drop');
    mockOrder.forEach((item) => {
      cy.get(item).trigger('dragstart');
      cy.get('[data-cy="burgerConstructor"]').trigger('drop');
    })

    // Login mock user
    cy.intercept("POST", "api/auth/login", { fixture: "auth.json" });
    cy.get('button').contains('Оформить заказ').click();
    cy.get('[data-cy="loginSubmit"]').type('ivanthecreator@gmail.com');
    cy.get('[data-cy="pwdSubmit"]').type('1q2w3e4r');
    cy.get('[data-cy="submitLoginForm"]').click();

    // Submit order
    cy.get('[data-cy="submitConstructorForm"]').click();
    cy.intercept("POST", "api/orders", { fixture: "orders.json" });

    // Get order details
    cy.get('[data-cy="orderNumber"]').should('exist');
    cy.contains('Ваш заказ начали готовить').should('exist');

    // Close modal
    cy.get('[data-cy="closeIcon"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
