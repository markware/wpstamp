<?php

/**
 * Fired when the plugin is uninstalled.
 *
 * When populating this file, consider the following flow
 * of control:
 *
 * - This method should be static
 * - Check if the $_REQUEST content actually is the plugin name
 * - Run an admin referrer check to make sure it goes through authentication
 * - Verify the output of $_GET makes sense
 * - Repeat with other user roles. Best directly by using the links/query string parameters.
 * - Repeat things for multisite. Once for a single site in the network, once sitewide.
 *
 * This file may be updated more in future version of the Boilerplate; however, this is the
 * general skeleton and outline for how the file should work.
 *
 * For more information, see the following discussion:
 * https://github.com/tommcfarlin/WordPress-Plugin-Boilerplate/pull/123#issuecomment-28541913
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Plugin_Name
 */

// If uninstall not called from WordPress, then exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}
class WPStamp_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {
		
	delete_option('FA_RegisterUser');
	delete_option('FA_DraftSave');
	delete_option('FA_GuideTool');
	delete_option('FA_OpenSlider');
	delete_option('FA_CornerColor');
	delete_option('FA_CornerWidth');
	delete_option('FA_BorderColor');
	delete_option('FA_BorderWidth');
	delete_option('FA_LibraryHamburger');
	delete_option('FA_LibraryTool');
	delete_option('FA_FreedrawTool');
	delete_option('FA_ShapeTool');
	delete_option('FA_TextTool');
	delete_option('FA_GalleryTool');
	delete_option('FA_BorderTool');
	delete_option('FA_FontList');
	delete_option('FA_Colors');
	delete_option('FA_AllowEdit');	
	}
}