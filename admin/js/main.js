jQuery(document).ready(function() {

 var fontFamily = ["Arial", "Tahoma", "Verdana", "Times+New+Roman", "Georgia", "Impact", "Comic+Sans", "Aclonica", "Allan", "Annie+Use+Your+Telescope", "Anonymous+Pro", "Allerta", "Amaranth", "Anton", "Architects+Daughter", "Artifika", "Asset", "Astloch", "Bangers", "Bentham", "Bevan", "Bigshot+One", "Bowlby+One", "Bowlby+One+SC", "Brawler", "Cabin", "Calligraffitti", "Candal", "Cantarell", "Cardo", "Carter One", "Caudex", "Cedarville+Cursive", "Cherry+Cream+Soda", "Chewy", "Coda", "Coming+Soon", "Copse", "Corben:700", "Cousine", "Covered+By+Your+Grace", "Crafty+Girls", "Crimson+Text", "Crushed", "Cuprum", "Damion", "Dancing+Script", "Dawning+of+a+New+Day", "Didact+Gothic", "EB+Garamond", "Expletus+Sans", "Fontdiner+Swanky", "Forum", "Francois+One", "Geo", "Give+You+Glory", "Goblin+One", "Goudy+Bookletter+1911", "Gravitas+One", "Gruppo", "Hammersmith+One", "Holtwood+One+SC", "Homemade+Apple", "Inconsolata", "Indie+Flower", "Irish+Grover", "Judson", "Jura", "Just+Another+Hand", "Just+Me+Again+Down+Here", "Kameron", "Kenia", "Kranky", "Kreon", "Kristi", "La+Belle+Aurore", "League+Script", "Lekton", "Limelight", "Lobster", "Lobster Two", "Lora", "Love+Ya+Like+A+Sister", "Loved+by+the+King", "Luckiest+Guy", "Maiden+Orange", "Mako", "Maven+Pro", "Meddon", "MedievalSharp", "Megrim", "Merriweather", "Metrophobic", "Michroma", "Miltonian Tattoo", "Miltonian", "Modern Antiqua", "Monofett", "Mountains of Christmas", "Neucha", "Neuton", "Nixie+One", "Nobile", "Nova+Square", "Nunito", "Open+Sans", "Orbitron", "Oswald", "Over+the+Rainbow", "Reenie+Beanie", "Pacifico", "Patrick+Hand", "Paytone+One", "Permanent+Marker", "Philosopher", "Playfair+Display", "Puritan", "Quattrocento", "Radley", "Raleway:100", "Redressed", "Rock+Salt", "Rokkitt", "Ruslan+Display", "Schoolbell", "Shadows+Into+Light", "Shanti", "Sigmar+One", "Six+Caps", "Slackey", "Smythe", "Sniglet:800", "Special+Elite", "Stardos+Stencil", "Sue+Ellen+Francisco", "Sunshiney", "Swanky+and+Moo+Moo", "Syncopate", "Tangerine", "Tenor+Sans", "Terminal+Dosis+Light", "The+Girl+Next+Door", "Tinos", "Ultra", "Unkempt", "UnifrakturCook:bold", "UnifrakturMaguntia", "Varela", "Varela Round", "Vibur", "Waiting+for+the+Sunrise", "Wallpoet", "Walter+Turncoat", "Wire+One", "Yanone+Kaffeesatz", "Yeseva+One", "Zeyada"];
			
var color_array = [];
var color_now = fa_settings.fa_colors;

var color_now_array=color_now.split(':');
var lessCss='';
var history=0;
var editor;
countless(color_now_array);
							jQuery(".minicolors-input").minicolors({
										control: jQuery(this).attr('data-control') || 'hue',
										defaultValue: jQuery(this).attr('data-defaultValue') || '',
										inline: jQuery(this).attr('data-inline') === 'true',
										letterCase: jQuery(this).attr('data-letterCase') || 'lowercase',
										opacity: false,
										position: jQuery(this).attr('data-position') || 'bottom right',
										change: function(hex, opacity) {
												var color_array=[];
												
												jQuery( "input.colors" ).each(function( index ) {
													var name=jQuery(this).attr('name');
													var value=jQuery(this).val();
												
													color_array.push(name,value);
													});
												jQuery("#hidden-colors").val('');
												jQuery("#hidden-colors").val(color_array.join(":"));

												},
												theme: 'default'
										});
										
					jQuery('#compile').click(function(e){
						jQuery(this).html("Please Wait...");
							e.preventDefault();
							jQuery.ajax({
									type : "POST",
									dataType : "json",
									async: true,
									url:fa_settings.fa_ajax_url,
									data : {
											less :jQuery('textarea.textarea_colors').val(),
											action : "write_less"
											},
									success : function(data, textStatus, XMLHttpRequest) {
										console.log(data);
										jQuery('#compile').html('Great!! Theme Created');
									
										//jQuery("#submit").click();
										
										setTimeout(function(){
											jQuery('#compile').html('Compile');
											
										},2000);
									},error:function(e){
										console.log(e);
										confirm("Something wrong with your css: Try again");
										setTimeout(function(){
											jQuery('#compile').html('Compile');
										});
									}
							});
						});
						jQuery('input').change(function() {
							var color_array=[];
												
												jQuery( "input.colors" ).each(function( index ) {
													var name=jQuery(this).attr('name');
													var value=jQuery(this).val();
												
													color_array.push(name,value);
													});
												jQuery("#hidden-colors").val('');
												jQuery("#hidden-colors").val(color_array.join(":"));

							});
					function countless(color_now_array){
						var history;
						jQuery.each(color_now_array,function(index,name){
									if(index%2 == 0) {
										history=name;

									}else{

										jQuery( "input.colors[name='"+history+"']" ).val(name);
										if(name==''){
											name="inherit";
										}
											addNew='@'+history+':'+name+';';
											lessCss=lessCss+addNew;
											history='';
									}

									});
									jQuery('.textarea_colors').val(lessCss);
					}
			    jQuery('#factory .nav-tab a').on('click',function(e){
			    	e.preventDefault();
			    	theid="#"+jQuery(this).data('id');
			    	
			    	if(theid=='#Colors'){
			    		console.log(jQuery('#code').data('CodeMirrorInstance'))
			    		if(typeof jQuery('#code').data('CodeMirrorInstance')=='undefined'){

			    		 try{
								setTimeout(function(){  
									var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
								  	  lineNumbers: true, mode: "css", autoRefresh: true
									  });
									jQuery('#code').data('CodeMirrorInstance', editor);
									editor.refresh();
								},100);
								}catch(ex){

								}
							}					

			    	}
			    	jQuery('#factory-tabs li').removeClass('nav-tab-active');
			    	jQuery(this).parent().addClass('nav-tab-active');
			    	jQuery('#factory .tab-pane').removeClass('active');
			   		jQuery(theid).addClass('active');	

			    });
    		jQuery("#checkAll").click(function() {
					jQuery('.more input:checkbox').not(this).prop('checked', this.checked);
					var temp_list = jQuery('#fontlist :input').serialize();
					var temp_list = temp_list.replace(/=on&/g, ",");
					var temp_list = temp_list.replace(/=on/g, "");
					jQuery('#fontlist-input').val(temp_list);
				});
				jQuery('#fontlist input').change(function() {
					var temp_list = jQuery('#fontlist :input').serialize();
					var temp_list = temp_list.replace(/=on&/g, ",");
					var temp_list = temp_list.replace(/=on/g, "");
					jQuery('#fontlist-input').val(temp_list);
				});
/*
					WebFontConfig = {
						google : {
							families : fontFamily
						}
					};
					(function() {
						var wf = document.createElement('script');
						wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
						wf.type = 'text/javascript';
						wf.async = 'true';
						var s = document.getElementsByTagName('script')[0];
						s.parentNode.insertBefore(wf, s);
					})();
*/


	
			    		

 });



