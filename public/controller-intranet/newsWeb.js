const onGetArticles = (callback) => fs.collection("articles").orderBy('datetime', 'desc').onSnapshot(callback);


const noticeWebContainer = document.querySelector(".notice-web-container");

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetArticles((querySnapshot) => {
        noticeWebContainer.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const article = doc.data();
            console.log(article);
            article.id = doc.id;
            const user = firebase.auth().currentUser;
            noticeWebContainer.innerHTML += `
        <div class="box-notice">
                <figure>
                    <img src="${article.urlArticleCarrusel}" alt="">
                    <div class="capa-notice">
                        <div class="detail-notice">
                            <h1 class="title-notice">${article.nameArticle}</h1>
                            <p>${article.descriptionArticle}</p>
                            <button data-id="${article.id}" class="view-more">Ver más</button>
                        </div>
                    </div>
                </figure>
            </div>`;

            let linkIndicador = "";

            const galleryNoticeWeb = document.querySelector(".gallery-notice-web");
            const singleArticle = document.querySelector(".single-article");
            console.log(singleArticle)
            const linksArticle = document.querySelectorAll(".view-more");
            console.log(linksArticle);
            linksArticle.forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    console.log(e.target.dataset.id);
                    linkIndicador = e.target.dataset.id;

                    console.log("haaaaaaa");
                    onGetArticles((querySnapshot) => {
                        singleArticle.innerHTML = "";
                        querySnapshot.forEach((doc) => {
                            const article = doc.data();
                            article.id = doc.id;
                            const user = firebase.auth().currentUser;
                            console.log(article.id);
                            console.log(linkIndicador);

                            if (article.id === linkIndicador) {
                                singleArticle.classList.toggle("show");
                                galleryNoticeWeb.classList.remove("show");
                                galleryNoticeWeb.classList.toggle("hide");
                                console.log("click");
                                singleArticle.innerHTML += `

                                    <div class="head-article">
                                        <div class="box-name-article">
                                            <h1>${article.nameArticle}</h1>
                                            <p>${article.dateArticle}</p>
                                        </div>
                                        <div class="back-notice"> <a href="./galleryNews.html"><img src="../assets/iconos/back1.png" alt="servicios-imax"> <p>Volver</p> </a></div>
                                    </div>
                            <div class="container-single-notice">
                                <div class="box-noticia-content">
                                    <figure>
                                        <img src="${article.urlArticle}" alt="">
                                       
                                    </figure>
                                    <p class="news-content">${article.contentArticle}</p>
                                </div>
                                
                            </div>`;

                                // const contentApp = document.querySelectorAll(".container-single-notice")
                                // console.log(contentApp)

                                // const miniGallery = document.createElement("div");
                                // miniGallery.classList = "minibox-gallery-notice";




                                // onGetArticles((querySnapshot) => {
                                //     miniGallery.innerHTML = "";
                                //     querySnapshot.forEach((doc) => {
                                //         const article = doc.data();
                                //         article.id = doc.id;
                                //         miniGallery.innerHTML += `<div class="box-notice">
                                //     <figure>
                                //         <img src="${article.urlArticle}" alt="">
                                //         <div class="capa-notice">
                                //             <div class="detail-notice">
                                //                 <h1 class="title-notice">${article.nameArticle}</h1>
                                //                 <p>${article.descriptionArticle}</p>
                                //                 <a class="view-more" href="./galleryNews.html">Ver más</a>
                                //             </div>
                                //         </div>
                                //     </figure>

                                // </div>`
                                //     })
                                // })
                                // singleArticle.appendChild(miniGallery)




                            }
                        });


                    });



                });
            });
        });
    });

})