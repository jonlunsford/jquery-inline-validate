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
        validLength: 8,
        errorsToValidate: {
          noSpaces: true,
          hasNumbers: true,
          hasLetters: true,
          isMatching: true,
          charLength: true
        }
      };

  function Plugin(element, options) {
    var that;
    this.element = $(element);                      
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.errors = this.options.errorsToValidate;
    this.passwordField = $(this.options.passwordField)
    this.confirmField = $(this.options.passwordConfirmField)
    this.init();
  };

  Plugin.prototype = {

    init: function() {
      that = this;
      this.element.addClass("validate-password-inline")
      this.attachEventHandlers("keyup");
      this.addIcons(this.options.useCssIcons);
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
        if(this.errors[error] === false) {
          return true;
        }
      }
    },

    validateWithAll: function(val) {
      for(method in this.methods) { 
        var result = this.methods[method].call(this, val); 
        if(result === false) this.addError(method); 
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

    attachEventHandlers: function(eventType) {
      this.passwordField.on(eventType, this, function(e) {
        that.delegateValidationType('password', $(this).val());
      });

      $(this.options.passwordConfirmField).on(eventType, this, function(e) {
        that.delegateValidationType('confirmPassword', $(this).val())
      });
    },

    validatePassword: function(val) {
      this.clearErrors();
      for(method in this.methods) {
        if(method != "isMatching") {
          if(this.methods[method].call(this, val) === false) this.addError(method);
        }
      }
      return this.checkForErrors() ? this.toggleState('password', 'error') : this.toggleState('password', 'valid');
    },

    toggleState: function(type, state) {
      var $icon = $(".icon");

      if(type === 'password') {
        if(state === 'error') {
          this.passwordField.toggleClass(this.options.validClass, this.options.errorClass);
          $icon.css('display', 'inline-block').toggleClass("icon-valid icon-error");
        } else if(state === 'valid') {
          $icon.css('display', 'inline-block').toggleClass("icon-error icon-valid");;          
          this.passwordField.toggleClass(this.options.errorClass, this.options.validClass);
        }
      }
    },

    addIcons: function(useCss) {
      if(useCss) {}; // todo
      this.passwordField.parent().addClass('validate-field-parent');
      this.passwordField.after("<i class='icon' />");
    },

    // Validation method objects
    methods: {

      // Validate that there are no spaces
      noSpaces: function(val) {
        return /\s/.test(val) ? false : true;
      },

      // Validate that there is at least one number
      hasNumbers: function(val) {
        return /\d/.test(val);
      },

      // Validate that there is at least one letter
      hasLetters: function(val) {
        return (/[a-zA-Z]/g).test(val);
      },

      // Validate password length
      charLength: function(val) {
        return parseInt(val.length) > that.options.validLength ? true : false;
      },

      // Validate matching
      isMatching: function(val1, val2) {
        return val1 === val2 ? true : false;
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