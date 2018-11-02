/* ===================================================================
JS information

file name : common.js
=================================================================== */

/* ===================================================================
current URL anchor deleate
=================================================================== */
$(function(){
    $('.nolink a').each(function(){
        var href = location.href.split('#')[0];
        if (href == this.href) $(this).before(this.childNodes).remove();
    });
});


/* ===================================================================
hover & opacity change
=================================================================== */
$(function(){
    $('.op').hover(function(){
        $(this).stop().fadeTo(0, 0.7);
    },function(){
        $(this).stop().fadeTo(0, 1.0);
    });
});


/* ===================================================================
rollover
=================================================================== */
$(function(){
  $('.ov').hover(
    function(){
      $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
    }, 
    function(){
      $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
    }
  );
});


/* ===================================================================
gNav
=================================================================== */
$(function(){
  var $gNavEl = $("nav ul li a"),
      $lowerNavWrap = $(".lowerNavBg"),
      $lowerNav = $(".lowerNav"),
      hoverFlg = false,
      detailFlg = false;

  var hoverFunc = function(){
    var gNavIndex = $gNavEl.index(this)-1;
    if(!(gNavIndex == 0 || gNavIndex == 1)) return false;
    hoverFlg = true;
    $(".lowerNav:not("+gNavIndex+")").hide();
    $lowerNav.eq(gNavIndex).show();
    $(this).addClass("current");
    $(".current").find("img").attr('src', $(".current").find("img").attr('src').replace('_off', '_on'));
    open(gNavIndex);
  }

  var hoverOutFunc = function(){
    hoverFlg = false;
    $(this).removeClass("current");
    $(this).find("img").attr('src', $(this).find("img").attr('src').replace('_on', '_off'));
    setTimeout(close,50);
  }

  var detailHoverFunc = function(){
    detailFlg = true;
    $lowerNav.each(function(){
      if($(this).is(":visible")){
        $gNavEl.eq($(this).index()+1).addClass("current");
        //$(".current").find("img").attr('src', $(".current").find("img").attr('src').replace('_off', '_on'));
        $(".current").css("opacity","0.5");
      }
    });
  }

  var detailHoverOutFunc = function(){
    detailFlg = false;
    setTimeout(close,50);
    $gNavEl.removeClass("current");
    $gNavEl.each(function(){
      //$(this).find("img").attr('src', $(this).find("img").attr('src').replace('_on', '_off'));
      $(this).css("opacity","1");
    });
  }

  function preload() {
    for(var i = 0; i < arguments.length; i++){
      $("<img>").attr("src", arguments[i]);
    }
  }
  //preload("../images/share/navi01_on.jpg", "../images/share/navi02_on.jpg", "../images/share/navi03_on.jpg", "../images/share/navi04_on.jpg","../images/share/navi05_on.jpg" );

  var open = function(index){
    $lowerNavWrap.find(".lowerNavWrap").stop(false,true).slideDown();
  }
  var close = function(index){
    if(hoverFlg || detailFlg) return;
    $lowerNavWrap.find(".lowerNavWrap").stop(false,true).slideUp();
    $lowerNav.hide();
  }
  
  $gNavEl.each(function(){
    $(this).hover(
      hoverFunc,
      hoverOutFunc
    );
  });

  $lowerNavWrap.hover(
    detailHoverFunc,
    detailHoverOutFunc
  );
});