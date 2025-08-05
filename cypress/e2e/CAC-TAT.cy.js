describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
      cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    const longText = Cypress._.repeat('abdcefghijklmnopqrstuvwxyz', 10)
    cy.get("#firstName").type("Yasmin")
    cy.get("#lastName").type("Sampaio")
    cy.get("#email").type("yasmindaniellisampaio@gmail.com")
    cy.get("#open-text-area").type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get(".success").should('be.visible')
    cy.tick(3000)
    cy.get(".success").should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
   cy.clock()

    cy.get("#firstName").type("Yasmin")
    cy.get("#lastName").type("Sampaio")
    cy.get("#email").type("yasmindanielli")
    cy.get("#open-text-area").type("Teste de email invalido")
    cy.contains('button', 'Enviar').click()

    cy.get(".error").should('be.visible')
    cy.tick(3000)
    cy.get(".error").should('not.be.visible')
  })

  it('verifica se campo telefone continua vazio se um valor não-numérico for preenchido', () => {
    cy.get("#phone").type("aaaaaaaa")

    cy.get("#phone").should("have.value", "")
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()    
    cy.get("#firstName").type("Yasmin")
    cy.get("#lastName").type("Sampaio")
    cy.get("#email").type("yasmindaniellisampaio@gmail.com")
    cy.get("#open-text-area").type("Teste telefone obrigatório")
    cy.get("#phone-checkbox").check()
    cy.contains('button', 'Enviar').click()

    cy.get(".error").should('be.visible')
    cy.tick(3000)
    cy.get(".error").should('not.be.visible')
  })

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").type("Yasmin")
    cy.get("#lastName").type("Sampaio")
    cy.get("#email").type("yasmindaniellisampaio@gmail.com")
    cy.get("#phone").type("16997919744")

    cy.get("#firstName").should("have.value", "Yasmin")
    cy.get("#lastName").should("have.value", "Sampaio")
    cy.get("#email").should("have.value", "yasmindaniellisampaio@gmail.com")
    cy.get("#phone").should("have.value", "16997919744")
  
    cy.get("#firstName").clear()
    cy.get("#lastName").clear()
    cy.get("#email").clear()
    cy.get("#phone").clear()

    cy.get("#firstName").should("have.value", "")
    cy.get("#lastName").should("have.value", "")
    cy.get("#email").should("have.value", "")
    cy.get("#phone").should("have.value", "")

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('button', 'Enviar').click()
    cy.get(".error").should('be.visible')
    cy.tick(3000)
    cy.get(".error").should('not.be.visible')
  })

  Cypress._.times(5, () => {
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()
    const data = {
        firstName: 'Yasmin',
        lastName: 'Sampaio',
        email: 'yasmindaniellisampaio@gmail.com',
        text: 'teste'
      }
      cy.fillMandatoryFieldsAndSubmit(data)

      cy.get(".success").should('be.visible')
      cy.tick(3000)
      cy.get(".success").should('not.be.visible')
    })
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')
    
    cy.get('#product').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')
    
    cy.get('#product').should('have.value', 'mentoria')
  })

    it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
    
    cy.get('#product').should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('input[value="feedback"]')
    .as('radio')
    cy.get('@radio').check()
    cy.get('@radio').should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[name="atendimento-tat"]').each((radio) => {
      cy.wrap(radio).check()
      cy.wrap(radio).should('be.checked')
    })
    // da pra resolver assim tmb
    // cy.get('input[name="atendimento-tat"]').check().should('be.checked')
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').as('checkboxes').check()

    cy.get('@checkboxes').should('be.checked')

    cy.get('@checkboxes').last().uncheck()

    cy.get('@checkboxes').last().should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')

    cy.get('input[type="file"]').then(input => {
      expect(input[0].files[0].name).to.be.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})

    cy.get('input[type="file"]').then(input => {
      expect(input[0].files[0].name).to.be.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', {enconding: null}).as('exampleFile')
    cy.get('input[type="file"]')
    .selectFile('@exampleFile')
    .then(input => {
      expect(input[0].files[0].name).to.be.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

it('preenche o campo da área de texto usando o comando invoke', () => {
  cy.get('#open-text-area').invoke('val', 'Algum texto')
  cy.get('#open-text-area').should('have.value', 'Algum texto')
})

it('faz uma requisição HTTP', () => {
  cy.request({
    method: 'GET', 
    url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
  }).then((response) => {
    console.log(response)
    expect(response.status).to.be.equal(200)
    expect(response.statusText).to.be.equal('OK')
    expect(response.body).to.include('CAC TAT')
  })
})

it('faz uma requisição HTTP sem then', () => {
  cy.request({
    method: 'GET', 
    url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
  }).as('getRequest')
    .its('status')
    .should('be.equal', 200)

  cy.get('@getRequest')
    .its('statusText')
    .should('be.equal', 'OK')
  
  cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')
    
})

it('revela gato escondido', () => {
  cy.get('span[id="cat"]')
    .invoke("show")
    .should('be.visible')
  
  cy.get('#title')
    .invoke('text', 'CAT TAT')
  cy.get('#subtitle')
    .invoke('text', 'Eu <3 gatos!')
})

})
