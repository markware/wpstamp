<?php

/**
 * Fired during plugin activation
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Plugin_Name
 * @subpackage Plugin_Name/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Plugin_Name
 * @subpackage Plugin_Name/includes
 * @author     Your Name <email@example.com>
 */
class WPStamp_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {


	
	add_option('FA_RegisterUser', '');
	add_option('FA_DraftSave', '');
	//next
	add_option('FA_GuideTool','on');
	add_option('FA_OpenSlider','on');
	add_option('FA_CornerColor','blue');
	add_option('FA_CornerWidth', '9');
	add_option('FA_BorderColor', 'blue');
	add_option('FA_BorderWidth','1');
	
	add_option('FA_LibraryTool','on');
	add_option('FA_FreedrawTool','on');
	add_option('FA_ShapeTool','on');
	add_option('FA_TextTool','on');
	add_option('FA_GalleryTool','on');
	add_option('FA_BorderTool','on');
	add_option('FA_AllowEdit','on');
	add_option('FA_LibraryHamburger','on');
	add_option('FA_LESS','//');
	//Colors
	add_option('FA_Colors','@primary-color:#ffffff;@secondary-color:#006fff;@toolbar-color:#3b3b3b;@widget-color:#ffffff;@gray-panel:#f7f7f7;@gradient:linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(255, 255, 255, 0.00));@border-radius:4px;');
	add_option('FA_FontList','Arial,Tahoma,Verdana,Times%2BNew%2BRoman,Georgia,Impact,Comic%2BSans,Aclonica,Allan,Annie%2BUse%2BYour%2BTelescope,Anonymous%2BPro,Allerta,Amaranth,Anton,Architects%2BDaughter,Artifika,Asset,Astloch,Bangers,Bentham,Bevan,Bigshot%2BOne,Bowlby%2BOne,Bowlby%2BOne%2BSC,Brawler,Cabin,Calligraffitti,Candal,Cantarell,Cardo,Carter+One,Caudex,Cedarville%2BCursive,Cherry%2BCream%2BSoda,Chewy,Coda,Coming%2BSoon,Copse,Corben%3A700,Cousine,Covered%2BBy%2BYour%2BGrace,Crafty%2BGirls,Crimson%2BText,Crushed,Cuprum,Damion,Dancing%2BScript,Dawning%2Bof%2Ba%2BNew%2BDay,Didact%2BGothic,EB%2BGaramond,Expletus%2BSans,Fontdiner%2BSwanky,Forum,Francois%2BOne,Geo,Give%2BYou%2BGlory,Goblin%2BOne,Goudy%2BBookletter%2B1911,Gravitas%2BOne,Gruppo,Hammersmith%2BOne,Holtwood%2BOne%2BSC,Homemade%2BApple,Inconsolata,Indie%2BFlower,Irish%2BGrover,Judson,Jura,Just%2BAnother%2BHand,Just%2BMe%2BAgain%2BDown%2BHere,Kameron,Kenia,Kranky,Kreon,Kristi,La%2BBelle%2BAurore,League%2BScript,Lekton,Limelight,Lobster,Lobster+Two,Lora,Love%2BYa%2BLike%2BA%2BSister,Loved%2Bby%2Bthe%2BKing,Luckiest%2BGuy,Maiden%2BOrange,Mako,Maven%2BPro,Meddon,MedievalSharp,Megrim,Merriweather,Metrophobic,Michroma,Miltonian+Tattoo,Miltonian,Modern+Antiqua,Monofett,Mountains+of+Christmas,Neucha,Neuton,Nixie%2BOne,Nobile,Nova%2BSquare,Nunito,Open%2BSans,Orbitron,Oswald,Over%2Bthe%2BRainbow,Reenie%2BBeanie,Pacifico,Patrick%2BHand,Paytone%2BOne,Permanent%2BMarker,Philosopher,Playfair%2BDisplay,Puritan,Quattrocento,Radley,Raleway%3A100,Redressed,Rock%2BSalt,Rokkitt,Ruslan%2BDisplay,Schoolbell,Shadows%2BInto%2BLight,Shanti,Sigmar%2BOne,Six%2BCaps,Slackey,Smythe,Sniglet%3A800,Special%2BElite,Stardos%2BStencil,Sue%2BEllen%2BFrancisco,Sunshiney,Swanky%2Band%2BMoo%2BMoo,Syncopate,Tangerine,Tenor%2BSans,Terminal%2BDosis%2BLight,The%2BGirl%2BNext%2BDoor,Tinos,Ultra,Unkempt,UnifrakturCook%3Abold,UnifrakturMaguntia,Varela,Varela+Round,Vibur,Waiting%2Bfor%2Bthe%2BSunrise,Wallpoet,Walter%2BTurncoat,Wire%2BOne,Yanone%2BKaffeesatz,Yeseva%2BOne,Zeyada');
}	



}
