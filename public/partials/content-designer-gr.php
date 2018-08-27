<?php
/**
 * Designer Page
 *
 * @author 		Markware.gr
 * @package 	Markware/Templates
 * @version     2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if(get_option('FA_RegisterUser')=='on' && !is_user_logged_in() ){?>
<div class="message-reporting">
	<h2><?php _e('Πρεπει να συνδεθείτε για να φτιάξετε ένα προιόν','wpstamp') ?></h2>
</div>
<?php }else{?>

<div data-height="<?php echo $height_pixels ?>" data-width="<?php echo $width_pixels ?>" class="designer-container">
					
				<div class="moving-tools" id="moving-tools">
									<nav>
											<div class="color-toolbox">
											<div class="dropdown">
												<span class="colors color-main"></span>
												<ul class="sub-menu">
													<li><input id="main-color" data-swatches="#fff,#000,#f00,#0f0,#00f,#ff0,#0ff"  class="color-picker" value="#0266fc"></li>
													<li><a class="picker-button" id="main-color-tool" href="#"><em class="material-icons">colorize</em></a><div class="slideWrapper"></div></li>
												</ul>
											</div>
											<div class="dropdown"><span class="colors color-secondary"></span>
												<ul class="sub-menu">
													<li><input id="stroke-color" data-swatches="#fff,#000,#f00,#0f0,#00f,#ff0,#0ff"  class="color-picker" value="#ff0000"></li>
													<li><a class="picker-button" id="border-color-tool" href="#"><em class="material-icons">colorize</em></a><div class="slideWrapper"><div data-type="border" class="slider" id="border-line-width"></div></div></li>
												</ul>
											</div>	
										</div>
										<div class="material-toolbox hidden">
											<a class="fa-button bring-to-front" title="<?php _e('φερε μπροστά','wpstamp'); ?>"><em class="material-icons">keyboard_arrow_up</em></a>
											<a class="fa-button send-to-back" title="<?php _e('στείλε πίσω','wpstamp'); ?>"><em class="material-icons">keyboard_arrow_down</em></a>
											<a class="fa-button remove-selected" title="<?php _e('Διαγραφή','wpstamp'); ?>"><em class="material-icons">delete</em> </a>
											<a class="fa-button" id="crop" title="<?php _e('Κοψιμο','wpstamp'); ?>"><em class="material-icons">exposure</em> </a>
										</div>
										
							</nav>
							</div>	
	<div class="base-stamp-tool">
	<div class="progress-bar"><span></span></div>	
	<nav class="outter-tools">
		<a id="flip" data-original="back" class="fa-button flipp"><em class="material-icons">rotate_right</em><?php _e('Πίσω','wpstamp'); ?></a>
		<a href="#layers" title="<?php _e('Στρώματα ','wpstamp'); ?>" class="fa-button" id="layer-trigger"><em class="material-icons">layers</em></a>
		<ul id="layers"><li class="nothing"><?php _e('no layers') ?></li></ul>

	</nav>				
	<a id="toggle-menu" class="fa-button handle toggle"><em class="material-icons">more_vert</em></a>
			<div class="tools">
					<div class="fa-widget base-top">
						<div class="price hidden">
							<?php if($adl_price){ ?>
								<input type="hidden" value="<?php echo $adl_price; ?>" class="adl-price">
							<?php } ?>
								<input type="hidden" value="<?php echo $price; ?>" class="real-price">
								<?php // echo $price_html; ?>
						</div>
								
			
								
							</div>
							<div class="fa-widget my-tools">
							<h1 data-collapse="backgrounds" class="widget-title"><em class="material-icons">format_shapes</em><a href="#"><?php _e('Τύποι Προιόντος','wpstamp');?></a></h1>
								<h1 data-collapse="paint-tools" class="widget-title"><em class="material-icons">format_paint</em><a href="#"><?php _e('Ζωγραφική','wpstamp');?></a></h1>
							
			<h1 data-collapse="gallery" class="widget-title"><em class="material-icons">image</em><a href="#"><?php _e('Ετοιμες Φωτογραφίες','wpstamp'); ?></a></h1>
			<h1 data-collapse="my-gallery" class="widget-title"><em class="material-icons">face</em><a href="#"><?php _e('Εισαγωγή Φωτογραφίας','wpstamp'); ?></a></h1>
			<h1 data-collapse="text-tool" class="widget-title"><em class="material-icons">text_fields</em><a href="#"><?php _e('Κείμενο','wpstamp'); ?></a></h1>
				<h1 class="widget-title hidden" data-collapse="product-changer"><em class="material-icons">list</em><a href=""><?php _e('Αλλαγή Προόντος','wpstamp'); ?></a></h1>
		
				</div>
				</div>
						<div class="fa-widget panels hide">
								<ul class="backcolor static pallete" id="backgrounds">
									<li class="heading"><h2>Change Values</h2></li>
									<ul class="product-list">
									
										<?php	
											if($colors_no > 1){
											for($i=0;$i<$colors_no;$i++){?>
												<li class="colors">
													<a data-front="<?php echo $json_is[$i][0]; ?>" data-back="<?php echo $json_is[$i][1]; ?>"  title="<?php echo $json_is[$i][2]; ?>" class="colors"><img src="<?php echo $json_is[$i][0]; ?>"/><div class="product-name"><?php  echo $json_is[$i][2]; ?></span><span class="color-box" style="background:<?php echo $json_is[$i][3]; ?>;"></span></div></a>
												</li>
										<?php } 
											}else{ ?>
													<li class="nothing"><?php _e('No Variation') ?></li>

											<?php }
										?>
										</ul>
									</ul>
					
						
				<?php if(get_option('FA_FreedrawTool')=='on' || get_option('FA_ShapeTool')=='on'){ ?>
			
								<ul class="static painters" id="paint-tools">
									<li class="heading"><h2>Change Values</h2></li>
										<ul class="geometry-tools">
												<?php if(get_option('FA_FreedrawTool')=='on'){ ?>		
											<li>	<a title="<?php _e('Ζωγραφικη','wpstamp') ?>"  class="fa-button freedraw"> <em class="material-icons">brush</em></a> </li>
											<?php } ?>
												<?php if(get_option('FA_ShapeTool')=='on'){ ?>	
													<li><a title="<?php _e('Τετραγωνο','wpstamp') ?>" class="fa-button rect"> <em class="material-icons">crop_din</em></a> </li>
														<li><a title="<?php _e('Κύκλος','wpstamp') ?>" class="fa-button circle"> <em class="material-icons">lens</em></a> </li>
														<li><a title="<?php _e('Τρίγωνο','wpstamp') ?>" class="fa-button triangle"> <em class="material-icons">network_cell</em></a> </li>
														<li><span title="<?php _e('Πολυγωνο','wpstamp') ?>" class="fa-button poly">
													<input name="polypoints" class="input-button" type="number" min="5" max="10" /><a>
													<em class="material-icons">star</em></a>
													</span>	 </li>
													 <?php } ?>
										<div class="draw-options">
											<div class="line-draw">
												<div data-type="draw" class="slider" id="drawing-line-width"></div>
										

												<ul id="drawing-mode-brush">
													<?php $lines=array("simple"=>"Simple","hline"=>"Horizontal","vline"=>"Verticals","square"=>"Squares","diamond"=>"Diamonds"); 
														foreach ($lines as $key=>$value) {
															
															if($value=='Simple'){$active_class="actived";}else{$active_class="";}
															echo '<a class="drawlines fa-button '.$active_class.' drawing-mode-selector" data-type="'.$key.'"><div class="linestyle '.$key.'"></div>'.$value.'</a>';
														}
													?>
													</ul>	
													</div>
											</div>
									</ul>
									</ul>
					
						<?php } ?> 
						<?php if(get_option('FA_GalleryTool')=='on'){?>
					
							
									<ul class="static overflow" id="gallery">
											<li class="heading"><h2>Change Values</h2></li>

										<ul class="gallery-nav"></ul>
										<ul class="photo-list"><li class="nothing"><?php _e('Κατηγορία','wpstamp'); ?></li></ul>
										<ul class="pager" data-perpage="20"  id="pagination"></ul>	
								
									</ul>
										
						<?php }?>
						<?php if(get_option('FA_GalleryTool')=='on'){?>
			
									<ul class="static overflow" id="my-gallery">
										<li class="heading"><h2>Change Values</h2></li>
										<ul class="gallery-nav"></ul>
										<ul class="selection-user-list"><li class="nothing">	<a class="fa-button upload primary"><em class="material-icons">file_upload</em><?php _e('Upload Your Images','wpstamp'); ?>
												<input type="file" accept="image/*" multiple="multiple" name="files[]" id="upload-input">
												</a><br>
												<a id="facebook" class="fa-button social facebook"><em id="fbprofileImage" class="fb"></em>Facebook</a>
												<a id="instagram" class="fa-button social instagram"><em id="inprofileImage" class="in"></em>Instagram</a>
												<a id="user-library" class="fa-button social library"><em class="material-icons">photo_library</em><?php _e('Απο υπολογιστή','wpstamp'); ?></a>
												</li></ul>
										

											<ul class="upload-nav hidden">
													<li class="center"><a id="return" href="#"><em class="material-icons">arrow_back</em><?php _e('Επιστροφή','wpstamp'); ?></a>
												</li>
											
											</ul>

									</ul>
						
						<?php }?>
						<?php if(get_option('FA_TextTool')=='on'){ ?>
				
								<ul class="static" id="text-tool">
									<li class="heading"><h2>Change Values</h2></li>

									<li class="grayer">
										<a id="font-family" class="dropdown-toggle" title="Font Style"><em class="material-icons">format_size</em></a>
									</li>
									<li>
									<div class="text-formating inline">
										<a id="text-bold" data-type="fontWeight" data-value="bold" class="fa-button" title="Bold"><em class="material-icons">format_bold</em></a>
										<a id="text-italic" data-type="fontStyle"  data-value="italic" class="fa-button" title="Italic"><em class="material-icons">format_italic</em></a>
										<a id="text-strike" data-type="textDecoration"  data-value="line-through" class="fa-button" title="Strike"><em class="material-icons">format_strikethrough</em></a>
										<a id="text-underline" data-type="textDecoration" data-value="underline" class="fa-button" title="Underline"><em class="material-icons">format_underline</em></a>
									</div>

									<div class="text-aligning inline">
										<a id="text-align-left" class="fa-button" data-value="left" title="Left"><em class="material-icons">format_align_left</em></a>
										<a id="text-align-center" class="fa-button" data-value="center" title="Center"><em class="material-icons">format_align_center</em></a>
										<a id="text-align-right" class="fa-button" data-value="right" title="Right"><em class="material-icons">format_align_right</em></a>
									</div>
									<div class="text-lining inline">
										<span class="fa-button" title="Line Height"><input name="lineheight" id="line-height-input"  class="input-button" type="number" min="1" max="100"/>
										<a id="line-height"><em class="material-icons">format_line_spacing</em></a></span>
									</div>
									</li>
									<li>
										<div class="text-area">
											<textarea class="gn-text" id="text-string" type="text" placeholder="<?php _e('Το κείμενο σαας...','wpstamp'); ?>"></textarea>
											<a id="add-text" class="fa-button solid add-button"><em class="material-icons">insert_comment</em><?php _e('Προσθηκη','wpstamp'); ?></a>		<a data-collapse="convert-curve" data-type="arc" class="fa-button arc convert solid"><em class="material-icons">donut_large</em>Arc</a>
								
										</div>
															
							
									<div class="toolbox padded hide" id="convert-curve">
											<small>Αναποδα</small> <div class="slider" id="reverse"></div>
											<small>Γωνία</small> <div class="slider" id="radius"></div>
											<small>Κενά </small> <div class="slider" id="spacing"></div>
									</div>	
									</li>
								
									</ul>
					
						<?php } ?>
						
								<ul class="static overflow custom-gallery" id="product-changer">
									<li class="heading"><h2>Change Values</h2></li>
								</ul>
									</div>	
						    
						
				
					
						
				
					<div class="inner-wrapper" data-width="<?php echo $width_pixels; ?>" data-style="width:<?php echo $width_pixels; ?>px" id="shirtDiv">
			<div class="canvas-toolbox">
										  	<a class="fa-button" id="zoomin"><em class="material-icons">zoom_in</em></a>
										  	<a class="fa-button" id="zoomout"><em class="material-icons">zoom_out</em></a>
											<a class="fa-button hidden" id="undo"><em class="material-icons">undo</em></a>
											<a class="fa-button hidden"  id="redo"><em class="material-icons">redo</em></a>
										</div>
									<div class="helper" style="width:<?php echo $width_pixels; ?>px;height:<?php echo $height_pixels; ?>px!important;">		
							
										<?php do_action('before_stamp_custom_product'); ?>
										<div id="tshirtFacing" data-front="<?php echo $json_is[0][0]; ?>" data-back="<?php echo $json_is[0][1]; ?>" data-id="<? echo $id ?>">
								
										
												<div class="flipper">
												
												<?php if($edit==1){ ?>
														<div class="t-container frontside" data-width="<?php echo $width_pixels; ?>" data-height="<?php echo $height_pixels; ?>" style="width:<?php echo $width_pixels; ?>px!important;height:<?php echo $height_pixels; ?>px!important;">

																<img src="<?php echo $front_base; ?>"/>
														</div>
																<?php if($back_base) {?>
																	<div class="t-container backside"  data-width="<?php echo $width_pixels; ?>" data-height="<?php echo $height_pixels; ?>" style="width:<?php echo $width_pixels; ?>px!important;height:<?php echo $height_pixels; ?>px!important;">
																	<img  src="<?php echo $back_base; ?>"/>
																	</div>
																<?php } ?>
													
												<?php }else{ ?>									
														<div class="t-container frontside" data-width="<?php echo $width_pixels; ?>" data-height="<?php echo $height_pixels; ?>" style="width:<?php echo $width_pixels; ?>px!important;height:<?php echo $height_pixels; ?>px!important;">
														<img src="<?php echo $json_is[0][0]; ?>"/>
														</div>
														<?php if(  $json_is[0][1] ) { ?>
														<div class="t-container backside" data-width="<?php echo $width_pixels; ?>" data-height="<?php echo $height_pixels; ?>" style= "width:<?php  echo $width_pixels; ?>px!important;height:<?php echo $height_pixels; ?>px!important;">
															<img src="<?php echo $json_is[0][1]; ?>"/>
														</div>
														<?php } ?>
														
													<?php } ?>
									</div>
						
												<div style="width:<?php echo $width_pixels; ?>px!important;height:<?php echo $height_pixels; ?>px!important;" data-width="<?php echo $width_pixels; ?>" data-height="<?php echo $height_pixels; ?>" id="drawingArea">
												<canvas data-shape="<?php echo $real_paint_area ?>" data-shapeb="<?php echo $real_paint_area_b ?>" data-radius="" data-radiusb="" data-top="<?php echo $realy; ?>" data-height="<?php echo $realheight; ?>" data-width="<?php echo $realwidth; ?>" data-left="<?php echo $realx; ?>" data-topb="<?php echo $realy_b; ?>" data-heightb="<?php echo $realheight_b; ?>" data-widthb="<?php echo $realwidth_b; ?>" data-leftb="<?php echo $realx_b; ?>" id="tcanvas" width="<?php echo $width_pixels; ?>" height="<?php echo $height_pixels; ?>" style="width:<?php echo $width_pixels; ?>px!important;height:<?php echo $height_pixels; ?>px!important;"></canvas>
													
												</div>
									</div>	
											</div>
										</div>
											    <div class="create-order">		
		<div class="user-info">
		    <?php   $current_user = wp_get_current_user();

			    if ( $current_user->exists() ===false ){
			     _e('You havent logged in yet!','wpstamp');	?>
			     <a href="<?php echo get_permalink( get_option('woocommerce_myaccount_page_id') ); ?>" title="<?php _e('Login / Register','woothemes'); ?>"><?php _e('Login / Register','woothemes'); ?></a>
<?php

				}else{
				 _e('Post yout design' ,'wpstamp'); ?>
			<a href="<?php echo get_permalink( get_option('woocommerce_myaccount_page_id') ); ?>" title="<?php _e('My Account','woothemes'); ?>"><?php echo $current_user->display_name; ?></a>
<?php
				}
				?>
				</div>

    <span class="pricing"><?php echo $price_html; ?></span>
								<a class="fa-button large" id="orderit-ajax">
								<em class="material-icons">shopping_cart</em><?php  if($edit==1){ _e('Ανανέωση', 'wpstamp'); }else{ _e('Δημιουργία Σοκολάτας', 'wpstamp'); }?></a>
								<?php do_action('after_stamp_order'); ?>
								</div>
						</div>
			<div class="fa-modal hidden">
 				<div class="figure-wrapper">
		          <figure id="crop-image" class="image-container target">
		            <img src="" alt="" id="target">
				  </figure>
		   
		       
        </div>
        </div>

        </div>	
 
        <div class="darken-back"></div>
<?php } ?>
		
						