import React, { Component } from 'react';

export default class Book extends Component{

    handleDelete = (id) =>{
        this.props.delete(id);
    }

    render(){
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        
                        <img src={ "http://reading.loc/images/"+ this.props.book.image} alt=""/>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <h5 className="title is-5"> { this.props.book.title } </h5>
                        </div>
                    </div>

                    <div className="content">

                        { this.props.book.description }
                        
                    <hr/>
                    <time >{ this.props.book.created_at }</time>
                    <footer className="card-footer">
                        <button className="card-footer-item is-primary">Edit</button>
                        <button onClick={ this.handleDelete.bind(null,this.props.book.id) } className="card-footer-item has-text-danger is-danger">Delete</button>
                    </footer>
                    </div>
                </div>
            </div>
        )
    }

}