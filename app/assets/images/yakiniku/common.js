var cmn = {

  init : function(){
    for (var key in this) {
      var member = this[key];
      if (typeof member != 'object') {
        continue;
      }
      member.root = this;
    }

    var self = this;

    $(function(){
      self.ua.init();
      self.win.init();
      // self.globalNav.init();
      // $('.over').rollover('_over');

      //rent,buyのページの場合
      if ( $('#map_canvas').length ){
        self.map.loadScript();
        // 初回のhashChange はMapが用意できてから実行
      } else {
        //初回のhashChange
        // self.win.hashChange();
      }

      if ( $('body#detail').length ){
        self.detail.init();
      }


    });
  },

  detail : {
    detail: function(){},
    init : function(){
      var self = this;

      //アコーディオン
      $('#main .hdr').on({
        click: function(){
          //開ける
          if(!$(this).hasClass('open')){
            $(this).addClass('open');
            var target = $(this).next();
            var h = target.find('.innerContent').outerHeight();
            var scrTop = target.offset().top;
            TweenMax.to(target,0.5,{ height: h });
            $('html,body').animate({scrollTop:scrTop},500);
          }
          //閉める
          else {
            $(this).removeClass('open');
            var target = $(this).next();
            TweenMax.to(target,0.5,{height:0});
          }
        }
      });


      $('.fancybox').fancybox({
        padding: 0
      });

      $('#outline th,#VR_outline th').wrapInner('<div />');

      //ギャラリー生成
      var $thumbs = {
        li : $('#pictures .picture'),
        a : $('#pictures .picture a'),
        img : $('#pictures .picture img')
      };

      var $mainImg = $('#mainImg img').length ? $('#mainImg img') : $('#mainImgArea img');

      $thumbs.li.eq(0).addClass('cur');
      $thumbs.a.on({
        click: function(){
          var href = $(this).attr('href');
          $mainImg.attr({src:href});
          $thumbs.li.removeClass('cur');
          $(this).parent('li').addClass('cur');
          return false;
        }
      });

    }
  },

  itemsIndex: {
    init: function(){
      var self = this;
      self.type = $('body').attr('id');
      self.tmp =
        '<div class="item">'+
          '<a href="">' +
            '<div class="thumb"><img /></div>'+
            '<p class="text"></p>'+
            '<div class="status"></div>'+
          '</a>' +
        '</div>';

      $.ajax({
        url: '/api/'+self.type+'/all.json',
        dataType: 'json'
      }).done(function(json){
        if ( json.result == true ){
          self.data = json.data;
          // リストを生成
          self.generate();
        }
      });
    },
    generate: function(){
      var self = this;
      var items = [];
      $.each(self.data, function(i){
          var $t = $(self.tmp);
          $t.attr({
            'data-id': this.id,
            'data-idx': i,
          });
          $t.find('.thumb img').attr({
            src: this.thumbnail,
          });
          // rent,buy ステータスのフィルタ
          var status = this.estatestatus.name.toLowerCase() == 'sale' ? 'buy' : this.estatestatus.name.toLowerCase();
          $t.addClass('fl_'+status);

          if ( self.type == 'buy' ){
            // buyの価格フィルタ
            for ( var j = 0; j < this.estates.length; j++ ){
              // estatesの数だけ同じ物件をループ
              var filterBuy = this.estates[j].price <= 5000000  ? '-500'
                             : this.estates[j].price <= 10000000 ? '500-1000'
                             : this.estates[j].price <= 20000000 ? '1000-2000'
                             : this.estates[j].price <= 30000000 ? '2000-3000'
                             : '3000-';
              $t.addClass('fl_'+filterBuy );
            }
            // buy 種類フィルタ
            var cate = this.categories.type_id == 1 ? 'land'
              : this.is_secondhouse == true ? 'secondhouse'
              : 'other';
            $t.addClass('fl_'+cate);
          } else {
            // rentの価格フィルタ
            for ( var j = 0; j < this.estates.length; j++ ){
            // estatesの数だけ同じ物件をループ
              var filterRent = this.estates[j].rent <= 50000  ? '-5'
                             : this.estates[j].rent <= 100000 ? '5-10'
                             : this.estates[j].rent <= 150000 ? '10-15'
                             : '15-';
              $t.addClass('fl_'+filterRent );
            }
            // rent エリアフィルタ
            $t.addClass('fl_'+this.area.code);
          }

          //rent,buy アイコン
          if ( this.is_new ){
            $t.addClass('fl_new');
            $t.find('.status').addClass('icnNEW');
          } else {
            $t.find('.status').addClass('icn'+this.estatestatus.name);
          }

          $t.find('a').attr({ href: '/'+self.type+'/detail/'+this.code+'/' });
          $t.find('.text').text( this.messages[0] ); //後に丸める予定
          items.push($t);
          // self.addMarker(i);
      });

      $('.items').append(items);
      self.layout();
      //初回のハッシュチェンジを実行
      self.root.win.hashChange();

      // 初回時にハッシュがあるとrelayout時にがたつくのでtransitionをアップデート
      $('.items').isotope({ transitionDuration: '0.5s' });

      // マウスオーバーで物件をマップの中心に
      // $('.items .item').on({
      //   mouseenter: function(){
      //     var idx = $(this).data('idx');
      //     var item = self.data[idx];
      //     self.root.map.movePan(item.latitude, item.longitude);
      //   }
      // });
    },

    layout: function(){
      var self = this;
      $('.items').isotope({
        itemSelector: '.item',
        stamp: '.stamp',
        transitionDuration: '0',
        masonry: {
          columnWidth: 272,
          gutter: 24
        },
        filter: '*'
      });
    },

    filter: function(){
      var self = this;
      var filterValue = self.root.win.hash ? '.fl_'+self.root.win.hash : '';
      $('.items').isotope({ filter: filterValue });

      //表示されているアイテムのインデックス番号を格納
      self.visibles = [];
      $('.items .item'+filterValue).each(function(){
        idx = $('.items .item').index(this);
        self.visibles.push(idx);
      });
      //mapのmarkerをアップデート
      // console.log(self.visibles);
      self.root.map.updataMarkers();

    },
  },

  map: {
    loadScript: function() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      //script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyAk2daS0PnXDW0PFNeG8Nx5F_KENKO2Yro&sensor=false&callback=initialize";
      script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=cmn.map.initializeMap";
      document.body.appendChild(script);
    },
    initializeMap: function () {
      var self = this;
      self.markersArray = [];

      var myLatlng = new google.maps.LatLng(35.358464, 140.353839);
      var mapOptions = {
        zoom: 12,
        center: myLatlng,
        mapTypeControl: false,
        // disableDefaultUI: true,
        // disableDoubleClickZoom: false,
        // scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
           mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'mono']
        }
      }

      self.mapArea = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

      // var mono = [{
      //     "stylers": [{"saturation": -100},{"lightness": 23 }]
      //   },{
      //     "featureType": "water",
      //     "stylers": [{ "color": "#b2e5ff" }]
      //   },{
      //     "featureType": "road",
      //     "stylers": [{ "lightness": 44 }]
      //   }];
      var mono =[
        { "featureType": "water", "stylers": [ { "color": "#d2f1ff" } ] },
        { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ededed" } ] },
        { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#fbfbfb" } ] },
        { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#fbfbfb" } ] },
        { "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] },
        { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#ededed" } ] },
        { "elementType": "labels.icon", "stylers": [ { "lightness": 70 }, { "saturation": -100 } ] }
      ];

      var monoOptions = {
        name: "mono"
      };

      var monoMapType = new google.maps.StyledMapType(mono, monoOptions);
      self.mapArea.mapTypes.set('mono', monoMapType);
      self.mapArea.setMapTypeId('mono');

      //mapページ用
      self.root.itemsIndex.init();

    },

    movePan: function(lat,lng) {
      var self = this;
      myLatlng = new google.maps.LatLng(lat,lng);
      self.mapArea.panTo( myLatlng );
    },

    updataMarkers: function(){
      var self = this;
      self.deleteOverlays();
      if ( self.root.itemsIndex.visibles.length ){
        $.each(self.root.itemsIndex.visibles, function(){
          self.addMarker(Number(this));
        });

        self.mapArea.panTo( self.getAveragePosition() );
      }

    },

    addMarker: function(idx){
      var self = this;
      var item = self.root.itemsIndex.data[idx];
      var image = {
        url :   '/assets/img/common/sp_icn_marker.png',
        scaledSize : new google.maps.Size(29, 34)
      }
      var location = new google.maps.LatLng( item.latitude, item.longitude );
      var marker = new google.maps.Marker({
        position: location,
        map: self.mapArea,
        title: item.name,
        icon: image
      });
      //クリックで詳細へ移動
      google.maps.event.addListener(marker, 'click', function(event) {
        window.location.href = '/rent/detail/'+item.code+'/';
      });
      self.markersArray.push(marker);
    },

    getAveragePosition: function(){
      var self = this;

      var lat = [];
      var lng = [];
      $.each( self.root.itemsIndex.visibles, function(){

        var marker = self.root.itemsIndex.data[Number(this)];
        lat.push(marker.latitude);
        lng.push(marker.longitude);
      });
      var latAve = ( Math.max.apply(null, lat) + Math.min.apply(null, lat) ) / 2;
      var lngAve = ( Math.max.apply(null, lng) + Math.min.apply(null, lng) ) / 2;
      var myLatlng = new google.maps.LatLng(latAve,lngAve);
      return myLatlng;
      // self.mapArea.panTo( myLatlng );
    },

    deleteOverlays: function() {
      var self = this;
      if (self.markersArray) {
        for (i in self.markersArray) {
          self.markersArray[i].setMap(null);
        }
        self.markersArray.length = 0;
      }
    },



  },
  ua : {
    init : function(){
      var self = this;
      var ua = navigator.userAgent.toLowerCase();
      self.isWindows = /windows/.test(ua); // Windows
      self.isMac = /macintosh/.test(ua); // Mac
      self.isPC  = /windows/.test(ua) || /macintosh/.test(ua) || /ipad/.test(ua); // PC
      self.isIE = /msie (\d+)/.test(ua); // IE
      self.isIE6 = /msie (\d+)/.test(ua) && RegExp.$1 == 6;// IE6
      self.isIE7 = /msie (\d+)/.test(ua) && RegExp.$1 == 7;// IE7
      self.isLtIE9 = /msie (\d+)/.test(ua) && RegExp.$1 < 9;// IE9未満
      self.isLtIE10 = /msie (\d+)/.test(ua) && RegExp.$1 < 10;// IE10未満
      self.isFirefox = /firefox/.test(ua); // Firefox
      self.isWebKit = /applewebkit/.test(ua); // WebKit
      self.isTouchDevice = 'ontouchstart' in window; // タッチデバイス
      self.isIOS = /i(phone|pod|pad)/.test(ua); // iOS
      self.isIPhone = /i(phone|pod)/.test(ua); // iPhone、iPod touch
      self.isIPad = /ipad/.test(ua); // iPad
      self.isAndroid = /android/.test(ua); // Android
      self.isAndroid2 = /android 2.[123]/.test(ua);
      // self.isAndroidMobile = /android(.+)?mobile/.test(ua);// モバイル版Android
      // if( self.isIPhone || self.isAndroid ){
      //   location.href = '../';
      // }
      // if(self.isLtIE9){
      //   $('#soundWrapper').hide();
      // }
    }
  },

  win : {
    init : function(){
      var self = this;
      // メディアチェンジ後の遅延時間
      self.mediaChangeDelay = 0;

      // mediaが変わった時に実行するfunction
      self.root.responsiveFns = ['globalNav'];

      if(cmn.ua.isAndroid){
        //$('html').css({zoom:$(window).width()/320});
      }
      $(window).on({
        resize: function(){
          self.h = $(this).height();
          self.w = $(this).width();
          clearTimeout(self.timer);
          self.timer = setTimeout(function(){
            self.mediaChange();
          }, self.mediaChangeDelay);
        },
        hashchange: function(){
          self.hashChange();
        }
      }).resize();
    },
    hashChange: function() {
      var self = this;
      if (location.hash && location.hash != '#/'){
        self.hash = location.hash.split('#/')[1].split('/')[0];
      } else {
        self.hash = false;
      }
      self.root.itemsIndex.filter();
      self.root.globalNav.addCurrent();
    },
    mediaChange: function(){
      var self = this;
      self.mediaType = ($('body').css('content')).replace(/\"/g,'');
      self.mediaType = self.mediaType.replace(/\'/g,'');
      self.mediaType = self.root.ua.isPC ? 'pc' : self.mediaType;
      if ( self.mediaType != self.exMediaType ){
        //mediatypeを更新
        self.exMediaType = self.mediaType;
        $.each( self.root.responsiveFns, function(i){
          var fn = self.root[this];
          fn.init();
          fn[self.exMediaType+'_init']();
        });
      }
      self.mediaChangeDelay = 0;
    }
  },


  globalNav: {
    init: function(){
      var self = this;
      self.$nav =  $('#globalNav');
      $('#header *').off();
      //globalNavのリストをリセット
      TweenMax.set('#globalNav .child,#globalNav .grandChild,#localNav .child', { display: 'block', autoAlpha: 0, y: 10 });
      //rent,buyは本来ドロップダウンの対象外なので、一旦非表示
      $('#nav_rent + .child, #nav_buy + .child').hide();
      //globalNavの位置をリセット
      TweenMax.set('#globalNav', { y: '0%' });


    },
    pc_init: function(){
      var self = this;
      //第2階層のドロップダウン
      $('#globalNav,#localNav').find('.dropdown').on({
        mouseenter: function(){
          TweenMax.to($(this).find('.child'), 0.2, { y : 0, autoAlpha: 1, ease: Power2.easeInOut });
        },
        mouseleave: function(){
          TweenMax.to($(this).find('.child'), 0.2, { y : 10, autoAlpha: 0, ease: Power2.easeInOut });
        }
      });
      //第3階層のドロップダウン
      $('#globalNav .child').find('.dropdown-submenu').on({
        mouseenter: function(){
          TweenMax.to($(this).find('.grandChild'), 0.2, { autoAlpha: 1, ease: Power2.easeInOut });
        },
        mouseleave: function(){
          TweenMax.to($(this).find('.grandChild'), 0.2, { autoAlpha: 0, ease: Power2.easeInOut });
        }
      });

      $('#globalNav,#localNav').find('.noClick').on({
        click: function(){
          return false;
        }
      });

    },
    sp_init: function(){
      var self = this;
      //buildのchildは最初から表示
      TweenMax.set('#nav_build + .child', { display: 'block', autoAlpha: 1, y: 0 });
      $('#menuTrigger').removeClass('open');
      TweenMax.set($('#globalNav'), { y : '-100%' });

      $('#menuTrigger').on({
        'touchend': function(){
          if ( $(this).is('.open') ){
            $(this).removeClass('open');
            TweenMax.to($('#globalNav'), 0.5, { y : '-100%', ease: Power2.easeInOut });
          } else {
            $(this).addClass('open');
            TweenMax.to($('#globalNav'), 0.5, { y : '0%', ease: Power2.easeInOut });
          }
          TweenMax.to($('#localNav').find('.child'), 0.2, { y : 10, autoAlpha: 0, ease: Power2.easeInOut });
        },
      });

      // メニュータップでドロップダウンメニューを表示/非表示
      $('#localNav .dropdown > a').on({
        touchend: function(){
          // if ( $(this).is('.noClick') ){ return false; }
          TweenMax.to($('#localNav').find('.child'), 0.2, { y : 10, autoAlpha: 0, ease: Power2.easeInOut });
          TweenMax.to($(this).next('.child'), 0.2, { y : 0, autoAlpha: 1, ease: Power2.easeInOut });
          return false;
        }
      });
      // サブメニュータップでURLを変更
      $('#localNav .child li a').on({
        touchend: function(){
          TweenMax.to($('#localNav').find('.child'), 0.2, { y : 10, autoAlpha: 0, ease: Power2.easeInOut });
          location.href = $(this).attr('href');
          return false;

        },
      });

    },
    addCurrent: function(){
      var self = this;
      $('#localNav li').removeClass('active');
      if ( self.root.win.hash && $('#localNav').length ){
        $('#localNav li').each(function(){
          if ( self.root.win.hash == $(this).find('a').data('filter')){
            $(this).addClass('active');
            $(this).parents('li').addClass('active');
          }
        });
      } else {
        $('#localNav li').eq(0).addClass('active');
      }
    }
  }
}


cmn.init();

//rollover
$.fn.rollover = function(suffix, hoverClass, opacity ) {
  var suffix = suffix || '_over';
  var hoverClass = hoverClass ? hoverClass.replace('.','') : 'hover'
  var opa = opacity ? opacity : '0.5';
  var target = this;
  return target.each(function() {
    if ( ( $(this).is('img') == true || $(this).is('input[type=image]') == true )    && $(this).not ('[src*="'+ suffix +'."]') ){
//        $(this).not ('[src*="'+ suffix +'."]').each(function(j) {
        var img = $(this);
        var src = img.attr('src');
        var _on = [
          src.substr(0, src.lastIndexOf('.')),
          src.substring(src.lastIndexOf('.'))
        ].join(suffix);
        $('<img>').attr('src', _on);
        img.on({
          mouseenter: function(){
            img.attr('src', _on);
          },
          mouseleave: function(){
            img.attr('src', src);
          }
        });
//        });
    } else {
      $(this).find('img').not('[src*="'+ suffix +'."]').each(function(j) {
        var img = $(this);
        var src = img.attr('src');
        var _on = [
          src.substr(0, src.lastIndexOf('.')),
          src.substring(src.lastIndexOf('.'))
        ].join(suffix);
        if ( !($(this).hasClass('noOv')) ){
          $('<img>').attr('src', _on);
        }
        target.on({
          mouseenter: function(){
            $(this).addClass(hoverClass);
            $(this).find(img).each(function(i){
              if ( !$(this).hasClass('noOv')) {
                $(this).attr('src', _on);
              }
            });
          },
          mouseleave: function(){
            $(this).removeClass(hoverClass);
            $(this).find(img).each(function(i){
              if ( !$(this).hasClass('noOv')) {
                $(this).attr('src', src);
              }
            });
          }
        });
      });
    }
  });
}


