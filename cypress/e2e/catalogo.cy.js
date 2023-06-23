/// <reference types="cypress" />

describe('Produtos no catálogo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  it('Todos os produtos listados corretamente', () => {
    cy.get('.inventory_list').children().should('have.length', 6)
  })

  it('Informações dos produtos', () => {
    //verificando se cada produto tem um nome
    cy.get('.inventory_item_name').should('have.length', 6)

    //verificando se cada produto tem um preço
    cy.get('.inventory_item_price').should('have.length', 6)

    //verificando se cada produto tem um botão de adicionar ao carrinho
    cy.get('.btn_inventory').should('have.length', 6)

    //verificando se cada produto tem um botão de remover do carrinho após clicar no botão de adicionar
    cy.get('.btn_inventory').each(($el, index, $list) => {
      cy.wrap($el).click()
      cy.get('.btn_inventory').eq(index).should('have.text', 'Remove').click()
    })

    //verificando se cada produto tem uma imagem
    cy.get('.inventory_item_img .inventory_item_img').should('have.length', 6)

    //verificando se cada produto tem uma descrição
    cy.get('.inventory_item_desc').should('have.length', 6)
  })

  it('Consistência filtro de produtos', () => {
    //verificando se o filtro de produtos está funcionando corretamente
    //Filtro de Z - A
    cy.get('[data-test="product_sort_container"]').select('za')
    cy.get('.inventory_item_name').first().should('have.text', 'Test.allTheThings() T-Shirt (Red)')
    cy.get('.inventory_item_name').last().should('have.text', 'Sauce Labs Backpack')
    //Filtro de A - Z
    cy.get('[data-test="product_sort_container"]').select('az')
    cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Backpack')
    cy.get('.inventory_item_name').last().should('have.text', 'Test.allTheThings() T-Shirt (Red)')
    //Filtro de preço (mais barato)
    cy.get('[data-test="product_sort_container"]').select('lohi')
    cy.get('.inventory_item_price').first().should('have.text', '$7.99')
    cy.get('.inventory_item_price').last().should('have.text', '$49.99')
    //Filtro de preço (mais caro)
    cy.get('[data-test="product_sort_container"]').select('hilo')
    cy.get('.inventory_item_price').first().should('have.text', '$49.99')
  })
})