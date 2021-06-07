

 // FUNCIONES PARA FORMULARIO DE NOTICIAS ******************************************************

 const saveArticle = (nameArticle, dateArticle, urlArticleCarrusel, urlArticle,descriptionArticle, contentArticle, datetime, useruid) => {
   return fs.collection("articles").add({
     nameArticle,
     dateArticle, 
     urlArticleCarrusel,
     urlArticle,
     descriptionArticle,
     contentArticle,
     datetime,
      useruid
    
   });
 };

 let dataFile;
const currentUser = () => firebase.auth().currentUser;
const btnImgCarrusel = document.querySelector("#addImgCarrusel");
if (btnImgCarrusel) {
  btnImgCarrusel.addEventListener("change", (e) => {
    console.log("CLICK SUBIR IMAGEN", e.target.files[0]);
    // Get file
    dataFile = e.target.files[0];
    if (dataFile) {
      const storageRef = firebase
        .storage()
        .ref(`noticeCarrusel/${currentUser().email}/${dataFile.name}`);
      // Upload data
      const task = storageRef.put(dataFile);
      console.log(task);
      // Update progress bar
      let urlCarrusel = "";
      task.on(
        "state_changed",
        (snapshot) => {
          const percent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const progressCarrusel = document.querySelector(".progresslineCarrusel");
          progressCarrusel.parentNode.classList.add("show");
          progressCarrusel.innerText = `${percent.toFixed(0)}%`;
          progressCarrusel.style.width = `${percent}%`;
        },
        () => {},
        () => {
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            urlCarrusel = downloadURL;
            sessionStorage.setItem("imgCarrusel", urlCarrusel);
          });
            setTimeout(() => {
            const progressCarrusel = document.querySelector(".progresslineCarrusel");
            progressCarrusel.parentNode.classList.remove("show");
          }, 2500);
        }
      );
    }
  });
}

 let fileArticle;
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
           const progressArticle = document.querySelector( ".progresslineArticle");
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
           setTimeout(() => {
            const progressArticle = document.querySelector( ".progresslineArticle");
            progressArticle.parentNode.classList.remove("show");
          }, 2500);
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
   const urlArticleCarrusel = sessionStorage.getItem("imgCarrusel");
   const urlArticle = sessionStorage.getItem("imgArticle");
   const nameArticle = document.querySelector(".nameArticle").value;
   const dateArticle = document.querySelector(".fechaAdmin").value
   const descriptionArticle = document.querySelector(".descriptionArticle").value;
   const contentArticle = document.querySelector(".newArticle").value;
   const hours = new Date();
   const datetime = (`${hours.getFullYear()}${hours.getMonth() + 1}${hours.getDate()}${hours.getHours()}${hours.getMinutes()}${hours.getSeconds()}`);

   if (urlArticle && urlArticleCarrusel) {
     saveArticle(nameArticle, dateArticle, urlArticleCarrusel, urlArticle, descriptionArticle, contentArticle, datetime,  useruid).then(() => {
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


