const login = document.querySelector('.login-form');

//Login con email

login.addEventListener('submit', (e) => {
    e.preventDefault();
   const emailLogin = document.querySelector('.emailLogin').value;
   const passwordLogin = document.querySelector('.passwordLogin').value;
   console.log('se ingresó')
  auth
      .signInWithEmailAndPassword(emailLogin,passwordLogin)
      .then(userCredential => {
        login.reset();
        console.log('ingresasteeeee');
        location.href="views-intranet/noticias.html"
      }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        var validEmail = new RegExp("^[a-zA-Z][-_.a-zA-Z0-9]{5,29}@imax.com.pe$");
        if (errorCode === 'auth/wrong-password') {
          document.querySelector('#reg_error_inner').innerHTML = 'Contraseña incorrecta.';
        } else if (( validEmail.test(emailLogin.trim())) === false){
          document.querySelector('#reg_error_inner').innerHTML = 'utilice su correo institucional.';
        } else {
            document.querySelector('#reg_error_inner').innerHTML = errorMessage;
        }
      })
});

