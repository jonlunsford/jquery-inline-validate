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

    it("Should have a default error class defined as a string and equal 'input-validation-error'", function() {
      expect(pluginData.options.errorClass).toEqual(jasmine.any(String));
      expect(pluginData.options.errorClass).toEqual("input-validation-error");
    });

    it("Should have a default valid class defined as a string and equal 'input-validation-valid'", function() {
      expect(pluginData.options.validClass).toEqual(jasmine.any(String));
      expect(pluginData.options.validClass).toEqual("input-validation-valid");
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
      expect(pluginData.methods.noSpaces("password w space")).toBe(false);
      expect(pluginData.methods.noSpaces("passwordNoSpace")).toBe(true);
    });

    it("Should validate that there is at least one number present in a value", function() {
      expect(pluginData.methods.hasNumbers("passwordNoNumber")).toBe(false);
      expect(pluginData.methods.hasNumbers("passwordNumber1")).toBe(true);
    });

    it("Should validate that there is at least one letter present in a value", function() {
      expect(pluginData.methods.hasLetters("123456767")).toBe(false);
      expect(pluginData.methods.hasLetters("123a456767")).toBe(true);
    });

    it("Should validate the length of a value based on length option passed in", function() {
      expect(pluginData.methods.charLength("ab3456")).toBe(false);
      expect(pluginData.methods.charLength("ab12asdff")).toBe(true);
    });

    it("Should check to see if two values match", function() {
      expect(pluginData.methods.isMatching("1234ab", "123b")).toBe(false)
      expect(pluginData.methods.isMatching("1234ab", "1234ab")).toBe(true)
    });

    it("Should add errors to the defined errors object", function() {
      pluginData.addError("noSpaces");
      expect(pluginData.options.errorsToValidate.noSpaces).toBe(false);
    });

    it("Should check to see if any errors exist", function() {
      pluginData.addError("noSpaces");
      expect(pluginData.checkForErrors()).toBe(true);
    });

    it("Should run all validation methods on a given value", function() {
      pluginData.validateWithAll("hh");
      expect(pluginData.checkForErrors()).toBe(true);
    });

    it("Should be able to clear / reset all errors", function() {
      pluginData.addError("noSpaces");
      pluginData.clearErrors();
      expect(pluginData.options.errorsToValidate.noSpaces).toBe(true);
    });
    
  });

});
