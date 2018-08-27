if (typeof jQuery !== "undefined") {

				jQuery(".show-back").on("click",function(e){
					e.preventDefault();
					e.stopPropagation();
					

					if(jQuery(this).hasClass("checked")){
						jQuery(this).removeClass("checked");
					jQuery(this).prev().hide();
					jQuery(this).prev().prev().show();
						
					}else{
						jQuery(this).addClass("checked");
						jQuery(this).prev().show();
						jQuery(this).prev().prev().hide();
						
					}
				});
				
}else{
	
	    			var showback = document.getElementsByClassName("show-back");
					
					for(var i=0;i<showback.length;i++){
						showback[i].addEventListener("click", function(e) {
							e.preventDefault();	
							e.stopPropagation();
							var next=this.nextElementSibling;
							var next_next=next.nextElementSibling;
					  	 	if(this.className=="show-back"){
								this.setAttribute("class", "checked show-back");
								next_next.setAttribute("class","front-flipper hidden");
								next.setAttribute("class","back-flipper showed");
						
							}else{
								this.setAttribute("class", "show-back");
								next.setAttribute("class","back-flipper hidden");
								next_next.setAttribute("class","front-flipper showed"); 
							
							}
						}, false);
					}
}

