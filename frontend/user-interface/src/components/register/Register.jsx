import React, { Component } from "react";
import Main from "../template/Main";
import "./Register.css";
import { variables } from "../../Variables.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

const headerProps = {
    icon: "list-alt",
    title: "Cadastro de Mercadorias",
    subtitle: "Gerenciamento das mercadorias"
}

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            registers: [],
            modalTitle: "",
            ProductId: 0,
            ProductName: "",
            ProductCode: "",
            Manufacturer: "",
            ProductType: "",
            ProductDescription: "",

            registersWithoutFilter: []
        }
    }

    sortResult(prop, asc) {
        let sortedData = this.state.registersWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop] ? 1 : ((a[prop] < b[prop] ? -1 : 0)))
            } else {
                return (b[prop] > a[prop] ? 1 : ((b[prop] < a[prop] ? -1 : 0)))
            }
        });
        this.setState({ registers: sortedData })
    }

    refreshList() {
        fetch(variables.API_URL + "register")
            .then(resp => resp.json())
            .then(data => {
                this.setState({ registers: data, registersWithoutFilter: data })
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeProductName = (e) => {
        this.setState({ ProductName: e.target.value })
    }

    changeProductCode = (e) => {
        this.setState({ ProductCode: e.target.value })
    }

    changeManufacturer = (e) => {
        this.setState({ Manufacturer: e.target.value })
    }

    changeProductType = (e) => {
        this.setState({ ProductType: e.target.value })
    }

    changeProductDescription = (e) => {
        this.setState({ ProductDescription: e.target.value })
    }

    addClick() {
        this.setState({
            modalTitle: "Cadastrar",
            ProductId: 0,
            ProductName: "",
            ProductCode: "",
            Manufacturer: "",
            ProductType: "",
            ProductDescription: ""
        });
    }

    editClick(register) {
        this.setState({
            modalTitle: "Editar Cadastro",
            ProductId: register.ProductId,
            ProductName: register.ProductName,
            ProductCode: register.ProductCode,
            Manufacturer: register.Manufacturer,
            ProductType: register.ProductType,
            ProductDescription: register.ProductDescription
        });
    }

    createClick() {
        fetch(variables.API_URL + "register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ProductName: this.state.ProductName,
                ProductCode: this.state.ProductCode,
                Manufacturer: this.state.Manufacturer,
                ProductType: this.state.ProductType,
                ProductDescription: this.state.ProductDescription
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

    updateClick() {
        fetch(variables.API_URL + "register", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ProductId: this.state.ProductId,
                ProductName: this.state.ProductName,
                ProductCode: this.state.ProductCode,
                Manufacturer: this.state.Manufacturer,
                ProductType: this.state.ProductType,
                ProductDescription: this.state.ProductDescription
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
            fetch(variables.API_URL + "register/" + id, {
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

        const title = "Relatório dos Cadastros das Mercadorias";
        const headers = [["Nome do Produto", "Registro", "Fabricante", "Tipo", "Descrição"]];

        const data = this.state.registers.map((e) => [e.ProductName, e.ProductCode, e.Manufacturer, e.ProductType, e.ProductDescription]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("relatorio-dos-cadastros.pdf")
    }

    render() {
        const {
            registers,
            modalTitle,
            ProductId,
            ProductName,
            ProductCode,
            Manufacturer,
            ProductType,
            ProductDescription } = this.state;

        return (
            <Main {...headerProps} >
                <div>
                    <button type="button"
                        className="btn btn-primary m-2 mb-4 float-start"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => this.addClick()}>
                        Novo Cadastro
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
                                    Registro
                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('ProductCode', true)}>
                                        <i className="fa fa-arrow-up"></i>
                                    </button>

                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('ProductCode', false)}>
                                        <i className="fa fa-arrow-down"></i>
                                    </button>
                                </th>
                                <th>
                                    Fabricante
                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('Manufacturer', true)}>
                                        <i className="fa fa-arrow-up"></i>
                                    </button>

                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('Manufacturer', false)}>
                                        <i className="fa fa-arrow-down"></i>
                                    </button>
                                </th>
                                <th>
                                    Tipo
                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('ProductType', true)}>
                                        <i className="fa fa-arrow-up"></i>
                                    </button>

                                    <button type="button" className="btn btn-light arrow"
                                        onClick={() => this.sortResult('ProductType', false)}>
                                        <i className="fa fa-arrow-down"></i>
                                    </button>
                                </th>
                                <th className="width25">
                                    Descrição
                                </th>
                                <th>
                                    Ação
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {registers.map(register =>
                                <tr key={register.ProductId}>
                                    <td>{register.ProductName}</td>
                                    <td>{register.ProductCode}</td>
                                    <td>{register.Manufacturer}</td>
                                    <td>{register.ProductType}</td>
                                    <td>{register.ProductDescription}</td>
                                    <td>
                                        <button type="button"
                                            className="btn btn-primary mr-2 mt-1 center"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => this.editClick(register)}>
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button type="button"
                                            className="btn btn-danger mr-2 mt-1 center"
                                            onClick={() => this.deleteClick(register.ProductId)}>
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
                                    <label className="input-group-text">Nome do Produto</label>
                                    <input type="text" className="form-control"
                                        value={ProductName}
                                        onChange={this.changeProductName} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Nº de Registro</label>
                                    <input type="text" className="form-control"
                                        value={ProductCode}
                                        onChange={this.changeProductCode} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Fabricante</label>
                                    <input type="text" className="form-control"
                                        value={Manufacturer}
                                        onChange={this.changeManufacturer} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Tipo</label>
                                    <input type="text" className="form-control"
                                        value={ProductType}
                                        onChange={this.changeProductType} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Descrição</label>
                                    <input type="text" className="form-control"
                                        value={ProductDescription}
                                        onChange={this.changeProductDescription} />
                                </div>

                                {ProductId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>Salvar</button>
                                    : null}

                                {ProductId > 0 ?
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