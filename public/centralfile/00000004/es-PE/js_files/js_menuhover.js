;(function($,window,document,undefined){var pluginName='bootstrapDropdownHover',defaults={clickBehavior:'sticky',hideTimeout:200},_hideTimeoutHandler,_hardOpened=false,_touchstartDetected=false,_mouseDetected=false;function BootstrapDropdownHover(element,options){this.element=$(element);this.settings=$.extend({},defaults,options);this._defaults=defaults;this._name=pluginName;this.init();}
function bindEvents(dropdown){$('body').one('touchstart.dropdownhover',function(){_touchstartDetected=true;});$('body').one('mouseenter.dropdownhover',function(){if(!_touchstartDetected){_mouseDetected=true;}});$('.dropdown-toggle, .dropdown-menu',dropdown.element.parent()).on('mouseenter.dropdownhover',function(){if(_mouseDetected&&!$(this).is(':hover')){_mouseDetected=false;}
if(!_mouseDetected){return;}
clearTimeout(_hideTimeoutHandler);if(!dropdown.element.parent().hasClass('open')){_hardOpened=false;dropdown.element.dropdown('toggle');}});$('.dropdown-toggle, .dropdown-menu',dropdown.element.parent()).on('mouseleave.dropdownhover',function(){if(!_mouseDetected){return;}
if(_hardOpened){return;}
_hideTimeoutHandler=setTimeout(function(){if(dropdown.element.parent().hasClass('open')){dropdown.element.dropdown('toggle');}},dropdown.settings.hideTimeout);});dropdown.element.on('click.dropdownhover',function(e){if(!_mouseDetected){return;}
switch(dropdown.settings.clickBehavior){case'default':return;case'disable':e.preventDefault();e.stopImmediatePropagation();break;case'sticky':if(_hardOpened){_hardOpened=false;}
else{_hardOpened=true;if(dropdown.element.parent().hasClass('open')){e.stopImmediatePropagation();e.preventDefault();}}
return;}});}
function removeEvents(dropdown){$('.dropdown-toggle, .dropdown-menu',dropdown.element.parent()).off('.dropdownhover');$('.dropdown-toggle, .dropdown-menu',dropdown.element.parent()).off('.dropdown');dropdown.element.off('.dropdownhover');$('body').off('.dropdownhover');}
BootstrapDropdownHover.prototype={init:function(){this.setClickBehavior(this.settings.clickBehavior);this.setHideTimeout(this.settings.hideTimeout);bindEvents(this);return this.element;},setClickBehavior:function(value){this.settings.clickBehavior=value;return this.element;},setHideTimeout:function(value){this.settings.hideTimeout=value;return this.element;},destroy:function(){clearTimeout(_hideTimeoutHandler);removeEvents(this);this.element.data('plugin_'+pluginName,null);return this.element;}};$.fn[pluginName]=function(options){var args=arguments;if(options===undefined||typeof options==='object'){if(!$.contains(document,$(this)[0])){$('[data-toggle="dropdown"]').each(function(index,item){$(item).bootstrapDropdownHover(options);});}
return this.each(function(){if(!$(this).hasClass('dropdown-toggle')||$(this).data('toggle')!=='dropdown'){$('[data-toggle="dropdown"]',this).each(function(index,item){$(item).bootstrapDropdownHover(options);});}else if(!$.data(this,'plugin_'+pluginName)){$.data(this,'plugin_'+pluginName,new BootstrapDropdownHover(this,options));}});}else if(typeof options==='string'&&options[0]!=='_'&&options!=='init'){var returns;this.each(function(){var instance=$.data(this,'plugin_'+pluginName);if(instance instanceof BootstrapDropdownHover&&typeof instance[options]==='function'){returns=instance[options].apply(instance,Array.prototype.slice.call(args,1));}});return returns!==undefined?returns:this;}};})(jQuery,window,document);