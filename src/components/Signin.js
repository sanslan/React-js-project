import React, { Component} from 'react';
import { Redirect } from "react-router-dom";
import { post } from 'axios';

export default class Signup extends Component{

    constructor(props) {

        super(props);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSignin = this.handleSignin.bind(this);

        this.state = {
            email : '',
            password: '',
        };

    }
    handleEmailChange(e){
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e){
        this.setState({ password: e.target.value });
    }
    handleSignin(e){

        e.preventDefault();
        const url = 'http://reading.loc/api/login';
        const formData = new FormData();
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }
        return  post(url, formData,config).then((data) =>{
            //console.log(data)
            if(data.status === 200){
                this.props.isLoggedinHandler(data.data.access_token);
            }
            
        }).catch((data) =>{
            console.log(data)
        });
        

    }
    render(){
        return (
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
                        <button className="button is-link">Submit</button>
                    </div>
                </div>
            </form>
        )
        }

} 