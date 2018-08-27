/*
 * jQuery MiniColors: A tiny color picker built on jQuery
 *
 * Copyright Cory LaViska for A Beautiful Site, LLC. (http://www.abeautifulsite.net/)
 *
 * Licensed under the MIT license: http://opensource.org/licenses/MIT
 *
 */

saveto();
var $holder = jQuery('.product-color-section');
var $add = jQuery('#add-color');
var $save = jQuery('.save-this-color');
var $ratio = jQuery('#ratio');
var $template = '<div class="product-color-section"><a data-tooltip="Delete this" class="delete-this-color"></a><span class="product-header"></span><div class="product-color-image-front">					<span class="upload">Click or Drop to upload Front Side</span>					<input name="tmp" value="" class="tmpfront" type="hidden">					<input name="inputfront" class="inputfront" type="file">					<div class="image-holder"></div>				</div><a href="#" data-tooltip="Flip Images" class="switch"></a>				<div class="product-color-image-back">					<span class="upload">Click or Drop to upload Back Side</span>					<input name="tmp" value="" class="tmpback" type="hidden">					<input name="inputback" class="inputback" type="file">					<div class="image-holder"></div>				</div>				<div class="product-color-name">					<input class="colorname" name="colorname" placeholder="Color Name" value="" type="text">					<input type="text" value="" data-control="saturation" class="minicolors-input" size="7">				</div>			</div>';
var $real = jQuery('#real_area');
var $mediacategories = jQuery('#mediaCat :input');
var $isparent = jQuery("input[name='isparent']");
var $collapse=jQuery(".container > h1");
jQuery(".minicolors-input").minicolors({
	control : jQuery(this).attr('data-control') || 'hue',
	defaultValue : jQuery(this).attr('data-defaultValue') || '',
	inline : jQuery(this).attr('data-inline') === 'true',
	letterCase : jQuery(this).attr('data-letterCase') || 'lowercase',
	opacity : jQuery(this).attr('data-opacity'),
	position : jQuery(this).attr('data-position') || 'bottom left',
	change : function(hex, opacity) {

	},
	theme : 'default'
});
jQuery('.color-wrap').sortable({
	handle : ".product-header"
});
jQuery('#realWidth').on('change', function() {
	jQuery("#woocommerce-product-data input[name='_width']").val(parseInt(jQuery(this).val()));
});
jQuery('#realHeight').on('change', function() {
	jQuery("#woocommerce-product-data input[name='_height']").val(parseInt(jQuery(this).val()));
});
$real.on('click', function() {
	jQuery('.modal').addClass('visible');
	jQuery('#darken').fadeIn();
	real_dim();
});
$collapse.on('click', function() {
	jQuery(this).toggleClass('closed');
		jQuery(this).next().toggleClass('hidden');
	
});
$save.on('click', function() {
	if (saveto()) {
		jQuery(this).html('Saved');
	}
});
$mediacategories.on('change', function() {
	jQuery('#mediacategories').val(jQuery('.medialist :input').serialize());
});
$isparent.on('change', function() {
	var $parentsettings = jQuery('.for-parent');

	if (jQuery(this).is(":checked")) {
		$parentsettings.removeClass('hidden');
	} else {
		$parentsettings.addClass('hidden');
	}
});

$add.on('click', function() {

	$new = jQuery(".color-wrap").append($template);
	jQuery(".minicolors-input").minicolors('create');
	saveto();
});
jQuery('.color-wrap').on('click', '.delete-this-color', function(e) {
	if (jQuery('.color-wrap').children().length > 1) {

		e.preventDefault();
		jQuery(this).parent().remove();

		saveto();
	}
});
jQuery(document).ajaxStart(function() {
	jQuery("#loading").show();
});

jQuery(document).ajaxComplete(function() {
	jQuery("#loading").hide();
});
jQuery('.color-wrap').on('change', '.inputfront', function(e) {
	filePath = jQuery(this);

	handleFiles(e, filePath);

});
jQuery('#auto-width').on('click',function(e){
	e.preventDefault();
	jQuery('#displayWidth').val(jQuery(this).attr('data-width'));
	ratio = Math.round(100 * jQuery('#displayWidth').val() / topixels(jQuery('#realWidth').val(), 96)) / 100;
	jQuery('#ratio').val(ratio);
	jQuery('#displayHeight').val(Math.round(topixels(jQuery('#realHeight').val(), 96) * ratio));
});
jQuery('.color-wrap').on('change', '.inputback', function(e) {
	filePath = jQuery(this);
	handleFiles(e, filePath);
});
if(fa_settings_parent.post_id_){
	jQuery('.shortcode').append("<strong>[designer id='"+fa_settings_parent.post_id_+"']</strong>");
}
jQuery('#add-designer').click(function(e){
	var that=$(this);
							self=jQuery('#add-designer');
							e.preventDefault();
							jQuery.ajax({
									type : "POST",
									dataType : "json",
									async: true,
									url:fa_settings_parent.site_url_,
									data : {
											id :fa_settings_parent.post_id_,
											action : "create_designer_page"
											},
									success : function(data, textStatus, XMLHttpRequest) {
										that.remove();
									}
							});
						});
//ratio tools

jQuery('#displayWidth,#displayHeight').on('change', function() {
	if (jQuery(this).attr('id') == 'displayWidth') {
		ratio = Math.round(100 * jQuery('#displayWidth').val() / topixels(jQuery('#realWidth').val(), 96)) / 100;
		jQuery('#ratio').val(ratio);
		jQuery('#displayHeight').val(Math.round(topixels(jQuery('#realHeight').val(), 96) * ratio));

	} else {
		ratio = Math.round(100 * jQuery('#displayHeight').val() / topixels(jQuery('#realHeight').val(), 96)) / 100;
		jQuery('#ratio').val(ratio);
		jQuery('#displayWidth').val(Math.round(topixels(jQuery('#realWidth').val(), 96) * ratio));
	}

});
jQuery('.custom-sizes input').on('change', function() {
	if (jQuery(this).attr('name') == 'custom_catalog_width') {
		ratio = Math.round(100 * jQuery(this).val() / topixels(jQuery('#realWidth').val(), 96)) / 100;
		
		jQuery('input[name="custom_catalog_height"]').val(Math.round(topixels(jQuery('#realHeight').val(), 96) * ratio));

	} 

	if (jQuery(this).attr('name') == 'custom_single_width') {
		ratio = Math.round(100 * jQuery(this).val() / topixels(jQuery('#realWidth').val(), 96)) / 100;
		
		jQuery('input[name="custom_single_height"]').val(Math.round(topixels(jQuery('#realHeight').val(), 96) * ratio));

	}
		if (jQuery(this).attr('name') == 'custom_thumbnails_width') {
		ratio = Math.round(100 * jQuery(this).val() / topixels(jQuery('#realWidth').val(), 96)) / 100;
		
		jQuery('input[name="custom_thumbnails_height"]').val(Math.round(topixels(jQuery('#realHeight').val(), 96) * ratio));

	} 
});
jQuery('#dimensions').change(function() {
	if (!jQuery(this).is(':checked')) {
		jQuery('.custom-sizes').show();
	} else {
		jQuery('.custom-sizes').hide();
	}
});
function topixels(cm, dpi) {
	return dpi * cm / 2.54;
}

function real_dim() {
	var canvas = new fabric.Canvas('rcanvas');

	canvas.on('mouse:down', function(e) {
	//	mousedown(e);
	});
	canvas.on('mouse:move', function(e) {
	//	mousemove(e);
	});
	canvas.on('mouse:up', function(e) {
		//mouseup(e);
	});
	canvas.on('object:moving', function(e) {
		moving(e);
	});
	canvas.on('object:modified', function(e) {
		moving(e);
	});
	var canvasData = jQuery('#real_paint_area').val();
	var canvasData_b = jQuery('#real_paint_area_b').val();

	var Front=canvasData!='' ? JSON.parse(canvasData) :'';
	 fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.opacity = 1;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.borderColor = 'blue';
	
	if(canvasData_b){
		var Back=JSON.parse(canvasData_b);
	}


///jQuery('.image-wrapper img').css({width:jQuery('#displayWidth').val()+'px','height':jQuery('#displayHeight').val()+'px'})
	 // parse the data into the canvas
	 
	 try{
	  canvas.loadFromJSON(Front);
	  	a=JSON.stringify( canvas.toJSON() );
	 if(Back){
	  	b=JSON.stringify(Back);
	  }
	  canvas.renderAll();

	}catch(ex){
		console.log(ex);
	}


	var started = false;
	var x = 0;
	var y = 0;
	var inSelectMode = false;
	var a;
	var b;
	var isback=false;

	jQuery('#close_area').on('click', function() {
		jQuery(this).parent().parent().removeClass('visible').addClass('hidden');
			jQuery('#darken').fadeOut();
	});
	jQuery('#clear_area').on('click', function() {
		canvas.clear();
		jQuery('#real_paint_area').val('');
				jQuery('#real_paint_area_b').val('');

		inSelectMode = false;
		canvas.renderAll();
	});
	jQuery('#show_back').on('click', function() {
		
		var $backside=jQuery('.image-wrapper.back-side');

	if($backside.hasClass('ztop')){
		isback=false;


			 b=JSON.stringify( canvas.toJSON() );
			 canvas.clear();		 canvas.renderAll();

		jQuery(this).html('Show back side');
		$backside.removeClass('ztop');
		 canvas.loadFromJSON(JSON.parse(a));
		 canvas.renderAll();
	}else{
		isback=true;
				a=JSON.stringify( canvas.toJSON() );
			 canvas.clear();		 canvas.renderAll();

		if(typeof b!=='undefined'){
		canvas.loadFromJSON(JSON.parse(b));
		canvas.renderAll();
	}
		jQuery(this).html('Show front Side');
		$backside.addClass('ztop');
	}
		
	});
jQuery('#rcorner').on('click',function(e){
	e.stopPropagation();
	return false;
});
jQuery('#rcorner').on('change',function(e){
	e.stopPropagation();
	var roundx=jQuery('#rcorner').val() !=='' ?jQuery('#rcorner').val()  :0 ;
		var roundy=jQuery('#rcorner').val()!=='' ?jQuery('#rcorner').val()  :0 ;
	 var obj = canvas.getActiveObject();
	 if(obj){
		 obj.set('rx',roundx);
		 obj.set('ry',roundy);
		 canvas.renderAll();
		}
	return false;
});
	jQuery('#add_area').on('click', function() {
		convert_to_real($ratio.val(), Math.round(canvasData[2]), Math.round(canvasData[3]), Math.round(canvasData[0]), Math.round(canvasData[1]));
		canvas.clear();
		var roundx=jQuery('#rcorner').val() !=='' ?jQuery('#rcorner').val()  :0 ;
		var roundy=jQuery('#rcorner').val()!=='' ?jQuery('#rcorner').val()  :0 ;
		canvas.add( new fabric.Rect({ top: 0,   left: 0, width:canvas.width,height:canvas.height, scaleY: 1,  scaleX: 1, fill: '#f55',rx:roundx,ry:roundy}) );
		 canvas.renderAll();


	});



	jQuery('#add_circle').on('click', function() {
			canvas.clear();
			convert_to_real($ratio.val(), Math.round(canvasData[2]), Math.round(canvasData[3]), Math.round(canvasData[0]), Math.round(canvasData[1]));
		    canvas.add( new fabric.Circle({ top: 0, left: 0, radius: 75, fill: 'green' })	);
		    canvas.renderAll();
	});
				jQuery('#add_rounded_rentacle').on('click', function() {
					convert_to_real($ratio.val(), Math.round(canvasData[2]), Math.round(canvasData[3]), Math.round(canvasData[0]), Math.round(canvasData[1]));
					  canvas.add( new fabric.Rect({ top: 0, left: 0,width:canvas.width,height:canvas.height, fill: '#f55',rx:2,ry:2})
				);
					  canvas.renderAll();
				});
/*
	jQuery('#add_polygon').on('click', function() {
		canvas.clear();
		convert_to_real($ratio.val(), Math.round(canvasData[2]), Math.round(canvasData[3]), Math.round(canvasData[0]), Math.round(canvasData[1]));
		canvas.add( new fabric.Triangle({ top: 300, left: 210, width: 100, height: 100, fill: 'blue' })	);
		canvas.renderAll();
	});
	jQuery('#add_svg').on('click', function() {
		canvas.clear();
		convert_to_real($ratio.val(), Math.round(canvasData[2]), Math.round(canvasData[3]), Math.round(canvasData[0]), Math.round(canvasData[1]));

		    fabric.loadSVGFromURL('../assets/' + shapeName + '.svg', function(objects, options) {

			      var loadedObject = fabric.util.groupSVGElements(objects, options);
				  loadedObject.set({
			        left: coord.left,
			        top: coord.top,
			        angle: getRandomInt(-10, 10)
			      }).setCoords();
				 canvas.add(loadedObject);
			    });
	});
*/

	var moving = function(e) {

		var w = Math.abs(e.target.currentWidth), h = Math.abs(e.target.currentHeight);
		var x = e.target.left;
		var y = e.target.top;
		if (!w || !h) {
			return false;
		}

		convert_to_real($ratio.val(), x, y, w, h);
	};
	var mousedown = function(e) {
		if (inSelectMode) {
			var mouse = canvas.getPointer(e.e);
			started = true;
			x = mouse.x;
			y = mouse.y;

			var square = new fabric.Rect({
				width : 0,
				height : 0,
				left : x,
				top : y,
				opacity : 0.5,
				fill : 'yellow'
			});

			canvas.add(square);
			canvas.renderAll();
			canvas.setActiveObject(square);
		}

	};
	/* Mousemove */
	var mousemove = function(e) {
		if (inSelectMode) {
			if (!started) {
				return false;
			}

			var mouse = canvas.getPointer(e.e);

			var w = Math.abs(mouse.x - x), h = Math.abs(mouse.y - y);

			if (!w || !h) {
				return false;
			}
			convert_to_real($ratio.val(), x, y, w, h);
			var square = canvas.getActiveObject();
			square.set('width', w).set('height', h);
		}
	};
	/* Mouseup */
	var mouseup = function(e) {
		if (inSelectMode) {
			if (started) {
				started = false;
			}
			var square = canvas.getActiveObject();
			canvas.clear();
			canvas.add(square);
			canvas.renderAll();
			inSelectMode = false;
		}
	};
	var convert_to_real = function(ratio, x, y, width, height) {
		if (ratio != 0 || x!='NaN' || y!='NaN' || width !='NaN'|| height!='NaN') {
			jQuery('#real_paint_width').val(Math.round(2.54 * 10 * (width / ratio) / 96) / 10);
			jQuery('#real_paint_height').val(Math.round(2.54 * 10 * (height / ratio) / 96) / 10);
			jQuery('#real_paint_x').val(Math.round(2.54 * 10 * (x / ratio) / 96) / 10);
			jQuery('#real_paint_y').val(Math.round(2.54 * 10 * (y / ratio) / 96) / 10);
			/*jQuery('#real_paint_area').val(width + '/' + height + '/' + x + '/' + y);*/
			if(isback){
				b= JSON.stringify( canvas.toJSON() );
				jQuery('#real_paint_area_b').val(JSON.stringify( canvas.toJSON() ));
			}else{
				a = JSON.stringify( canvas.toJSON() );
				jQuery('#real_paint_area').val(JSON.stringify( canvas.toJSON() ));
			}
			
		} else {
			jQuery('#real_paint_width').val('');
			jQuery('#real_paint_height').val('');
			jQuery('#real_paint_x').val('');
			jQuery('#real_paint_y').val('');
			jQuery('#real_paint_area').val('');
		}
	};

}

function saveto() {

	var saved = [];
	jQuery.ajaxSetup({
		cache : false
	});
	jQuery('.product-color-section').each(function() {

		var newArray = [];
		var frontCache = jQuery(this).find('.tmpfront');
		var backCache = jQuery(this).find('.tmpback');
		var colorCache = jQuery(this).find('.colorname');
		var realcolorCache = jQuery(this).find('.minicolors-input');

		newArray.push(frontCache.val(), backCache.val(), colorCache.val(), realcolorCache.val());
		saved.push(newArray);

	});

	var savedJson = JSON.stringify(saved);

	if (jQuery('#allhere').val(savedJson)) {
		return true;
	}
}
function progress(n){
	if(n==1){
		jQuery('#loading').removeClass('show');
	}
}
function previewfile(file, div) {
	if (acceptedTypes[file.type] === true) {
		var reader = new FileReader();
		reader.onload = function(event) {
			var image = new Image();
			image.src = event.target.result;

			image.width = 160;
			l = '<img width="160" src="' + image.src + '"/>';

			div.next('.image-holder').html(l);
			thename = div.val();
			thename = thename.replace(/C:\\fakepath\\/i, '');
			theid = fa_settings_parent.post_id_;

			jQuery.ajax({
				type : 'POST',
				dataType : "json",
				async : true,
				url : fa_settings_parent.site_url_,
				nonce:fa_settings_parent.nonce,
				       xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    //Upload progress
                   jQuery('#loading').addClass('show');
                    xhr.upload.addEventListener("progress", function(evt) {
                        if (evt.lengthComputable) {

                            var percentComplete = evt.loaded / evt.total;
                            progress(percentComplete);
                        }
                    }, false);

                    return xhr;
                },
				data : {

					base : image.src,
					filename : thename,
					id : theid,
					action : 'upload_product_photo'
				},
				success : function(data, textStatus, XMLHttpRequest) {

					if (data.success == true) {
						div.prev('input').val(data.url);
						if (saveto()) {
							console.log('Saved');
						}
					} else {

					}
				},
				error : function(MLHttpRequest, textStatus, errorThrown) {
					alert("Error! Photo not saved")
					console.log(MLHttpRequest, textStatus, errorThrown)
				}
			});

		};

		reader.readAsDataURL(file);
	} else {
		holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size / 1024 | 0) + 'K' : '');

	}
}

function handleFiles(e, div) {
	var files = e.target.files;

	for (var i = 0; i < files.length; i++) {
		previewfile(files[i], div);
	}

}

acceptedTypes = {
	'image/png' : true,
	'image/jpeg' : true

};

/* Not the right way to do this */
