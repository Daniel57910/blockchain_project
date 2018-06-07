describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true)
  });
});

describe('Visting homepage', function() {
  it('Visits homepage', function() {
    cy.visit('localhost:9000')
  });
});

describe('Homepage got right content', function() {
  it('finds the content "Medical Prescription Blockchain Application "', function() {
    cy.visit('localhost:9000')
  });
});

describe('Doctor sign in button', function() {
  it("clicking 'Sign In' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.contains('Sign In').click()
    cy.url().should('include', '/doctor/sign_in')
  });
});

describe('Doctor register button', function() {
  it("clicking 'Register' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.contains('Register').click()
    cy.url().should('include', '/doctor/new_registration')
  });
});

describe('Patient sign in button', function() {
  it("clicking 'Sign In' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.get('#patient_sign_in').contains('Sign In').click()
    cy.url().should('include', '/patient/sign_in')
  });
});

describe('Patient register button', function() {
  it("clicking 'Register' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.get('#patient_sign_up').contains('Register').click()
    cy.url().should('include', '/patient/new_registration')
  });
});

describe('Pharmacist sign in button', function() {
  it("clicking 'Sign In' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.get('#pharmacist_sign_in').contains('Sign In').click()
    cy.url().should('include', '/pharmacist/sign_in')
  });
});describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true)
  });
});

describe('Visting homepage', function() {
  it('Visits homepage', function() {
    cy.visit('localhost:9000')
  });
});

describe('Homepage got right content', function() {
  it('finds the content "Medical Prescription Blockchain Application "', function() {
    cy.visit('localhost:9000')
  });
});

describe('Doctor sign in button', function() {
  it("clicking 'Sign In' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.contains('Sign In').click()
    cy.url().should('include', '/doctor/sign_in')
  });
});

describe('Doctor register button', function() {
  it("clicking 'Register' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.contains('Register').click()
    cy.url().should('include', '/doctor/new_registration')
  });
});

describe('Patient sign in button', function() {
  it("clicking 'Sign In' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.get('#patient_sign_in').contains('Sign In').click()
    cy.url().should('include', '/patient/sign_in')
  });
});

describe('Patient register button', function() {
  it("clicking 'Register' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.get('#patient_sign_up').contains('Register').click()
    cy.url().should('include', '/patient/new_registration')
  });
});

describe('Pharmacist sign in button', function() {
  it("clicking 'Sign In' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.get('#pharmacist_sign_in').contains('Sign In').click()
    cy.url().should('include', '/pharmacist/sign_in')
  });
});

describe('Pharmacist register button', function() {
  it("clicking 'Register' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.get('#pharmacist_sign_up').contains('Register').click()
    cy.url().should('include', '/pharmacist/new_registration')
  });
});

describe('Register doctor', function() {
  it("clicking 'register' navigates to a new url", function() {
    cy.visit('localhost:9000/doctor/new_registration')
    cy.get('#fullName').type('G')
    cy.get('#ID').type('b')
    cy.get('#password').type('777')
    cy.get('#confirm_password').type('777')
    cy.contains('register').click()
    cy.url().should('include', '/doctor/add_prescription')
  })
})


describe('Pharmacist register button', function() {
  it("clicking 'Register' navigates to a new url", function() {
    cy.visit('localhost:9000')

    cy.get('#pharmacist_sign_up').contains('Register').click()
    cy.url().should('include', '/pharmacist/new_registration')
  });
});

describe('Register doctor', function() {
  it("clicking 'register' navigates to a new url", function() {
    cy.visit('localhost:9000/doctor/new_registration')
    cy.get('#fullName').type('G')
    cy.get('#ID').type('b')
    cy.get('#password').type('777')
    cy.get('#confirm_password').type('777')
    cy.contains('register').click()
    cy.url().should('include', '/doctor/add_prescription')
  })
})
