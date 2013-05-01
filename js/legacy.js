// password errors
var passwordErrors = {
    passHasNoSpaces: true,
    passNumOK: true,
    passCharsOK: true,
    passLengthOK: true,

    //runs a check to see if any of these props are false
    hasErrors: function () {
        return !(this.passHasNoSpaces && this.passNumOK && this.passCharsOK && this.passLengthOK);
    },
    setError: function (propName) {
        this[propName] = false;
        return false;
    },
    resetErrors: function () {
        this.passHasNoSpaces = true;
        this.passCharsOK = true;
        this.passNumOK = true;
        this.passLengthOK = true;
        return false;
    }
};




/*
** Object: inlinePasswordValidator
**
** Object for Handling inline validation of password and password confirmation fields.
**
*/

var inlinePasswordValidator = {

    init: function() {
        this.attachEventHandlers("#loginInfoTable", "#su2Password", "password");
        this.attachEventHandlers("#loginInfoTable", "#su2PasswordConfirm", "confirmation");
    },

    /*
    ** Function: attachEventHandlers
    **
    ** Attaches keyup event handlers on fields passed in.
    **
    ** Parameters:
    **  context: string, jquery selector string of the parent context. ex: "#mySelector"
    **  passwordField: string, jquery selector string of field to validate. ex: "#myPasswordField"
    **  type: string, type of field. ex: "password" or "confirmation"
    */

    attachEventHandlers: function(context, passwordField, type) {
        var that = this;
        $(context).on("keyup", passwordField, function() {
            that.delegateValidationMethod(passwordField, type);
        });
    },

    /*
    ** Function: delegateValidationMethod
    **
    ** Delegates the typ of validation to be run on the formField passed in.
    **
    ** Parameters:
    **  formField: string, jquery selector string of the form element. ex: "#mySelector"
    **  formField: string, jquery selector string of field to validate. ex: "#myPasswordField"
    **  type: string, type of validation. ex: "password" or "confirmation"
    */

    delegateValidationMethod: function(formField, type) {
        switch(type) {
            case "password":
                return this.validatePassword(formField);
                break;
            case "confirmation":
                return this.checkForPasswordMatch("#su2Password", formField);
                break;
        };
    },

    /*
    ** Function: validatePassword
    **
    ** Runs the validatePwd() funcion declared on line 42, checks for password matching,
    ** and shows errors based on validation results.
    **
    ** Parameters:
    **  element: string, jquery selector string of the form element. ex: "#mySelector".
    */

    validatePassword: function(element) {
        validatePwd();
        this.checkForPasswordMatch(element, "#su2PasswordConfirm");
        return this.checkForErrors() ? this.displayErrors(element) : this.removeErrors(element);
    },

    /*
    ** Function: checkForErrors
    **
    ** Runs the  passwordErrors.hasErrors() funcion declared on line 26, checks for password matching,
    ** and shows errors based on validation results.
    **
    ** Parameters:
    **  element: string, jquery selector string of the form element. ex: "#mySelector"
    */

    checkForErrors: function() {
        return passwordErrors.hasErrors();
    },

    /*
    ** Function: displayErrors
    **
    ** Sets error state on form fields and shows error icon.
    **
    ** Parameters:
    **  elemContext: string, jquery selector string of the form element. ex: "#mySelector"
    */

    displayErrors: function(elemContext) {
        $(elemContext)
            .addClass("error")
            .siblings(".inline-validation-status")
            .removeClass("success")
            .addClass("error")
            .show();
    },

    /*
    ** Function: displayErrors
    **
    ** Sets error state on form fields and shows success icon.
    **
    ** Parameters:
    **  elemContext: string, jquery selector string of the form element. ex: "#mySelector"
    */

    removeErrors: function(elemContext) {
        $(elemContext)
            .removeClass("error")
            .siblings(".inline-validation-status")
            .removeClass("error")
            .addClass("success")
            .show();
        
        if($(elemContext).val() === "") $(elemContext).siblings(".inline-validation-status").hide(); 
    },
    
    /*
    ** Function: checkForPasswordMatch
    **
    ** Checks if the values of the elements passed in match.
    **
    ** Parameters:
    **  passwordField: string, jquery selector string of the password form element. ex: "#mySelector"
    **  confirmationField: string, jquery selector string of the field used for password confirmation. ex: "#mySelector"
    */

    checkForPasswordMatch: function(passwordField, confirmationField) {
        var match = ($(confirmationField).val() === $(passwordField).val());
        return match ? this.removeErrors(confirmationField) : this.displayErrors(confirmationField);
    }
};