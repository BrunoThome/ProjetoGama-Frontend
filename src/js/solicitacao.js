async function getOptions(){
    const departamentoSelects = document.querySelector("#novoDepartamento")
    
    let departamentos;
    
    await fetch("http://127.0.0.1:8080/departamentos")
        .then((results) => results.json())
        .then((results) => {
            departamentos = results;
        })
        
    departamentos.forEach((departamento) => {
        departamentoSelects.innerHTML += `<option value=${departamento.id}
                                                  data-vlan=${departamento.vlan}
                                            >
                                            ${departamento.nome}
                                          </option>`
    })
}

function registrarAlteracao(){
    const user = JSON.parse(window.localStorage.getItem("currentUser"))
    
    if(!user){
        window.location = "/login.html"
    }

    const usuario = user.id;
    const origem = user.departamento.id;
    const data = document.querySelector("#data").value;
    const destino = document.querySelector("#novoDepartamento").selectedOptions[0].value;
    const justificativa = document.querySelector("#justificativa").value;


    const requestObject = {
        method : "POST",
        body : JSON.stringify({
            usuario : {
                id: usuario
            },
            origem : {
                id: origem
            },
            destino : {
                id: destino
            },
            justificativa : justificativa,
            data: data
        }),
        headers : {
            'Content-type': 'application/json'
        }
    }

    var results = fetch("http://127.0.0.1:8080/solicitacoes/nova", requestObject)
        .then((response) => response.json())
        .then((response) => console.log(response))        
}


window.onload = () => {
    const user = JSON.parse(window.localStorage.getItem("currentUser"))

    if(!user){
        window.location = "/login.html"
    }

    document.querySelector("#usuario").dataset.id = user.id
    document.querySelector("#usuario").value = user.nome

    if(user.computador){        
        document.querySelector("#conector").value = user.computador.numeroConector
    }

    document.querySelector("#departamentoAtual").dataset.id = user.departamento.id
    document.querySelector("#departamentoAtual").dataset.vlan = user.departamento.vlan
    document.querySelector("#departamentoAtual").value = user.departamento.nome

    getOptions()
}