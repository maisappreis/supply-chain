import React, { Component } from "react";
import Main from "../template/Main";
import "./Input.css";
import { variables } from "../../Variables.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

const headerProps = {
    icon: "arrow-circle-o-right",
    title: "Entradas",
    subtitle: "Gerenciamento de entrada de mercadorias"
}

export default class Input extends Component {

    constructor(props) {
        super(props);

        this.state = {
            registers: [],
            inputs: [],
            modalTitle: "",
            InputId: 0,
            InputDate: "",
            ProductName: "",
            ProductAmount: 0,
            Address: "",

            inputsWithoutFilter: []
        }
    }

    sortResult(prop, asc) {
        let sortedData = this.state.inputsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop] ? 1 : ((a[prop] < b[prop] ? -1 : 0)))
            } else {
                return (b[prop] > a[prop] ? 1 : ((b[prop] < a[prop] ? -1 : 0)))
            }
        });
        this.setState({ inputs: sortedData })
    }

    refreshList() {
        fetch(variables.API_URL + "input")
            .then(resp => resp.json())
            .then(data => {
                this.setState({ inputs: data, inputsWithoutFilter: data })
            });

        fetch(variables.API_URL + "register")
            .then(resp => resp.json())
            .then(data => {
                this.setState({ registers: data })
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeInputDate = (e) => {
        this.setState({ InputDate: e.target.value })
    }

    changeProductName = (e) => {
        this.setState({ ProductName: e.target.value })
    }

    changeProductAmount = (e) => {
        this.setState({ ProductAmount: e.target.value })
    }

    changeAddress = (e) => {
        this.setState({ Address: e.target.value })
    }

    addClick() {
        this.setState({
            modalTitle: "Adicionar Entrada",
            InputId: 0,
            InputDate: "2022-08-01 08:00",
            ProductName: "",
            ProductAmount: 0,
            Address: ""
        });
    }

    editClick(input) {
        this.setState({
            modalTitle: "Editar Entrada",
            InputId: input.InputId,
            InputDate: input.InputDate,
            ProductName: input.ProductName,
            ProductAmount: input.ProductAmount,
            Address: input.Address
        });
    }

    createClick() {
        if (this.state.ProductAmount > 0) {
            fetch(variables.API_URL + "input", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    InputDate: this.state.InputDate,
                    ProductName: this.state.ProductName,
                    ProductAmount: this.state.ProductAmount,
                    Address: this.state.Address
                })
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert("Operação falhou!");
                })
        } else {
            alert("Operação falhou!")
        }
    }

    updateClick() {
        fetch(variables.API_URL + "input", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                InputId: this.state.InputId,
                InputDate: this.state.InputDate,
                ProductName: this.state.ProductName,
                ProductAmount: this.state.ProductAmount,
                Address: this.state.Address
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert("Operação falhou!");
            })
    }

    deleteClick(id) {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            fetch(variables.API_URL + "input/" + id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert("Operação Falhou!")
                })
        }
    }

    exportPDF() {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Relatório das Entradas de Mercadorias";
        const headers = [["Data da Entrada", "Nome do Produto", "Quantidade", "Local"]];

        const data = this.state.inputs.map((e) => [e.InputDate, e.ProductName, e.ProductAmount, e.Address]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("relatorio-das-entradas.pdf")
    }

    render() {
        const {
            registers,
            inputs,
            modalTitle,
            InputId,
            InputDate,
            ProductName,
            ProductAmount,
            Address } = this.state;

        return (
            <Main {...headerProps} >
                <div>
                    <button type="button"
                        className="btn btn-primary m-2 mb-4 float-start"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => this.addClick()}>
                        Nova Entrada
                    </button>
                    <button className="btn btn-secondary m-2 mb-4 float-end" onClick={() => this.exportPDF()}>
                        Exportar PDF
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="width20">
                                    Data da Entrada
                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('InputDate', true)}>
                                        <i className="fa fa-arrow-up"></i>
                                    </button>

                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('InputDate', false)}>
                                        <i className="fa fa-arrow-down"></i>
                                    </button>
                                </th>
                                <th className="width20">
                                    Nome do Produto
                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('ProductName', true)}>
                                        <i className="fa fa-arrow-up"></i>
                                    </button>

                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('ProductName', false)}>
                                        <i className="fa fa-arrow-down"></i>
                                    </button>
                                </th>
                                <th>
                                    Quantidade
                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('ProductAmount', true)}>
                                        <i className="fa fa-arrow-up"></i>
                                    </button>

                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('ProductAmount', false)}>
                                        <i className="fa fa-arrow-down"></i>
                                    </button>
                                </th>
                                <th>
                                    Local
                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('Address', true)}>
                                        <i className="fa fa-arrow-up"></i>
                                    </button>

                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('Address', false)}>
                                        <i className="fa fa-arrow-down"></i>
                                    </button>
                                </th>
                                <th>
                                    Ação
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {inputs.map(input =>
                                <tr key={input.InputId}>
                                    <td>{input.InputDate}</td>
                                    <td>{input.ProductName}</td>
                                    <td>{input.ProductAmount}</td>
                                    <td>{input.Address}</td>
                                    <td>
                                        <button type="button"
                                            className="btn btn-primary mr-2 mt-1 center"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => this.editClick(input)}>
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button type="button"
                                            className="btn btn-danger mr-2 mt-1 center"
                                            onClick={() => this.deleteClick(input.InputId)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Data da Entrada</label>
                                    <input type="datetime-local" className="form-control"
                                        value={InputDate}
                                        onChange={this.changeInputDate} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Nome do Produto</label>
                                    <select className="form-select"
                                        onChange={this.changeProductName}
                                        value={ProductName}>
                                        <option value="Selecione" selected>Selecione</option>
                                        {registers.map(resg => <option key={resg.ProductId}>
                                            {resg.ProductName}
                                        </option>)}
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Quantidade</label>
                                    <input type="text" className="form-control"
                                        value={ProductAmount}
                                        onChange={this.changeProductAmount} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Local</label>
                                    <input type="text" className="form-control"
                                        value={Address}
                                        onChange={this.changeAddress} />
                                </div>

                                {InputId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>Salvar</button>
                                    : null}

                                {InputId > 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}>Atualizar</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        )
    }
}


