import React, { Component } from 'react';
import Book  from './Book';
import axios from 'axios';

export default class BooksList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            title: 'Title'
        };
    }
    componentDidMount(){
        const token = this.props.token;
        const config = {
            headers: {'Authorization': "Bearer " + token}
       };
        axios.get('http://reading.loc/api/books', config)
            .then( ({data}) => {

                this.setState({
                    books: data
                });
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    render(){
        return (
            <div className='container'>
                <h2 className="title is-2 has-text-centered">My reading list</h2>
                <div className="book-list">

                    { this.state.books.map((book,index) =>
                        (
                            <Book key={ book.id }  book={ book }/>
                        )  
                    )}

                </div>
            </div>
        )
    }

}