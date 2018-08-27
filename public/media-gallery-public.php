<?php
Class Factory_Gallery{
		
	public function __construct() {
		add_action( 'wp_ajax_nopriv_paginate_media_gallery', array(&$this,'gallery_merger') );
		add_action( 'wp_ajax_paginate_media_gallery',array(&$this,'gallery_merger') );
		add_action( 'wp_ajax_nopriv_show_images', array(&$this,'show_images') );
		add_action( 'wp_ajax_show_images',array(&$this,'show_images') );

	}
	
	public function gallery_merger($categories="",$posts_per_page="",$size="thumbnail"){
			global $attachment;
			$paged = ( get_query_var( 'paged' ) ) ? absint( get_query_var( 'paged' ) ) : 1;	
	
			if(isset($_POST['page'])){
				$paged	  = (int) $_POST['page'];
				$has_page = true;
			
			}else{
				$has_page = false;
			}
			if(isset($_POST['category'])){
				$category =  (int) sanitize_text_field( $_POST['category'] );
			}
			if(isset($_POST['posts_per_page'])){
				$posts_per_page = (int) $_POST['posts_per_page'];
			}else{
				$posts_per_page = 10;
			}

//check transient
			$mc_tax	= apply_filters('mc_taxonomy','uploaded');
		
			$args = array('tax_query' => array(array('taxonomy' => $mc_tax, 'field' => 'tag_ID','terms' => $category ) ));
		
		//	  if ( false === ( $_all_attachments = get_transient( 'media_query_'. $paged .'_'. $category ) )){

				$_all_attachments 	= get_posts( array('posts_per_page' => -1, 'post_type' => 'attachment', 'post_mime_type' => 'image') + $args );
					set_transient( 'media_query_'. $paged .'_'. $category, $_all_attachments, 130 * 60 * 60 );

		//	}
	//	 if (false === ( $_attachments = get_transient( 'media_query_all_'.$paged .'_'. $category) ) ) {
			  	
					$_attachments 		= get_posts( array('paged' => $paged,'posts_per_page' => $posts_per_page, 'post_type' => 'attachment', 'post_mime_type' => 'image') + $args );
					set_transient( 'media_query_all_'. $paged .'_'.$category , $_attachments, 130 * 60 * 60 );
		//		}
	
		//	$_all_attachments 	= get_posts( array('posts_per_page' => -1, 'post_type' => 'attachment', 'post_mime_type' => 'image') + $args );
		//	$_attachments 		= get_posts( array('paged' => $paged,'posts_per_page' => $posts_per_page, 'post_type' => 'attachment', 'post_mime_type' => 'image') + $args );
			$attachments 		= array();
			$_attachments_len 	= count( $_attachments );
		
			$img_to_export		= array();
			foreach ( $_attachments as $key => $val ) {
				$attachments[$val->ID] = $_attachments[$key];
			}
			foreach ( $attachments as $id => $attachment ) {
				$link   	= isset($attr['link']) && 'file' == $attr['link'] ? wp_get_attachment_link($id, $size, false, false) : wp_get_attachment_link($id, $size, true, false);
				$src		= wp_get_attachment_image_src($id,'thumbnail');
				$src_full	= wp_get_attachment_image_src($id,'full');
				array_push($img_to_export,array('thumb'=>$src[0],'full'=>$src_full[0]));
			}
	//	print_r($img_to_export);
		//	$img_to_export=array_unique($img_to_export);
		
			echo json_encode(array('images'=>$img_to_export,'page'=>$paged,'ppp'=>$posts_per_page,'category'=>$category,'total'=>count($_all_attachments),'haspage'=>$has_page));
		die();
			//$this->gallery( $img_to_export,$paged,$posts_per_page,$category,$has_page );
		}

	

	
		
		public function gallery($_attachments,$paged,$posts_per_page,$category,$has_page){
		//	$_attachments_len = count( $_attachments );
			
			$output='<ul class="photo-list">';
			
			foreach ( $_attachments as $key=>$attachment) {
				
					$output .= '<li><img class="list-image" src="'.$attachment['thumb'].'" data-full="'.$attachment['full'].'"/></li>';
			
				
			}
	$output .='<ul>';
			if($has_page){
					$data = array('success'=> true,'out'=> $output);
					echo json_encode($data);
					die();
			}else{
				echo $output;
			}
		}



/*
 *  show_images
 * */
 public function show_images(){
 			$id=isset($_POST['id']) ? (int)$_POST['id'] : '';

			$the_gallery=new Factory_Gallery();
			$mediaSelected=get_post_meta( $id, '_mediaSelected', true );
			$mediaSelectedarray=explode('&',$mediaSelected);
			$args = array( 'type'=> 'attachment', 'taxonomy' => 'uploaded', 'hide_empty'  => false ); 
			$categories =  get_categories( $args ) ;
			$categories_all=array();
			//echo'<ul class="photo-gallery">';
				foreach ($categories as $category) {

				 if(in_array($category->term_id.'=on',$mediaSelectedarray)){
				 	array_push($categories_all,array("name"=>$category->name,"id"=>$category->cat_ID));
				 	
				 }
				}

			//	$the_gallery->gallery_merger($categories_all,10);
		//	echo '</ul>';
	//		echo '<ul class="media-navigation"><li class="next"><a data-next="2" class="fa-button"><em class="material-icons">arrow_drop_down_circle</em>'.__('More','factory').'</a></li></ul>';
	
			echo json_encode($categories_all);
			die();
		}
	}
?>