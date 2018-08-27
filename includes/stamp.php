<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the dashboard.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Plugin_Name
 * @subpackage Plugin_Name/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, dashboard-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Plugin_Name
 * @subpackage Plugin_Name/includes
 * @author     Your Name <email@example.com>
 */
class WPStamp {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Plugin_Name_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the Dashboard and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		$this->plugin_name = 'wpstamp';
		$this->version = '1.0.0';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_media_hooks();
		$this->define_public_hooks();
		$this->define_media_gallery();
		$this->define_factory_thumbnails();
		add_action('wp_ajax_nopriv_upload_product_photo', array(&$this,'upload_product_photo') );
		add_action('wp_ajax_upload_product_photo', array(&$this,'upload_product_photo' ) );
		
	}
	
	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Plugin_Name_Loader. Orchestrates the hooks of the plugin.
	 * - Plugin_Name_i18n. Defines internationalization functionality.
	 * - Plugin_Name_Admin. Defines all hooks for the dashboard.
	 * - Plugin_Name_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/stamp-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/stamp-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the Dashboard.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/stamp-admin.php';
		
			/**
		 * The class responsible for defining all actions that occur in the Media.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/stamp-media-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/stamp-public.php';

		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/media-gallery-public.php';
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/thumbnail-products-public.php';
		$this->loader = new WPStamp_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Plugin_Name_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new WPStamp_i18n();
		$plugin_i18n->set_domain( $this->get_plugin_name() );

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the dashboard functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Stamp_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
		
		// Custom Loaders for Menu Actions
		add_action( 'admin_init', array(&$this,'pf_register_settings' ));
	}
	private function define_media_hooks() {

		$media_admin = new Factory_Media_Admin( );

	
	}
	private function define_media_gallery() {

		$media_gallery = new Factory_Gallery( );

	
	}
	private function define_factory_thumbnails() {

		$media_gallery = new Factory_Thumbnails( );

	
	}
	public static  function base64_to_jpeg( $base64_string, $output_file ) {
			$ifp = fopen( $output_file, "wb" );
			fwrite( $ifp, base64_decode($base64_string) );
			fclose( $ifp );
			return( $output_file );
	}
	public function pf_register_settings() {
	//register settings
		register_setting( 'pf-settings-group', 'FA_RegisterUser' );
		register_setting( 'pf-settings-group', 'FA_DraftSave' );
		register_setting( 'pf-settings-group', 'FA_GuideTool' );
		register_setting( 'pf-settings-group', 'FA_OpenSlider' );
		register_setting( 'pf-settings-group', 'FA_CornerColor' );
		register_setting( 'pf-settings-group', 'FA_CornerWidth' );
		register_setting( 'pf-settings-group', 'FA_BorderColor' );
		register_setting( 'pf-settings-group', 'FA_BorderWidth' );
		register_setting( 'pf-settings-group', 'FA_LibraryTool' );
		register_setting( 'pf-settings-group', 'FA_FreedrawTool' );
		register_setting( 'pf-settings-group', 'FA_ShapeTool' );
		register_setting( 'pf-settings-group', 'FA_TextTool' );
		register_setting( 'pf-settings-group', 'FA_GalleryTool' );
		register_setting( 'pf-settings-group', 'FA_BorderTool' );
		register_setting( 'pf-settings-group', 'FA_FontList' );
		register_setting( 'pf-settings-group', 'FA_Colors' );
		register_setting( 'pf-settings-group', 'FA_LESS' );
	}
	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Stamp( $this->get_plugin_name(), $this->get_version() );
		//$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
	
		add_shortcode('designer', array( 'Stamp', 'designer' ) );

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Plugin_Name_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}
	
  	 public function upload_product_photo(){
		$base = isset($_POST['base']) ? $_POST['base'] : '';
		$filename = isset($_POST['filename']) ? $_POST['filename'] : '';
		$post_id  = isset($_POST['id']) ? (int) $_POST['id'] : ''; 
		$upload_dir = wp_upload_dir();

			if(exif_imagetype($base) != IMAGETYPE_JPEG){
				$image = str_replace('data:image/png;base64,', '', $base);
			}else{
				$image = str_replace('data:image/jpeg;base64,', '', $base);	
			}
			$image = str_replace(' ', '+', $image);
			$data = base64_decode($image);
			
			$success = file_put_contents($upload_dir['path'] . '/'.$filename, $data);
			$image_url=$upload_dir['path'] . '/'.$filename;
			$image_data = file_get_contents($image_url);
			$filename = basename($image_url);
			if(wp_mkdir_p($upload_dir['path']))
				$file = $upload_dir['path'] . '/' . $filename;
			else
				$file = $upload_dir['basedir'] . '/' . $filename;
			file_put_contents($file, $image_data);
	
			$wp_filetype = wp_check_filetype($filename, null );
			$attachment = array(
					'post_mime_type' => $wp_filetype['type'],
					'post_type'=>'attachment', 															
					'post_title' => sanitize_file_name($filename),
					'post_content' => '',
					'post_status' => 'inherit'
					);
			$attach_id = wp_insert_attachment( $attachment, $file, $post_id );
			require_once(ABSPATH . 'wp-admin/includes/image.php');
			$attach_data = wp_generate_attachment_metadata( $attach_id, $file );
			wp_update_attachment_metadata( $attach_id, $attach_data );
			$data = array('success'=> true,'url'=> wp_get_attachment_url( $attach_id),'name' =>$file,'id'=>$attach_id);
			echo json_encode($data);
			die();
	}

}
