<?php

/**
 *
 * @package    wpStamp
 * @author     Papafotiou Fotis <info@markware.gr>
 */
class Stamp {

	private $plugin_name;
	private $version;
	public $gallery_merger;

	public function __construct($plugin_name, $version) {
		$this -> plugin_name = $plugin_name;
		$this -> version = $version;
		add_action('wp_ajax_nopriv_create_the_product', array(&$this, 'create_the_product'));
		add_action('wp_ajax_create_the_product', array(&$this, 'create_the_product'));
		add_action('woocommerce_after_single_product_summary', array(&$this, 'fa_edit_button'));
		add_action('wp_ajax_nopriv_fa_upload_attachment', array(&$this, 'fa_upload_attachment'));
		add_action('wp_ajax_fa_upload_attachment', array(&$this, 'fa_upload_attachment'));
		add_action('wp_ajax_nopriv_custom_data_product', array(&$this, 'custom_data_product'));
		add_action('wp_ajax_custom_data_product', array(&$this, 'custom_data_product'));
		add_action('wp_ajax_nopriv_change_custom_product', array(&$this, 'change_custom_product'));
		add_action('wp_ajax_change_custom_product', array(&$this, 'change_custom_product'));
		add_action('wp_ajax_nopriv_fa_delete_attachment', array(&$this, 'fa_delete_attachment'));
		add_action('wp_ajax_fa_delete_attachment', array(&$this, 'fa_delete_attachment'));
		add_action('wp_ajax_nopriv_get_other_parent_products', array(&$this, 'get_other_parent_products'));
		add_action('wp_ajax_get_other_parent_products', array(&$this, 'get_other_parent_products'));


	}

	public function custom_data_product() {
		$post_id = isset($_POST['id']) ? (int)$_POST['id'] : '';
		$json_a = json_decode(get_post_meta($post_id, '_Canvas_Front', true));
		$json_b = json_decode(get_post_meta($post_id, '_Canvas_Back', true));
		$data = array('success' => true, 'json_a' => $json_a, 'json_b' => $json_b);
		echo json_encode($data);
		die();
	}

	public function get_other_parent_products(){
		$products=array();
		$args = array(
									     'post_type' => 'product',
									     'meta_query'  => array(
									            array(
									                'key' => '_child',
									              	
						            'compare' => 'NOT EXISTS'
									                
									            ),array(
													'key' => '_isparent',
													'value'    => 'on'
												)
												)
											);
			$loop = new WP_Query( $args );

						while ( $loop->have_posts() ) : $loop->the_post(); 
								
						 		$width			 = get_post_meta(get_the_ID(), '_width',true) ? get_post_meta( get_the_ID(),'_width',true) : 53;
								$height			 = get_post_meta(get_the_ID(), '_height',true) ? get_post_meta( get_the_ID(),'_height',true) :63;
								$ratio			 = get_post_meta(get_the_ID(), '_ratio',true) ? get_post_meta(get_the_ID(),'_ratio',true) : 0.25;
								$mediaCategories = get_post_meta(get_the_ID(), '_mediaCategories', true);
								$back			 = get_post_meta(get_the_ID(), '_back_base', true);
								$child			 = get_post_meta(get_the_ID(), '_allhere', true);
								$variations		 = json_decode($child,true); 
							
								$id=get_the_ID(); 
								$product = new WC_Product( get_the_ID() );
								$price = $product->price;


$assreay =array('price_back' => get_post_meta(get_the_ID(), '_priceBack', true ),'width_pixels' => Stamp_Admin::topixels($width, $ratio, 96),'height_pixels' => Stamp_Admin::topixels($height, $ratio, 96), 'real_paint_a'=>html_entity_decode(get_post_meta(get_the_ID(),'_real_paint_area',true )),'real_paint_b'=>html_entity_decode(get_post_meta(get_the_ID(),'_real_paint_area_b',true )));

							 	$link= get_the_permalink(); 
							 	$title=get_the_title(); 
		 						for($i=0;$i<count($variations);$i++){
									$w=($i<1) ? 100 : 40;
									$products[$id]=array( $variations[$i][0], 'price'=>$price,'info'=>$assreay,'variations'=>$variations); 
								 }
						

							endwhile;
						
							die(json_encode($products));
	}

	public function change_custom_product() {

		$post_id = isset($_POST['id']) ? (int)$_POST['id'] : '';
		$json_all = json_decode(get_post_meta($post_id, '_allhere', true));
		$data = array('success' => true, 'json_all' => $json_all);
		echo json_encode($data);
		die();
	}

	public function enqueue_styles() {
		wp_enqueue_style('minicolors', plugins_url('css/jquery.minicolors.css', __FILE__));
		wp_enqueue_style('mCustomScrollbar', plugins_url('css/jquery.mCustomScrollbar.min.css', __FILE__));
		wp_enqueue_style('Material-Icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');
		wp_enqueue_style('slider', plugins_url('css/nouislider.min.css', __FILE__));
			wp_enqueue_style('tooltipster', plugins_url('css/tooltipster.css', __FILE__));
		wp_enqueue_style('designer', plugins_url('css/app.css', __FILE__));
	}

	public function fa_edit_button() {
		global $woocommerce, $product;
		$id = $product -> id;
		$iscustom = get_post_meta($id, '_allhere', true);
		if (get_option('FA_AllowEdit') == 'on' && $iscustom != '[["","","",""]]') {
			echo '<div class="editor-wrapper"><a class="button edit_product" href="' . get_site_url() . '/editor/?id=' . $id . '">' . __('Edit Product', 'factory') . '</a></div>';
		}
	}

	public static function designer($atts) {
		extract(shortcode_atts(array('id' => '0'), $atts));
		global $woocommerce;
		$prime = array();
		$id = isset($_GET['id']) ? $_GET['id'] : $id;

		$product = wc_get_product($id);

		if (get_post_meta($id, '_child', true)) {
			$edit = 1;
		} else {
			$edit = 0;
		}

		$product = new WC_Product($id);
		$price_html = $product -> get_price_html();
		$price = $product -> get_price();
		$value = get_post_meta($id, '_allhere', true);
		$width = get_post_meta($id, '_width', true) ? get_post_meta($id, '_width', true) : 53;
		$height = get_post_meta($id, '_height', true) ? get_post_meta($id, '_height', true) : 60;
		$ratio = get_post_meta($id, '_ratio', true) ? get_post_meta($id, '_ratio', true) : 0.25;
		$real_paint_area = get_post_meta($id, '_real_paint_area', true);
			$real_paint_area_b = get_post_meta($id, '_real_paint_area_b', true);
		$json_is = json_decode($value, true);
		$colors_no = count($json_is);
		$front_base = get_post_meta($id, '_front_base', true);
		$back_base = get_post_meta($id, '_back_base', true);
		$adl_price = get_post_meta($id, '_priceBack', true);



		if ($real_paint_area) {


			$real = json_decode(html_entity_decode($real_paint_area), true);
			$realwidth = $real['objects'][0]['width'] *$real['objects'][0]['scaleX'];
			$realheight = $real['objects'][0]['height']*$real['objects'][0]['scaleY'];
			$realx = $real['objects'][0]['left'];
			$realy = $real['objects'][0]['top'];

		} else {
			$realwidth = '';
			$realheight = '';
			$realx = '';
			$realy = '';
		}

			if ($real_paint_area_b) {
			
			$real_b = json_decode(html_entity_decode($real_paint_area_b), true);
			$realwidth_b = $real_b['objects'][0]['width']*$real_b['objects'][0]['scaleX'];
			$realheight_b = $real_b['objects'][0]['height']*$real_b['objects'][0]['scaleY'];
			$realx_b = $real_b['objects'][0]['left'];
			$realy_b = $real_b['objects'][0]['top'];
		} else {
			$realwidth_b = '';
			$realheight_b = '';
			$realx_b = '';
			$realy_b = '';
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
		Stamp::renderer("partials/content-designer.php", $args);
 	Stamp::enqueue_styles();
 	Stamp::enqueue_scripts();
	}

	public static function uploadImage($imagea, $asclipius) {
		/* Add image */
		$upload_dir = wp_upload_dir();
		$image = str_replace('data:image/png;base64,', '', $imagea);
		$image = str_replace(' ', '+', $image);
		$data = base64_decode($image);
		$success = file_put_contents($upload_dir['path'] . '/' . $asclipius . '.png', $data);
		/*upload file*/
		$image_url = $upload_dir['path'] . '/' . $asclipius . '.png';
		$image_data = file_get_contents($image_url);
		$filename = basename($image_url);
		if (wp_mkdir_p($upload_dir['path']))
			$file = $upload_dir['path'] . '/' . $filename;
		else
			$file = $upload_dir['basedir'] . '/' . $filename;
		file_put_contents($file, $image_data);
		return array($file, $filename);
	}

	public static function readable_random_string($length = 6) {
		$conso = array("b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "x", "y", "z");
		$vocal = array("a", "e", "i", "o", "u");
		$password = "";
		srand((double)microtime() * 1000000);
		$max = $length / 2;
		for ($i = 1; $i <= $max; $i++) {
			$password .= $conso[rand(0, 19)];
			$password .= $vocal[rand(0, 4)];
		}
		return $password;
	}

	public function create_the_product() {
		$type = isset($_POST['type']) ? sanitize_text_field($_POST['type']) : '';
		$front = isset($_POST['jsonstufff']) ? sanitize_text_field($_POST['jsonstufff']) : '';
		$back = isset($_POST['jsonstuffb']) ? sanitize_text_field($_POST['jsonstuffb']) : '';
		$front_base = isset($_POST['front_base']) ? sanitize_text_field($_POST['front_base']) : '';
		$back_base = isset($_POST['back_base']) ? sanitize_text_field($_POST['back_base']) : '';
		$image = isset($_POST['image_f']) ? sanitize_text_field($_POST['image_f']) : '';
		$image_b = isset($_POST['image_b']) ? sanitize_text_field($_POST['image_b']) : '';
		$avgwidth = isset($_POST['avgwidth']) ? sanitize_text_field($_POST['avgwidth']) : '';
		$avgheight = isset($_POST['avgwidth']) ? sanitize_text_field($_POST['avgheight']) : '';
		$colore = isset($_POST['colore']) ? sanitize_text_field($_POST['colore']) : '';
		if ($front) {
			$jsonfront = json_decode($front);
		} else {
			$jsonback = json_decode($back);
		}
		$asclipius = $this -> readable_random_string();
		$post = get_post($type);
		if (!empty($post)) {
			$double = new WC_Admin_Duplicate_Product();
			if (get_option('FA_DraftSave') == 'on') {
				$new_post_id = $double -> duplicate_product($post, $type, 'draft');
				$arg_status = array('ID' => $new_post_id, 'post_status' => 'draft');
			} else {
				$new_post_id = $double -> duplicate_product($post, $type, 'publish');
				$arg_status = array('ID' => $new_post_id, 'post_status' => 'publish');
			}
			wp_update_post($arg_status);
			clean_post_cache($new_post_id);
		}
		$file_filename = $this -> uploadImage($image, $asclipius);
		$file = $file_filename[0];
		$filename = $file_filename[1];
		$this -> addTheImage($file, $filename, $new_post_id, 'thumbnail');
		if ($image_b) {
			$file_filename = $this -> uploadImage($image_b, $asclipius . '_b');
			$file = $file_filename[0];
			$filename = $file_filename[1];
			$this -> addTheImage($file, $filename, $new_post_id, 'medium');
		}
		update_post_meta($new_post_id, "_Canvas_Front", $front);
		update_post_meta($new_post_id, "_Canvas_Back", $back);
		update_post_meta($new_post_id, "_Color", $colore);
		update_post_meta($new_post_id, "_id", $type);
		update_post_meta($new_post_id, "_front_base", $front_base);
		update_post_meta($new_post_id, "_back_base", $back_base);
		update_post_meta($new_post_id, '_child', '1');
		update_post_meta($new_post_id, '_visibility', 'catalog');
		$priceBackBool = get_post_meta($new_post_id, '_priceBack', true);
		if ($priceBackBool && $back && $front != NULL) {
			$newprice = get_post_meta($new_post_id, '_price', true) + (get_post_meta($new_post_id, '_price', true) * ($priceBackBool / 100));
			$new_sale_price = get_post_meta($new_post_id, '_sale_price', true) + (get_post_meta($new_post_id, '_sale_price', true) * ($priceBackBool / 100));
			$new_regular_price = get_post_meta($new_post_id, '_regular_price', true) + (get_post_meta($new_post_id, '_regular_price', true) * ($priceBackBool / 100));
			$new_min_variation_price = get_post_meta($new_post_id, '_min_variation_price', true) + (get_post_meta($new_post_id, '_min_variation_price', true) * ($priceBackBool / 100));
			$new_max_variation_price = get_post_meta($new_post_id, '_max_variation_price', true) + (get_post_meta($new_post_id, '_max_variation_price', true) * ($priceBackBool / 100));
			$new_min_variation_regular_price = get_post_meta($new_post_id, '_min_variation_regular_price', true) + (get_post_meta($new_post_id, '_min_variation_regular_price', true) * ($priceBackBool / 100));
			$new_max_variation_regular_price = get_post_meta($new_post_id, '_max_variation_regular_price', true) + (get_post_meta($new_post_id, '_max_variation_regular_price', true) * ($priceBackBool / 100));
			update_post_meta($new_post_id, '_min_variation_price', $new_min_variation_price);
			update_post_meta($new_post_id, '_max_variation_price', $new_max_variation_price);
			update_post_meta($new_post_id, '_min_variation_regular_price', $new_min_variation_regular_price);
			update_post_meta($new_post_id, '_max_variation_regular_price', $new_max_variation_regular_price);
			update_post_meta($new_post_id, '_regular_price', $new_regular_price);
			update_post_meta($new_post_id, '_sale_price', $new_sale_price);
			update_post_meta($new_post_id, '_price', $newprice);
			update_post_meta($new_post_id, '_regular_price_variation_id', $new_post_id);
			update_post_meta($new_post_id, '_max_price_variation_id', $new_post_id);
			update_post_meta($new_post_id, '_min_price_variation_id', $new_post_id);
			$product_am = get_product($new_post_id);
			clean_post_cache($new_post_id);
			if ($product_am -> product_type == "variable") {
				foreach ($product_am->get_children() as $children) {
					$newprice = get_post_meta($children, '_price', true) + (get_post_meta($children, '_price', true) * ($priceBackBool / 100));
					$new_regular_price = get_post_meta($children, '_regular_price', true) + (get_post_meta($children, '_regular_price', true) * ($priceBackBool / 100));
					$new_sale_price = get_post_meta($children, '_sale_price', true) + (get_post_meta($children, '_sale_price', true) * ($priceBackBool / 100));
					$new_min_variation_price = get_post_meta($children, '_min_variation_price', true) + (get_post_meta($children, '_min_variation_price', true) * ($priceBackBool / 100));
					$new_max_variation_price = get_post_meta($children, '_max_variation_price', true) + (get_post_meta($children, '_max_variation_price', true) * ($priceBackBool / 100));
					$new_min_variation_regular_price = get_post_meta($children, '_min_variation_regular_price', true) + (get_post_meta($children, '_min_variation_regular_price', true) * ($priceBackBool / 100));
					$new_max_variation_regular_price = get_post_meta($children, '_max_variation_regular_price', true) + (get_post_meta($children, '_max_variation_regular_price', true) * ($priceBackBool / 100));
					update_post_meta($children, '_min_variation_price', $new_min_variation_price);
					update_post_meta($children, '_max_variation_price', $new_max_variation_price);
					update_post_meta($children, '_min_variation_regular_price', $new_min_variation_regular_price);
					update_post_meta($children, '_max_variation_regular_price', $new_max_variation_regular_price);
					update_post_meta($children, '_regular_price', $new_regular_price);
					update_post_meta($children, '_sale_price', $new_sale_price);
					update_post_meta($children, '_price', $newprice);
				}
			}
		}
		$data = array('success' => true, 'message' => get_permalink($new_post_id));
		echo json_encode($data);
		die();
	}

	public static function addTheImage($file, $filename, $post_id, $type) {
		$wp_filetype = wp_check_filetype($filename, null);
		$attachment = array('post_mime_type' => $wp_filetype['type'], 'post_title' => sanitize_file_name($filename), 'post_content' => '', 'post_type' => 'attachment', 'post_status' => 'inherit');
		$attach_id = wp_insert_attachment($attachment, $file, $post_id);
		require_once (ABSPATH . 'wp-admin/includes/image.php');
		$attach_data = wp_generate_attachment_metadata($attach_id, $file);
		wp_update_attachment_metadata($attach_id, $attach_data);
		if ($type == 'thumbnail') {
			set_post_thumbnail($post_id, $attach_id);
		} else {
			update_post_meta($post_id, '_product_image_gallery', $attach_id);
		}
	}

	public static function renderer($filePath, $viewData = null) {

		($viewData) ? extract($viewData) : null;

		ob_start();
		include ($filePath);
		$template = ob_get_contents();
		ob_end_clean();

		echo $template;
	}

	public function enqueue_scripts() {
		wp_enqueue_script('jquery-2', plugins_url('js/jquery.min.js', __FILE__));
		wp_enqueue_script('fabricjs', plugins_url('js/fabric.min.js', __FILE__));
		wp_enqueue_script('minicolors', plugins_url('js/jquery.minicolors.js', __FILE__));
		wp_enqueue_script('nicescroll', plugins_url('js/nicescroll.min.js', __FILE__));
		wp_enqueue_script('darkroom',plugins_url('js/darkroom.js', __FILE__));
		wp_enqueue_script('sortable',plugins_url('js/html.sortable.min.js', __FILE__));
		wp_enqueue_script('tooltipster',plugins_url('js/jquery.tooltipster.min.js', __FILE__));
		wp_enqueue_script('tooltipster',plugins_url('js/instajam.min.js', __FILE__));

		$id = isset($_GET['id']) ?  (int) $_GET['id'] : '';
		$settings_creator = array('site_url_' => admin_url('admin-ajax.php'), 'setting_corner_color_' => get_option('FA_CornerColor'), 
			'setting_border_color_' => get_option('FA_BorderColor'), 'setting_corner_width_' => get_option('FA_CornerWidth'), 'instagram' => plugin_dir_url( __FILE__ ) .'instagram_auth.php',
			'setting_border_width_' => get_option('FA_BorderWidth'), 'setting_font_list_' => get_option('FA_FontList'), 'edit_id' => $id);
		wp_enqueue_script('jquery-ui', plugins_url('js/nouislider.min.js', __FILE__));
		wp_register_script('tshirteditor', plugins_url('js/app.js', __FILE__));
		//		wp_register_script('tshirteditor', plugins_url('js/app.min.js', __FILE__));
		wp_localize_script('tshirteditor', 'fa_settings', $settings_creator);
		wp_enqueue_script('tshirteditor');
	
	}

	public static function fa_upload_attachment($base = '', $filename = '', $post_id = '') {
		$base = isset($_POST['base']) ? $_POST['base'] : '';
		$filename = isset($_POST['filename']) ? $_POST['filename'] : '';
		$post_id = isset($_POST['id']) ? (int)$_POST['id'] : '';
		$upload_dir = wp_upload_dir();

		if (exif_imagetype($base) != IMAGETYPE_JPEG) {
			$image = str_replace('data:image/png;base64,', '', $base);
		} else {
			$image = str_replace('data:image/jpeg;base64,', '', $base);
		}
		$image = str_replace(' ', '+', $image);
		$data = base64_decode($image);

		$success = file_put_contents($upload_dir['path'] . '/' . $filename, $data);
		$image_url = $upload_dir['path'] . '/' . $filename;
		$image_data = file_get_contents($image_url);
		$filename = basename($image_url);
		if (wp_mkdir_p($upload_dir['path']))
			$file = $upload_dir['path'] . '/' . $filename;
		else
			$file = $upload_dir['basedir'] . '/' . $filename;
		file_put_contents($file, $image_data);

		$wp_filetype = wp_check_filetype($filename, null);
		$attachment = array('post_mime_type' => $wp_filetype['type'], 'post_type' => 'attachment', 'post_title' => sanitize_file_name($filename), 'post_content' => '', 'post_status' => 'inherit');
		$attach_id = wp_insert_attachment($attachment, $file, $post_id);
		require_once (ABSPATH . 'wp-admin/includes/image.php');
		$attach_data = wp_generate_attachment_metadata($attach_id, $file);
		wp_update_attachment_metadata($attach_id, $attach_data);
		$data = array('success' => true, 'url' => wp_get_attachment_url($attach_id), 'name' => $file, 'id' => $attach_id);
		echo json_encode($data);
		die();

	}

	public function fa_delete_attachment() {
		$attachmentid = isset($_POST['id']) ? (int)$_POST['id'] : '';

		if (wp_delete_attachment($attachmentid) === false) {
			$success = 'false';
		} else {
			$success = 'true';
		}
		$data = array('success' => $success);
		echo json_encode($data);
		die();
	}

}
