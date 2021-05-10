const onGetProjects = (callback) => fs.collection("projects").onSnapshot(callback);


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
                                <div class="capa-icon" ><a href=""><i class="fas fa-search-plus"></i></a></div>
                                
                            </div>
                            <div class="capa2">
                                <p class="title-project">${project.nombre}</p>
                                <p>Tasación</p>
                   
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
                                                <div><i class="fas fa-long-arrow-alt-left"></i> <a href="./proyectos.html">Volver</a></div>
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


            const btnsRemove = document.querySelectorAll(".btnRemove");
            btnsRemove.forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    const r = confirm("¿Quieres eliminar esta noticia?");
                    if (r == true) {
                        await deletePost(e.target.dataset.id);
                    }
                });
            });

            const btnsEdit = document.querySelectorAll(".btnEdit");
            btnsEdit.forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    const doc = await getPostEdit(e.target.dataset.id);
                    console.log(doc.data());
                    const post = doc.data();
                    editStatus = true;
                    id = doc.id;
                    const inputTextArea = document.querySelector(".textarea");
                    inputTextArea.value = post.content;
                    btnNewPost.innerHTML = "Actualizar";
                });
            });
        });
    });
});