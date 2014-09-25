$(document).ready(function(){


/** INITIAL SETUP **/
var ninjaScroll = {

	// Modify these parameters
	minWidth	: 1000, // Change to minimum window width that this plugin will apply to.
	speed		: 900, // Change to desired scroll speed
	easing		: 'easeInOutCubic', // Change to desired easing type ( visit http://easings.net/ )
	// End: Modify these parameters
	
	winH 		: $(window).height(),
	winW		: $(window).width(),
	winRatio	: this.winW / this.winH,
	sectionQty	: $('.ss-window').length,
	linkQty		: $('.ss-link').length,
	hasNav		: false,
	done		: true,
	next		: 0,
	offTop		: 0,
	linkIndex	: 0,
	scrollCheck	: 0,
	landscape	: '',
	portrait	: '',
	href		: ''
	
};

if (ninjaScroll.winRatio > 1) {
	ninjaScroll.landscape = true;
	ninjaScroll.portrait = false;
}	
else {
	ninjaScroll.landscape = false;
	ninjaScroll.portrait = true;
}

$('html,body').animate({

	scrollTop: 0

},100);


if ( ninjaScroll.sectionQty == ninjaScroll.linkQty ) {

	ninjaScroll.hasNav = true;
	
}



/** WINDOW SIZING FUNCTIONS **/
if (!(Modernizr.touch) && (ninjaScroll.winW > ninjaScroll.minWidth)) { // If device is not a touch-device, and if the width of the window is big enough
	
	// FUNCTION: Make each SS-Window the height of the browser window
	ninjaScroll.fullPage = function() {
		
		ninjaScroll.winH = $(window).height();
		ninjaScroll.winW = $(window).width();
		ninjaScroll.winRatio = ninjaScroll.winW / ninjaScroll.winH;
		
		if (ninjaScroll.winRatio > 1) {
			ninjaScroll.landscape = true;
			ninjaScroll.portrait = false;
		}	
		else {
			ninjaScroll.landscape = false;
			ninjaScroll.portrait = true;
		}
		
		$('.ss-window').each(function(){
		
			$(this).height(ninjaScroll.winH);
			$(this).children(ninjaScroll.winH);
		
		});
		
		// Adding these classes to the body may assist you with various styling changes you want to make via CSS.
		if (ninjaScroll.portrait) {
			$('body').addClass('portrait').removeClass('landscape');
		}
		else {
			$('body').addClass('landscape').removeClass('portrait');
		}
		
	}
	
	// Run Function on document ready.
	ninjaScroll.fullPage();

	// Run Function on window resize.
	$(window).resize(function(){

		ninjaScroll.fullPage();

	});

}



/** SNAP SCROLLING **/
if (!(Modernizr.touch) && (ninjaScroll.winW > ninjaScroll.minWidth)) { // If device is not a touch-device, and if the width of the window is big enough
	
	console.log('fine');
	
	$('body').mousewheel(function(event,delta){
		
		if(ninjaScroll.done) {
			
			ninjaScroll.done = false;
		
			if (delta < 0) {
			
				ninjaScroll.next = ninjaScroll.next + 1;
				if (ninjaScroll.next == ninjaScroll.sectionQty) {
					ninjaScroll.next = ninjaScroll.sectionQty - 1;
				}
			
			}
			else {
				
				ninjaScroll.next = ninjaScroll.next - 1;
				if (ninjaScroll.next < 0) {
					ninjaScroll.next = 0;
				}				
				
			}
			
			ninjaScroll.offTop = $('.ss-window').eq(ninjaScroll.next).offset().top;
			
			$('body,html').animate({
			
				scrollTop: ninjaScroll.offTop
				
				}, ninjaScroll.speed, ninjaScroll.easing, function(){
					ninjaScroll.done = true;
					
					if (ninjaScroll.hasNav) {
					
						$('.ss-link').removeClass('current');
						$('.ss-link').eq(ninjaScroll.next).addClass('current');
						
					}
					
			});
			
		}
		
		event.preventDefault();

	});


	// NAV CLICKS
	var i = 0;
	$('.ss-window').each(function(){
	
		$(this).attr('data-index', i);
		i += 1;
	
	});
	
	$('a.ss-link').click(function(event){

		event.preventDefault();

		if (ninjaScroll.done) {
		
			ninjaScroll.done = false;
			ninjaScroll.href = $(this).attr('href');
			ninjaScroll.next = parseFloat( $(ninjaScroll.href).attr('data-index') );
			
			
			
			$('html, body').animate({

				scrollTop: $(ninjaScroll.href).offset().top

			}, ninjaScroll.speed, ninjaScroll.easing, function(){
				ninjaScroll.done = true;
				
				if (ninjaScroll.hasNav) {
				
					$('.ss-link').removeClass('current');
					$('.ss-link').eq(ninjaScroll.next).addClass('current');
					
				}
					
			});
		
		}

	});
	
}
else {

	// NAV CLICKS
	$('a.ss-link').click(function(event){

		event.preventDefault();

		ninjaScroll.href = $(this).attr('href');
		
		$('html, body').animate({

			scrollTop: $(ninjaScroll.href).offset().top

		}, ninjaScroll.speed, ninjaScroll.easing);

	});

}



});
