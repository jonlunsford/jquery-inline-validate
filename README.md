# Jquery Inline Validate

Jquery Inline Validate is a lightweight plugin to help validate passwords and their confirmation inline.

### Installation
---

#### Write some basic markup

Inline Validate works with form inputs, for the icons to display properly the inputs will need a parent wrapper, like this:

```html

<form id="validate-me" action="#" method="POST">
  <ul>
    <li>
      <input class="validate-password" type="password" name="password" />
    </li>
    <li>
      <input class="validate-confirm" type="password" name="password-confirm" />
    </li>
  </ul>
</form>
```

jQuery inline validate is called on a parent form and you can either name your input elements the same as above or pass in your own selectors.

#### Include the neccessary files

Simply reference the ```jquery.inlineValidate.js``` file after your reference to jquery, or be super awesome and toss the Inline Validate js into your ```plugins.js``` file. 

There are some basic styles included in ```inlineValidate.(css|less)``` to get you started.

### Usage
---

#### Make it happen

Call Inline Validate like any other plugin, during instantiation you can tell Inline Validate to use any class names you like, you must also provide a path to your icons if you are not using the useCssIcons option like this:

```JavaScript
  
$('#validate-me').inlineValidate({
  passwordField: '.my-custon-password-field-class',
  passwordConfirmField: '.my-custon-password-confirmation-field-class',
  errorIcon: '/img/my-error-icon.png',
  validIcon: '/img/my-valid-icon.png'   
});
```
Inline Validate has built in css icons for displaying errors, and valid states simply set ```useCssIcons: true```, you may need to tweak the css to fit your needs, like this:

```JavaScript
  
$('#validate-me').inlineValidate({           
  useCssIcons: true                           
});
```

#### Available options

Inline Validate has some basic options.

| Option                | Value                                                                                                              |
|:----------------------|:-------------------------------------------------------------------------------------------------------------------|
| passwordField         | *string* Default: ".validate-password", selctor of password field to validate.                                                    |
| passwordConfirmField  | *string* Default: ".validate-confirm", selector of password confirm field to validate.                 |
| errorClass            | *string* Default: "input-validation-error", class that will be added to input fields when an error is found. |
| validClass            | *string* Default: "input-validation-valid", class that will be added to input fields when data is valid.                     |
| errorIcon            | *String* Default: "", url to error icon image.                                                 | 
| validIcon          | *String* Default: "", url to valid icon image                            | 

### Roadmap
---

- [x] Add Tests.
- [ ] Add links to demos / examples in documentation.
- [ ] Add API for added more validation methods.
- [x] Have a beer.



      defaults = {
        passwordField: ".validate-password",          // String, selector of password field to validate
        passwordConfirmField: ".validate-confirm",    // String, selector of password confirm field to validate
        errorClass: "input-validation-error",         // String, class that will be added to input fields when an error is found
        validClass: "input-validation-valid",         // String, class that will be added to input fields when data is valid
        errorIcon: "",                                // String, url to error icon image
        validIcon: "",                                // String, url to valid icon image
        useCssIcons: false,                           // Boolean, whether to use css icons or not. If true, errorIcon and validIcon don't have to be provided.
        live: true,                                   // Boolean, whether or not validation is run in the keyup event
        validLength: 8,                               // Integer, minumum length requirement for password
        errorsToValidate: {                           // Object, all validations that must be met. This object is updated and checked based on validation results
          noSpaces: true,                             // Boolean, default state for "noSpaces"                    
          hasNumbers: true,                           // Boolean, default state for "hasNumbers"
          hasLetters: true,                           // Boolean, default state for "hasLetters"
          isMatching: true,                           // Boolean, default state for "isMatching"
          charLength: true                            // Boolean, default state for "charLength"
        }
      };
