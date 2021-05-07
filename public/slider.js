$(document).ready(function(){
    $('.flexslider').flexslider({
        prevText: "",    //le podemos definir el texto       
        nextText: ""
    });
})

$(document).ready(function () {
  $(".sliderComments").flexslider({
    slideshowSpeed: 9000,
  });
});




const simpleCarousel = document.querySelector('.carousel-lista');
console.log(simpleCarousel);
new Glider(simpleCarousel, {
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: true,
    dots: '.carousel-indicadores',
    arrows: {
        prev: '.anterior-carousel',
        next: '.siguiente-carousel'
    }
})