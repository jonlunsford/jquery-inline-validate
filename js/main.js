$(function() {
  
  $(".validate").inlineValidate({
    useCssIcons: true
  });

  var plugin = $(".validate").data("plugin_inlineValidate");

  $(".reset-validation").on("click", this, function(e) {
  	e.preventDefault();
  	plugin.api("resetValidation");
  });

  $(".show-errors").on("click", this, function(e) {
  	e.preventDefault();
  	plugin.api("displayAllErrors");
  });

}); // end doc.ready