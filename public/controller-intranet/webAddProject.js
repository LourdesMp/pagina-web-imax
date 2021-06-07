const saveProjects = (nombre,servicio,description,urlCarrusel,urlProject,checkProjectHome,content, datetime,useruid) => {
  return fs.collection("projects").add({
    nombre,
    servicio,
    description,
    urlCarrusel,
    urlProject,
    checkProjectHome,
    content,
    useruid,
    datetime
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
        .ref(`projectCarrusel/${currentUser().email}/${dataFile.name}`);
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

let file;
const btnImgLarge = document.querySelector("#addImgLarge");
if (btnImgLarge) {
  btnImgLarge.addEventListener("change", (e) => {
    console.log("CLICK SUBIR IMAGEN", e.target.files[0]);
    // Get file
    file = e.target.files[0];
    if (file) {
      const storageRef = firebase
        .storage()
        .ref(`projectLarge/${currentUser().email}/${file.name}`);
      // Upload data
      const task = storageRef.put(file);
      console.log(task);
      // Update progress bar
      let urlProjectLarge = "";
      task.on(
        "state_changed",
        (snapshot) => {
          const percent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const progressCarrusel = document.querySelector(".progressline");
          progressCarrusel.parentNode.classList.add("show");
          progressCarrusel.innerText = `${percent.toFixed(0)}%`;
          progressCarrusel.style.width = `${percent}%`;
        },
        () => {},
        () => {
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            urlProjectLarge = downloadURL;
            sessionStorage.setItem("imgProjectLarge", urlProjectLarge);
          });
          setTimeout(() => {
          const progressCarrusel = document.querySelector(".progressline");
            progressCarrusel.parentNode.classList.remove("show");
          }, 2500);
        }
      );
    }
  });
}

const delFileStorage = (file) =>
  firebase
    .storage()
    .ref()
    .child(`postImage/${currentUser().email}/${file.name}`)
    .delete();

const btnDeleteImg = document.querySelector(".deleteImg");
console.log(btnDeleteImg);
if (btnDeleteImg) {
  btnDeleteImg.addEventListener("click", () => {
    const objFile = sessionStorage.getItem("imgNewPost");
    delFileStorage(objFile);
    sessionStorage.removeItem("imgNewPost");
    btnDeleteImg.parentNode.classList.add("hide");
  });
}

const generateProject = document.querySelector(".generate-project");

//  const progress = document.querySelector(".progressline");

//boton publicar nuevo post
generateProject.addEventListener("submit", (event) => {
  event.preventDefault();
  const userLogueado = firebase.auth().currentUser;
  console.log(userLogueado);
  const useruid = userLogueado.uid;
  const urlCarrusel = sessionStorage.getItem("imgCarrusel");
  const urlProject = sessionStorage.getItem("imgProjectLarge");
  const nombre = document.querySelector(".nameProject").value;

  const servicio = document.querySelector(".typeService").value;

  const description = document.querySelector(".descriptionProject").value;

  const checkProjectHome = document.querySelector(".checkProjectHome").value;

  const content = document.querySelector(".newPublication").value;
  const hours = new Date();
  const datetime = (`${hours.getFullYear()}${hours.getMonth() + 1}${hours.getDate()}${hours.getHours()}${hours.getMinutes()}${hours.getSeconds()}`);

  if (urlProject && urlCarrusel) {
    saveProjects(
      nombre,
      servicio,
      description,
      urlCarrusel,
      urlProject,
      checkProjectHome,
      content,
      datetime,
      useruid
    ).then(() => {
      // if (userLogueado !== null) {
      //   loadPostHome();
      // }
      sessionStorage.removeItem("imgCarrusel");
      sessionStorage.removeItem("imgProjectLarge");
      //  const pic = document.querySelector(".picPost");
      //  pic.parentNode.classList.add("hide");
      console.log("con foto");
      generateProject.reset();
      alert("Se guardó proyecto nuevo");
    });
  } else {
    alert("Por favor ingrese todos los datos");
  }
});
