const onGetVacation = (callback) => fs.collection('vacation').onSnapshot(callback);

const vacationContainer = document.querySelector('.table-vacation-lider')
window.addEventListener('DOMContentLoaded', async (e) => {
  onGetVacation((querySnapshot) => {
    vacationContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const vacation = doc.data();
      console.log(vacation)
      vacation.id = doc.id;
      const user = firebase.auth().currentUser;
      if(vacation.confirmacion===true){
        vacationContainer.innerHTML += `

        <tr class="nameWorker">
          <td>${vacation.nameWorker}</td>  
          <td>${vacation.startOfVacation} al ${vacation.endOfVacation}</td>
          <td>${vacation.area}</td>
          <td>Pendientes: ${vacation.vacationPending} días <br>
          Vencen: ${(vacation.resDateExpireYear) ? vacation.resDateExpireYear : vacation.resDateExpireYear2} </td>
          <td><button onclick="generatePDF()"><i class="fas fa-download"></i> Imprimir</button></td>
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



  })


})

// function generatePDF(){
//   const element = document.querySelector('.box-boleta');

//   html2pdf()
//   .from(element)
//   .save();
// }
