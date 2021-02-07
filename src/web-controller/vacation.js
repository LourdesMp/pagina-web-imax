const registerVacation = document.querySelector('.box-check-boss');
const user = () => firebase.auth().currentUser;

// const cityRef = firebase.firestore().collection('vacation').doc('iD2cSjB5Szhf2O0yDRd7');

// const res = doc.set({
//   capital: true
// }, { merge: true });





//Para mostrar el jefe inmediato por defecto
const boxNameLeader = document.querySelector('.boss-inmediate');
boxNameLeader.innerHTML = '',
firebase.firestore().collection('users').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().leader}`);
        const userLogueado = firebase.auth().currentUser;
        const useruid = userLogueado.uid;
        if(useruid === doc.id){
            boxNameLeader.innerHTML += `
            <label type="text" class="name-leader" > ${doc.data().leader} </label>`
        }
       
       
    })
})

//Para mostrar fecha de vencimiento
const vacationExpire = document.querySelector('.box-vac-venc');
vacationExpire.innerHTML = '',
firebase.firestore().collection('users').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().entryDay}`);
        const userLogueado = firebase.auth().currentUser;
        const useruid = userLogueado.uid;
        function formato(texto){
            return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
          }
        if(useruid === doc.id){

            //Obteniendo fecha de ingreso
            const uid = doc.data();
            var dateOfEntry = uid.entryDay;
            console.log(dateOfEntry);

            //Obteniendo fecha actual
            var dateToday = new Date();
            console.log(dateToday);
            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
            
                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;
            
                return [year, month, day].join('-');
            }
      
            const currentDate = formatDate(dateToday);
            console.log(currentDate);

            //A la fecha de ingreso ponerle el año vigente (2021)
            const vec = dateOfEntry.split('-');
            var fecha = new Date(vec[0], vec[1]-1, vec[2]);
            console.log(fecha)
            var año = dateToday.getFullYear();
            console.log(año)
            let mes = fecha.getMonth();
            if(fecha.getMonth() < 10){
                mes= `0${fecha.getMonth()+1}`
            }else{
                mes= `${fecha.getMonth()+1}`
            }
            let dia = fecha.getDate();
            if(fecha.getDate() < 10){
                dia= `0${fecha.getDate()}`
            }else{
                dia= `${fecha.getDate()}`
            }  


            const newDateExpire = año +'-'+mes+'-'+dia;
            console.log(newDateExpire)

            //cabiando formato de fecha
            var fechaItem = año-1 +'-'+mes+'-'+dia;
            console.log(fechaItem)

            if(newDateExpire <= currentDate){
                const vec = newDateExpire.split('-');
                var fecha = new Date(vec[0],vec[1]-1, vec[2]);
                console.log(fecha)
                fecha.setFullYear(fecha.getFullYear()+1);
                var año = dateToday.getFullYear()+1;
                console.log(año)
                let mes = fecha.getMonth();
                if(fecha.getMonth() < 10){
                    mes= `0${fecha.getMonth()+1}`
                }else{
                    mes= `${fecha.getMonth()+1}`
                }
                let dia = fecha.getDate();
                if(fecha.getDate() < 10){
                    dia= `0${fecha.getDate()}`
                }else{
                    dia= `${fecha.getDate()}`
                }  

    
                const salida2 = año +'-'+mes+'-'+dia;
                console.log(salida2)
                var resDateExpireYear2 = formato(salida2);
                console.log(resDateExpireYear2);  

                const vacationPending = calcVacationTodayYear(newDateExpire, currentDate)

                firebase.firestore().collection('vacation').onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${doc.data().useruid}`);
                        const userLogueado = firebase.auth().currentUser;
                        const useruid = userLogueado.uid;
                        console.log(useruid)
                        console.log(doc.uid)
                        if(useruid === doc.data().useruid){
                            console.log('eeeeeeeeeee')
                            const cityRef = firebase.firestore().collection('vacation').doc(doc.id);
                            const res = cityRef.set({
                              resDateExpireYear2,
                              vacationPending

                            }, { merge: true });
                        }
                       
                       
                    })
                })

                vacationExpire.innerHTML += `
                <p><strong>Vencimiento:</strong> ${resDateExpireYear2} </p>
                <p><strong>Truncas:</strong>${vacationPending} días</p>`


            } else {
                var resDateExpireYear = formato(newDateExpire);
                console.log(resDateExpireYear);    
               
                const vacationPending = calcVacationTodayYear(fechaItem,currentDate)
                console.log(monthDiff(fechaItem,currentDate))

                firebase.firestore().collection('vacation').onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${doc.data().useruid}`);
                        const userLogueado = firebase.auth().currentUser;
                        const useruid = userLogueado.uid;
                        console.log(useruid)
                        console.log(doc.uid)
                        if(useruid === doc.data().useruid){
                            console.log('eeeeeeeeeee')
                            const cityRef = firebase.firestore().collection('vacation').doc(doc.id);
                            const res = cityRef.set({
                              resDateExpireYear,
                              vacationPending

                            }, { merge: true });
                        }
                       
                       
                    })
                })

                vacationExpire.innerHTML += `
                <p><strong>Vencimiento:</strong> ${resDateExpireYear} </p>
                <p><strong>Truncas:</strong>${vacationPending} días</p>`
            }
            

            
        }
       
       
    })
})


//funcion para sacar meses de diferencia
const monthDiff = (date1, date2) => { 
    const vec1 = date1.split('-');
    var d1 = new Date(vec1[0],vec1[1]-1, vec1[2]);
    const vec2 = date2.split('-');
    var d2 = new Date(vec2[0],vec2[1]-1, vec2[2]);
    var months; 
    months = (d2.getFullYear() - d1.getFullYear()) * 12; 
    months -= d1.getMonth() + 1; 
    months += d2.getMonth(); 
    if (d2.getDate() >= d1.getDate()) months++ 
    return months <= 0 ? 0 : months; 
}

//multiplicar meses por 2.5 dias de vacaciones
const calcVacationTodayYear = (fecha1, fecha2) => {
    console.log(monthDiff(fecha1,fecha2))
    const resFechas = monthDiff(fecha1,fecha2)
    const vacationPending = resFechas*2.5;
    return vacationPending;
}



// formulario para enviar solicitud de vacaciones
registerVacation.addEventListener('submit', (e) => {
    e.preventDefault();
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    console.log(useruid)
    const inicioVacation = document.querySelector('.inicio-Vacation').value;
    const finVacation = document.querySelector('.fin-Vacation').value;
    const bossInmediate = document.querySelector('.name-leader').innerHTML;
    console.log(bossInmediate)
  
    console.log(useruid,inicioVacation,finVacation,bossInmediate)
    if(inicioVacation,finVacation){
        saveVacation(useruid,inicioVacation,finVacation,bossInmediate).then(() => {
            // sessionStorage.removeItem('fileNewTicked');
            console.log('se registró solicitud de vacaciones');
            registerVacation.reset();
            alert('Se registró solicitud de vacaciones');
        });
    }
    
  
  });


//funcion para guaradr vacacones en firestore  
   const  saveVacation = (useruid,inicioVacation,finVacation,bossInmediate) => {
    const firestore = firebase.firestore();
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)

    // return firestore.collection('users').doc(userUid).collection('vacation').add({
    //     useruid,
    //     inicioVacation,
    //     finVacation,
    //     bossInmediate
    // });
    return firestore.collection('vacation').add({
      useruid,
      inicioVacation,
      finVacation,
      bossInmediate
    });
};

