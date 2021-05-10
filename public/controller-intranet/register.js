
//CAPTURANDO EL URL DE LA FIRMA ELECTRONICA
let file;
const currentUser = () => firebase.auth().currentUser;
console.log(currentUser.email)
const firmRegister = document.querySelector('.firm-register');
  console.log(firmRegister)
  if(firmRegister){
    firmRegister.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      let file = e.target.files[0];
      if(file){
        const storageRef = firebase.storage().ref(`firmRegister/${currentUser().email}/${file.name}`);
        const task = storageRef.put(file);
        console.log(task)
        let urlfirmRegister = '';
        // Update progress bar
          task.on('state_changed', () => {
            task.snapshot.ref.getDownloadURL()
              .then((url) => {
                console.log('File available at', url);
                urlfirmRegister = url;
                console.log('holaaaaaaaaaaaa', urlfirmRegister);
                sessionStorage.setItem('firmRegister', urlfirmRegister);
              })
             
          });
       
    }
})
}


const emailWorker = document.querySelector('.email-register');
console.log(emailWorker)
emailWorker.innerHTML = '';
fs.collection('users').onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().leader}`);
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    const user = doc.data()
    user.id = doc.id;
    emailWorker.innerHTML += `
                <option value="${user.email}" >${doc.data().email}</option>`
  })
})



// REGISTRANDO USUARIOS 
const register = document.querySelector('.box-fill-data');
register.addEventListener('submit', (e) => {
  e.preventDefault();
  fs.collection('users').get().then((querySnapshot)=>{
    querySnapshot.forEach(doc => {
      const user = doc.data();
      console.log(user)
      user.id = doc.id;
      const docId = user.id;
      // const userLogueado = firebase.auth().currentUser;
      const email = document.querySelector('.email-register').value;
      console.log(docId)
      console.log(email)
      console.log(user.email)   
      if (email === user.email) {
        const name = document.querySelector('.name-register').value;
        const checkAdmin = document.querySelector('.checkAdmin').value;
        const dni = document.querySelector('.dni-register').value;
        const phone= document.querySelector('.phone-register').value;
        const area = document.querySelector('.area-register').value;
        const leader = document.querySelector('.leader-register').value;
        const entryDay = document.querySelector('.fechaAdmin').value;
        const salarioAdmin= document.querySelector('.salarioAdmin-register').value;
        const urlfirmRegister = sessionStorage.getItem('firmRegister');
        const checkLider = document.querySelector('.checkLider').value;
        console.log(name, checkAdmin, dni, phone, area,leader,entryDay,salarioAdmin,urlfirmRegister,checkLider)
        const cityRef = firebase.firestore().collection('users').doc(docId);
        const res = cityRef.update({
        name, 
        checkAdmin,
        email,
        dni, 
        phone, 
        area,
        leader,
        entryDay,
        salarioAdmin,
        urlfirmRegister,
        checkLider

       }, { merge: true });
       register.reset();
       alert('Los datos han sido guardados')
       window.onload()
       
      }
    })
  })
})    


// register.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const name = document.querySelector('.name-register').value;
//   const checkAdmin = document.querySelector('.checkAdmin').value;
//   const dni = document.querySelector('.dni-register').value;
//   const phone= document.querySelector('.phone-register').value;
//   const email = document.querySelector('.email-register').value;
//   const password = document.querySelector('.password-register').value;
//   const area = document.querySelector('.area-register').value;
//   const leader = document.querySelector('.leader-register').value;
//   const entryDay = document.querySelector('.fechaAdmin').value;
//   const salarioAdmin= document.querySelector('.salarioAdmin-register').value;
//   const urlfirmRegister = sessionStorage.getItem('firmRegister');
//   const checkLider = document.querySelector('.checkLider').value;
//   console.log(name, checkAdmin, dni, phone, email, password, area,leader,entryDay,salarioAdmin,urlfirmRegister,checkLider)
  
//   firebase.auth().createUserWithEmailAndPassword(email,  password)
//   .then(userCredential => {
//     const db = firebase.firestore();
//       return db.collection('users').doc(userCredential.user.uid).set({
//         name, 
//         checkAdmin,
//         dni, 
//         phone, 
//         email, 
//         password, 
//         area,
//         leader,
//         entryDay,
//         salarioAdmin,
//         urlfirmRegister,
//         checkLider
//       });
     
//   }).then(() => {
//     register.reset();
//     alert('Se agregó un nuevo colaborador'); 
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     if (errorCode === 'auth/weak-password') {
//       document.querySelector('#reg_error_inner').innerHTML = 'La contraseña es demasiado débil. Utlice letras y números';
//     } else {
//       document.querySelector('#reg_error_inner').innerHTML = errorMessage;
//     }
//   });

// });

// PARA MOSTRAR DATOS EN LA TABLA DE BOLETAS
const onGetUsers = (callback) => firebase.firestore().collection('users').onSnapshot(callback);
const getUsers = () => firebase.firestore().collection('users').get();
const deleteUserReg = id => firebase.firestore().collection('users').doc(id).delete();
const editPost = (id, name, checkAdmin, dni, phone, email, area,leader,entryDay,salarioAdmin,checkLider) => firebase.firestore().collection('posts').doc(id).update({ 
  name, 
  checkAdmin, 
  dni, 
  phone, 
  email, 
  area,
  leader,
  entryDay,
  salarioAdmin,
  checkLider });

const userContainer = document.querySelector('.table-users')
window.addEventListener('DOMContentLoaded', async(e) => {
  onGetUsers((querySnapshot)=>{
    userContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const user = doc.data();
      console.log(user)
      user.id = doc.id;
      const users = firebase.auth().currentUser;
      userContainer.innerHTML +=  `
                                <tr class="row-users" contenteditable="false" data-id="${user.id}">
                                  <td data-id="${user.id}" class="nameUser"> ${user.name}</td>  
                                  <td data-id="${user.id}" class="dniUser">${user.dni}</td>
                                  <td data-id="${user.id}" class="phoneUser">${user.phone}</td>
                                  <td data-id="${user.id}" class="emailUser">${user.email}</td>  
                                  <td data-id="${user.id}" class="areaUser">${user.area}</td>  
                                  <td data-id="${user.id}" class="leaderUser">${user.leader}</td>
                                  <td data-id="${user.id}" class="fechaUser">${user.entryDay}</td>  
                                  <td data-id="${user.id}" class="salarioAdminUser">${user.salarioAdmin}</td>
                                  <td><a href=${user.urlfirmRegister} download="Boleta.pdf"><button><i class="fas fa-download"></i>Descargar</button></a></td>
                                  <td data-id="${user.id}" class="checkUser">${user.checkAdmin}</td>
                                  <td data-id="${user.id}" class="checkLider">${user.checkLider}</td>
                                  <td><i data-id="${user.id}" class="btn-editUser fas fa-edit"></i> <button data-id="${user.id}" class="btnSaveFile" id="btnSaveFile">💾</button> <i class="btn-delUser fas fa-trash-alt" data-id="${user.id}" data-name="${user.name}"></i></td>
                                </tr>  

                                
                             `;

                            
                  const deleteUser = document.querySelectorAll('.btn-delUser');
                  deleteUser.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                            const txt = e.target.dataset.name;
                            const r = confirm('¿Quieres eliminar a ' + txt + '?');
                            if (r == true) {
                               deleteUserReg(e.target.dataset.id);
                            } else {
                              console.log('nose eliminó')
                            } 
                          
                        
                      
                         
                    })
                  });

                  const btnEditRow = document.querySelectorAll('.btn-editUser');
               
                  const btnUpdateRow = document.querySelectorAll('.btnSaveFile');
                  const editableRow = document.querySelectorAll('.row-users');
                  
                  btnEditRow.forEach(edit => {
                    edit.addEventListener('click', (e) => {
                      console.log('clickeando editar');
                      console.log(e.target.dataset.id);
                      console.log(doc.data());
                      fs.collection('users').get().then((querySnapshot)=>{
                            querySnapshot.forEach(doc => {
                              console.log(doc.id)
                              if(e.target.dataset.id === doc.id){
                                console.log(e.target.dataset.id);
                                console.log(doc.id);
                                editableRow.contentEditable = 'true';
                                editableRow.forEach(row => {
                                  console.log('holay')
                                  row.addEventListener('click', (e) => {
                                    console.log('holassss')
                                    console.log(e.target.dataset.id);
                                    console.log(doc.id);
                                    if(e.target.dataset.id === doc.id){
                                      row.contentEditable = 'true';
                                      row.style.background = 'blue';
                                      row.style.color = 'red';
                                      // row.focus()='true';
                                    }
                                  })
                                })
                              }
                            })
                      })
                      
                    });
                  })  

                  btnUpdateRow.forEach(update => {
                    update.addEventListener('click', (e) =>{
                    console.log(update);
                    const docId = e.target.dataset.id;
                    editableRow.forEach(row => {
                      console.log('holay')
                      row.addEventListener('click', (e) => {
                        if(e.target.dataset.id === docId){
                          console.log('aaaaaaaaaa')
                          const name = row.querySelector('.nameUser').innerHTML;
                          const checkAdmin = row.querySelector('.checkUser').innerHTML;
                          const dni = row.querySelector('.dniUser').innerHTML;
                          const phone= row.querySelector('.phoneUser').innerHTML;
                          const email = row.querySelector('.emailUser').innerHTML;
                          const area = row.querySelector('.areaUser').innerHTML;
                          const leader = row.querySelector('.leaderUser').innerHTML;
                          const entryDay = row.querySelector('.fechaUser').innerHTML;
                          const salarioAdmin= row.querySelector('.salarioAdminUser').innerHTML;
                          const checkLider = row.querySelector('.checkLider').innerHTML;
                          console.log(name, checkAdmin, dni, phone, email, area,leader,entryDay,salarioAdmin, checkLider)
                          const cityRef = firebase.firestore().collection('users').doc(docId );
                          const res = cityRef.update({
                            name, 
                            checkAdmin,
                            dni, 
                            phone, 
                            email, 
                            area,
                            leader,
                            entryDay,
                            salarioAdmin,
                            checkLider
      
                         }, { merge: true });
                         alert('Se han actualizado los datos')
                        }
                      
                      })
                    }) 
                
                    })
                  })
    });
  })
 
})


//funcion para mostrar lista de colaboradores en workerAdmin
const btnlista = document.querySelector('.list-worker');
const btnBack = document.querySelector('.back-worker');
const listWorker = document.querySelector('.container-boletas');
const addworker = document.querySelector('.container-add-worker');
  btnlista.addEventListener('click', () => {
    listWorker.classList.toggle('show');
    addworker.classList.remove('show');
    addworker.classList.toggle('hide');
    console.log('click');
  });

  btnBack.addEventListener('click', () => {
  listWorker.classList.remove('show');
  listWorker.classList.add('hide');
  addworker.classList.remove('hide');
  addworker.classList.toggle('show');
  console.log('click');
});



