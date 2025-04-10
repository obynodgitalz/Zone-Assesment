import { faker } from '@faker-js/faker';

describe('Lambda E-commerce Test', () => {
  it('Navigate to URL, add mp3 to wishlist and registers as a new user', () => {
    
    cy.visit('https://ecommerce-playground.lambdatest.io/');

    // Force the Shop by Category menu to be visible
    cy.get('#entry_217832')
      .invoke('attr', 'style', 'display: block;');

    // a. Click on Shop by Category
    cy.contains('Shop by Category').click({force: true});

    // b. Click on MP3 Players
    cy.contains('MP3 Players').click({force: true});

    // c. Hover over the product and click the add to wishlist icon
    cy.get('.product-thumb')
    .first()
    .trigger('mouseenter').wait(1500)

    cy.get(':nth-child(1) > .product-thumb > .product-thumb-top > .product-action > .btn-cart').click({force: true});
    // Verify that item was successfully added to cart
    cy.wait(1000)
    cy.get('.toast-body > .d-flex').contains('Success')
    cy.get('.ml-2 > span').click()
   

    // d. Register (Pop Up doesn't contain register button).
    cy.get('#widget-navbar-217834 > .navbar-nav > :nth-child(6) > .nav-link').trigger('mouseenter');
    cy.get('ul.mz-sub-menu-96.dropdown-menu').invoke('attr', 'style', 'display: block;');
    cy.get('ul.mz-sub-menu-96.dropdown-menu').should('be.visible');
    cy.get('ul.mz-sub-menu-96.dropdown-menu a').eq(1).click({force: true});

    // Add assertions to verify the action
    cy.url().should('include', '/register');

    // e. Fill neccessary details.
    // generate dynamic data for every iteration.

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const phoneNumber = faker.phone.number('+234##########');

    cy.get('#input-firstname').type(firstName);
    cy.get('#input-lastname').type(lastName);
    cy.get('#input-email').type(email);
    cy.get('#input-telephone').type(phoneNumber);
    cy.get('#input-password').type('Test@1234');
    cy.get('#input-confirm').type('Test@1234');
    cy.get('.float-right > .custom-control').click();

    // f. Complete registration.
    cy.get('.float-right > .btn').click();
    cy.get('.page-title').contains('Your Account Has Been Created')

    // Logout
    cy.get('.list-group > [href="https://ecommerce-playground.lambdatest.io/index.php?route=account/logout"]').click()

  });
});