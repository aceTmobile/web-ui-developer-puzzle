describe('When: I use the reading list feature', () => {
  function addItemToReadingList() {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('.book--content--info button').first().click();
  }
  function clearReadingList() {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('#reading-list-item').click();
    cy.get('[data-testing="reading-list-container"] button').click();
  }
  function hasItemsInReadingList(): boolean {
    return cy.$$('#mat-badge-content-0').length !== 0;
  }

  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  describe('When: I click to add item to reading list', () => {
    beforeEach(() => {
      cy.startAt('/');

      // Ensure clean state before test
      if ( hasItemsInReadingList() ) {
        clearReadingList();
      }
    });

    it('Then: I should be able to undo my action', () => {
      addItemToReadingList();
      
      cy.get('simple-snack-bar button')
      .last()
      .click()
      .get('tmo-total-count')
      .children()
      .should('not.exist');
    });
  });

  describe('When: I click to remove item from reading list', () => {
    beforeEach(() => {
      cy.startAt('/');
      
      // Ensure clean state before test setup | Add 1 item to reading list
      if ( hasItemsInReadingList() ) {
        clearReadingList();
        addItemToReadingList();
      } else {
        addItemToReadingList();
      }
      cy.get('[data-testing="toggle-reading-list"]').click();
    });

    it('Then: I should be able to undo my action', () => {
      cy.get('tmo-reading-list button').first().click();
      cy.get('simple-snack-bar').last().click();
      cy.get('tmo-reading-list button').should('have.length.greaterThan', 0);
    });
  });

  describe('When: I use the mark as read feature', () => {
    beforeEach(() => {
      cy.startAt('/');
      // Ensure clean state before test
      if ( hasItemsInReadingList() ) {
        clearReadingList();
        addItemToReadingList();
        cy.get('[data-testing="toggle-reading-list"]').click();
      }
    });
  
    it('Then: I should see the mark as read button disabled', () => {
      cy.get('#markAsRead')
        .click();
  
      cy.get('#markAsRead')
        .should('be.disabled');
  
      cy.get('#finishedDate')
        .should('be.visible');
    });
  });
});

