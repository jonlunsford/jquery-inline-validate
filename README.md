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

#### Include the necessary files

Simply reference the ```jquery.inlineValidate.js``` file after your reference to jquery, or be super awesome and toss the Inline Validate js into your ```plugins.js``` file. 

There are some basic styles included in ```inlineValidate.(css|less)``` to get you started.

### Usage
---

#### Make it happen

Call Inline Validate like any other plug-in, during instantiation you can tell Inline Validate to use any class names you like, you must also provide a path to your icons if you are not using the useCssIcons option like this:

```JavaScript
  
$('#validate-me').inlineValidate({
  passwordField: '.my-custom-password-field-class',
  passwordConfirmField: '.my-custom-password-confirmation-field-class',
  errorIcon: '/img/my-error-icon.png',
  validIcon: '/img/my-valid-icon.png'   
});
```
Inline Validate has built in css icons for displaying errors and valid states, simply set ```useCssIcons: true```, you may need to tweak the css to fit your needs, like this:

```JavaScript
  
$('#validate-me').inlineValidate({           
  useCssIcons: true                           
});
```

#### Available options

Inline Validate has some basic options.

| Option                | Value                                                                                                                                                           |
|:----------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| passwordField         | *string* Default: ".validate-password", selector of password field to validate.                                                                                 |
| passwordConfirmField  | *string* Default: ".validate-confirm", selector of password confirm field to validate.                                                                          |
| errorClass            | *string* Default: "input-validation-error", class that will be added to input fields when an error is found.                                                    |
| validClass            | *string* Default: "input-validation-valid", class that will be added to input fields when data is valid.                                                        |
| errorIcon             | *String* Default: "", url to error icon image.                                                                                                                  | 
| validIcon             | *String* Default: "", url to valid icon image                                                                                                                   | 
| useCssIcons           | *Boolean* Default: false, whether to use css icons or not. If true, errorIcon and validIcon don't have to be provided.                                          |
| live                  | *Boolean* Default: true, whether or not validation is run on the keyup event                                                                                    |
| validLength           | *Integer* Default: 8, minimum length requirement for password                                                                                                   |
| errorsToValidate      | *Object*  Default: noSpaces, hasNumbers, hasLetters, isMatching, and charLength. This is the object that tracks the valid state of these methods in the plugin. |

### API
---

The API was built to be extensible so feel free to contribute, and keep an eye out for new methods in the future.

### Usage

The API is accessed through the data object attached to the form element you call the plugin on, link this:

```JavaScript
var plugin = $("#validate-me").data("plugin_inlineValidate");
plugin.api("resetValidation");
```
If the API method takes arguments they must be passed in as an array, like this:

```JavaScript
var plugin = $("#validate-me").data("plugin_inlineValidate");
plugin.api("apiMethod", ["arg1", "arg2", "arg3"]);
```

### Available methods

|Method          | Params                                                                                 |
|:---------------|:---------------------------------------------------------------------------------------|
|resetValidation | *none*: Clear the icons, error state of the fields and clear the password field values |  

### Road map
---

- [x] Add Tests.
- [ ] Add links to demos / examples in documentation.
- [x] Add API mechanism.
- [x] Have a beer.