import React, { Component } from 'react';
import Book  from './Book';
import axios from '../axios/axios';
import { Redirect } from "react-router-dom";

export default class BooksList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            token : this.props.token,
            config : {
                headers: {'Authorization': "Bearer " + this.props.token}
           }

        };
    }
    handleDelete = (id) => {
        axios.delete(`books/${id}`, this.state.config)
            .then(() =>{
                this.getListBook();
            })
            .catch((err) =>{
                console.log(err)
            })
    }
    getListBook(){
        axios.get('books', this.state.config)
            .then( ({data}) => {
                this.setState({
                    books: data
                }); 
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount(){
        this.getListBook();
    }
    render(){
        if(!this.props.token){
            return <Redirect to='/signin'/>;
        }
        return (
            <div className='container'>
                <h2 className="title is-2 has-text-centered">My reading list</h2>
                <div className="book-list">
                    { this.state.books.map((book,index) =>
                        (
                            <Book 
                            key={ book.id }
                            delete={this.handleDelete}  
                            book={ book }/>
                        )  
                    )}
                </div>
            </div>
        )
    }
}