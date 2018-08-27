<div class="panel" id="factory">

<form id="fa-settings-form" method="post" action="options.php">
    <?php settings_fields('pf-settings-group'); ?>

	<ul id="factory-tabs" class="nav-tab-wrapper woo-nav-tab-wrapper">
	  <li class="nav-tab nav-tab-active"><a href="#Gerenal" data-id="Gerenal"><?php _e('General', 'factory'); ?></a></li>
	  <li class="nav-tab"><a href="#editor" data-id="Editor"><?php _e('Designer Tools', 'factory'); ?></a></li>
	  <li class="nav-tab"><a href="#fonts" data-id="Fonts"><?php _e('Designer Fonts', 'factory'); ?></a></li>
	  <li class="nav-tab"><a href="#colors" data-id="Colors"><?php _e('Theming', 'factory'); ?></a></li>
	</ul>
	<div class="tab-content">
		
	<div class="tab-pane active" id="Gerenal">
		<div class="row">
			<div class="container">
			<div class="more">
				<div class="slideThree"><input name="FA_RegisterUser" <?php	if (get_option('FA_RegisterUser') == 'on') {echo 'checked';	} ?>  type="checkbox"><label></label></div><strong><?php _e('Allow only registered users to add Custom products', 'factory'); ?></strong><br>
				<div class="slideThree"><input name="FA_DraftSave" <?php if (get_option('FA_DraftSave') == 'on') {echo 'checked';} ?> type="checkbox"><label></label></div><strong><?php _e('Save as Draft', 'factory'); ?></strong>* <?php _e('Saving as a draft, only logged in users will see the product',''); ?><br>
				<div class="slideThree"><input name="FA_AllowEdit" <?php if (get_option('FA_AllowEdit') == 'on') {echo 'checked'; } ?>  type="checkbox"><label></label></div><strong><?php _e('Allow Edit', 'factory'); ?></strong> <?php _e('You must create an Edit Page','factory');?><br>
				<?php _e('Create and empty page with this shortcode <strong>[designer]</strong> and with permalink editor','factory');?>
			</div>
		</div>
	</div>
</div>
  <div class="tab-pane editor-options" id="Editor">
	<div class="row grid">	
		<div class="container">
			<div class="more">
				<h1>Style and guides</h1>
				<div class="inputTool"><strong><?php _e('Guide Corner Color', 'factory'); ?></strong>	<input type="text" data-control="saturation" class="minicolors-input" size="7" name="FA_CornerColor" value="<?php if (get_option('FA_CornerColor')) { echo get_option('FA_CornerColor');} ?>" type="input"><label></label></div><br>
				<div class="inputTool"><strong><?php _e('Guide Border Color', 'factory'); ?></strong><input type="text" data-control="saturation" class="minicolors-input" size="7"  name="FA_BorderColor" value="<?php	if (get_option('FA_BorderColor')) {echo get_option('FA_BorderColor');} ?>" type="input"><label></label></div><br>
				<div class="inputTool"><strong><?php _e('Selection Border Width', 'factory'); ?></strong><input name="FA_BorderWidth" value="<?php if (get_option('FA_BorderWidth')) {echo get_option('FA_BorderWidth'); } ?>" type="number"></div><label></label><br>
			</div>
			<div class="more">
				<h1>Tools</h1>
				<div class="slideThree"><input name="FA_LibraryTool" <?php	if (get_option('FA_LibraryTool') == 'on') {echo 'checked';	} ?> type="checkbox"><label></label></div><strong><?php _e('Allow User Library', 'factory'); ?></strong><br>
				<div class="slideThree"><input name="FA_FreedrawTool" <?php	if (get_option('FA_FreedrawTool') == 'on') {echo 'checked'; } ?> type="checkbox"><label></label></div><strong><?php _e('Free Draw Tool', 'factory'); ?></strong><br>
				<div class="slideThree"><input name="FA_ShapeTool" <?php if (get_option('FA_ShapeTool') == 'on') {echo 'checked'; } ?> type="checkbox"><label></label></div><strong><?php _e('Shape Tool', 'factory'); ?></strong><br>
				<div class="slideThree"><input name="FA_TextTool" <?php if (get_option('FA_TextTool') == 'on') {echo 'checked';	} ?> type="checkbox"><label></label></div><strong><?php _e('Text Tool', 'factory'); ?></strong><br>
				<div class="slideThree"><input name="FA_GalleryTool" <?php if (get_option('FA_GalleryTool') == 'on') {echo 'checked';} ?> type="checkbox"><label></label></div><strong><?php _e('Gallery', 'factory'); ?></strong><em> <?php _e('Create custom media categories and bind them with parent products', 'factory'); ?></em><br>
				<div class="slideThree"><input name="FA_BorderTool" <?php if (get_option('FA_BorderTool') == 'on') {echo 'checked';	} ?> type="checkbox"><label></label></div><strong><?php _e('Allow Borders', 'factory'); ?></strong><br>
		

				</div>
			</div>
		</div>
	</div>
 <div class="tab-pane" id="Fonts">
	<div class="row"><div class="container">
	 <div class="btn all-fonts right">
	 	<input type="hidden" name="FA_FontList" id="fontlist-input" value="<?php echo get_option('FA_FontList'); ?>">
		<input type="checkbox" id="checkAll" name="all"> <?php _e('Use all google fonts', 'factory'); ?>
	</div>
			<div class="font-list well">
				<div id="fontlist" class="more">
				<?php
				$fonts = array("Arial", "Tahoma", "Verdana", "Times+New+Roman", "Georgia", "Impact", "Comic+Sans", "Aclonica", "Allan", "Annie+Use+Your+Telescope", "Anonymous+Pro", "Allerta", "Amaranth", "Anton", "Architects+Daughter", "Artifika", "Asset", "Astloch", "Bangers", "Bentham", "Bevan", "Bigshot+One", "Bowlby+One", "Bowlby+One+SC", "Brawler", "Cabin", "Calligraffitti", "Candal", "Cantarell", "Cardo", "Carter One", "Caudex", "Cedarville+Cursive", "Cherry+Cream+Soda", "Chewy", "Coda", "Coming+Soon", "Copse", "Corben", "Cousine", "Covered+By+Your+Grace", "Crafty+Girls", "Crimson+Text", "Crushed", "Cuprum", "Damion", "Dancing+Script", "Dawning+of+a+New+Day", "Didact+Gothic", "EB+Garamond", "Expletus+Sans", "Fontdiner+Swanky", "Forum", "Francois+One", "Geo", "Give+You+Glory", "Goblin+One", "Goudy+Bookletter+1911", "Gravitas+One", "Gruppo", "Hammersmith+One", "Holtwood+One+SC", "Homemade+Apple", "Inconsolata", "Indie+Flower", "Irish+Grover", "Judson", "Jura", "Just+Another+Hand", "Just+Me+Again+Down+Here", "Kameron", "Kenia", "Kranky", "Kreon", "Kristi", "La+Belle+Aurore", "League+Script", "Lekton", "Limelight", "Lobster", "Lobster Two", "Lora", "Love+Ya+Like+A+Sister", "Loved+by+the+King", "Luckiest+Guy", "Maiden+Orange", "Mako", "Maven+Pro", "Meddon", "MedievalSharp", "Megrim", "Merriweather", "Metrophobic", "Michroma", "Miltonian Tattoo", "Miltonian", "Modern Antiqua", "Monofett", "Mountains of Christmas", "Neucha", "Neuton", "Nixie+One", "Nobile", "Nova+Square", "Nunito", "Open+Sans", "Orbitron", "Oswald", "Over+the+Rainbow", "Reenie+Beanie", "Pacifico", "Patrick+Hand", "Paytone+One", "Permanent+Marker", "Philosopher", "Playfair+Display", "Puritan", "Quattrocento", "Radley", "Raleway:100", "Redressed", "Rock+Salt", "Rokkitt", "Ruslan+Display", "Schoolbell", "Shadows+Into+Light", "Shanti", "Sigmar+One", "Six+Caps", "Slackey", "Smythe", "Sniglet", "Special+Elite", "Stardos+Stencil", "Sue+Ellen+Francisco", "Sunshiney", "Swanky+and+Moo+Moo", "Syncopate", "Tangerine", "Tenor+Sans", "Terminal+Dosis+Light", "The+Girl+Next+Door", "Tinos", "Ultra", "Unkempt", "UnifrakturCook:bold", "UnifrakturMaguntia", "Varela", "Varela Round", "Vibur", "Waiting+for+the+Sunrise", "Wallpoet", "Walter+Turncoat", "Wire+One", "Yanone+Kaffeesatz", "Yeseva+One", "Zeyada");
				foreach ($fonts as $font) {
					echo "<div class='slideThree'><input name='" . $font . "' checked type='checkbox'><label></label></div><strong style='font-family:" . preg_replace('/[+]/', ' ', $font) . "'>" . preg_replace('/[+]/', ' ', $font) . "</strong><div class='clear'></div>";
				}
				?>
				
				</div>
			</div>

		</div>
		 

	</div>
	</div>
	
	<div class="tab-pane" id="Colors">
			<div class="row"><div class="more">
		
				<div class="container">		
					<h2><?php _e('Primal Colors', 'factory'); ?></h2>
					<div class="more colors">
						<label><?php _e('Primary Color', 'factory'); ?> </label>	<input type="text" name="primary-color" data-control="saturation" class="minicolors-input colors" />
						<label><?php _e('Secondary Color', 'factory'); ?> </label>	<input type="text" name="secondary-color" data-control="saturation" class="minicolors-input colors" />
						<label><?php _e('Toolbar Color', 'factory'); ?> </label>	<input type="text" name="toolbar-color" data-control="saturation" class="minicolors-input colors" />
						<label><?php _e('Widget Color', 'factory'); ?></label><input type="text" name="widget-color" data-control="saturation" class="minicolors-input colors" />
					</div>

				</div>
				<div class="container">
					<h2><?php _e('Help Colors', 'factory'); ?></h2>
					<div class="more colors">
						<label><?php _e('Panels', 'factory'); ?></label><input type="text" name="gray-panel" data-control="saturation" class="minicolors-input colors" /><br>
						<label><?php _e('Gradient', 'factory'); ?></label><input type="text" name="gradient" style="width:100%" class="colors" value="" />
					</div>				
				</div>		
		
				
				<div class="container">	
					<h2><?php _e('Borders', 'factory'); ?></h2>
					<div class="more colors">					
						<label><?php _e('Border Size', 'factory'); ?></label><input type="text" name="border-radius" class="colors" />

					
					
					</div>
			</div>
		<div class="container">	
					<h2><?php _e('CSS', 'factory'); ?></h2>
					<div class="more colors">					
						<label><?php _e('Add Custom Code', 'factory'); ?></label><textarea id="code" class="colors" name='FA_LESS'><?php if (get_option('FA_LESS')) {echo get_option('FA_LESS');	}else{echo get_option('FA_LESS'); } ?></textarea>
					</div>
			</div>
			
	<div class="container">		
		<div class="more">
		<input style="display:none"  type="text" name="FA_Colors" id="hidden-colors" value="<?php echo get_option('FA_Colors'); ?>"/>
		<textarea style="display:none"  class="textarea_colors"></textarea>
		<a id="compile" class="button green"><?php _e('Create Theme and Save', 'factory'); ?></a> 
	</div>
</div>
</div>
	

	
	</div>
</div>
</div>

<?php submit_button(); ?>
</form>

<div class="clear"></div>

