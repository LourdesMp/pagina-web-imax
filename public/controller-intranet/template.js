const templateDoc = document.querySelector('.templateDoc');
templateDoc.innerHTML = '';

const docFormato = document.querySelectorAll('.download-format');
docFormato.forEach(btn => { 
  btn.addEventListener('click', async (e) => {
    const doc = await getVacationId(e.target.dataset.id)
    console.log(doc)
   
    templateDoc.innerHTML += `
    <tr>
    <td>${vacation.nameWorker}</td>  
    <td>${vacation.startOfVacation} al ${vacation.endOfVacation}</td>
    
    </tr>
`;                      
            
        
    
  })
})