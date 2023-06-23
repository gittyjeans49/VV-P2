/// <reference types="cypress" />

// Cenário 3: Adição de Produtos ao Carrinho
// 1. Testar a funcionalidade de adicionar produtos ao carrinho.
// 2. Verificar se os produtos são corretamente adicionados e refletidos no resumo do carrinho.
// 3. Testar o limite máximo de produtos que podem ser adicionados ao carrinho e verificar se o sistema está tratando corretamente essa condição

describe('Cenário 03 - Adição de Produtos ao Carrinho', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
    });

    it('Adicionar um produto ao carrinho e verificar se o produto correto foi adicionado', () => {
        cy.get('.btn_inventory').first().click();
        cy.get('.inventory_item_name').first().then(($el) => {
            const name = $el.text();
            cy.get('.shopping_cart_link').click();
            cy.get('.inventory_item_name').first().should('have.text', name);
        });
    });

    it('Adicionar todos os produtos ao carrinho e verificar se a quantidade correta foi adicionada', () => {
        cy.get('.btn_inventory').each(($el, index, $list) => {
            cy.wrap($el).click();
        });
        cy.get('.btn_inventory').its('length').then((length) => {
            cy.get('.shopping_cart_link').click();
            cy.get('#cart_contents_container').find('.cart_item').should('have.length', length);
        });
    });
});