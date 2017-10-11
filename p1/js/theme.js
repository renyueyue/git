
$('.page-scroll').bind('click', function (event) {
  var $anchor = $(this);
  $('html, body').stop().animate({
    scrollTop: $($anchor.attr('href')).offset().top - 64
  }, 1500, 'easeInOutExpo');
  event.preventDefault();
});


////////////////////////////////////////////////////////////////////////
// On-Scroll Animated Header: https://github.com/codrops/AnimatedHeader
////////////////////////////////////////////////////////////////////////

var cbpAnimatedHeader = (function () {

  var docElem = document.documentElement,
    header = document.querySelector('.navbar-fixed-top'),
    didScroll = false,
    changeHeaderOn = 10;

  function init() {
    window.addEventListener('scroll', function (event) {
      if (!didScroll) {
        didScroll = true;
        setTimeout(scrollPage, 250);
      }
    }, false);
  }

  function scrollPage() {
    var sy = scrollY();
    if (sy >= changeHeaderOn) {
      classie.add(header, 'navbar-shrink');
    }
    else {
      classie.remove(header, 'navbar-shrink');
    }
    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  init();

})();


//////////////////////////////////////////////
// Highlight the top nav as scrolling occurs
//////////////////////////////////////////////

$('body').scrollspy({
  target: '.navbar',
  offset: 65
})


///////////////////////////////////////////
// Display loading image while page loads
///////////////////////////////////////////

// Wait for window load
$(window).load(function () {
  // Animate loader off screen
  $(".page-loader").fadeOut("slow");
});


////////////////////////////////////////////////////
// OWL Carousel: http://owlgraphic.com/owlcarousel
////////////////////////////////////////////////////
//Intro text carousel bg
function initparticles() {
  bubbles();
  confetti();
  hearts();
}

function bubbles() {
  $.each($(".particletext.bubbles"), function(){
    var bubblecount = ($(this).width()/50)*10;
    for(var i = 0; i <= bubblecount; i++) {
      var size = ($.rnd(40,80)/10);
      $(this).append('<span class="particle" style="top:' + $.rnd(20,80) + '%; left:' + $.rnd(4,95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
    }
  });
}
function confetti() {
  $.each($(".particletext.confetti"), function(){
    var confetticount = ($(this).width()/50)*10;
    for(var i = 0; i <= confetticount; i++) {
      $(this).append('<span class="particle c' + $.rnd(1,2) + '" style="top:' + $.rnd(10,50) + '%; left:' + $.rnd(0,100) + '%;width:' + $.rnd(6,8) + 'px; height:' + $.rnd(3,4) + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
    }
  });
}

function hearts() {
  $.each($(".particletext.hearts"), function(){
    var heartcount = ($(this).width()/50)*5;
    for(var i = 0; i <= heartcount; i++) {
      var size = ($.rnd(60,120)/10);
      $(this).append('<span class="particle" style="top:' + $.rnd(20,80) + '%; left:' + $.rnd(0,95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
    }
  });
}


$.rnd = function(m,n) {
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor( Math.random() * (n - m + 1) ) + m;
}

initparticles();

// Intro text carousel
$("#owl-intro-text").owlCarousel({
  singleItem: true,
  autoPlay: 6000,
  stopOnHover: true,
  navigation: false,
  navigationText: false,
  pagination: true
})


// Partner carousel
$("#owl-partners").owlCarousel({
  items: 4,
  itemsDesktop: [1199, 3],
  itemsDesktopSmall: [980, 2],
  itemsTablet: [768, 2],
  autoPlay: 5000,
  stopOnHover: true,
  pagination: false
})

// Testimonials carousel
$("#owl-testimonial").owlCarousel({
  singleItem: true,
  pagination: true,
  autoHeight: true
})


////////////////////////////////////////////////////////////////////
// Stellar (parallax): https://github.com/markdalgleish/stellar.js
////////////////////////////////////////////////////////////////////

$.stellar({
  // Set scrolling to be in either one or both directions
  horizontalScrolling: false,
  verticalScrolling: true,
});


///////////////////////////////////////////////////////////
// WOW animation scroll: https://github.com/matthieua/WOW
///////////////////////////////////////////////////////////

new WOW().init();


////////////////////////////////////////////////////////////////////////////////////////////
// Counter-Up (requires jQuery waypoints.js plugin): https://github.com/bfintal/Counter-Up
////////////////////////////////////////////////////////////////////////////////////////////

//计数器
$('.counter').counterUp({
  delay: 10,
  time: 2000
});


////////////////////////////////////////////////////////////////////////////////////////////
// Isotop Package
////////////////////////////////////////////////////////////////////////////////////////////
$(window).load(function () {
  $('.portfolio_menu ul li').click(function () {
    $('.portfolio_menu ul li').removeClass('active_prot_menu');
    $(this).addClass('active_prot_menu');
  });

  var $container = $('#portfolio');
  $container.isotope({
    itemSelector: '.col-sm-4',
    layoutMode: 'fitRows'
  });
  $('#filters').on('click', 'a', function () {
    var filterValue = $(this).attr('data-filter');
    $container.isotope({filter: filterValue});
    return false;
  });
});


/////////////////////////
// Scroll to top button
/////////////////////////

// Check to see if the window is top if not then display button
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $('.scrolltotop').fadeIn();
  } else {
    $('.scrolltotop').fadeOut();
  }
});

// Click event to scroll to top
$('.scrolltotop').click(function () {
  $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
  return false;
});


////////////////////////////////////////////////////////////////////
// Close mobile menu when click menu link (Bootstrap default menu)
////////////////////////////////////////////////////////////////////

$(document).on('click', '.navbar-collapse.in', function (e) {
  if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
    $(this).collapse('hide');
  }
});

//qq文字的闪烁效果
var flag = 0;
function start() {
  var text = document.getElementById("my_qq");
  if (!flag) {
    text.style.color = "#fff";
    flag = 1;
  } else {
    text.style.color = "";
    flag = 0;
  }
  setTimeout("start()", 230);
}
$(start);

//获取屏幕大小
$(window).resize(function () {
  if(document.body.scrollWidth<768){
    $('#my_qq').attr('href','mqqwpa://im/chat?chat_type=wpa&uin=760612423&version=1&src_type=web&web_src=oicqzone.com');
  }else{
    $('#my_qq').attr('href','http://wpa.qq.com/msgrd?v=3&uin=760612423&site=qq&menu=yes');
  }
}
)












