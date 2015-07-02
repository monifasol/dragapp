// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


$(function() {
  initialize_drag_drop();

  //loading image (onclick for intall_all and remove_all)
  var loadingImg = '<img src="/assets/loading.gif" />';
  $("#install_all").click(function() {
  	$('#div_my_apps').html(loadingImg);
  	$('#div_market_apps').html(loadingImg);
  });  
  $("#remove_all").click(function() {
  	$('#div_my_apps').html(loadingImg);
  	$('#div_market_apps').html(loadingImg);
  });  
});

function initialize_drag_drop() {
  // there's my chest and the market
  var $chest = $( ".chest" );
  var $market = $( ".market" );

  // let market items be draggable
  $( "li", $market ).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    helper: "clone",
    cursor: "move"
  });

  //specify the items not droppable and droppable
  $(".nodrop").draggable({ revert: "valid" }); // not droppable
  $(".drop").draggable({ revert: "invalid" }); // when not dropped, the item will revert back to its initial position
 
  // let the chest be droppable as well, accepting items from the market
  $chest.droppable({
    accept: ".market > li.drop",
    activeClass: "ui-state-highlight",
    drop: function(event, ui) {
      deleteImage(ui.draggable);
    }
  });

  // let the market be droppable, accepting my chest items (only the droppable ones)
  $market.droppable({
    accept: ".chest li",
    activeClass: "custom-state-active",
    drop: function(event, ui) {
      recycleImage(ui.draggable);
    }
  });

  function deleteImage( $item ) {    
    $item.fadeOut(function() {
      var recycle_icon = "<a href='' title='Uninstall this app' class='ui-icon ui-icon-refresh'>Uninstall app</a>";
      var $list = $("ul", $chest).length ?
                          $("ul", $chest) : $("<ul/>").appendTo($chest);
      $item.append( recycle_icon ).appendTo($list).fadeIn(function() {
        $item.animate({ width: "100px" })
      });

      //call function to save relation applic_user (add) 
      var app_id = $("li", $chest).last().attr('id');
      url = '/mychest/install_app/' + app_id;
      var result = $.get(url); 
      result.success(function(a,b,c) {
        $("<p class='dropped'>Installed!</p>").appendTo($chest).fadeOut(2000);
        $("#current_number_apps").html($("li", $chest).length + " apps in my chest.");
      });

      result.error(function(a,b,c) {
        alert("Error installing the app.")
      });    
    });
  }

  // image recycle function
  function recycleImage( $item ) {
    $item.fadeOut(function() {
      //call function to save relation applic_user (remove) 
      var app_id = $item.attr('id');
      var my_app_in_market = $($market).find("li#"+app_id).first();

      url = '/mychest/remove_app/' + app_id;
      var result = $.get(url); 
      result.success(function(a,b,c) {
  
        if ($(my_app_in_market).length == 0) {
          $item.find( "a.ui-icon-refresh" ).remove().end()
            .css("width", "173px")
            .css("height", "195px")
            .appendTo( $market ).fadeIn();      
        } else {
          $(my_app_in_market).css({'opacity': '1'});
          $(my_app_in_market).removeClass('nodrop'); 
          $(my_app_in_market).addClass('drop'); 
        }
        $("<p class='dropped'>Removed!</p>" ).appendTo($chest).fadeOut(1000);
        $("#current_number_apps").html($("li", $chest).length + " apps in my chest.");
      });
      result.error(function(a,b,c) {
        alert("Error removing the app.")
      });
    });
  }

  // resolve the icons behavior with event delegation
  $("ul.market > li").click(function(event) {
    var $item = $(this),
    $target = $( event.target );
    if ($target.is( "a.ui-icon-refresh")) {
      recycleImage( $item );
    }
  });
}
