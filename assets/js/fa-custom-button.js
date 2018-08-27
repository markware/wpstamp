(function() {
    tinymce.create('tinymce.plugins.fa', {
        init : function(ed, url) {
            ed.addButton('fa_editor', {
                title : 'Add Editor',
                cmd : 'fa_editor',
                image : url + '/pencil.png'
            });
 
            ed.addButton('fa_designer', {
                title : 'Add designer shortcode',
                cmd : 'fa_designer',
                image : url + '/tools.png'
            });
 
            ed.addCommand('fa_editor', function() {
              
                return_text = '[creator edit="1"]';
                ed.execCommand('mceInsertContent', 0, return_text);
            });
 
            ed.addCommand('fa_designer', function() {
                var number = prompt("The Parent Product Id"),
                    shortcode;
                if (number !== null) {
                    number = parseInt(number);
                  
                        shortcode = '[creator id="' + number + '"]';
                        ed.execCommand('mceInsertContent', 0, shortcode);
                   
                }
            });
        },
    });
  
    tinymce.PluginManager.add( 'fa', tinymce.plugins.fa );
})();