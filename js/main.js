$(function() {
  
  $(".validate").inlineValidate({
    useCssIcons: true
  });

  $(".reset-validation").on("click", this, function(e) {
  	e.preventDefault();
  	var plugin = $(".validate").data("plugin_inlineValidate");
  	plugin.api("resetValidation");
  });

}); // end doc.ready