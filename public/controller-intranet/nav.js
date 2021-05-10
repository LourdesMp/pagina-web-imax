const menuMobile = document.querySelector('.pagos');
const navHome = document.querySelector('.nav-home');
menuMobile.addEventListener('click', () => {
  navHome.classList.toggle('hide');
  console.log('click');
});

// const menuAdmin = document.querySelector('.admin');
// const navAdmin = document.querySelector('.nav-admin');
// menuAdmin.addEventListener('click', () => {
//   navAdmin.classList.toggle('hide');
//   console.log('click');
// })

//funcion para ATRAS en lista de colaboradores
// const btnBack = document.querySelector('.back-worker');
// const listBoletas = document.querySelector('.container-boletas');
// const containerBoleta = document.querySelector('.container-add-worker');
// btnBack.addEventListener('click', () => {
//   listBoletas.classList.toggle('show');
//   containerBoleta.classList.toggle('hide');
//   console.log('click');
// });

const onlyAdmin = document.querySelector('.only-admin')
fs.collection('users').onSnapshot((querySnapshot) => {
  onlyAdmin.innerHTML = '';
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().checkAdmin}`);
    const userLogueado = firebase.auth().currentUser;

    if (doc.id === userLogueado.uid) {
      if (doc.data().checkAdmin === 'SI') {
        onlyAdmin.innerHTML += `
          <li><a href="#/" class="admin">Administrador
          <ul class="nav-admin hide">
              <a href="boletasAdmin.html" ><li class="btn-admin-boletas second-parent" >Ingresar Boletas</li></a>
              <a href="ctsAdmin.html" ><li class="btn-admi-const second-parent" >Ingresar CTS</li></a>
              <a href="vacactionsAdmin.html" ><li class="btn-admi-const second-parent" >Solicitud Vacaciones</li></a>
              <a href="workerAdmin.html" ><li class="btn-admi-const second-parent" >Agregar Colaborador</li></a>
          </ul>
        </a> </li>
        <li><a href="#/" class="admin-web">Herramientas IMAX
        <ul class="nav-admin-web hide">
              <a href="projectsWeb.html" ><li class="btn-admin-boletas second-parent" >Agregar Noticia Web</li></a>
              <a href="webAddProject.html" ><li class="btn-admi-const second-parent" >Agregar Proyecto </li></a>
          </ul>
        </a></li> `;

        // const menuAdmin = document.querySelector('.admin');
        // console.log(menuAdmin)
        // const navAdmin = document.querySelector('.nav-admin');
        // menuAdmin.addEventListener('click', () => {
        //   navAdmin.classList.toggle('hide');
        //   console.log('click');
        // })

        // const menuAdminWeb = document.querySelector(".admin-web");
        // console.log(menuAdminWeb)
        // const navAdminWeb = document.querySelector(".nav-admin-web");
        // menuAdminWeb.addEventListener("click", () => {
        //   navAdminWeb.classList.toggle("hide");
        //   console.log("click");
        // });
      }

      if (doc.data().checkLider === 'SI') {
        onlyAdmin.innerHTML += `
        <li><a href="vacationsLider.html">Lider de Unidad</a></li>`;
        const menuAdmin = document.querySelector('.admin');
        const navAdmin = document.querySelector('.nav-admin');
        menuAdmin.addEventListener('click', () => {
          navAdmin.classList.toggle('hide');
          console.log('click');
        })

         const menuAdminWeb = document.querySelector(".admin-web");
         console.log(menuAdminWeb);
         const navAdminWeb = document.querySelector(".nav-admin-web");
         menuAdminWeb.addEventListener("click", () => {
           navAdminWeb.classList.toggle("hide");
           console.log("click");
         });
      }


    }

  });

})


const userNew = document.querySelector('.user-new')
userNew.innerHTML = ''; 
fs.collection('users').onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().checkAdmin}`);
    const userLogueado = firebase.auth().currentUser;
    const user = doc.data();
    if (doc.id === userLogueado.uid) {
        userNew.innerHTML += `
        <p class="userLog"><i class="fas fa-user"></i>${user.name}</p>`;
        userLogueado.updateProfile({
          displayName: user.name,
        }).then(function() {
         console.log('correcto')
         console.log(userLogueado)
        });

  
      }

    })

  });

  

//funcion para cerra sesion
const logOut = document.querySelector('.logOut');
logOut.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('sign out')
    location.href = "../intranet.html"
  }).catch()
})