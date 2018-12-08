import React, { Component} from 'react';
import { Redirect } from "react-router-dom";

export default class Signup extends Component{

    componentDidMount(){
        this.props.signOutHandler();
    }

    render(){
        return <Redirect to='/signin'/>
    }

} 