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
const onGetVacation = (callback) => firebase.firestore().collection('vacation').onSnapshot(callback);
const getUsers = () => firebase.firestore().collection('users').get();
const getCts = () => firebase.firestore().collection().get();

const vacationContainer = document.querySelector('.table-vacation')
window.addEventListener('DOMContentLoaded', async(e) => {
    onGetVacation((querySnapshot)=>{
    vacationContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const vacation = doc.data();
      console.log(vacation)
      vacation.id = doc.id;
      const user = firebase.auth().currentUser;
      vacationContainer.innerHTML +=  `
                                        <tr>
                                        <td>${vacation.nameWorker}</td>  
                                        <td>${vacation.startOfVacation} al ${vacation.endOfVacation}</td>
                                        <td>Pendientes: ${vacation.vacationPending} días <br>
                                            Vencen: ${(vacation.resDateExpireYear) ? vacation.resDateExpireYear : vacation.resDateExpireYear2} </td>
                                        <td><input type="checkbox" id="cbox2" value="conformidad">  </td>
                                        </tr> 
                             `;
    });
  })
 
})