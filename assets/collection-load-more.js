var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i);
if(isMobile){
	jQuery('.product-on-page').after('<div class="load_more"><div class="load_more_btn" onclick="loadmoreProducts()">Load More</div><div class="load_more_spinner"></div></div>');
	jQuery('.pagination-row').css('display','none');
}

let currentdata = jQuery('.product-on-page');
let next_url = jQuery(currentdata).data('next-url');

var load_more_btn = jQuery('.load_more_btn');
var load_more_spinner = jQuery('.load_more_spinner');

function loadmoreProducts(){
  if(next_url.indexOf("?page") >= 0){
  	jQuery.ajax(
    {
        url:next_url,
        type:"GET",
        dataType:"html",
        beforeSend:function(){
          load_more_btn.hide();
          load_more_spinner.show();
        }
    }
    ).done(function(data){
      load_more_spinner.hide();
      load_more_btn.show();
        let pro = jQuery(data).find('.product-on-page');
        var new_url = pro.data('next-url');
        next_url = new_url;
      	if(!next_url){
      		jQuery('.pagination-row').css('display','none');
          	jQuery('.load_more').css('display','none');
          	jQuery('.product-on-page').after('<div class="hl-no-product-message">No More Products Found !</div>')
        }
        currentdata.append(pro.html())
    })
  }
}