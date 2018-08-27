/**
 * Simple Carousel
 * Copyright (c) 2010 Tobias Zeising, http://www.aditu.de
 * Licensed under the MIT license
 * 
 * http://code.google.com/p/simple-carousel/
 * Version 0.3
 */
(function($){
$.fn.simplecarousel = function( params ) {
    // set config
    var defaults = {
        width: 700,
        height: 100,
        next: false,
        prev: false,
        vertical: false,
        auto: false,
        fade: false,
        current: 0,
        items: 0,
        slidespeed: 600,
        visible: 1,
        pagination: false,
        paginationItem: function( index ) {
            return '';
        },
        pauseOnClick: false
    };
    var config = $.extend(defaults, params);
    
    // configure carousel ul and li
    var ul = $(this);
    var li = ul.children('li');

    if(config.pauseOnClick) {
        li.bind('click', function () {
            config.auto = false;
        });
    }
    
    config.items = li.length;
    
    var height = config.height;
    var width = config.width;
    
    ul.wrap('<div class="carousel-frame" style="overflow:hidden">');
    var container = ul.parent('.carousel-frame');
    if(!config.vertical) {
        ul.width((config.items*config.width));
        ul.height(config.height);
    } else {
        ul.width(config.width);
        ul.height(config.items*config.height);
    }
    ul.css('overflow','hidden');
    
    li.each(function(i,item) {
        $(item).width(config.width);
        $(item).height(config.height);
       if(!config.vertical)
           $(item).css('float','left');
    });
    
    // function for sliding the carousel
    var slide = function(dir, click) {
        var point=Math.abs(ul.css('margin-left').split('p')[0]);
        if(typeof click == "undefined" & config.auto==false)
            return;
    
        if(dir=="next") {
             if((point==0 && dir=='prev') || (point==(config.width*(config.items - 2) )/2 && dir=='next') ){
                      
              }else{
                      config.current += config.visible;
              }
      

            if(config.current>=config.items)
                config.current = 0;

        } else if(dir=="prev") {
              if((point==0 && dir=='prev') || (point==(config.width*(config.items - 2) )/2 && dir=='next') ){
                      
              }else{
                 config.current -= config.visible;
  }
           if (config.current < 0) 
            config.current = (config.visible == 1) ? config.items - 1 : config.items - 2 * config.visible + (config.visible - (config.items % config.visible)); 
                if(config.current == config.items){
                 
                    config.current = config.items-config.visible;
                }
        } else {
            config.current = dir;
        }
        
        // set pagination
        if(config.pagination != false) {
            container.next('.carousel-pagination').find('li').removeClass('carousel-pagination-active')
            container.next('.carousel-pagination').find('li:nth-child('+(config.current+1)+')').addClass('carousel-pagination-active');
            
        }
        
        // fade
        if(config.fade!=false) {
            ul.fadeOut(config.fade, function() {
                ul.css({marginLeft: -1.0*config.current*config.width});
                ul.fadeIn(config.fade);
            });
            
        // slide
        } else {
            if(!config.vertical){
              
         
               
                if((point==0 && dir=='prev') || (point==(config.width*(config.items - 2) )/2 && dir=='next') ){
                     
                     //nothing
                }else{
               ul.animate( {marginLeft: -1.0*config.current*config.width}, config.slidespeed );
             
                }
       
            } else{
                ul.animate( {marginTop: -1.0*config.current*config.height}, config.slidespeed );
            }
        }
        
        if(typeof click != "undefined")
            config.auto = false;
        
        if(config.auto!=false)
            setTimeout(function() {
                slide('next');
            }, config.auto);
    }
    
    // include pagination
    if(config.pagination != false) {
        container.after('<ul class="carousel-pagination"></ul>');
        var pagination = container.next('.carousel-pagination');
        for(var i=0;i<config.items;i++) {
            if(i==0)
                pagination.append('<li class="carousel-pagination-active">' + config.paginationItem(i + 1) + '</li>');
            else
                pagination.append('<li>' + config.paginationItem(i + 1) + '</li>');
        }

        pagination.find('li').each(function(index, item) {
            $(this).click(function() {
                slide(index,true);
            });
        });
    }
        
    // set event handler for next and prev
    if(config.next!=false)
        config.next.click(function() {
            slide('next',true);
        });
        
        
    if(config.prev!=false)
        config.prev.click(function() {
            slide('prev',true);
        });
    
    // start auto sliding
    if(config.auto!=false)
        setTimeout(function() {
            slide('next');
        }, config.auto);
}
})(jQuery);

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

(function(global){

    "use strict";

    var fabric=global.fabric||(global.fabric={}),
            extend=fabric.util.object.extend,
            clone=fabric.util.object.clone;

    if(fabric.CurvedText){
        fabric.warn('fabric.CurvedText is already defined');
        return;
    }
    var stateProperties=fabric.Text.prototype.stateProperties.concat();
    stateProperties.push(
            'radius',
            'spacing',
            'reverse',
            'effect',
            'range',
            'largeFont',
            'smallFont'
            );
    var _dimensionAffectingProps=fabric.Text.prototype._dimensionAffectingProps;
    _dimensionAffectingProps['radius']=true;
    _dimensionAffectingProps['spacing']=true;
    _dimensionAffectingProps['reverse']=true;
    _dimensionAffectingProps['fill']=true;
    _dimensionAffectingProps['effect']=true;
    _dimensionAffectingProps['width']=true;
    _dimensionAffectingProps['height']=true;
    _dimensionAffectingProps['range']=true;
    _dimensionAffectingProps['fontSize']=true;
    _dimensionAffectingProps['shadow']=true;
    _dimensionAffectingProps['largeFont']=true;
    _dimensionAffectingProps['smallFont']=true;


    var delegatedProperties=fabric.Group.prototype.delegatedProperties;
    delegatedProperties['backgroundColor']=true;
    delegatedProperties['textBackgroundColor']=true;
    delegatedProperties['textDecoration']=true;
    delegatedProperties['stroke']=true;
    delegatedProperties['strokeWidth']=true;
    delegatedProperties['shadow']=true;

    /**
     * Group class
     * @class fabric.CurvedText
     * @extends fabric.Text
     * @mixes fabric.Collection
     */
    fabric.CurvedText=fabric.util.createClass(fabric.Text, fabric.Collection, /** @lends fabric.CurvedText.prototype */ {
        /**
         * Type of an object
         * @type String
         * @default
         */
        type: 'curvedText',
        /**
         * The radius of the curved Text
         * @type Number
         * @default 50
         */
        radius: 50,
        /**
         * Special Effects, Thanks to fahadnabbasi
         * https://github.com/EffEPi/fabric.curvedText/issues/9
         */
        range: 5,
        smallFont: 10,
        largeFont: 30,
        effect: 'curved',
        /**
         * Spacing between the letters
         * @type fabricNumber
         * @default 0
         */
        spacing: 0,
//      letters: null,

        /**
         * Reversing the radius (position of the original point)
         * @type Boolead
         * @default false
         */
        reverse: false,
        /**
         * List of properties to consider when checking if state of an object is changed ({@link fabric.Object#hasStateChanged})
         * as well as for history (undo/redo) purposes
         * @type Array
         */
        stateProperties: stateProperties,
        /**
         * Properties that are delegated to group objects when reading/writing
         * @param {Object} delegatedProperties
         */
        delegatedProperties: delegatedProperties,
        /**
         * Properties which when set cause object to change dimensions
         * @type Object
         * @private
         */
        _dimensionAffectingProps: _dimensionAffectingProps,
        /**
         *
         * Rendering, is we are rendering and another rendering call is passed, then stop rendering the old and
         * rendering the new (trying to speed things up)
         */
        _isRendering: 0,
        /**
         * Added complexity
         */
        complexity: function(){
            this.callSuper('complexity');
        },
        initialize: function(text, options){
            options||(options={});
            this.letters=new fabric.Group([], {
                selectable: false,
                padding: 0
            });
            this.__skipDimension=true;
            this.setOptions(options);
            this.__skipDimension=false;
//          this.callSuper('initialize', options);
            this.setText(text);
        },
        setText: function(text){
            if(this.letters){
                while(text.length!==0&&this.letters.size()>=text.length){
                    this.letters.remove(this.letters.item(this.letters.size()-1));
                }
                for(var i=0; i<text.length; i++){
                    //I need to pass the options from the main options
                    if(this.letters.item(i)===undefined){
                        this.letters.add(new fabric.Text(text[i]));
                    }else{
                        this.letters.item(i).setText(text[i]);
                    }
                }
            }
            this.callSuper('setText', text);
        },
        _initDimensions: function(ctx){
            // from fabric.Text.prototype._initDimensions
            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            if (this.__skipDimension) {
                return;
            }
            if (!ctx) {
                ctx = fabric.util.createCanvasElement().getContext('2d');
                this._setTextStyles(ctx);
            }
            this._textLines = this.text.split(this._reNewline);
            this._clearCache();
            var currentTextAlign = this.textAlign;
            this.textAlign = 'left';
            this.width = this._getTextWidth(ctx);
            this.textAlign = currentTextAlign;
            this.height = this._getTextHeight(ctx);
            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            this._render(ctx);
        },
        _render: function(ctx){
            var renderingCode=fabric.util.getRandomInt(100, 999);
            this._isRendering=renderingCode;
            if(this.letters){
                var curAngle=0,
                        curAngleRotation = 0,
                        angleRadians=0,
                        align=0,
                        textWidth=0,
                        space = parseInt(this.spacing),
                        fixedLetterAngle=0;
                
                //get text width
                if (this.effect=='curved') {
                    for(var i=0, len=this.text.length; i<len; i++){
                        textWidth += this.letters.item(i).width + space;
                    }
                    textWidth -= space;
                } else if (this.effect=='arc') {
                    fixedLetterAngle = ((this.letters.item(0).fontSize + space) / this.radius) / (Math.PI/180);
                    textWidth = ((this.text.length+1) * (this.letters.item(0).fontSize + space));
                }
                // Text align
                if(this.get('textAlign')==='right'){
                    curAngle = 90-(((textWidth/2)/ this.radius) / (Math.PI/180));
                }else if(this.get('textAlign')==='left'){
                    curAngle = -90-(((textWidth/2)/ this.radius) / (Math.PI/180));
                } else {
                    curAngle = -(((textWidth/2)/ this.radius) / (Math.PI/180));
                }
                if (this.reverse) curAngle = -curAngle;

                var width=0,
                        multiplier=this.reverse?-1:1,
                        thisLetterAngle = 0,
                        lastLetterAngle = 0;

                for(var i=0, len=this.text.length; i<len; i++){
                    if(renderingCode!==this._isRendering)
                        return;

                    for(var key in this.delegatedProperties){
                        this.letters.item(i).set(key, this.get(key));
                    }
                    
                    this.letters.item(i).set('left', (width));
                    this.letters.item(i).set('top', (0));
                    this.letters.item(i).setAngle(0);
                    this.letters.item(i).set('padding', 0);

                    if(this.effect==='curved'){
                        thisLetterAngle = ((this.letters.item(i).width + space) / this.radius) / (Math.PI/180);
                        curAngleRotation = multiplier * ((multiplier * curAngle) + lastLetterAngle + (thisLetterAngle/2));
                        curAngle = multiplier * ((multiplier * curAngle) + lastLetterAngle);
                        angleRadians=curAngle*(Math.PI/180);
                        lastLetterAngle = thisLetterAngle;

                        this.letters.item(i).setAngle(curAngleRotation);
                        this.letters.item(i).set('top', multiplier*-1*(Math.cos(angleRadians)*this.radius));
                        this.letters.item(i).set('left', multiplier*(Math.sin(angleRadians)*this.radius));
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set('selectable', false);
                        
                    }else if(this.effect==='arc'){//arc
                        curAngle = multiplier * ((multiplier * curAngle) + fixedLetterAngle);
                        angleRadians=curAngle*(Math.PI/180);

                        this.letters.item(i).set('top', multiplier*-1*(Math.cos(angleRadians)*this.radius));
                        this.letters.item(i).set('left', multiplier*(Math.sin(angleRadians)*this.radius));
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set('selectable', false);
                    }else if(this.effect==='STRAIGHT'){//STRAIGHT
                        //var newfont=(i*5)+15;
                        //this.letters.item(i).set('fontSize',(newfont));
                        this.letters.item(i).set('left', (width));
                        this.letters.item(i).set('top', (0));
                        this.letters.item(i).setAngle(0);
                        width+=this.letters.item(i).get('width');
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set({
                            borderColor: 'red',
                            cornerColor: 'green',
                            cornerSize: 6,
                            transparentCorners: false
                        });
                        this.letters.item(i).set('selectable', false);
                    }else if(this.effect==='smallToLarge'){//smallToLarge
                        var small=parseInt(this.smallFont);
                        var large=parseInt(this.largeFont);
                        //var small = 20;
                        //var large = 75;
                        var difference=large-small;
                        var center=Math.ceil(this.text.length/2);
                        var step=difference/(this.text.length);
                        var newfont=small+(i*step);

                        //var newfont=(i*this.smallFont)+15;

                        this.letters.item(i).set('fontSize', (newfont));

                        this.letters.item(i).set('left', (width));
                        width+=this.letters.item(i).get('width');
                        //this.letters.item(i).set('padding', 0);
                        /*this.letters.item(i).set({
                         borderColor: 'red',
                         cornerColor: 'green',
                         cornerSize: 6,
                         transparentCorners: false
                         });*/
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set('selectable', false);
                        this.letters.item(i).set('top', -1*this.letters.item(i).get('fontSize')+i);
                        //this.letters.width=width;
                        //this.letters.height=this.letters.item(i).get('height');

                    }else if(this.effect==='largeToSmallTop'){//largeToSmallTop
                        var small=parseInt(this.largeFont);
                        var large=parseInt(this.smallFont);
                        //var small = 20;
                        //var large = 75;
                        var difference=large-small;
                        var center=Math.ceil(this.text.length/2);
                        var step=difference/(this.text.length);
                        var newfont=small+(i*step);
                        //var newfont=((this.text.length-i)*this.smallFont)+12;
                        this.letters.item(i).set('fontSize', (newfont));
                        this.letters.item(i).set('left', (width));
                        width+=this.letters.item(i).get('width');
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set({
                            borderColor: 'red',
                            cornerColor: 'green',
                            cornerSize: 6,
                            transparentCorners: false
                        });
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set('selectable', false);
                        this.letters.item(i).top=-1*this.letters.item(i).get('fontSize')+(i/this.text.length);

                    }else if(this.effect==='largeToSmallBottom'){
                        var small=parseInt(this.largeFont);
                        var large=parseInt(this.smallFont);
                        //var small = 20;
                        //var large = 75;
                        var difference=large-small;
                        var center=Math.ceil(this.text.length/2);
                        var step=difference/(this.text.length);
                        var newfont=small+(i*step);
                        //var newfont=((this.text.length-i)*this.smallFont)+12;
                        this.letters.item(i).set('fontSize', (newfont));
                        this.letters.item(i).set('left', (width));
                        width+=this.letters.item(i).get('width');
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set({
                            borderColor: 'red',
                            cornerColor: 'green',
                            cornerSize: 6,
                            transparentCorners: false
                        });
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set('selectable', false);
                        //this.letters.item(i).top =-1* this.letters.item(i).get('fontSize')+newfont-((this.text.length-i))-((this.text.length-i));
                        this.letters.item(i).top=-1*this.letters.item(i).get('fontSize')-i;

                    }else if(this.effect==='bulge'){//bulge
                        var small=parseInt(this.smallFont);
                        var large=parseInt(this.largeFont);
                        //var small = 20;
                        //var large = 75;
                        var difference=large-small;
                        var center=Math.ceil(this.text.length/2);
                        var step=difference/(this.text.length-center);
                        if(i<center)
                            var newfont=small+(i*step);
                        else
                            var newfont=large-((i-center+1)*step);
                        this.letters.item(i).set('fontSize', (newfont));

                        this.letters.item(i).set('left', (width));
                        width+=this.letters.item(i).get('width');

                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set('selectable', false);

                        this.letters.item(i).set('top', -1*this.letters.item(i).get('height')/2);
                    }
                }

                // Update group coords
                this.letters._calcBounds();
                this.letters._updateObjectsCoords();
                this.letters.saveCoords();
              this.letters.render(ctx);

                this.width=this.letters.width;
                this.height=this.letters.height;
                this.letters.left=-(this.letters.width/2);
                this.letters.top=-(this.letters.height/2);
//              console.log('End rendering')
            }
        },
        _renderOld: function(ctx){
            if(this.letters){
                var curAngle=0,
                        angleRadians=0,
                        align=0;
                // Text align
                if(this.get('textAlign')==='center'||this.get('textAlign')==='justify'){
                    align=(this.spacing/2)*(this.text.length-1);
                }else if(this.get('textAlign')==='right'){
                    align=(this.spacing)*(this.text.length-1);
                }
                var multiplier=this.reverse?1:-1;
                for(var i=0, len=this.text.length; i<len; i++){
                    // Find coords of each letters (radians : angle*(Math.PI / 180)
                    curAngle=multiplier*(-i*parseInt(this.spacing, 10)+align);
                    angleRadians=curAngle*(Math.PI/180);

                    for(var key in this.delegatedProperties){
                        this.letters.item(i).set(key, this.get(key));
                    }
                    this.letters.item(i).set('top', (-Math.cos(angleRadians)*this.radius));
                    this.letters.item(i).set('left', (+Math.sin(angleRadians)*this.radius));
                    this.letters.item(i).setAngle(curAngle);
                    this.letters.item(i).set('padding', 0);
                    this.letters.item(i).set('selectable', false);
                }
                // Update group coords
                this.letters._calcBounds();
                this.letters._updateObjectsCoords();
                this.letters.saveCoords();
//              this.letters.render(ctx);
                this.width=this.letters.width;
                this.height=this.letters.height;
                this.letters.left=-(this.letters.width/2);
                this.letters.top=-(this.letters.height/2);
            }
        },
        render: function(ctx, noTransform){
            // do not render if object is not visible
            if(!this.visible)
                return;
            if(!this.letters)
                return;

            //ctx.save();
            this.transform(ctx);

            var groupScaleFactor=Math.max(this.scaleX, this.scaleY);

            this.clipTo&&fabric.util.clipContext(this, ctx);

            //The array is now sorted in order of highest first, so start from end.
            for(var i=0, len=this.letters.size(); i<len; i++){
                var object=this.letters.item(i),
                        originalScaleFactor=object.borderScaleFactor,
                        originalHasRotatingPoint=object.hasRotatingPoint;

                // do not render if object is not visible
                if(!object.visible)
                    continue;

//              object.borderScaleFactor=groupScaleFactor;
//              object.hasRotatingPoint=false;

                object.render(ctx);

//              object.borderScaleFactor=originalScaleFactor;
//              object.hasRotatingPoint=originalHasRotatingPoint;
            }
            this.clipTo&&ctx.restore();

            //Those lines causes double borders.. not sure why
//          if(!noTransform&&this.active){
//              this.drawBorders(ctx);
//              this.drawControls(ctx);
//          }
//          ctx.restore();
            this.setCoords();
        },
        /**
         * @private
         */
        _set: function(key, value){
            this.callSuper('_set', key, value);
            if(this.letters){
                this.letters.set(key,value);
                //Properties are delegated with the object is rendered
//              if (key in this.delegatedProperties) {
//                  var i = this.letters.size();
//                  while (i--) {
//                      this.letters.item(i).set(key, value);
//                  }
//              }
                if(key in this._dimensionAffectingProps){
                    this._initDimensions();
                    this.setCoords();
                }
            }
        },
        toObject: function(propertiesToInclude){
            var object=extend(this.callSuper('toObject', propertiesToInclude), {
                radius: this.radius,
                spacing: this.spacing,
                reverse: this.reverse,
                effect: this.effect,
                range: this.range,
                smallFont: this.smallFont,
                largeFont: this.largeFont
                        //              letters: this.letters   //No need to pass this, the letters are recreated on the fly every time when initiated
            });
            if(!this.includeDefaultValues){
                this._removeDefaultValues(object);
            }
            return object;
        },
        /**
         * Returns string represenation of a group
         * @return {String}
         */
        toString: function(){
            return '#<fabric.CurvedText ('+this.complexity()+'): { "text": "'+this.text+'", "fontFamily": "'+this.fontFamily+'", "radius": "'+this.radius+'", "spacing": "'+this.spacing+'", "reverse": "'+this.reverse+'" }>';
        },
        /* _TO_SVG_START_ */
        /**
         * Returns svg representation of an instance
         * @param {Function} [reviver] Method for further parsing of svg representation.
         * @return {String} svg representation of an instance
         */
        toSVG: function(reviver){
            var markup=[
                '<g ',
                'transform="', this.getSvgTransform(),
                '">'
            ];
            if(this.letters){
                for(var i=0, len=this.letters.size(); i<len; i++){
                    markup.push(this.letters.item(i).toSVG(reviver));
                }
            }
            markup.push('</g>');
            return reviver?reviver(markup.join('')):markup.join('');
        }
        /* _TO_SVG_END_ */
    });

    /**
     * Returns {@link fabric.CurvedText} instance from an object representation
     * @static
     * @memberOf fabric.CurvedText
     * @param {Object} object Object to create a group from
     * @param {Object} [options] Options object
     * @return {fabric.CurvedText} An instance of fabric.CurvedText
     */
    fabric.CurvedText.fromObject=function(object){
        return new fabric.CurvedText(object.text, clone(object));
    };

    fabric.util.createAccessors(fabric.CurvedText);

    /**
     * Indicates that instances of this type are async
     * @static
     * @memberOf fabric.CurvedText
     * @type Boolean
     * @default
     */
    fabric.CurvedText.async=false;

})(typeof exports!=='undefined'?exports:this);
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
            style: 'font-select',
            placeholder: 'Select a font',
            lookahead: 1,
            pager: 10,
            api: 'https://fonts.googleapis.com/css?family='
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
                    $('.dropdown-menu').niceScroll();
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
                    'class': this.options.style
                });
                this.$arrow = $('');
                this.$select = $('<a><span>' + this.options.placeholder + '<em class="material-icons">expand_more</em></span></a>');
                this.$drop = $('<div>', {
                    'class': 'fs-drop dropdown-menu'
                });
                this.$results = $('<ul>', {
                    'class': 'fs-results'
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
                    'font-family': this.toReadable(t[0]),
                    'font-weight': (t[1] || 400)
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
 
    var size = 12; //this.cornerSize;
//console.log(this.oCoords.tl.x, this. oCoords.tl.y /* top left corner,this. oCoords.tr.x, this. oCoords.tr.y /* top right corner,this.oCoords.bl.x,this.oCoords.bl.y,this.oCoords.br.x, this.oCoords.br.y );
 if (this.isControlVisible(control)) {
        isVML() || this.transparentCorners || ctx.clearRect(left, top, size, size);
      } 

   if (control == 'bl') {
        
      this.cornerSize=size+5;

// ctx[methodName](left, top, size, size);
    ctx.drawImage(bottomLeftImage, left, top, size+5, size+5);

    } else if (control == 'br') {
      
     
      this.cornerSize=size+5;
     //  ctx.strokeRect(left, top, size, size);
  ctx.drawImage(bottomRightImage, left, top,size+5, size+5);
         // ctx[methodName](left, top, size, size);
    } else if (control == 'mtr') {
         this.cornerSize=size+5;
         ctx.drawImage(topRightImage, left, top, size+5, size+5);

       // ctx.arc(left + 2 + size / 4, top + size / 4, size / 1.5, 0, 2 * Math.PI);
      //  ctx.fill();
        // ctx.strokeRect(left, top, size, size);
    } else {
        this.cornerSize=size;
        ctx[methodName](left+1, top+1, size, size);
    }

};
var cursorOffset = { mt: 0,tr: 1, mr: 2, br: 3, mb: 4, bl: 5, ml: 6, tl: 7 };

degreesToRadians = fabric.util.degreesToRadians;
fabric.util.object.extend(fabric.Canvas.prototype, {
    setCursor: function(value) {
        this.upperCanvasEl.style.cursor = value;
    },
    _getActionFromCorner: function(target, corner) {
       
       if (corner && corner === 'mtr') {
            var action_rotate = (target) ? 'rotate' : 'rotate'
            var action_scale = (target) ? 'scale' : 'scale'
            return action_rotate;
        }

    /*    if (corner === 'tl') {
            if (this.getActiveObject()) {
                this.remove(this.getActiveObject());
            }
        }*/
    },

    _setCornerCursor: function(corner, target) {
        if ((corner === 'mtr') && target.hasRotatingPoint) {
            this.setCursor(this.rotationCursor);
        }else if ((corner === 'bl') && target.hasRotatingPoint) {
            this.setCursor(this.defaultCursor);
        } else if (corner in cursorOffset) {
            this.setCursor(this._getRotatedCornerCursor(corner, target));
        } else {
            this.setCursor(this.defaultCursor);
            return false;
        }
    }

});
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

        if(corner == 'tr' ){
            action='drag';
          /*  action = 'transformMatrix';*/
        }
    if(corner == 'mtr' ){
            action='rotate';
          /*  action = 'transformMatrix';*/
        }
     /*   var activeObject = wpStamp.canvas.getActiveObject();
             activeObject.set({transformMatrix: [1, .30, 0, 1, 0, 0],width:activeObject.width,height:activeObject.height,top:activeObject.top,left:activeObject.left});
*/
        if(corner == 'tl') {
         //   action = 'delete';
          //  removeSelected();
        }
        
        if(corner == 'bl') {
            action = 'rotate';
     
           wpStamp.lockSelected();
        }
    }

    return action;
};
"use strict";
var wpStamp =  {


    canvas: '',
    a: '',
    b: '',
    $color: '',
    imgf: '',
    imgb: '',
    front: '',
    back: '',
    state: [],
    mods: 0,
    hasback: 1,
    lineAdded: false,
    lineW: '',
    lineH: '',
    copiedObject: '',
    copiedObjects: [],
    mobile: false,
    allProducts: [],
    newleft: 0,
    drawline: '',
    line: '',
    isDown: '',
    zoom: 1,
    side:'back',
    holders: [],
    sliders:[],
    mainColorTool:0,
    ratio:1, 
    b_json:[],
    a_json:[],
    state : [],
    mods  : 0,
    screenState: function() {
       
        //make it responsive;
        ssm.addStates([{
            id: 'mobile',
            query: '(max-width: 767px)',
            onEnter: function() {
                
              
                var currentWidth =  $('.t-container').attr('data-width'); // check if smaller tha window.width
                var currentHeight = $('.t-container').attr('data-height');//height(); // check if smaller tha window.height
               
                wpStamp.reShape(currentWidth, currentHeight);
                wpStamp.mobile =true;  
            }
        }, {
            id: 'screen',
            query: '(min-width: 768px)',
            onEnter: function() {

              wpStamp.resetShape();
            }
        }]);
    },

    resetShape: function() {
         wpStamp.ratio =1;
        var drawingArea = $('#drawingArea');
     
        $(".frontside,.backside,.helper,#drawingArea").css('width', drawingArea.attr('data-width') );
        $(".frontside,.backside,.helper,#drawingArea").css('height', drawingArea.attr('data-height') );
   

            wpStamp.realArea();
            if (wpStamp.canvas) {
               wpStamp.canvas.setWidth( drawingArea.attr('data-width'));
                wpStamp.canvas.setHeight(drawingArea.attr('data-height') );
                wpStamp.renderCanvas();
            }

    },
    reShape: function(currentWidth, currentHeight) {

                
        var drawingArea = $('#drawingArea');

        var currentWidth=Number(currentWidth);
        var currentHeight=Number(currentHeight);  
        var xtrawidth=$('.designer-container').width();
        var ratio = xtrawidth/currentWidth;
     
        wpStamp.ratio = ratio;
      
        var newHeight=currentHeight * wpStamp.ratio;

     
        $(".frontside,.backside,.helper,#drawingArea").css('width', xtrawidth );
        $(".frontside,.backside,.helper,#drawingArea").css('height', newHeight );
        var drawingPosition = drawingArea.position();

        var objects = wpStamp.canvas.getObjects();

        for (var i in objects) {
            var scaleX = objects[i].scaleX;
            var scaleY = objects[i].scaleY;
            var left = objects[i].left;
            var top = objects[i].top;
            if(wpStamp.ratio==1){
                var tempScaleX = scaleX * wpStamp.ratio/scaleX ;
                var tempScaleY = scaleY * wpStamp.ratio/scaleY ;
                var tempLeft = left * wpStamp.ratio/left;
                var tempTop = top * wpStamp.ratio/top;
                    }else{
                         var tempScaleX = scaleX * wpStamp.ratio;
                        var tempScaleY = scaleY * wpStamp.ratio;
                        var tempLeft = left * wpStamp.ratio;
                        var tempTop = top * wpStamp.ratio;
            }
            objects[i].scaleX = tempScaleX;
            objects[i].scaleY = tempScaleY;
            objects[i].left = tempLeft;
            objects[i].top = tempTop;
          
            objects[i].setCoords();
        }
        wpStamp.canvas.renderAll();
        wpStamp.canvas.calcOffset();

            wpStamp.realArea();
            if (wpStamp.canvas) {
         
             wpStamp.canvas.setWidth(xtrawidth);
              wpStamp.canvas.setHeight(newHeight);
               wpStamp.renderCanvas();
        }
          

    },
    lockSelected:function(){
      var activeObject=wpStamp.canvas.getActiveObject();
    if(activeObject.lockMovementX ==false && activeObject.lockMovementY==false){
      activeObject.lockMovementX = true;
      activeObject.lockMovementY = true;
    }else{
      activeObject.lockMovementX =false;
      activeObject.lockMovementY=false;
      
    }
    wpStamp.renderCanvas();
    },
     init:function() {

        wpStamp.canvas = new fabric.Canvas('tcanvas');
        wpStamp.canvas.controlsAboveOverlay = true;
         wpStamp.canvas.stateful = false;
        wpStamp.canvas.counter = 0;
        wpStamp.canvas.setWidth($('#drawingArea').width());
        wpStamp.canvas.setHeight($('#drawingArea').height());
        wpStamp.canvas.calcOffset().renderAll();
        wpStamp.canvas.on({
            'object:selected': wpStamp.onObjectSelected,
            'selection:cleared': wpStamp.onSelectedCleared,
           'object:moving': wpStamp.onObjectMoving,
            'mouse:up': wpStamp.onMouseUp,
            'mouse:move': wpStamp.paintPlugin.moveLine,
            'mouse:down': wpStamp.paintPlugin.startLine,
                      'object:added': wpStamp.onObjectAdded,
         /*   'object:modified': wpStamp.updateModifications(true),*/
            'object:removed': wpStamp.checkPrice
        });


wpStamp.realArea();


        wpStamp.screenState();
        wpStamp.layersPlugin.load();
        wpStamp.loadProducts();
        wpStamp.clickControllers();
        wpStamp.textPlugin.load();
        wpStamp.paintPlugin.load();
        wpStamp.variationPlugin.load();
        wpStamp.createListenersKeyboard()
        wpStamp.initCustomization();

        $('a[title]').tooltipster();

        var productBack = $('#tshirtFacing').data('back');
        if (productBack == '') {
                     wpStamp.hasback = 0;
                    $('#flip').remove();
                }
        $('body').on('click', '#product-changer a', function(e) {
            e.preventDefault();
            var productId = $(this).attr('data-id');
            $('#product-changer li').removeClass('active');
            $(this).parent().addClass('active');
          wpStamp.changeProduct(productId);

        });

    },
    layersPlugin:  {
                
            load: function() {
         
                    var layers = $("#layers");
                    layers.sortable().bind('sortstop', function(event, ui) {
                  

                        var items = $('#layers li:not(.ui-sortable-placeholder)');
                        for (var i = items.length - 1; i >= 0; i--) {
                            var obj = wpStamp.getObjectById(items[i].id);
                            wpStamp.canvas.bringToFront(obj);
                        }
                   
                });
        
                  layers.on('click','li',function(){

                    var id=$(this).attr('data-id');
                     var obj = wpStamp.getObjectById(id);
                     console.log(obj,id);

                     if(obj){
                            layers.find('li').removeClass('active');
                            $(this).addClass('active');
                            wpStamp.canvas.setActiveObject(obj);
                    }
                  });
                layers.niceScroll();


        }, add : function(id,icon,type){

        
                  var layers= $("#layers");
                  layers.find('.nothing').remove();
                  var upTool='<a class="bring-to-front" data-tooltip="Bring to Front"><em class="material-icons">keyboard_arrow_up</em></a>';
                  var downTool='<a class="send-to-back" data-tooltip="Send to Back"><em class="material-icons">keyboard_arrow_down</em></a>';
                  var removeTool='<a class="remove-selected" data-tooltip="Delete selected item"><em class="material-icons">delete</em> </a>'
                  layers.prepend('<li id="' + id + '" data-id="' + id + '"><em class="material-icons">' + icon + '</em>' + type+ " " + id + '<div class="small-tools">'+removeTool+'</div></li>');
                  layers.getNiceScroll().resize();
                  layers.sortable('reload');



        },remove:function(id){

        },select:function(id){

        }
  
     
    },
    realArea:function(scale){

    var scale=(typeof scale=='undefined') ? '1' : scale;

        if( wpStamp.side=='back'){

        var data=$('#tcanvas').attr('data-shape');

            var rleft=Number($('#tcanvas').attr('data-left'));
            var rtop=Number($('#tcanvas').attr('data-top'));
            var rwidth=Number($('#tcanvas').attr('data-width'));
            var rheight=Number($('#tcanvas').attr('data-height'));
        }else{
          var rleft=Number($('#tcanvas').attr('data-leftb'));
            var rtop=Number($('#tcanvas').attr('data-topb'));
            var rwidth=Number($('#tcanvas').attr('data-widthb'));
            var rheight=Number($('#tcanvas').attr('data-heightb'));
           var data=$('#tcanvas').attr('data-shapeb');
        }


            //check if data is null!!!
            if(data){
              
            var jsa= JSON.parse(data);
             jsa.objects[0].fill='transparent';
     
            jsa.objects[0].scaleX=jsa.objects[0].scaleX;
                jsa.objects[0].scaleY=jsa.objects[0].scaleY;
       
            var top=jsa.objects[0].top;
            var left=jsa.objects[0].left;
            var scaledTop=top*wpStamp.ratio*scale-top*wpStamp.ratio;
            var scaledLeft=left*wpStamp.ratio*scale-left*wpStamp.ratio;

              jsa.objects[0].top=top*wpStamp.ratio-2*scaledTop;
             jsa.objects[0].left=left*wpStamp.ratio-scaledLeft;
             
                jsa.objects[0].width=jsa.objects[0].width*scale*wpStamp.ratio;
                jsa.objects[0].height=jsa.objects[0].height*scale*wpStamp.ratio;

            jsa.objects[0].radius=jsa.objects[0].radius*scale*wpStamp.ratio;
             wpStamp.canvas.clipTo = function(ctx) {
            if(jsa.objects[0].type && jsa.objects[0].type=='rect'){
        

              var bounds =  new fabric.Rect(jsa.objects[0]);


             }else{

                 var bounds =  new fabric.Circle(jsa.objects[0]);
             }
             bounds.render(ctx);
            };
        }else{
              wpStamp.canvas.clipTo = null;
        }
      
           
    },
    loadProducts: function() {
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function(evt) {

                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;

                       wpStamp.progressBar(percentComplete);
                    }
                });

                return xhr;
            },
            type: 'POST',

            url: fa_settings.site_url_,
            data: {

                action: 'get_other_parent_products',

            },
            beforeSend: function(x) {
                if (x && x.overrideMimeType) {
                    x.overrideMimeType("application/json;charset=UTF-8");
                }
            },
            success: function(data, textStatus, XMLHttpRequest) {
              var amount=$('.amount').html();
              var curr=amount[0];
        
                if (data.length != 0) {
                    var customContainer = $('#product-changer');

                    $.each(data, function(i, value) {
               
                        if (Number(i) == Number($('#tshirtFacing').attr('data-id'))) {
                            active = 'active other-product';
                        } else {
                            active = 'not other-product';
                        }

                        customContainer.append('<li class="' + active + '"><a data-id="' + i + '" href="#"><span class="product-single-price">' + curr + value.price + '</span><img class="img" alt="' + value[2] + '" src="' + value[0] + '"/></a></li>');
                         wpStamp.allProducts[i] = value;

                    });

                }
            },
            error: function(MLHttpRequest, textStatus, errorThrown) {

            }
        });
    },
    changeProduct: function(productId) {

        var container = $('.designer-container, .t-container');
        var drawingArea = $('#drawingArea');
        var tcanvas=$('#tcanvas');
        var amount=$('.amount').html();
        //Change Variations
        var colors = '';
        $('.product-list').html('No variations');
        $.each(wpStamp.allProducts[productId]['variations'], function(i, value) {
    
            colors += '<li class="colors"><a data-front="' + value[0] + '" data-back="' + value[1] + '"  title="' + value[2] + '" class="colors"><img src="' + value[0] + '"/><div class="product-name">' + value[2] + ' <span class="color-box" style="background:' + value[3] + ';"></span> </div></a></li>';
        });
        $('.product-list').html(colors);

        container.attr('data-width', wpStamp.allProducts[productId]['info']['width_pixels']);
        container.attr('data-height', wpStamp.allProducts[productId]['info']['height_pixels']);
        $('#tshirtFacing').attr('data-front', '');
        $('#tshirtFacing').attr('data-back', '');
        $('#tshirtFacing').attr('data-id', productId);

     try{
  
         var real_drawing = wpStamp.allProducts[productId]['info']['real_paint_a'].split('/');
         var real_drawing_b = wpStamp.allProducts[productId]['info']['real_paint_b'] !='' ? wpStamp.allProducts[productId]['info']['real_paint_b'].split('/') :'';

         var real_a = (   real_drawing[0]!=='' ) ? JSON.parse(real_drawing) :'';
         var real_b = (  real_drawing_b ) ? JSON.parse(real_drawing_b) :'';


   if(wpStamp.allProducts[productId].variations[0][1]==''){
       $('#flip').hide();
   }else{
      $('#flip').show();
   }

  if(real_a!==''){
    
         var $realwidth = real_a['objects'][0]['width'] * real_a['objects'][0]['scaleX'];
         var $realheight = real_a['objects'][0]['height'] * real_a['objects'][0]['scaleY'];
         var $realx = real_a['objects'][0]['left'];
         var $realy = real_a['objects'][0]['top'];
                 $('.adl-price').val(wpStamp.allProducts[productId]['info']['price_back']);
                  $('.real-price').val(wpStamp.allProducts[productId]['price']);
                    $('.amount').html(wpStamp.allProducts[productId]['price']);
                    $('.amount').prepend(amount[0]);
                         tcanvas.attr('data-width', $realwidth);
                         tcanvas.attr('data-height', $realheight);
                         tcanvas.attr('data-top',  $realy);
                         tcanvas.attr('data-left', $realx);
                        tcanvas.attr('data-shape', wpStamp.allProducts[productId]['info']['real_paint_a']);
                      
            }else{
                         tcanvas.attr('data-width','');
                         tcanvas.attr('data-height', '');
                         tcanvas.attr('data-top', '');
                         tcanvas.attr('data-left', '');
                         tcanvas.attr('data-shape','');

            }
          

            if(real_b!==''){
          
                var $realwidth_b = real_b['objects'][0]['width'] * real_b['objects'][0]['scaleX'];
                var $realheight_b =real_b['objects'][0]['height']* real_b['objects'][0]['scaleY'];
                var $realx_b = real_b['objects'][0]['left'];
                var $realy_b = real_b['objects'][0]['top'];
                tcanvas.attr('data-widthb', $realwidth_b);
                tcanvas.attr('data-leftb', $realx_b);
                tcanvas.attr('data-heightb',  $realheight_b);
                tcanvas.attr('data-topb',  $realy_b);
                  tcanvas.attr('data-shapeb', wpStamp.allProducts[productId]['info']['real_paint_b']);

            }else{
                 tcanvas.attr('data-shapeb','');
                tcanvas.attr('data-widthb', '');
                tcanvas.attr('data-leftb', '');
                tcanvas.attr('data-heightb',  '');
                tcanvas.attr('data-topb',  '');
               
            }


     }catch(ex){
      
     }



        $('.frontside,.backside,.helper,#drawingArea').css({
            'width': wpStamp.allProducts[productId]['info']['width_pixels'] + 'px',
            'height': wpStamp.allProducts[productId]['info']['height_pixels'] + 'px'
        });
        $('.frontside,.backside,.helper,#drawingArea').attr({
            'data-width': wpStamp.allProducts[productId]['info']['width_pixels'] ,
            'data-height': wpStamp.allProducts[productId]['info']['height_pixels'] 
        });
        wpStamp.loadMediaCategories();
        $('#backgrounds a').eq(0).click();
            var currentWidth =  $('.t-container').attr('data-width'); // check if smaller tha window.width
            var currentHeight = $('.t-container').attr('data-height');//height(); // check if smaller tha window.height
            wpStamp.resetShape();
              
         //  wpStamp.reShape(currentWidth, currentHeight);

    },
    drawStar: function(arms, x, y, outer_radius, inner_radius, context, colour) {

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
        },textPlugin: {
               convert:function(){
                var canvas=wpStamp.canvas;
                var type='arc';
                var props = {};
                var obj = canvas.getActiveObject();
                var cvrtBtn=$('.convert');
                var id = cvrtBtn.attr('data-collapse');
               
            if(obj){
                if(/curvedText/.test(obj.type)) {
                    default_text = obj.getText();
                    props = obj.toObject();
                    delete props['type']; 
                    props['clipName']='all';
                    var textSample = new fabric.Text(default_text,props);
                      $('#' + id).show();
                       cvrtBtn.removeClass('actived');
                
                }else if(/text/.test(obj.type)) {
                    default_text = obj.getText();
                    props = obj.toObject();
                    delete props['type'];
                    props['textAlign'] = 'center';
                    props['radius'] = 120;
                    props['spacing'] = 10;
                    props['effect']=type;
                    props['clipName']='all';
                   
                   $('#' + id).hide();
                  
                    cvrtBtn.addClass('actived');
                             
                    var textSample = new fabric.CurvedText(default_text,props);
                 }
                canvas.remove(obj);
                $('#layers').find('li#'+obj.id).remove();
              
                canvas.add(textSample);
               canvas.setActiveObject(canvas.item(canvas.getObjects().length-1));
                obj.setCoords(); 
                canvas.calcOffset();
                 wpStamp.renderCanvas();
                
            }
        },
        add:function(text){
      
            var canvas=wpStamp.canvas;
            
            if (text == '') {
                
            } else {
    
                var left = wpStamp.canvas.width / 2;
                var top = wpStamp.canvas.height / 2;
                var textSample = new fabric.Text(text, {
                    left: left,
                    top: top,
                    angle: 0, 
                    clipName: 'all',lineHeight:"1"

                });
                textSample.set('fontFamily', $('#font-family').val().replace(/\+/g, ' ') ? $('#font-family').val().replace(/\+/g, ' ') : 'Arial');
                 $('#text-string').css('font-family',$('#font-family').val().replace(/\+/g, ' '));
                textSample.fill = wpStamp.getCurrentColor();
                canvas.add(textSample);
                wpStamp.canvas.calcOffset();  
                textSample.center().setCoords();
                wpStamp.renderCanvas();
     
            if (wpStamp.mobile == true) {
                $('.static').removeClass('collapse');

                $('.my-tools').removeClass('animated slideOutLeft').addClass('animated slideInLeft');
                $('.panels').removeClass('animated slideOutRight').addClass('animated slideInRight hide');
         
            }
              }

        },
        load: function(){

           var canvas=wpStamp.canvas;

           $('.convert').on('click',function(){   

                wpStamp.textPlugin.convert(); 
      
           });
         
    $('#reverse')[0].noUiSlider.on('slide',function(e){
        var obj = canvas.getActiveObject();
        if(obj){
           var isReversed= parseInt(e) > 0 ? true : false;
            obj.set('reverse',isReversed); 
            wpStamp.renderCanvas();
        }
    });
      $('#reverse')[0].noUiSlider.updateOptions({start: 0,
  range: {
    'min': [0, 1],
    'max': 1
  }
})
    $('#radius')[0].noUiSlider.on('slide',function(e){

        var obj = canvas.getActiveObject();
    
        if(obj){
            obj.set('radius',parseInt(e)); 
       wpStamp.canvas.calcOffset();  
       obj.setCoords();  
    }
       wpStamp.renderCanvas();
    });
     $('#spacing')[0].noUiSlider.on('slide',function(e){

        var obj = canvas.getActiveObject();
 
        if(obj){
            obj.set('spacing',parseInt(e)); 
        
    wpStamp.canvas.calcOffset();    obj.setCoords();
    }
       wpStamp.renderCanvas();
    });

              $('#add-text').on('click', function() {
                wpStamp.textPlugin.add($('#text-string').val());
                 $('#text-string').val('');
              });
            $("#text-string").keyup(function() {
                $('#add-text').removeData('data-tooltip');
                var activeObject = wpStamp.canvas.getActiveObject();
                if (activeObject && ( activeObject.type === 'text' || activeObject.type === 'curvedText' )) {
                    activeObject.setText( this.value );
                    activeObject.setCoords();
                    wpStamp.renderCanvas();
                }
          });
          $('#line-height').click(function() {
            var thislineheight = Math.abs(parseInt($(this).prev('input').val())) ? Math.abs(parseInt($(this).prev('input').val())) : '2';
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {

                activeObject.lineHeight = thislineheight / 10;
                activeObject.setCoords();
                    wpStamp.renderCanvas();
            }
        });
                 $('#line-height-input').change(function() {
                   var thislineheight = Math.abs(parseInt($(this).val())) ? Math.abs(parseInt($(this).val())) : '2';
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {

                activeObject.lineHeight = thislineheight / 10;
                activeObject.setCoords();
                    wpStamp.renderCanvas();
            }
        });

          $('body').on('click','.text-formating a',function(){
                var activeObject = canvas.getActiveObject();
                var type=$(this).attr('data-type');
                var val=$(this).attr('data-value');
      
                if (activeObject && activeObject.type === 'text') {
                   $(this).toggleClass('active');
                   if(type=='fontWeight'){
                    activeObject.fontWeight = (activeObject.fontWeight == val ) ? '' : val ;
                   }else if(type=='fontStyle'){
                     activeObject.fontStyle = (activeObject.fontStyle == val ) ? '' : val ;
                   }else{
                     activeObject.textDecoration = (activeObject.textDecoration == val ) ? '' : val ;
                   }

                    wpStamp.renderCanvas();
                }

          });


    $('body').on('click','.text-aligning a',function(){
                var activeObject = canvas.getActiveObject();
                
                var val=$(this).attr('data-value');
                    if (activeObject && activeObject.type === 'text') {
                        $('.text-aligning a').removeClass('active');
                        $(this).toggleClass('active');
                         activeObject.set('textAlign',val);
                         wpStamp.renderCanvas();
                    }
      });
   



         $('#font-family').fontselect().change(function() {
            var font = $(this).val().replace(/\+/g, ' ');

            wpStamp.textPlugin.setFont(font);
        });
        },
        setFont: function(font) {
            var activeObject = wpStamp.canvas.getActiveObject();
         
            if (activeObject && (activeObject.type === 'text' || activeObject.type === 'curvedText' )) {
                activeObject.set('fontFamily', font);

                  wpStamp.canvas.calcOffset();  
               // activeObject.center().setCoords();
                activeObject.setCoords();
                wpStamp.renderCanvas();wpStamp.canvas.calcOffset();  
            }
        }
    },
    renderCanvas:function(){
         wpStamp.canvas.calcOffset().renderAll();
    },
    paintPlugin:{

    moveLine: function(o) { 
        var canvas=wpStamp.canvas;
                var line=wpStamp.line;

        if (wpStamp.drawline == true) {
            if (!wpStamp.isDown)
                return;
            var pointer = canvas.getPointer(o.e);
            line.set({
                x2: pointer.x,
                y2: pointer.y
            });
            line.setCoords();
            wpStamp.renderCanvas();
        }
    },

    startLine: function(o) { 
        var canvas=wpStamp.canvas;
        if (wpStamp.drawline == true) {
            canvas.selectable=false;
            wpStamp.isDown = true;
            var pointer = canvas.getPointer(o.e);
            var points = [pointer.x, pointer.y, pointer.x, pointer.y];
            wpStamp.line = new fabric.Line(points, {
                strokeWidth: $('#drawing-line-width')[0].noUiSlider.get(),
                fill: $('#main-color').minicolors('value'),
                stroke: $('#main-color').minicolors('value'),
                originX: 'center',
                originY: 'center'
            });
            canvas.add( wpStamp.line );
             wpStamp.line.setCoords();
            wpStamp.renderCanvas();
        }
    },
        load:function(){


        var drawingModeEl = $('.freedraw');
        var drawSelector= $('.drawing-mode-selector');
        var drawLine=$('#drawing-line-width');
        var canvas=wpStamp.canvas;

        canvas.freeDrawingCursor = 'url("../wp-content/plugins/wpstamp/public/img/brush.png") 5 40 , default';
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

                    var squareWidth = 10,
                        squareDistance = 2;

                    var patternCanvas = fabric.document.createElement('canvas');
                    patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
                    var ctx = patternCanvas.getContext('2d');

                   ctx.fillStyle = this.color;
                    ctx.fillRect(0, 0, squareWidth, squareWidth);

                    return patternCanvas;
                };

                var diamondPatternBrush = new fabric.PatternBrush(canvas);
                diamondPatternBrush.getPatternSrc = function() {

                    var squareWidth = 10,
                        squareDistance = 5;
                    var patternCanvas = fabric.document.createElement('canvas');
                    var rect = new fabric.Rect({
                        width: squareWidth,
                        height: squareWidth,
                        angle: 45,
                        fill: this.color
                    });

                    var canvasWidth = rect.getBoundingRectWidth();

                    patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
                    rect.set({
                        left: canvasWidth / 2,
                        top: canvasWidth / 2
                    });

                    var ctx = patternCanvas.getContext('2d');
                    rect.render(ctx);

                    return patternCanvas;
                };
      

        drawSelector.on('click', function() {

              var value = $(this).attr('data-type');
           
               drawSelector.removeClass('actived');
                $(this).addClass('actived');

            if (value === 'hline') {
                canvas.freeDrawingBrush = vLinePatternBrush;    canvas.freeDrawingBrush.color = wpStamp.getCurrentColor();
                canvas.freeDrawingBrush.width = parseInt(drawLine[0].noUiSlider.get()) == 0 ? 1 : parseInt(drawLine[0].noUiSlider.get());

            } else if (value === 'vline') {
                canvas.freeDrawingBrush = hLinePatternBrush;    canvas.freeDrawingBrush.color = wpStamp.getCurrentColor();
                canvas.freeDrawingBrush.width = parseInt(drawLine[0].noUiSlider.get()) == 0 ? 1 : parseInt(drawLine[0].noUiSlider.get());

            } else if (value === 'square') {
                canvas.freeDrawingBrush =squarePatternBrush;    canvas.freeDrawingBrush.color = wpStamp.getCurrentColor();
                canvas.freeDrawingBrush.width = parseInt(drawLine[0].noUiSlider.get()) == 0 ? 1 : parseInt(drawLine[0].noUiSlider.get());

            } else if (value === 'diamond') {
                canvas.freeDrawingBrush =diamondPatternBrush;  
                canvas.freeDrawingBrush.color = wpStamp.getCurrentColor();
                canvas.freeDrawingBrush.width = parseInt(drawLine[0].noUiSlider.get()) == 0 ? 1 : parseInt(drawLine[0].noUiSlider.get());

            } else if (value === 'texture') {

                canvas.freeDrawingBrush = texturePatternBrush;    canvas.freeDrawingBrush.color = wpStamp.getCurrentColor();
                canvas.freeDrawingBrush.width = parseInt(drawLine[0].noUiSlider.get()) == 0 ? 1 : parseInt(drawLine[0].noUiSlider.get());

            } else {
              canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
              canvas.freeDrawingBrush.color = wpStamp.getCurrentColor();
       
              canvas.freeDrawingBrush.width = parseInt(drawLine[0].noUiSlider.get()) == 0 ? 1 : parseInt(drawLine[0].noUiSlider.get());

            }
        });
        drawingModeEl.on('click', function() {
            //clearOther(); 

            canvas.isDrawingMode = !canvas.isDrawingMode;

            canvas.freeDrawingBrush.color = wpStamp.getCurrentColor();

            canvas.freeDrawingBrush.width = parseInt(drawLine[0].noUiSlider.get()) == 0 ? 1 : parseInt(drawLine[0].noUiSlider.get());
      
            if (canvas.isDrawingMode) {
                 $('#drawing-mode-brush').addClass(' animated fadeIn');
     
           
                wpStamp.clearOther();
                $('.color-secondary').parent().addClass('disabled');
                $(this).addClass('active');
                $('.line-draw').show();

            } else {

                wpStamp.clearOther();
                $('.color-secondary').parent().removeClass('disabled');
                $(this).removeClass('active');
                $('.line-draw').hide();
            }
        });

        $('#paint-tools .rect').on('click', function() {
             wpStamp.clearOther();  
             if (wpStamp.canvas.isDrawingMode) {
               
                wpStamp.canvas.isDrawingMode = false;
            }
            var top = canvas.height / 2 - 100;
            var left = canvas.width / 2 - 50;
            var rect = new fabric.Rect(wpStamp.defaultArray(top, left, 100, 100));
            rect.fill = wpStamp.getCurrentColor();
            canvas.add(rect);
            canvas.renderAll();
        });
        $('#paint-tools .triangle').on('click', function() {
             wpStamp.clearOther();  if (wpStamp.canvas.isDrawingMode) {
               
                wpStamp.canvas.isDrawingMode = false;
            }
            var top = canvas.height / 2 - 100;
            var left = canvas.width / 2 - 50;
            var triangle = new fabric.Triangle(wpStamp.defaultArray(top, left, 100, 100));
            triangle.fill = wpStamp.getCurrentColor();
            canvas.add(triangle);
            canvas.renderAll();
        });

        $('#paint-tools .poly a').on('click', function() {
             wpStamp.clearOther();if (wpStamp.canvas.isDrawingMode) {
               
                wpStamp.canvas.isDrawingMode = false;
            }
            var top = canvas.height / 2 - 100;
            var left = canvas.width / 2 - 50;
            var lines = new Array();
            var numberOfSides = (parseInt($(this).prev('input').val()) > 3 && parseInt($(this).prev('input').val())) ? parseInt($(this).prev('input').val()) : '5';
            var Xcenter = 25,
                Ycenter = 25;
            var size = 100;
            for (var i = 1; i <= numberOfSides; i += 1) {

                lines.push({
                    x: Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides),
                    y: Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)
                });
            }
            var poly = new fabric.Polygon(lines, wpStamp.defaultArray(top, left));
            poly.fill = wpStamp.getCurrentColor();
            canvas.add(poly);
           wpStamp.renderCanvas();
        });
        $('#paint-tools .line').on('click', function() {
           if (wpStamp.canvas.isDrawingMode) {
                wpStamp.canvas.isDrawingMode = false;
            }
            if (wpStamp.drawline ==  true  || $(this).hasClass('active')) {

                $(this).removeClass('active');
                $('.line-draw').hide();
             
               wpStamp.drawline = false;

            } else if (wpStamp.drawline == false || wpStamp.drawline == undefined) {
                    wpStamp.clearOther();
                $(this).addClass('active');

                $('#drawing-line-width')[0].noUiSlider.set('3')
                wpStamp.drawline = true;
            }

        });
        $('#paint-tools .circle').on('click', function() {
             wpStamp.clearOther();  
             if (wpStamp.canvas.isDrawingMode) {
               
                wpStamp.canvas.isDrawingMode = false;
            }

     

            var left =   canvas.width / 2 - 100;
            var top =   canvas.height / 2 - 100;
            var circle = new fabric.Circle({
                left: left,
                top: top,
                radius: 50, clipName: 'all'
            });
            circle.fill =   wpStamp.getCurrentColor();
               canvas.add(circle);
               canvas.renderAll();
        });
        }
    },
                  paginate: function (lpages,category,page){
                  var n=1;
                    $('#pagination').html('');
                    while (n <= lpages) {
                         
                        if (n == page) {

                            $('#pagination').append('<li class="active">' + (n) + '</li>');
                        } else {
                            $('#pagination').append('<li><a data-name="' +category + '" data-page="' + n + '" href="#">' + (n) + '</a></li>');
                   
                        }
                        n = n + 1;
                    }
                  },
                   loadCategory:function(id,page,category){
        var page=page;
        var paginationId = id;
    
        var category=category;
        console.log(category);
        jQuery.ajax({
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    //Upload progress
                    xhr.upload.addEventListener("progress", function(evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            wpStamp.progressBar(percentComplete);
                        }
                    }, false);

                    return xhr;
                },
                type: "POST",
                dataType: "json",
                async: true,
                url: fa_settings.site_url_,
                data: {
                    category: category,
                    page: page,
                    posts_per_page: jQuery('#pagination').attr("data-perpage"),
                    action: "paginate_media_gallery"

                },
                complete: function() {
                   wpStamp.hideProgressBar();
                },
                success: function(data, textStatus, XMLHttpRequest) {
                  var lpages = Math.ceil(Number(data.total) / Number(data.ppp));
                     if (data.page==0){data.page+=1}
                 
                  if(typeof paginationId=="undefined"){

                    var n = 1;

                   
                   var newid= Number($('.photo-list').length)!=='undefined' ? Number($('.photo-list').length)+1 :0;
       
                    var htmla=$('#gallery').append('<ul data-total="'+lpages+'" data-name="' + data.category + '" data-page="'+data.page+'" id="a' + newid+'" class="photo-list"></ul>');
                 wpStamp.paginate(lpages,data.category,data.page);

    



                    if (data.images.length > 0) {
                        var imglist = '';
                        jQuery.each(data.images, function(i, img) {
                            imglist += '<li><img class="list-image" src="' + img.thumb + '" data-full="' + img.full + '"/></li>';
                        });

                        $('.photo-list').removeClass('active');
                         $("#a"+ newid).html(imglist).addClass('active');
                        $(".photo-list,.product-list").niceScroll();
                    } else {

                      $('.photo-list').removeClass('active');
                         $("#a"+ newid).html('<li class="nothing">Nothing found</li>').addClass('active');
                       
                    }
                }else{
              
                  if (data.images.length > 0) {
                       wpStamp.paginate(lpages,data.category,data.page);

                        var imglist = '';
                        jQuery.each(data.images, function(i, img) {
                            imglist += '<li><img class="list-image" src="' + img.thumb + '" data-full="' + img.full + '"/></li>';
                        });
                     
                         $("#a"+ paginationId).html(imglist).addClass('active');
                        $(".photo-list,.product-list").niceScroll();
                      }  else {

                       
                    }
              }
           }
            });
    },
    addBackground:function(side,front,back){
        var front=front;
        var back=back;
        var canvas=wpStamp.canvas;
   

            var img=[$('.frontside img').attr('src'), $('.backside img').attr('src')];
               printScreen(img);
      


    function printScreen(imgs){ 
        var side=0;
        var imgs=imgs;
      
        $('.helper').addClass('exit');
          $('.helper').prepend('   <div class="bounceball"></div><div class="message">Creating your Product</div>')
         if  (wpStamp.side =='front'){
              wpStamp.flip(true);  
         }
       wpStamp.canvas.setOverlayImage(img[0], (function(){

                wpStamp.canvas.renderAll.bind(canvas);   
                $('.flipper').hide();  

                wpStamp.canvas.loadFromJSON(wpStamp.a, function() {
              
                     wpStamp.holders[0] = canvas.toDataURL('jpg',1);
               
                /*    if(!img[1]){
                        
                  }
               
                 if(img[1]){}*/
                    wpStamp.flip(true);
                    wpStamp.canvas.setOverlayImage(img[1], (function(){

                        wpStamp.canvas.renderAll.bind(canvas);   
          

                        wpStamp.canvas.loadFromJSON(wpStamp.b, function() {
                      
                           wpStamp.holders[1] = canvas.toDataURL('jpg',1);
      
                    wpStamp.sendAjax(wpStamp.$color, type = '',  wpStamp.holders[0] ,  wpStamp.holders[1], front, back);
                       
                        });
                    }).bind(canvas), {
                        globalCompositeOperation :'destination-over',meetOrSlice :'slice',
                        backgroundImageOpacity: 1,
                        width:canvas.width,
                        height:canvas.height,clipTo :null
                    });



                });
            }).bind(canvas), {
                globalCompositeOperation :'destination-over',meetOrSlice :'slice',
                backgroundImageOpacity: 1,
                width:canvas.width,
                height:canvas.height,clipTo :null
            });
    
    }


    },
    order:function(){
  
          var canvas = wpStamp.canvas;
       

          var current = JSON.stringify(canvas);
          var obj = JSON.parse(current);
      
            if (!wpStamp.a && !wpStamp.b && obj.objects.length == 0) {

                $(this).html('<em class="material-icons">info</em>Nothing to Create');
                setTimeout(function() {
                    $("#orderit-ajax").html('<em class="material-icons">shopping_cart</em>Create Product');
                }, 1000);

            } else {
            var front;
            var back;
               
             if(wpStamp.side=="back"){

                  wpStamp.a = JSON.stringify(canvas);
                
                 if(!wpStamp.b) {wpStamp.b='{"objects":""}';
                }
             }else if(wpStamp.side=="front"){
                if(!wpStamp.a){
                    wpStamp.a='{"objects":""}';
                }
                wpStamp.b = JSON.stringify(canvas);   
             }

              if ((JSON.parse(wpStamp.a).objects.length>0 && JSON.parse(wpStamp.b).objects.length>0) && wpStamp.hasback != 0) {
              
                    canvas.deactivateAll().renderAll();
              
                    front = JSON.stringify(wpStamp.a);
                    back = JSON.stringify(wpStamp.b);

                 
                    wpStamp.$color = canvas.backgroundColor;
                    wpStamp.addBackground("12",front,back);

                } else { 
                    wpStamp.$color = canvas.backgroundColor;
                    if (wpStamp.a && JSON.parse(wpStamp.a).objects.length>0) {
                      
                        front = JSON.stringify(wpStamp.a);
                        back = '';
                        canvas.loadFromJSON(wpStamp.a, function() {
                 
                            canvas.deactivateAll().renderAll();
                          
                             wpStamp.addBackground("1",front,back);
                
                        });

                    } else if (wpStamp.b && JSON.parse(wpStamp.b).objects.length>0) {
                
                        back = JSON.stringify(wpStamp.b);
                        front = '';
                        canvas.loadFromJSON(wpStamp.b, function() {
                            canvas.deactivateAll().renderAll();

                            wpStamp.addBackground("2",front,back);
          
                        });

                    }

                }
            }
    },
    clickControllers: function() {
  $('#zoomin').on('click',function(){
       wpStamp.zoomIn();

  });
            $('#zoomout').on('click',function(){

                wpStamp.zoomOut();
 
           });
        jQuery("body").on("click", "#gallery .gallery-nav li a", function(e) {

            e.preventDefault();

            var newid = $(this).attr('data-list');

            var openPanel=$('#gallery').find('#a'+newid);
            if(openPanel.length!==0){
                  $('.gallery-nav li a').removeClass('active');
                $(this).addClass('active');
                   $('.photo-list').removeClass('active');
                   openPanel.addClass('active');
                   wpStamp.paginate(openPanel.attr('data-total'),openPanel.attr('data-cat'),openPanel.attr('data-page'));
                   
            }else{
                var page = $(this).attr('data-page') ? $(this).attr('data-page') : 0;
                var category=$(this).attr('data-cat');
                console.log(category);
                $('.gallery-nav li a').removeClass('active');
                $(this).addClass('active');
                wpStamp.loadCategory(undefined,page,category);
              }
    
        });
        jQuery("body").on("click", "#pagination li a", function(e) {

            e.preventDefault();
            var newid = $('#gallery').find('.photo-list.active').attr('id').split('a')[1];
            var openPanel=$('#gallery').find('#a'+newid);
            var page = $(this).attr('data-page') ? $(this).attr('data-page') : 0;
            openPanel.attr('data-page',page);

            var category=$(this).attr('data-cat');
            $('#pagination li a').removeClass('active');
            $(this).addClass('active');
            wpStamp.loadCategory(newid,page,category);

        });

        jQuery("body").on("click", "#facebook", function(e) {
           wpStamp.facebook();
        });

        jQuery("body").on("click", "#instagram", function(e) {
           wpStamp.instagram();
        });

        $('.goback').on('click', function() {
            $('#accorde > h3').removeClass('bye');
            $(this).parent().removeClass('visible');
        });

        $('img').on('dragstart', function(event) {
            event.preventDefault();
        });

        $("body").on('click', '.user-list li .close', function() {
            var me = $(this);
            var attachmentId = me.prev().attr('data-id');

            me.parent().addClass('animated zoomOut');
            setTimeout(function() {
                me.parent().remove();
                if($('.user-list').size()==0){
                  //  $('.user-list').append('<li class="nothing">Upload your images</li>')
                }
            }, 800);

            jQuery.ajax({

                type: 'POST',
                dataType: "json",
                async: true,
                url: fa_settings.site_url_,
                data: {
                    id: attachmentId,
                    action: 'fa_delete_attachment'
                },
                success: function(data, textStatus, XMLHttpRequest) {
                    if (data.success == true) {
                        $(this).parent().remove();
                    }

                }
            });

        });


        $("#orderit-ajax").click(function(e) {
            e.preventDefault();
            wpStamp.order();
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
            inline: true, opacity :true,
                    swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split(',') : [],
            change: function(rgb,opacity) {

                var activeObject = wpStamp.canvas.getActiveObject();

                $('span.color-main').parent().css({
                    'background-color': this.value,
                    'color': wpStamp.invertColor(this.value)
                });

                if (activeObject && activeObject.type !== 'path') {
                  activeObject.set('fill',this.value );
                 activeObject.set('opacity',opacity );
                } else if (activeObject) {
                   activeObject.set('stroke',this.value );
                   activeObject.set('fill',opacity );
                }
                if (wpStamp.canvas.isDrawingMode) {
                    wpStamp.canvas.freeDrawingBrush.color = this.value;
                }
                if (activeObject && activeObject.type == "image") {
              activeObject.set('opacity',opacity );
                }
              if(activeObject){
                activeObject.setCoords();
              }
                wpStamp.renderCanvas();
            }
        });

 //    $('span.color-main').parent().css('background-color', $('#main-color').minicolors('value'));
 //    $('span.color-secondary').parent().css('background-color', $('#stroke-color').minicolors('value'));

        $("#stroke-color").minicolors({

            inline: true,     
                    swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split(',') : [],
            change: function(hex, rgb) {
                var activeObject = wpStamp.canvas.getActiveObject();
                $('span.color-secondary').parent().css({
                    'background-color': this.value,
                    'color': wpStamp.invertColor(this.value)
                });

              
                if (activeObject) {
          
                    activeObject.set('stroke',this.value );  
                    activeObject.setCoords();
                    wpStamp.renderCanvas();
                }

            }
        });

    wpStamp.sliders = document.getElementsByClassName('slider');
    var i=0;
    for (  i = 0; i < wpStamp.sliders.length; i++ ) {

        noUiSlider.create(wpStamp.sliders[i], { start: 0,
          
            orientation: "horizontal",
            range: {
                'min': 0,
                'max': 50
            }
        });
     }
   $('#drawing-line-width')[0].noUiSlider.on('slide', function(e){
             
                var _val = parseInt(e);
            
                     linewidth = _val;
                    wpStamp.canvas.freeDrawingBrush.width = parseInt(linewidth, 10) || 1;

            });
     $('#border-line-width')[0].noUiSlider.on('slide',function(e){
                 var _val = parseInt(e);
                var activeObject = wpStamp.canvas.getActiveObject();

                if (activeObject) {
                    var color = $("#stroke-color").minicolors("value") =='' ? "#555555" : $("#stroke-color").minicolors("value");
                                         
                        activeObject.set('stroke', color);

                        if (_val == 0) {
                            activeObject.set('stroke', null);
                            activeObject.set('strokeWidth','');
                        } else {
                           var strokeWidth =  (activeObject.type == "text") ? _val * 0.05 : _val;
                            activeObject.set('strokeWidth',strokeWidth);

                        }
                        activeObject.setCoords();
                        wpStamp.renderCanvas();
                    
                }
    });

     $('#radius')[0].noUiSlider.updateOptions({
      range: {
        min: 10,
        max: 400
    }
           
        },true);
     $('#spacing')[0].noUiSlider.updateOptions({
         range: {
            min: 0,
            max: 40
        }
           
        },true);


        $('#layer-trigger').on('click', function(e) {
            e.preventDefault()
            $(this).toggleClass('active');
           if( $(this).hasClass('active')){
            $('#layers').addClass('show');
        } else{
              $('#layers').removeClass('show');
              $(this).blur();
        }
    });
$('.designer-container h1').on('click', function(e) {
    e.preventDefault();
            var text=$(this).children('a').text();
            var id = $(this).attr('data-collapse');
            $(this).parent().removeClass('animated slideInRight').addClass('animated slideOutLeft');
            $(this).parent().parent().next().removeClass('hide').removeClass('animated slideOutRight').addClass('animated slideInRight');
            setTimeout(function(){ $('#' + id).addClass('collapse');},10);
            $('#' + id).children('.heading').html("<button class='back-menu'><em class='material-icons'>close</em></button><h2>"+text+"</h2>");

});
$('body').on('click','.heading > .back-menu',function(e){
    e.stopPropagation();
    e.preventDefault();
    var that=$(this);
    $('.designer-container .my-tools').removeClass('amimated slideOutLeft').addClass('animated slideInLeft');
    $('.designer-container .panels').removeClass('animated slideInRight').addClass(' animated slideOutRight'); 
    setTimeout(function(){ 
        that.parent().parent().removeClass('collapse');},500);
 
    });
     

     if (fa_settings.edit_id) {
             wpStamp.ajax_load(fa_settings.edit_id);
        }

      
        $('.tool-container').on('mouseover', function() {
            
            $('.tool-container').removeClass('closeme');
            $(this).data('close', '0');

        });
        $('#crop').on('click', function() {
            wpStamp.crop();
        });
        $('.handle').on('click', function() {
            $('.tools').toggleClass('mobile');
        });

        wpStamp.loadMediaCategories();
        wpStamp.extraTools();
    },
    crop:function(){
            var canvas=wpStamp.canvas;
             var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type == 'image') {
                var currentAngle = activeObject.getAngle();
                var currentScale = {
                    scaleY: activeObject.getScaleY(),
                    scaleX: activeObject.getScaleX()
                };
                var currentCoords = {
                    top: activeObject.top,
                    left: activeObject.left
                };


                htmlelement = activeObject._originalElement;
                $('.fa-modal').addClass('show');
                htmlelement.id = "target";
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
                                var canvas=wpStamp.canvas;
                                this.darkroom.selfDestroy(); // Cleanup
                                var newImage = dkrm.canvas.toDataURL();
                                fileStorageLocation = newImage;
                                canvas.remove(activeObject);
                                $('.fa-modal').removeClass('show');
                                fabric.Image.fromURL(newImage, function(image) {

                                    image.set({
                                        angle: currentAngle,
                                        top: currentCoords.top,
                                        left: currentCoords.left,
                                        scaleX: currentScale.scaleX,
                                        scaleY: currentScale.scaleY
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
            } else {

            }
    },
    loadMediaCategories: function(id) {
     
        var id = (typeof id === 'undefined') ? $('#tshirtFacing').attr('data-id') : id;

        jQuery.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with upload progress
                        wpStamp.progressBar(percentComplete);
                    }
                }, false);

                return xhr;
            },
            type: "POST",
            dataType: "json",

            url: fa_settings.site_url_,
            data: {

                action: "show_images",
                id: id
            },
            complete: function(data) {
                wpStamp.hideProgressBar();  
            },
            success: function(data, textStatus, XMLHttpRequest) {

                var media_categories = '';
                if(data){
                $.each(data, function(c, media) {
                    media_categories += '<li><a data-list="'+(c+2)+'" data-name="' + media.name + '" data-cat="' + media.id + '" href="#' + media.name + '">' + media.name + '</a></li>';
                
                });
                $('.carousel-frame').remove();
              $('#gallery').find('.gallery-nav').remove();
              $('#gallery').find('.photo-list').remove();
                $('#gallery').append('<ul class="gallery-nav"></ul>')
                 $('#gallery .gallery-nav').prepend(media_categories);
                 $('#gallery .gallery-nav').prepend("<li class='prev'><em class='material-icons'>keyboard_arrow_left</em></li>");
                 $('#gallery .gallery-nav').append("<li class='next'><em class='material-icons'>keyboard_arrow_right</em></li>");
                $("#gallery .gallery-nav").simplecarousel({
                    next: $('.next'),
                    prev: $('.prev'),
                    auto:false,
                    visible:2,
                    width:$('.panels').width()/2 - 50,
                 
                   
                });
                $(".photo-list,.product-list").niceScroll();

   
      
               $('#gallery .gallery-nav li a').eq(0).click();
}
            }
        });
    },
    extraTools: function() {
     var canvas=wpStamp.canvas;
       $("#return").on('click',function(e){
        e.preventDefault();
          $('#my-gallery .gallery-nav').hide();
          $('#my-gallery .upload-nav, #my-gallery .user-list').addClass('hidden');
          $('.selection-user-list').show();
       })
      //  fabric.util.addListener(fabric.document, 'dblclick', wpStamp.dblClickHandler);
        fabric.util.removeListener(canvas.upperCanvasEl, 'dblclick',wpStamp.dblClickHandler);
        var rgb2hex=function(rgb){
         rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
         return (rgb && rgb.length === 4) ? "#" +
          ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
        }
        $("#main-color-tool,#border-color-tool").on('click',function(e){
                e.preventDefault();
                  
                  wpStamp.mainColorTool=$(this).attr('id')=="main-color-tool" ? 1 : 2;

                  canvas.defaultCursor  = 'crosshair';
                   canvas.selection = false;
                    canvas.forEachObject(function(o) {
                      o.selectable = false;
                    });
         });
             $("canvas").on('mousemove',function(e){
               
              if(wpStamp.mainColorTool>0){
                ctx=canvas.getContext();
                     var data = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                                    canvas.defaultCursor  = 'crosshair';
                                
                                    if(wpStamp.mainColorTool==1){
                              $('#main-color').minicolors('value', rgb2hex('rgba('+data.join(',')+')'));
                           }else if(wpStamp.mainColorTool==2){

                              $('#stroke-color').minicolors('value', rgb2hex('rgba('+data.join(',')+')'));
                            }
              }
             });

            $("canvas").on('click',function(e){
            
                   if(wpStamp.mainColorTool>0){

                        ctx=canvas.getContext();
                        var data = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                        canvas.defaultCursor  = 'default';
                           if(wpStamp.mainColorTool==1){
                              $('#main-color').minicolors('value', rgb2hex('rgba('+data.join(',')+')'));
                           }else if(wpStamp.mainColorTool==2){
                              $('#stroke-color').minicolors('value', rgb2hex('rgba('+data.join(',')+')'));
                            }
                        wpStamp.mainColorTool=0;
                          canvas.defaultCursor  = 'default';
                             canvas.selection = true;
                            canvas.forEachObject(function(o) {
                              o.selectable = true;
                            });
                    }
                
            });


        $('body').on('click', '.user-list img, .photo-list img', function(e) {
            var path = $(this).data('full');
            var svg = path.split('.').pop();
            if (svg == 'svg') {
                wpStamp.addSvg(path);
            } else {
                wpStamp.addImage(path);
            }
        
            if (wpStamp.mobile == true) {
                $('.static').removeClass('collapse');
                $('.my-tools').removeClass('animated slideOutLeft').addClass('animated slideInLeft');
                $('.panels').removeClass('animated slideOutRight').addClass('animated slideInRight hide');
         
            }
        });
        $('.other-custom').on('click', function(e) {
            var id = $(this).children('a').attr('rel');
            wpStamp.ajax_load_parent(id);
        });

        $('body').on('click','.remove-selected',function() {
            wpStamp.removeSelected();
        });


        $('body').on('click','.bring-to-front',function() {
            var activeObject = canvas.getActiveObject(),
                activeGroup = canvas.getActiveGroup();
            if (activeObject) {
                activeObject.bringToFront();
            } else if (activeGroup) {
                var objectsInGroup = activeGroup.getObjects();
                canvas.discardActiveGroup();
                objectsInGroup.forEach(function(object) {
                    object.bringToFront();
                });
            }else{
                  var obj = wpStamp.getObjectById($(this).parent().parent().attr('data-id'));
                            wpStamp.canvas.bringToFront(obj);
                        
            }
           var eq=$(this).parent().parent().index();
           if(eq>0){
               $("#layers li:eq("+eq+")").after($("#layers li:eq("+(eq-1)+")"));
            } 
              
        });
        $('body').on('click','.send-to-back',function() {
        console.info('dojk');
            var activeObject = canvas.getActiveObject(),
                activeGroup = canvas.getActiveGroup();
          
            if (activeObject) {
                activeObject.sendToBack();
                        console.log("SENDED");
            }else if (activeGroup) {
            
                var objectsInGroup = activeGroup.getObjects();
                canvas.discardActiveGroup();
                objectsInGroup.forEach(function(object) {
                    object.sendToBack();
                });
            }else{
          try{
                 var obj = wpStamp.getObjectById($(this).parent().parent().attr('data-id'));
                 wpStamp.canvas.sendToBack(obj);
            }catch(ex){

            }
            }
                        var eq = $(this).parent().parent().index();
                      
                        if(eq < $('ul#layers').size() ){
                            $("#layers li:eq("+eq+")").before($("#layers li:eq("+(eq+1)+")"));
                         }
        });

      
        $('#upload-input').on('change', function(e) {

              wpStamp.handleFiles(e);
         
        });

        $('#user-library').on('click', function(e) {
          var that=$(this);
        if($('#my-gallery').has('#user-list').length>0){
              $('.selection-user-list').hide();
              $('.upload-nav').removeClass('hidden');
              $('#my-gallery #user-list').removeClass('hidden')
          }else{
           that.html('<em class="material-icons">error</em>Please upload an image');
           setTimeout(function(){that.html('<em class="material-icons">photo_library</em>My Library')},1000);
          }
        });

        /*drag stuff*/
        var links = document.querySelectorAll(".photo img"),
            el = null;

        for (var i = 0; i < links.length; i++) {
            el = links[i];
            el.setAttribute("draggable", "true");
           wpStamp.addEvent(el, "dragstart", function(e) {
                e.dataTransfer.effectAllowed = "copy";

                e.dataTransfer.setData("Text", this.src);
            });
        }
        var bin = document.body;

       $('body').on("dragover", function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
           
            this.className = "over";
            e.originalEvent.dataTransfer.dropEffect = "copy";
            return false;
        });
        $('body').on( "dragenter", function(e) {
            this.className = "";
            return false;
        });
       $('body').on("dragleave", function() {
            this.className = "";
        });
        $('body').on("drop", function(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            this.className = "";
            e.stopPropagation();
            e.preventDefault();
            if (e.originalEvent.dataTransfer.files[0]) {

                wpStamp.handleFiles(e.originalEvent.dataTransfer.files[0], true);
            } else {
                var el = e.originalEvent.dataTransfer.getData("Text");

                wpStamp.dropthat(el, e.clientX - 140, e.clientY - 140);
            }

            return false;
        });
        /*drag stuff end*/

        $('#flip').on('click', function() {
          $(this).toggleClass('hover');
           
           
           wpStamp.flip(false);
        });

        $('#redo').on('click', function() {
       //    wpStamp.redo();

        });
        $('#undo').on('click', function() {
           //  wpStamp.undo();


        });
    },variationPlugin:{
        load:function(){
           $('body').on('click', '#backgrounds a', function(e) {
                e.preventDefault();

                $('#backgrounds li').removeClass('selected');
                $(this).parent().toggleClass('selected');
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
        }
    },
updateModifications:function(savehistory) {
 /*
      if (savehistory === true ) {
      
        myjson = JSON.stringify(wpStamp.canvas);
          if(wpStamp.state.length>3){
            var d=wpStamp.state.pop();
            wpStamp.state[0]=d;
            wpStamp.mods=0;
            
          }
            wpStamp.state.push(myjson);
        }else{

    }
    */
   
 },

    // Start functions
    onObjectAdded: function(e) {
        var id =   wpStamp.canvas.getObjects().length - 1;

        if (e.target.type == 'image') {
            icon = "image";
        }
        if (e.target.type == 'text') {
            icon = "font_download";
        }
        if (e.target.type == 'path') {
            icon = "timeline";
        } else {
            icon = "crop_landscape"
        }
         if( wpStamp.isDown==false && e.target.type!=='line' && e.target.clipFor!='all'){
            e.target.set('id', id);
            wpStamp.canvas.renderAll();
            wpStamp.layersPlugin.add(id,icon,e.target.type);
           }

           wpStamp.checkPrice();

//          wpStamp.updateModifications(true)

    },
    undo: function() {
    
        if (wpStamp.mods < wpStamp.state.length) {
            wpStamp.canvas.clear().renderAll();
           wpStamp.canvas.loadFromJSON(wpStamp.state[wpStamp.state.length - 1 - wpStamp.mods - 1],wpStamp.canvas.renderAll.bind(wpStamp.canvas));
             
            wpStamp.canvas.renderAll();
            //console.log("geladen " + (state.length-1-mods-1));
            console.log("state " + wpStamp.state.length);
            wpStamp.mods += 1;
            //console.log("mods " + mods);
        }
    },
    redo: function() {
          if (wpStamp.mods > 0) {
        wpStamp.canvas.clear().renderAll();
        wpStamp.canvas.loadFromJSON(wpStamp.state[wpStamp.state.length - 1 - wpStamp.mods + 1],wpStamp.canvas.renderAll.bind(wpStamp.canvas) );
        wpStamp.canvas.renderAll();
        //console.log("geladen " + (state.length-1-mods+1));
        wpStamp.mods -= 1;
        //console.log("state " + state.length);
        //console.log("mods " + mods);
    }
    },
    clearOther: function() {

        var drawingModeEl = $('.freedraw');
        $('.color-secondary').parent().removeClass('disabled');
        wpStamp.drawline = false;
        $('.line-draw').hide();
        $('#paint-tools a').removeClass('active');

    },
    zoomIn: function() {

    var canvas=wpStamp.canvas;
    var deltaY=100;
   
      var newZoom = (canvas.getZoom() + deltaY / 300)<=1 ? 1 : canvas.getZoom() + deltaY / 300;
      wpStamp.zoom=newZoom;
      canvas.zoomToPoint({ x: wpStamp.canvas.getWidth()/2, y:  wpStamp.canvas.getHeight()/2, }, newZoom);
      wpStamp.renderCanvas();

        $('.t-container').css({
            'top':  (canvas.viewportTransform[4])+ 'px',
            'left': canvas.viewportTransform[5]+ 'px',
            'width': canvas.getWidth() * canvas.getZoom() *wpStamp.ratio + 'px',
            'height':  canvas.getHeight() * canvas.getZoom()*wpStamp.ratio + 'px'
        });
  

       wpStamp.realArea(canvas.getZoom());
       wpStamp.renderCanvas();

 

    },

    zoomCanvas: function(type) {var canvas=wpStamp.canvas;

    },

  
    applyFilter: function(index, filter) {
        var obj = canvas.getActiveObject();
        obj.filters[index] = filter;
        obj.applyFilters(canvas.renderAll.bind(canvas));
    },

    applyFilterValue: function(index, prop, value) {
        var obj = canvas.getActiveObject();
        if (obj.filters[index]) {
            obj.filters[index][prop] = value;
            obj.applyFilters(canvas.renderAll.bind(canvas));
        }
    },

    //the zoom functions
    zoomOut: function() {
    var canvas=wpStamp.canvas;
    var deltaY=(-1)*100;
   // $(canvas.getElement().parentNode).on('mousewheel', function(e) {
   
      var newZoom = (canvas.getZoom() + deltaY / 300)<=1 ? 1 : canvas.getZoom() + deltaY / 300;
      wpStamp.zoom=newZoom;
   
        canvas.zoomToPoint({ x: wpStamp.canvas.getWidth()/2, y:  wpStamp.canvas.getHeight()/2, }, newZoom);
           wpStamp.renderCanvas();

   

        $('.t-container').css({
            'top':  canvas.viewportTransform[4]+ 'px',
            'left':  canvas.viewportTransform[5]+ 'px',
            'width': canvas.getWidth() * canvas.getZoom()*wpStamp.ratio + 'px',
            'height':  canvas.getHeight() * canvas.getZoom()*wpStamp.ratio + 'px'
        });
       
       wpStamp.realArea(canvas.getZoom());
       wpStamp.renderCanvas();
    },

    flip: function( savemode) {
       
        var canvas= wpStamp.canvas;
        var savemode = (typeof savemode === "undefined") ? "false" : savemode;
        $('#layers').html('<li class="nothing">No layers</li>');
        wpStamp.checkPrice();
        if ( wpStamp.hasback == 1) {

            if (wpStamp.side=="back" ) {
             

                $('#flip').attr('data-original', 'front');
                                 
                     wpStamp.side='front';    
                      wpStamp.realArea();
                      //save A side - we are now in back;
                    wpStamp.a = JSON.stringify(canvas);
                  
                if (savemode == false) {
                    $('#tshirtFacing').addClass('flip');
                }
                canvas.clear();
                wpStamp.renderCanvas();

                try {
                    var json = JSON.parse(wpStamp.b);    
                    canvas.loadFromJSON(wpStamp.b);
                   wpStamp.renderCanvas();
                } catch (e) {

                }

                wpStamp.renderCanvas();
                setTimeout(function() {
                     wpStamp.renderCanvas();
                }, 200);

            } else {


                if (savemode == false) {
                    $('#tshirtFacing').removeClass('flip');

                }
                $('#flip').attr('data-original', 'back');
                 wpStamp.side='back';
                 wpStamp.realArea();
                //save B side - we are now in front;
                 wpStamp.b = JSON.stringify( canvas );

                  canvas.clear();
                  wpStamp.renderCanvas();
                try {
                    var json = JSON.parse(wpStamp.a);
                    canvas.loadFromJSON(wpStamp.a);
                
                     wpStamp.renderCanvas();
                } catch (e) {
                    console.log(e);
                }

                   wpStamp.renderCanvas();
                setTimeout(function() {
                       wpStamp.renderCanvas();
                }, 200);

            }

        } else {

            $('#flip').attr('data-original', 'front');
                wpStamp.side='front';
           
                wpStamp.a = JSON.stringify(canvas);
            if ( savemode == false) {
                $('#tshirtFacing').addClass('flip');
            }
              canvas.clear();
              wpStamp.renderCanvas();

            try {
                var json = JSON.parse(wpStamp.b);
                 canvas.loadFromJSON(wpStamp.b);
                 wpStamp.renderCanvas();
            } catch (e) {

            }
            wpStamp.renderCanvas();
            setTimeout(function() {
                wpStamp.renderCanvas();
            }, 200);
        }
    },

    initCustomization: function() {
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.opacity = 1;
        fabric.Object.prototype.cornerColor = fa_settings.setting_corner_color_;
        fabric.Object.prototype.borderColor = fa_settings.setting_border_color_;

        fabric.Object.prototype.hasRotatingPoint = false;
        fabric.Object.prototype.cornerSize = fa_settings.setting_corner_width_;

        if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
          //  fabric.Object.prototype.cornerSize = fa_settings.setting_corner_width_ + 30;
        }

    },

    hideProgressBar: function() {
        $('.progress-bar').removeClass('active');
        $('.progress-bar').children('span').css('width', 0);
        //$('.darken-back').addClass('hidden');
    },

    progressBar: function(progress) {
        if (!$('.progress-bar').hasClass('active')) {
            $('.progress-bar').addClass('active');
        }
        //$('.darken-back').removeClass('hidden');
        $('.progress-bar > span').css('width', progress * 100 + '%');

    },
    addLibrary: function(url, id) {
       
        $('#my-gallery .selection-user-list').hide();
     
        $('#my-gallery .gallery-nav').removeClass('active');

  if(  $('#my-gallery').has('#user-list').length == 0){
        $('#my-gallery').append('<ul class="user-list" id="user-list"></ul>');  
  }else{
     $('#user-list').removeClass('hidden')
  }
   var uploadWrap = $('#my-gallery #user-list');
        uploadWrap.prepend('<li><img data-full="' + url + '" data-id="' + id + '" src="' + url + '" /><span class="close"><em class="material-icons">close</em></span></li>');
        uploadWrap.niceScroll();
        $('.upload-nav').removeClass('hidden');
      uploadWrap.getNiceScroll().resize();
    },

    createListenersKeyboard: function() {
        document.onkeydown = wpStamp.onKeyDownHandler;
        //document.onkeyup = onKeyUpHandler;
    },
    onKeyDownHandler: function(event) {
        //event.preventDefault();

        var key;
        if (window.event) {
            key = window.event.keyCode;
        } else {
            key = event.keyCode;
        }

        switch (key) {
            //////////////
            // Shortcuts
            //////////////
            // Copy (Ctrl+C)
            case 67: // Ctrl+C
                if (wpStamp.ableToShortcut()) {
                    if (event.ctrlKey) {
                        event.preventDefault();
                        copy();
                    }
                }
                break;
                // Paste (Ctrl+V)
            case 86: // Ctrl+V
                if (wpStamp.ableToShortcut()) {
                    if (event.ctrlKey) {
                        event.preventDefault();
                        paste();
                    }
                }
                break;
            case 46:
                if (wpStamp.ableToShortcut()) {

                    event.preventDefault();
                    wpStamp.removeSelected();

                }
            default:
                // TODO
                break;
        }
    },
    removeSelected: function() {
        var canvas=wpStamp.canvas;
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeObject) {
            canvas.remove(activeObject);
            $("#text-string").val("");
                $('#layers').find('li#'+activeObject.id).remove();
         

        } else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
                canvas.remove(object);
                 $('#layers').find('li#'+object.id).remove();
            });
        }
    },
    ableToShortcut: function() {
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
    },
    invertColor: function(hexTripletColor) {
        var color = hexTripletColor;
        color = color.substring(1); // remove #
        color = parseInt(color, 16); // convert to integer

        color = 0xFFFFFF ^ color; // invert three bytes
        color = color.toString(16); // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
    //    color = "#" + color; // prepend #
    //    return color;

  return (parseInt(color,16) > 0xffffff/2) ? '#fff':'#111'; 

    },
    copy: function() {
        if (canvas.getActiveGroup()) {
            for (var i in canvas.getActiveGroup().objects) {
                var object = fabric.util.object.clone(canvas.getActiveGroup().objects[i]);
                object.set("top", object.top + 5);
                object.set("left", object.left + 5);
                copiedObjects[i] = object;
            }
        } else if (canvas.getActiveObject()) {
            var object = fabric.util.object.clone(canvas.getActiveObject());
            object.set("top", object.top + 5);
            object.set("left", object.left + 5);
            copiedObject = object;
            copiedObjects = new Array();
        }
    },

    paste: function() {
        if (copiedObjects.length > 0) {
            for (var i in copiedObjects) {
                canvas.add(copiedObjects[i]);
            }
        } else if (copiedObject) {
            canvas.add(copiedObject);
        }
        canvas.renderAll();
    },
    handleFiles: function(e, isDragged) {
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

                    /*jQuery.ajax({
                        type: 'POST',
                        dataType: "json",
                        async: true,
                        url: fa_settings.site_url_,
                        data: {
                            base: this.src,
                            filename: fileName,
                            id: postid,
                            action: 'fa_upload_attachment'
                        }, xhr: function() {
                                var xhr = new window.XMLHttpRequest();
                                //Upload progress
                                xhr.upload.addEventListener("progress", function(evt) {
                                    if (evt.lengthComputable) {
                                        var percentComplete = evt.loaded / evt.total;
                                        //Do something with upload progress
                                        wpStamp.progressBar(percentComplete);
                                    }
                                }, false);

                                return xhr;
                            },
                        success: function(data, textStatus, XMLHttpRequest) {
                            if (data.success == true) {
                               wpStamp.addLibrary(data.url, data.id);
                                 wpStamp.addImage(data.url);
                            }

                        },
                        error: function(MLHttpRequest, textStatus, errorThrown) {

                        },
                        complete: function() {
                           wpStamp.hideProgressBar();
                        }
                    });*/
  wpStamp.addLibrary(img.src, postid);
   wpStamp.addImage(img.src);
                };
            };

            reader.readAsDataURL(e);

        } else {

            var files = e.target.files;

            for (var i = 0, file; file = files[i]; i++) {
                var fileName = file.name;
                var reader = new FileReader;
                reader.onprogress = function(evt) {
                    if (evt.lengthComputable) {
                         var percentComplete = evt.loaded / evt.total;
                         wpStamp.progressBar(percentComplete);
                    }

                };
                reader.onload = function(event) {
                    request = new XMLHttpRequest();
                     wpStamp.hideProgressBar();
                    var img = new Image;
                   try{
                    img.src = event.target.result;
                  }catch(ex){
                    alert("error loading file(s)")
                  }
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
                         wpStamp.addLibrary(img.src, postid);

                         wpStamp.addImage(img.src);
                    };
                };
                reader.readAsDataURL(e.target.files[i]);
            }
        }
    },
    dataURItoBlob: function(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
            type: 'image/jpeg'
        });
    },
    getObjectById: function(id) {
        var canvas=wpStamp.canvas;
        var objsInCanvas = canvas.getObjects();
        console.log(objsInCanvas);
        if(objsInCanvas.length>0){
            for (obj in objsInCanvas) {

                if (objsInCanvas[obj] && objsInCanvas[obj].get('id') == id) {
                    return objsInCanvas[obj];
                }else{
                   // return false;
                }
            }
        }
    },
    addEvent: function() {
        if (document.addEventListener) {

            return function(el, type, fn) {
                if (el && el.nodeName || el === window) {
                    el.addEventListener(type, fn, false);
                    console.log("E");
                } else {
                    if (el && el.length) {
                        for (var i = 0; i < el.length; i++) {
                           wpStamp.addEvent(el[i], type, fn);
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
                            wpStamp.addEvent(el[i], type, fn);
                        }
                    }
                }
            };
        }
    },
    getRandomNum: function(min, max) {
        return Math.random() * (max - min) + min;
    },

    onMouseUp: function() {

        if (  wpStamp.lineW ||   wpStamp.lineH) {
              wpStamp.canvas.remove(  wpStamp.lineW);
              wpStamp.canvas.remove(  wpStamp.lineH);
        }
          wpStamp.lineAdded = false;
          wpStamp.isDown = false;
          wpStamp.canvas.selectable  = true;
          wpStamp.canvas.renderAll();
    },
    onObjectMoving: function(e) {
  
        if (  wpStamp.lineAdded == false) {
      
        if( wpStamp.side=='back'){
            var rleft=$('#tcanvas').attr('data-left')!=='' ? Number($('#tcanvas').attr('data-left')) : 0;
            var rtop=$('#tcanvas').attr('data-top')!==''  ? Number($('#tcanvas').attr('data-top')) : 0;
            var rwidth=$('#tcanvas').attr('data-width')!==''  ? Number($('#tcanvas').attr('data-width')) : Number($('#tcanvas').width());
            var rheight=$('#tcanvas').attr('data-height')!==''  ? Number($('#tcanvas').attr('data-height')) : Number($('#tcanvas').height());
        }else{
            var rleft=$('#tcanvas').attr('data-leftb')!==''  ? Number($('#tcanvas').attr('data-leftb')) : 0;
            var rtop=$('#tcanvas').attr('data-topb')!==''  ? Number($('#tcanvas').attr('data-topb')) : 0;
            var rwidth=$('#tcanvas').attr('data-widthb')!=='' ? Number($('#tcanvas').attr('data-widthb')) : Number($('#tcanvas').width());
            var rheight=$('#tcanvas').attr('data-heightb')!=='' ? Number($('#tcanvas').attr('data-heightb')) :  Number($('#tcanvas').height());
        }
         
            var middleW =  (rwidth*wpStamp.ratio / 2) + rleft*wpStamp.ratio;
            var middleH =  rheight*wpStamp.ratio  / 2 + rtop*wpStamp.ratio;
            var heightCanvas = rheight*wpStamp.ratio +rtop*wpStamp.ratio;
            var widthCanvas = rwidth*wpStamp.ratio +rleft*wpStamp.ratio;
         

           wpStamp.lineW = new fabric.Line([middleW, 0, middleW, heightCanvas], {
                stroke: 'magenta',
                strokeWidth: 0.5,
                selectable: false
            });
             wpStamp.lineH = new fabric.Line([0, middleH, widthCanvas, middleH], {
                stroke: 'magenta',
                strokeWidth: 0.5,
                selectable: false
            });


              wpStamp.canvas.add(wpStamp.lineW);
              wpStamp.canvas.add(wpStamp.lineH);
              wpStamp.renderCanvas();
              wpStamp.lineAdded = true;
           //   wpStamp.state.splice(wpStamp.state.length-1,2);
        }else{

        }
    },
    positionBtn: function(obj) {

        fabric.Canvas.prototype.getAbsoluteCoords = function(object) {
            return {
                left: object.left,
                top: object.top /*+ this._offset.top+ this._offset.left*/
            };
        };
        var toolset = $('#moving-tools');

    },
    onSelectedCleared: function(e) {
        $('.convert').hide();
        $('.material-toolbox').addClass('hidden');
        var id= $('.convert').attr('data-collapse');
        $('#'+id).hide();
        $("#text-tool a").removeClass('active');
        $('#text-string').val('');
        $('#border-line-width')[0].noUiSlider.set([this.value, null]);
        $('#radius')[0].noUiSlider.set([this.value, null]);
        $('#spacing')[0].noUiSlider.set([this.value, null]);
        $('#layers').find('li').removeClass('active');
    },
    instagram:function(){

var accessToken = null; //the access token is required to make any endpoint calls, http://instagram.com/developer/endpoints/
    function  authenticateInstagram(instagramClientId, instagramRedirectUri, callback) {
      //the pop-up window size, change if you want
      var popupWidth = 700,
        popupHeight = 500,
        popupLeft = (window.screen.width - popupWidth) / 2,
        popupTop = (window.screen.height - popupHeight) / 2;
      //the url needs to point to instagram_auth.php
      console.log(fa_settings.instagram);
      var popup = window.open(fa_settings.instagram, '', 'width='+popupWidth+',height='+popupHeight+',left='+popupLeft+',top='+popupTop+'');
      popup.onload = function() {
        //open authorize url in pop-up
        if(window.location.hash.length == 0) {   }
          console.log("EEEEEEEEEEEEE");
        popup.open('https://instagram.com/oauth/authorize/?client_id='+instagramClientId+'&redirect_uri='+instagramRedirectUri+'&response_type=token&scope=public_content', '_self');
     
        //an interval runs to get the access token from the pop-up
        var interval = setInterval(function() {
          try {
            //check if hash exists
            if(popup.location.hash.length) {
              //hash found, that includes the access token
              clearInterval(interval);
              accessToken = popup.location.hash.slice(14); //slice #access_token= from string
              popup.close();
              if(callback != undefined && typeof callback == 'function') callback();
            }
          }
          catch(evt) {
            //permission denied
          }
        }, 100);
      }
    }
    function login_callback() {
    //  alert("You are successfully logged in! Access Token: "+accessToken);
    $.ajax({
                url :  "https://api.instagram.com/v1/users/self/media/recent/?access_token="+accessToken,
                dataType : 'jsonp',
                cache : false,
                success:  function(data){ 
             
                    if(data.data.length>0){
                                      var imglist = '';
                                      $.each(data.data, function(i, img) {
                                          imglist += '<li><img class="list-image" src="' + img.images.low_resolution.url + '" data-full="' +img.images.standard_resolution.url + '"/></li>';
                                      });

                                      $('.selection-user-list').hide();
                                 
                                       if(  $('#my-gallery').has('#instagram-list').length ==0){
                                           $('#my-gallery').append('<ul class="user-list" id="instagram-list"></ul>');
                                        }else{
                                          $('#instagram-list').removeClass('hidden');
                                        }

                                      $("#instagram-list").html(imglist);
                                      $("#instagram-list").niceScroll();
                                      $('.upload-nav').removeClass('hidden');
                                }
           }
      });
    }
  login();
    function login() {

      authenticateInstagram(
          '2390264c2316499ab86af6b7295b1d73', //instagram client ID
          fa_settings.instagram, //instagram redirect URI
          login_callback //optional - a callback function
      );
      return false;
    }


    },
    facebook: function() {
       var percentComplete = 1;
       var fbProgress= setInterval(function(){percentComplete+=1; wpStamp.progressBar(percentComplete) },1000);
     $.getScript('//connect.facebook.net/en_US/sdk.js', function() {
            FB.init({
                appId: '161922393945949',
                version: 'v2.5'
            });
            $('#loginbutton,#feedbutton').removeAttr('disabled');
            FB.getLoginStatus(function(response) {
               var response=response;
                if (response.status === 'connected') {
               
                   $('body').on('click','#my-gallery .gallery-nav .fbc',function(e){
                    $('#my-gallery .gallery-nav .fbc').removeClass('active');
                    $(this).addClass('active');
                       var albumId=$(this).attr('data-cat');
                    
                         wpStamp.fbPhoto(response,albumId,0,9);
         
                   });
                      
                                 
                  FB.api(
                      "/"+response.authResponse.userID+"/albums",
                      function (response) {
                        if (response && !response.error) {
                          var facebook_categories="";
                         $.each(response.data, function(c, media) {

                          facebook_categories += '<li><a class="fbc" data-name="' + media.name + '" data-cat="' + media.id + '" href="#' + media.name + '">' + media.name + '</a></li>';
                      
                      });


                  clearInterval(fbProgress);
                   wpStamp.hideProgressBar();    
                      $('#my-gallery .gallery-nav').html();  
                 $('#my-gallery .gallery-nav').prepend(facebook_categories);
                 $('#my-gallery .gallery-nav').prepend("<li class='prev'><em class='material-icons'>keyboard_arrow_left</em></li>");
                 $('#my-gallery .gallery-nav').append("<li class='next'><em class='material-icons'>keyboard_arrow_right</em></li>");
                $("#my-gallery .gallery-nav").simplecarousel({
                    next: $('.next'),
                    prev: $('.prev'),
                    auto:false,
                    visible:2,
                    width:$('.panels').width()/2 - 50,
                 
                   
                });
                   $('.upload-nav').removeClass('hidden');
                            $('#my-gallery .gallery-nav  a.fbc').eq(0).click();
                        }
                      }
                  );
                } else {

                    FB.login(function() {}, {
                        scope: 'user_photos'
                    });
                }
            });
        });
    },
    fbPhoto:function(response,albid,start,end){
        var albid=albid;
       
      var fbQuery="SELECT src_big, caption, src_small, src FROM photo WHERE owner ="+ response.authResponse.userID+" AND album_object_id = "+albid;

                 var percentComplete = 1;
                      var fbProgress= setInterval(function(){percentComplete+=1; wpStamp.progressBar(percentComplete) },1000);

                        FB.api({
                                method: 'fql.query',
                                query: fbQuery

                            },
                            function(data) {
                              
                                if(data.length>0){
                                var imglist = '';
                                $.each(data, function(i, img) {
                                    imglist += '<li><img class="list-image" src="' + img.src_small + '" data-full="' + img.src_big + '"/></li>';
                                });
                                $('.selection-user-list').hide();
                                if(  $('#my-gallery').has('#facebook-list').length ==0){
                                   $('#my-gallery').append('<ul class="user-list" id="facebook-list"></ul>');
                                }else{
                                  $('#facebook-list').removeClass('hidden');
                                }
                                 $('#my-gallery .gallery-nav').show();
                                $('#facebook-list').html(imglist);
                                $('#facebook-list').niceScroll();
                              

                  clearInterval(fbProgress);
                      wpStamp.hideProgressBar();         
                                }
                            }
                        );
                  /*  });*/
},
    updateStatusCallback: function(e) {

        try {
            FB.api('/me', function(response) {
                fbinfo = new Array();
                fbinfo[0] = response.id;
                fbinfo[1] = response.first_name;
                fbinfo[2] = response.last_name;
                fbinfo[3] = response.email;

              //  var im = document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
            });
        } catch (ex) {
            //ex
        }
    },
    onObjectSelected: function(e) {
        /*  if($('#tshirtFacing').draggable()){
    // $('#tshirtFacing').draggable('disable');
    }*/
        // wpStamp.renderCanvas();
        var selectedObject = e.target;
        $('.material-toolbox').removeClass('hidden');
        selectedObject.hasRotatingPoint = true;
      
        $('#layers').find('li.active').removeClass('active');
        $('#layers').find('#' + e.target.id).addClass('active');

        if (selectedObject && selectedObject.type === 'text' || selectedObject.type ==='curvedText' ) {
            //check if text
              $('.convert').show();
           
            if(selectedObject.type==='curvedText'){
                 $('#convert-curve').show();
                 $('.convert').addClass('actived');
                 $('#radius')[0].noUiSlider.set(parseInt(selectedObject.radius));
                 $('#spacing')[0].noUiSlider.set(parseInt(selectedObject.spacing));
            }else{
                 $('.convert').removeClass('actived');
                 $('.toolbox').hide();
            }

            $("#text-tool a").removeClass('active');
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
            if (selectedObject.textAlign == 'left') {
                $("#text-align-left").addClass('active');
            } else if (selectedObject.textAlign == 'center') {
                $("#text-align-center").addClass('active');
            } else if (selectedObject.textAlign == 'right') {
                $("#text-align-right").addClass('active');
            }

            if (selectedObject.fill) {
                $('#main-color').minicolors('opacity', selectedObject.opacity);
                $('#main-color').minicolors('value', selectedObject.fill);
            }


        }
    

        if (selectedObject && selectedObject.type !== 'path') {

            if (selectedObject.fill && selectedObject.fill != 'rgb(0,0,0)') {
                $('#main-color').minicolors('value', selectedObject.fill);
                 $('#main-color').minicolors('opacity', selectedObject.opacity);
            } else {
                $('#main-color').minicolors('value', "#555");
                 $('#main-color').minicolors('opacity', selectedObject.opacity);

            }
            if (selectedObject.stroke != '' && selectedObject.fill != 'rgb(0,0,0)') {
                var getStrokeWidth = selectedObject.type == "text" ? selectedObject.getStrokeWidth() * 10 : selectedObject.getStrokeWidth();
                
                  $('#stroke-color').minicolors('value', selectedObject.stroke);
                  $('#border-line-width')[0].noUiSlider.set(selectedObject.strokeWidth);
          
               //  $('#border-line-width')[0].noUiSlider.set([this.value, getStrokeWidth]) ;

            } else {

            }
        }
    },

    defaultArray: function(top, left, width, height) {

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
    },


    dropthat: function(e, x, y) {
        var canvas = wpStamp.canvas;
        var left = x;
        var top = y;

        fabric.Image.fromURL(e, function(image) {
            image.set(wpStamp.defaultArray(top, left));
            image.setCoords();
            canvas.add(image);
            image.crossOrigin = "Anonymous";
        });
    },

    getCurrentColor: function() {
        if ($('#main-color').minicolors()) {
            return $('#main-color').val();
        } else {
            return '#515151';
        }
    },
    addSvg: function(e) {
        var canvas = wpStamp.canvas;
        var group = [];
        try {
            fabric.loadSVGFromURL(e, function(objects, options) {
                var loadedObject = fabric.util.groupSVGElements(objects, options);
                var loadedObjects = new fabric.Group(group);
                loadedObject.set(wpStamp.defaultArray(100, 100));
                canvas.add(loadedObject);
                wpStamp.cache();
                wpStamp.renderCanvas();
            });
        } catch (ctx) {

        }
    },
    convertImgToDataURLviaCanvas: function(url, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
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
    },

    convertFileToDataURLviaFileReader: function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();
    },
           findByClipName:    function (name) {
                     var canvas=wpStamp.canvas;
                     var objsInCanvas = canvas.getObjects();
                     console.log(objsInCanvas);
                     for (obj in objsInCanvas) {
                   
                            if (objsInCanvas[obj].get('clipFor') == name) {
                           
                                return objsInCanvas[obj];
                                
                            }
                        }
                   
                    },

                    // Since the `angle` property of the Image object is stored 
                    // in degrees, we'll use this to convert it to radians.
                     degToRad:function(degrees) {
                        return degrees * (Math.PI / 180);
                    },
      clipByName : function (ctx,image) {
                        image.setCoords();
                      
                        var clipRect = wpStamp.findByClipName(image.clipName);
                        console.log(clipRect);
                        var scaleXTo1 = (1 / image.scaleX);
                        var scaleYTo1 = (1 / image.scaleY);
                        ctx.save();
                        
                        var ctxLeft = -( image.width / 2 ) + clipRect.strokeWidth;
                            var ctxTop = -( image.height / 2 ) + clipRect.strokeWidth;
                            var ctxWidth = clipRect.width - clipRect.strokeWidth;
                            var ctxHeight = clipRect.height - clipRect.strokeWidth;

                        ctx.translate( ctxLeft, ctxTop );
                        
                        ctx.rotate(wpStamp.degToRad(image.angle * -1));
                        ctx.scale(scaleXTo1, scaleYTo1);
                        ctx.beginPath();
                        ctx.lineWidth="1";
                        ctx.strokeStyle="magenta";
                        ctx.rect(
                            clipRect.left - image.oCoords.tl.x,
                            clipRect.top - image.oCoords.tl.y,
                            clipRect.width,
                            clipRect.height
                        );ctx.stroke();
                        ctx.closePath();
                        ctx.restore();
                    },
    addImage: function(e) {
            if( wpStamp.side=='back'){
            var rleft=Number($('#tcanvas').attr('data-left'));
            var rtop=Number($('#tcanvas').attr('data-top'));
            var rwidth=Number($('#tcanvas').attr('data-width'));
            var rheight=Number($('#tcanvas').attr('data-height'));
        }else{
          var rleft=Number($('#tcanvas').attr('data-leftb'));
            var rtop=Number($('#tcanvas').attr('data-topb'));
            var rwidth=Number($('#tcanvas').attr('data-widthb'));
           var rheight=Number($('#tcanvas').attr('data-heightb'));
       }
         var canvas = wpStamp.canvas;
        var convertFunction = "Canvas" === 'FileReader' ?
            wpStamp.convertFileToDataURLviaFileReader :
            wpStamp.convertImgToDataURLviaCanvas;
            var neoImage = '';
            convertFunction(e, function(base64Img) {
                neoImage = base64Img;

            var canvasWidth = rwidth  - rleft;
            var canvasHeight = rheight - rtop;

            try {

                fabric.Image.fromURL(neoImage, function(image) {

                    imageWidth = image.getWidth();
                    imageHeight = image.getHeight();
                    var rr=(canvasWidth/imageWidth==0) ? 1 : canvasWidth/imageWidth;

               
                    image.set({
                        top: rtop,
                        left: rleft,
                        scaleX:imageWidth*rr/imageHeight*wpStamp.ratio,
                        scaleY:imageWidth*rr/imageHeight*wpStamp.ratio
                        
                    });

                    canvas.add(image); 
                    image.center().setCoords();
                    canvas.renderAll();

                });
            } catch (ctx) {

            }

        });
    },
    sendAjax: function(color, type, imgf, imgb, front, back) {


        var b = JSON.parse(wpStamp.b);
        var a = JSON.parse(wpStamp.a);
        var canvas=wpStamp.canvas;

        if (b) {
                   // check_back = $.parseJSON(b);

            if (b.objects.length == 0) {
                back = '';
            }

        }
        if (a) {
         //   check_front = $.parseJSON(a);
            if (a.objects.length == 0 ) {
                front = '';
            }
        }
        $("#orderit-ajax").html('<em class="material-icons">timer</em>Please Wait');

        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function(evt) {

                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;

                        wpStamp.progressBar(percentComplete);
                    }
                });

                return xhr;
            },
            type: 'POST',
            dataType: "json",
            url: fa_settings.site_url_,
            data: {

                type: $('#tshirtFacing').data('id'),
                front_base: $('#tshirtFacing').data('front'),
                back_base: $('#tshirtFacing').data('back'),
                image_f: imgf,
                image_b: imgb,
                action: 'create_the_product',
                jsonstufff: front,
                jsonstuffb: back
            },
            beforeSend: function(x) {
                if (x && x.overrideMimeType) {
                    x.overrideMimeType("application/json;charset=UTF-8");
                }
            },
            success: function(data, textStatus, XMLHttpRequest) {
                if (data.success == true) {
                    window.location = data.message;
                    
                } else {
                setTimeout(function() {
                    $("#orderit-ajax").html('<em class="material-icons">shopping_cart</em>Something Bad Happened');
                }, 1000);
                }
            },
            error: function(MLHttpRequest, textStatus, errorThrown) {
                setTimeout(function() {
                    $("#orderit-ajax").html('<em class="material-icons">shopping_cart</em>Something Bad Happened');
                }, 1000);
            }
        });
    },
    ajax_load: function(id) {

        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with upload progress
                       wpStamp.progressBar(percentComplete);
                    }
                }, false);

                return xhr;
            },
            type: 'POST',
            dataType: "json",
            url: fa_settings.site_url_,
            data: {

                id: id,
                action: 'custom_data_product'

            },
            beforeSend: function(x) {
                if (x && x.overrideMimeType) {
                    x.overrideMimeType("application/json;charset=UTF-8");
                }
            },
            success: function(data, textStatus, XMLHttpRequest) {

                if (data.success == true) {
                    fontFamily = [];
                    if (data.json_a) {
                        var bothsides = $.parseJSON(data.json_a);
                        var fonts = bothsides['objects'];
                        wpStamp.push_fonts(fonts, fontFamily);
                    }
                    if (data.json_b) {
                        var bothsides2 = $.parseJSON(data.json_b);
                        var fonts2 = bothsides2['objects'];
                        wpStamp.push_fonts(fonts2, fontFamily);
                    };
                    if (fontFamily.length > 0) {
                        WebFont.load({
                            google: {
                                families: fontFamily
                            },
                            active: function() {

                           wpStamp.canvas.loadFromJSON(data.json_a, function() {
                                   wpStamp.renderCanvas();
                                });
                                 wpStamp.a  = data.json_a ? data.json_a : '';
                               wpStamp.b = data.json_b ? data.json_b : '';
                            }
                        });
                    } else {
                          wpStamp.canvas.loadFromJSON(data.json_a, function() {
                             wpStamp.renderCanvas();
                        });
                        wpStamp.a = data.json_a ? data.json_a : '';
                         wpStamp.b = data.json_b ? data.json_b : '';
                    }


                }
            },
            error: function(MLHttpRequest, textStatus, errorThrown) {

            },
            complete: function() {

                wpStamp.hideProgressBar();

            }
        });

    },
    push_fonts: function(fonts, fontFamily) {

        for (var key in fonts) {
            var obj = fonts[key];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop) && prop == 'fontFamily') {
                    fontFamily.push(obj[prop]);
                }
            }
        }
    },
    ajax_load_parent: function(id) {

        $.ajax({
            xhr: function() {
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
            type: 'POST',
            dataType: "json",
            url: fa_settings.site_url_,
            data: {

                id: id,
                action: 'change_custom_product'

            },
            beforeSend: function(x) {
                if (x && x.overrideMimeType) {
                    x.overrideMimeType("application/json;charset=UTF-8");
                }
            },
            success: function(data, textStatus, XMLHttpRequest) {
                if (data.success == true) {
                    console.log("loaded");

                }
            },
            error: function(MLHttpRequest, textStatus, errorThrown) {

            },
            complete: function() {

                hideProgressBar();

            }
        });

    },
    dblClickHandler: function() {
      var  canvas=wpStamp.canvas;

    try{
           var activeObject = canvas.getActiveObject(),
                    activeGroup = canvas.getActiveGroup();
                if (activeObject) {
                    activeObject.sendToBack();
                } else if (activeGroup) {
                    var objectsInGroup = activeGroup.getObjects();
                    canvas.discardActiveGroup();
                    objectsInGroup.forEach(function(object) {
                        object.sendToBack();
                    });
                }else{
                             var obj = wpStamp.getObjectById($(this).parent().parent().attr('data-id'));
                                wpStamp.canvas.sendToBack(obj);
                }
                            var eq = $(this).parent().parent().index();
                          
                            if(eq < $('ul#layers').size() ){
                                $("#layers li:eq("+eq+")").before($("#layers li:eq("+(eq+1)+")"));
                             }
    }catch(ex){
        console.log(ex);
    }

    },
    checkPrice: function() {

        //need to rewrite

        if (wpStamp.side == 'front') {
          
             wpStamp.b_json=wpStamp.canvas.getObjects();

        } else {
           
             wpStamp.a_json=wpStamp.canvas.getObjects();
        }



        try {
            var price_per_cent = parseInt($('.adl-price').val()) / 100;
            var price_real = parseFloat($('.real-price').val());
            var amount= $('.amount').html();
      

            if (wpStamp.a_json.length >0 && wpStamp.b_json.length > 0) {
                $('.amount').html(price_real + (price_per_cent * price_real));
                $('.amount').prepend(amount[0]);
            } else if (wpStamp.b_json.length == 0 || wpStamp.a_json.length == 0) {
                $('.amount').html(price_real);
                $('.amount').prepend(amount[0]);
            }

        } catch (ex) {

        }
    
 
    },
    cache: function() {
       wpStamp.canvas.forEachObject(function(obj, i) {
            if (obj.type === 'image')
                return;

            var scaleX = obj.scaleX;
            var scaleY = obj.scaleY;

            wpStamp.canvas.remove(obj);
            obj.scale(1).cloneAsImage(function(clone) {
                clone.set({
                    left: obj.left,
                    top: obj.top,
                    scaleX: scaleX,
                    scaleY: scaleY
                });
                console.log(clone.id);
                 $('#layers').find('li#'+obj.id).remove();
                wpStamp.canvas.insertAt(clone, i);

            });
        });
    }
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
        var value = this.options.bright;
       
        image.filters.push(new fabric.Image.filters.Brightness({
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

    brightness: function(value) {
        this.darkroom.applyTransformation(
            new Brightness({
                bright: value
            })
        );
    }

});
$(document).ready(function(){
    wpStamp.init();
});