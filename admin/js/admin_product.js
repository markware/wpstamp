	var Ruler;

(function () {
	"use strict";

	var MAJOR_INTERVAL_RATIO = 0.5,
		MINOR_INTERVAL_RATIO = 0.2,
		TICKS_PER_MAJOR_INTERVAL = 10,
		CURSOR_FPS = 48,
		GUTTER_SIZE = 15;

	Ruler = function (canvas) {
		/*global document, window, Blob, setInterval*/

		this.canvas = (canvas.getContext) ? canvas : document.getElementById(canvas);
		this.ctx = this.canvas.getContext('2d');

		this.cursor = document.createElement('canvas');
		this.cursor_ctx = this.cursor.getContext('2d');

		document.body.appendChild(this.cursor);
		this.cursor.width = this.canvas.width;
		this.cursor.height = this.canvas.height;

		this.cursor.className = this.canvas.className;

		this.cursor.style.zIndex = (this.canvas.style.zIndex + 1) || 1;
		this.cursor.x = this.cursor.currentX = 0;
		this.cursor.y = this.cursor.currentY = 0;

		var refreshCursor = setInterval(function () {
			if (this.cursor.y !== this.cursor.currentY) {
				this.cursor_ctx.clearRect(0, 0, GUTTER_SIZE, window.innerHeight);
				this.cursor_ctx.beginPath();
			    this.cursor_ctx.moveTo(0, this.cursor.y);
			    this.cursor_ctx.lineTo(GUTTER_SIZE, this.cursor.y);
			    this.cursor_ctx.stroke();
			    this.cursor.currentY = this.cursor.y;
			}

			if (this.cursor.x !== this.cursor.currentX) {
				this.cursor_ctx.clearRect(0, 0, window.innerWidth, GUTTER_SIZE);
				this.cursor_ctx.beginPath();
			    this.cursor_ctx.moveTo(this.cursor.x, 0);
			    this.cursor_ctx.lineTo(this.cursor.x, GUTTER_SIZE);
			    this.cursor_ctx.stroke();
			    this.cursor.currentX = this.cursor.x;
			}
		}.bind(this), 1000 / CURSOR_FPS);

		this.cursor.onmousemove = function (ev) {
			if (ev.clientX > GUTTER_SIZE) {
				this.cursor.x = ev.clientX;
			}
			if (ev.clientY > GUTTER_SIZE) {
				this.cursor.y = ev.clientY;
			}
		}.bind(this);

		function fillContextWithRuler(context, ruler, width, height) {
			var pattern_holder = document.createElement('canvas'),
				pattern_ctx = pattern_holder.getContext('2d');

			context.fillStyle = context.createPattern(ruler, 'repeat-x');
			context.fillRect(GUTTER_SIZE, 0, width, height);

			pattern_holder.width = width;
			pattern_holder.height = 100;

			pattern_ctx.translate(0, 0);
			pattern_ctx.scale(-1, 1);
			pattern_ctx.rotate(Math.PI / 4 * 2);
			pattern_ctx.drawImage(ruler, 0, 0);

			context.fillStyle = context.createPattern(pattern_holder, 'repeat-y');
			context.fillRect(0, GUTTER_SIZE, width, width);
		}

		function constructSVGData(color, units, major) {
			var majorHeight = parseInt(GUTTER_SIZE * MAJOR_INTERVAL_RATIO, 10),
				minorHeight = parseInt(GUTTER_SIZE * MINOR_INTERVAL_RATIO, 10),
				tickWidth = parseInt(major / 10, 10),
				html = "",
				i;

			for (i = 0; i < TICKS_PER_MAJOR_INTERVAL; i += 1) {
				html += "<div xmlns='http://www.w3.org/1999/xhtml' style='position: absolute; bottom: 0px; width: " + tickWidth + "px; border-bottom: 1px solid #555; border-left: 1px solid #999;  height: " + ((i % 5 === 0) ? majorHeight : minorHeight)  + "px; left: "  + i * tickWidth + "px'></div>";
			}

			// https://developer.mozilla.org/en-US/docs/HTML/Canvas/Drawing_DOM_objects_into_a_canvas
			return "<svg xmlns='http://www.w3.org/2000/svg' width='" + major + "' height='" + GUTTER_SIZE + "'><foreignObject width='100%' height='100%'>" + html + "</foreignObject></svg>";
		}

		this.render = function (color, units, major, width, height, options) {
			var svg, svgdata, ruler, url, DOMURL;

			options = options || {};

			this.ctx.fillStyle = options.backgroundColor || "#474747";
			this.ctx.strokeStyle = "#ffffff";
			this.cursor_ctx.strokeStyle = options.cursorColor || '#ffffff';

			this.ctx.fillRect(0, 0, this.canvas.width, GUTTER_SIZE);
			this.ctx.fillRect(0, 0, GUTTER_SIZE, this.canvas.height);

			svgdata = constructSVGData.apply(this, arguments);

			ruler = document.createElement('img');

			DOMURL = window.URL || window.webkitURL || window;

			ruler.onload = function () {
			    DOMURL.revokeObjectURL(url);
			    fillContextWithRuler(this.ctx, ruler, this.canvas.width, this.canvas.height);
			}.bind(this);

			svg = new Blob([svgdata], {
				type: "image/svg+xml;charset=utf-8"
			});

			url = DOMURL.createObjectURL(svg);
			ruler.src = url;
		};

		//window.onresize = this.render;
	};

}());

	var canvas;
	var grid = 50;
	var fontFamily = [];
	
	var json =fa_settings_product.json_a_ ? fa_settings_product.json_a_ :'';
	var json2=fa_settings_product.json_b_ ? fa_settings_product.json_b_ :'';
	var cmWidth=fa_settings_product.width_;
	var cmHeight=fa_settings_product.height_;
	var cmRealWidth=fa_settings_product.realwidth_;
	var cmRealHeight=fa_settings_product.realheight_;
	var cmRealTop=fa_settings_product.top_;
	var cmRealLeft=fa_settings_product.left_;
	var ratio=fa_settings_product.ratio_;
	var json = json.replace("\n","\\n");
	var json2 = json2.replace("\n","\\n");
	var $productFacing=jQuery('#tshirtFacing');
	
	
	if(json){var bothsides=jQuery.parseJSON(json); var fonts=bothsides['objects'];push_fonts(fonts,fontFamily);}
	if(json2){var bothsides2=jQuery.parseJSON(json2); var fonts2=bothsides2['objects'];push_fonts(fonts2,fontFamily);};


	 canvas = new fabric.Canvas('rcanvas'); 
	 fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.opacity = 1;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.borderColor = 'blue';
    
	 canvas.on({
	        'object:selected': onObjectSelected
	    });
	
	
	    jQuery('.canvas-dimensions').html('Width:'+round(cmWidth*10)/10+'cm/Height: '+cmHeight+'cm');
	   	jQuery('.real-dimensions').html('Width:'+round(pixels_dpi_to_cm(cmRealWidth,96)*10)/10+'cm/'+'Height:'+round(pixels_dpi_to_cm(cmRealHeight,96)*10)/10+'cm');
	
		
		jQuery('.real-start-point').html( 'Top:'+round(pixels_dpi_to_cm(cmRealTop,96) )+'cm<br>'+'Left:'+round(pixels_dpi_to_cm(cmRealLeft,96)*10)/10+'cm' );
		
	   canvas.calcOffset();

       canvas.loadFromJSON(json, function() {   canvas.calcOffset().renderAll(); });

       jQuery("#layers ul").sortable({
		stop : function(event, ui) {

			var items = jQuery('#layers ul li:not(.ui-sortable-placeholder)');
			for (var i = items.length - 1; i >= 0; i--) {
				var obj = getObjectById(items[i].id);
				canvas.bringToFront(obj);
			}
		}
	});
	var getObjectById = function(id) {
	var objsInCanvas = canvas.getObjects();
	for (obj in objsInCanvas) {
		if (objsInCanvas[obj].get('id') == id) {
			return objsInCanvas[obj];
		}
	}
};
var side='back';
	jQuery("#layers ul").disableSelection();     
		jQuery('#topen').on('click',function(){
			jQuery(this).toggleClass('active');
			if(side=='back'){
				if(json2){	
						canvas.clear();
					canvas.loadFromJSON(json2, function() { realArea();	canvas.calcOffset().renderAll(); });
					$productFacing.addClass('flip');
					
					side="front";
					
				}	
			}else{
				realArea();
				canvas.clear();
				canvas.loadFromJSON(json, function() { realArea();	 canvas.calcOffset().renderAll(); });
				$productFacing.removeClass('flip');
			
				side="back";

			}
		});
	jQuery('#layers-button').on('click',function(e){
		e.preventDefault();
		jQuery(this).children('.dropdown').toggleClass('visible');
	});
	jQuery('#svgexport').on('click',function(){
		canvas.deactivateAll().renderAll();
		var no = (side==="front" ) ? 'b' : 'a';
		var svg=('data:image/svg+xml;utf8,' + encodeURIComponent(canvas.toSVG()));
		  jQuery('#svgexport').attr({
	    		'download': 'YourProduct_'+no+'.svg',  /// set filename
	  			 'href'    : svg              /// set data-uri
    	  });
	
	});
	jQuery('#pngexport').on('click',function(){
		
		canvas.calcOffset().renderAll();
		var no = (side==="front" ) ? 'b' : 'a';
	    var image = canvas.toDataURLWithMultiplier("png",round(1/ratio)); 
	    jQuery('#pngexport').attr({
		    'download': 'YourProduct_'+no+'.png',  /// set filename
		    'href'    : image              /// set data-uri
	     });
     
	
	});


realArea();

    function realArea(){

    var scale=(typeof scale=='undefined') ? '1' : scale;

        if( side=='back'){

        var data=jQuery('#rcanvas').attr('data-shape');

            var rleft=Number(jQuery('#rcanvas').attr('data-left'));
            var rtop=Number(jQuery('#rcanvas').attr('data-top'));
            var rwidth=Number(jQuery('#rcanvas').attr('data-width'));
            var rheight=Number(jQuery('#rcanvas').attr('data-height'));
        }else{
          var rleft=Number(jQuery('#rcanvas').attr('data-leftb'));
            var rtop=Number(jQuery('#rcanvas').attr('data-topb'));
            var rwidth=Number(jQuery('#rcanvas').attr('data-widthb'));
            var rheight=Number(jQuery('#rcanvas').attr('data-heightb'));
           var data=jQuery('#rcanvas').attr('data-shapeb');
              
        }


            //check if data is null!!!
            if(data){
            
            var jsa= JSON.parse(data);
             jsa.objects[0].fill='transparent';
     
          
           canvas.clipTo = function(ctx) {
            if(jsa.objects[0].type && jsa.objects[0].type=='rect'){
        

              var bounds =  new fabric.Rect(jsa.objects[0]);

                     

             }else{

                 var bounds =  new fabric.Circle(jsa.objects[0]);
             }
             bounds.render(ctx);
            };
        }
      
           
    }
	
canvas.on("after:render", function(){ canvas.calcOffset();
	  var objs = canvas.getObjects();
	  var n=1;
	  jQuery("#layers ul").html('');
	  objs.forEach(function(o){
	  		 onObjectAdded(o,n);
	  		 n=n+1; 
	  });
 
		});	
canvas.on("selection:cleared", function(){  jQuery('.selected-info').html(''); });
	function loadside(json){
		canvas.loadFromJSON(json, function() {  canvas.renderAll(); });
				$productFacing.removeClass('flip');
				jQuery(this).data('toggle','front');
	}
	function onObjectSelected(e) {
	 var selectedObject = e.target;
	 selectedObject.lockMovementX = true;
	 selectedObject.lockMovementY = true;
	 jQuery('#layers ul').find('li.actived').removeClass('actived');
	 jQuery('#layers ul').find('#' + e.target.id).addClass('actived');

	try{
	
		 var selectedObjectTop=round(selectedObject.getTop()/ratio);
		 var selectedObjectLeft=round(selectedObject.getLeft()/ratio);
		 var selectedObjectWidth=round(selectedObject.getWidth()/ratio);
		 var selectedObjectHeight=round(selectedObject.getHeight()/ratio);
		 var selectedObjectSource=selectedObject.src;
		 var selectedObjectAngle=round(selectedObject.angle);
	
		 var wanted=['type','fill','strokeWidth','strokeColor','fontFamily','fontSize','fontStyle','fontWeight','text'];
		 	 var length = wanted.length,element = null;
		 jQuery('.info-box .selectedtop').html(selectedObjectTop+'px / '+round(10*pixels_dpi_to_cm(selectedObjectTop,96))/10+'cm');
		 jQuery('.info-box .selectedleft').html(selectedObjectLeft+'px / '+round(10*pixels_dpi_to_cm(selectedObjectLeft,96))/10+'cm');
		 jQuery('.info-box .selectedwidth').html(selectedObjectWidth+'px / '+round(10*pixels_dpi_to_cm(selectedObjectWidth,96))/10+'cm');
		 jQuery('.info-box .selectedheight').html(selectedObjectHeight+'px / '+round(10*pixels_dpi_to_cm(selectedObjectHeight,96))/10+'cm');
		 jQuery('.info-box .selectedangle').html(selectedObjectAngle+'°');
		
		 jQuery('.info-box .selectedsource').val(selectedObjectSource);
		 jQuery('.info-box .selectedsourcehref').attr('href',selectedObjectSource);
	
		 jQuery('.selected-info').html('<div style="top:'+selectedObject.getTop()+'px;left:'+(selectedObject.getLeft()+selectedObject.getWidth()+200)+'px;" class="more-info"></div>');
		for (var i = 0; i < length; i++) {
		    element = wanted[i];
			if(!selectedObject[element]){
				
			}else{
				jQuery('.more-info').append('<div><strong>'+element+'</strong>: '+'<em>'+selectedObject[element]+'</em></div>' ).append();
			}
		}
		 	 	var cloned=jQuery('.info-box').clone();
		 	 	 jQuery('.more-info').append(cloned);
		
		} catch(ctx){
			
		}
	}
	function getDPI() {
		return document.getElementById("dpi").offsetHeight;
	}
	function cm_pixels_to_dpi(cm,px) {
		if (cm == 0) {
	
		} else {
			return  2.54 * px / cm;
		}
	}

	function pixels_dpi_to_cm(px,dpi) {
		if (dpi == 0) {
	
		} else {
			return  2.54 * px / dpi;
		}
	}

function onObjectAdded(e,id) {
		e.set('id', id);
		jQuery("#layers ul").append('<li id="' + id + '" class="ui-state-default">' + e.type + " " + id + '</li>');
	

}
	function dpi_cm_to_pixels(cm,dpi) {
		return dpi * cm / 2.54;
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
	WebFont.load({
		google: {
		families: fontFamily
		}, active: function () { canvas.loadFromJSON(json, function() { canvas.renderAll();}); }
	});
	(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
	})();