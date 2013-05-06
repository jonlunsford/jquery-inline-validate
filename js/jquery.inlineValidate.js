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
          this.validatePassword(validationType, val, this.confirmField.val());
          break;
        case 'confirmPassword':
          this.validateMatching(val, this.passwordField.val());
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

    validatePassword: function(validationType, val1, val2) {
      this.clearErrors();
      this.validateMatching(val1, val2);
      
      for(method in this.methods) {
        if(method != "isMatching") {
          if(this.methods[method].call(this, val1) === false) this.addError(method);
        } 
      }
      return this.checkForErrors() ? this.toggleState(validationType, 'error') : this.toggleState(validationType, 'valid');
    },

    validateMatching: function(val1, val2) {
      return this.methods['isMatching'].call(this, val1, val2) ? this.toggleState("confirmPassword", 'valid') : this.toggleState('confirmPassword', 'error'); 
    },

    toggleState: function(type, state) {
      var $errorIcon  = type === 'password' ? this.passwordField.siblings('.icon-error') : this.confirmField.siblings('.icon-error'),
          $validIcon  = type === 'password' ? this.passwordField.siblings('.icon-valid') : this.confirmField.siblings('.icon-valid'),
          $field      = type === 'password' ? this.passwordField : this.confirmField;

      if(state === 'error') {
        $validIcon.hide()
        $errorIcon.css('display', 'inline-block');
        $field.removeClass(this.options.validClass).addClass(this.options.errorClass);
      } else if(state === 'valid') {
        $errorIcon.hide();
        $validIcon.css('display', 'inline-block');          
        $field.removeClass(this.options.errorClass).addClass(this.options.validClass);
      } else if(state === 'clear') {
        $errorIcon.hide();
        $validIcon.hide();
      }
    },

    addIcons: function(useCss) {
      var $fields = $(this.options.passwordField).add(this.options.passwordConfirmField);
      $fields.each(function() {
        $(this).parent().addClass('validate-field-parent');
        $(this).after("<i class='icon icon-valid' /><i class='icon icon-error' />");
      });

      if(this.options.useCssIcons) {
        $(".icon-error").addClass('css-icon');
        $(".icon-valid").addClass('css-icon');        
      } else {
        $(".icon-error").css('background', 'url(' + this.options.errorIcon + ') no-repeat center center');
        $(".icon-valid").css('background', 'url(' + this.options.validIcon + ') no-repeat center center');
      }
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