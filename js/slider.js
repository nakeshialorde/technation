/*Slide variable*/
var prevslide=1;
/*Number of slides*/
var slides=$("ul.slides li").size();
/*Autoplay slide time*/
var slidetime=3000;

var timer=setTimeout(autoplay, slidetime);

function autoplay() {
$(".progress-bar").animate({
    width: "100%",
    opacity: 1
  }, slidetime, function() {
    nextslide();
});
};

function resettimer() {
    $(".progress-bar").stop();
  $(".progress-bar").css( "width", "1px" );
    $(".progress-bar").css( "opacity", "0.2" );
   clearTimeout(timer);
   autoplay();
}

function nextslide() {
    resettimer();
  var activeslide = 1;

  if (prevslide!=slides) {activeslide = prevslide+1;}
$('.tk-thumbnails').find('*').removeClass("active");
    $(".tk-thumbnails .thumbnail-item:nth-child("+ activeslide +")").addClass("active");
    /*Switch slide*/
    $(".slides-container ul.slides li:nth-child("+ activeslide +")").addClass("active");
    $(".slides-container ul.slides li:nth-child("+ prevslide +")").removeClass("active");
     /*Remember this slide*/
     prevslide=activeslide;
};




/*Switch by thumbnails*/


$('.thumbnail-item a').click(
  function () {
    /*The new slide is going to be the clicked one*/
    var activeslide=($(".thumbnail-item a").index(this))+1;
    /*Prevent action if clicking on the active slide*/
    if (prevslide!=activeslide) {
    resettimer();
    /*Switch thumbnail*/
    $('.tk-thumbnails').find('*').removeClass("active");
    $(".tk-thumbnails .thumbnail-item:nth-child("+ activeslide +")").addClass("active");
    /*Switch slide*/
    $(".slides-container ul.slides li:nth-child("+ activeslide +")").addClass("active");
    $(".slides-container ul.slides li:nth-child("+ prevslide +")").removeClass("active");
     /*Remember this slide*/
     prevslide=activeslide;}
  });

///Pause current slide if interaction

/*$('.slides-container').mouseenter(
    function () {
      $(".progress-bar").stop();
         clearTimeout(timer);
  });

//Resume autoplay - restart timer
$('.slides-container').mouseleave(
    function () {
      resettimer();
  });*/

autoplay();