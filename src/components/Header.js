import React, { Component} from 'react';
import {  NavLink } from "react-router-dom";

export default class Header extends Component{
    render(){
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item"></div>
                            <div className="buttons">
                                { this.props.isLoggedin && <NavLink className='button is-light' activeClassName="is-primary" to="/books"><strong>Books list</strong></NavLink>}
                                { this.props.isLoggedin && <NavLink className='button is-light' activeClassName="is-primary" to="/addbook"><strong>New book</strong></NavLink>}
                            </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
        
                                <div>
                                    { !this.props.isLoggedin && <NavLink className='button is-light' activeClassName="is-primary" to="/signup"><strong>Sign up</strong></NavLink>}
                                    { !this.props.isLoggedin && <NavLink className='button is-light' activeClassName="is-primary" to="/signin"><strong>Sign in</strong></NavLink>}
                                    { this.props.isLoggedin && <NavLink className='button is-light' activeClassName="is-primary" to="/logout"><strong>Logout</strong></NavLink>}
                                </div>                
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}