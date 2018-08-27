	<div id="loading"><?php _e('Please Wait','factory'); ?></div>
		<section class="for-all">
			<div class="container">
				 <h1><?php _e("Make this product editable", "factory"); ?></h1>
			 	<div class="more">
			 		<div class="slideThree">
						<input name="isparent" <?php
						if ($isparent == "on") {echo "checked";} ?> type="checkbox">
						<label for="isparent"></label>
					</div>
					<strong><?php _e("Is this product a Parent", "factory"); ?></strong>
					<em><?php _e("Check documentation for Parent Products", "factory"); ?></em>
				</div>
			</div>
		 </section>
		 
	 <section class="for-parent <?php if ($isparent == '') { echo "hidden";} ?>">
	 	<div class="product-image container">
			 <h1><?php  _e("Add Color names and Images", 'factory'); ?></h1>
			<div class="more">
			 <div class="color-wrap">
				<input id="allhere" value="<?php echo $value; ?>" class="allhere" type="hidden" name="allhere"/>
			    <?php
			    if($value){
				     for($i=0;$i<$colors_no;$i++){ ?>

				    <div class="product-color-section">
				     	<a data-tooltip="Delete this" class="delete-this-color"></a>
				     	<span class="product-header"></span>
						<div class="product-color-image-front">
							<span class="upload"><?php _e('Click or Drop to upload Front Side','factory'); ?></span>
							<input name="tmp" value="<?php echo $json_is[$i][0] ?>" class="tmpfront" type="hidden">
							<input name="inputfront" class="inputfront" type="file">
							<div class="image-holder"><img src="<?php echo $json_is[$i][0] ?>"></div>
						</div><a data-tooltip="<?php _e('Flip Images','factory_admin'); ?>" class="switch"></a>
						<div class="product-color-image-back">
							<span class="upload"><?php _e('Click or Drop to upload Back Side'); ?></span>
							<input name="tmp" value="<?php echo $json_is[$i][1] ?>" class="tmpback" type="hidden">
							<input name="inputback" class="inputback" type="file">
							<div class="image-holder"><img src="<?php echo $json_is[$i][1] ?>"></div>
						</div>
						<div class="product-color-name">
							<input class="colorname" name="colorname" placeholder="<?php _e('Color Name','factory'); ?>" value="<?php echo $json_is[$i][2] ?>" type="text">
							<input type="text" value="<?php echo $json_is[$i][3] ?>"  class="minicolors-input" size="7">
						</div>
						
					</div>
					<?php }
				}else{ ?>
					<div class="product-color-section">
			     	<a data-tooltip="<?php _e('Delete this','factory'); ?>" class="delete-this-color"></a>
			     	<span class="product-header"></span>
					<div class="product-color-image-front">
						<span class="upload"><?php _e('Click or Drop to upload Front Side','factory'); ?></span>
						<input name="tmp" value="" class="tmpfront" type="hidden">
						<input name="inputfront" class="inputfront" type="file">
						<div class="image-holder"></div>
					</div><a data-tooltip="<?php _e('Flip Images','factory'); ?>" class="switch"></a>
					<div class="product-color-image-back">
						<span class="upload"><?php _e('Click or Drop to upload Back Side','factory'); ?></span>
						<input name="tmp" value="" class="tmpback" type="hidden">
						<input name="inputback" class="inputback" type="file">
						<div class="image-holder"></div>
					</div>
					<div class="product-color-name">
						<input class="colorname" name="colorname" placeholder="<?php _e('Color Name','factory'); ?>" value="" type="text">
						<input type="text" value="" data-control="saturation" class="minicolors-input" size="7">
					</div>
				</div>
				<?php
				}
				?>
			</div>
			<div class="tool-end">
				<a data-tooltip="Add More colors" class="fa-buttons add-color" id="add-color"><?php _e('Add','factory'); ?></a>
				<a data-tooltip="Save" class="fa-buttons save-this-color"><?php _e('Save','factory'); ?></a>
			</div>
			</div>
	 	</div>
		<div class="ratio-area container">
			<h1><?php _e("Ratio", "factory"); ?></h1>
			<div class="more">
				<label for="ratio"><?php _e("Ratio in real width and height", "factory"); ?></label>
				<input type="text" id="ratio" name="ratio" value="<?php echo $ratio; ?>" placeholder="Ratio (if none auto will applied)"><em><?php _e('You must save your product to see width and height changes. Never forget to change real Width and Height','factory'); ?> </em>	<br/>
			</div>
		</div>
		<div class="dim-area container">
			<h1><?php _e("Real Product size and Editor Dimensions", "factory"); ?></h1>
			<div class="more">
				<div class="radio-tools">
					<label for="realWidth"><?php _e('Real Width','factory'); ?></label>
					<input type="text" id="realWidth" name="realWidth" value="<?php echo $width ? $width : ''; ?>" placeholder="Real Width"><strong>cm</strong><em>Real product Width</em>	<br/>
					<label for="realHeight"><?php _e('Real Height','factory'); ?></label>
					<input type="text" id="realHeight" name="realHeight" value="<?php echo $height ? $height : ''; ?>" placeholder="Real Height"><strong>cm</strong><em>Real product Height</em><br/>
					<label for="displayWidth"><?php _e('Editor Width','factory'); ?></label>
					<input type="text" id="displayWidth" name="displayWidth" value="<?php echo $width ? round(96 * $ratio * (intval($width) / 2.54)) : ''; ?>" placeholder="Display Width"><strong>px</strong>
					<a id="auto-width" data-width="<?php echo $auto_width; ?>" class="button green">Auto</a><em><?php _e('Add width of the product appearing in the edit area','factory'); ?></em><br/>
					<label for="displayHeight"><?php _e('Editor Height','factory'); ?></label>
					<input type="text" id="displayHeight" name="displayHeight" value="<?php echo $height ? round(96 * $ratio * (intval($height) / 2.54)) : ''; ?>" placeholder="Display Height"><strong>px</strong>
					<em><?php _e('Add width of the product appearing in the edit area','factory'); ?></em><br/>
					<div class="info">
						<p><?php _e('Add <Strong>ratio</Strong> or <strong>custom width and height</strong>, or both.','factory'); ?></p>
					</div>
				<div class="real-area box">
					<a class="real trigger button" id="real_area"><?php _e('Define Real Area','factory'); ?></a>
					<em><?php _e('You will have to save first','factory'); ?></em>
				</div>
				</div>
			</div>
		</div>
		<div class="listing-area container">
			<h1><?php _e('Dimensions for Product listings','factory'); ?></h1>
			<div class="more">
				<div class="dimension-tools">
					<input name="has_custom_dimensions" <?php if ($has_not_custom_dimensions== "on") {echo "checked";} ?> type="checkbox" id="dimensions"> <label>Use Woocommerce image sizes</label>
					<div class="custom-sizes <?php if ($has_not_custom_dimensions!="on"){ echo "open"; }?>">
					<table>
						<tr><td><label><?php _e('Catalog Images','factory'); ?> </label> </td><td><input name="custom_catalog_width" type="text" value="<?php echo $custom_catalog_width; ?>" placeholder="Width">× <input type="text" name="custom_catalog_height" value="<?php echo $custom_catalog_height; ?>" placeholder="Height">px</td></tr>
						<tr><td><label><?php _e('Single Product Image','factory'); ?> </label> </td><td><input name="custom_single_width" type="text" value="<?php echo $custom_single_width; ?>" placeholder="Width">× <input type="text" name="custom_single_height" value="<?php echo $custom_single_height; ?>" placeholder="Height">px</td></tr>
						<tr><td><label><?php _e('Product Thumbnails','factory');  ?>  </label></td><td><input name="custom_thumbnails_width" type="text" value="<?php echo $custom_thumbnails_width; ?>" placeholder="Width">× <input type="text" name="custom_thumbnails_height" value="<?php echo $custom_thumbnails_height; ?>" placeholder="Height">px</td></tr>
					</table>	
					</div>
				</div>	
			</div>
		</div>
		<div class="price-area container">
			 <h1><?php _e("Pricing Options", "factory"); ?></h1>
			<div class="more">
				<label for="ratio"><?php _e("Price (%) if two sides", "factory"); ?></label>
				<input type="number" id="priceBack" name="priceBack" value="<?php echo $priceBack; ?>" placeholder="<?php _e('Percent value','factory'); ?>"/><strong>%</strong><em><?php _e("Leave empty if price is the same, or if product has one side", "factory"); ?></em>
			</div>
		</div>
		<div class="media-stuff container">
			<h1><?php  _e("Media Related Categories", 'factory'); ?></h1>
		 	<div id="mediaCat" class="inner box more">
		 		<input type="hidden" id="mediacategories" value="<?php echo $mediaSelected ?>" name="mediaCategories"/>
		 		<a class="button" target="_blank" href="<?php  echo admin_url( 'media-new.php' ) ?>"><?php _e('Create Media categories','factory');?></a>
		 		<ul class="medialist">
				<?php 
					$mediaSelectedarray=explode('&',$mediaSelected);
					$args_r = array('type'=> 'attachment','taxonomy' => 'uploaded','hide_empty' => false); 
					$categories =  get_categories( $args_r ) ; 
					foreach ($categories as $v) {
					
						?>
					   	<li><input type="checkbox" <?php if(in_array($v->term_id.'=on',$mediaSelectedarray)){?> checked <?php } ?> name="<?php echo $v->term_id ?>"><?php echo $v->name ?></li>
					<?php }	?>
					
				</ul>
			 	</div>

	 </div>
	 <div class="end-panel">
	 		 <a href="#add-designer" id="add-designer" class="button large blue"><?php _e('Publish Designer Page') ?></a> <?php _e('or use this shortcode','factory');?>
	<span class="shortcode"></span>
	 </div>
	</section>
	<div id="darken"></div>
	<div class="modal hidden">
		<?php if( $json_is[0][0] =='' ){ ?>
		<div class="heading"><h3><?php _e('Define Product real paint area','factory'); ?></h3></div>
				<div class="content nothing-found">
					<h1><?php _e('No Image found','factory'); ?></h1>
					<p><?php _e('If you added an product image you will have to <strong>publish</strong> first','factory'); ?></p>
					<a id="close_area" class="button red close"><?php _e('Close','factory'); ?></a>
				</div>
				
			<?php }else{ ?> 
			<input id="real_paint_area" value="<?php echo $real_paint_area; ?>"  type="hidden" name="real_paint_area"/>
			<input id="real_paint_area_b" value="<?php echo $real_paint_area_b; ?>"  type="hidden" name="real_paint_area_b"/>

			<div class="heading"><h3><?php _e('Define Product real paint area','factory'); ?></h3></div>
				<div class="content">
					<div class="image-wrapper"><img width="<?php echo $pixel_width; ?>" height="<?php echo $pixel_height; ?>" src="<?php echo $json_is[0][0] ?>"></div>
					<div class="image-wrapper back-side"><img width="<?php echo $pixel_width; ?>" height="<?php echo $pixel_height; ?>" src="<?php echo $json_is[0][1] ?>"></div>
					<div class="canvas-wrapper"><canvas width="<?php echo $pixel_width; ?>" height="<?php echo $pixel_height; ?>" id="rcanvas"></canvas></div>
				</div>
			<div class="footer">
				<a id="add_area" class="button "><?php _e('Add Rentacle','factory'); ?><input id="rcorner" class="rect-corner" value="5" type="number"/></a>
				<a id="add_circle" class="button "><?php _e('Add Circle','factory'); ?></a>

				<div class="tools">
					<a id="show_back" class="button"><?php _e('Flip Back side','factory'); ?></a>
					<a id="clear_area" class="button"><?php _e('Clear Area','factory'); ?></a>
					
				</div><a id="close_area"class="button close"><?php _e('Close','factory'); ?></a>
				<div class="infobox">
					<span><?php _e('Width','factory'); ?> <input type="text" id="real_paint_width"/><em><?php _e('cm','factory'); ?></em></span>
					<span><?php _e('Height','factory'); ?>  <input type="text" id="real_paint_height"/><em><?php _e('cm','factory'); ?></em></span>
					<span><?php _e('Top','factory'); ?>  <input type="text" id="real_paint_x"><em><?php _e('cm','factory'); ?></em></span>
					<span><?php _e('Left','factory'); ?>  <input type="text" id="real_paint_y"><em><?php _e('cm','factory'); ?></em></span>
				</div>	
			</div>
			<?php } ?>
		</div>
