import './Nav.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Logo extends Component {
    render() {
        return (
            <aside className="menu-area">
                <nav className="menu">
                    <Link to="/">
                        <i className="fa fa-home"></i> Início
                    </Link>
                    <Link to="/register">
                        <i className="fa fa-list-alt"></i> Cadastro
                    </Link>
                    <Link to="/input">
                        <i className="fa fa-arrow-circle-o-right"></i> Entradas
                    </Link>
                    <Link to="/output">
                        <i className="fa fa-arrow-circle-o-left"></i> Saídas
                    </Link>
                </nav>
            </aside>)
    }
}
