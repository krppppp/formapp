({
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
      self.parallax.init();
    });
  },
  parallax : {
    init : function(){
      var self = this;
      self.$fs = $('.fs');
      self.$content = $('#topContent');
      self.$bgs = $('#topContent .bg');
      self.$bgi = $('#topContent .bg .inner');
      self.delay = 0;

      $(window).on({
        resize : function(){
          clearTimeout(self.timer);
          self.timer = setTimeout(function(){
            self.mediaType = ($('body').css('content')).replace(/\"/g,'');
            self.mediaType = self.mediaType.replace(/\'/g,'');
            self.mediaType = cmn.ua.isPC ? 'pc' : self.mediaType;
              if(self.mediaType == 'pc'){
                self.generate();
                $(window).scroll();
              } else {
                self.destroy();
              }

            // if ( self.mediaType != self.exMediaType ){
            //   if(self.mediaType == 'pc'){
            //     self.generate();
            //     $(window).scroll();
            //   } else {
            //     self.destroy();
            //   }
            //   self.exMediaType = self.mediaType;
            // }
            self.delay = 50;
          },self.delay);
        },
        scroll : function(){
          if(self.mediaType == 'pc'){
            self.top = $(this).scrollTop();
            self.time = self.top / (cmn.win.h);
            self.time = Math.max(self.time,0);
            self.timeline.seek(self.time,false);
          }
        }
      }).resize();

      TweenMax.to( '#scrA img', 0.5, { autoAlpha: 0, repeat: -1, yoyo: true });

      //alert($('.scene').length);
      var $anchors = $('#topContent nav li');
      var waypoints = $('.scene').waypoint({
        handler: function(direction){
          //console.log(this.element.id + ' hit');
          $anchors.removeClass('cur');
          $('#topContent nav li.'+this.element.id).addClass('cur');
        }
      });
      $anchors.on({
        click : function(){
          if(!$(this).hasClass('cur')){
            var id = '#' + $(this).attr('class');
            var offset = $(id).offset().top;
            offset = offset < 100 ? 0 : offset;
            TweenLite.to(window, 1, {scrollTo:{y:offset}, ease:Power2.easeOut});
          }
        }
      });

      TweenMax.to('#coverWhite',1,{autoAlpha:0, ease:Power0.easeOut});

    },
    destroy : function(){
      var self = this;
      var h = cmn.win.h;
      TweenMax.set( self.$bgs, { y: 0 });
      TweenMax.set( self.$bgi, { y: 0 });
      self.$fs.css({ height : 'auto'});
      $('#block1').height(h-69);
    },

    generate : function(){
      var self = this;
      var d1h = $('#block2').outerHeight();
      var d2h = $('#block4').outerHeight();
      var d3h = $('#block6').outerHeight();
      var d4h = $('#block8').outerHeight();
      var d5h = $('#block10').outerHeight();
      var h = cmn.win.h;
      var l = Power0.easeOut;
      var p = h/1.2;
      self.$fs.height(h);
      //$('.hs').height(h*0.66);
      $('#block1').height(h-72);
      var d1 = 1 + ( d1h / h );
      var d2 = 1 + ( d2h / h );
      var d3 = 1 + ( d3h / h );
      var d4 = 1 + ( d4h / h );
      var d5 = 1 + ( d5h / h );


      TweenMax.set( self.$bgs.eq(0), { y: 0 });
      TweenMax.set( self.$bgi.eq(0), { y: 0 });
      TweenMax.set( self.$bgs.eq(1), { y: h });
      TweenMax.set( self.$bgi.eq(1), { y: 0 });
      TweenMax.set( self.$bgs.eq(2), { y: h });
      TweenMax.set( self.$bgi.eq(2), { y: 0 });
      TweenMax.set( self.$bgs.eq(3), { y: h });
      TweenMax.set( self.$bgi.eq(3), { y: 0 });
      TweenMax.set( self.$bgs.eq(4), { y: h });
      TweenMax.set( self.$bgi.eq(4), { y: 0 });
      TweenMax.set( self.$bgs.eq(5), { y: h });
      TweenMax.set( self.$bgi.eq(5), { y: 0 });


      self.timeline = new TimelineMax({
        paused:true
      })
      .appendMultiple([
        TweenMax.to(  '#scrT', 0.2, { autoAlpha:0, ease: l }),
        TweenMax.to(  '#scrA', 0.2, { autoAlpha:0, ease: l }),
        TweenMax.to(  self.$bgs.eq(0), d1, { y:-h, ease: l }),
        TweenMax.to(  self.$bgi.eq(0), d1, { y: p, ease: l }),
        TweenMax.to(  self.$bgs.eq(1), d1, { y: 0, ease: l }),
        TweenMax.from(self.$bgi.eq(1), d1, { y:-p, ease: l })
        //TweenMax.fromTo( $('#block2 .shape'), d1, { y: h/2, ease: l }, { y: -h/2, ease: l })
      ])
      .appendMultiple([
        TweenMax.to(  self.$bgs.eq(1), d2, { y:-h, ease: l }),
        TweenMax.to(  self.$bgi.eq(1), d2, { y: p, ease: l }),
        TweenMax.to(  self.$bgs.eq(2), d2, { y: 0, ease: l }),
        TweenMax.from(self.$bgi.eq(2), d2, { y:-p, ease: l })
        //TweenMax.from( $('#block5 .content'), d1, { y: h/2, ease: l })
      ])
      .appendMultiple([
        TweenMax.to(  self.$bgs.eq(2), d3, { y:-h, ease: l }),
        TweenMax.to(  self.$bgi.eq(2), d3, { y: p, ease: l }),
        TweenMax.to(  self.$bgs.eq(3), d3, { y: 0, ease: l }),
        TweenMax.from(self.$bgi.eq(3), d3, { y:-p, ease: l })

      ])
      .appendMultiple([
        TweenMax.to(  self.$bgs.eq(3), d4, { y:-h, ease: l }),
        TweenMax.to(  self.$bgi.eq(3), d4, { y: p, ease: l }),
        TweenMax.to(  self.$bgs.eq(4), d4, { y: 0, ease: l }),
        TweenMax.from(self.$bgi.eq(4), d4, { y:(-h+400)/1.2, ease: l })
      ])
      .appendMultiple([
        TweenMax.to(  self.$bgs.eq(4), 1, { y:-h, ease: l }),
        TweenMax.to(  self.$bgi.eq(4), 1, { y: (h-400)/1.2, ease: l }),
        TweenMax.to(  self.$bgs.eq(5), 1, { y: 0, ease: l }),
        TweenMax.from(self.$bgi.eq(5), 1, { y:-p, ease: l })
      ])
      .appendMultiple([
        TweenMax.to(  self.$bgs.eq(5), 1, { y:-h, ease: l }),
        TweenMax.to(  self.$bgi.eq(5), 1, { y: p, ease: l })
      ])
      .to({},10,{})
      ;

      Waypoint.refreshAll();

    }
  }
}).init();
