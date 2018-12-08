import React, { Component} from 'react';
import { Link } from "react-router-dom";
import axios from '../axios/axios';
import loading from '../loading.gif';

export default class Signup extends Component{

    constructor(props) {

        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signup = this.signup.bind(this);

        this.state = {
            name : '',
            email: '',
            password: '',
            isRegistered: false,
            errors: [],
            registerIsInProcess: false
        };
    }
    handleNameChange(e){
        this.setState({ name: e.target.value });
    }
    handleEmailChange(e){
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e){
        this.setState({ password: e.target.value });
    }
    signup(e){

        e.preventDefault();
        this.setState({registerIsInProcess: true})
        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);

        axios.post('register', formData)
            .then(() =>{
                this.setState({
                    registerIsInProcess: false,
                    isRegistered: true,
                    errors: [],
                    name : '',
                    email: '',
                    password: ''
                })
            })
            .catch((error) =>{
                this.setState({ test: typeof error.response.data.errors})
                this.setState({ errors: Object.values(error.response.data.errors)})
                this.setState({registerIsInProcess: false})
            })   

    }
    render(){
 
        return (
            <form  className='register' onSubmit={ this.signup }>
                <h2 className="title is-2 has-text-centered">Sign up</h2>

                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input value={ this.state.name } onChange={ this.handleNameChange } className="input" type="text" placeholder="Full name"/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input value={ this.state.email } rows='5'  onChange={ this.handleEmailChange } className="input" type="text" placeholder="Email"/>
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
                        <button className="button is-link">Sign up</button>{ this.state.registerIsInProcess && <img className='loading' alt='loading' src={loading}/> }
                    </div>
                </div>
                { (this.state.errors.length !== 0)  && <div><article className="message is-danger"><div className="message-body">{ this.state.errors.map((error)=>{
                    return (
                        <p>{ error }</p>
                    )
                } )}</div></article></div>
                }
                { this.state.isRegistered && <article className="message is-success">
                <div className="message-body">
                    You registered successfully. Please <Link to='/signin'>login here</Link>
                </div>
            </article>}
            </form>
            
        )
   
    }

} 