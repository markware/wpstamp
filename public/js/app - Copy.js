/*! simplestatemanager | license: MIT | version: 3.0.0 | build date: 2015-09-10 */
!function(a,b,c,d){"function"==typeof define&&define.amd?define(function(){return d(a,b,c)}):"object"==typeof exports?module.exports=d:a.ssm=d(a,b,c)}(window,document,void 0,function(a){"use strict";function b(a){this.message=a,this.name="Error"}function c(a){this.id=a.id||g(),this.query=a.query||"",delete a.id,delete a.query;var b={onEnter:[],onLeave:[],onResize:[],onFirstRun:[]};return this.options=f(b,a),"function"==typeof this.options.onEnter&&(this.options.onEnter=[this.options.onEnter]),"function"==typeof this.options.onLeave&&(this.options.onLeave=[this.options.onLeave]),"function"==typeof this.options.onResize&&(this.options.onResize=[this.options.onResize]),"function"==typeof this.options.onFirstRun&&(this.options.onFirstRun=[this.options.onFirstRun]),this.testConfigOptions("once")===!1?(this.valid=!1,!1):(this.valid=!0,this.active=!1,void this.init())}function d(){this.states=[],this.resizeTimer=null,this.configOptions=[],a.addEventListener("resize",i(this.resizeBrowser.bind(this),j),!0)}function e(a,b,c){for(var d=a.length,e=[],f=0;d>f;f++){var g=a[f];g[b]&&g[b]===c&&e.push(g)}return e}function f(a,b){var c={};for(var d in a)c[d]=a[d];for(var e in b)c[e]=b[e];return c}function g(){for(var a="",b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=0;10>c;c++)a+=b.charAt(Math.floor(Math.random()*b.length));return a}function h(a){for(var b=a.length,c=0;b>c;c++)a[c]()}function i(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}var j=25,k=function(){};return c.prototype={init:function(){this.test=a.matchMedia(this.query),this.test.matches&&this.testConfigOptions("match")&&this.enterState(),this.listener=this.test.addListener(function(a){var b=!1;a.matches?this.testConfigOptions("match")&&(this.enterState(),b=!0):(this.leaveState(),b=!0),b&&k()}.bind(this))},enterState:function(){h(this.options.onFirstRun),h(this.options.onEnter),this.options.onFirstRun=[],this.active=!0},leaveState:function(){h(this.options.onLeave),this.active=!1},resizeState:function(){this.testConfigOptions("resize")&&h(this.options.onResize)},destroy:function(){this.test.removeListener(this.listener)},testConfigOptions:function(a){for(var b=this.configOptions.length,c=0;b>c;c++){var d=this.configOptions[c];if("undefined"!=typeof this.options[d.name]&&d.when===a&&d.test.bind(this)()===!1)return!1}return!0},configOptions:[]},d.prototype={addState:function(a){var b=new c(a);return b.valid&&this.states.push(b),b},addStates:function(a){for(var b=a.length-1;b>=0;b--)this.addState(a[b]);return this},getState:function(a){for(var b=this.states.length-1;b>=0;b--){var c=this.states[b];if(c.id===a)return c}},isActive:function(a){var b=this.getState(a)||{};return b.active||!1},getStates:function(a){var b=null,c=[];if("undefined"==typeof a)return this.states;b=a.length;for(var d=0;b>d;d++)c.push(this.getState(a[d]));return c},removeState:function(a){for(var b=this.states.length-1;b>=0;b--){var c=this.states[b];c.id===a&&(c.destroy(),this.states.splice(b,1))}return this},removeStates:function(a){for(var b=a.length-1;b>=0;b--)this.removeState(a[b]);return this},removeAllStates:function(){for(var a=this.states.length-1;a>=0;a--){var b=this.states[a];b.destroy()}this.states=[]},addConfigOption:function(a){var b={name:"",test:null,when:"resize"};a=f(b,a),""!==a.name&&null!==a.test&&c.prototype.configOptions.push(a)},removeConfigOption:function(a){for(var b=c.prototype.configOptions,d=b.length-1;d>=0;d--)b[d].name===a&&b.splice(d,1);c.prototype.configOptions=b},getConfigOption:function(a){var b=c.prototype.configOptions;if("string"!=typeof a)return b;for(var d=b.length-1;d>=0;d--)if(b[d].name===a)return b[d]},getConfigOptions:function(){return c.prototype.configOptions},resizeBrowser:function(){for(var a=e(this.states,"active",!0),b=a.length,c=0;b>c;c++)a[c].resizeState()},stateChange:function(a){if("function"!=typeof a)throw new b("Not a function");k=a}},new d});
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
(function($) {

	$.fn.visible = function(partial) {

		var $t = $(this), $w = $(window), viewTop = $w.scrollTop(), viewBottom = viewTop + $w.height(), _top = $t.offset().top, _bottom = _top + $t.height(), compareTop = partial === true ? _bottom : _top, compareBottom = partial === true ? _top : _bottom;

		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

	};

})(jQuery);

	/**
	 * Font Select
	 */
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
					this.$drop.addClass('show');	$('.dropdown-menu').niceScroll();	
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
				this.$select = $('<a class="fa-button"><span>' + this.options.placeholder + '</span><em class="material-icons">expand_more</em></a>');
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
				$('.dropdown-menu').getNiceScroll().resize();	
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
	(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
	})();
var canvas;
var a;
var b;

var $color;
var imgf;
var imgb;
var front;
var back;
var state = [];
var mods=0;
var hasback = 1;
var lineAdded = false;
var lineW, lineH;
var copiedObject;
var copiedObjects = new Array();
var mobile=false;
var allProducts=new Array();

var newleft = 0;
var drawline, line, isDown;var zoom = 1;
var topLeftImage = new Image();
topLeftImage.src = '../wp-content/plugins/wpstamp/public/img/delete.png';

var topRightImage = new Image();
topRightImage.src = '../wp-content/plugins/wpstamp/public/img/fa_rotate.png';

var bottomRightImage = new Image();
bottomRightImage.src = '../wp-content/plugins/wpstamp/public/img/fa_resize.png';

var bottomLeftImage = new Image();
bottomLeftImage.src = '../wp-content/plugins/wpstamp/public/img/fa_layers.png';

function isVML() {
    return typeof G_vmlCanvasManager !== 'undefined';
};

fabric.Object.prototype._drawControl = function(control, ctx, methodName, left, top) {
    var size = 12;//this.cornerSize;

    /*if (this.isControlVisible(control)) {
        isVML() || this.transparentCorners || ctx.clearRect(left, top, size, size);
      } */  
      
        if(control == 'tl') {
           /*
ctx.drawImage(topLeftImage, left, top, size, size);
          ctx.strokeRect(left, top, size, size);*/
               ctx[methodName](left, top, size, size);
        } else if(control == 'tr') {
          //  ctx.drawImage(topRightImage, left, top, size, size);
           // ctx.strokeRect(left, top, size, size);
           ctx[methodName](left, top, size, size);
        } else if(control == 'bl') {
           ctx[methodName](left, top, size, size);
        //    ctx.strokeRect(left, top, size, size);
        } else if(control == 'br') {
          ctx[methodName](left, top, size, size);
          //  ctx.strokeRect(left, top, size, size);
        } else if(control=='mtr'){
        	
        //    ctx.drawImage(topRightImage, left, top, size, size);
     
          ctx.arc(left+2+size/4,top+size/4,size/1.5,0,2*Math.PI);
          ctx.fill();
          //  ctx.strokeRect(left, top, size, size);
        }else{
        	ctx[methodName](left, top, size, size);
        }
   
};
/*
fabric.Canvas.prototype._getActionFromCorner = function(target, corner) {
    var action = 'drag';
    if (corner) {

        action = (corner === 'ml' || corner === 'mr')
        ? 'scaleX'
        : (corner === 'mt' || corner === 'mb')
        ? 'scaleY'
        : corner === 'tl'
        ? 'rotate'
        : 'scale';

        if(corner == 'tr' || corner=='mtr')
            action = 'rotate';

        if(corner == 'tl') {
         //   action = 'delete';
          //  removeSelected();
        }
        
        if(corner == 'bl') {
            action = 'layer';
           // showLayerChoice(target.top, target.left);
        }
    }

    return action;
};
/*

*/
$(document).ready(function() {

//make it responsive;
ssm.addStates([
{
    id: 'mobile',
    query: '(max-width: 767px)',
    onEnter: function(){
    	
		  var currentWidth=$("#shirtDiv").attr('data-width'); // check if smaller tha window.width
			var currentHeight=$('.helper').height(); // check if smaller tha window.height
	      reShape(currentWidth,currentHeight);
    }
},
{
    id: 'screen',
    query: '(min-width: 768px)',
    onEnter: function(){

		  resetShape();
    }
}
]);
function resetShape(){
		    	var drawingArea=$('#drawingArea');

  			   // $("#shirtDiv").css('width',$('.designer-container').attr('data-width'));
        	  $(".frontside,.backside").css('width',$('.designer-container').attr('data-width'));
              $(".frontside,.backside,.helper").css('height',$('.designer-container').attr('data-height'));

              drawingArea.css({width:drawingArea.attr('data-width'),height:drawingArea.attr('data-height')});
     			
 			drawingArea.css({top:drawingArea.attr('data-top')+'px',left:drawingArea.attr('data-left')+'px'});
     			
     			$('.canvas-container').css({width:drawingArea.attr('data-width'),height:drawingArea.attr('data-height')})
 
     		if(canvas){  
     			canvas.setWidth( drawingArea.width() );
				canvas.setHeight( drawingArea.height() );
				canvas.calcOffset().renderAll();
     		}
}
function reShape(currentWidth,currentHeight){
/*	var currentWidth=$("#shirtDiv").width(); // check if smaller tha window.width
	var currentHeight=$('.helper').height(); // check if smaller tha window.height
*/	    	var drawingArea = $('#drawingArea');
			var ratio=currentWidth/currentHeight;
  
  		    // $("#shirtDiv").css('width',currentWidth*ratio);
        	  $(".frontside,.backside").css('width',currentWidth*ratio);
              $(".frontside,.backside,.helper").css('height',currentHeight*ratio);
              var drawingPosition=drawingArea.position();
              drawingArea.css({top:drawingPosition.top*ratio,left:drawingPosition.left*ratio,width:drawingArea.width()*ratio,height:drawingArea.height()*ratio});
     		  $('.canvas-container').css({width:drawingArea.width()*ratio,height:drawingArea.height()*ratio})
  				 
     		if(canvas){  
     			canvas.setWidth( drawingArea.width() );
				canvas.setHeight( drawingArea.height() );
				canvas.calcOffset().renderAll();
     		}

}
//end of responsible code;

	var productFront = $('#tshirtFacing').data('front');
	var productBack = $('#tshirtFacing').data('back');
	var progress = $('.progress-bar');

	canvas = new fabric.Canvas('tcanvas');
	canvas.stateful = false;
	canvas.counter = 0;
	canvas.setWidth( $('#drawingArea').width() );
	canvas.setHeight( $('#drawingArea').height() );
	canvas.calcOffset().renderAll();
	canvas.on({
		'object:selected' : onObjectSelected,
		'selection:cleared' : onSelectedCleared,
		'object:moving' : onObjectMoving,
		'mouse:up' : onMouseUp,
		'mouse:move' : moveLine,
		'mouse:down' : startLine,
		'object:added': checkPrice,
		'object:added' : onObjectAdded,
		'object:modified': function(){
			//updateModifications(true);
		},
		'object:removed':checkPrice
	});
	$("#layers").sortable({
		stop : function(event, ui) {

			var items = $('#layers  li:not(.ui-sortable-placeholder)');
			for (var i = items.length - 1; i >= 0; i--) {
				var obj = getObjectById(items[i].id);
				canvas.bringToFront(obj);
			}
		}
	});
	$("#layers ul").disableSelection();
	loadProducts();
	function loadProducts(){
	$.ajax({
		xhr : function() {
			var xhr = new window.XMLHttpRequest();
			//Upload progress
			xhr.upload.addEventListener("progress", function(evt) {

				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
				
					progressBar(percentComplete);
				}
			});

			return xhr;
		},
		type : 'POST',
	
		url : fa_settings.site_url_,
		data : {

			action : 'get_other_parent_products',
			
		},
		beforeSend : function(x) {
			if (x && x.overrideMimeType) {
				x.overrideMimeType("application/json;charset=UTF-8");
			}
		},
		success : function(data, textStatus, XMLHttpRequest) {
			
			if(data.length!=0){
				var customContainer=$('#product-changer');

				$.each(data,function(i,value){
						if(Number(i)==Number($('#tshirtFacing').attr('data-id'))){
							active='active';
						}else{
							active='not';
						}
					
						customContainer.append('<li class="'+active+'"><a data-id="'+i+'" href="'+value[1]+'"><img class="img" alt="'+value[2]+'" src="'+value[0]+'"/></a></li>');
						allProducts[i] = value;
					
				});

			}
		},
		error : function(MLHttpRequest, textStatus, errorThrown) {
		}
	});
}
$('body').on('click','#product-changer a',function(e){
	e.preventDefault();
	var productId=$(this).attr('data-id');
	$('#product-changer li').removeClass('active');
	$(this).parent().addClass('active');
	changeProduct(productId);

});

function changeProduct(productId){
	var container=$('.designer-container,.t-container');
	var drawingArea = $('#drawingArea');
	//Change Variations
	var colors='';
	$('.product-list').html('');
	$.each(allProducts[productId]['variations'],function(i,value){
		colors +='<li class="color"><a data-front="'+value[0]+'" data-back="'+value[1]+'"  title="'+value[2]+'" class="colors"><img src="'+value[0]+'"/><div class="product-name">'+value[2]+'</span><span class="color-box" style="background:'+value[3]+';"></span></div></a></li>';
	});
	$('.product-list').html(colors);

	container.attr('data-width',allProducts[productId]['info']['width_pixels']);
	container.attr('data-height',allProducts[productId]['info']['height_pixels']);
	$('#tshirtFacing').attr('data-front','');
		$('#tshirtFacing').attr('data-back','');
			$('#tshirtFacing').attr('data-id',productId);
	var real_drawing=allProducts[productId]['info'][0].split('/');
		drawingArea.attr('data-width',real_drawing[0]);
		drawingArea.attr('data-height',real_drawing[1]);
		drawingArea.attr('data-top',real_drawing[3]);
		drawingArea.attr('data-left',real_drawing[2]);
     	$('.helper').css({'width':allProducts[productId]['info']['width_pixels']+'px','height':allProducts[productId]['info']['height_pixels']+'px'});
		$('#backgrounds a').eq(0).click();
		resetShape();

}
if($('.designer-container').width()<700){
	$('.designer-container > .tools').addClass('mobile');
	mobile=true;
}
function drawStar(arms, x, y, outer_radius, inner_radius, context, colour) {
    
    var angle = (Math.PI / arms);

    context.fillStyle = colour;
    context.beginPath();

    for (var i = 0; i < 2 * arms; i++) {
        
        var r = (i & 1) ? inner_radius : outer_radius;
        var point_x = x + Math.cos(i * angle) * r;
        var point_y = y + Math.sin(i * angle) * r;

        if (!i)
            context.moveTo(point_x, point_y);
        else
            context.lineTo(point_x, point_y);
    }
    
    context.closePath();
    context.fill();
}

	//$('.designer-container > .tools').width($('.designer-container').width()-$('#tshirtFacing').width()-10)
	
	$('.designer-container h1').on('click',function(e){
		e.preventDefault();
		
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}else{$('.designer-container h1').removeClass('active');
			$(this).addClass('active');
		}
		
		var id=$(this).attr('data-collapse');
		//var odp=$(this).find('em').text()=='navigate_next' ? $(this).find('em').html('expand_more') : $(this).find('em').html('navigate_next');
		if($('#'+id).hasClass('collapse')){
			
				$('#'+id).removeClass('collapse');
			}else{
				$('.static').removeClass('collapse');
					$('#'+id).addClass('collapse');
			}
	});
	if (fa_settings.edit_id) {
		ajax_load(fa_settings.edit_id);
	}

	if (productBack == '') {
		hasback = 0;
		$('#flip').remove();
	}
	$('.tool-container').on('mouseover', function() {

		$('.tool-container').removeClass('closeme');
		$(this).data('close', '0');

	});
	$('#crop').on('click',function(){
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type =='image') {
		var currentAngle=  activeObject.getAngle();
		var currentScale={scaleY:activeObject.getScaleY(),scaleX:activeObject.getScaleX()};
		var currentCoords={top:activeObject.top,left:activeObject.left};

		
			htmlelement = activeObject._originalElement;
			$('.modal').addClass('show');
			htmlelement.id="target";
			$("#crop-image").html(htmlelement);
			

		  var dkrm = new Darkroom('#target', {
		      // Size options
		      minWidth: 100,
		      minHeight: 100,
		      maxWidth: 600,
		      maxHeight: 500,
		     
		      // Plugins options
		      plugins: {
		      	save: true,
		      	save: {
		    
				      callback: function() {  	
				          this.darkroom.selfDestroy(); // Cleanup
				          var newImage = dkrm.canvas.toDataURL();
				          fileStorageLocation = newImage;
				          canvas.remove(activeObject);
				          $('.modal').removeClass('show');
				          fabric.Image.fromURL(newImage, function(image) {

				          			image.set({
				          			angle:currentAngle,
									top : currentCoords.top,
									left : currentCoords.left,
									scaleX : currentScale.scaleX,
									scaleY : currentScale.scaleY
								});
							canvas.add(image);
							
				      });
				  }
				},
		        crop: {
		          quickCropKey: 67, //key "c"
		          //minHeight: 50,
		          //minWidth: 50,
		          //ratio: 4/3
		        }
		      },
		      // Post initialize script
		      initialize: function() {
		      //  var cropPlugin = this.plugins['crop'];
		        // cropPlugin.selectZone(170, 25, 300, 300);
		       // cropPlugin.requireFocus();
		      }
		    });
		}else{
			
		}
	});
	$('.handle').on('click', function() {
		$('.tools').toggleClass('hide');
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
loadMediaCategories();

function loadMediaCategories(id){
 var id = (typeof id ==='undefined') ?  $('#tshirtFacing').attr('data-id') : id;
		jQuery.ajax({
			xhr : function() {
				var xhr = new window.XMLHttpRequest();
				//Upload progress
				xhr.upload.addEventListener("progress", function(evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						//Do something with upload progress
						progressBar(percentComplete);
					}
				}, false);

				return xhr;
			},
			type : "POST",
			dataType : "json",
			
			url : fa_settings.site_url_,
			data : {
				
				action : "show_images",
				id:id
			},
			complete : function() {
				hideProgressBar();
			},
			success : function(data, textStatus, XMLHttpRequest) {
			var media_categories='';
				$.each(data,function(c,media){
					media_categories +='<li class="get-last-category"><a data-name="'+media.name+'" data-cat="'+media.id+'" href="#'+media.name+'">'+media.name+'</a></li>';
				});	
			
					$(".photo-list,.product-list").niceScroll();

				jQuery('#gallery .gallery-nav').prepend(media_categories);
				jQuery('.gallery-nav li a').eq(0).click();

			}
		});
}
	jQuery("body").on("click", ".gallery-nav li a,#pagination li a", function(e) {

		e.preventDefault();
		var newid=$(this).attr('data-cat');
		var page=$(this).attr('data-page') ? $(this).attr('data-page') : 0;

		$('.gallery-nav li a').removeClass('active');
		$(this).addClass('active');
		jQuery.ajax({
			xhr : function() {
				var xhr = new window.XMLHttpRequest();
				//Upload progress
				xhr.upload.addEventListener("progress", function(evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						//Do something with upload progress
						progressBar(percentComplete);
					}
				}, false);

				return xhr;
			},
			type : "POST",
			dataType : "json",
			async : true,
			url : fa_settings.site_url_,
			data : {
				category :$(this).attr('data-name'),
				page : page,
				posts_per_page : jQuery('#pagination').attr("data-perpage"),
				action : "paginate_media_gallery"
				
			},
			complete : function() {
				hideProgressBar();
			},
			success : function(data, textStatus, XMLHttpRequest) {
			
				var n=1;
				var lpages = Math.ceil(Number(data.total) / Number(data.ppp));
			
					$('#pagination').html('');

				   while(n<=lpages){
				  	if(n==data.page){

				  		active='active';
				  	}else{
				  		active='not';
				  	}
				   	$('#pagination').append('<li class="'+active+'"><a data-name="'+data.category+'" data-page="'+n+'" href="">'+(n)+'</a></li>'); 	n=n+1;
				   }
				if(data.images.length>0){
					var imglist='';
					jQuery.each(data.images,function(i,img){
					
						imglist +='<li><img class="list-image" src="'+img.thumb+'" data-full="'+img.full+'"/></li>';
					});
					

					$('.photo-list').attr('id', "a"+ newid).html(imglist);
						$(".photo-list,.product-list").niceScroll();


				
				}else{
					$('.photo-list').attr('id', "a"+ newid).html("<li class='nothing'>Nothing found</li>");
				}
				

			}
		});

	});

	jQuery("body").on("click", "#facebook", function(e) {
		facebook();
	});

	jQuery("body").on("click", ".media-navigation li", function(e) {
		e.preventDefault();
		

		jQuery.ajax({
			xhr : function() {
				var xhr = new window.XMLHttpRequest();
				//Upload progress
				xhr.upload.addEventListener("progress", function(evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						//Do something with upload progress
						progressBar(percentComplete);
					}
				}, false);

				return xhr;
			},
			type : "POST",
			dataType : "json",
			async : true,
			url : fa_settings.site_url_,
			data : {
				category : $('.get-last-category:last').data("cat"),
				page : $(this).children().data("next"),
				posts_per_page : $('.get-last-category').data("perpage"),
				action : "paginate_media_gallery",
				id: fa_settings.edit_id
			},
			complete : function() {
				hideProgressBar();
			},
			success : function(data, textStatus, XMLHttpRequest) {

				

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
		
$("body").on('click','.user-list li .close',function(){
	var me=$(this);
	var attachmentId=me.prev().attr('data-id');
	
	me.parent().addClass('animated zoomOut');
	setTimeout(function(){me.parent().remove()},800);
	
					jQuery.ajax({
						
						type : 'POST',
						dataType : "json",
						async : true,
						url : fa_settings.site_url_,
						data : {
							id : attachmentId,
							action : 'fa_delete_attachment'
						},
						success : function(data, textStatus, XMLHttpRequest) {
							if (data.success == true) {
								$(this).parent().remove();
							}

						}
					});

});


	$("#orderit-ajax").click(function(e) {
		e.preventDefault();

		current = JSON.stringify(canvas);
		obj = JSON.parse(current);

		if (!a && !b && obj.objects.length == 0) {
			
			$(this).html('<em class="material-icons">info</em>Nothing ');
			setTimeout(function(){$("#orderit-ajax").html('<em class="material-icons">shopping_cart</em>Create Product');},1000);

		} else {
			
			$('#drawingArea').hide();
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

	$('.dropdown > span').on('click', function() {

		$('ul.sub-menu').removeClass('visible');
		if (!$(this).hasClass('open')) {
			$(this).removeClass('open');
			$(this).next('ul.sub-menu').addClass('visible');
		} else {
			$(this).removeClass('visible');
			$(this).prev().removeClass('open');
		}
	});

	$(document).mouseup(function(e) {
		var container = $("ul.sub-menu");

		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.removeClass('visible');
			container.prev().removeClass('open');
		}
	});
	$('#main-color').minicolors({
		inline : true,
		change : function(hex, rgb) {

			var activeObject = canvas.getActiveObject();

			$('span.color-main').css({'background-color' : this.value,'color':invertColor(this.value) });

			if (activeObject && activeObject.type !== 'path') {
				activeObject.fill = this.value;
			} else if (activeObject) {
				activeObject.stroke = this.value;
			}
			if (canvas.isDrawingMode) {
				canvas.freeDrawingBrush.color = this.value;
			}
			if(activeObject && activeObject.type=="image"){
				/*
				  applyFilter(14,  new fabric.Image.filters.Blend({
			      color: this.value,
			      mode: 'multiply'
			    }));*/
			}
			canvas.renderAll();
		}
	});

	$('span.color-main').css('background-color', $('#main-color').minicolors('value'));
	$('span.color-secondary').css('background-color', $('#main-color').minicolors('value'));

	$("#stroke-color").minicolors({

		inline : true,
		change : function(hex, rgb) {
		
	$('span.color-secondary').css({'background-color' : this.value,'color':invertColor(this.value) });

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
				
					if (_val == 0) {
						activeObject.stroke = null;
						activeObject.strokeWidth = '';
					} else {
						activeObject.strokeWidth =activeObject.type == "text" ? _val *0.1: _val;
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

	canvas.freeDrawingCursor = 'url("../wp-content/plugins/wpstamp/public/img/brush.png") 5 40 , default';

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
		clearOther();
		if (drawline == 'true' || $(this).hasClass('active')) {

			$(this).removeClass('active');
			$('.line-draw').hide();

			drawline = false;

		} else if (drawline == false || drawline == undefined) {
			$(this).addClass('active');
			$('.line-draw').show();
			$('#drawing-line-width').slider("value", 3)
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
	if (fabric.PatternBrush) {

			
    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    vLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
       ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    hLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
        ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 10);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var squarePatternBrush = new fabric.PatternBrush(canvas);
    squarePatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 2;

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
      var ctx = patternCanvas.getContext('2d');

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);

      return patternCanvas;
    };

    var diamondPatternBrush = new fabric.PatternBrush(canvas);
    diamondPatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 5;
      var patternCanvas = fabric.document.createElement('canvas');
      var rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: this.color
      });

      var canvasWidth = rect.getBoundingRectWidth();

      patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
      rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

      var ctx = patternCanvas.getContext('2d');
      rect.render(ctx);

      return patternCanvas;
    };


  }
	$('.drawing-mode-selector').on('click',function() {


		var value=$(this).attr('data-type');
		    if (value === 'hline') {
		      canvas.freeDrawingBrush = vLinePatternBrush;
			  canvas.freeDrawingBrush.width = parseInt($('#drawing-line-width').slider("option", "value")) ==0 ? 1 : parseInt($('#drawing-line-width').slider("option", "value"));

		    }
		    else if (value === 'vline') {
		      canvas.freeDrawingBrush = hLinePatternBrush;
	  		  canvas.freeDrawingBrush.width = parseInt($('#drawing-line-width').slider("option", "value")) ==0 ? 1 : parseInt($('#drawing-line-width').slider("option", "value"));

		    }
		    else if (value === 'square') {
		      canvas.freeDrawingBrush = squarePatternBrush;
	          canvas.freeDrawingBrush.width = parseInt($('#drawing-line-width').slider("option", "value")) ==0 ? 1 : parseInt($('#drawing-line-width').slider("option", "value"));

		    }
		    else if (value === 'diamond') {
		      canvas.freeDrawingBrush = diamondPatternBrush;
		      canvas.freeDrawingBrush.width = parseInt($('#drawing-line-width').slider("option", "value")) ==0 ? 1 : parseInt($('#drawing-line-width').slider("option", "value"));

		    }
		    else if (value === 'texture') {
		      canvas.freeDrawingBrush = texturePatternBrush;
		      canvas.freeDrawingBrush.width = parseInt($('#drawing-line-width').slider("option", "value")) ==0 ? 1 : parseInt($('#drawing-line-width').slider("option", "value"));

		    }
		    else {
		      
    }
});
	drawingModeEl.on('click', function() {
		//clearOther(); 

		canvas.isDrawingMode = !canvas.isDrawingMode;

		canvas.freeDrawingBrush.color = getCurrentColor();

		canvas.freeDrawingBrush.width = parseInt($('#drawing-line-width').slider("option", "value")) ==0 ? 1 : parseInt($('#drawing-line-width').slider("option", "value"));

		if (canvas.isDrawingMode) {
			$('.color-secondary').parent().addClass('disabled');
			$(this).addClass('active');
			$('.line-draw').show();

		} else {
			$('.color-secondary').parent().removeClass('disabled');
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
			$('#text-string').val('');
		}
	});
	$("#text-string").keyup(function() {
		$('#add-text').removeData('data-tooltip');
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.text = this.value;
			canvas.renderAll();
			activeObject.setCoords();
		}
	});
	$('body').on('click', '.photo-list img', function(e) {
		var path = $(this).data('full');
		var svg = path.split('.').pop();
		if (svg == 'svg') {
			addSvg(path);
		} else {
			addImage(path);
		}
		if(mobile==true){
			$('.static').removeClass('collapse');
		}
	});
	$('.other-custom').on('click',function(e){
		var id=$(this).children('a').attr('rel');
		ajax_load_parent(id);
	});
	
	$('#remove-selected').click(function() {
		removeSelected();
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
	$('body').on('click','#backgrounds a', function(e) {
		e.preventDefault();

		$('#backgrounds a').removeClass('selected');
		$(this).toggleClass('selected');
		var front = $(this).data('front');
		var back = $(this).data('back');
		var id = $(this).data('id');
		var width = $('.flipper > .t-container').css('width');
		var height = $('.flipper > .t-container').css('height');
		var innerHtml = '<img style="height:' + height + '!important;width:' + width + '!important;" src="' + front + '"/><img style="height:' + height + '!important;width:' + width + '!important;" src="' + back + '"/>';
		var spanHtml = '<img src="' + front + '"/>';
		var spanHtml_b = '<img src="' + back + '"/>';
		$('.t-container.frontside').html(spanHtml);
		$('.t-container.backside').html(spanHtml_b);

		$('#backgrounds').css('background-color', $(this).css('background-color'));
		$('#tshirtFacing').data('front', front);
		$('#tshirtFacing').data('back', back);
		//$('#backgrounds > span').html(spanHtml);
		//$('.flipper').html(innerHtml);

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

	$('#redo').on('click',function(){
		redo();

	});
	$('#undo').on('click',function(){
		undo();
	
	});
});

// Start functions
function onObjectAdded(e) {
	var id = canvas.getObjects().length - 1;

	if (e.target.type == 'image') {
		icon = "gallery";
	}
	if (e.target.type == 'text') {
		icon = "font";
	}
	if (e.target.type == 'path') {
		icon = "atari";
	}else{
		icon="object"
	}

	if (e.target.type == 'line') {

	} else {
		// layer

		e.target.set('id', id);
		canvas.renderAll();
		$("#layers").prepend('<li id="' + id + '" class="ui-state-default actived"><em class="material-icons">' + icon + '</em>' + e.target.type + " " + id + '</li>');
	}

}
function undo() {
	
    if (mods < state.length) {
        canvas.clear().renderAll();
    
        canvas.loadFromJSON(state[state.length - 1 - mods - 1]);
        canvas.renderAll();
  
        //console.log("geladen " + (state.length-1-mods-1));
        //console.log("state " + state.length);
        mods += 1;
        //console.log("mods " + mods);
    }
}

 function redo() {
    if (mods > 0) {
        canvas.clear().renderAll();
        canvas.loadFromJSON(state[state.length - 1 - mods + 1]);
        canvas.renderAll();
        //console.log("geladen " + (state.length-1-mods+1));
        mods -= 1;
        //console.log("state " + state.length);
        //console.log("mods " + mods);
    }
}
function clearOther() {
	
	var drawingModeEl = $('.freedraw');
	drawline = false;
	$('.line-draw').hide();
	$('.line').removeClass('active');
	if (canvas.isDrawingMode) {
		drawingModeEl.removeClass('active');
		$('.color-secondary').parent().removeClass('disabled');
		canvas.isDrawingMode = false;
	}
}

 function zoomIn() {

         zoom = zoom + 0.1;
        if(zoom >= 20) {
            zoom = 1; 
        }
        zoomCanvas();
    };
     
 
   function zoomCanvas(type) {
     
        var width = zoom * Number($('#drawingArea').attr('data-width'));
        var height = zoom * Number($('#drawingArea').attr('data-height'));

        var topp=$('#drawingArea').attr('data-top');
        var leftta= $('#drawingArea').attr('data-left');
        var scale =width / canvas.getWidth();
        height = scale * canvas.getHeight();
    
       canvas.setDimensions({
            "width": width,
            "height": height
        });
     

		var  designerHeight = Number($('.t-container').attr('data-height'));
		var  designerWidth = Number($('.t-container').attr('data-width'));

		imgTop =  calcLeft(designerHeight * zoom, designerHeight)
		imgLeft = calcLeft(designerWidth * zoom, designerWidth)
		imgWidth =designerWidth * zoom;
		imgHeight = designerHeight * zoom;
		imgTopa =  calcLeft(height * zoom, height)
		imgLefta = calcLeft(width * zoom, width)
	
		toppp=Number(topp)+Number(imgTopa)+'px';
		leftt=Number(leftta)+Number(imgLefta)+'px';
		 $('#drawingArea').css({top:toppp,left:leftt,'width':width+'px','height':height+'px'});

		  $('.t-container').css({'top':imgTop,'left':imgLeft,'width':imgWidth,'height':imgHeight});
	//	 $('#tshirtFacing').draggable();
	    canvas.calcOffset();
	    canvas.setZoom(zoom);
    
       canvas.renderAll();
    }

	calcLeft = function(width, offsetWidth) {

	        return (-width/2) + (offsetWidth/2);
	 
    };
function applyFilter(index, filter) {
    var obj = canvas.getActiveObject();
    obj.filters[index] = filter;
    obj.applyFilters(canvas.renderAll.bind(canvas));
  }

  function applyFilterValue(index, prop, value) {
    var obj = canvas.getActiveObject();
    if (obj.filters[index]) {
      obj.filters[index][prop] = value;
      obj.applyFilters(canvas.renderAll.bind(canvas));
    }
  }

    //the zoom functions
 function zoomOut() {
 	
      zoom =  zoom - 0.1 ;
        if(zoom <= 1) {
           zoom = 1; 
        }

      
       zoomCanvas(true);
   };

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
	$('.progress-bar').removeClass('active');
	$('.progress-bar').children('span').css('width',0);
	//$('.darken-back').addClass('hidden');
}

function progressBar(progress) {
	if (!$('.progress-bar').hasClass('active')) {
		$('.progress-bar').addClass('active');
	}
	//$('.darken-back').removeClass('hidden');
$('.progress-bar > span').css('width', progress*100 +'%' ); 

}

function addLibrary(url, id) {
	var uploadWrap = $('#gallery .user-list');

	uploadWrap.prepend('<li><img data-full="' + url + '" data-id="' + id + '" src="' + url + '" /><span class="close"><em class="material-icons">close</em></span></li>');
}
createListenersKeyboard();

function createListenersKeyboard() {
    document.onkeydown = onKeyDownHandler;
    //document.onkeyup = onKeyUpHandler;
}

function onKeyDownHandler(event) {
    //event.preventDefault();
    
    var key;
    if(window.event){
        key = window.event.keyCode;
    }
    else{
        key = event.keyCode;
    }
    
    switch(key){
        //////////////
        // Shortcuts
        //////////////
        // Copy (Ctrl+C)
        case 67: // Ctrl+C
            if(ableToShortcut()){
                if(event.ctrlKey){
                    event.preventDefault();
                    copy();
                }
            }
            break;
        // Paste (Ctrl+V)
        case 86: // Ctrl+V
            if(ableToShortcut()){
                if(event.ctrlKey){
                    event.preventDefault();
                    paste();
                }
            }
            break;
        case 46: 
        	if(ableToShortcut()){
               
                    event.preventDefault();
              	removeSelected();
              	
              }
        default:
            // TODO
            break;
    }
}

	function removeSelected(){
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
	}

function ableToShortcut(){
    /*
    TODO check all cases for this
    
    if($("textarea").is(":focus")){
        return false;
    }
    if($(":text").is(":focus")){
        return false;
    }
    */
    return true;
}
function invertColor(hexTripletColor) {
        var color = hexTripletColor;
        color = color.substring(1); // remove #
        color = parseInt(color, 16); // convert to integer
        color = 0xFFFFFF ^ color; // invert three bytes
        color = color.toString(16); // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = "#" + color; // prepend #
        return color;
    }
function copy(){
    if(canvas.getActiveGroup()){
        for(var i in canvas.getActiveGroup().objects){
            var object = fabric.util.object.clone(canvas.getActiveGroup().objects[i]);
            object.set("top", object.top+5);
            object.set("left", object.left+5);
            copiedObjects[i] = object;
        }                    
    }
    else if(canvas.getActiveObject()){
        var object = fabric.util.object.clone(canvas.getActiveObject());
        object.set("top", object.top+5);
        object.set("left", object.left+5);
        copiedObject = object;
        copiedObjects = new Array();
    }
}

function paste(){
    if(copiedObjects.length > 0){
        for(var i in copiedObjects){
            canvas.add(copiedObjects[i]);
        }                    
    }
    else if(copiedObject){
        canvas.add(copiedObject);
    }
    canvas.renderAll();    
}
function handleFiles(e, isDragged) {
	if (isDragged == true) {
		var fileName = e.name;
		var reader = new FileReader;

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
					url : fa_settings.site_url_,
					data : {
						base : this.src,
						filename : fileName,
						id : postid,
						action : 'fa_upload_attachment'
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
 reader.onprogress = function(data) {
				     if (data.lengthComputable) {                                            
                var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                progressBar(progress);
            }
				  
				        };
			reader.onload = function(event) {
				  request = new XMLHttpRequest();
				 hideProgressBar();
				var img = new Image;
				img.src = event.target.result;
				
				img.onload = function() {

					var srcFull = img.src;
					var srcName = srcFull.replace(/^.*[\\\/]/, '');
					var postid = $('#').data('Id');
/*
					jQuery.ajax({
						xhr :function() {
							var xhr = new window.XMLHttpRequest();
							//Upload progress
							xhr.upload.addEventListener("progress", function(evt) {
								if (evt.lengthComputable) {
									var percentComplete = evt.loaded / evt.total;
									//Do something with upload progress
									progressBar(percentComplete);
								}
							}, false);

							return xhr;
						},
							type : 'POST',
						dataType : "json",
						async : true,
						url : fa_settings.site_url_,
						data : {
							base : this.src,
							filename : fileName,
							id : postid,
							action : 'fa_upload_attachment'
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
					});*/
	addLibrary(img.src,postid);  

							addImage(img.src);
				};
			};
			reader.readAsDataURL(e.target.files[i]);
		}
	}
}
function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
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
		line = new fabric.Line(points, {
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
//positionBtn(e);
if (lineAdded == false) {
		var middleW = canvas.width / 2;
		var middleH = canvas.height / 2;

		lineW = new fabric.Line([middleW, 0, middleW, canvas.height], {
			stroke : 'magenta',
			strokeWidth : 0.5,
			selectable : false
		});
		lineH = new fabric.Line([0, middleH, canvas.width, middleH], {
			stroke : 'magenta',
			strokeWidth : 0.5,
			selectable : false
		});
		canvas.add(lineW);
		canvas.add(lineH);
		canvas.calcOffset();
		canvas.renderAll();	


		lineAdded = true;
	}
	
}

function positionBtn(obj){

  fabric.Canvas.prototype.getAbsoluteCoords = function(object) {
    return {
      left: object.left,
      top: object.top /*+ this._offset.top+ this._offset.left*/
    };
  };
  	var toolset=$('#moving-tools');
	toolset.show();
	toolsetWidth=toolset.width();
	toolsetHeight=toolset.height();
/*    var absCoords = canvas.getAbsoluteCoords(obj.target);

   	toolset.css('left',absCoords.left +toolset.width()+'px');
  	toolset.css('top',(absCoords.top +obj.target.getHeight()+toolset.height()+obj.target.getStrokeWidth())+20+ 'px');
*/
}
function onSelectedCleared(e) {
	$("#text-tool a").removeClass('active');
	$('#text-string').val('');
	$('#border-line-width').slider('value', 0);
/*	if($('#tshirtFacing').draggable() && zoom>1){
	 //$('#tshirtFacing').draggable('enable');
	}*/
}
function facebook(){
		  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
		    FB.init({
		      appId: '161922393945949',
		      version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
		    });     
		    $('#loginbutton,#feedbutton').removeAttr('disabled');
  			FB.getLoginStatus(function(response) {
			  if (response.status === 'connected') {
			   
					FB.api("/me", {fields: "id,name,picture"}, function(response)
					{
					     FB.api(
					            {
					                method: 'fql.query',
					                query: "SELECT src_big,src_small,target_id FROM photo WHERE pid IN (SELECT pid FROM photo_tag WHERE subject='"+response.id+"') OR pid IN (SELECT pid FROM photo WHERE aid IN (SELECT aid FROM album WHERE owner='"+response.id+"')) LIMIT 100"

					            },
					            function(data) {
					        
					               
					var imglist='';
										$.each(data,function(i,img){
										
											imglist +='<li><img class="list-image" src="'+img.src_small+'" data-full="'+img.src_big+'"/></li>';
										});
										
		
								
								$('.gallery-nav').append('<li class="get-last-category"><a data-name="facebook" href="#facebook">facebook</a></li>');
									
										$('.photo-list').attr('id', "facebook").html(imglist);


					            }
					    );
					 });
			  }  else {

			    FB.login(function(){}, {scope: 'user_photos'});
			  }
			});
  });
}

function updateStatusCallback(e){

	try{
		FB.api('/me', function(response) {
		  fbinfo = new Array();
		  fbinfo[0] = response.id;
		  fbinfo[1] = response.first_name;
		  fbinfo[2] = response.last_name;
		  fbinfo[3] = response.email;

		     var im = document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
		});
	}catch(ex){
		//ex
	}
}
function onObjectSelected(e) {
/*	if($('#tshirtFacing').draggable()){
	// $('#tshirtFacing').draggable('disable');
	}*/

	var selectedObject = e.target;
	
	selectedObject.hasRotatingPoint = true;
 	//positionBtn(e);
 		$('#layers').find('li.active').removeClass('active');
	$('#layers').find('#' + e.target.id).addClass('active');
	if (selectedObject && selectedObject.type === 'text') {
		//check if text
		$("#line-height").prev().val(Math.round(selectedObject.lineHeight * 10));
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
		console.log(selectedObject.textAlign);
		if (selectedObject.textAlign == 'left') {
			$("#text-align-left").addClass('active');
		} else if (selectedObject.textAlign == 'center') {
			$("#text-align-center").addClass('active');
		} else if (selectedObject.textAlign == 'right') {
			$("#text-align-right").addClass('active');
		}
	
		if (selectedObject.fill) {

			$('#main-color').minicolors('value', selectedObject.fill);
		}


	} 
/*	if (selectedObject.stroke) {
			console.log( selectedObject.stroke );
			$('#stroke-color').minicolors('value', selectedObject.stroke);
			$('#border-line-width').slider('value', selectedObject.strokeWidth);
		}
*/

	if (selectedObject && selectedObject.type == 'image') {
		$('#main-color').minicolors('value', "#fff");
	}
	if (selectedObject && selectedObject.type!=='path') {

		if (selectedObject.fill && selectedObject.fill != 'rgb(0,0,0)') {
			$('#main-color').minicolors('value', selectedObject.fill);
		} else {
			$('#main-color').minicolors('value', "#333333");
			
		}
		if (selectedObject.stroke != '' && selectedObject.fill != 'rgb(0,0,0)') {
			var getStrokeWidth=selectedObject.type=="text" ? selectedObject.getStrokeWidth()*10 : selectedObject.getStrokeWidth();
			$('#stroke-color').minicolors('value', selectedObject.stroke);
			$('#border-line-width').slider('value', getStrokeWidth);
		
		} else {
			
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
		canvas.add(image);image.crossOrigin = "Anonymous";
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
cache();
			canvas.renderAll();

		});
	} catch(ctx) {

	}
}
function convertImgToDataURLviaCanvas(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
}

function convertFileToDataURLviaFileReader(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var reader  = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}
function addImage(e) {

    var convertFunction = "Canvas" === 'FileReader' ?  
        convertFileToDataURLviaFileReader : 
    	convertImgToDataURLviaCanvas;
    var neoImage='';
    convertFunction(e, function(base64Img){
		neoImage=base64Img;	

	var canvasWidth = canvas.getWidth() / 2;
	var canvasHeight = canvas.getHeight();

	try {
	
		fabric.Image.fromURL(neoImage, function(image) {

			imageWidth = image.getWidth();
			imageHeight = image.getHeight();

			image.set({
				top : 0,
				left : 0,
				scaleX : canvasWidth <= imageWidth ? (canvasWidth / imageWidth) : imageWidth,
				scaleY : canvasWidth <= imageWidth ? (canvasWidth / imageWidth) : imageWidth,
			});
			
			canvas.add(image);
			image.center().setCoords();
			canvas.renderAll();

		});
	} catch(ctx) {
		
	}

		});
}

function sendAjax(color, type, imgf, imgb, front, back) {

	if (b) {
		check_back = $.parseJSON(b);

		if (check_back.objects.length == 0 && check_back.background.length == 0) {
			back = '';
		}

	}
	if (a) {
		check_front = $.parseJSON(a);
		if (check_front.objects.length == 0 && check_front.background.length == 0) {
			front = '';
		}
	}
	$("#orderit-ajax").html('<em class="material-icons">timer</em>Wait');

	$.ajax({
		xhr : function() {
			var xhr = new window.XMLHttpRequest();
			//Upload progress
			xhr.upload.addEventListener("progress", function(evt) {

				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
				
					progressBar(percentComplete);
				}
			});

			return xhr;
		},
		type : 'POST',
		dataType : "json",
		url : fa_settings.site_url_,
		data : {

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
setTimeout(function(){$("#orderit-ajax").html('<em class="material-icons">shopping_cart</em>Something Bad Happened');},1000);
		}
	});
}
function updateModifications(savehistory) {
    if (savehistory === true ) {
        myjson = JSON.stringify(canvas);
      
        state.push(myjson);

    }
}

function ajax_load(id) {

	$.ajax({
		xhr : function() {
			var xhr = new window.XMLHttpRequest();
			//Upload progress
			xhr.upload.addEventListener("progress", function(evt) {
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					//Do something with upload progress
					progressBar(percentComplete);
				}
			}, false);

			return xhr;
		},
		type : 'POST',
		dataType : "json",
		url : fa_settings.site_url_,
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
				fontFamily=[];
				if(data.json_a){var bothsides=$.parseJSON(data.json_a); var fonts=bothsides['objects'];push_fonts(fonts,fontFamily);}
				if(data.json_b){var bothsides2=$.parseJSON(data.json_b); var fonts2=bothsides2['objects'];push_fonts(fonts2,fontFamily);};
				if(fontFamily.length>0){
					WebFont.load({
										google: {
											families:fontFamily
										}, active: function () { 

											canvas.loadFromJSON(data.json_a, function() {
													canvas.calcOffset().renderAll();
												});
									a = data.json_a ? data.json_a : '';
									b = data.json_b ? data.json_b : ''; }
						});
				}else{
					canvas.loadFromJSON(data.json_a, function() {
												canvas.calcOffset().renderAll();
											});
								a = data.json_a ? data.json_a : '';
								b = data.json_b ? data.json_b : ''; 
				}
			

			}
		},
		error : function(MLHttpRequest, textStatus, errorThrown) {

		},
		complete : function() {

			hideProgressBar();

		}
	});

}
		function push_fonts(fonts,fontFamily){

		for (var key in fonts) {
			var obj = fonts[key];
				for (var prop in obj) {
					if(obj.hasOwnProperty(prop) && prop=='fontFamily'){
						fontFamily.push(obj[prop]);
					}
				}
			}
		}
function ajax_load_parent(id) {

	$.ajax({
		xhr : function() {
			var xhr = new window.XMLHttpRequest();
			//Upload progress
			xhr.upload.addEventListener("progress", function(evt) {
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					//Do something with upload progress
					progressBar(percentComplete);
				}
			}, false);

			return xhr;
		},
		type : 'POST',
		dataType : "json",
		url : fa_settings.site_url_,
		data : {

			id : id,
			action : 'change_custom_product'

		},
		beforeSend : function(x) {
			if (x && x.overrideMimeType) {
				x.overrideMimeType("application/json;charset=UTF-8");
			}
		},
		success : function(data, textStatus, XMLHttpRequest) {
			if (data.success == true) {
			console.log("loaded");
				
			}
		},
		error : function(MLHttpRequest, textStatus, errorThrown) {

		},
		complete : function() {

			hideProgressBar();

		}
	});

}
var Brightness = Darkroom.Transformation.extend({
  applyTransformation: function(canvas, image, next) {
  	/*
    var angle = (image.getAngle() + this.options.angle) % 360;
    image.rotate(angle);

    var width, height;
    height = Math.abs(image.getWidth()*(Math.sin(angle*Math.PI/180)))+Math.abs(image.getHeight()*(Math.cos(angle*Math.PI/180)));
    width = Math.abs(image.getHeight()*(Math.sin(angle*Math.PI/180)))+Math.abs(image.getWidth()*(Math.cos(angle*Math.PI/180)));

    canvas.setWidth(width);
    canvas.setHeight(height);

    canvas.centerObject(image);
    image.setCoords();
    canvas.renderAll();

    next();*/  
var value=this.options.bright;
console.log(value);
    image.filters.push( new  fabric.Image.filters.Brightness({
      brightness: value
    }));
    image.applyFilters(canvas.renderAll.bind(canvas));

    next();
  }
});

Darkroom.plugins['brightness'] = Darkroom.Plugin.extend({

  initialize: function InitDarkroomBrightnessPlugin() {
    var buttonGroup = this.darkroom.toolbar.createButtonGroup();

    var moreBrightButton = buttonGroup.createButton({
      image: 'brightness_high'
    });

    var lessBrightButton = buttonGroup.createButton({
      image: 'brightness_low'
    });

    moreBrightButton.addEventListener('click', this.brighten.bind(this));
    lessBrightButton.addEventListener('click', this.darken.bind(this));
  },

  brighten: function brighten() {
    this.brightness(10);
  },

  darken: function darken() {
    this.brightness(-10);
  },

  brightness: function (value) {
    this.darkroom.applyTransformation(
    new Brightness({bright:value})
    );
  }

});

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
function checkPrice(){

		if($('#flip').attr('data-original')=='front'){
			bi= JSON.stringify(canvas);
		}else{
			ai= JSON.stringify(canvas);
		}

	
		try {
			var price_per_cent=parseInt($('.adl-price').val())/100;
			var price_real=parseFloat($('.real-price').val());
		
			var a_json = ai ? $.parseJSON(ai) : null;
			var b_json = bi ? $.parseJSON(bi) : null;
			if((a_json.objects.length!=0 && b_json.objects.length!=0)){
					$('.amount').html(price_real+(price_per_cent*price_real));
				}else if(b_json.objects.length==0 || a_json.objects.length==0){
					$('.amount').html(price_real);
				}
			}catch(ex){
				
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

