/*!
** jQuery Inline Password Validator
** Original author: @carebears customercarebears@mindbodyonline.com
** Authored date: 04/29/2013
** Further changes, comments:
*/

/*
** Usage Example:
**
** <form id="validate-me" action="#" method="POST">
**  <input class="validate-password" type="password" name="password" />
**  <input class="validate-confirm" type="password" name="password-confirm" />
** </form>
**
** $(function() {
**  $("#validate-me").inlineValidate({
**    errorIcon: "../img/error-circle-small.png",
**    validIcon: "../img/valid-circle-small.png"
**  })
** });
*/

;(function($, window, document, undefined) {

  var pluginName = 'inlineValidate',
      defaults = {
      	passwordField: ".validate-password",          // String, selector of password field to validate
        passwordConfirmField: ".validate-confirm",    // String, selector of password confirm field to validate
        errorClass: "input-validation-error",         // String, class that will be added to input fields when an error is found
        validClass: "input-validation-valid",         // String, class that will be added to input fields when data is valid
        errorIcon: "",                                // String, url to error icon image
        validIcon: "",                                // String, url to valid icon image
        useCssIcons: false,                           // Boolean, whether to use css icons or not. If true, errorIcon and validIcon don't have to be provided.
        live: true,                                   // Boolean, whether or not validation is run in the keyup event
        validLength: 8,                               // Integer, minimum length requirement for password
        errorsToValidate: {                           // Object, all validations that must be met. This object is updated and checked based on validation results
          noSpaces: true,                             // Boolean, default state for "noSpaces"                    
          hasNumbers: true,                           // Boolean, default state for "hasNumbers"
          hasLetters: true,                           // Boolean, default state for "hasLetters"
          isMatching: true,                           // Boolean, default state for "isMatching"
          charLength: true                            // Boolean, default state for "charLength"
        }
      };

  function Plugin(element, options) {
    this.element = $(element);                      
    this.element.addClass("validate-password-inline")
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.errors = this.options.errorsToValidate;
    this.passwordField = this.element.find(this.options.passwordField);
    this.confirmField = this.element.find(this.options.passwordConfirmField);
    this.init();
    this.api = function(method, args) { this.delegateApiMethod(method, args) }
  };

  Plugin.prototype = {

    // preliminary setup
    init: function() {
      this.addIcons(this.options.useCssIcons);
      this.attachEventHandlers("keyup", this.passwordField, this.confirmField);
    },

    /*
    ** Method: addError
    **
    ** Adds / update the errors in the errorsToValidate object
    **
    ** Parameters:
    **  errorName: String, name of error to add / update
    **  
    ** Returns:
    **  n/a
    */

    addError: function(errorName) {
      this.errors[errorName] = false;
    },

    /*
    ** Method: clearErrors
    **
    ** Clears / resets the errorsToValidate object
    **
    ** Parameters:
    **  n/a
    **  
    ** Returns:
    **  n/a
    */

    clearErrors: function() {
      for(error in this.errors) {
        this.errors[error] = true
      }
    },

    /*
    ** Method: checkForErrors
    **
    ** Checks to see if the errorsToValidate object contains any errors. 
    ** When a value is set to "false" in the errorsToValidate object 
    ** it is considered an error.
    **
    ** Parameters:
    **  n/a
    **  
    ** Returns:
    **  Boolean, if an error is found "true" is returned
    */

    checkForErrors: function() {
      for(error in this.errors) {
        if(this.errors[error] === false) {
          return true;
        }
      }
    },

    /*
    ** Method: validateWithAll
    **
    ** Runs all validation methods in the methods object and adds errors if any are found.
    **
    ** Parameters:
    **  val: String, The value to validate
    **  
    ** Returns:
    **  n/a
    */

    validateWithAll: function(val) {
      for(method in this.methods) { 
        var result = this.methods[method].call(this, val); 
        if(result === false) this.addError(method); 
      }
    },

    /*
    ** Method: delegateValidationType
    **
    ** Delegates the type of validation that should take place, password or confirmPassword.
    **
    ** Parameters:
    **  validationType: String, the type of validation that should happen. "password" or "confirmPassword"
    **  val: String, The value to validate
    **  
    ** Returns:
    **  n/a
    */

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

    /*
    ** Method: attachEventHandlers
    **
    ** Attaches event handlers to the input fields.
    **
    ** Parameters:
    **  eventType: String, the type of event to attach, default is keyup
    **  $passwordField: Object, the jQuery object of the password field to validate  
    **  $confirmField: Object, the jQuery object of the password confirm field to validate
    ** 
    ** Returns:
    **  n/a
    */

    attachEventHandlers: function(eventType, $passwordField, $confirmField) {
      var that = this;
      
      $passwordField.on(eventType, this, function(e) {
        // Re-establishing context
        that.passwordField  = $passwordField;
        that.confirmField   = $confirmField;

        if(e.keyCode != 9) that.delegateValidationType('password', $(this).val());
      });

      $confirmField.on(eventType, this, function(e) {
        that.confirmField = $(this);
        if(e.keyCode != 9) that.delegateValidationType('confirmPassword', $(this).val());
      });
    },

    /*
    ** Method: validatePassword
    **
    ** Runs appropriate validation methods on the password value passed in.
    **
    ** Parameters:
    **  validationType: String, the type of validation that should happen. "password" or "confirmPassword"
    **  val1: String, The first value to validate, the password
    **  val2: String, The second value to validate, the password confirm  
    **
    ** Returns:
    **  Appropriate display state for validations
    */

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

    /*
    ** Method: validateMatching
    **
    ** validates the matching of two values and sets the appropriate display state.
    **
    ** Parameters:
    **  val1: String, The first value to validate, the password
    **  val2: String, The second value to validate, the password confirm  
    **
    ** Returns:
    **  Appropriate display state for password confirmation
    */

    validateMatching: function(val1, val2) {
      return this.methods['isMatching'].call(this, val1, val2) ? this.toggleState("confirmPassword", 'valid') : this.toggleState('confirmPassword', 'error'); 
    },

    /*
    ** Method: toggleState
    **
    ** Sets the display state bases on parameters passed in. Shows and hided icons, adds appropriate classes to input fields. 
    **
    ** Parameters:
    **  type: String, the type of state that should be toggled, "password" or "passwordConfirm"
    **  state: String, the state that should be displayed, "error", "valid", "clear"  
    **
    ** Returns:
    **  n/a
    */

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
        $field.removeClass(this.options.errorClass);
        $field.removeClass(this.options.validClass);
      }
    },

    /*
    ** Method: addIcons
    **
    ** Sets up icons for each field. 
    **
    ** Parameters:
    **  useCss: Boolean, whether or not to use css icons. If useCss is true then the errorIcon and validIcon options won't have to be provided.
    **
    ** Returns:
    **  n/a
    */

    addIcons: function(useCss) {
      var $fields = this.passwordField.add(this.confirmField);
      $fields.each(function() {
        $(this).parent().addClass('validate-field-parent');
        $(this).after("<i class='icon icon-valid' /><i class='icon icon-error' />");
      });

      if(useCss) {
        $(".icon-error").addClass('css-icon');
        $(".icon-valid").addClass('css-icon');        
      } else {
        $(".icon-error").css('background', 'url(' + this.options.errorIcon + ') no-repeat center center');
        $(".icon-valid").css('background', 'url(' + this.options.validIcon + ') no-repeat center center');
      }
    },

    /*
    ** Method: delegateApiMethod
    **
    ** Delegates to the specified API method within the publicMethods Object. 
    **
    ** Parameters:
    **  method: String, the name of the api method to call.
    **  args: Array, an array of arguments the specified api method required.
    **
    ** Returns:
    **  Varies based on method called.
    */

    delegateApiMethod: function(method, args) {
      this.publicMethods[method].apply(this, args);
    },

    // Validation methods object, any new validation requirements should be added here.
    // Note that these methods are called with "call()" where a reference to the parent Plugin object (this) is passed in.
    methods: {

      /*
      ** Method: noSpaces
      **
      ** Checks to see if there are no spaces in the value passed in. 
      **
      ** Parameters:
      **  val: String, value to check
      **
      ** Returns:
      **  Boolean: false if the value has no spaces, true if the value has spaces.
      */

      noSpaces: function(val) {
        return /\s/.test(val) ? false : true;
      },

      /*
      ** Method: hasNumbers
      **
      ** Checks to see if there is at least one number present.
      **
      ** Parameters:
      **  val: String, value to check
      **
      ** Returns:
      **  Boolean: false if the value has no numbers, true if the value has numbers.
      */

      hasNumbers: function(val) {
        return /\d/.test(val);
      },

      /*
      ** Method: hasLetters
      **
      ** Checks to see if there is at least one letter present.
      **
      ** Parameters:
      **  val: String, value to check
      **
      ** Returns:
      **  Boolean: false if the value has no letters, true if the value has letters.
      */

      hasLetters: function(val) {
        return (/[a-zA-Z]/g).test(val);
      },

      /*
      ** Method: charLength
      **
      ** Checks to see if minimum length requirements have been met.
      **
      ** Parameters:
      **  val: String, value to check
      **
      ** Returns:
      **  Boolean: false if the value is too short, true if the value is greater than or equal to the validLength option.
      */

      charLength: function(val) {
        return parseInt(val.length) >= this.options.validLength ? true : false;
      },

      /*
      ** Method: isMatching
      **
      ** Checks to see if two values are equal.
      **
      ** Parameters:
      **  val1: String, first value to compare
      **  val2: String, second value to compare
      **
      ** Returns:
      **  Boolean: true if the values match, false if they don't.
      */

      isMatching: function(val1, val2) {
        return val1 === val2 ? true : false;
      }
    },

    // Public methods object, anything that should be exposed as an "API" should be added here.
    // Note that these methods are called with "apply()" where a reference to the parent Plugin object (this) is passed in.
    publicMethods: {

      /*
      ** Public Method: resetValidation
      **
      ** Clears validation icons and resets the password field values
      **
      ** Parameters:
      **  n/a
      **
      ** Returns:
      **  Appropriate display state of the validated fields
      */

      resetValidation: function() {
        this.toggleState("password", "clear");
        this.toggleState("confirm", "clear");
        this.passwordField.val("");
        this.confirmField.val("");
      }
    }
  };

  // Instantiating the plug-in once per element
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);