# P2 Verificação e validação

## Teste de automação com Cypress

---

### Integrantes

- Daniel Fonseca da Silva `RA: 2315807`
- Davi Gil Brito Vaz Takayama `RA: 2316374`
- Jean Felipe Camaroto Bondan `RA: 2272555`

### Repositório

[Github](https://github.com/gittyjeans49/VV-P2)

## Tópicos

- objetivo
- site utilizado
- cenário de teste
- script de teste
- resultados

---

### Objetivo

O objetivo deste trabalho é fornecer aos alunos uma oportunidade de praticar e aprimorar suas
habilidades em testes de software utilizando a ferramenta Cypress. Para isso, foram propostos uma série de cenários e fluxos a serem testados no software [Sauce Demo](https://www.saucedemo.com), uma aplicação de comércio eletrônico fictícia.

### Site utilizado

O site utilizado na atividade foi de escolha do professor: [Sauce Demo](https://www.saucedemo.com).

### Cenário de teste

Fluxos escolhidos para serem testados:

- Cenário 1: Login e Navegação
- Cenário 2: Catálogo de Produtos
- Cenário 3: Adição de Produtos ao Carrinho

### Scripts de teste

#### Cenário 1: Login e Navegação

```js
```

- Teste 1: Testando fluxo de login;
- Teste 2: Verificando se o usuário logado é direcionado para a home;
- Teste 3: Verificando menu de navegação para diferentes páginas;
- Teste 4: Verificando se a posição e funcionamento dos elementos estão corretos em todas as páginas.

#### Cenário 2: Catálogo de Produtos

```js
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
```

- Teste 1: Verificando se todos os produtos exibidos no catálogo estão listados corretamente;
- Teste 2: Verificando se as informações dos produtos (nome, preço, imagem etc.) estão corretas e correspondem aos produtos exibidos na interface;
- Teste 3: Testando a funcionalidade de busca de produtos, verificando se os resultados são consistentes e corretos.

#### Cenário 3: Adição de Produtos ao Carrinho

```js
/// <reference types="cypress" />

describe('Cenário 03 - Adição de Produtos ao Carrinho', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
    });

    // testes 1 e 2
    it('Adicionar um produto ao carrinho e verificar se o produto correto foi adicionado', () => {
        cy.get('.btn_inventory').first().click();
        cy.get('.inventory_item_name').first().then(($el) => {
            const name = $el.text();
            cy.get('.shopping_cart_link').click();
            cy.get('.inventory_item_name').first().should('have.text', name);
        });
    });

    // testes 2 e 3
    it('Adicionar todos os produtos ao carrinho e verificar se a quantidade correta foi adicionada', () => {
        cy.get('.btn_inventory').each(($el) => {
            cy.wrap($el).click();
        });
        cy.get('.btn_inventory').its('length').then((length) => {
            cy.get('.shopping_cart_link').click();
            cy.get('#cart_contents_container').find('.cart_item').should('have.length', length);
        });
    });
});
```

- Teste 1: Testando a funcionalidade de adicionar produtos ao carrinho;
- Teste 2: Verificando se os produtos são corretamente adicionados e refletidos no resumo do carrinho;
- Teste 3: Testando o limite máximo de produtos que podem ser adicionados ao carrinho e verificar se o sistema está tratando corretamente essa condição.

### Resultados gerais

<!-- geral -->
| Spec                | Tests | Passing | Failing | Pending | Skipped |
| ------------------- | ----- | ------- | ------- | ------- | ------- |
| √ catalogo.cy.js    | 00:08 | 3       | 3       | -       | -       |
| √ cenario-3.cy.js   | 00:04 | 2       | 2       | -       | -       |
| √ login.cy.js       | 00:19 | 5       | 5       | -       | -       |
| √ All specs passed! | 00:32 | 10      | 10      | -       | -       |

<!-- cenario 1 -->
### Cenário 01 - User Login + Navigation

> - √ Navegação para a aba About (10130ms)
>
> - √ Navegação para a aba Logout
>
> - √ Navegação para a aba Reset App State
>
> - √ Navegação para a aba All Items
>
> - √ Verificar elementos de navegação

<!-- cenario 2 -->
### Produtos no catálogo

> - √ Todos os produtos listados corretamente
>
> - √ Informações dos produtos
>
> - √ Consistência filtro de produtos

<!-- cenario 3 -->

### Cenário 03 - Adição de Produtos ao Carrinho

> - √ Adicionar um produto ao carrinho e verificar se o produto correto foi adicionado
>
> - √ Adicionar todos os produtos ao carrinho e verificar se a quantidade correta foi adicionada
