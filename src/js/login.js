function autenticar(event){

    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    if(!email){
        showError("Digite seu email!");
        return false;
    }else if(!senha){
        showError("Digite sua senha!");
        return false;
    }

    const requestObject = {
        method : "POST",
        body : JSON.stringify({
            email : email,
            senha : senha
        }),
        headers : {
            'Content-type': 'application/json'
        }
    }

    var results = fetch("http://127.0.0.1:8080/login", requestObject)
        .then((response) => tratarLogin(response))
        .catch((error) => tratarLogin(error))            
               
}

function tratarLogin(response){
    switch(response.status){
        case 200: response.json().then((response) => saveUserSession(response)); break;
        case 403: showError("Erro 403: Senha incorreta!"); break;
        case 404: showError("Erro 404: Usuário desconhecido"); break;
        default: showError("Erro ao processar sua solicitação"); break;
    }
}

function showError(errorMessage){
    const errorContainer = document.querySelector("#errorContainer");

    errorContainer.innerHTML = `<span> ${errorMessage} </span>`;
    errorContainer.classList.remove('d-none')
}

function saveUserSession(user){
    window.localStorage.setItem('currentUser', JSON.stringify(user));
    window.location = "/perfil.html"
}
