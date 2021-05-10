let editStatus = false;
let id = '';

//Para nombres por defecto
const boxNameWorkerCts = document.querySelector('.nameWorkersCts');
console.log(boxNameWorkerCts)
boxNameWorkerCts.innerHTML = '',
fs.collection('users').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().leader}`);
        const userLogueado = firebase.auth().currentUser;
        const useruid = userLogueado.uid;
            boxNameWorkerCts.innerHTML += `
                <option value="${doc.id}">${doc.data().name}</option>`
      
       
       
    })
})



// ADMINISTRADOR GENERAR CTS
let file;
const currentUser = () => firebase.auth().currentUser;
const addCts = document.querySelector('.addImgCts')
  if(addCts){
    addCts.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      file = e.target.files[0];
      if(file){
        const storageRef = firebase.storage().ref(`ctsFile/${currentUser().email}/${file.name}`);
        const task = storageRef .put(file);
        console.log(task)
        let urlCts = '';
        // Update progress bar
          task.on('state_changed', () => {
            task.snapshot.ref.getDownloadURL()
              .then((url) => {
                console.log('File available at', url);
                urlCts = url;
                console.log('holaaaaaaaaaaaa', urlCts);
                sessionStorage.setItem('fileNewCts', urlCts);
              })
          });
       
    }
})
}



// ADMINISTRADOR GENERAR CTS
const generarCts = document.querySelector('.generate-ticket');
const btnGenerarCts = document.querySelector('.btn-generar-cts');
generarCts.addEventListener('submit', generarCtsFn = (e) => {
    e.preventDefault();
    console.log('hola');
    // const userLogueado = firebase.auth().currentUser;
    // console.log(userLogueado)
    // const useruid = userLogueado.uid;
    const boxIdCts = document.querySelector('.nameWorkersCts');
    const idWorkerCts = document.querySelector('.nameWorkersCts').value;
    const nameWorkerCts = boxIdCts.options[boxIdCts.selectedIndex].text;
    const yearCts = document.querySelector('.year').value;
    const monthCts = document.querySelector('.month-Cts').value; 
    const pageCts = document.querySelector('.page-cts').value;
    const urlCts = sessionStorage.getItem('fileNewCts');
    console.log(idWorkerCts, nameWorkerCts, yearCts,monthCts,pageCts, urlCts);
    if(urlCts){
      if(!editStatus){
        saveCts(idWorkerCts, nameWorkerCts, yearCts, monthCts,pageCts, urlCts).then(() => {
          sessionStorage.removeItem('fileNewCts');
          console.log('se registró constancia CTS');
          generarCts.reset();
          alert('se registró constancia CTS');
         
      });
      }
        
    }else {
      updateCts(id, {
        idWorkerCts : idWorkerCts,
        nameWorkerCts : nameWorkerCts, 
        yearCts: yearCts,
        monthCts : monthCts, 
        pageCts : pageCts, 

        } )

        alert('se actualizó constancia CTS');
        generarCts.reset();

}

editStatus = false;
id = '';
btnGenerarCts.innerHTML = 'Generar'
    

});

const saveCts = (idWorkerCts, nameWorkerCts,yearCts,monthCts,pageCts, urlCts) => {
    const firestore = fs;
    return firestore.collection('cts').add({
        idWorkerCts,
        nameWorkerCts,
        yearCts,
        monthCts,
        pageCts, 
        urlCts, 
        confirmacion: false
    });
};

// para mostrar los datos en la tabla'cts'
const onGetCts = (callback) => fs.collection('cts').onSnapshot(callback);
const getCtsEdit = (id) => fs.collection('cts').doc(id).get();
const getUsers = () => fs.collection('users').get();
const deleteCtsId = id => fs.collection('cts').doc(id).delete();
const updateCts = (id, contentCts) => fs.collection('cts').doc(id).update(contentCts);

const ctsContainer = document.querySelector('.table-cts')
console.log(ctsContainer)
window.addEventListener('DOMContentLoaded', async(e) => {
  onGetCts((querySnapshot)=>{
    ctsContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const cts = doc.data();
      console.log(cts)
      cts.id = doc.id;
      const user = firebase.auth().currentUser;
      ctsContainer.innerHTML +=  `
                              <tr class ="nameWorkerCts monthCts">
                                <td> ${cts.nameWorkerCts}</td>  
                                <td> ${cts.monthCts}- ${cts.yearCts}</td>
                                <td><a href=${cts.urlCts} download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
                                
                                <td>${cts.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${cts.confirmacion}  name="conformidad" data-id="${cts.id}"  readonly="readonly" onclick="javascript: return false;" checked>` : 
                                `<input type="checkbox" class="conformidad" value= ${cts.confirmacion}  name="conformidad" data-id="${cts.id}" readonly="readonly" onclick="javascript: return false;" > `} </td>
                                <td><i data-id="${cts.id}" class="btnEdit fas fa-edit"></i> <i class="deleteCts fas fa-trash-alt" data-id="${cts.id}"></i></td>
                              </tr>
                             `;


                             const searchName = document.querySelector('.searchNameCts')
                             console.log(searchName);
                       
                             const searchMonth = document.querySelector('.searchMonthCts')
                             console.log(searchMonth);
                       
                             const d = document;
                       
                             function searchFilter(input, selector) {
                               d.addEventListener('keyup', (e) => {
                                 if (e.target.matches(input)) {
                                   d.querySelectorAll(selector).forEach((el) =>
                                     el.textContent.toLowerCase().includes(e.target.value) ?
                                     el.classList.remove("hide") :
                                     el.classList.add("hide"))
                                 }
                               })
                             }
                       
                             searchFilter('.searchNameCts', '.nameWorkerCts')
                       
                             searchFilter('.searchMonthCts', '.monthCts')



    const deleteCts = document.querySelectorAll('.deleteCts');
    deleteCts.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const r = confirm('¿Quieres eliminar esta Constancia CTS?')
        if (r == true) {
          await deleteCtsId(e.target.dataset.id)
        } 
    
      })
    });

                  // const btnsEdit = document.querySelectorAll('.btnEdit');
                  // btnsEdit.forEach((btn) => {
                  //   btn.addEventListener('click', async(e) => {
                  //    const doc = await getPostEdit(e.target.dataset.id)
                  //    console.log(doc.data())
                  //    const post = doc.data();
                  //    editStatus = true;
                  //    id = doc.id;
                  //    const inputTextArea = document.querySelector ('.textarea');
                  //    inputTextArea.value = post.content;
                  //    btnNewPost.innerHTML = 'Actualizar'
                  //   })
                  // });

                  const btnsEdit = document.querySelectorAll('.btnEdit');
                  btnsEdit.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                      const doc = await getCtsEdit(e.target.dataset.id)
                      console.log(doc.data())
                      const cts = doc.data();
                      id = doc.id;
                      console.log(id)
                      editStatus = true;

                      const nameWorkerCts = document.querySelector('.nameWorkersCts');
                      nameWorkerCts.text = cts.nameWorkerCts;
                      nameWorkerCts.value = cts.idWorkerCts;
                      const yearCts = document.querySelector('.year'); 
                      yearCts.value = cts.yearCts;
                      const monthCts = document.querySelector('.month-Cts'); 
                      monthCts.value = cts.monthCts;
                      const pageCts = document.querySelector('.page-cts');
                      pageCts.value = cts.pageCts;
                      const urlCts = document.querySelector('.addImgCts');
            
                      console.log(nameWorkerCts.value, yearCts.value ,monthCts.value, pageCts.value, urlCts.file)
            
                      let res;
                      
            
                      fs.collection('cts').onSnapshot(async (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          console.log(`${doc.id} => ${doc.data().urlCts}`);
                          const constCts = doc.data();
                          constCts.id = doc.id;
                          console.log(constCts.id)
                          console.log(id)
                          if (constCts.id === id) {
                            res = constCts.urlCts;
                            console.log(res)
                            console.log('jaaaa')
                            console.log(res)
                            console.log(urlCts.file = res)
                            urlCts.file = res;
                            console.log(nameWorkerCts.value, yearCts.value,  monthCts.value, pageCts.value, urlCts.file)
                            editStatus = true;
                          
            
                          }
                        })
                       
            
            
                      
                      })
                      btnGenerarCts.innerHTML = 'Actualizar'
                    })
                  });
    });
  })
 
})