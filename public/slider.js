$(document).ready(function(){
    $('.flexslider').flexslider({
        prevText: "",    //le podemos definir el texto       
        nextText: ""
    });
})




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