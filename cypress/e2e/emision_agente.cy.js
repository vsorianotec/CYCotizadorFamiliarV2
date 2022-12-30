describe('Emisión de póliza HO con perfil agente', () => {
  beforeEach(() => {
    cy.fixture('EmisionpolizaHO.json').as('data');
  })
  it('Login', () => {
    // Login
    cy.visit('/');
    cy.contains("Comunidad TMX").click();
    cy.contains("Portal de Agentes").click();
    cy.get('@data')
      .then(({login,paso1,paso2,paso4}) => {
        cy.login(login);
      });
    
    cy.url().should('include', '/portal-agentes/landing')
    cy.contains('Entendido').click()
    // Paso 1
    cy.visit('/group/portal-agentes/homeowner-quotation');
    cy.url().should('include', '/portal-agentes/homeowner-quotation');
    cy.get('@data')
      .then(({login,paso1,paso2,paso4}) => {
        cy.get('#ce_rfc').type(paso1.rfc,{force:true});
        cy.contains(paso1.rfc).click();
        cy.get('#dc_moneda').select(paso1.moneda,{force:true});
        cy.get('#dc_agentes').select(paso1.agente,{force:true});
        cy.get('#dc_formpago').select(paso1.formaPago,{force:true});
        cy.get('#cn_UB_Cotizar').type(paso1.ubicaciones,{force:true});
      });
    cy.screenshot('paso1');
    cy.get('#paso1_next').click();
    cy.url().should('include', 'actionPaso2');
    
    // Paso 2
    cy.get('@data')
      .then(({login,paso1,paso2,paso4}) => {
        cy.get('#dr_cp-0').type(paso2.codigoPostal,{force:true});
        cy.get('#dr_calle-0').type(paso2.calle,{force:true});
        cy.get('#dr_numero-0').type(paso2.numeroExt,{force:true});
        cy.get('#dr_numeroInt-0').type(paso2.numeroInt,{force:true});
        cy.get('#dr_colonia-0').select(paso2.colonia,{force:true});
        cy.get('#tip_inm-0').select(paso2.tipoInmueble,{force:true});
        cy.get('#tip_uso-0').select(paso2.tipoUso,{force:true});
        cy.get('#dr_nivel-0').type(paso2.niveles,{force:true});
        cy.get('#dr_nivelRiesgo-0').type(paso2.nivelRiesgo,{force:true});
        cy.get('#dr_descTechos-0').select(paso2.tipoTecho,{force:true});
        cy.get('#dr_descMuros-0').select(paso2.tipoMuros,{force:true});
        cy.get('#dr_descMedidasSeguridad-0').select(paso2.medidasSeguridad,{force:true});
        cy.get('#PFCAMPEDIFICIOidUbicacion1').type(paso2.saEdificio,{force:true});
        cy.get('#PFCAMPCONTENIDOSidUbicacion1').type(paso2.saContenidos,{force:true});
        cy.get('#PFCAMPPERDIDARidUbicacion1').type(paso2.saPerdidas,{force:true});
        cy.get('#PFCAMPGESTRAidUbicacion1').type(paso2.saGastosExtra,{force:true});
        cy.get('#PFCAMPCIRSTALESidUbicacion1').type(paso2.saCristales,{force:true});
        cy.get('#PFCAMPRBSECIidUbicacion1').type(paso2.saRobo,{force:true});
        cy.get('#PFCAMPDINVALidUbicacion1').type(paso2.saDinero,{force:true});
        cy.get('#PFCAMPRCidUbicacion1').type(paso2.saRC,{force:true});
        cy.get('#PFCAMPEECidUbicacion1').type(paso2.saEquipoElectronico,{force:true});
        cy.get('#PFCAMPEEMidUbicacion1').type(paso2.saEquipoMovil,{force:true});
    });
    cy.screenshot('paso2');
    cy.get('#paso2_next').click();
    cy.url().should('include', 'actionPaso3');

    // Paso 3
    cy.get('#paso3_slip').click();
    cy.get('#paso3_next').click({ timeout: 20000 });
    cy.screenshot('paso3');
    cy.url().should('include', 'actionPaso4');

    // Paso 4
    cy.get('@data')
    .then(({login,paso1,paso2,paso4}) => {
      cy.get('#mpldmTipoIdentificacion').type(paso4.tipoIdenti,{force:true});
      cy.get('#mpldmNumIdentificacion').type(paso4.numIdenti,{force:true});
    });
    cy.get('#chekRMSi').check({force: true})
    cy.get('#chkBxLeido').check({force: true})
    cy.screenshot('paso4');
    cy.get('#btnContEmision').click();
    cy.contains('Póliza generada exitosamente', {timeout: 100000}).should('be.visible');
    cy.screenshot('Poliza Generada');
  })
})