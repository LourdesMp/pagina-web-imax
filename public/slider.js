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
});

// const onGetProjects = (callback) => fs.collection("projects").onSnapshot(callback);

// const projectContainer = document.querySelector(".carousel-lista");
// window.addEventListener("DOMContentLoaded", async (e) => {
//     onGetProjects((querySnapshot) => {
//         projectContainer.innerHTML = "";
//         querySnapshot.forEach((doc) => {
//             const project = doc.data();
//             console.log(project)
//             project.id = doc.id;
//             const user = firebase.auth().currentUser;
//             projectContainer.innerHTML += `
//                    <div class="carousel-element">
        
//                                 <figure>
//                                     <img src="${project.urlCarrusel}" alt="">
//                                     <!-- <a href="aaa"></a> -->
//                                     <div class="capa">
//                                         <img class="boton_mas" src="./assets/iconos/image.png" alt="">
//                                     </div>
//                                 </figure>

//                                 <div>
//                                     <h1>${project.servicio}: ${project.nombre}</h1>
//                                     <p>${project.description}</p>
//                                 </div>
//                             </div>
                      
//      `;
//         })
//       })
//     })