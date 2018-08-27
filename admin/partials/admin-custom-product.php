		<div id="main" title="Basic Editor for Custom Products" style="position:relative;clear:both;top:0px;display:block;">	

	
			<input type="hidden" id="real_paint_area" value="<?php echo $real_paint_area; ?>" name="real_paint_area"/>
			<input type="hidden" id="ratio" value="<?php echo $ratio ?>" name="ratio"/>
	
		


<div class=" selected-info "></div>
			<div class="clear"></div>	
			<nav class="toolbox">		
			
					<a class="button" data-toggle="front" id="topen"><?php _e('Back Side', 'factory'); ?></a>
				
					<a class="button" id="svgexport"><?php _e('Export: SVG', 'factory'); ?></a>
					<a class="button" id="pngexport"><?php _e('Export: PNG', 'factory'); ?></a>
					<a class="button canvas-dimensions right "></a>
					<a class="button right" id="layers-button"><?php _e('Layers', 'factory'); ?><div class="dropdown" id="layers"><ul></ul></div></a>
				</nav>
			
			
			<div class="info-box">
				<span><?php _e('Top', 'factory'); ?><em class="selectedtop"></em></span>
				<span><?php _e('Left', 'factory'); ?><em class="selectedleft"></em></span>
				<span><?php _e('Width', 'factory'); ?><em class="selectedwidth"></em></span>
				<span><?php _e('Height', 'factory'); ?><em class="selectedheight"></em></span>
				<span><?php _e('Angle', 'factory'); ?><em class="selectedangle"></em></span>
				<span><?php _e('Source', 'factory'); ?><input placeholder="<?php _e('Image Source', 'factory'); ?>" class="selectedsource"></em><a target="_blank" class="button selectedsourcehref"><?php _e('View', 'factory'); ?></a></span>
				<div class="options">
					<label for="scale_nosub"><?php _e('Scale Ratio', 'factory'); ?></label>
					<input disabled type="text" value="<?php echo $ratio; ?>"/><br>
					
				</div>
			</div>
			<div class="clear"></div>
</div>
		<div class="inner-wrapper" data-width="<?php echo $width_pixels; ?>" data-style="width:<?php echo $width_pixels; ?>px" id="shirtDiv">

									<div class="helper" style="width:<?php echo $width_pixels; ?>px;height:<?php echo $height_pixels; ?>px!important;">		
										<div id="tshirtFacing" data-front="<?php echo $json_is[0][0]; ?>" data-back="<?php echo $json_is[0][1]; ?>" data-id="<? echo $id ?>">
								
										
												<div class="flipper">
												
																
														<div class="t-container frontside" data-width="<?php echo $width_pixels; ?>" data-height="<?php echo $height_pixels; ?>" style="width:<?php echo $width_pixels; ?>px!important;height:<?php echo $height_pixels; ?>px!important;">
														<img style="width:100%;height:100%;" src="<?php echo $json_is[0][0]; ?>"/>
														</div>
														<?php if(  $json_is[0][1] ) { ?>
														<div class="t-container backside" data-width="<?php echo $width_pixels; ?>" data-height="<?php echo $height_pixels; ?>" style= "width:<?php  echo $width_pixels; ?>px!important;height:<?php echo $height_pixels; ?>px!important;">
															<img style="width:100%;height:100%;" src="<?php echo $json_is[0][1]; ?>"/>
														</div>
														<?php } ?>
														
									</div>

									<?php  if($real_paint_area===''){	?>
												<div style="top:<?php echo $realy; ?>px;left:<?php echo $realx;?>px;width:<?php echo $realwidth; ?>px;height:<?php echo $realheight; ?>px;" data-top="<?php echo $realy; ?>" data-left="<?php echo $realx;?>" data-width="<?php echo $realwidth; ?>" data-height="<?php echo $realheight; ?>" class="border-shadow dotted" data-content="Drag and drop a file from your computer" id="drawingArea">
												<canvas id="rcanvas" style="width:<?php echo $realwidth; ?>px;height:<?php echo $realheight; ?>px;"  width="<?php echo $realwidth; ?>" height="<?php echo $realheight; ?>"></canvas>
									 <?php }else{ ?>

										
												<div style="width:<?php echo $width_pixels; ?>px!important;height:<?php echo $height_pixels; ?>px!important;" data-width="<?php echo $width_pixels; ?>" data-height="<?php echo $height_pixels; ?>" id="drawingArea">
												<canvas  id="rcanvas"  data-shape="<?php echo $real_paint_area ?>" data-shapeb="<?php echo $real_paint_area_b ?>" data-radius="" data-radiusb="" data-top="<?php echo $realy; ?>" data-height="<?php echo $realheight; ?>" data-width="<?php echo $realwidth; ?>" data-left="<?php echo $realx; ?>" data-topb="<?php echo $realy_b; ?>" data-heightb="<?php echo $realheight_b; ?>" data-widthb="<?php echo $realwidth_b; ?>" data-leftb="<?php echo $realx_b; ?>"  width="<?php echo $width_pixels; ?>" height="<?php echo $height_pixels; ?>" style="width:<?php echo $width_pixels; ?>px!important;height:<?php echo $height_pixels; ?>px!important;"></canvas>
												<?php
											}


											 ?>	
														
												</div>
									</div>	
											</div>
										</div>
				

