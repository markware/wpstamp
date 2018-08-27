<?php
 
Class Factory_Thumbnails {
			
	public function __construct() {
			add_action('woocommerce_after_shop_loop',array(&$this,'woocommerce_after_shop_loop_s'),10);
		//	add_filter('woocommerce_single_product_image_html', array(&$this, 'woocommerce_template_loop_product_thumbnail'), 10);
					add_action('woocommerce_before_shop_loop_item_title', array(&$this, 'woocommerce_template_loop_product_thumbnail'), 10);
add_action( 'fa_after_product_list', array(&$this,'woocommerce_after_shop_loop_s'),10);//	add_filter('woocommerce_cart_item_thumbnail',array(&$this,'original_cart'),10, 3);
/*
	add_filter('woocommerce_single_product_image_html',array(&$this,'original_image'));
	add_filter('woocommerce_single_product_image_thumbnail_html',array(&$this,'original_thumbnail'));
	

		add_action('woocommerce_before_shop_loop_item_title', array(&$this, 'woocommerce_template_loop_product_thumbnail'), 10);
//			

	
	
	  //add_filter('woocommerce_single_product_image_thumbnail_html', array(&$this,'remove_featured_image'), 10, 3);
		//remove_action('woocommerce_before_shop_loop_item', array(&$this,'woocommerce_aoop_s'),1);
*/
		//add_action( 'woocommerce_after_single_product_summary', array(&$this,'woocommerce_after_shop_loop_s'),10);
	}
	public function woocommerce_template_loop_product_thumbnail() {
				echo $this->woocommerce_get_product_thumbnail();
	}
	public function woocommerce_after_shop_loop_s(){
			global $a;
			$a=1;
			if($a==1){
				wp_enqueue_script('fa_inject', plugins_url('js/inject.js', __FILE__));
				wp_register_style('fa_inject_css', plugins_url('css/fa_thumbnails.css',__FILE__ ));
				wp_enqueue_style('fa_inject_css');
				$a=0;
			}else{
			
			}

		}
	public function woocommerce_after_shop_loop_js(){

		wp_enqueue_script('fa_inject', plugins_url('js/inject.js', __FILE__));
		wp_register_style('fa_inject_css', plugins_url('css/fa_thumbnails.css',__FILE__ ));
		wp_enqueue_style('fa_inject_css');
	
	}
	private static function factory_make_pixels($isreal,$attr,$width,$height,$real_paint_area,$imagesizes,$ratio){
		if($isreal==true){
			$real=explode('/',$real_paint_area);
			$realwidth=$real[0];
			$realheight=$real[1];
			$realx=$real[2];
			$realy=$real[3];
			$outerWidth			= Stamp_Admin::topixels($width,$ratio,96);
			$outerHeight		= Stamp_Admin::topixels($height,$ratio,96);
			$smallOuterWidth	= $imagesizes['width'];
			$smallOuterHeight	= $imagesizes['height'];
			$innerWidth			= $realwidth;
			$innerHeight		= $realheight;
			$ratioWidth			= round($smallOuterWidth/$outerWidth,2);
			$ratioHeight		= round($smallOuterHeight/$outerHeight,2);
			$smallInnerWidth	= round(($innerWidth*$smallOuterWidth)/$outerWidth,2);
			$smallInnerHeight	= round(($innerHeight*$smallOuterHeight)/$outerHeight,2);
			$largeX				= $realx;
			$largeY				= $realy;
			$smallX				= $largeX*($ratioWidth);
			$smallY				= $largeY*($ratioHeight);
			
		
			$href_css			= "display: block;   left: 0;  margin:0;    position: absolute;    width: 100%; height:100%;";
			$img_css			= 'position:relative;z-index:9;border:none!important;padding:0!important;margin:0!important;background:transparent!important;
								   width:'.$smallInnerWidth.'px!important;	height:'.$smallInnerHeight.'px!important;	top:'.$smallY.'px!important;box-shadow:none!important;
								   left:'.$smallX.'px!important;display:block!important;';
			$img_css			= 'position:relative;border:none;padding:0!important;margin:0!important;background:transparent!important; z-index:999;box-shadow:none!important;width:'.$smallOuterWidth.'px!important;height:'.$smallOuterHeight.'px!important;display:block!important;';
						   
			$product_css		= 'width:'.$smallOuterWidth.'px!important;height:'.$smallOuterHeight.'px!important;';
			
		}else{
		
			$outerWidth			= Stamp_Admin::topixels($width,$ratio,96);
			$outerHeight		= Stamp_Admin::topixels($height,$ratio,96);
			$smallOuterWidth	= $imagesizes['width'];
			$smallOuterHeight	= $imagesizes['height']; 
			$smallInnerWidth	= $attr[1];
			$smallInnerHeight	= $attr[2];
			$smallY				= $imagesizes['height']-$attr[2];
			$smallX				= ($imagesizes['width']-$attr[1])/2;
			$href_css			= "display: block;   left: 0;  margin:0;    position: absolute;height:100%;    width: 100%; ";
			$img_css			= 'position:relative;border:none;padding:0!important;margin:0!important;background:transparent!important; z-index:999;box-shadow:none!important;width:'.$smallOuterWidth.'px!important;height:'.$smallOuterHeight.'px!important;display:block!important;';
			$product_css		= 'width:'.$smallOuterWidth.'px!important;height:'.$smallOuterHeight.'px!important;';
	}
	//return array($href_css,$img_css,$product_css);
	
	return array('href'=>$href_css,'image'=>$img_css,'product'=>$product_css);
	}
	public function woocommerce_get_product_thumbnail( $size = 'shop_catalog', $placeholder_width = 0, $placeholder_height = 0 ) {
		global $post,$woocommerce,$_wp_additional_image_sizes;

		$prime = get_post_meta($post->ID, '_front_base',true);
		$second  = get_post_meta($post->ID, '_back_base',true);
		$width = get_post_meta($post->ID,'_width',true) ? get_post_meta( $post->ID,'_width',true) : 53;
		$height	= get_post_meta($post->ID,'_height',true) ? get_post_meta( $post->ID,'_height',true) : 60;
		$ratio = get_post_meta($post->ID,'_ratio',true) ? get_post_meta( $post->ID,'_ratio',true) : 0.25;
		$real_paint_area = get_post_meta($post->ID,'_real_paint_area',true);
		$att_ID = get_post_thumbnail_id( $post->ID );
		$attr = wp_get_attachment_image_src( $att_ID, 'shop_catalog');
		$attrr = wp_get_attachment_image_src( $att_ID, 'shop_thumbnail');
		$placeholder = wc_get_image_size('shop_catalog');
		$placeholder['crop']=false;
		$placeholder_width = $placeholder['width'];
		$placeholder_height = $placeholder['height'];
	

		
		$dm	= get_post_meta($post->ID,'_has_custom_dimensions',true)=='' ? array("width"=> get_post_meta($post->ID,'_custom_catalog_width',true),"height"=> get_post_meta($post->ID,'_custom_catalog_height',true) ) : array("width"=>$placeholder_width,"height"=>$placeholder_height);

		$output='';

	
		//$html_array = $this->factory_make_pixels($isreal,$attr,$width,$height,$real_paint_area,$dm,$ratio);
			do_action('fa_after_product_list'); 
		$href_css ='';// $html_array['href']; //$html_array[0];
		$img_css = '';//$html_array['image'];

	

		if ( has_post_thumbnail() ) {
			$img_source = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'shop_catalog' );
		} else {
		//	$output .= '<img src="'. woocommerce_placeholder_img_src() .'" alt="" width="' . $placeholder_width . '" height="' . $placeholder_height . '" />';
		}
		if($prime){
			$output .= "";
		}

		if($second && get_post_meta($post->ID,'_Canvas_Back',true)){
			

			
	
			$img_source = $this->get_images($post->ID);
	
		//	$result = array_map('strrev', explode('.', strrev($image_a)));
	
	//	$output.='<a  href="'.get_permalink($post->ID).'"></a><img class="back-flipper" src="'.$result[1]."_b.png".'"/>';
			$output.='<img width="'.$img_source[0][1].'" height="'.$img_source[0][2].'" style="display:none" src="'.$img_source[1][0].'"/>';
			$output.= '<div style="width:24px;height:24px;border-radius:3px;box-shadow:0 0 0 1px #eee, 0 1px 3px rgba(0,0,0,.2);background:#fff;z-index:999999;position:absolute;" class="show-back"><img style="border:none;box-shadow:none;" alt="'.__('Turn Back','factory').'" src="'.plugins_url("/img/turn.png",__FILE__).'"/></div>';
}

	//	$background_css='background:url('.$prime.') no-repeat;background-size:'.$smallOuterWidth.'px '.$smallOuterHeight.'px;position:relative;max-width:none!important;width:'.$smallOuterWidth.'px!important;height:'.$smallOuterHeight.'px!important;padding:0;margin:0 auto;';
		return $output;
		
	}
	function get_images($id) {
	    $size = 'shop_catalog';
	    $attachments = get_children( array(
	        'post_parent' => $id,
	        'post_status' => null,  // ??
	        'numberposts'    => -1,  // you should use posts_per_page insted of numberposts
	        'post_type' => 'attachment',
	        'post_mime_type' => 'image',
	        'order' => 'ASC',
	        'orderby' => 'menu_order'
	    ) );
	    if (empty($attachments)) {
	        return '';
	    }

	    $images = array();
	    foreach ( $attachments as $id  => $attachment ) {
	        $images[] = wp_get_attachment_image_src($attachment->ID, $size );
	    }
	    return $images;
	}

function original_cart($outer, $cart_item, $cart_item_key ){
		
		global $_wp_additional_image_sizes,$woocommerce;
		$_id = $cart_item['product_id'];
		$prime = get_post_meta($_id, '_front_base',true );
		$width= get_post_meta($_id,'_width',true)? get_post_meta( $_id,'_width',true) : 53;
		$height = get_post_meta($_id,'_height',true) ? get_post_meta( $_id,'_height',true) : 60;
		$ratio = get_post_meta($_id,'_ratio',true) ? get_post_meta($_id,'_ratio',true) : 0.25;
		$real_paint_area = get_post_meta($_id,'_real_paint_area',true);
		$att_ID = get_post_thumbnail_id( $_id );
		$attr = wp_get_attachment_image_src( $att_ID, 'shop_single');
		$attrr = wp_get_attachment_image_src( $att_ID, 'shop_thumbnail');
		$placeholder_thumbnail['crop']=false;
		$placeholder_thumbnail=wc_get_image_size( 'shop_thumbnail');
		
		$dm = (get_post_meta($_id,'_has_custom_dimensions',true)=='') ? array("width"=>get_post_meta($_id,'_custom_thumbnails_width',true),"height"=> get_post_meta($_product->id,'_custom_thumbnails_height',true) ) : $placeholder_thumbnail;

		if($real_paint_area){
			$isreal=true;
		}else{
			$isreal=false;
		}
	
	
		$html_array=$this->factory_make_pixels($isreal,$attr,$width,$height,$real_paint_area,$dm,$ratio);
	
		return $outer."<div class='original-background-thumbnail'><img id='background-thumbnail' src='".$prime."'/></div>
	
		<style type='text/css'>

			/*Original Image Styles*/
			#background-thumbnail{".$html_array['product']."}
			.original-background-thumbnail {
				position: absolute;
				top:0;
			}
			.original-background-thumbnail img{
				margin:0;
				box-shadow:none;
				border:none!important;
				padding:0;
			}
			.product-thumbnail{left:0!important;padding:0!important;margin:0.3em!important;position:relative!important;width:".$dm['width']."px;height:".$dm['height']."px;}
			.images .thumbnails a{
				border:0px!important;
				box-shadow:none!important;
				
			}
			.images .thumbnails{
				height:".$dm['height']."px;
			}
			
			.attachment-shop_thumbnail{".$html_array['image']."}
		</style>";
		do_action('fa_after_product_list'); 
	return $outer;
}
	function original_thumbnail($outer){
		global $post,$_wp_additional_image_sizes,$woocommerce;
		$prime = get_post_meta($post->ID, '_back_base',true );
		$width= get_post_meta($post->ID,'_width',true)? get_post_meta( $post->ID,'_width',true) : 53;
		$height= get_post_meta($post->ID,'_height',true) ? get_post_meta( $post->ID,'_height',true) : 60;
		$ratio= get_post_meta($post->ID,'_ratio',true) ? get_post_meta( $post->ID,'_ratio',true) : 0.25;
		$real_paint_area =get_post_meta($post->ID,'_real_paint_area',true);
		$att_ID = get_post_thumbnail_id( $post->ID );
		$attr = wp_get_attachment_image_src( $att_ID, 'shop_single');
		$attrr = wp_get_attachment_image_src( $att_ID, 'shop_thumbnail');
		$placeholder_thumbnail=wc_get_image_size( 'shop_thumbnail');
		$placeholder_thumbnail['crop']=false;
		$dm = (get_post_meta($post->ID,'_has_custom_dimensions',true)=='') ? array("width"=>get_post_meta($post->ID,'_custom_thumbnails_width',true),"height"=> get_post_meta($post->ID,'_custom_thumbnails_height',true) ) : $placeholder_thumbnail;

		if($real_paint_area){
			$isreal=true;
		}else{
			$isreal=false;
		}
		$html_array=$this->factory_make_pixels($isreal,$attr,$width,$height,$real_paint_area,$dm,$ratio);
		do_action('fa_after_product_list'); 
		return $outer."<div class='original-background-thumbnail'><img id='background-thumbnail' src='".$prime."'/></div>
	
		<style type='text/css'>
			/*Original Image Styles*/
			#background-thumbnail{".$html_array['product']."}
			.original-background-thumbnail {
				position: absolute;
			}
			.images .thumbnails a{
				border:0px!important;
				box-shadow:none!important;
				
			}
			.images .thumbnails{
				height:".$dm['height']."px;
			}
			
			.attachment-shop_thumbnail{".$html_array['image']."}
		</style>";

	
	}

	public function original_image ($outer) {

		global $woocommerce,$post,$_wp_additional_image_sizes;
		
		$iscustom=get_post_meta($post->ID, '_allhere' ,true );
		
		if($iscustom!='[["","","",""]]'){
			
		$prime = get_post_meta($post->ID, '_front_base' ,true );
		$width = get_post_meta($post->ID,'_width',true)? get_post_meta( $post->ID,'_width',true) : 53;
		$height = get_post_meta($post->ID,'_height',true) ? get_post_meta( $post->ID,'_height',true) : 60;
		$ratio = get_post_meta($post->ID,'_ratio',true) ? get_post_meta( $post->ID,'_ratio',true) : 0.25;
		$real_paint_area = get_post_meta($post->ID,'_real_paint_area',true);
		$att_ID = get_post_thumbnail_id( $post->ID );
		$attr = wp_get_attachment_image_src( $att_ID, 'shop_single');
		$placeholder_single=wc_get_image_size('shop_single');
		if($prime){
			$dm=(get_post_meta($post->ID,'_has_custom_dimensions',true)=='') ? array("width"=> get_post_meta($post->ID,'_custom_single_width',true) ,"height"=> get_post_meta($post->ID,'_custom_single_height',true) ) : $placeholder_single;
		
			if($real_paint_area){
				$isreal=true;
			}else{
				$isreal=false;
			}
			$html_array=$this->factory_make_pixels($isreal,$attr,$width,$height,$real_paint_area,$dm,$ratio);
		
		return $outer."
		<div class='original-background'>
			<img id='background-original' src='".$prime."'/>
		</div>
	
		<style>
	
			#background-original{".$html_array['product']."}
			.attachment-shop_single{".$html_array['image']."}
			
			/*General Styles*/
			.woocommerce-main-image.zoom {
				background: none repeat scroll 0 0 rgba(0, 0, 0, 0)!important;
				position: absolute;
				z-index: 1;
				left:0;
				top:0;
			}
			.images img{
				padding:0!important;
				max-width:none;
				max-height:none;
				border:none!important;
				margin:0!important;  background:transparent!important;
			}
			.images{
				position:relative;
			/*	width:100%!important;*/
				height:auto;
			}
			.original-background {
				left: 0;
				position: relative;
				top: 0;
				z-index: 0;
			}
			.thumbnails a.first{
				position:relative;
				z-index:2;
			}
			#background-thumbnail > img {
				display: inline;
				position: relative;
			}.attachment-shop_thumbnail{
				position: relative!important;
				z-index:2;
			}
		</style>";	do_action('fa_after_product_list'); 
		}
		}else{	do_action('fa_after_product_list'); 
			return $outer;
		}

	
	}

}
