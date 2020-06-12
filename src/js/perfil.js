var user_infos = `<h6>NOME: {{NOME}} </h6>
                  <h6>RACF: {{RACF}}</h6>
                  <h6>DEPARTAMENTO: {{DEPARTAMENTO}}</h6>
                  <h6>EMAIL: {{EMAIL}}</h6>`

var computerInfos = `<h6>SERIE NUMBER: {{SERIENUMBER}} </h6>
                     <h6>DESCRICAO: {{DESCRICAO}}</h6>
                     <h6>NUMERO CONECTOR: {{NUMEROCONECTOR}}</h6>`


async function carregarPerfil(){
    user = window.localStorage.getItem('currentUser')
    if(user){
        user = JSON.parse(user)
        await fetch(`http://127.0.0.1:8080/usuario/${user.id}`)
            .then((response) => response.json())
            .then((response) => printInfos(response))       
    }else{
        window.location = "/login.html"
    }

}

function logout(){
    window.localStorage.removeItem('currentUser')
    window.location = "/login.html"
}

function printInfos(user){
    document.querySelector("#user-profile").innerHTML = `<img src='https://via.placeholder.com/150'></img>`
    
    document.querySelector("#user-infos").innerHTML = user_infos.replace("{{NOME}}", user.nome)
                                                                .replace("{{RACF}}", user.racf)
                                                                .replace("{{DEPARTAMENTO}}", user.departamento.nome)
                                                                .replace("{{EMAIL}}", user.email)
    if(user.computador){
        document.querySelector("#computer-infos").innerHTML = computerInfos.replace("{{SERIENUMBER}}", user.computador.id)
                                                                       .replace("{{DESCRICAO}}", user.computador.descricao)
                                                                       .replace("{{NUMEROCONECTOR}}", user.computador.numeroConector)
    }else{
        document.querySelector("#computer-infos").innerHTML = `<h6> NÃO POSSUI </h6>`
    }
    
    printSolicitacoes(user.solicitacoes || [])
}

function printSolicitacoes(solicitacoes){
    const tableBody = document.querySelector("#table-solicitacoes").querySelector("tbody")

    solicitacoes.forEach((solicitacao) => {
        tableBody.innerHTML += `<tr>
                                    <td>${solicitacao.id}</td>
                                    <td>${solicitacao.origem.vlan}</td>
                                    <td>${solicitacao.destino.vlan}</td>
                                    <td> <a href="/solicitacao-detalhes.html?id=${solicitacao.id}"> <i class="fas fa-external-link-alt"> </a></td>
                                </tr>    
                                `
    })
}
