
/*
 * jQuery.fontselect - A font selector for the Google Web Fonts api
 * Tom Moor, http://tommoor.com
 * Copyright (c) 2011 Tom Moor
 * MIT Licensed
 * @version 0.1
 */

(function($) {

	$.fn.fontselect = function(options) {

		var __bind = function(fn, me) {
			return function() {
				return fn.apply(me, arguments);
			};
		};

		var fonts = ["Aclonica", "Allan", "Annie+Use+Your+Telescope", "Anonymous+Pro", "Allerta", "Amaranth", "Anton", "Architects+Daughter", "Artifika", "Asset", "Astloch", "Bangers", "Bentham", "Bevan", "Bigshot+One", "Bowlby+One", "Bowlby+One+SC", "Brawler", "Cabin", "Calligraffitti", "Candal", "Cantarell", "Cardo", "Carter One", "Caudex", "Cedarville+Cursive", "Cherry+Cream+Soda", "Chewy", "Coda", "Coming+Soon", "Copse", "Corben:700", "Cousine", "Covered+By+Your+Grace", "Crafty+Girls", "Crimson+Text", "Crushed", "Cuprum", "Damion", "Dancing+Script", "Dawning+of+a+New+Day", "Didact+Gothic", "EB+Garamond", "Expletus+Sans", "Fontdiner+Swanky", "Forum", "Francois+One", "Geo", "Give+You+Glory", "Goblin+One", "Goudy+Bookletter+1911", "Gravitas+One", "Gruppo", "Hammersmith+One", "Holtwood+One+SC", "Homemade+Apple", "Inconsolata", "Indie+Flower", "Irish+Grover", "Judson", "Jura", "Just+Another+Hand", "Just+Me+Again+Down+Here", "Kameron", "Kenia", "Kranky", "Kreon", "Kristi", "La+Belle+Aurore", "League+Script", "Lekton", "Limelight", "Lobster", "Lobster Two", "Lora", "Love+Ya+Like+A+Sister", "Loved+by+the+King", "Luckiest+Guy", "Maiden+Orange", "Mako", "Maven+Pro", "Meddon", "MedievalSharp", "Megrim", "Merriweather", "Metrophobic", "Michroma", "Miltonian Tattoo", "Miltonian", "Modern Antiqua", "Monofett", "Mountains of Christmas", "Neucha", "Neuton", "Nixie+One", "Nobile", "Nova+Square", "Nunito", "Open+Sans", "Orbitron", "Oswald", "Over+the+Rainbow", "Reenie+Beanie", "Pacifico", "Patrick+Hand", "Paytone+One", "Permanent+Marker", "Philosopher", "Playfair+Display", "Puritan", "Quattrocento", "Radley", "Raleway:100", "Redressed", "Rock+Salt", "Rokkitt", "Ruslan+Display", "Schoolbell", "Shadows+Into+Light", "Shanti", "Sigmar+One", "Six+Caps", "Slackey", "Smythe", "Sniglet:800", "Special+Elite", "Stardos+Stencil", "Sue+Ellen+Francisco", "Sunshiney", "Swanky+and+Moo+Moo", "Syncopate", "Tangerine", "Tenor+Sans", "Terminal+Dosis+Light", "The+Girl+Next+Door", "Tinos", "Ultra", "Unkempt", "UnifrakturCook:bold", "UnifrakturMaguntia", "Varela", "Varela Round", "Vibur", "Waiting+for+the+Sunrise", "Wallpoet", "Walter+Turncoat", "Wire+One", "Yanone+Kaffeesatz", "Yeseva+One", "Zeyada"];

		var settings = {
			style : 'font-select btn',
			placeholder : '<i class="icon-font"></i>Select a font',
			lookahead : 2,
			api : 'http://fonts.googleapis.com/css?family='
		};

		var Fontselect = (function() {

			function Fontselect(original, o) {
				this.$original = $(original);
				this.options = o;
				this.active = false;
				this.setupHtml();
				this.getVisibleFonts();
				this.bindEvents();

				var font = this.$original.val();
				if (font) {
					this.updateSelected();
					this.addFontLink(font);
				}
			}


			Fontselect.prototype.bindEvents = function() {

				$('li', this.$results).click(__bind(this.selectFont, this)).mouseenter(__bind(this.activateFont, this)).mouseleave(__bind(this.deactivateFont, this));

				$('span', this.$select).click(__bind(this.toggleDrop, this));
				this.$arrow.click(__bind(this.toggleDrop, this));
			};

			Fontselect.prototype.toggleDrop = function(ev) {

				if (this.active) {
					this.$element.removeClass('font-select-active');
					this.$drop.hide();
					clearInterval(this.visibleInterval);

				} else {
					this.$element.addClass('font-select-active');
					this.$drop.show();
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

				this.$results.scrollTop($li.addClass('active').position().top);
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

				this.$original.empty().hide();
				this.$element = $('<div>', {
					'class' : this.options.style
				});
				this.$arrow = $('<div><b></b></div>');
				this.$select = $('<a><span>' + this.options.placeholder + '</span></a>');
				this.$drop = $('<div>', {
					'class' : 'fs-drop dropdown-menu'
				});
				this.$results = $('<ul>', {
					'class' : 'fs-results'
				});
				this.$original.after(this.$element.append(this.$select.append(this.$arrow)).append(this.$drop));
				this.$drop.append(this.$results.append(this.fontsAsHtml())).hide();
			};

			Fontselect.prototype.fontsAsHtml = function() {

				var l = fonts.length;
				var r, s, h = '';

				for (var i = 0; i < l; i++) {
					r = this.toReadable(fonts[i]);
					s = this.toStyle(fonts[i]);
					h += '<li data-value="' + fonts[i] + '" style="font-family: ' + s['font-family'] + ';">' + r + '</li>';
				}

				return h;
			};

			Fontselect.prototype.toReadable = function(font) {
				return font.replace(/[\+|:]/g, ' ');
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

/* HTML5 Sortable (http://farhadi.ir/projects/html5sortable)
 * Released under the MIT license.
 */

var canvas;
var tshirts = new Array();
//prototype: [{style:'x',color:'white',front:'a',back:'b',price:{tshirt:'12.95',frontPrint:'4.99',backPrint:'4.99',total:'22.47'}}]
var a;
var b;
var $color;
var imgf;
var imgb;var front;
var back;
$(document).ready(function() {

	$('#drawingArea').popover({
		content : 'Drag & Drop favorite images',
		placement : 'bottom',
		trigger : 'hover'
	});

	var productFront = $('#tshirtFacing').data('front');
	var productBack = $('#tshirtFacing').data('back');

	jQuery("#orderitajax").click(function(e) {
		cache();
		$('#flip').click();
		e.preventDefault();

		current = JSON.stringify(canvas);
		obj = JSON.parse(current);

		if (!a && !b && obj.objects == '') {
			$(this).popover({
				title : 'Alert',
				content : 'Tshirt has no design',
				placement : 'top',
				trigger : 'hover'
			});
			$(this).popover('show');

		} else {
		//	$(this).attr("id", "proccesing").html('Please Wait');
		
		$('#wait').modal('show');
			$(this).popover('destroy');

			if (a && b) {
		
						
			
				canvas.deactivateAll().renderAll();
				
				front = JSON.stringify(a);
				back= JSON.stringify(b);
				$color = canvas.backgroundColor;
				
	    	canvas.loadFromJSON(a,function(){
	    	
			
				$('#shirtDiv').data('holdera',canvas.toDataURL('jpg')); 
				
				
					canvas.loadFromJSON(b,function(){
						canvas.deactivateAll().renderAll();
			
			 	$('#shirtDiv').data('holderb',canvas.toDataURL('jpg'));
			 	setTimeout(sendAjax($color, type = '',$('#shirtDiv').data('holdera'), $('#shirtDiv').data('holderb'), front, back),200);
				
	    		});  
	    	}); 
				


			} else {
				$color = canvas.backgroundColor;
			
			
				if(a){
					
					front = JSON.stringify(a);
					back= '';
			
						canvas.loadFromJSON(a,function(){
								canvas.deactivateAll().renderAll();
								$('#shirtDiv').data('holder',canvas.toDataURL('jpg'));
					 	  		sendAjax($color, type = '',$('#shirtDiv').data('holder'), '', front, back);
						});  
				
				}else if(b){
					
				back = JSON.stringify(b);
				front= '';
				canvas.loadFromJSON(b,function(){
						canvas.deactivateAll().renderAll();
			 			$('#shirtDiv').data('holder',canvas.toDataURL('jpg'));
			 			sendAjax($color, type = '','', $('#shirtDiv').data('holder'), front, back);
				});
				

		
			}

		}
		}
	});
	$('#font-family').fontselect().change(function() {
		var font = $(this).val().replace(/\+/g, ' ');
		setFont(font);
	});
	$("#layers ul").sortable({
		stop : function(event, ui) {

			var items = $('#layers ul li:not(.ui-sortable-placeholder)');
			for (var i = items.length - 1; i >= 0; i--) {
				var obj = getObjectById(items[i].id);
				canvas.bringToFront(obj);
			}
		}
	});
	$("#layers ul").disableSelection();

	canvas = new fabric.Canvas('tcanvas');

	canvas.on({
		'object:selected' : onObjectSelected,
		'selection:cleared' : onSelectedCleared,
		'object:added' : onObjectAdded
	});
	// piggyback on `canvas.findTarget`, to fire "object:over" and "object:out" events
	/*canvas.findTarget = (function(originalFn) {
		return function() {
			var target = originalFn.apply(this, arguments);
			if (target) {
				if (this._hoveredTarget !== target) {
					canvas.fire('object:over', {
						target : target
					});
					if (this._hoveredTarget) {
						canvas.fire('object:out', {
							target : this._hoveredTarget
						});
					}
					this._hoveredTarget = target;
				}
			} else if (this._hoveredTarget) {
				canvas.fire('object:out', {
					target : this._hoveredTarget
				});
				this._hoveredTarget = null;
			}
			return target;
		};
	})(canvas.findTarget);*/

	/*$('.btn').on('click', function() {
	if (!$(this).hasClass('toggle')) {
	if ($(this).hasClass('active')) {
	$(this).removeClass('active');
	} else {
	$(this).addClass('active');
	}
	}
	})*/

	//canvas.setBackgroundImage('img/crew_front.png', canvas.renderAll.bind(canvas));
	/*
	 * Drawing mode

	 var drawingModeEl = $('.freedraw');
	 canvas.freeDrawingCursor = 'url("img/icon-pencil.png") 0 30,crosshair';

	 $('#drawing-line-width').on('change', function() {

	 });
	 $('.btn.rect').on('click', function() {
	 canvas.isDrawingMode = false;
	 //!canvas.isDrawingMode;
	 canvas.add(new fabric.Rect(defaultArray(fabric.util.getRandomInt(0, 400), fabric.util.getRandomInt(0, 200), 50, 50)));
	 canvas.renderAll();
	 });
	 $('.btn.circle').on('click', function() {
	 canvas.isDrawingMode = false;
	 //!canvas.isDrawingMode;
	 canvas.add(new fabric.Circle(defaultArray(fabric.util.getRandomInt(0, 400), fabric.util.getRandomInt(0, 200), 50, 50)));
	 canvas.renderAll();
	 });

	 drawingModeEl.on('click', function() {
	 canvas.isDrawingMode = !canvas.isDrawingMode;

	 canvas.freeDrawingBrush.color = getCurrentColor();

	 canvas.freeDrawingBrush.width = parseInt($('#drawing-line-width').val());

	 if (canvas.isDrawingMode) {

	 drawingOptionsEl.style.display = '';
	 //     canvas.freeDrawingBrush = new fabric[$(this).attr('class').split(' ')[0] + 'Brush'](canvas);
	 } else {
	 drawingOptionsEl.style.display = 'none';
	 }
	 });
	 */
	$('#add-text').on('click', function() {
		var text = $("#text-string").val();
		var textSample = new fabric.Text(text, {
			left : fabric.util.getRandomInt(0, 200),
			top : fabric.util.getRandomInt(0, 400),
			fontFamily : $('#font-family').val().replace(/\+/g, ' ') ? $('#font-family').val().replace(/\+/g, ' ') : 'helvetica',
			angle : 0,
			fill : getCurrentColor(),
			scaleX : 0.5,
			scaleY : 0.5,
			fontWeight : '',
			cornerSize : 9,
			cornerColor : '#034f82',
			transparentCorners : false,
			hasRotatingPoint : true
		});
		canvas.add(textSample);
		canvas.item(canvas.item.length - 1).hasRotatingPoint = true;
		canvas.renderAll();
	});
	$("#text-string").keyup(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.text = this.value;
			canvas.renderAll();
		}
	});
	$('dt.gallery-icon a').click(function(e) {
		e.preventDefault();
	});

	addProduct(productFront, canvas);

	$(".attachment-thumbnail").click(function(e) {

		/*
		 var el = e.target;
		 $('.gn-scroller').jScrollPane({
		 autoReinitialise: true
		 });
		 var offset = 50;
		 var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
		 var top = fabric.util.getRandomInt(0 + offset, 400 - offset);
		 var angle = fabric.util.getRandomInt(-20, 40);
		 var width = fabric.util.getRandomInt(30, 50);
		 var opacity = (function(min, max) {
		 return Math.random() * (max - min) + min;
		 })(0.5, 1);

		 fabric.Image.fromURL(el.src, function(image) {
		 image.set({
		 left : left,
		 top : top,
		 angle : 0,
		 padding : 0,
		 cornerSize : 9,
		 cornerColor: 'blue',
		 transparentCorners: false,
		 hasRotatingPoint : true
		 });
		 //image.scale(getRandomNum(0.1, 0.25)).setCoords();

		 canvas.add(image);
		 })
		 addImage(e,fabric.util.getRandomInt(0 + offset, 200 - offset),fabric.util.getRandomInt(0 + offset, 200 - offset));;*/
		addImage(e);
	});
	document.getElementById('remove-selected').onclick = function() {
		var activeObject = canvas.getActiveObject(), activeGroup = canvas.getActiveGroup();
		if (activeObject) {
			canvas.remove(activeObject);
			$('#layers ul').find('li#' + activeObject.id).remove();
			$("#text-string").val("");

		} else if (activeGroup) {
			var objectsInGroup = activeGroup.getObjects();
			canvas.discardActiveGroup();
			objectsInGroup.forEach(function(object) {
				canvas.remove(object);
				$('#layers ul').find('li#' + object.id).remove();
			});
		}
	};
	document.getElementById('bring-to-front').onclick = function() {
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
	};
	document.getElementById('send-to-back').onclick = function() {
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
	};
	$("#text-bold").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');
			canvas.renderAll();
		}
	});
	$("#text-italic").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');
			canvas.renderAll();
		}
	});
	$("#text-strike").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
			canvas.renderAll();
		}
	});

	$("#text-underline").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
			canvas.renderAll();
		}
	});
	$("#text-align-left").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textAlign = 'left';
			canvas.renderAll();
		}
	});
	$("#text-align-center").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textAlign = 'center';
			canvas.renderAll();
		}
	});

	$("#text-align-right").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textAlign = 'right';
			canvas.renderAll();
		}
	});
	$("#font-family").change(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.fontFamily = this.value;
			canvas.renderAll();
		}
	});
	$('#remove-white').on('click', function() {
		removeWhite();
	});
	$('#text-bgcolor').minicolors({
		swatchPosition : 'right',
		change : function(hex, rgb) {
			var activeObject = canvas.getActiveObject();
			if (activeObject && activeObject.type === 'text') {
				activeObject.backgroundColor = this.value;
				canvas.renderAll();
			}
		},
		open : function(hex, rgb) {
			//
		},
		close : function(hex, rgb) {
			//
		}
	});

	$('#text-fontcolor').minicolors({
		swatchPosition : 'left',
		change : function(hex, rgb) {
			var activeObject = canvas.getActiveObject();
			if (activeObject /* && activeObject.type === 'text'*/) {
				activeObject.fill = this.value;
				canvas.renderAll();
			}

		},
		open : function(hex, rgb) {
			//
		},
		close : function(hex, rgb) {
			//
		}
	});

	$('#text-strokecolor').minicolors({
		swatchPosition : 'left',
		change : function(hex, rgb) {
			var activeObject = canvas.getActiveObject();
			if (activeObject && activeObject.type === 'text') {
				activeObject.strokeStyle = this.value;
				canvas.renderAll();
			} else {
				var color = this.value;
				canvas.backgroundColor = color;
				canvas.renderAll();
			}

		},
		open : function(hex, rgb) {
			//
		},
		close : function(hex, rgb) {
			//
		}
	});

	$('.color-preview').click(function() {
		var color = $(this).css("background-color");
		document.getElementById("shirtDiv").style.backgroundColor = color;
	});

	/*drag stuff*/
	var links = document.querySelectorAll(".img-polaroid"), el = null;

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
			handleFiles(e.dataTransfer.files[0]);
		} else {
			var el = e.dataTransfer.getData("Text");

			dropthat(el, e.clientX - 140, e.clientY - 140);
		}

		return false;
	});
	/*drag stuff end*/

	$('#flip').on('click',function() {
		flip(productFront,productBack,canvas);
	});
});
//doc 

function flip(productFront,productBack,canvas){
	
		
		if ($('#flip').attr("data-original-title") == "Show Back View") {
			
				$('#flip').attr('data-original-title', 'Show Front View');
				addProduct(productBack, canvas);
				canvas.renderAll();
	
				a = JSON.stringify(canvas);
		
				$('#layers ul').html('');
				canvas.clear();
					try {
						var json = JSON.parse(b);
						canvas.loadFromJSON(b);
						canvas.renderAll();
					} catch(e) {}
				canvas.renderAll();
				setTimeout(function() {
					canvas.calcOffset();
					canvas.renderAll();
				}, 200);

		} else {
			
			$('#flip').attr('data-original-title', 'Show Back View');
		
			addProduct(productFront, canvas);
			b = JSON.stringify(canvas);
			$('#layers ul').html('');
			canvas.clear();
				try {
					var json = JSON.parse(a);
					canvas.loadFromJSON(a);
					canvas.renderAll();
				} catch(e) {}

			canvas.renderAll();
			setTimeout(function() {
				canvas.calcOffset();
				canvas.renderAll();
			}, 200);

		}
}

function handleFiles(e) {
	//var files = e.target.files;
	//for (var i = 0, file; file = files[i]; i++) {
	var reader = new FileReader;
	reader.onload = function(event) {
		var img = new Image;
		img.src = event.target.result;
		img.onload = function() {

			var offset = 50;
			var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
			var top = fabric.util.getRandomInt(0 + offset, 400 - offset);

			fabric.Image.fromURL(this.src, function(image) {
				image.set(defaultArray(top, left));
				image.scale(getRandomNum(0.2, 0.45)).setCoords();
				canvas.add(image);

			});
		};
	};

	reader.readAsDataURL(e);
	//}
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
function getRandomNum(min, max) {
	return Math.random() * (max - min) + min;
}

function onObjectSelected(e) {
	var selectedObject = e.target;
	$("#text-string").val("");

	$('#text-fontcolor').minicolors({
		value : e.target.fill
	});

	$('#layers ul').find('li.active').removeClass('active');
	$('#layers ul').find('#' + e.target.id).addClass('active');

	selectedObject.hasRotatingPoint = true;

	if (selectedObject && selectedObject.type === 'text') {
		$("#text-string").val(selectedObject.getText());
		$('#text-fontcolor').minicolors('value', selectedObject.fill);
		$('#text-strokecolor').minicolors('value', selectedObject.strokeStyle);

	} else if (selectedObject && selectedObject.type === 'image') {
		//display image editor

	}
}

function defaultArray(top, left, width, height) {

	if (width || height) {
		return {
			left : left,
			top : top,
			width : width,
			height : height,
			angle : 0,
			padding : 0,
			cornerSize : 9,
			cornerColor : 'greeb=n',
			transparentCorners : false,
			hasRotatingPoint : true
		};
	} else {

		return {
			left : left,
			top : top,
			angle : 0,
			padding : 0,
			cornerSize : 9,
			cornerColor : 'red',
			transparentCorners : false,
			hasRotatingPoint : true
		};
	}
}

function onObjectAdded(e) {
	
	var id = canvas.getObjects().length - 1;

	if (e.target.type == 'image') {
		icon = "icon-images-gallery";
	}
	if (e.target.type == 'text') {
		icon = "icon-font";
	}
	if (e.target.type == 'path') {
		icon = "icon-atari";
	}

	if (e.target.type == 'line') {

	} else {
		// layer

		e.target.set('id', id);
		if (id != 0) {
			canvas.renderAll();
			$("#layers ul").prepend('<li id="' + id + '" class="ui-state-default actived"><i class="' + icon + '"></i>' + e.target.type + " " + id + '</li>');
		}
	}

}


function onSelectedCleared(e) {

	$("#text-string").val("");
	/*	$('#text-fontcolor').minicolors({
	 value : getCurrentColor()
	 });*/
	$('#layers ul').find('li.active').removeClass('active');

}

function setFont(font) {
	var activeObject = canvas.getActiveObject();
	if (activeObject && activeObject.type === 'text') {
		activeObject.fontFamily = font;
		canvas.renderAll();
	}
}

function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function dropthat(e, x, y) {
	var offset = 50;
	var left = x;
	var top = y;

	fabric.Image.fromURL(e, function(image) {
		image.set(defaultArray(top, left));
		image.setCoords();
		canvas.add(image);
	});
}

function getCurrentColor() {
	if ($('#text-fontcolor').minicolors()) {
		return $('#text-fontcolor').minicolors();
	} else {
		return 'black';
	}
}

function addImage(e) {
	var el = e.target;

	var offset = 50;
	var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
	var top = fabric.util.getRandomInt(0 + offset, 400 - offset);

	fabric.Image.fromURL(el.src, function(image) {
		image.set(defaultArray(top, left));
		//image.scale(getRandomNum(0.1, 0.25)).setCoords();

		canvas.add(image);
	});

}

function addProduct(e, canvas) {
if(canvas.getObjects().length ==1){
	
}else{
	var left = 265;
	var top = 315;

	fabric.Image.fromURL(e, function(image) {
		image.set(defaultArray(top, left));
		image.set({
			'hasControls' : false,'selectable' :false,left:0,top:0,hasBorders:false,lockMovementX :true,lockMovementY:true 
		});
		canvas.add(image);
	});
}

}

function sendAjax(color, type, imgf, imgb, front, back) {

	$.ajax({
		type : 'POST',
		dataType : "json",
		url : 'http://localhost/snake/wp-admin/admin-ajax.php',
		data : {
			color : color,
			type : 'tshirt',
			image_f : imgf,
			image_b : imgb,
			//	thumb_f: thumbf,
			//	thumb_b:thumbb,
			action : 'update_the_product',
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
				//alert(data.message);
			} else {

			}
		},
		error : function(MLHttpRequest, textStatus, errorThrown) {

		}
	});

}
var setCanvasZoom = function(zoom) {
var objects = canvas.getObjects();
_.each(objects, function(object) {
var scaleX = object.scaleX,
scaleY = object.scaleY,
left = object.left,
top = object.top;
// preserve the original dimensions.
object.original_scaleX = !object.original_scaleX ? scaleX : object.original_scaleX;
object.original_scaleY = !object.original_scaleY ? scaleY : object.original_scaleY;
object.original_left = !object.original_left ? left : object.original_left;
object.original_top = !object.original_top ? top : object.original_top;
object.scaleX = object.original_scaleX * zoom;
object.scaleY = object.original_scaleY * zoom;
object.left = object.original_left * zoom;
object.top = object.original_top * zoom;
object.setCoords();
});
canvas
.setWidth(scope.fabricCanvas.width * Zoom.getDpi() * zoom)
.setHeight(scope.fabricCanvas.height * Zoom.getDpi() * zoom);
};
function cache() {
  canvas.forEachObject(function(obj, i) {
    if (obj.type === 'image') return;

    var scaleX = obj.scaleX;
    var scaleY = obj.scaleY;

    canvas.remove(obj);
    obj.scale(1).cloneAsImage(function(clone) {
      clone.set({
        left: obj.left,
        top: obj.top,
        scaleX: scaleX,
        scaleY: scaleY
      });
      canvas.insertAt(clone, i);
      animate(clone);
    });
  });
}

function removeWhite() {
	var activeObject = canvas.getActiveObject();
	if (activeObject && activeObject.type === 'image') {
		activeObject.filters[2] = new fabric.Image.filters.RemoveWhite({
			hreshold : 100,
			distance : 50
		});
		//0-255, 0-255
		activeObject.applyFilters(canvas.renderAll.bind(canvas));
	}
}