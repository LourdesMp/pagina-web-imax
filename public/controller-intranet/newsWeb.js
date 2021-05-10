const onGetArticles = (callback) => fs.collection("articles").onSnapshot(callback);

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
                    <img src="${article.urlArticle}" alt="">
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
                <h1>${article.nameArticle}</h1>
                <div><i class="fas fa-long-arrow-alt-left"></i> <a href="./galleryNews.html">Volver</a></div>
            </div>
            <div class="container-single-notice">
                <div class="box-noticia-content">
                    <figure>
                        <img src="${article.urlArticle}" alt="">
                        <p class="title-single-notice">${article.nameArticle}</p>
                    </figure>
                    <p class="news-content">${article.contentArticle}</p>
                </div>
                <div class="minibox-gallery-notice">
                    <div class="box-notice">
                        <figure>
                            <img src="./assets/noticias/coronavirus.jpg" alt="">
                            <div class="capa-notice">
                                <div class="detail-notice">
                                    <h1 class="title-notice">Titular de noticia</h1>
                                    <p>Ut mi tellus, lacinia ut mattis sit amet, auctor non nibh.
                                        Vestibulum varius diam nulla, sed pharetra sem dictum id.</p>
                                    <a class="view-more" href="newsSingle.html">Ver más</a>
                                </div>
                            </div>
                        </figure>
                    </div>

                  
                </div>
            </div>`;
                          }
                        });
                      });
                });
            });
        });
    });

})