<div class="box-upps">
	<h3><?php _e('Assign to Media Categories', 'factory'); ?></h3>
	<input type="hidden" id="media-categories" name="mediaCategories"/>
	<ul class="media-list inner">
							 <?php 
								$args_r = array(
								 'type'=> 'attachment',
							 	 'taxonomy' => 'uploaded',
							 	 'hide_empty' => false
								); 
								
							$categories =  get_categories( $args_r ) ; 
							foreach ($categories as $category) {
								//print_r($category);
					   			?>
					   				<li><input class="category_tags" type="checkbox" name="<?php echo $category->term_id ?>"><?php echo $category->name ?></li>
					   			<?php
								}
							?>
								</ul>
							<em>
								<?php _e('Leave blank if no media category is applicable', 'factory'); ?>
							</em>
</div>
					 	<script type="text/javascript">
							jQuery(document).ready(function() {
								jQuery('.media-list :input').change(function() {
									var serialize = jQuery('.media-list :input').serialize();
									var serialize_On = serialize.replace(/=on/g, "");
									
									jQuery('#media-categories').val(serialize_On);
									uploader.settings.multipart_params.media_upps = jQuery('#media-categories').val();
								});
							});
					 	</script>
		 	