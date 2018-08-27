/*
 * jQuery.fontselect - A font selector for the Google Web Fonts api
 * Tom Moor, http://tommoor.com
 * Copyright (c) 2011 Tom Moor
 * MIT Licensed
 * @version 0.1
 */
(function ($) {

    $.fn.fontselect = function (options) {

        var __bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        };

        var fonts = ["Aclonica", "Allan", "Annie+Use+Your+Telescope", "Anonymous+Pro", "Allerta", "Amaranth", "Anton", "Architects+Daughter", "Artifika", "Asset", "Astloch", "Bangers", "Bentham", "Bevan", "Bigshot+One", "Bowlby+One", "Bowlby+One+SC", "Brawler", "Cabin", "Calligraffitti", "Candal", "Cantarell", "Cardo", "Carter One", "Caudex", "Cedarville+Cursive", "Cherry+Cream+Soda", "Chewy", "Coda", "Coming+Soon", "Copse", "Corben:700", "Cousine", "Covered+By+Your+Grace", "Crafty+Girls", "Crimson+Text", "Crushed", "Cuprum", "Damion", "Dancing+Script", "Dawning+of+a+New+Day", "Didact+Gothic", "EB+Garamond", "Expletus+Sans", "Fontdiner+Swanky", "Forum", "Francois+One", "Geo", "Give+You+Glory", "Goblin+One", "Goudy+Bookletter+1911", "Gravitas+One", "Gruppo", "Hammersmith+One", "Holtwood+One+SC", "Homemade+Apple", "Inconsolata", "Indie+Flower", "Irish+Grover", "Judson", "Jura", "Just+Another+Hand", "Just+Me+Again+Down+Here", "Kameron", "Kenia", "Kranky", "Kreon", "Kristi", "La+Belle+Aurore", "League+Script", "Lekton", "Limelight", "Lobster", "Lobster Two", "Lora", "Love+Ya+Like+A+Sister", "Loved+by+the+King", "Luckiest+Guy", "Maiden+Orange", "Mako", "Maven+Pro", "Meddon", "MedievalSharp", "Megrim", "Merriweather", "Metrophobic", "Michroma", "Miltonian Tattoo", "Miltonian", "Modern Antiqua", "Monofett", "Mountains of Christmas", "Neucha", "Neuton", "Nixie+One", "Nobile", "Nova+Square", "Nunito", "Open+Sans", "Orbitron", "Oswald", "Over+the+Rainbow", "Reenie+Beanie", "Pacifico", "Patrick+Hand", "Paytone+One", "Permanent+Marker", "Philosopher", "Playfair+Display", "Puritan", "Quattrocento", "Radley", "Raleway:100", "Redressed", "Rock+Salt", "Rokkitt", "Ruslan+Display", "Schoolbell", "Shadows+Into+Light", "Shanti", "Sigmar+One", "Six+Caps", "Slackey", "Smythe", "Sniglet:800", "Special+Elite", "Stardos+Stencil", "Sue+Ellen+Francisco", "Sunshiney", "Swanky+and+Moo+Moo", "Syncopate", "Tangerine", "Tenor+Sans", "Terminal+Dosis+Light", "The+Girl+Next+Door", "Tinos", "Ultra", "Unkempt", "UnifrakturCook:bold", "UnifrakturMaguntia", "Varela", "Varela Round", "Vibur", "Waiting+for+the+Sunrise", "Wallpoet", "Walter+Turncoat", "Wire+One", "Yanone+Kaffeesatz", "Yeseva+One", "Zeyada"];

        var settings = {
            style: 'font-select',
            placeholder: '<i class="icon-chevron-down"></i>Select a font',
            lookahead: 2,
            api: 'https://fonts.googleapis.com/css?family='
        };

        var Fontselect = (function () {

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


            Fontselect.prototype.bindEvents = function () {

                $('li', this.$results).click(__bind(this.selectFont, this)).mouseenter(__bind(this.activateFont, this)).mouseleave(__bind(this.deactivateFont, this));

                $('span', this.$select).click(__bind(this.toggleDrop, this));
                this.$arrow.click(__bind(this.toggleDrop, this));
            };

            Fontselect.prototype.toggleDrop = function (ev) {

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

            Fontselect.prototype.selectFont = function () {

                var font = $('li.active', this.$results).data('value');
                this.$original.val(font).change();
                this.updateSelected();
                this.toggleDrop();
            };

            Fontselect.prototype.moveToSelected = function () {

                var $li, font = this.$original.val();

                if (font) {
                    $li = $("li[data-value='" + font + "']", this.$results);
                } else {
                    $li = $("li", this.$results).first();
                }

                this.$results.scrollTop($li.addClass('active').position().top);
            };

            Fontselect.prototype.activateFont = function (ev) {
                $('li.active', this.$results).removeClass('active');
                $(ev.currentTarget).addClass('active');
            };

            Fontselect.prototype.deactivateFont = function (ev) {

                $(ev.currentTarget).removeClass('active');
            };

            Fontselect.prototype.updateSelected = function () {

                var font = this.$original.val();
                $('span', this.$element).text(this.toReadable(font)).css(this.toStyle(font));
            };

            Fontselect.prototype.setupHtml = function () {

                this.$original.empty().hide();
                this.$element = $('<div>', {
                    'class': this.options.style
                });
                this.$arrow = $('<div><b></b></div>');
                this.$select = $('<a><span>' + this.options.placeholder + '</span></a>');
                this.$drop = $('<div>', {
                    'class': 'fs-drop dropdown-menu'
                });
                this.$results = $('<ul>', {
                    'class': 'fs-results'
                });
                this.$original.after(this.$element.append(this.$select.append(this.$arrow)).append(this.$drop));
                this.$drop.append(this.$results.append(this.fontsAsHtml())).hide();
            };

            Fontselect.prototype.fontsAsHtml = function () {

                var l = fonts.length;
                var r, s, h = '';

                for (var i = 0; i < l; i++) {
                    r = this.toReadable(fonts[i]);
                    s = this.toStyle(fonts[i]);
                    h += '<li data-value="' + fonts[i] + '" style="font-family: ' + s['font-family'] + ';">' + r + '</li>';
                }

                return h;
            };

            Fontselect.prototype.toReadable = function (font) {
                return font.replace(/[\+|:]/g, ' ');
            };

            Fontselect.prototype.toStyle = function (font) {
                var t = font.split(':');
                return {
                    'font-family': this.toReadable(t[0]),
                    'font-weight': (t[1] || 400)
                };
            };

            Fontselect.prototype.getVisibleFonts = function () {

                if (this.$results.is(':hidden'))
                    return;

                var fs = this;
                var top = this.$results.scrollTop();
                var bottom = top + this.$results.height();

                if (this.options.lookahead) {
                    var li = $('li', this.$results).first().height();
                    bottom += li * this.options.lookahead;
                }

                $('li', this.$results).each(function () {

                    var ft = $(this).position().top + top;
                    var fb = ft + $(this).height();

                    if ((fb >= top) && (ft <= bottom)) {
                        var font = $(this).data('value');
                        fs.addFontLink(font);
                    }

                });
            };

            Fontselect.prototype.addFontLink = function (font) {

                var link = this.options.api + font;

                if ($("link[href*='" + font + "']").length === 0) {
                    $('link:last').after('<link href="' + link + '" rel="stylesheet" type="text/css">');

                }
            };

            return Fontselect;
        })();

        return this.each(function (options) {
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
var lineW,lineH;
$(document).ready(function () {


    var productFront = $('#tshirtFacing').data('front');
    var productBack = $('#tshirtFacing').data('back');
    
    if (productBack == '') {
        hasback = 0;
        $('#flip').remove();
    }
    $('.handle').on('click', function () {
        if ($(this).data('close') == '0') {

            $('.tool-container').addClass('closeme');
            $('.widget *').removeClass('vis');
            $(this).data('close', '1');
        } else {

            $('.tool-container').removeClass('closeme');
            $(this).data('close', '0');
        }

    });
    $('.widget > h3').on('click', function () {

        if ($(this).data('save')) {

        } else {
            $('.tool-container').removeClass('closeme');
            $('.widget > div').removeClass('vis');
            $(this).next().addClass('vis');
        }

    });
    $('.goback').on('click', function () {
        $('#accorde > h3').removeClass('bye');
        $(this).parent().removeClass('vis');
    });
	$('.flipper img').on('dragstart', function(event) { event.preventDefault(); });
    $("#orderitajax").click(function (e) {

        $('#drawingArea').css('visibility', 'hidden');
        e.preventDefault();

        current = JSON.stringify(canvas);
        obj = JSON.parse(current);

        if (!a && !b && obj.objects.length == 0) {

            // If product has no designs

            $('#drawingArea').css('visibility', 'visible');
            $('#render').fadeOut(300);

        } else {

            flip(productFront, productBack, canvas);
		   if ((a && b) && hasback != 0) {
                canvas.deactivateAll().renderAll();
                front = JSON.stringify(a);
                back = JSON.stringify(b);
                $color = canvas.backgroundColor;
                canvas.loadFromJSON(a, function () {
                    $('#shirtDiv').data('holdera', canvas.toDataURL('jpg'));
                    canvas.loadFromJSON(b, function () {
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
                    canvas.loadFromJSON(a, function () {
                        canvas.deactivateAll().renderAll();
                        $('#shirtDiv').data('holder', canvas.toDataURL('jpg'));
                        sendAjax($color, type = '', $('#shirtDiv').data('holder'), '', front, back);
                    });

                } else if (b) {

                    back = JSON.stringify(b);
                    front = '';
                    canvas.loadFromJSON(b, function () {
                        canvas.deactivateAll().renderAll();
                        $('#shirtDiv').data('holder', canvas.toDataURL('jpg'));
                        sendAjax($color, type = '', '', $('#shirtDiv').data('holder'), front, back);
                    });

                }

            }
        }
    });

    $('#font-family').fontselect().change(function () {
        var font = $(this).val().replace(/\+/g, ' ');
        setFont(font);
    });

    canvas = new fabric.Canvas('tcanvas');

    canvas.on({
        'object:selected': onObjectSelected,
        'selection:cleared': onSelectedCleared,
        'object:moving': onObjectMoving,
        'mouse:up': onMouseUp
        /*,
		 'object:added' : onObjectAdded*/
    });

    
	$('#backgrounds').hover(function(){
		$(this).children('ul.sub-menu').css('display','block');
	}, function(){
    
		$(this).children('ul.sub-menu').css('display','none');
    
    });
	
    $("#strokecolor").minicolors({
        swatchPosition: 'left',
        change: function (hex, rgb) {
            var activeObject = canvas.getActiveObject();
            if (activeObject /* && activeObject.type === 'text'*/ ) {
                activeObject.stroke = this.value;

                canvas.renderAll();
            }

        },
        open: function (hex, rgb) {
            //
        },
        close: function (hex, rgb) {
            //
        }
    });

    $('.slider').slider({
        min: 0,
        max: 50,
        change: function (ui) {
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
                    activeObject.stroke=$("#strokecolor").minicolors("value");
                    if (activeObject.type === "text") {
                        _val = _val / 4;
                    }
                    activeObject.strokeWidth = _val;
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
    canvas.freeDrawingCursor = 'url("icon-pencil.png") 0 30,crosshair';

    $('#paint-tools .rect').on('click', function () {
        canvas.isDrawingMode = false;
        var top = canvas.height / 2 - 100;
        var left = canvas.width / 2 - 50;
        var rect = new fabric.Rect(defaultArray(top, left, 100, 100));
        rect.fill = getCurrentColor();
        canvas.add(rect);
        canvas.renderAll();
    });
    $('#paint-tools .circle').on('click', function () {
    	
        canvas.isDrawingMode = false;
        var left = canvas.width / 2 - 100;
        var top = canvas.height / 2 - 100;
        var circle = new fabric.Circle({
            left: left,
            top: top,
            radius: 50
        });
        circle.fill = getCurrentColor();
        canvas.add(circle);
        canvas.renderAll();
    });

    drawingModeEl.on('click', function () {
        canvas.isDrawingMode = !canvas.isDrawingMode;

        canvas.freeDrawingBrush.color = getCurrentColor();

        canvas.freeDrawingBrush.width = parseInt($('#drawing-line-width').val());

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

    $('#add-text').on('click', function () {
        var text = $("#text-string").val();
        var left = canvas.width / 2;
        var top = canvas.height / 2;
        var textSample = new fabric.Text(text, {
            left: left,
            top: top,

            angle: 0

        });
        textSample.fontFamily = $('#font-family').val().replace(/\+/g, ' ') ? $('#font-family').val().replace(/\+/g, ' ') : 'arial';
        textWidth = textSample.currentWidth;
        textHeight = textSample.currentHeight;
        textSample.left = textSample.left - textWidth / 2;
        textSample.top = textSample.top - textHeight / 2;
        textSample.fill = getCurrentColor();

        canvas.add(textSample);

        //canvas.item(canvas.item.length - 1).hasRotatingPoint = true;
        canvas.renderAll();
    });
    $("#text-string").keyup(function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.text = this.value;
            canvas.renderAll();
        }
    });

    //addProduct(productFront, canvas);

    $(".photo img").click(function (e) {
        var path = $(this).data('full');
        var svg = path.split('.').pop();
        if (svg == 'svg') {
            addSvg(path);
        } else {
            addImage(path);
        }
    });
    $('#remove-selected').click(function () {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeObject) {
            canvas.remove(activeObject);
            //	$('#layers ul').find('li#' + activeObject.id).remove();
            $("#text-string").val("");

        } else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function (object) {
                canvas.remove(object);
                //	$('#layers ul').find('li#' + object.id).remove();
            });
        }
    });
    $('#bring-to-front').click(function () {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeObject) {
            activeObject.bringToFront();
        } else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function (object) {
                object.bringToFront();
            });
        }
    });
    $('#send-to-back').click(function () {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeObject) {
            activeObject.sendToBack();
        } else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function (object) {
                object.sendToBack();
            });
        }
    });
    $("#text-bold").click(function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');
            canvas.renderAll();
        }
    });
    $("#text-italic").click(function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');
            canvas.renderAll();
        }
    });
    $("#text-strike").click(function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
            canvas.renderAll();
        }
    });

    $("#text-underline").click(function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
            canvas.renderAll();
        }
    });
    $("#text-align-left").click(function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.textAlign = 'left';
            canvas.renderAll();
        }
    });
    $("#text-align-center").click(function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.textAlign = 'center';
            canvas.renderAll();
        }
    });

    $("#text-align-right").click(function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.textAlign = 'right';
            canvas.renderAll();
        }
    });
    $("#font-family").change(function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            aactiveObject.fontFamily = $('#font-family').val().replace(/\+/g, ' ') ? $('#font-family').val().replace(/\+/g, ' ') : 'arial';
            canvas.renderAll();
        }
    });

    $('#text-fontcolor').minicolors({
        swatchPosition: 'left',
        change: function (hex, rgb) {
            var activeObject = canvas.getActiveObject();
            if (activeObject /* && activeObject.type === 'text'*/ ) {
                activeObject.fill = this.value;
                canvas.renderAll();
            }

        },
        open: function (hex, rgb) {
            //
        },
        close: function (hex, rgb) {
            //
        }
    });
    $('#upload-input').on('change', function (e) {

        handleFiles(e);

    });
    $('#backgrounds a').on('click', function (e) {
        e.preventDefault();
        $('#backgrounds a').removeClass('selected');
        $(this).toggleClass('selected');
        var front = $(this).data('front');
        var back = $(this).data('back');
        var id = $(this).data('id');

        var width = $('.flipper > img').css('width');
        var height = $('.flipper > img').css('height');
        var innerHtml = '<img style="height:' + height + '!important;width:' + width + '!important;" src="' + front + '"/><img style="height:' + height + '!important;width:' + width + '!important;" src="' + back + '"/>';
        $('#backgrounds').css('background-color', $(this).css('background-color'));
        $('#tshirtFacing').data('front', front);
        $('#tshirtFacing').data('back', back);

        $('.flipper').html(innerHtml);

    });

    /*drag stuff*/
    var links = document.querySelectorAll(".img-polaroid"),
        el = null;

    for (var i = 0; i < links.length; i++) {
        el = links[i];
        el.setAttribute("draggable", "true");
        addEvent(el, "dragstart", function (e) {
            e.dataTransfer.effectAllowed = "copy";
            e.dataTransfer.setData("Text", this.src);
        });
    }
    var bin = document.querySelector(".canvas-container");

    addEvent(bin, "dragover", function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        this.className = "over";
        e.dataTransfer.dropEffect = "copy";
        return false;
    });
    addEvent(bin, "dragenter", function (e) {
        this.className = "";
        return false;
    });
    addEvent(bin, "dragleave", function () {
        this.className = "";
    });
    addEvent(bin, "drop", function (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        this.className = "";
        e.stopPropagation();
        e.preventDefault();
        if (e.dataTransfer.files[0]) {
            //	handleFiles(e.dataTransfer.files[0]);
            handleFiles(e.dataTransfer.files[0], true);
        } else {
            var el = e.dataTransfer.getData("Text");

            dropthat(el, e.clientX - 140, e.clientY - 140);
        }

        return false;
    });
    /*drag stuff end*/

    $('#flip').on('click', function () {
        $(this).toggleClass('selected');
        flip(productFront, productBack, canvas);
    });
});

function flip(productFront, productBack, canvas) {
    if (hasback == 1) {
        if ($('#flip').attr("data-original") == "back") {

            $('#flip').attr('data-original', 'front');
            a = JSON.stringify(canvas);

            $('#tshirtFacing').addClass('flip');

            canvas.clear();

            canvas.renderAll();
            try {
                var json = JSON.parse(b);
                canvas.loadFromJSON(b);
                canvas.renderAll();
            } catch (e) {}

            canvas.renderAll();
            setTimeout(function () {
                canvas.calcOffset();
                canvas.renderAll();
            }, 200);

        } else {
            $('#tshirtFacing').removeClass('flip');
            $('#flip').attr('data-original', 'back');
            b = JSON.stringify(canvas);
            canvas.clear();
            canvas.renderAll();
            try {
                var json = JSON.parse(a);
                canvas.loadFromJSON(a);
                canvas.renderAll();
            } catch (e) {}

            canvas.renderAll();
            setTimeout(function () {
                canvas.calcOffset();
                canvas.renderAll();
            }, 200);

        }
    }
}

function initCustomization() {
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.opacity = 1;
    fabric.Object.prototype.cornerColor = fa_settings.setting_corner_color_;
    fabric.Object.prototype.borderColor = fa_settings.setting_border_color_;
    fabric.Object.prototype.hasRotatingPoint = false;
    fabric.Object.prototype.cornerSize = 10;
    if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
        fabric.Object.prototype.cornerSize = 30;
    }

}

function handleFiles(e, isDragged) {
    if (isDragged == true) {
        var reader = new FileReader;
        reader.onload = function (event) {
            var img = new Image;
            img.src = event.target.result;
            img.onload = function () {
                var srcFull = img.src;
                var srcName = srcFull.replace(/^.*[\\\/]/, '');
                var postid = $('#').data('Id');

                jQuery.ajax({
                    type: 'POST',
                    dataType: "json",
                    async: true,
                    url: fa_settings.site_url_ + '/wp-admin/admin-ajax.php',
                    data: {
                        base: this.src,
                        filename: thename,
                        id: postid,
                        action: 'up_app_product'
                    },
                    success: function (data, textStatus, XMLHttpRequest) {
                        console.log(data);
                        if (data.success == true) {
                            var offset = 50;
                            var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
                            var top = fabric.util.getRandomInt(0 + offset, 400 - offset);

                            fabric.Image.fromURL(data.url, function (image) {
                                image.set(defaultArray(top, left));
                                image.scale(getRandomNum(0.2, 0.45)).setCoords();
                                canvas.add(image);
                            });
                        }
                    },
                    error: function (MLHttpRequest, textStatus, errorThrown) {

                    }
                });

            };
        };

        reader.readAsDataURL(e);
    } else {
        var files = e.target.files;
        for (var i = 0, file; file = files[i]; i++) {
            var reader = new FileReader;
            reader.onload = function (event) {
                var img = new Image;
                img.src = event.target.result;
                img.onload = function () {
                    var offset = 50;
                    var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
                    var top = fabric.util.getRandomInt(0 + offset, 400 - offset);
                    var angle = fabric.util.getRandomInt(-20, 40);
                    var width = fabric.util.getRandomInt(30, 50);

                    fabric.Image.fromURL(this.src, function (image) {
                        image.set(defaultArray(top, left));
                        canvas.add(image);
                        /*	image.perPixelTargetFind = true;
						 image.targetFindTolerance = 4;*/
                    });
                };
            };
            reader.readAsDataURL(e.target.files[i]);
        }
    }
}

var getObjectById = function (id) {
    var objsInCanvas = canvas.getObjects();
    for (obj in objsInCanvas) {
        if (objsInCanvas[obj].get('id') == id) {
            return objsInCanvas[obj];
        }
    }
};
var addEvent = function () {
    if (document.addEventListener) {
        return function (el, type, fn) {
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
        return function (el, type, fn) {
            if (el && el.nodeName || el === window) {
                el.attachEvent("on" + type, function () {
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

function onMouseUp() {
    if (lineW || lineH) {
        canvas.remove(lineW);
        canvas.remove(lineH);
    }
    lineAdded = false;
    canvas.renderAll();
}

function onObjectMoving(e) {

    if (lineAdded == false) {
        var middleW = canvas.width / 2;
        var middleH = canvas.height / 2;

        lineW = new fabric.Line([middleW, 0, middleW, canvas.height], {
            stroke: 'magenta',
            strokeWidth:1,
            selectable: false
        });
        lineH = new fabric.Line([0, middleH, canvas.width, middleH], {
            stroke: 'magenta',
            strokeWidth:1,
            selectable: false
        });  
        canvas.add(lineW);
         
        canvas.add(lineH);
        canvas.calcOffset();
        canvas.renderAll();
        lineAdded = true;
    }
}
function onSelectedCleared(e){
    	
}
function onObjectSelected(e) {
    var selectedObject = e.target;
    selectedObject.hasRotatingPoint = true;

    if (!selectedObject.stroke) {
       
    } else {
       $('.slider').slider('value', selectedObject.strokeWidth);
    }
    if (selectedObject && selectedObject.type === 'text'){ 
        $("#text-string").val(selectedObject.getText());
        if (selectedObject.originalState.fill) {
        	
            $('#text-fontcolor').minicolors('value', selectedObject.originalState.fill);
        }
        if (selectedObject.stroke) {
            $('#strokecolor').minicolors('value', selectedObject.stroke);
        }
    }else if(selectedObject && (selectedObject.type === 'rect' || selectedObject.type === 'cicle' || selectedObject.type === 'path')){
        if (selectedObject.fill) {
           $('#text-fontcolor').minicolors('value', selectedObject.fill);
     	}
        if (selectedObject.stroke) {
            $('#strokecolor').minicolors('value', selectedObject.stroke);
        }
    }
}

function defaultArray(top, left, width, height) {

    if (width || height) {
        return {
            left: left,
            top: top,
            width: width,
            height: height
            };
    } else {

        return {
            left: left,
            top: top
        };
    }
}



function setFont(font) {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
        activeObject.fontFamily = font;
        activeObject.setCoords();
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

    var left = x;
    var top = y;

    fabric.Image.fromURL(e, function (image) {
        image.set(defaultArray(top, left));
        image.setCoords();
        canvas.add(image);
    });
}

function getCurrentColor() {
    if ($('#text-fontcolor').minicolors()) {
        return $('#text-fontcolor').val();
    } else {
        return '#333333';
    }
}

function addSvg(e) {
	 var group = [];
    fabric.loadSVGFromURL(e, function (objects, options) {

        var loadedObject = fabric.util.groupSVGElements(objects, options);

		
        var loadedObjects = new fabric.Group(group);
	
        loadedObject.set(defaultArray(100, 100));
	  
        canvas.add(loadedObject);  
		
        canvas.renderAll();
      
    });
}

function addImage(e) {

    var left = canvas.width / 2;
    var top = canvas.height / 2;
	var ratio= left/top;
    fabric.Image.fromURL(e, function (image) {
        image.set({top:top,left:left,scaleX:ratio,scaleY:ratio});
        canvas.add(image);
        canvas.renderAll();
    });

}

function sendAjax(color, type, imgf, imgb, front, back) {
    //	color = "transparent";

    $.ajax({
        type: 'POST',
        dataType: "json",
        url: fa_settings.site_url_ + '/wp-admin/admin-ajax.php',
        data: {
            //color : color,
            type: $('#tshirtFacing').data('id'),
            front_base: $('#tshirtFacing').data('front'),
            back_base: $('#tshirtFacing').data('back'),
            image_f: imgf,
            image_b: imgb,
            action: 'update_the_product',
            jsonstufff: front,
            jsonstuffb: back
        },
        beforeSend: function (x) {
            if (x && x.overrideMimeType) {
                x.overrideMimeType("application/json;charset=UTF-8");
            }
        },
        success: function (data, textStatus, XMLHttpRequest) {
            if (data.success == true) {
                window.location = data.message;
                //	console.log(data);
            } else {

            }
        },
        error: function (MLHttpRequest, textStatus, errorThrown) {

        }
    });

}

function dblClickHandler() {
    var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveGroup();
    if (activeObject) {
        activeObject.sendToBack();
    } else {
        if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function (object) {
                object.sendToBack();
            });
        }
    }
}

function cache() {
    canvas.forEachObject(function (obj, i) {
        if (obj.type === 'image')
            return;

        var scaleX = obj.scaleX;
        var scaleY = obj.scaleY;

        canvas.remove(obj);
        obj.scale(1).cloneAsImage(function (clone) {
            clone.set({
                left: obj.left,
                top: obj.top,
                scaleX: scaleX,
                scaleY: scaleY
            });
            canvas.insertAt(clone, i);
            // animate(clone);
        });
    });
}