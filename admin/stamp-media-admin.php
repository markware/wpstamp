<?php

class Factory_Media_Admin {

	

	public function __construct(  ) {

		
		add_action( 'init', array(&$this,'factory_add_upload_taxonomy' ));
		add_filter( 'pre_get_posts',array(&$this, 'papt_makeAttachmentsVisibleInTaxQueries' ));
		add_filter( 'upload_mimes', array(&$this,'cc_mime_types' ) );
		add_action( 'post-upload-ui', array(&$this,'bulk_upload' ) );
		add_action( 'add_attachment', array(&$this,'analyse_attachment'));
		
	}

	public function bulk_upload(){
		Stamp_Admin::render('partials/admin-media-categories.php');
	}
	public function upload_categories($serial) {
			global $mediauploads;
			$mediauploads = $serial;
		}

	public	function cc_mime_types( $mimes ){
			$mimes['svg'] = 'image/svg+xml';
			return $mimes;
		}

	public function factory_add_upload_taxonomy() {
			$labels = array(
							'name'              => 'Media Categories',
							'singular_name'     => 'Media Category',
							'search_items'      => 'Search Categories',
							'all_items'         => 'All Categories',
							'parent_item'       => 'Parent Category',
							'parent_item_colon' => 'Parent Category:',
							'edit_item'         => 'Edit Category',
							'update_item'       => 'Update Category',
							'add_new_item'      => 'Add New Category',
							'new_item_name'     => 'New Category Name',
							'menu_name'         => 'Media Categories',
							);
					
			$args =  array(
							'hierarchical' => false,
							'labels' => $labels,
							'query_var'=>'uploaded',
							'rewrite' => false,
							'update_count_callback'	=> '_update_generic_term_count',
							'show_admin_column' => true,
							'public'	=> true
							);
			register_taxonomy( 'uploaded', 'attachment', $args );
		}
		public function analyse_attachment($attachment_ID)
		{			
			if(isset($_REQUEST['media_upps'])){
				$media_upps			= sanitize_text_field( $_REQUEST['media_upps'] );
				$media_upps_array   = explode('&',$media_upps);
				//print_r($media_upps_array);
				$media_upps_array = array_map( 'intval', $media_upps_array );
				$media_upps_array = array_unique( $media_upps_array );
				wp_set_post_terms( $attachment_ID, $media_upps_array, 'uploaded');
			}
		}
		

		function papt_makeAttachmentsVisibleInTaxQueries( $query ) {
			if ( is_tax() ) {
				$query->set( 'post_status', 'all' );
			}
	
			return $query;
		}

	
}
