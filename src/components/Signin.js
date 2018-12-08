import React, { Component} from 'react';
import { Redirect } from "react-router-dom";
import axios from '../axios/axios';
import loading from '../loading.gif';

export default class Signup extends Component{

    constructor(props) {

        super(props);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSignin = this.handleSignin.bind(this);

        this.state = {
            email : '',
            password: '',
            error: undefined,
            loginIsInProcess: false
        };

    }
    handleEmailChange(e){
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e){
        this.setState({ password: e.target.value });
    }
    handleSignin(e){
        this.setState({ loginIsInProcess: true });
        e.preventDefault();
        const formData = new FormData();
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);

        axios.post('login', formData)
            .then((data) =>{
                this.setState({ loginIsInProcess: false });
                if(data.status === 200){
                    this.props.isLoggedinHandler(data.data.access_token);
                }
            })
            .catch( error =>{
                this.setState({ loginIsInProcess: false });
                if(error.response === undefined){
                    this.setState({error: 'Network error'});
                }
                else if(error.response.status === 400){
                    this.setState({error: 'Please enter email and password'});
                }
                else if(error.response.status === 401){
                    this.setState({error: 'Invalid password or email'});
                } else{
                    this.setState({error: 'Something went wrong'});
                }
            });
    }
    render(){
        if(! this.props.isLoggedin){
            return (
                <div className="login">
                    <form  className='add-book' onSubmit={ this.handleSignin }>
                        <h2 className="title is-2 has-text-centered">Sign in</h2>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input  onChange={ this.handleEmailChange } value={ this.state.email } className="input" type="text" placeholder="Full name"/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input placeholder="password" onChange={ this.handlePasswordChange } value={ this.state.password } className="input" type="password"/>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>{ this.state.loginIsInProcess && <img className='loading' alt='loading' src={loading}/> }
                            </div>
                        </div>
                    </form>

                    { this.state.error && <article className="message is-danger">
                        <div className="message-body">
                                { this.state.error }
                        </div>
                    </article>}
                </div>
            )
        } else{
            return <Redirect to='/books'/>; 
        }

        }

} 