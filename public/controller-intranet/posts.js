let editStatus = false;
let id = '';

const savePost = (email, date, datetime, content,  url, useruid) => {
    return fs.collection('posts').add({
      email,
      date,
      datetime,
      content,
      url,
      useruid,
    });
};

const getPosts = () => fs.collection('posts').orderBy('orderDate', 'desc').get();

const getPostEdit = (id) => fs.collection('posts').doc(id).get();

const onGetPost = (callback) => fs.collection('posts').orderBy('datetime', 'desc').onSnapshot(callback);

const deletePost = id => fs.collection('posts').doc(id).delete();

const editPost = (id, contentPost) => fs.collection('posts').doc(id).update(contentPost);



const postContainer = document.querySelector('.container-post')
window.addEventListener('DOMContentLoaded', async(e) => {
  onGetPost((querySnapshot)=>{
    postContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const post = doc.data();
      post.id = doc.id;
      const user = firebase.auth().currentUser;
      postContainer.innerHTML +=  `
                  <div class="eachPost">
                    <div class="postHeader">
                        <div class="user-info">
                          <div class="circle-user"> <i class="user-icon fas fa-user"></i> </div> 
                          <div class= "dateUser">
                            <p id="nameUser"> Publicado por: ${post.email}</p>
                            <time datetime="date">${post.date} </time>
                          </div>
                        </div>
                        ${(user.uid === post.useruid) ? `
                        <div class="option-edit-post">
                          <span>...</span>
                            <ul class="optionPost"> 
                              <li class="btnEdit" data-id="${post.id}"> <i class="fas fa-edit"></i> Editar</li>
                              <li class="btnRemove" data-id="${post.id}"> <i class="fas fa-trash-alt"></i> Eliminar</li>
                            </ul>
                        </div>  ` : ''}      
                    </div>
                    <div class= "editPostOption">
                      <div class="contentPost">
                        <p contenteditable="false" id="editPost" >${post.content}</p>
                        ${post.url ? `<img id="photoPost" src="${post.url}">` : ''}
                      </div>
                    </div>
                  </div>`;


                  const btnsRemove = document.querySelectorAll('.btnRemove');
                  btnsRemove.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                      const r = confirm('¿Quieres eliminar esta noticia?')
                      if (r == true) {
                        await deletePost(e.target.dataset.id)
                      } 
                    })
                  });

                  const btnsEdit = document.querySelectorAll('.btnEdit');
                  btnsEdit.forEach((btn) => {
                    btn.addEventListener('click', async(e) => {
                     const doc = await getPostEdit(e.target.dataset.id)
                     console.log(doc.data())
                     const post = doc.data();
                     editStatus = true;
                     id = doc.id;
                     const inputTextArea = document.querySelector('.textarea');
                     inputTextArea.value = post.content;
                     btnNewPost.innerHTML = 'Actualizar'
                    })
                  });
    });
  })
 
})


  
  //evento para subir imagen
  let file;
  const currentUser = () => firebase.auth().currentUser;
  const btnAddImage = document.querySelector('#addImage');
  if(btnAddImage){
    btnAddImage.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      file = e.target.files[0];
      if (file) {
        const storageRef = firebase.storage().ref(`postImage/${currentUser().email}/${file.name}`);
        // Upload file
        const task = storageRef.put(file);
        console.log(task)
        // Update progress bar
        let url = '';
        task.on('state_changed', (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const progress = document.querySelector('.progressline');
          progress.parentNode.classList.add('show');
          progress.innerText = `${percent.toFixed(0)}%`;
          progress.style.width = `${percent}%`;
        }, () => {
        }, () => {
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            url = downloadURL;
            sessionStorage.setItem('imgNewPost', url);
            const pic = document.querySelector('.picPost');
            pic.parentNode.classList.remove('hide');
            pic.setAttribute('src', url)
          })
          setTimeout(() => {
            const progress = document.querySelector('.progressline');
            progress.parentNode.classList.remove('show');
          }, 2500);
        });
      }
    });
  };

  

  const  btnNewPost = document.querySelector('.btnNewPost');  
  const inputTextArea = document.querySelector ('.textarea');
  const progress = document.querySelector('.progressline');
  const f = new Date();
  const date = (`${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()}`);

//boton publicar nuevo post
  btnNewPost.addEventListener('click', (event) => {
    event.preventDefault();
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    const url = sessionStorage.getItem('imgNewPost');
    const email = userLogueado.providerData[0].email;
    const textToPost = inputTextArea.value;
    const hours = new Date();
    const datetime = (`${hours.getFullYear()}${hours.getMonth() + 1}${hours.getDate()}${hours.getHours()}${hours.getMinutes()}${hours.getSeconds()}`);
    if(url){
      if(!editStatus){
        savePost(email,  date, datetime, textToPost, url, useruid).then(() => {
          // if (userLogueado !== null) {
          //   loadPostHome();
          // }
          sessionStorage.removeItem('imgNewPost');
          const pic = document.querySelector('.picPost');
          pic.parentNode.classList.add('hide');
          console.log('con foto')
        });
      } else{
        
       editPost(id,{
          content:textToPost,
        })

        editStatus = false;
        id = '';
        btnNewPost.innerHTML = 'Publicar'
       }
      
    } else {

      if(!editStatus){
        savePost( email, date, datetime, textToPost, null, useruid).then(() => {
          // if (userLogueado !== null) {
          // //   loadPostHome();
          
          console.log('se publicó post')
          // }
        });
      }else{
        
        editPost(id,{
          content:textToPost,
        })

       editStatus = false;
        id = '';
       
        btnNewPost.innerHTML = 'Publicar'
       }
   
    }
    getPosts();
    inputTextArea.value = '';
    btnAddImage.value = '';
  });




  const delFileStorage = (file) => firebase.storage().ref().child(`postImage/${currentUser().email}/${file.name}`).delete();

  const btnDeleteImg = document.querySelector('.deleteImg');
  if (btnDeleteImg) {
    btnDeleteImg.addEventListener('click', () => {
      const objFile =  sessionStorage.getItem('imgNewPost');;
      delFileStorage(objFile);
      sessionStorage.removeItem('imgNewPost');
      btnDeleteImg.parentNode.classList.add('hide');
    });
  }


//prueba 




// const editPost = (id, content) => fs.collection('posts').doc(id).update({ content });
// const deletePost = id => fs.collection('posts').doc(id).delete(); 

// const postsList = document.querySelector('.posts');
// const setupPosts = data => {
//     if (data.length) {
//         let posts = '';
//         const user = firebase.auth().currentUser;
//         data.forEach(doc=> {
//             const post = doc.data();
//             console.log(post)
//             const li = `
//             <div>
//               <div class="postHeader">
//                   <div class="user-info">
//                     <div class= "dateUser">
//                       <p id="nameUser"> Publicado por: ${post.email}</p>
//                       <time datetime="date">${post.date} </time>
//                     </div>
//                   </div>
//                   ${(user.uid === post.useruid) ? `
//                   <div class="option-edit-post">
//                     <span>...</span>
//                       <ul class="optionPost"> 
//                         <li class="btnEdit">Editar</li>
//                         <li class="btnRemove">Eliminar</li>
//                       </ul>
//                   </div>  ` : ''}      
//               </div>
//               <div class= "editPostOption">
//                 <div class="contentPost">
//                   <p contenteditable="false" id="editPost" >${post.content}</p>
//                   ${post.url ? `<img id="photoPost" src="${post.url}">` : ''}
//                 </div>
//                 <button class="hide" hidden id="btnSave">💾</button>
//                 <button class="hide" hidden id="btnCancel">✖️</button>
//               </div>
//             </div>`;

//             posts += li;
//         });

//         postsList.innerHTML= posts;
//     } else {
//         postsList.innerHTML= `<p>No existen post en este momento</p>`;
//     }
// }

// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       fs.collection('posts')
//       .get()
//       .then((snapshot) => {
//           console.log(snapshot.docs);
//           setupPosts(snapshot.docs)
//       })
//     } else {
//       console.log('auth: sign out');
//       setupPosts([])
//     }
//   });

 