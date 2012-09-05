$(document).ready(function() {
	// the dimensions of the full-size image
	var native_width = 3954;
	var native_height = 2470;

	$(".magnify").mousemove(function(e){
		//x/y coordinates of the mouse
		//This is the position of .magnify with respect to the document.
		var magnify_offset = $(this).offset();
		//We will deduct the positions of .magnify from the mouse positions with
		//respect to the document to get the mouse positions with respect to the 
		//container(.magnify)
		var mx = e.pageX - magnify_offset.left;
		var my = e.pageY - magnify_offset.top;
	
		//Finally the code to fade out the glass if the mouse is outside the container
		if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0)
		{
			$("div.large").fadeIn(100);
		}
		else
		{
			$("div.large").fadeOut(100);
		}
		if($("div.large").is(":visible"))
		{
			//The background position of .large will be changed according to the position
			//of the mouse over the .small image. So we will get the ratio of the pixel
			//under the mouse pointer with respect to the image and use that to position the 
			//large image inside the magnifying glass

			var rx = Math.round(mx/$(".small").width()*native_width - $("div.large").width()/2)*-1;
			var ry = Math.round(my/$(".small").height()*native_height - $("div.large").height()/2)*-1;
			var bgp = rx + "px " + ry + "px";
			
			//Time to move the magnifying glass with the mouse
			var px = mx - $("div.large").width()/2;
			var py = my - $("div.large").height()/2;
			//Now the glass moves with the mouse
			//The logic is to deduct half of the glass's width and height from the 
			//mouse coordinates to place it with its center at the mouse coordinates
			
			//If you hover on the image now, you should see the magnifying glass in action
			$("div.large").css({left: px, top: py, backgroundPosition: bgp});
      
      // Draw the GPX track 
      
			var track_x = 500;
			var track_y = 800;
  
      var scale_x = 1.5; 
      var scale_y = 0.75;
		
			$('#routeCanvas').clearCanvas({
				x: 0, y: 0,
				width: native_width, height: native_height
			});

			var tx1 = scale_x * (track_x + rx);
			var ty1 = scale_y * (track_y + ry);
			var tx2 = scale_x * (track_x+20 + rx);
			var ty2 = scale_y * (track_y+50 + ry);

			$("#routeCanvas").drawLine({
				strokeStyle: "#F00",
				strokeWidth: 20,
				rounded: false,
				x1: tx1, y1: ty1,
				x2: tx2, y2: ty2
			});	 
		}
	});

});

$('body').waitForImages(function() {
  $('.loader').hide();
	$('.fade').fadeIn(2000, function() {});  
});


