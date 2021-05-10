// PARA MOSTRAR EN LA TABLA DE VACACIONES LIDER

// var db = firebase.firestore();
// const traerId =  db.collection("users").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(doc.id);
//         const onGetVacationss = doc.id;
//         return onGetVacationss;
//     });
// });

// traerId=db.collection("users").get().then((res)=>console.log(res))

// const onGetVacation = (callback) => firebase.firestore().collection('users').doc('k8Y5ZGjnxFatZ066T6njvIdUrfw2').collection('vacation').onSnapshot(callback);
const onGetVacation = (callback) => fs.collection('vacation').onSnapshot(callback);
const getUsers = () => fs.collection('users').get();
const getCts = () => fs.collection().get();

const vacationContainer = document.querySelector('.table-vacation')
window.addEventListener('DOMContentLoaded', async (e) => {
  onGetVacation((querySnapshot) => {
    vacationContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const vacation = doc.data();
      console.log(vacation)
      const userLogueado = firebase.auth().currentUser;
      console.log(userLogueado)
      vacation.id = doc.id;
      console.log(userLogueado.displayName)
      console.log(vacation.bossInmediate)
      if(userLogueado.displayName === vacation.bossInmediate){
        vacationContainer.innerHTML += `
        <tr class="nameWorker">
        <td>${vacation.nameWorker}</td>  
        <td>${vacation.startOfVacation} al ${vacation.endOfVacation}</td>
        <td>Pendientes: ${vacation.vacationPending} días <br>
            Vencen: ${(vacation.resDateExpireYear) ? vacation.resDateExpireYear : vacation.resDateExpireYear2} </td>
        <td>${vacation.confirmacion === true ? `<input type="checkbox" class="conformidadLider" value= ${vacation.confirmacion}  name="conformidad" data-id="${vacation.id}"  checked >` : 
        `<input type="checkbox" class="conformidad" value= ${vacation.confirmacion}  name="conformidad"  data-id="${vacation.id}" > `} </td>
        </tr> 
`;
      }

    });


    const searchName = document.querySelector('.search')
    console.log(searchName);

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

    searchFilter('.search', '.nameWorker')

    

    const checkboxs = document.querySelectorAll('.conformidad');
    checkboxs.forEach(check => {
      check.addEventListener('change', function (e) {
        if (this.checked) {
          console.log('click pe')
          querySnapshot.forEach(doc => {
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {
              console.log('joalaaa')
              confirm('¿Desea dar el VB a la solicitud de vacaciones?')
              const cityRef = fs.collection('vacation').doc(doc.id);
              const res = cityRef.update({
                confirmacion: true
              }, {
                merge: true
              });
            }

          })
        
        } else {
          querySnapshot.forEach(doc => {
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {
              console.log('joalaaa')
              // confirm('¿Desea dar el VB a la solicitud de vacaciones?')
              // window.localStorage.removeItem(doc.id, false)
              // window.localStorage.setItem(doc.id, false)
              const cityRef = fs.collection('vacation').doc(doc.id);
              const res = cityRef.update({
                confirmacion: false
              }, {
                merge: true
              });
            }
          })
        }
      })
    })



  })

  // onGetVacation((querySnapshot) => {
  //   const checkboxs = document.querySelectorAll('.conformidad');
  //   console.log(checkboxs)
  //   checkboxs.forEach(check => {
  //     check.addEventListener('change', function (e) {
  //       if (this.checked) {
  //         querySnapshot.forEach(doc => {
  //           console.log(`${doc.id}`);
  //           console.log(e.target.dataset.id)
  //           if (e.target.dataset.id === doc.id) {
  //             console.log('joalaaa')
  //             confirm('¿Desea dar el VB a la solicitud de vacaciones?')
  //             const cityRef = fs.collection('vacation').doc(doc.id);
  //             const res = cityRef.set({
  //               confirmacion: true
  //             }, {
  //               merge: true
  //             });


  //           }
  //           //    fs.collection('vacation').onSnapshot((querySnapshot) => {
  //           //    querySnapshot.forEach(doc => {
  //           //      const vacation = doc.data();
  //           //      console.log(`${doc.id} => ${vacation.id}`);

  //           //      console.log(vacation.id)


  //           //      if( vacation.id === doc.id){
  //           //          const cityRef = fs.collection('vacation').doc(doc.id);
  //           //          const res = cityRef.update({
  //           //            confirmacion : true
  //           //          }, { merge: true });
  //           //      }
  //           //    })
  //           //  })
  //         })

  //       } else {
  //         querySnapshot.forEach(doc => {
  //           console.log(`${doc.id}`);
  //           console.log(e.target.dataset.id)
  //           if (e.target.dataset.id === doc.id) {
  //             console.log('joalaaa')

  //             const cityRef = fs.collection('vacation').doc(doc.id);
  //             const res = cityRef.set({
  //               confirmacion: false
  //             }, {
  //               merge: true
  //             });
  //           }
  //         })
  //       }
  //       //else {
  //       //    fs.collection('vacation').onSnapshot((querySnapshot) => {
  //       //      querySnapshot.forEach((doc) => {
  //       //          console.log(`${doc.id} => ${doc.data().useruid}`);
  //       //          const userLogueado = firebase.auth().currentUser;
  //       //          const useruid = userLogueado.uid;
  //       //          if(useruid === doc.data().useruid){
  //       //              const cityRef = firebase.firestore().collection('vacation').doc(doc.id);
  //       //              const res = cityRef.update({
  //       //                confirmacion : false
  //       //              }, { merge: true });
  //       //          }

  //       //      })
  //       //  })
  //       //  }
  //     });
  //   })
  // })
})

