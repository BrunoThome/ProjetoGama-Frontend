var user_infos = `<h6>NOME: {{NOME}} </h6>
                  <h6>RACF: {{RACF}}</h6>
                  <h6>EMAIL: {{EMAIL}}</h6>`

var computerInfos = `<h6>SERIE NUMBER: {{SERIENUMBER}} </h6>
                  <h6>DESCRICAO: {{DESCRICAO}}</h6>
                  <h6>NUMERO CONECTOR: {{NUMEROCONECTOR}}</h6>`

var departamentoAntigos = `<h6>NOME: {{NOME}} </h6>
                    <h6>UNIDADE: {{UNIDADE}} | ANDAR: {{ANDAR}}</h6>
                    <h6>VLAN: {{VLAN}}</h6>`

var departamentoNovo = `<h6>NOME: {{NOME}} </h6>
                    <h6>UNIDADE: {{UNIDADE}} | ANDAR: {{ANDAR}}</h6>
                    <h6>VLAN: {{VLAN}}</h6>`

var comando = `<h6>{{COMANDO}}</h6>`

var dataExecucao = `<h6>{{DATA}}</h6>`

var justificativa = `<h6>{{JUSTIFICATIVA}}</h6>`

window.onload =  async () => {
    const id = window.location.search.split("?id=")[1];

    let informacoes;

    await fetch(`http://127.0.0.1:8080/solicitacoes/detalhe/${id}`)
            .then((response) => response.json())
            .then((response) => {
                informacoes = response;
            })
    
    document.querySelector("#user-infos").innerHTML = user_infos.replace("{{NOME}}", informacoes.usuario.nome)
                                                                .replace("{{RACF}}", informacoes.usuario.racf)
                                                                .replace("{{EMAIL}}", informacoes.usuario.email)
                                                                
    document.querySelector("#computer-infos").innerHTML = computerInfos.replace("{{SERIENUMBER}}", informacoes.usuario.computador.id)
                                                                        .replace("{{DESCRICAO}}", informacoes.usuario.computador.descricao)
                                                                        .replace("{{NUMEROCONECTOR}}", informacoes.usuario.computador.numeroConector)

    document.querySelector("#departamento-antigo-infos").innerHTML = departamentoAntigos.replace("{{NOME}}", informacoes.origem.nome)
                                                                        .replace("{{UNIDADE}}", informacoes.origem.unidade)
                                                                        .replace("{{ANDAR}}", informacoes.origem.andar)
                                                                        .replace("{{VLAN}}", informacoes.origem.vlan)

    document.querySelector("#departamento-novo-infos").innerHTML = departamentoAntigos.replace("{{NOME}}", informacoes.destino.nome)
                                                                        .replace("{{UNIDADE}}", informacoes.destino.unidade)
                                                                        .replace("{{ANDAR}}", informacoes.destino.andar)
                                                                        .replace("{{VLAN}}", informacoes.destino.vlan)

    document.querySelector("#comando-executado-infos").innerHTML = comando.replace("{{COMANDO}}", informacoes.comandoRoteador) 

    document.querySelector("#data-infos").innerHTML = dataExecucao.replace("{{DATA}}", informacoes.dataSolicitacao) 

    document.querySelector("#justificativa-infos").innerHTML = justificativa.replace("{{JUSTIFICATIVA}}", informacoes.justificativa) 
    
    
    console.log(informacoes)
}