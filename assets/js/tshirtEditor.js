(function($) {

	/**
	 * Copyright 2012, Digital Fusion
	 * Licensed under the MIT license.
	 * http://teamdf.com/jquery-plugins/license/
	 *
	 * @author Sam Sehnert
	 * @desc A small plugin that checks whether elements are within
	 *     the user visible viewport of a web browser.
	 *     only accounts for vertical position, not horizontal.
	 */

	$.fn.visible = function(partial) {

		var $t = $(this), $w = $(window), viewTop = $w.scrollTop(), viewBottom = viewTop + $w.height(), _top = $t.offset().top, _bottom = _top + $t.height(), compareTop = partial === true ? _bottom : _top, compareBottom = partial === true ? _top : _bottom;

		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

	};

})(jQuery);
(function($) {

	$.fn.fontselect = function(options) {

		var __bind = function(fn, me) {
			return function() {
				return fn.apply(me, arguments);
			};
		};

		tmp_fonts = fa_settings.setting_font_list_.replace(/%2B/g, '+');
		var fonts = tmp_fonts.split(",");

		var settings = {
			style : 'font-select',
			placeholder : 'Select a font',
			lookahead : 1,
			pager : 10,
			api : 'https://fonts.googleapis.com/css?family='
		};

		var Fontselect = (function() {

			function Fontselect(original, o) {
				this.$original = $(original);
				this.options = o;
				this.active = false;
				this.setupHtml();
				this.getVisibleFonts();
				this.scrollEvent();
				this.bindEvents();

				var font = this.$original.val();
				if (font) {
					this.updateSelected();
					this.addFontLink(font);
				}
			}


			Fontselect.prototype.bindEvents = function() {

				this.$results.on('click', 'li.font-family', __bind(this.selectFont, this)).on('mouseenter', 'li', __bind(this.activateFont, this)).on('mouseleave', 'li', __bind(this.deactivateFont, this));
				this.$results.on('click', 'span', __bind(this.toggleDrop, this));
				this.$select.on('click', 'span', __bind(this.toggleDrop, this));

			};

			Fontselect.prototype.toggleDrop = function(ev) {

				if (this.active) {
					this.$element.removeClass('font-select-active');
					this.$drop.removeClass('show');
					clearInterval(this.visibleInterval);

				} else {
					this.$element.addClass('font-select-active');
					this.$drop.addClass('show');
					this.moveToSelected();
					this.visibleInterval = setInterval(__bind(this.getVisibleFonts, this), 500);
				}

				this.active = !this.active;
			};

			Fontselect.prototype.selectFont = function() {

				var font = $('li.active', this.$results).data('value');
				this.$original.val(font).change();
				this.updateSelected();
				this.toggleDrop();
			};

			Fontselect.prototype.moveToSelected = function() {

				var $li, font = this.$original.val();

				if (font) {
					$li = $("li[data-value='" + font + "']", this.$results);
				} else {
					$li = $("li", this.$results).first();
				}

				// this.$results.scrollTop($li.addClass('active').position().top);
			};

			Fontselect.prototype.activateFont = function(ev) {
				$('li.active', this.$results).removeClass('active');
				$(ev.currentTarget).addClass('active');
			};

			Fontselect.prototype.deactivateFont = function(ev) {

				$(ev.currentTarget).removeClass('active');
			};

			Fontselect.prototype.updateSelected = function() {

				var font = this.$original.val();
				$('span', this.$element).text(this.toReadable(font)).css(this.toStyle(font));
			};

			Fontselect.prototype.setupHtml = function() {

				this.$original.empty();
				this.$element = $('<div>', {
					'class' : this.options.style
				});
				this.$arrow = $('');
				this.$select = $('<a class="fa-button"><span>' + this.options.placeholder + '</span><i class="icon icon-chevron-down"></i></a>');
				this.$drop = $('<div>', {
					'class' : 'fs-drop dropdown-menu'
				});
				this.$results = $('<ul>', {
					'class' : 'fs-results'
				});
				this.$original.after(this.$element.append(this.$select.append(this.$arrow)).append(this.$drop));
				this.$drop.append(this.$results.append(this.fontsAsHtml(0)));

			};

			Fontselect.prototype.scrollLoader = function() {
				var count = this.$drop.find('div:last-child');
				if (count.visible() == true) {

					var point = count.data('point');

					this.$drop.append(this.$results.append(this.fontsAsHtml(point + 1)));

				}

			};

			Fontselect.prototype.scrollEvent = function() {
				this.$drop.scroll(__bind(this.scrollLoader, this));

			};

			Fontselect.prototype.fontsAsHtml = function(from) {
				var l = this.options.pager;
				//fonts.length;
				var r, s, h = '';

				for (var i = from; i <= (l + from); i++) {
					if ((from + l - 1) >= fonts.length) {

					} else {
						r = this.toReadable(fonts[i]);
						s = this.toStyle(fonts[i]);

						h += '<li class="font-family" data-value="' + fonts[i] + '" style="font-family: ' + s['font-family'] + ';">' + r + '</li>';

						if (i == (from + l)) {
							h += '<div data-point="' + (from + l) + '"></div>';
						}
					}
				}
				return h;
			};

			Fontselect.prototype.toReadable = function(font) {
				if (font) {
					return font.replace(/[\+|:]/g, ' ');
				}
			};

			Fontselect.prototype.toStyle = function(font) {
				var t = font.split(':');
				return {
					'font-family' : this.toReadable(t[0]),
					'font-weight' : (t[1] || 400)
				};
			};

			Fontselect.prototype.getVisibleFonts = function() {

				if (this.$results.is(':hidden'))
					return;

				var fs = this;
				var top = this.$results.scrollTop();
				var bottom = top + this.$results.height();

				if (this.options.lookahead) {
					var li = $('li', this.$results).first().height();
					bottom += li * this.options.lookahead;
				}

				$('li', this.$results).each(function() {

					var ft = $(this).position().top + top;
					var fb = ft + $(this).height();

					if ((fb >= top) && (ft <= bottom)) {
						var font = $(this).data('value');
						fs.addFontLink(font);
					}

				});
			};

			Fontselect.prototype.addFontLink = function(font) {

				var link = this.options.api + font;

				if ($("link[href*='" + font + "']").length === 0) {
					$('link:last').after('<link href="' + link + '" rel="stylesheet" type="text/css">');

				}
			};

			return Fontselect;
		})();

		return this.each(function(options) {
			// If options exist, lets merge them
			if (options)
				$.extend(settings, options);

			return new Fontselect(this, settings);
		});

	};
})(jQuery);

var canvas;
var tshirts = new Array();
var a;
var b;
var line;
var $color;
var imgf;
var imgb;
var front;
var back;
var grid = 10;
var hasback = 1;
var lineAdded = false;
var lineW, lineH;
var copiedObject;
var copiedObjects = new Array();
var canvasScale = 1;
var SCALE_FACTOR = 1.2;
var drawline, line, isDown;
$(document).ready(function() {

	var productFront = $('#tshirtFacing').data('front');
	var productBack = $('#tshirtFacing').data('back');
	var progress = $('.progress-bar');

	canvas = new fabric.Canvas('tcanvas');

	canvas.on({
		'object:selected' : onObjectSelected,
		'selection:cleared' : onSelectedCleared,
		'object:moving' : onObjectMoving,
		'mouse:up' : onMouseUp,
		'mouse:move' : moveLine,
		'mouse:down' : startLine,
	});

	// initialize
	console.log(fa_settings.edit_id);
	if (fa_settings.edit_id) {
		ajax_load(fa_settings.edit_id);
	}

	if (productBack == '') {
		hasback = 0;
		$('#flip').remove();
	}
	$('.handle').on('click', function() {
		if ($(this).data('close') == '0') {

			$('.tool-container').addClass('closeme');
			$('.widget div').removeClass('visible');
			$(this).data('close', '1');
		} else {

			$('.tool-container').removeClass('closeme');
			$(this).data('close', '0');
		}

	});
	$('.widget > h3').on('click', function() {
		if ($(this).next().hasClass('visible')) {

			$(this).next().removeClass('visible');
		} else {
			if ($(this).data('save')) {

			} else {
				$('.tool-container').removeClass('closeme');
				$('.widget > div').removeClass('visible');
				$(this).next().addClass('visible');
			}
		}
	});
	/*Gallery Pagination*/
	jQuery("body").on("click", ".media-navigation li", function(e) {
		e.preventDefault();

		jQuery.ajax({
			type : "POST",
			dataType : "json",
			async : true,
			url : fa_settings.site_url_ + '/wp-admin/admin-ajax.php',
			data : {
				category : $('.get-last-category:last').data("cat"),
				page : $(this).children().data("next"),
				posts_per_page : $('.get-last-category').data("perpage"),
				action : "paginate_media_gallery"
			},
			beforeSend : function(xhr) {
				$(".photo.gallery-item > .progress-bar").addClass('active');
			},
			success : function(data, textStatus, XMLHttpRequest) {
				
				if(data.out!=''){
					var page = $('.media-navigation li > a').data("next");
					$(".gallery-item .photo-list").append(data.out);
					$('.media-navigation li > a').data("next", page + 1);
					$(".photo.gallery-item > .progress-bar").removeClass('active');
				}else{
					$(".media-navigation .next a").html('Nothing to show');
				}
				
			}
		});
	});
	$('.goback').on('click', function() {
		$('#accorde > h3').removeClass('bye');
		$(this).parent().removeClass('visible');
	});

	$('img').on('dragstart', function(event) {
		event.preventDefault();
	});

	$("#orderit-ajax").click(function(e) {
		e.preventDefault();
		//$('#drawingArea img,#tshirtFacing img').css('opacity', '0.5');

		current = JSON.stringify(canvas);
		obj = JSON.parse(current);

		if (!a && !b && obj.objects.length == 0) {

			$(this).html('Nothing There').delay(400).html('Create Product');

		} else {
			showProgressBar();
			flip(productFront, productBack, canvas, true);

			if ((a && b) && hasback != 0) {

				canvas.deactivateAll().renderAll();
				front = JSON.stringify(a);
				back = JSON.stringify(b);

				$color = canvas.backgroundColor;
				canvas.loadFromJSON(a, function() {
					$('#shirtDiv').data('holdera', canvas.toDataURL('jpg'));
					canvas.loadFromJSON(b, function() {
						canvas.deactivateAll().renderAll();
						$('#shirtDiv').data('holderb', canvas.toDataURL('jpg'));
						setTimeout(sendAjax($color, type = '', $('#shirtDiv').data('holdera'), $('#shirtDiv').data('holderb'), front, back), 200);
					});
				});
			} else {
				$color = canvas.backgroundColor;
				if (a) {
					front = JSON.stringify(a);
					back = '';
					canvas.loadFromJSON(a, function() {
						canvas.deactivateAll().renderAll();
						$('#shirtDiv').data('holder', canvas.toDataURL('jpg'));
						sendAjax($color, type = '', $('#shirtDiv').data('holder'), '', front, back);
					});

				} else if (b) {

					back = JSON.stringify(b);
					front = '';
					canvas.loadFromJSON(b, function() {
						canvas.deactivateAll().renderAll();
						$('#shirtDiv').data('holder', canvas.toDataURL('jpg'));
						sendAjax($color, type = '', '', $('#shirtDiv').data('holder'), front, back);
					});

				}

			}
		}

	});

	$('#font-family').fontselect().change(function() {
		var font = $(this).val().replace(/\+/g, ' ');
		setFont(font);
	});

	$('nav > div > .dropdown > span').on('click', function() {
		$(this).toggleClass('open');
		console.log('s');
		$('ul.sub-menu').removeClass('visible');
		if ($(this).hasClass('open')) {
			$(this).next('ul.sub-menu').addClass('visible');
		} else {
			$(this).next('ul.sub-menu').removeClass('visible');
		}
	});

	$(document).mouseup(function (e)
	{
    var container = $("ul.sub-menu");

    if (!container.is(e.target)  && container.has(e.target).length === 0) {
        container.removeClass('visible');
        container.prev().removeClass('open');
    }
});
	$('#main-color').minicolors({
		inline : true,
		change : function(hex, rgb) {

			var activeObject = canvas.getActiveObject();

			$('span.color-main').css('background-color', this.value);

			if (activeObject && activeObject.type !== 'path') {
				activeObject.fill = this.value;
			} else if (activeObject) {
				activeObject.stroke = this.value;
			}
			if (canvas.isDrawingMode) {
				canvas.freeDrawingBrush.color = this.value;
			}
			canvas.renderAll();
		}
	});
	$('span.color-main').css('background-color', $('#main-color').minicolors('value'));
	$('span.color-secondary').css('background-color', $('#stroke-color').minicolors('value'));

	$("#stroke-color").minicolors({

		inline : true,
		change : function(hex, rgb) {
			$('span.color-secondary').css('background-color', this.value);

			var activeObject = canvas.getActiveObject();
			if (activeObject) {
				activeObject.stroke = this.value;
				canvas.renderAll();
			}

		}
	});

	$('.slider').slider({
		min : 0,
		max : 50,
		change : function(ui) {
			var _val = $(this).slider("value");
			var _type = $(this).data('type');
			var _eval = $(this).data('eval');
			if (_type == "draw") {

				linewidth = _val;
				canvas.freeDrawingBrush.width = parseInt(linewidth, 10) || 1;

			}
			if (canvas.getActiveObject()) {
				var activeObject = canvas.getActiveObject();
				if (_type == "border") {
					activeObject.stroke = $("#stroke-color").minicolors("value");
					if (activeObject.type === "text") {
						_val = _val / 2;
					}
					if (_val == 0) {
						activeObject.stroke = null;
						activeObject.strokeWidth = '';
					} else {
						activeObject.strokeWidth = _val;
					}
					activeObject.setCoords();
					canvas.renderAll();
				}
			}
		}
	});

	initCustomization();

	/*
	 * Drawing mode
	 */
	var drawingModeEl = $('.freedraw');
	canvas.freeDrawingCursor = 'crosshair';

	$('#paint-tools .rect').on('click', function() {
		clearOther();
		var top = canvas.height / 2 - 100;
		var left = canvas.width / 2 - 50;
		var rect = new fabric.Rect(defaultArray(top, left, 100, 100));
		rect.fill = getCurrentColor();
		canvas.add(rect);
		canvas.renderAll();
	});
	$('#paint-tools .triangle').on('click', function() {
		clearOther();
		var top = canvas.height / 2 - 100;
		var left = canvas.width / 2 - 50;
		var triangle = new fabric.Triangle(defaultArray(top, left, 100, 100));
		triangle.fill = getCurrentColor();
		canvas.add(triangle);
		canvas.renderAll();
	});

	$('#paint-tools .poly a').on('click', function() {
		clearOther();
		var top = canvas.height / 2 - 100;
		var left = canvas.width / 2 - 50;
		var lines = new Array();
		var numberOfSides = (parseInt($(this).prev('input').val()) > 3 && parseInt($(this).prev('input').val()) ) ? parseInt($(this).prev('input').val()) : '5';
		var Xcenter = 25, Ycenter = 25;
		var size = 100;
		for (var i = 1; i <= numberOfSides; i += 1) {

			lines.push({
				x : Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides),
				y : Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)
			});
		}
		var poly = new fabric.Polygon(lines, defaultArray(top, left));
		poly.fill = getCurrentColor();
		canvas.add(poly);
		canvas.renderAll();
	});
	$('#paint-tools .line').on('click', function() {

		if (drawline == 'true' || $(this).hasClass('active')) {

			$(this).removeClass('active');
			$('.line-draw').hide();

			drawline = false;

		} else if (drawline == false || drawline == undefined) {
			$(this).addClass('active');
			$('.line-draw').show();
			drawline = true;
		}

	});
	$('#paint-tools .circle').on('click', function() {
		clearOther();
		var left = canvas.width / 2 - 100;
		var top = canvas.height / 2 - 100;
		var circle = new fabric.Circle({
			left : left,
			top : top,
			radius : 50
		});
		circle.fill = getCurrentColor();
		canvas.add(circle);
		canvas.renderAll();
	});

	drawingModeEl.on('click', function() {
		canvas.isDrawingMode = !canvas.isDrawingMode;

		canvas.freeDrawingBrush.color = getCurrentColor();

		canvas.freeDrawingBrush.width = parseInt($('#drawing-line-width').slider("option", "value"));

		if (canvas.isDrawingMode) {

			$(this).addClass('active');
			$('.line-draw').show();

		} else {
			$(this).removeClass('active');
			$('.line-draw').hide();
		}
	});

	fabric.util.addListener(fabric.document, 'dblclick', dblClickHandler);
	fabric.util.removeListener(canvas.upperCanvasEl, 'dblclick', dblClickHandler);

	$('#add-text').on('click', function() {
		if ($('#text-string').val() == '') {
			$(this).attr('data-tooltip', 'Nothing to Add');
		} else {
			$(this).removeData('data-tooltip');
			var text = $("#text-string").val();
			var left = canvas.width / 2;
			var top = canvas.height / 2;
			var textSample = new fabric.Text(text, {
				left : left,
				top : top,
				angle : 0
			});
			textSample.fontFamily = $('#font-family').val().replace(/\+/g, ' ') ? $('#font-family').val().replace(/\+/g, ' ') : 'arial';
			textSample.fill = getCurrentColor();
			canvas.add(textSample);
			textSample.center().setCoords();
			canvas.renderAll();
		}
	});
	$("#text-string").keyup(function() {
		$('#add-text').removeData('data-tooltip');
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.text = this.value;
			canvas.renderAll().setCoords();
		}
	});
	$('.photo').on('click', 'img', function(e) {
		var path = $(this).data('full');
		var svg = path.split('.').pop();
		if (svg == 'svg') {
			addSvg(path);
		} else {
			addImage(path);
		}
	});
	$('#remove-selected').click(function() {
		var activeObject = canvas.getActiveObject(), activeGroup = canvas.getActiveGroup();
		if (activeObject) {
			canvas.remove(activeObject);

			$("#text-string").val("");

		} else if (activeGroup) {
			var objectsInGroup = activeGroup.getObjects();
			canvas.discardActiveGroup();
			objectsInGroup.forEach(function(object) {
				canvas.remove(object);

			});
		}
	});
	$('#bring-to-front').click(function() {
		var activeObject = canvas.getActiveObject(), activeGroup = canvas.getActiveGroup();
		if (activeObject) {
			activeObject.bringToFront();
		} else if (activeGroup) {
			var objectsInGroup = activeGroup.getObjects();
			canvas.discardActiveGroup();
			objectsInGroup.forEach(function(object) {
				object.bringToFront();
			});
		}
	});
	$('#send-to-back').click(function() {
		var activeObject = canvas.getActiveObject(), activeGroup = canvas.getActiveGroup();
		if (activeObject) {
			activeObject.sendToBack();
		} else if (activeGroup) {
			var objectsInGroup = activeGroup.getObjects();
			canvas.discardActiveGroup();
			objectsInGroup.forEach(function(object) {
				object.sendToBack();
			});
		}
	});

	$('#line-height').click(function() {
		var thislineheight = Math.abs(parseInt($(this).prev('input').val())) ? Math.abs(parseInt($(this).prev('input').val())) : '2';
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {

			activeObject.lineHeight = thislineheight / 10;
			activeObject.setCoords();
			canvas.calcOffset().renderAll();
		}
	});
	$("#text-bold").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			$(this).toggleClass('active');
			activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');
			canvas.calcOffset().renderAll();
		}
	});
	$("#text-italic").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			$(this).toggleClass('active');
			activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');
			canvas.calcOffset().renderAll();
		}
	});
	$("#text-strike").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			$(this).toggleClass('active');
			activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
			canvas.calcOffset().renderAll();
		}
	});

	$("#text-underline").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			$(this).toggleClass('active');
			activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
			canvas.calcOffset().renderAll();
		}
	});
	$("#text-align-left").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			$(this).toggleClass('active');
			activeObject.textAlign = 'left';
			canvas.calcOffset().renderAll();
		}
	});
	$("#text-align-center").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			$(this).toggleClass('active');
			activeObject.textAlign = 'center';
			canvas.calcOffset().renderAll();
		}
	});

	$("#text-align-right").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			$(this).toggleClass('active');
			activeObject.textAlign = 'right';
			canvas.calcOffset().renderAll();
		}
	});
	$("#font-family").change(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {

			activeObject.fontFamily = $(this).val().replace(/\+/g, ' ') ? $(this).val().replace(/\+/g, ' ') : 'Arial';
			canvas.calcOffset();
			canvas.renderAll();
		}
	});

	$('#upload-input').on('change', function(e) {
		handleFiles(e);
	});
	$('#backgrounds a').on('click', function(e) {
		e.preventDefault();
		$('#backgrounds a').removeClass('selected');
		$(this).toggleClass('selected');
		var front = $(this).data('front');
		var back = $(this).data('back');
		var id = $(this).data('id');
		var width = $('.flipper > img').css('width');
		var height = $('.flipper > img').css('height');
		var innerHtml = '<img style="height:' + height + '!important;width:' + width + '!important;" src="' + front + '"/><img style="height:' + height + '!important;width:' + width + '!important;" src="' + back + '"/>';
		var spanHtml = '<img src="' + front + '"/>';
		$('#backgrounds').css('background-color', $(this).css('background-color'));
		$('#tshirtFacing').data('front', front);
		$('#tshirtFacing').data('back', back);
		$('#backgrounds > span').html(spanHtml);
		$('.flipper').html(innerHtml);

	});

	/*drag stuff*/
	var links = document.querySelectorAll(".photo img"), el = null;

	for (var i = 0; i < links.length; i++) {
		el = links[i];
		el.setAttribute("draggable", "true");
		addEvent(el, "dragstart", function(e) {
			e.dataTransfer.effectAllowed = "copy";

			e.dataTransfer.setData("Text", this.src);
		});
	}
	var bin = document.querySelector(".canvas-container");

	addEvent(bin, "dragover", function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		this.className = "over";
		e.dataTransfer.dropEffect = "copy";
		return false;
	});
	addEvent(bin, "dragenter", function(e) {
		this.className = "";
		return false;
	});
	addEvent(bin, "dragleave", function() {
		this.className = "";
	});
	addEvent(bin, "drop", function(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		this.className = "";
		e.stopPropagation();
		e.preventDefault();
		if (e.dataTransfer.files[0]) {

			handleFiles(e.dataTransfer.files[0], true);
		} else {
			var el = e.dataTransfer.getData("Text");

			dropthat(el, e.clientX - 140, e.clientY - 140);
		}

		return false;
	});
	/*drag stuff end*/

	$('#flip').on('click', function() {
		$(this).toggleClass('hover');
		flip(productFront, productBack, canvas, false);
	});

});

// Start functions

function clearOther() {
	var drawingModeEl = $('.freedraw');
	drawline = false;
	$('.line-draw').hide();
	$('.line').removeClass('active');
	if (canvas.isDrawingMode) {
		drawingModeEl.removeClass('active');

		canvas.isDrawingMode = false;
	}
}

function flip(productFront, productBack, canvas, savemode) {
	var savemode = ( typeof savemode === "undefined") ? "false" : savemode;

	if (hasback == 1) {
		if ($('#flip').attr("data-original") == "back") {

			$('#flip').attr('data-original', 'front');
			a = JSON.stringify(canvas);

			if (savemode == false) {
				$('#tshirtFacing').addClass('flip');
			}
			canvas.clear();
			canvas.renderAll();

			try {
				var json = JSON.parse(b);
				canvas.loadFromJSON(b);
				canvas.renderAll();
			} catch (e) {

			}

			canvas.renderAll();
			setTimeout(function() {
				canvas.calcOffset();
				canvas.renderAll();
			}, 200);

		} else {

			if (savemode == false) {
				$('#tshirtFacing').removeClass('flip');
			}
			$('#flip').attr('data-original', 'back');

			b = JSON.stringify(canvas);

			canvas.clear();
			canvas.renderAll();
			try {
				var json = JSON.parse(a);
				canvas.loadFromJSON(a);
				canvas.renderAll();
			} catch (e) {

			}

			canvas.renderAll();
			setTimeout(function() {
				canvas.calcOffset();
				canvas.renderAll();
			}, 200);

		}
	} else {

		$('#flip').attr('data-original', 'front');
		a = JSON.stringify(canvas);
		if (savemode == false) {
			$('#tshirtFacing').addClass('flip');
		}
		canvas.clear();
		canvas.renderAll();

		try {
			var json = JSON.parse(b);
			canvas.loadFromJSON(b);
			canvas.renderAll();
		} catch (e) {

		}

		canvas.renderAll();
		setTimeout(function() {
			canvas.calcOffset();
			canvas.renderAll();
		}, 200);
	}
}

function initCustomization() {
	fabric.Object.prototype.transparentCorners = false;
	fabric.Object.prototype.opacity = 1;
	fabric.Object.prototype.cornerColor = fa_settings.setting_corner_color_;
	fabric.Object.prototype.borderColor = fa_settings.setting_border_color_;

	fabric.Object.prototype.hasRotatingPoint = false;
	fabric.Object.prototype.cornerSize = fa_settings.setting_corner_width_;

	if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
		fabric.Object.prototype.cornerSize = fa_settings.setting_corner_width_ + 30;
	}

}

function hideProgressBar() {
	$('#tshirtFacing .progress-bar').removeClass('active');
}

function showProgressBar() {
	$('#tshirtFacing .progress-bar').addClass('active');
}

function addLibrary(url, id) {
	var uploadWrap = $('.photo.uploaded .photo-list');
	uploadWrap.parent().find('em').remove();
	uploadWrap.append('<li><img data-full="' + url + '" data-id="' + id + '" src="' + url + '" /></li>');
}

function handleFiles(e, isDragged) {
	if (isDragged == true) {
		var fileName = e.name;
		var reader = new FileReader;
		showProgressBar();
		reader.onload = function(event) {

			var img = new Image;
			img.src = event.target.result;

			img.onload = function() {

				var srcFull = img.src;
				var srcName = srcFull.replace(/^.*[\\\/]/, '');
				var postid = $('#').data('Id');

				jQuery.ajax({
					type : 'POST',
					dataType : "json",
					async : true,
					url : fa_settings.site_url_ + '/wp-admin/admin-ajax.php',
					data : {
						base : this.src,
						filename : fileName,
						id : postid,
						action : 'up_app_product'
					},
					success : function(data, textStatus, XMLHttpRequest) {
						if (data.success == true) {
							addLibrary(data.url, data.id);
							addImage(data.url);
						}

					},
					error : function(MLHttpRequest, textStatus, errorThrown) {

					},
					complete : function() {
						hideProgressBar();
					}
				});

			};
		};

		reader.readAsDataURL(e);

	} else {
		var files = e.target.files;
		for (var i = 0, file; file = files[i]; i++) {
			var fileName = file.name;
			var reader = new FileReader;
			showProgressBar();
			reader.onload = function(event) {

				var img = new Image;
				img.src = event.target.result;

				img.onload = function() {

					var srcFull = img.src;
					var srcName = srcFull.replace(/^.*[\\\/]/, '');
					var postid = $('#').data('Id');

					jQuery.ajax({
						type : 'POST',
						dataType : "json",
						async : true,
						url : fa_settings.site_url_ + '/wp-admin/admin-ajax.php',
						data : {
							base : this.src,
							filename : fileName,
							id : postid,
							action : 'up_app_product'
						},
						success : function(data, textStatus, XMLHttpRequest) {
							if (data.success == true) {
								addLibrary(data.url, data.id);
								addImage(data.url);
							}

						},
						error : function(MLHttpRequest, textStatus, errorThrown) {

						},
						complete : function() {
							hideProgressBar();
						}
					});

				};
			};
			reader.readAsDataURL(e.target.files[i]);
		}
	}
}

var getObjectById = function(id) {
	var objsInCanvas = canvas.getObjects();
	for (obj in objsInCanvas) {
		if (objsInCanvas[obj].get('id') == id) {
			return objsInCanvas[obj];
		}
	}
};
var addEvent = function() {
	if (document.addEventListener) {
		return function(el, type, fn) {
			if (el && el.nodeName || el === window) {
				el.addEventListener(type, fn, false);
			} else {
				if (el && el.length) {
					for (var i = 0; i < el.length; i++) {
						addEvent(el[i], type, fn);
					}
				}
			}
		};
	} else {
		return function(el, type, fn) {
			if (el && el.nodeName || el === window) {
				el.attachEvent("on" + type, function() {
					return fn.call(el, window.event);
				});
			} else {
				if (el && el.length) {
					for (var i = 0; i < el.length; i++) {
						addEvent(el[i], type, fn);
					}
				}
			}
		};
	}
}();
function moveLine(o) {
	if (drawline == true) {
		if (!isDown)
			return;
		var pointer = canvas.getPointer(o.e);
		line.set({
			x2 : pointer.x,
			y2 : pointer.y
		});
		line.setCoords();
		canvas.calcOffset().renderAll();
	}
}

function startLine(o) {
	if (drawline == true) {
		canvas.selection = false;
		isDown = true;
		var pointer = canvas.getPointer(o.e);
		var points = [pointer.x, pointer.y, pointer.x, pointer.y];
		line = new fabric.Line(points,{
			strokeWidth : $('#drawing-line-width').slider("option", "value"),
			fill : $('#main-color').minicolors('value'),
			stroke : $('#main-color').minicolors('value'),
			originX : 'center',
			originY : 'center'
		});
		canvas.add(line);
		line.setCoords();
		canvas.calcOffset().renderAll();
	}
};

function getRandomNum(min, max) {
	return Math.random() * (max - min) + min;
}

function onMouseUp() {

	if (lineW || lineH) {
		canvas.remove(lineW);
		canvas.remove(lineH);
	}
	lineAdded = false;
	isDown = false;
	canvas.selection = true;
	canvas.renderAll();
}

function onObjectMoving(e) {

	if (lineAdded == false) {
		var middleW = canvas.width / 2;
		var middleH = canvas.height / 2;

		lineW = new fabric.Line([middleW, 0, middleW, canvas.height], {
			stroke : 'magenta',
			strokeWidth : 1,
			selectable : false
		});
		lineH = new fabric.Line([0, middleH, canvas.width, middleH], {
			stroke : 'magenta',
			strokeWidth : 1,
			selectable : false
		});
		canvas.add(lineW);

		canvas.add(lineH);
		canvas.calcOffset();
		canvas.renderAll();
		lineAdded = true;
	}
}

function onSelectedCleared(e) {
	$("#text-tool a").removeClass('active');
	$('#border-line-width').slider('value', 0);
}

function onObjectSelected(e) {
	var selectedObject = e.target;
	selectedObject.hasRotatingPoint = true;

	if (selectedObject && selectedObject.type === 'text') {
		$("#line-height").prev().val(selectedObject.lineHeight * 10);
		$("#text-string").val(selectedObject.getText());

		if (selectedObject.fontWeight == 'bold') {
			$("#text-bold").addClass('active');
		}
		if (selectedObject.fontStyle == 'italic') {
			$("#text-italic").addClass('active');
		}
		if (selectedObject.textDecoration == 'line-through') {
			$("#text-strike").addClass('active');
		}
		if (selectedObject.textDecoration == 'underline') {
			$("#text-underline").addClass('active');
		}

		if (selectedObject.textAlign == 'left') {
			$("#text-align-left").addClass('active');
		} else if (selectedObject.textAlign == 'center') {
			$("#text-align-center").addClass('active');
		} else if (selectedObject.textAlign == 'right') {
			$("#text-align-right").addClass('active');
		}

		if (selectedObject.originalState.fill) {

			$('#main-color').minicolors('value', selectedObject.originalState.fill);
		}
		if (selectedObject.stroke) {
			$('#stroke-color').minicolors('value', selectedObject.stroke);
			$('#border-line-width').slider('value', selectedObject.strokeWidth);
		}

	} else if (selectedObject ) {
		if (selectedObject.fill && selectedObject.fill != 'rgb(0,0,0)') {
			$('#main-color').minicolors('value', selectedObject.fill);
		} else {
			$('#main-color').minicolors('value', "#333333");
		}
		if (selectedObject.stroke!='' && selectedObject.fill != 'rgb(0,0,0)') {
			$('#stroke-color').minicolors('value', selectedObject.stroke);
			$('#border-line-width').slider('value', selectedObject.strokeWidth);

		} else {
			$('#stroke-color').minicolors('value', "#333333");
		}
	}
}

function defaultArray(top, left, width, height) {

	if (width || height) {
		return {
			left : left,
			top : top,
			width : width,
			height : height
		};
	} else {

		return {
			left : left,
			top : top
		};
	}
}

function setFont(font) {
	var activeObject = canvas.getActiveObject();
	if (activeObject && activeObject.type === 'text') {
		activeObject.fontFamily = font;
		activeObject.setCoords();
		canvas.calcOffset().renderAll();
	}
}

function dropthat(e, x, y) {

	var left = x;
	var top = y;

	fabric.Image.fromURL(e, function(image) {
		image.set(defaultArray(top, left));
		image.setCoords();
		canvas.add(image);
	});
}

function getCurrentColor() {
	if ($('#main-color').minicolors()) {
		return $('#main-color').val();
	} else {
		return '#333333';
	}
}

function addSvg(e) {
	var group = [];
	try {
		fabric.loadSVGFromURL(e, function(objects, options) {

			var loadedObject = fabric.util.groupSVGElements(objects, options);

			var loadedObjects = new fabric.Group(group);

			loadedObject.set(defaultArray(100, 100));

			canvas.add(loadedObject);

			canvas.renderAll();

		});
	} catch(ctx) {

	}
}

function addImage(e) {

	var canvasWidth = canvas.getWidth() / 2;
	var canvasHeight = canvas.getHeight();

	try {
		fabric.Image.fromURL(e, function(image) {
			imageWidth = image.getWidth();
			imageHeight = image.getHeight();

			image.set({
				top : 0,
				left : 0,
				scaleX : canvasWidth / imageWidth,
				scaleY : canvasWidth / imageWidth
			});

			canvas.add(image);
			image.center().setCoords();
			canvas.renderAll();
		});
	} catch(ctx) {

	}

}

function sendAjax(color, type, imgf, imgb, front, back) {

	//var refresh_the_product = (fa_settings.edit == 1) ? 'create_the_product' : 'create_the_product';
	$.ajax({
		type : 'POST',
		dataType : "json",
		url : fa_settings.site_url_ + '/wp-admin/admin-ajax.php',
		data : {
			//color : color,
			type : $('#tshirtFacing').data('id'),
			front_base : $('#tshirtFacing').data('front'),
			back_base : $('#tshirtFacing').data('back'),
			image_f : imgf,
			image_b : imgb,
			action : 'create_the_product',
			jsonstufff : front,
			jsonstuffb : back
		},
		beforeSend : function(x) {
			if (x && x.overrideMimeType) {
				x.overrideMimeType("application/json;charset=UTF-8");
			}
		},
		success : function(data, textStatus, XMLHttpRequest) {
			if (data.success == true) {
				window.location = data.message;

			} else {

			}
		},
		error : function(MLHttpRequest, textStatus, errorThrown) {

		}
	});
}

function ajax_load(id) {

	$.ajax({
		type : 'POST',
		dataType : "json",
		url : fa_settings.site_url_ + '/wp-admin/admin-ajax.php',
		data : {

			id : id,
			action : 'custom_data_product'

		},
		beforeSend : function(x) {
			if (x && x.overrideMimeType) {
				x.overrideMimeType("application/json;charset=UTF-8");
			}
		},
		success : function(data, textStatus, XMLHttpRequest) {
			if (data.success == true) {
				canvas.loadFromJSON(data.json_a, function() {
					canvas.calcOffset().renderAll();
				});
				a = data.json_a ? data.json_a : '';
				b = data.json_b ? data.json_b : '';
			}
		},
		error : function(MLHttpRequest, textStatus, errorThrown) {

		}
	});

}

function dblClickHandler() {
	var activeObject = canvas.getActiveObject(), activeGroup = canvas.getActiveGroup();
	if (activeObject) {
		activeObject.sendToBack();
	} else {
		if (activeGroup) {
			var objectsInGroup = activeGroup.getObjects();
			canvas.discardActiveGroup();
			objectsInGroup.forEach(function(object) {
				object.sendToBack();
			});
		}
	}
}

function cache() {
	canvas.forEachObject(function(obj, i) {
		if (obj.type === 'image')
			return;

		var scaleX = obj.scaleX;
		var scaleY = obj.scaleY;

		canvas.remove(obj);
		obj.scale(1).cloneAsImage(function(clone) {
			clone.set({
				left : obj.left,
				top : obj.top,
				scaleX : scaleX,
				scaleY : scaleY
			});
			canvas.insertAt(clone, i);

		});
	});
}

