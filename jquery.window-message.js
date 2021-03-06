/* -------------------------------------------------------------------------------------------- //
// jQuery.Window-message.js
// -------------------------------------------------------------------------------------------- //
// This is a simple window.alert replacement using jQuery. By Jorge Moreno - @alterebro
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
// -------------------------------------------------------------------------------------------- */

$.Window =  {
	element : 'terminal-output',
	defaultHeight : 150,
	_construct : function() {
		$('<div />')
			.attr({
				'id' : this.element
			})
			.css({
				'position' : 'fixed',
				'overflow' : 'auto',
				'left' : '0',
				'bottom' : '0',
				'z-index' : '999999',
				'background' : 'rgba(8, 8, 8, .8)',
				'color' : '#efe',
				'text-shadow' : '0 -1px 0 rgba(0, 0, 0, .75)',
				'width' : '100%',
				'height' : this.defaultHeight+'px',
				'font-family' : '"Lucida Sans Typewriter", "Lucida Sans Unicode", "Lucida Console", monaco, monospace',
				'font-size' : '12px',
				'box-sizing' : 'border-box',
				'padding' : '15px'
			})
			.appendTo('body');

		var close_action = this._destruct;
		var element = this.element;
		$('<div />')
			.attr({
				'id' : 'close-button'
			})
			.css({
				'width' : '36px',
				'height' : '36px',
				'background' : 'rgba(0, 0, 0, .5)',
				'position' : 'absolute',
				'top' : '10px',
				'right' : '5px',
				'text-align' : 'center',
				'line-height' : '32px',
				'font-size' : '28px',
				'border-radius' : '3px',
				'cursor' : 'pointer'
			})
			.html('&times;')
			.appendTo('#'+this.element)
			.click(function() {
				close_action(element);
			});

		$('<div />')
			.attr({
				'id' : 'drag-bar'
			})
			.css({
				'position' : 'absolute',
				'top' : '0',
				'left' : '0',
				'width' : '100%',
				'height' : '4px',
				'background' : 'rgba(0, 0, 0, .75)',
				'border-bottom' : 'solid rgba(255, 255, 255, .35) 1px',
				'cursor' : 'row-resize'
			})
			.appendTo('#'+this.element)
			.mousedown(function(e) {
				e.preventDefault();
				$(document).mousemove(function(e){
					var h = window.innerHeight - e.pageY;
					var eh = h;

					if ( h < 80 ) {	eh = 80; }
					if ( h > (window.innerHeight - 20)) { eh = window.innerHeight - 20; }
					$('#'+element).css({'height':eh});
				});
			});

		$(document).mouseup(function(e){
			$(document).unbind('mousemove');
		});

	},
	_destruct : function(element) {
		$('#'+element).hide();
	},
	message : function(str) {
		var element = '#'+this.element;
		if ( $(element).length == 0 ) {
			this._construct();
		} else {
			if ( $(element).is(":visible") == false ) { $(element).show(); }
		}
		$('<div />')
			.css({
				'padding' : '5px 0',
				'border-bottom' : 'dotted rgba(255, 255, 255, .25) 1px'
			})
			.html(str)
			.prependTo(element);
	}
    
};
