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
          length: 8
        }
      };

  function Plugin(element, options) {
    var that;
    this.element = $(element);                      
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  };

  Plugin.prototype = {

    init: function() {
      that = this;
    },

    // Validation method objects
    methods: {

      // Validate that there are no spaces
      validateNoSpaces: function(val) {
        if(that.options.errorsToValidate.noSpaces) {
          return val.indexOf(' ') == -1 ? true : false;
        }
      },

      // Validate that there is at least one number
      validateNumbers: function(val) {
        if(that.options.errorsToValidate.hasNumbers) {
          return /\d/.test(val);
        }
      },

      // Validate that there is at least one letter
      validateLetters: function(val) {
        if(that.options.errorsToValidate.hasLetters) {
          return /[A-Z]/.test(val) || /[a-z]/.test(val);
        }
      },

      // Validate password length
      validateLength: function(val) {
        return val.length >= that.options.errorsToValidate.length ? true : false;
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