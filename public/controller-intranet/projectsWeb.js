

 // FUNCIONES PARA FORMULARIO DE NOTICIAS ******************************************************

 const saveArticle = (nameArticle,urlArticle,descriptionArticle, contentArticle) => {
   return fs.collection("articles").add({
     nameArticle,
     urlArticle,
     descriptionArticle,
     contentArticle,
    
   });
 };

 let fileArticle;
 const currentUser = () => firebase.auth().currentUser;
 const btnImgArticle = document.querySelector("#addImgArticle");
 if (btnImgArticle) {
   btnImgArticle.addEventListener("change", (e) => {
     console.log("CLICK SUBIR IMAGEN", e.target.files[0]);
     // Get file
     fileArticle = e.target.files[0];
     if (fileArticle) {
       const storageRef = firebase
         .storage()
         .ref(`projectArticle/${currentUser().email}/${fileArticle.name}`);
       // Upload data
       const task = storageRef.put(fileArticle);
       console.log(task);
       // Update progress bar
       let urlArticle = "";
       task.on(
         "state_changed",
         (snapshot) => {
           const percent =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           const progressArticle = document.querySelector(
             ".progresslineArticle"
           );
           progressArticle.parentNode.classList.add("show");
           progressArticle.innerText = `${percent.toFixed(0)}%`;
           progressArticle.style.width = `${percent}%`;
         },
         () => {},
         () => {
           task.snapshot.ref.getDownloadURL().then((downloadURL) => {
             console.log("File available at", downloadURL);
             urlArticle = downloadURL;
             sessionStorage.setItem("imgArticle", urlArticle);
           });
         }
       );
     }
   });
 }

 const generateArticle = document.querySelector(".generate-article");

 //  const progress = document.querySelector(".progressline");

 //boton publicar nuevo post
 generateArticle.addEventListener("submit", (event) => {
   event.preventDefault();
   const userLogueado = firebase.auth().currentUser;
   console.log(userLogueado);
   const useruid = userLogueado.uid;
   const urlArticle = sessionStorage.getItem("imgArticle");
   const nameArticle = document.querySelector(".nameArticle").value;
   const descriptionArticle = document.querySelector(".descriptionArticle").value;
   const contentArticle = document.querySelector(".newArticle").value;

   if (urlArticle) {
     saveArticle(nameArticle, urlArticle, descriptionArticle, contentArticle,  useruid).then(() => {
       // if (userLogueado !== null) {
       //   loadPostHome();
       // }
       sessionStorage.removeItem("imgArticle");
       //  const pic = document.querySelector(".picPost");
       //  pic.parentNode.classList.add("hide");
       console.log("noticia con foto");
       generateArticle.reset();
       alert("Se guardó una noticia nueva");
     });
   } else {
     alert("Por favor ingrese todos los datos");
   }
 });


