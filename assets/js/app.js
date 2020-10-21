$(document).ready(function() {

  //initial opening transition
  $('.fade-me').toggleClass('fadeout');
  $('.wrapper').toggleClass('wrapper--active');


  //fun title changes when not active
  $(window).focus(function() {

      document.title = $("meta[property='og:title']").attr("content");
  });

  $(window).blur(function() {
      document.title = '(' + 'っ' + '◕' +'‿' +'◕'  + ')' + 'っ';
  });

  //overlay menu
  $('.btn-menu').click(function(){
      $('.l--nav').toggleClass('nav--is-active');
      $(this).toggleClass('btn-menu--is-active');
      $('body').toggleClass('body-stopscroll');
      $(".l-head-banner").toggleClass("bg-head--is-none");
  });

  //tab on porto page
  $('.l-porto--icons-wrapper').click(function(){
      var portoSiblings = $(this).siblings();
      $(this).addClass('icons-wrapper--is-active');
      $(portoSiblings, 'body').removeClass('icons-wrapper--is-active');
  });


  //mouseover on any section of Porto photo

  $('.l-blog--').hover(function(){
    $('.l-blog').toggleClass('balancing');
    console.log('aaaa');
  });

//slideshow from  http://codepen.io/SitePoint/pen/YqmjRj


  $('.l-photo--w').click(function(){
      $('body').append('<div class="slide-layer"><div class="arL"></div><div class="arR"></div><div class="close"></div>').addClass('body-stopscroll');

      $(this).addClass('photo--is-active');

      var currentIndex = 0,
      items = $('.l-porto-photo div'),
      itemAmt = items.length;

      function cycleItems() {
        var item = $('.l-porto-photo div').eq(currentIndex);
        items.removeClass('photo--is-active');
        item.addClass('photo--is-active');
      };

      $('.arR').click(function() {
          // clearInterval(autoSlide);
          currentIndex += 1;
          if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
          }
          cycleItems();
      });

      $('.arL').click(function() {
          // clearInterval(autoSlide);
          currentIndex -= 1;
          if (currentIndex < 0) {
            currentIndex = itemAmt - 1;
          }
          cycleItems();
      });

      $('.close').click(function(){
          $('.l-photo--w').removeClass('photo--is-active');
          $('.slide-layer').remove();
          $('body').removeClass('body-stopscroll');
          console.log('tot');
      });

      $('body').keyup(function(e){
          if(e.keyCode == 27){//Enter key pressed
                $('.close').click();//Trigger search button click event
            }
      });
  });


  //scroll to show
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var eachScrool= Math.floor(scroll / 200);
    //

    if (scroll >= 20) {
        $(".l-head-banner").addClass("head-banner--is-active");
        // console.log('checkWin');
    } else {
        $(".l-head-banner").removeClass("head-banner--is-active");
        // console.log('yaay');
    };


    $('.prgph').each(function(){
      // var eachScrool= Math.floor(scroll / 200);
      // var checkPrgph= $('.prgph').index();

      $('.prgph').removeClass('prgph--is-active');
      $('.prgph').eq(eachScrool).toggleClass('prgph--is-active');

    });

    function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
      }

    $('.prgph--is-active span').each(function(i){
      var row = $(this);
      setTimeout(function() {
        row.addClass('span--is-active');
        // console.log('a');
      }, 200*i);
    });
  });

  $('.scroll-img-wrapper').click(function(){
    $(this).addClass('scrolll');
  });

// // tab
//   $('#tabs a').click(function(){
//     var Page = this.hash.substr(1);
//     $.get(Page+".html" #here, function(getHTML){
//       console.log(getHTML);
//       // $('.tabgoeshere').html(getHTML);
//     });
//   });


// if($('.prgph').hasClass('prgph--is-active') === true){
//   $('.prgph--is-active span').each(function(i){
//     var row = $(this);
//     setTimeout(function() {
//       row.addClass('span--is-active');
//       console.log('a');
//     }, 200*i);
//   });
// }
//   else {
//     $('.prgph--is-active span').each(function(i){
//       $('span').removeClass('span--is-active');
//       console.log('b');
//     });
// }

});
