$(function(){
  "use strict";
  
  // iPad youtubeBG => sublimeSlideshow
  if(navigator.userAgent.indexOf('iPad') > 0) {
    $(".heroWrapper").addClass("viewIPAD");
  }
  
  // SP TOP sublimeSlideshow
  $.sublime_slideshow({
    src:[
      {url:"/en/_/img/index/img_slide_01.png"},
      {url:"/en/_/img/index/img_slide_02.png"},
      {url:"/en/_/img/index/img_slide_03.png"},
      {url:"/en/_/img/index/img_slide_04.png"}
    ],
    duration: 7,
    fade: 1.5,
    scaling: 1.17,
    rotating: false,
    overlay: ""
  });
    
  // PC TOP youtube BG
  $("body").append('<script src="https://www.youtube.com/iframe_api">');
  var player;
  function resizeMovie () {
    var $w = $(window),
    bw = 1200,
    bh = (bw/16) * 9,
    w = $w.width(),
    h = $w.height(),
    mw = w,
    mh =  Math.round(bh * (mw/bw));
    if ( mh < h ) {
      mh = h;
      mw = Math.round(bw * (mh/bh));
    }
    $("#player").css({
      width: mw*1.29,
      height: mh*1.29 - 50,
      marginTop: (h - mh*1.29)/2, 
      marginLeft: (w - mw*1.29)/2
    });
  }resizeMovie();
  $(window).resize(resizeMovie);
  $(".playerCover").click(function() {
    switch(player.getPlayerState()) {
      case 1:
      player.playVideo();
      break;
      default:
      player.playVideo();
    }
  });
  function onPlayerReady(event) {
    event.target.mute();
  }
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      player.playVideo();
    }
  }
  var onYouTubeIframeAPIReady = function () {
    player = new YT.Player("player", {
      videoId: "UPnlPQXXYwQ",
      playerVars: { 
        "autoplay": 1,
        "loop": 1,
        "controls": 0,
        "enablejsapi": 1,
        "iv_load_policy": 3,
        "disablekb":1,
        "showinfo":0,
        "rel":0
      },
      events: {
        "onReady": onPlayerReady,
        "onStateChange": onPlayerStateChange
      }
    });
  };
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  
  // TOP GALLERY owlcarousel
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    nav:true,
    video: true,
    lazyLoad: true,
    center: true
  });
  
});