const onGetProjects = (callback) => fs.collection("projects").orderBy('datetime', 'desc').onSnapshot(callback);

const projectContainer = document.querySelector(".box-par");
window.addEventListener("DOMContentLoaded", async (e) => {
    onGetProjects((querySnapshot) => {
        projectContainer.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const project = doc.data();
            console.log(project)
            project.id = doc.id;
            const user = firebase.auth().currentUser;
            projectContainer.innerHTML += `
            
            <div class="square">
                    <figure>
                        <img class="img-carrusel" src=${project.urlCarrusel} alt="">
                        <div class="capa-detailed">
                            <div class="capa1">
                                <div class="capa-icon"><button ><i data-id="${project.id}"class="link-project fas fa-link"></i></button></div>
                                <div class="capa-icon" ><button ><i data-id="${project.id}"class="link-img-project fas fa-search-plus"></i></button></div>
                                
                            </div>
                            <div class="capa2">
                                <p class="title-project">${project.nombre}</p>
                                <p>${project.servicio}</p>
                   
                            </div>
                        </div>
                    </figure>
                </div>`;

            let linkIndicador = "";
            const galleryProjectsContainer = document.querySelector(".projects-gallery-container");

            const projectContainerSingle = document.querySelector(".single-project");
            console.log(projectContainerSingle);
            const linksProject = document.querySelectorAll(".link-project");
            console.log(linksProject);
            linksProject.forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    console.log(e.target.dataset.id);
                    linkIndicador = e.target.dataset.id;

                    console.log('haaaaaaa')
                    onGetProjects((querySnapshot) => {
                        projectContainerSingle.innerHTML = "";
                        querySnapshot.forEach((doc) => {
                            const project = doc.data();
                            project.id = doc.id;
                            const user = firebase.auth().currentUser;
                            console.log(project.id);
                            console.log(linkIndicador);

                            if (project.id === linkIndicador) {

                                projectContainerSingle.classList.toggle("show");
                                galleryProjectsContainer.classList.remove("show");
                                galleryProjectsContainer.classList.toggle("hide");
                                console.log("click");
                                projectContainerSingle.innerHTML += `

                                    <div class="head-project">
                                                <h1>${project.nombre} (${project.servicio})</h1>
                                                <div> <a href="./proyectos.html"><img src="../assets/iconos/back1.png" alt="servicios-imax"> <p>Volver</p> </a></div>
                                    
                                    </div>
                                    <div class="box-img"><img src="${project.urlProject}" alt=""></div>

                                    <div class="text-project">
                                        <p>${project.content}
                                        </p>
                                    </div>`;
                            }
                        });
                    });

                });
            });





            const modelProject = document.createElement("div");
            modelProject.classList = "model-project";

            let linkIndicadorImg = "";
            // const projectSingleImg = document.querySelector(".single-project-img");
            // console.log(projectSingleImg);
            const linksProjectImg = document.querySelectorAll(".link-img-project");
            console.log(linksProjectImg);
            linksProjectImg.forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    console.log(e.target.dataset.id);
                    linkIndicadorImg = e.target.dataset.id;

                    console.log("haaaaaaa");
                    onGetProjects((querySnapshot) => {
                        modelProject.innerHTML = "";
                        modelProject.classList.add("active")
                        querySnapshot.forEach((doc) => {
                            const project = doc.data();
                            project.id = doc.id;
                            const user = firebase.auth().currentUser;
                            console.log(project.id);
                            console.log(linkIndicadorImg);

                            if (project.id === linkIndicadorImg) {
                                //   modelProject.classList.toggle("show");
                                //   galleryProjectsContainer.classList.remove("show");
                                //   galleryProjectsContainer.classList.toggle("hide");
                                console.log("click");
                                modelProject.innerHTML += `

                                    
                                        
                                         <img src="${project.urlCarrusel}" alt="">

                                    `;
                                    modelProject.addEventListener('click', () => {
                                    modelProject.classList.remove("active")
                                    modelProject.classList.add("hide")
                                })

                            }

                        });

                    });

                });

            });


            galleryProjectsContainer.appendChild(modelProject)







        });
    });
});