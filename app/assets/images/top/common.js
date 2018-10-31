$(function () {

	var devicePc;
	var winW = $(window).width();
	if(winW > 750){
		devicePc = true;
	}else{
		devicePc = false;
	}

	//hover関連の擬似実装
	$(document).on('vmousedown','a, .block-hover',function(){
		$(this).addClass('active');
	});
	$(document).on('vmouseup',function(){
		$('a:not(".bx-pager-link"), .block-hover').removeClass('active');
	});

	$('.block-hover').on('tap',function(e){
		e.preventDefault();
		var href = $(this).data('url');
		location.href = href;
	});

	$('.select select').on('change',function(){
		var value = $(this).val();
		var text = $(this).find('option:selected').text();
		$(this).prev('.display').text(text);
		if(value != ""){
			$(this).prev('.display').removeClass('empty');
		}else{
			$(this).prev('.display').addClass('empty');
		}
	});

	$('.pagetop a').on('tap',function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop: 0},400);
	});

	$('.gnav-switch').on('tap',function(e){
		e.preventDefault();
		if(!devicePc){
			$(this).toggleClass('active');
			$('.gnav-bg').toggleClass('active');
			$(this).next('.gnav').slideToggle(200,'easeInOutQuad');
		}
	});

	$('.gnav-close').on('tap',function(e){
		e.preventDefault();
		if(!devicePc){
			$('header nav').slideUp(200,'easeInOutQuad');
		}
	});

	$(window).on('resize',function(){
		var winW = $(window).width();
		if(winW > 750){
			devicePc = true;
			$('header .gnav').attr('style','');
		}else{
			devicePc = false;
		}
	});


});
