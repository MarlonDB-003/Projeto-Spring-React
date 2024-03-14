import React , {useEffect, useState} from "react";
import './Formulario.css';
import axios from "axios";

function Formulario(){

    const [servico, setServico] = useState({valorServico: '', nomeCliente: '', dataInicio: '', dataTermino: '', descricaoServico: '', valorPago: '', dataPagamento: ''});
    const [servicos, setServicos] = useState([]);
    const [atualizar, setAtualizar] = useState();

    useEffect(() => {
        buscarTodos();
    }, [atualizar]);

    function handleChange(event){
        setServico({...servico, [event.target.name] : event.target.value});
    }

    function limpar(){
        setServico({valorServico: '', nomeCliente: '', dataInicio: '', dataTermino: '', descricaoServico: '', valorPago: '', dataPagamento: ''});
    }

    function handleSubmit(event){
        event.preventDefault();
        if(servico.id == undefined){
            axios.post("http://localhost:8080/api/servico/", servico).then(result => {
                setAtualizar(result);
            });
        }else{
            axios.put("http://localhost:8080/api/servico/", servico).then(result => {
                setAtualizar(result);
            });
        }

        limpar();
    }

    function excluir(id){
        axios.delete("http://localhost:8080/api/servico/"+id).then(result => {
            setAtualizar(result);
        });
    }

    function cancelar(id){
        axios.post("http://localhost:8080/api/servico/"+id).then(result => {
            setAtualizar(result);
        });
    }

    function buscarTodos(){
        axios.post("http://localhost:8080/api/servico/", servico).then(result => {
            setAtualizar(result);
        });
    }

    function buscarPagamentosPendentes(){
        axios.post("http://localhost:8080/api/servico/pagamentoPendente", servico).then(result => {
            setAtualizar(result);
        });
    }

    function buscarCancelados(){
        axios.post("http://localhost:8080/api/servico/cancelados", servico).then(result => {
            setAtualizar(result);
        });
    }

    return(
        <div className="container">
            <h1>Cadastro de serviços</h1>
            <form onSubmit={handleSubmit}>
                <div className="col-6">
                    <div>
                        <label className="form-label">Nome do cliente: </label>
                        <input onChange={handleChange} value={servico.nomeCliente} name="nomeCliente" type="text" className="form-control"></input>
                    </div>
                    <div>
                        <label className="form-label">Data de Início: </label>
                        <input onChange={handleChange} value={servico.dataInicio || ''} name="dataInicio" type="date" className="form-control"></input>
                    </div>
                    <div>
                        <label className="form-label">Data de Término: </label>
                        <input onChange={handleChange} value={servico.dataTermino || ''} name="dataTermino" type="date" className="form-control"></input>
                    </div>
                    <div>
                        <label className="form-label">Descrição do serviço: </label>
                        <input onChange={handleChange} value={servico.descricaoServico || ''} name="descricaoServico" type="text" className="form-control"></input>
                    </div>
                    <div>
                        <label className="form-label">Valor do serviço: </label>
                        <input onChange={handleChange} value={servico.valorServico || ''} name="valorServico" type="text" className="form-control"></input>
                    </div>
                    <div>
                        <label className="form-label">Valor pago: </label>
                        <input onChange={handleChange} value={servico.valorPago || ''} name="valorPago" type="text" className="form-control"></input>
                    </div>
                    <div>
                        <label className="form-label">Data do pagamento: </label>
                        <input onChange={handleChange} value={servico.dataPagamento || ''} name="dataPagamento" type="date" className="form-control"></input>
                    </div>
                    
                    <br/>

                    <input type="submit" className="btn btn-success" value="Cadastrar"></input>
                </div>
            </form>

            <hr></hr>

            <button onClick={buscarTodos} type="button" class="btn btn-primary">Listar Todos</button>&nbsp;&nbsp;
            <button onClick={buscarPagamentosPendentes} type="button" class="btn btn-secondary">Serviços com pagamento pendente</button>&nbsp;&nbsp;
            <button onClick={buscarCancelados} type="button" class="btn btn-danger">Serviços Cancelados</button>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Status</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        servicos.map(serv => 
                            <tr key={serv.id}>
                                <td>{serv.nomeCliente}</td>
                                <td>{serv.descricaoServico}</td>
                                <td>{serv.valorServico}</td>
                                <td>{serv.status}</td>
                                <td>
                                    {serv.status != 'cancelado' && 
                                        <button onClick={() => setServico(serv)} className="btn btn-primary">Alterar</button>
                                    }&nbsp;&nbsp;
                                    {serv.status != 'cancelado' && 
                                        <button onClick={() => excluir(serv.id)} className="btn btn-danger">Excluir</button>
                                    }&nbsp;&nbsp;
                                    <button onClick={() => cancelar(serv.id)} className="btn btn-warning">Cancelar</button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>

            <hr></hr>

        </div>
    )

}

export default Formulario;