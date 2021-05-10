// para mostrar los datos en la tabla'pages'
const onGetPages = (callback) => fs.collection('pages').onSnapshot(callback);
const getUsers = () => fs.collection('users').get();
const getPages = () => fs.collection().get();

const pageContainer = document.querySelector('.table-page')
window.addEventListener('DOMContentLoaded', async (e) => {
  onGetPages((querySnapshot) => {
    pageContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const page = doc.data();
      console.log(page)
      page.id = doc.id;
      const userLogueado = firebase.auth().currentUser;
      console.log(userLogueado)
      if (page.idWorker === userLogueado.uid) {
        pageContainer.innerHTML += `
        <tr class ="month">
        <td>${page.month} - ${page.year}</td>
        <td>${page.totalPage}</td>
        <td><a href=${page.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
        <td>${page.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad" data-id="${page.id}" disabled="disabled"  checked >` : 
        `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad"  data-id="${page.id}" > `} </td>
        </tr>

        `
        const searchMonth = document.querySelector('.search')
        console.log(searchMonth);

        const d = document;

        const txt = searchMonth.value;
        const texto = txt.toLowerCase()

        const monthText = page.month
        const salida = monthText.toLowerCase()

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

        searchFilter('.search', '.month', )
      };

    });



    const checkboxs = document.querySelectorAll('.conformidad');
    checkboxs.forEach(check => {
      check.addEventListener('click', function (e) {
        if (this.checked) {
          console.log('click pe')
          querySnapshot.forEach(doc => {
            const confir = doc.id
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {

              console.log('joalaaa')
              alert('¿Desea dar conformidad a su Boleta de pago?')
              window.localStorage.setItem(doc.id, check.checked)
              const cityRef = fs.collection('pages').doc(doc.id);
              const res = cityRef.update({
                confirmacion: true
              }, {
                merge: true
              });

            }

          })

          check.setAttribute("disabled", "disabled")

        } else {
          querySnapshot.forEach(doc => {
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {
              console.log('joalaaa')
              const cityRef = fs.collection('pages').doc(doc.id);
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









  // onGetPages((querySnapshot) => {
  //   pageContainer.innerHTML = '';
  //   querySnapshot.forEach(doc => {
  //     const page = doc.data();
  //     console.log(page)
  //     page.id = doc.id;
  //     const userLogueado = firebase.auth().currentUser;
  //     console.log(userLogueado)
  //     if (page.idWorker === userLogueado.uid) {

  //       pageContainer.innerHTML += `
  //       <tr>
  //       <td>${page.month}</td>
  //       <td>${page.totalPage}</td>
  //       <td><a href=${page.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
  //       <td>${page.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad" data-id="${page.id}" disabled="disabled"  checked >` : 
  //       `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad"  data-id="${page.id}" > `} </td>
  //       </tr>


  //       `


  //       const searchMonth = document.querySelector('.search')
  //       console.log(searchMonth);
  //       const filtrar = () => {
  //         const txt = searchMonth.value;
  //         const texto = txt.toLowerCase()


  //         const monthText = page.month
  //         const salida = monthText.toLowerCase()



  //         if (salida === texto) {
  //           pageContainer.innerHTML = '';
  //           console.log(page.month)
  //           console.log(texto)
  //           pageContainer.innerHTML += `
  //           <tr>
  //           <td>${page.month}</td>
  //           <td>${page.totalPage}</td>
  //           <td><a href=${page.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
  //           <td>${page.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad" data-id="${page.id}" disabled="disabled"  checked >` : 
  //           `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad"  data-id="${page.id}" > `} </td>
  //           </tr>`

  //         }


  //         if (texto === '') {
  //           // pageContainer.innerHTML = '';
  //           pageContainer.innerHTML += `
  //        <tr>
  //        <td>${page.month}</td>
  //        <td>${page.totalPage}</td>
  //        <td><a href=${page.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
  //        <td>${page.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad" data-id="${page.id}" disabled="disabled"  checked >` : 
  //        `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad"  data-id="${page.id}" > `} </td>
  //        </tr>


  //        `
  //         }



  //       }

  //       searchMonth.addEventListener('keyup', filtrar);







  //     };




  //   });




  // })

})