import './Footer.css';
import React, { Component } from 'react';


export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span>
                    Desenvolvido com
                    <i class="material-icons v-middle red" >
                        favorite
                    </i>
                    por Maisa.
                </span>
            </footer>
        )
    }
}

