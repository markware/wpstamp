<?php
class Stamp_Admin {

	private $plugin_name;

	private $version;

	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		add_action('admin_menu', array(&$this,'create_custom_menu'));
		add_action( 'add_meta_boxes', array(&$this,'product_details_add' ));                                                      
		add_action( 'save_post', array(&$this, 'product_details_save' ));
		add_action( 'pf_child', array(&$this,'factory_child_product'),10,1 );
		add_action( 'pf_parent', array(&$this,'factory_parent_product'),10,1 );
		add_action( 'wp_ajax_write_less',  array(&$this,'writeless') );
		
		add_action( 'wp_ajax_create_designer_page', array(&$this,'create_designer_page') );
		
	}


	public function enqueue_styles() {

		wp_register_style('backcss', plugins_url('css/back.css',__FILE__ ));
		wp_enqueue_style('backcss');
		wp_enqueue_style( 'minicolors', plugins_url( 'css/jquery.minicolors.css', __FILE__ ) );
		wp_enqueue_style( 'codemirror', plugins_url( 'css/codemirror.css', __FILE__ ) );

	}
	
	
	public function product_details_call( $post ) {
	    // Use nonce for verification
	    wp_nonce_field( plugin_basename( __FILE__ ), 'product_details_noncename' ); 
	    $field_value = get_post_meta( $post->ID, 'product_details_meta', false );
	    wp_editor( $field_value[0], 'product_details_meta' );
	}
	// When the post is saved, saves our custom data

	public function product_details_add() {
    	add_meta_box( 'product_details', 'Product Details', array(&$this,'factory_inner_custom_box'), 'product', 'normal', 'high' );
    	 
	}
	public function factory_inner_custom_box( $post ) {


		global $post;
		if( get_post_meta( $post->ID, '_child', true) ){
			do_action('pf_child',$post);
		}else{
			do_action('pf_parent',$post);
		}

		
	}
	
		
	public function factory_child_product( $post ){
	
		$width			 = get_post_meta( $post->ID,'_width',true) ? get_post_meta( $post->ID,'_width',true) : 53;
		$height			 = get_post_meta( $post->ID,'_height',true) ? get_post_meta( $post->ID,'_height',true) :63;
		$ratio			 = get_post_meta( $post->ID,'_ratio',true) ? get_post_meta(  $post->ID,'_ratio',true) : 0.25;
		$front			 = get_post_meta($post->ID, '_front_base', true);
		$back			 = get_post_meta($post->ID, '_back_base', true);
		$json_a 	 	 = json_decode(get_post_meta($post -> ID, '_Canvas_Front', true));
		$json_b		 	 = json_decode(get_post_meta($post -> ID, '_Canvas_Back', true));
		$real_paint_area = get_post_meta($post->ID,'_real_paint_area',true);
		$real_paint_area_b = get_post_meta($post->ID,'_real_paint_area_b',true);
		//oher
		$real			= explode('/',$real_paint_area);
		$realwidth		= $real_paint_area!='' ? $real[0] :'';
		$realheight		= $real_paint_area!='' ? $real[1] :'';
		$realx			= $real_paint_area!='' ? $real[2] :'';
		$realy			= $real_paint_area!='' ? $real[3] :'';
		$width_pixels	= $this->topixels($width, $ratio, 96);
		$height_pixels	= $this->topixels($height, $ratio, 96);

		$link			= get_permalink(get_post_meta($post->ID, '_id', true));
		$value = get_post_meta($post->ID, '_allhere', true);
		$real_paint_area = get_post_meta($post->ID, '_real_paint_area', true);
		$real_paint_area_b = get_post_meta($post->ID, '_real_paint_area_b', true);
		$json_is = json_decode($value, true);
	

		if ($real_paint_area) {


			$real = json_decode(html_entity_decode($real_paint_area), true);
			$realwidth = $real['objects'][0]['width'] *$real['objects'][0]['scaleX'];
			$realheight = $real['objects'][0]['height']*$real['objects'][0]['scaleY'];
			$realx = $real['objects'][0]['left'];
			$realy = $real['objects'][0]['top'];

		} else {
			$realwidth = $width_pixels;
			$realheight = $height_pixels;
			$realx = 0;
			$realy = 0;
		}

		if ($real_paint_area_b) {
			$real_b = json_decode(html_entity_decode($real_paint_area_b), true);
			$realwidth_b = $real_b['objects'][0]['width']*$real_b['objects'][0]['scaleX'];
			$realheight_b = $real_b['objects'][0]['height']*$real_b['objects'][0]['scaleY'];
			$realx_b = $real_b['objects'][0]['left'];
			$realy_b = $real_b['objects'][0]['top'];
		} else {
			$realwidth_b = $width_pixels;
			$realheight_b = $height_pixels;
			$realx_b = 0;
			$realy_b = 0;
		}


		$args = array('prime' => array(), 'id' => $id,'width_pixels' => Stamp_Admin::topixels($width, $ratio, 96), 'height_pixels' => Stamp_Admin::topixels($height, $ratio, 96),
						   'product' => $product, 
						   'value' => $value,
						    'width' => $width,
						     'height' => $height, 
						     'ratio' => $ratio,
						      'real_paint_area' => $real_paint_area,
						      'real_paint_area_b' => $real_paint_area_b,
						       'json_is' => $json_is,
						        'colors_no' => $colors_no,
						         'front_base' => $front_base,
						          'back_base' => $back_base,
						           'edit' => $edit, 
						           'realwidth' => $realwidth,
						            'realheight' => $realheight, 
						            'realx' => $realx,
						             'realy' => $realy,
						              'realwidth_b' => $realwidth_b,
						            'realheight_b' => $realheight_b, 
						            'realx_b' => $realx_b,
						             'realy_b' => $realy_b, 
						             'price_html' => $price_html,
						              'price' => $price,
						               'adl_price' => $adl_price
					   );

		$this->render('partials/admin-custom-product.php',$args);
		
		$settings_product = array('json_a_' => $json_a, 'json_b_' => $json_b, 'width_' => $width, 'height_' => $height, 'realwidth_' => $realwidth / $ratio, 'realheight_' => $realheight / $ratio, 'top_' => $realx / $ratio, 'left_' => $realy / $ratio, 'ratio_' => $ratio);
		wp_enqueue_script('fabricjs', plugins_url('js/fabric.min.js', __FILE__));
		wp_enqueue_script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
		wp_register_script('admin_product', plugins_url('js/admin_product.js', __FILE__));
		wp_localize_script('admin_product', 'fa_settings_product', $settings_product);
		wp_enqueue_script('admin_product');
	}
	public static function topixels($cm,$ratio,$dpi){
		return round(	($dpi * $cm / 2.54)*$ratio );
	}
	public function factory_parent_product( $post ){
			$value	 					= get_post_meta( $post->ID, '_allhere', true );
			$isparent 					= get_post_meta( $post->ID, '_isparent', true );
			$transparent 				= get_post_meta( $post->ID, '_transparent', true );
			$ratio 						= get_post_meta( $post->ID, '_ratio', true );
			$json_is					= json_decode($value,true);
			$mediaSelected				= get_post_meta( $post->ID, '_mediaSelected', true );
			$priceBack					= get_post_meta( $post->ID, '_priceBack', true );
			$colors_no					= count($json_is);
			$width						= get_post_meta( $post->ID, '_width', true );
			$height						= get_post_meta( $post->ID, '_height', true );
			$custom_catalog_width		= get_post_meta( $post->ID, '_custom_catalog_width', true );
			$custom_single_width		= get_post_meta( $post->ID, '_custom_single_width', true );
			$custom_thumbnails_width	= get_post_meta( $post->ID, '_custom_thumbnails_width', true );
			$custom_catalog_height		= get_post_meta( $post->ID, '_custom_catalog_height', true );
			$custom_single_height		= get_post_meta( $post->ID, '_custom_single_height', true );
			$custom_thumbnails_height	= get_post_meta( $post->ID, '_custom_thumbnails_height', true );
			$has_not_custom_dimensions	= get_post_meta( $post->ID, '_has_custom_dimensions', true );
			$real_paint_area 			= get_post_meta($post->ID, '_real_paint_area', true);
			$real_paint_area_b			= get_post_meta($post->ID, '_real_paint_area_b', true);

			$auto_width = wc_get_image_size( 'shop_single');
			$args=array('real_paint_area'=>$real_paint_area,
						'real_paint_area_b'=>$real_paint_area_b,
						'value' => $value,
						'isparent' => $isparent,
						'transparent' => $transparent,
						'ratio' => $ratio,
						'json_is' => $json_is,
						'mediaSelected' => $mediaSelected,
						'priceBack' => $priceBack,
						'colors_no'=> $colors_no,
						'width' => $width,
						'height' => $height,
						'auto_width'=>$auto_width['width'],
						'custom_catalog_width' => $custom_catalog_width,
						'custom_single_width' => $custom_single_width,
						'custom_thumbnails_width' => $custom_thumbnails_width,
						'custom_catalog_height' => $custom_catalog_height,
						'custom_single_height' => $custom_single_height,
						'custom_thumbnails_height' => $custom_thumbnails_height,
						'has_not_custom_dimensions' => $has_not_custom_dimensions,
						'pixel_width' => $this->topixels($width, $ratio, 96),
						'pixel_height' => $this->topixels($height, $ratio, 96)
						);
						
						
			wp_nonce_field( 'factory_inner_custom_box', 'factory_inner_custom_box_nonce' );
			$this->render('partials/admin-parent-product.php',$args);
			$settings_admin = array('site_url_' =>  admin_url( 'admin-ajax.php' ), 'post_id_' => $post -> ID, 'setting_border_color_' => 'blue',   'nonce' => wp_create_nonce( "upload_product_photo_nonce" ));
			wp_enqueue_script('fabricjs', plugins_url('../assets/js/fabric.min.js', __FILE__));
			wp_register_script('admin_parent', plugins_url('js/admin_parent.js', __FILE__));
			wp_localize_script('admin_parent', 'fa_settings_parent', $settings_admin);
			wp_enqueue_script('admin_parent');
	}
	public function create_designer_page(){
		$post_id=isset($_POST['id']) ? intval($_POST['id']) :'-1';
		 if($post_id!='-1'){
		 	$my_post = array(
          'post_title'    => __('Degisner','wpstamp'),
          'post_content'  => '[designer id='.$post_id.']',
          'post_status'   => 'publish',
          'post_type'     => 'page'
          );

          // Insert the post into the database

	$page = $this->get_page_by_name('Degisner');
	if (!empty($page)) {
		die(json_encode(array('success'=>false)));   
	} else {
	// page does not exist
	  wp_insert_post( $my_post );
	  die(json_encode(array('success'=>true)));   
	}
	         
        	die();   
		}
	}

	public function get_page_by_name($pagename)
	{
		$pages = get_pages();
		foreach ($pages as $page) if ($page->post_name == $pagename) return $page;
		return false;
	}



	public function product_details_save( $post_id ) {
		if ( ! isset( $_POST['factory_inner_custom_box_nonce'] ) )
			return $post_id;
		$nonce = isset($_POST['factory_inner_custom_box_nonce']) ? $_POST['factory_inner_custom_box_nonce'] :'';
		if ( ! wp_verify_nonce( $nonce, 'factory_inner_custom_box' ) )
			return $post_id;
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
			return $post_id;
		if ( 'page' == isset($_POST['post_type']) ) {
			if ( ! current_user_can( 'edit_page', $post_id ) )
				return $post_id;
		} else {
			if ( ! current_user_can( 'edit_post', $post_id ) )
				return $post_id;
		}
		$allhere	 				=  isset($_POST['allhere']) ? $_POST['allhere'] :'' ;
		$isparent					=  isset($_POST['isparent']) ? $_POST['isparent'] :'';
		$ratio						=  isset($_POST['ratio']) ? $_POST['ratio'] :'';
		$mediaSelected				=  isset($_POST['mediaCategories']) ? $_POST['mediaCategories'] :'';
		$priceBack					=  isset($_POST['priceBack']) ? $_POST['priceBack']:'' ;
		$real_paint_area			=  isset($_POST['real_paint_area']) ? htmlspecialchars($_POST['real_paint_area'], ENT_QUOTES, 'UTF-8') :'' ;
		$real_paint_area_b			=  isset($_POST['real_paint_area_b']) ? htmlspecialchars($_POST['real_paint_area_b'], ENT_QUOTES, 'UTF-8') :'' ;
	

		$custom_catalog_width		=  isset($_POST['custom_catalog_width']) ? $_POST['custom_catalog_width']:'' ;
		$custom_single_width		=  isset($_POST['custom_single_width']) ? $_POST['custom_single_width']:'' ;
		$custom_thumbnails_width	=  isset($_POST['custom_thumbnails_width']) ? $_POST['custom_thumbnails_width']:'' ;
		$custom_catalog_height		=  isset($_POST['custom_catalog_height']) ? $_POST['custom_catalog_height']:'' ;
		$custom_single_height		=  isset($_POST['custom_single_height']) ? $_POST['custom_single_height']:'' ;
		$custom_thumbnails_height	=  isset($_POST['custom_thumbnails_height']) ? $_POST['custom_thumbnails_height']:'' ;
		$has_custom_dimensions		=  isset($_POST['has_custom_dimensions']) ? $_POST['has_custom_dimensions']:'';

		$visible=($isparent==1) ? 0 : 1;
		
		update_post_meta( $post_id, '_allhere', $allhere );
		update_post_meta( $post_id, '_isparent', $isparent );
		update_post_meta( $post_id, '_ratio', $ratio );
		update_post_meta( $post_id, '_priceBack', $priceBack );
		update_post_meta( $post_id, '_mediaSelected', $mediaSelected );
		update_post_meta( $post_id, '_visibility', $visible );
		update_post_meta( $post_id, '_real_paint_area', $real_paint_area );
		update_post_meta( $post_id, '_real_paint_area_b', $real_paint_area_b );
		update_post_meta( $post_id, '_has_custom_dimensions', $has_custom_dimensions );
		update_post_meta( $post_id, '_custom_catalog_width', $custom_catalog_width );
		update_post_meta( $post_id, '_custom_single_width', $custom_single_width );
		update_post_meta( $post_id, '_custom_thumbnails_width', $custom_thumbnails_width );
		update_post_meta( $post_id, '_custom_catalog_height', $custom_catalog_height );
		update_post_meta( $post_id, '_custom_single_height', $custom_single_height );
		update_post_meta( $post_id, '_custom_thumbnails_height', $custom_thumbnails_height );
	}
	

	public function enqueue_scripts() {

		$settings = array('fa_ajax_url' => admin_url( 'admin-ajax.php' ) ,'fa_fonts' =>get_option('FA_FontList'), 'fa_colors' =>get_option('FA_Colors'));
		wp_register_script( 'backjs', plugins_url('js/main.js',__FILE__ ));
			wp_register_script( 'codemirror', plugins_url('js/codemirror.js',__FILE__ ));
			wp_register_script( 'csscodemirror', plugins_url('js/css.js',__FILE__ ));

		wp_localize_script('backjs', 'fa_settings', $settings);
		wp_enqueue_script( 'minicolors',plugins_url( 'js/jquery.minicolors.js', __FILE__ ));
		wp_enqueue_script('codemirror');	wp_enqueue_script('csscodemirror');
		wp_enqueue_script('backjs');
	//	wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/plugin-name-admin.js', array( 'jquery' ), $this->version, false );

	}
	public function create_custom_menu() {
	if($this->is_woocommerce_active()){
	 		add_submenu_page( 'woocommerce', 'Custom Products Settings', 'Custom Products', 'manage_options','settings_display',  array( &$this, 'settings_display' ) );
		}else{
			$this->render('partials/admin-error.php');
		}
		
	}
	public function settings_display(){
		$this->render("partials/admin-settings.php");
	}
	 public static function render( $filePath, $viewData = null ) {
 
        // Was any data sent through?
        ( $viewData ) ? extract( $viewData ) : null;
 
        ob_start();
        include ( $filePath );
        $template = ob_get_contents();
        ob_end_clean();
 
        echo $template;
    }
	public static function is_woocommerce_active(){
		if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
			return true;
		}else{
			return false;
		}
	}
		
	public static function writeless(){
			$temp=plugin_dir_path(__DIR__);
			require $temp."less/lessc.inc.php";

			$less = new lessc();
			if(isset($_POST['less'])){
				$theless=sanitize_text_field($_POST['less']);

			}

			
			$end = $temp.'less/custom.less';
			$file = $temp.'less/colors.less';
			file_put_contents($file,$theless);
			file_put_contents($end,sanitize_text_field(get_option("FA_LESS")));
			try {
				$less->compileFile($temp."less\app.less", $temp.'public\css\app.css');
			}catch(exception $e){
				$lesstowrite=$e->getMessage();
			}
			$data = array('success'=> $lesstowrite,'out'=> $file);
			echo json_encode($data);
			die();
		}
	
}
