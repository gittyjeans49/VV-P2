/// <reference types="cypress" />
describe('Cenário 01 - User Login + Navigation', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
  })

  it('Navegação para a aba About', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#about_sidebar_link').click();
  })

  it('Navegação para a aba Logout', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
  })

  it('Navegação para a aba Reset App State', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#reset_sidebar_link').click();
  })

  it('Navegação para a aba All Items', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#inventory_sidebar_link').click();
  })

  it('Verificar elementos de navegação', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#inventory_sidebar_link').should('be.visible');
    cy.get('#about_sidebar_link').should('be.visible');
    cy.get('#logout_sidebar_link').should('be.visible');
    cy.get('#reset_sidebar_link').should('be.visible');
    cy.get('#react-burger-cross-btn').click();
    cy.get('[data-test="product_sort_container"]').should('be.visible');
    cy.get('.shopping_cart_link').should('be.visible');
    cy.scrollTo('bottom');
    cy.get('.social_twitter > a').should('be.visible');
    cy.get('.social_facebook > a').should('be.visible');
    cy.get('.social_linkedin > a').should('be.visible');
  })

})