/*!
** jQuery Inline Password Validator
** Original author: @carebears customercarebears@mindbodyonline.com
** Authored date: 04/29/2013
** Further changes, comments:
*/


;(function($, window, document, undefined) {

  var pluginName = 'inlineValidate',
      defaults = {
      	passwordField: ".validate-password",
        passwordConfirmField: ".validate-confirm",
        errorClass: "validate-error",
        validClass: "validate-valid",
        errorIcon: "",
        validIcon: "",
        useCssIcons: false,
        live: true,
        errorsToValidate: {
          noSpaces: true,
          hasNumbers: true,
          hasLetters: true,
          isMatching: true,
          charLength: 8
        }
      };

  function Plugin(element, options) {
    var that;
    this.element = $(element);                      
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.errors = this.options.errorsToValidate;
    this.init();
  };

  Plugin.prototype = {

    init: function() {
      that = this;
      this.attachEventHandlers("keyup");
    },

    addError: function(errorName) {
      this.errors[errorName] = false;
    },

    clearErrors: function() {
      for(error in this.errors) {
        this.errors[error] = true
      }
    },

    checkForErrors: function() {
      for(error in this.errors) {
        return this.errors[error] === false ? true : false;
      }
    },

    validateWithAll: function(val) {
      for(method in this.methods) { 
        var result = this.methods[method].call(this, val); 
        if(result === false) this.addError(method); 
        // console.log("method = " + method + ", result = " + result + ", value = " + val)
      }
    },

    delegateValidationType: function(validationType, val) {
      switch(validationType) {
        case 'password':
          this.validatePassword(val);
          break;
        case 'confirmPassword':
          this.confirmMatch(val);
          break;
      }
    },

    attachEventHandlers: function(element, type) {
      $(this.options.passwordField).on(eventType, this, function(e) {
        that.delegateValidationType('validatePassword', value);
      });

      $(this.options.passwordConfirmField).on(eventType, this, function(e) {
        that.delegateValidationType('confirmPassword', $(this).val())
      });
    },

    validatePassword: function(val) {
      for(methods in this.methods) {
        if(method != "isMatching") {
          this.methods[method].call(this, val);
        }
      }

      return this.checkForErrors() ? console.log("show error") : console.log("hide error");
    },

    // Validation method objects
    methods: {

      // Validate that there are no spaces
      noSpaces: function(val) {
        if(that.options.errorsToValidate.noSpaces) {
          return val.indexOf(' ') == -1 ? true : false;
        }
      },

      // Validate that there is at least one number
      hasNumbers: function(val) {
        if(that.options.errorsToValidate.hasNumbers) {
          return /\d/.test(val);
        }
      },

      // Validate that there is at least one letter
      hasLetters: function(val) {
        if(that.options.errorsToValidate.hasLetters) {
          return /[A-Z]/.test(val) || /[a-z]/.test(val);
        }
      },

      // Validate password length
      charLength: function(val) {
        return val.length >= that.options.errorsToValidate.charLength ? true : false;
      },

      // Validate matching
      isMatching: function(val1, val2) {
        if(that.options.errorsToValidate.isMatching) {
          return val1 === val2 ? true : false;
        }
      }
    }
  };

  // Instantiating the plugin once per element
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);