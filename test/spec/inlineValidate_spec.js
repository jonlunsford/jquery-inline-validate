describe("inlineValidator", function() {

  // Configs
  jasmine.getFixtures().fixturesPath = "/test/fixtures";

  // Global vars
  var $form,
      pluginData;

  beforeEach(function() {
    loadFixtures("form.html");
    
    $form       = $("#validate-me").inlineValidate();
    pluginData  = $form.data("plugin_inlineValidate")
  });

  it("Should have a reference to jQuery", function() {
    expect($).toBeDefined();
    expect(jQuery).toBeDefined();
  });

  it("Should be defined", function() {
    expect(pluginData).toBeDefined();
  });

  describe("Default Options", function() {
    
    it("Should be an object", function() {
      expect(pluginData.options).toEqual(jasmine.any(Object));
    });

    it("Should contain an errors object", function() {
      expect(pluginData.options.errorsToValidate).toEqual(jasmine.any(Object));
    });
    
    it("Should have a default password field selector defined as a string and equal '.validate-password'", function() {
      expect(pluginData.options.passwordField).toEqual(jasmine.any(String));
      expect(pluginData.options.passwordField).toEqual(".validate-password");
    });

    it("Should have a default password confirmation field selector defined as a string and equal '.validate-confirm'", function() {
      expect(pluginData.options.passwordConfirmField).toEqual(jasmine.any(String));
      expect(pluginData.options.passwordConfirmField).toEqual(".validate-confirm");
    });

    it("Should have a default error class defined as a string and equal 'validate-error'", function() {
      expect(pluginData.options.errorClass).toEqual(jasmine.any(String));
      expect(pluginData.options.errorClass).toEqual("validate-error");
    });

    it("Should have a default valid class defined as a string and equal 'validate-valid'", function() {
      expect(pluginData.options.validClass).toEqual(jasmine.any(String));
      expect(pluginData.options.validClass).toEqual("validate-valid");
    });

    it("Should have an option for an error icon image", function() {
      expect(pluginData.options.errorIcon).toEqual("");
    });

    it("Should have an option for a valid icon image", function() {
      expect(pluginData.options.validIcon).toEqual("");
    });

    it("Should have a boolean option to use css icons or not", function() {
      expect(pluginData.options.useCssIcons).toBe(false);
    });

    it("Should have a boolean option to use live validation or not", function() {
      expect(pluginData.options.live).toBe(true);
    });

  });

  describe("Methods", function() {

    it("Should validate that there are no spaces in a value", function() {
      expect(pluginData.methods.validateNoSpaces("password w space")).toBe(false);
      expect(pluginData.methods.validateNoSpaces("passwordNoSpace")).toBe(true);
    });

    it("Should validate that there is at least one number present in a value", function() {
      expect(pluginData.methods.validateNumbers("passwordNoNumber")).toBe(false);
      expect(pluginData.methods.validateNumbers("passwordNumber1")).toBe(true);
    });

    it("Should validate that there is at least one letter present in a value", function() {
      expect(pluginData.methods.validateLetters("123456767")).toBe(false);
      expect(pluginData.methods.validateLetters("123a456767")).toBe(true);
    });

    it("Should validate the length of a value based on length option passed in", function() {
      expect(pluginData.methods.validateLength("ab3456")).toBe(false);
      expect(pluginData.methods.validateLength("ab123456")).toBe(true);
    });

    it("Should check to see if two values match", function() {
      expect(pluginData.methods.validateMatching("1234ab", "123b")).toBe(false)
      expect(pluginData.methods.validateMatching("1234ab", "1234ab")).toBe(true)
    });

    it("Should add errors to the defined errors object", function() {
      pluginData.addError("noSpaces");
      expect(pluginData.options.errorsToValidate.noSpaces).toBe(false);
    });

    it("Should be able to clear / reset all errors", function() {
      pluginData.addError("noSpaces");
      pluginData.clearErrors();
      expect(pluginData.options.errorsToValidate.noSpaces).toBe(true)
    });

    it("Should check to see if any errors exist", function() {
      pluginData.addError("noSpaces")
      expect(pluginData.checkForErrors()).toBe(true)
      pluginData.clearErrors()
      expect(pluginData.checkForErrors()).toBe(false)
    });

    // it("Should run all validation methods on a given value", function() {
    //   var validResult = pluginData.validateWithAll("123456ab"),
    //       inValidResult = pluginData.validateWithAll("1h3b");
      
    //   expect(validResult).toBe(true);
    //   expect(inValidResult).toBe(false);
    // });

  });

});
