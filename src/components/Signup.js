import React, { Component} from 'react';
import { Link } from "react-router-dom";
import { post } from 'axios';
let initialState = {
    name : '',
    email: '',
    password: ''
};
export default class Signup extends Component{

    constructor(props) {

        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signup = this.signup.bind(this);

        this.state = initialState;
        this.state = {isRegistered: false}
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
        const url = 'http://reading.loc/api/register';
        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }
        return  post(url, formData,config).then(() =>{
            this.setState(initialState);
            this.props.isRegisteredHandler();
        });
        

    }
    render(){
        if(this.props.isRegistered){
            return (
                <article class="message is-primary">
                    <div class="message-body">
                        Already Registered. Please <Link to='/signin'>Sign in</Link>
                    </div>
                </article>
            )
        } else{
            return (
                <form  className='add-book' onSubmit={ this.signup }>
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
                            <button className="button is-link">Submit</button>
                        </div>
                    </div>
                </form>
            )
        }
   
    }

} 