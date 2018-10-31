$(function () {

	var linkSlider;

	$(document).ready(function(){
	    $('html,body').animate({ scrollTop: 0 }, '1');
	});
	$('html,body').animate({ scrollTop: 0 }, '1');

	var $w = $(window),
		$kv = $(".kv"),
		w = $w.width(),
		h = $w.height();

	$('body').css({"width":w,"height":h});

	/*======================================================
	[ Resize ]
	======================================================*/

	Resize();
		$("main").css({"overflow":"hidden"});
	function Resize(){
		w = $w.width(),
		h = $w.height();
		if(w > 750){
			h = Math.max(h, 568);
		}
		$kv.css({"width":w,"height":h});
		$kv.children('.inner').css({"width":w,"height":h});
		$("#footer").css({"width":w,"overflow":"hidden"});
	}

	/*======================================================
	[ contents motion ]
	======================================================*/

	/* [ kv Action ]
	-----------------------------------------------------*/

	if(location.hash!=""){
		timeMin = .00001;
		timeLong = .1;
	}else{
		timeMin = .58;
		timeLong = .98;
	}

	kvAnimation();
	function kvAnimation(){

		TweenMax.set($("#kv-title-logo"),{y: 50,scale:0.5});

		setTimeout(function(){
			$("#kv-title-logo").css({"opacity":1});

			var titleTween = new TweenMax.to($("#kv-title-logo"),timeMin,
				{
					y: 0,
					scale:1,
					ease: Elastic.easeOut.config(1.5, 1),
					onUpdate : function(){
				        var progress = this.progress();
				        progress = Math.ceil(progress * 100);
				        if(progress > 0){
							var leftTween = new TweenMax.to($("#kv-logo-svg .left"),timeLong,
								{
									y:-3,
									x:-39,
									rotation: 27,
									ease: Bounce.easeOut,
								}
							);
							var rightTween = new TweenMax.to($("#kv-logo-svg .right"),timeLong,
								{
									y:15,
									x:46,
									rotation: -25,
									ease: Bounce.easeOut,
								}
							);
							var centerTween = new TweenMax.to($("#kv-logo-svg-center"),timeLong,
								{
									x:2,
									y:5,
									scale: 1,
									ease: Bounce.easeOut,
									onComplete:function(){
										var centerTween = new TweenMax.to($("#bg-cover"),timeMin,
											{
												autoAlpha: 0,
												display:'none',
												ease: Power0.easeNone,
											}
										);
										TweenMax.set($('.kv .kv-vertical-motion'), {y: 100});
										var tween = new TweenMax.staggerTo($('.kv .kv-vertical-motion'), timeMin,{
											y: 0,
											opacity:1,
											ease: Back.easeOut.config(1.4),
											onComplete:function(){
												kvFlg = true;
											}
										}, .12);
										$('body').removeAttr("style").css({"overflow":"inherit"});
										$('.header').css({"z-index":"100"});
										if(location.hash!=""){
											$(".wrapper").css({"overflow":"inherit"});
											var target = location.hash;
											setTimeout(function(){
											var amount = $(target).offset().top;
											$('html,body').animate({scrollTop: amount},200,
												function(){
													$(".wrapper").css({"overflow-x":"hidden"});
												});
											},1e3);
										}
									}
								}
							);
						}
					}//onUpdate
				}
			);

			var $svg = Snap('#kv-logo-svg-center path');
			var path = 'M681.651,432.836l-17.328-36.289c0.981,2.289,0,4.904-1.961,5.885\
		c-71.925,38.904-165.101,60.482-263.18,60.482s-190.601-21.578-262.199-60.482c-1.961-0.981-2.942-3.596-1.961-5.885l-17.327,37.271\
		c0.654-1.309,1.634-1.962,2.615-2.289c1.308-0.327,2.615-0.327,3.596,0.327c68.656,40.539,171.639,94.482,275.93,94.482\
		c103.964,0,207.273-53.943,275.93-94.482c0.98-0.654,2.615-0.654,3.596-0.327c1.308,0.327,2.289,1.308,2.615,2.289';
			$svg.animate({ d: path }, 800);
		},1e3);

	}

	/*======================================================
	[ Scroll ]
	======================================================*/

	var controller = new ScrollMagic.Controller();  //複数のアニメーションがあっても一つどこかに書いてあればOK

	scrollMotion();
	function scrollMotion(){

		var halfH = $w.height()/2 - 100;

		//サービスタイトル
        var servicetitleTween = TweenMax.staggerFrom($("#service .vertical-title-motion"), .78, {
        	y:50,
            //rotationY:'45deg',
            //rotationX:'45deg',
            //transformOrigin:'50% 50%',
            opacity:0,
            scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
            /*bezier:{
	            values: 1
            }*/
        },0.05);

		new ScrollMagic.Scene({
			triggerElement: "#service",
			//duration: organicH, //
			//offset :-200 //スタート位置を変更
			//reverse:false //逆戻りの時の効果なし
			//triggerHook : "onLeave" //発火位置を上部へ変更　onEnter は設定すると画面内に入った時
		})
		.setTween(servicetitleTween)
        .addTo(controller);

        //サービスコンテンツ1
        var servicecnt1Tween = TweenMax.from($("#service .feature-list .feature01.vertical-motion"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.05);

		new ScrollMagic.Scene({
			triggerElement: "#service .feature-list .feature01",
			offset :-halfH
		})
		.setTween(servicecnt1Tween).addTo(controller);

		//サービスコンテンツ2
        var servicecnt2Tween = TweenMax.from($("#service .feature-list .feature02.vertical-motion"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.05);

		new ScrollMagic.Scene({
			triggerElement: "#service .feature-list .feature02",
			offset :-halfH
		})
		.setTween(servicecnt2Tween).addTo(controller);

		//サービスコンテンツ3
        var servicecnt3Tween = TweenMax.from($("#service .feature-list .feature03.vertical-motion"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.05);

		new ScrollMagic.Scene({
			triggerElement: "#service .feature-list .feature03",
			offset :-halfH
		})
		.setTween(servicecnt3Tween).addTo(controller);

		//HOW TO USEタイトル
        var howtousetitleTween = TweenMax.staggerFrom($("#howtouse .vertical-title-motion"), .78, {
        	y:50,
            //rotationY:'45deg',
            //rotationX:'45deg',
            //transformOrigin:'50% 50%',
            opacity:0,
            scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
            /*bezier:{
	            values: 1
            }*/
        },0.05);

		new ScrollMagic.Scene({
			triggerElement: "#howtouse",
			//duration: organicH, //
			//offset :-200 //スタート位置を変更
			//reverse:false //逆戻りの時の効果なし
			//triggerHook : "onLeave" //発火位置を上部へ変更　onEnter は設定すると画面内に入った時
		})
		.setTween(howtousetitleTween)
        .addTo(controller);

        //HOW TO USEコンテンツ
        var howtousecntTween = TweenMax.staggerFrom($("#howtouse .step-list .vertical-motion"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.1);

		new ScrollMagic.Scene({
			triggerElement: "#howtouse .step-list",
			offset :-halfH
		})
		.setTween(howtousecntTween).addTo(controller);


		//HOW TO USEコンテンツ
        var featurecntTween = TweenMax.staggerFrom($("#feature .step-list .vertical-motion"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.1);

		new ScrollMagic.Scene({
			triggerElement: "#feature .step-list",
			offset :-halfH
		})
		.setTween(featurecntTween).addTo(controller);


		//SEARCH コンテンツ
        var searchTween = TweenMax.from($("#search"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.1);

		new ScrollMagic.Scene({
			triggerElement: "#search",
			offset :-halfH
		})
		.setTween(searchTween).addTo(controller);

		//参加企業 コンテンツ
        var linksTween = TweenMax.from($("#links .inner"), .78, {
        	y:50, opacity:0, scale: 1,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.1);

		new ScrollMagic.Scene({
			triggerElement: "#links"
		})
		.setTween(linksTween).addTo(controller);

		//HOW IT WORKSタイトル
        var howitworkstitleTween = TweenMax.staggerFrom($("#howitworks .vertical-title-motion"), .78, {
        	y:50,
            //rotationY:'45deg',
            //rotationX:'45deg',
            //transformOrigin:'50% 50%',
            opacity:0,
            scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
            /*bezier:{
	            values: 1
            }*/
        },0.05);

		new ScrollMagic.Scene({
			triggerElement: "#howitworks",
			//duration: organicH, //
			//offset :-200 //スタート位置を変更
			//reverse:false //逆戻りの時の効果なし
			//triggerHook : "onLeave" //発火位置を上部へ変更　onEnter は設定すると画面内に入った時
		})
		.setTween(howitworkstitleTween)
        .addTo(controller);

        //HOW IT WORKSコンテンツ1
        var howitworkscnt1Tween = TweenMax.staggerFrom($("#howitworks .flow-list .flow01.vertical-motion>*"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.1);

		new ScrollMagic.Scene({
			triggerElement: "#howitworks .flow-list .flow01",
			offset :-halfH
		})
		.setTween(howitworkscnt1Tween).addTo(controller);

		//HOW IT WORKSコンテンツ2
        var howitworkscnt2Tween = TweenMax.staggerFrom($("#howitworks .flow-list .flow02.vertical-motion>*"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.1);

		new ScrollMagic.Scene({
			triggerElement: "#howitworks .flow-list .flow02",
			offset :-halfH
		})
		.setTween(howitworkscnt2Tween).addTo(controller);

		//HOW IT WORKSコンテンツ3
        var howitworkscnt3Tween = TweenMax.staggerFrom($("#howitworks .flow-list .flow03.vertical-motion>*"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.1);

		new ScrollMagic.Scene({
			triggerElement: "#howitworks .flow-list .flow03",
			offset :-halfH
		})
		.setTween(howitworkscnt3Tween).addTo(controller);

		//HOW IT WORKSコンテンツ4
        var howitworkscnt4Tween = TweenMax.staggerFrom($("#howitworks .flow-list .flow04.vertical-motion>*"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.1);

		new ScrollMagic.Scene({
			triggerElement: "#howitworks .flow-list .flow04",
			offset :-halfH
		})
		.setTween(howitworkscnt4Tween).addTo(controller);

		//CONTACTタイトル
        var contacttitleTween = TweenMax.from($("#contact .vertical-title-motion"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.05);

		new ScrollMagic.Scene({
			triggerElement: "#contact",
		})
		.setTween(contacttitleTween)
        .addTo(controller);

        //CONTACTコンテンツ
        var contactcntTween = TweenMax.from($("#contact .vertical-motion"), .78, {
        	y:50, opacity:0, scale: 0.8,
            ease:Elastic.easeOut.config(1.5, 1)
        },0.1);

		new ScrollMagic.Scene({
			triggerElement: "#contact .vertical-motion",
			offset :-halfH
		})
		.setTween(contactcntTween).addTo(controller);


	}

	$(window).on("resize orientationchange",function(){
		Resize();
	});


	/*======================================================
	[ Contact Form ]
	======================================================*/

	/* [ Form Action ]
	-----------------------------------------------------*/

	var $formWrap = $("#form_content_wrap"),
		$progressBar = $(".form_state"),
		$formStep1 = $formWrap.find(".form_step1"),
		$formStep2 = $formWrap.find(".form_step2"),
		$formStep3 = $formWrap.find(".form_step3");

	/* motion setting */
	$formWrap.css({"height":$(".form_step1").outerHeight()});

	/* step update */
	function stepUpdate(stepNumber){
		$progressBar.children("li").removeClass("on");
		$progressBar.children("li").eq(stepNumber-1).addClass("on");
		$('.form_step').removeClass('on');
		$('.form_step').eq(stepNumber-1).addClass("on");
		$formWrap.animate({'height':$('.form_step.on').outerHeight()},300);
	}


	/* save */
	var saveArray = new Array();
	function formSave(targetWrapID){
		var $targetText = $("#"+targetWrapID).find("input,textarea,select");
		saveArray['cstype'] = document.getElementById("cstype").value;
		//check
		for(var i=0; $targetText.length>i; i++){
			if($targetText.eq(i).attr("id")=="prefecture"){
				/* 選択系 */
				var name = "prefecture";
				saveArray[name] = document.getElementById("prefecture").value;
			}else if($targetText.eq(i).attr("name")=="q_text"){
				/* テキストエリア */
				var name = "q_text";
				saveArray[name] = $targetText.eq(i).val();
			}else{
				/* その他 */
				var name = $targetText.eq(i).attr("name");
				saveArray[name] = $targetText.eq(i).val();
			}
		}
	}

	/* confirm */
	function confirmWrite(saveArray){
		var $target = $("#confirm_wrap dd span");

		//reset
		$target.text("");

		//write
		for(var i=0; $target.length>i; i++){
			var thisClass = $target.eq(i).attr("class");
			$target.eq(i).text(saveArray[thisClass]);
		}

		$formStep1.fadeOut(200,function(){
			stepUpdate(2);
			$formStep2.fadeIn(200,function(){
				$('html, body').animate({scrollTop:$("#contact").offset().top}, 100);
			});
		});

		/* back */
		$("#back_btn").on("click",function(){
			$formStep2.fadeOut(200,function(){
				stepUpdate(1);
				$formStep1.fadeIn(200);
			});
		});
	}

	$(".btn-reset").on("click",function(){
		var text = $("#prefecture").find('option:selected').text();
		$("#prefecture").val('');
		$("#prefecture").prev('.display').text('選択してください');
	});

	$("#confirm_btn").on("click",function(){
		document.getElementById('cstype_error').style.display='none';
		if(document.getElementById("cstype").value == ''){
			document.getElementById('cstype_error').style.display='block';
		}
		requiredCheckAll($(this).parents(".form").attr("id"));

		if(!$formWrap.find(".err_state")[0]){
			//save
			formSave($(this).parents(".form").attr("id"));
			//write
			confirmWrite(saveArray);
			console.log(saveArray);
		}else{
			$('html, body').animate({scrollTop:$("#contact").offset().top}, 100);
			$(window).scroll(function() {
				var scInc = $(window).scrollTop();
				if(scInc>$("#contact").offset().top) $('html, body').stop();
			});
		}
	});

	/* send mail */
	var getURL = location.pathname;

	function sendMail(){
		//[ PHPへデータを渡す ]
		$.ajax({
			type: 'POST',
			url: getURL+'contact/send.php', // 実行するPHPの相対パス
			cache: false,
			data: {
				company:saveArray["company"],
				name:saveArray["name"],
				tel:saveArray["tel"],
				email:saveArray["email"],
				postal:saveArray["postal"],
				prefecture:saveArray["prefecture"],
				address:saveArray["address"],
				q_text:saveArray["q_text"],
				cstype:saveArray["cstype"],
			},
			success: function(result) {
				//送信後
				$formStep2.fadeOut(200,function(){
					stepUpdate(3);
					$formStep3.fadeIn(200,function(){
						$('html, body').animate({scrollTop:$("#contact").offset().top}, 100);
					});
				});
			},
			error: function() {
			// エラーが返ってきた場合の処理
			}
		});
	}

	$("#send_btn").on("click",function(){
		sendMail();
		 // $.post(getURL+'contact/send.php', saveArray, sendMail);
	});

	/* [ Validation ]
	-----------------------------------------------------*/
	var formCheck = false;


	//[ Error Show ]
	function errorShow(ID,type){
		var $target = $("#"+ID),
			getThisText = $target.parents("dl").children("dt").text();

		switch(type){
			case "text":
				var thisErrorText = getThisText + "を入力してください。";
			break;
			case "email":
				var thisErrorText = getThisText + "の形式が違います。";
			break;
			case "emailcheck":
				var thisErrorText = "メールアドレスが一致しません。";
			break;
			case "number":
			var thisErrorText = "半角数字を入力してください。";
			break;
			case "kana":
			var thisErrorText = "カタカナで入力してください。";
			break;
			case "tel":
			var thisErrorText = getThisText + "を正しく入力して下さい。";
			break;
			case "address":
			var thisErrorText = getThisText + "を正しく入力して下さい。";
			break;
		}

		if(!$target.parent("dd").find(".err_msg")[0]){
			$target.addClass("err_state");
			$target.parent("dd").append('<p class="err_msg">'+ thisErrorText +'</p>');
		}
	}

	//[ Error Hide ]
	function errorHide(ID){
		var $target = $("#"+ID);
		$target.removeClass("err_state");
		$target.parent("dd").find(".err_msg").remove();
	}

	//[ 入力内用を一括チェック ]
	//--------------------------------------------------
	function requiredCheckAll(targetWrapID){
		var $targetText = $("#"+targetWrapID).find(".required");

		//check
		for(var i=0; $targetText.length>i; i++){
			if(!$targetText.eq(i).val()){
				errorShow($targetText.eq(i).attr("id"),"text");
			}
		}
	}

	//[ 個別に入力内容をチェック ]
	//--------------------------------------------------

	$formWrap.find('.required').blur(function(){
		var thisID = $(this).attr("id");
		if(!$(this).val()){
			errorShow(thisID,"text");
		}else{
			if(!countErrFlag) errorHide(thisID);
		}
	});


	//[ フリガナ ]
	// $("#furigana").blur(function(){
	// 	var thisID = $(this).attr("id");
	// 	if($(this).val()){
	// 		if(!$(this).val().match(/^[ァ-ロワヲンー 　\r\n\t]*$/)){
	// 			katakanaCheckFlag = false;
	// 			errorShow(thisID,"kana");
	// 		}else{
	// 			katakanaCheckFlag = true;
	// 			errorHide(thisID);
	// 		}
	// 	}
	// });

	//[ email ]
	var emailCheckFlag = false;

	$formWrap.find('input[type="email"]').blur(function(){
		var thisID = $(this).attr("id");
		if($(this).val()){
			if(!$(this).val().match(/.+@.+\..+/g) || $(this).val().match(/.*@.*@.*/g)){
				emailCheckFlag = false;
				errorShow(thisID,"email");
			}else{
				setTimeout(function(){
					emailCheckFlag = true;
				},1000);
				errorHide(thisID);
			}
		}
		// if(emailCheckFlag){
		// 	var checkIDArray = ["email","email_confirm"];
		// 	for(var i=0; i<checkIDArray.length; i++){
		// 		if($("#email").val() != $("#email_confirm").val()){
		// 				errorShow(checkIDArray[i],"emailcheck");
		// 		}else{
		// 			errorHide(checkIDArray[i]);
		// 		}
		// 	}
		// }
	});



	//[ Tel ]
	$formWrap.find('input[type="tel"]').blur(function(){
	var thisID = $(this).attr("id");
		if($(this).val()){
			if(!$(this).val().match(/^[0-9\-]+$/)){
				errorShow(thisID,"number");
			}else{
				errorHide(thisID);
			}
		}
	});

	//[ 置換 ]
	//--------------------------------------------------
	//[ 半角へ変換 ]
	$('input').change(function(){
		if(!$(this).attr("id").match(/tel|email|email_confirm/g)) return;
		var txt  = $(this).val();
		var han = txt.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});
		$(this).val(han);
	});

	var countErrFlag = false;
	//
	// if($(".text_count")[0]){
	// 	var textCountNum = $(".text_count").parents("dd").find("textarea").val().length;
	// 	$('.text_count .num').text(textCountNum);
	// }
	// $("textarea.count_check").on("keyup",function(){
	// 	var thisValueLength = $(this).val().length;
	// 	$(this).parents("dd").find('.text_count .num').text(thisValueLength);
	// 	if(thisValueLength > 800){
	// 		if($(this).parents("dd").find(".err_msg").length==0) $(this).addClass("err_state").parents("dd").append('<p class="err_msg">800文字を超えています。</p>');
	// 		countErrFlag = true;
	// 	}else{
	// 		$(this).removeClass("err_state").parents("dd").find(".err_msg").remove();
	// 		countErrFlag = false;
	// 	}
	// });

	var devicePc;
	var winW = $(window).width();
	if(winW > 750){
		devicePc = true;
	}else{
		devicePc = false;
	}

	$('.gnav a:not(.exlink)').on('tap',function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		var amount = $(target).offset().top;
		if(!devicePc){
			$('header .gnav').slideUp(200,'easeInOutQuad',function(){
				$('html,body').animate({scrollTop: amount},400);
			});
		}else{
			$('html,body').animate({scrollTop: amount},400);
		}
	});

	/*$(window).on('load',function(){
		if(location.hash!=""){
			$(".wrapper").css({"overflow":"inherit"});
			var target = location.hash;
			var amount = $(target).offset().top;
			$('html,body').animate({scrollTop: amount},400);
		}else{
			$('html,body').animate({ scrollTop: 0 }, '1');
		}
	});*/

	function loadSlide(){
		var winW = $(window).width();
		if(winW > 750){
			devicePc = true;
			linkSlider = $('.link-list').bxSlider({
				slideWidth: 260,
				slideMargin: 20,
				minSlides: 3,
				maxSlides: 3
			});
		}else{
			devicePc = false;
			linkSlider = $('.link-list').bxSlider({
				slideWidth: winW - 125,
				slideMargin: 0,
				minSlides: 1,
				maxSlides: 1
			});
		}
	}

	function resizeSlide(){
		var winW = $(window).width();
		if(winW > 750){
			if(!devicePc){
				$formWrap.animate({'height':$('.form_step.on').outerHeight()},300);
				linkSlider.reloadSlider({
					slideWidth: 260,
					slideMargin: 20,
					minSlides: 3,
					maxSlides: 3
				});
			}
			devicePc = true;
		}else{
			if(devicePc){
				$formWrap.animate({'height':$('.form_step.on').outerHeight()},300);
				linkSlider.reloadSlider({
					slideWidth: winW - 125,
					slideMargin: 0,
					minSlides: 1,
					maxSlides: 1
				});
			}
			devicePc = false;
		}
	}
	$(window).on('load',function(){
		loadSlide();
	});
	$(window).on('resize',function(){
		resizeSlide();
	});




});
