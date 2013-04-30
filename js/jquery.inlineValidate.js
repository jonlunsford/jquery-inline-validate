/*!
** jQuery Inline Password Validator
** Original author: @carebears customercarebears@mindbodyonline.com
** Authored date: 04/29/2013
** Further changes, comments:
*/


;(function($, window, document, undefined) {

  var pluginName = 'validateInline',
      defaults = {
      	// defualt options
      };

  function Plugin(element, options) {
    this.element = $(element);                      
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  };

  Plugin.prototype = {

    init: function() {
    	console.log("hello world!")
    },

  };

  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);

