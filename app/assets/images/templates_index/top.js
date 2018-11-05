/* ===================================================================
JS information

file name : top.js
=================================================================== */

/* ===================================================================
slide ramdom
=================================================================== */
$(function() {
    var $slideBody = $("#slide ul");
    var shuffle = function(array){
      var n = array.length, t, i;

      while (n) {
        i = Math.floor(Math.random() * n--);
        t = array[n];
        array[n] = array[i];
        array[i] = t;
      }
      return array;
    };
    var arr = [1,7];
    shuffle(arr);

    for(var i = 0; i < arr.length; i++){
      $("#slide ul").append('<li><img src="/assets/templates_index/0' + arr[i] + '.jpg" alt="" /></li>');
    }
    
});


/* ===================================================================
slide
=================================================================== */
$(function(){
    var $setElm = $('#slide'),
    fadeSpeed = 3000,
    switchDelay = 5000;
    
    $setElm.find("li:eq(1) img").imagesLoaded(function(){
      var slideH = $(this).height();
      $setElm.css("height",slideH);
    //   $("#sec2,#sec3,#sec4,#sec5,.credits").show();
    });

    $setElm.each(function(){
       var targetObj = $(this);
       var findUl = targetObj.find('ul');
       var findLi = targetObj.find('li');
       var findLiFirst = targetObj.find('li:first');
       findLi.css({display:'block',opacity:'0',zIndex:'99'});
       findLiFirst.css({zIndex:'100'}).stop().animate({opacity:'1'},fadeSpeed);
       setInterval(function(){
       findUl.find('li:first-child').animate({opacity:'0'},fadeSpeed).next('li').css({zIndex:'100'}).animate({opacity:'1'},fadeSpeed).end().appendTo(findUl).css({zIndex:'99'});
        },switchDelay);
    });
    //var slideH = $setElm.height();

    
    $(window).on('resize',function(){
      var slideH = $setElm.find("li img").height();
      $setElm.css("height",slideH);
    });
});


/* ===================================================================
nav
=================================================================== */
$(function(){
  var set = 100;//ウインドウ上部からどれぐらいの位置で変化させるか
  var boxTop = new Array;
  var current = -1;

  //各要素の位置
  $(window).on("load",function(){
    $('section').each(function(i) {
      boxTop[i] = $(this).offset().top;
    });
    changeBox(0);
  });

  $(window).scroll(function(){
    scrollPosition = $(window).scrollTop();
    for (var i = boxTop.length - 1 ; i >= 0; i--) {
      if ($(window).scrollTop() > boxTop[i] - set) {
          changeBox(i);
        break;
      }
    };
  });
  
  function changeBox(secNum) {
    if (secNum != current) {
      current = secNum;
      secNum2 = secNum;//HTML順序用
      $('#menu li a').removeClass('on');
      //$('#menu li:nth-child(' + secNum2 +')').addClass('on');

      if (current == 1) {
        $('#menu #nav02 a').addClass('on');
      } else if (current == 2) {
        $('#menu #nav03 a').addClass('on');
      } else if (current == 3) {
        $('#menu #nav05 a').addClass('on');
      }

    }
  };
});

$(function(){
  if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {

    $(window).scroll(function() {
      $('#menu #nav05 a').removeClass('off');
      $('#menu #nav06 a').removeClass('on');
         var current = $(window).scrollTop() + window.innerHeight;
         if (current < $(document).height() - 50) return;
         if ($(this).data('loading')) return;
         
         $(this).data('loading', true);
         $('#menu #nav05 a').addClass('off');
         $('#menu #nav06 a').addClass('on');
         $(this).data('loading', false);

    });
  }
});


/* ===================================================================
contents margin
=================================================================== */

if (!(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0)) {
  $(function(){
      var wHeight = $(window).height();
      console.log(wHeight);

      if(wHeight < 800){
        $("#sec4").css({"margin-bottom":"120px"});
        $(".credits").css({"margin-top":"320px"});
      }else if(wHeight > 800 && wHeight < 1080){
        $("#sec4").css({"margin-bottom":"340px"});
        $(".credits").css({"margin-top":"560px"});
      }else if(wHeight > 1080){
        $("#sec4").css({"margin-bottom":"712px"});
        $(".credits").css({"margin-top":"850px"});
      }

  });

  $(window).resize(function(){
    var wHeight = $(window).height();
    if(wHeight < 800){
      $("#sec4").stop().animate({"marginBottom":"120px"});
      $(".credits").stop().animate({"marginTop":"320px"});
    }else if(wHeight > 800 && wHeight < 1080){
      $("#sec4").stop().animate({"marginBottom":"340px"});
      $(".credits").stop().animate({"marginTop":"560px"});
    }else if(wHeight > 1080){
      $("#sec4").stop().animate({"marginBottom":"712px"});
      $(".credits").stop().animate({"marginTop":"850px"});
    }
  
  });

}

/* ===================================================================
smooth scroll & page Top
=================================================================== */
$(function(){
  $(".topLink").bind('click', { id: '#container' }, scroller);
  $(".styleLink").bind('click', { id: '#style' }, scroller);
  $(".productLink").bind('click', { id: '#product' }, scroller);
  $(".conceptLink").bind('click', { id: '#concept' }, scroller);
  $(".dealerlistLink").bind('click', { id: '#dealerlist' }, scroller);
  $(".diaryLink").bind('click', { id: '#diary' }, scroller);

  function scroller(event){
    var scrollYPos = $(event.data.id).offset().top;
    event.preventDefault();
    TweenLite.to(window, 2, {scrollTo:{y:scrollYPos, x:0}, ease:Power4.easeOut})
  }

  if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
   $("#nav02 a").attr("href","#style");
   $("#nav03 a").attr("href","#product");
   $("#nav04 a").attr("href","#concept");
   $("#nav05 a").attr("href","#dealerlist");
   //$("#nav06 a").attr("href","#diary");
   $('a[href^=#]').click(function() {
      var speed = 1500;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({scrollTop:position}, speed, 'easeOutCubic');
      return false;
   });
 }
});
