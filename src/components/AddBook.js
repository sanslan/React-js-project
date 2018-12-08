import React, { Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../axios/axios';

let initialState = {
    title : '',
    description: '',
    image: ''
};
export default class AddBook extends Component{

    constructor(props) {

        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.addBook = this.addBook.bind(this);

        this.state = initialState;
        this.state = {
            errors: [],
            token : this.props.token,
            config : {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': "Bearer " + this.props.token
                }
            }

        }
    }
    handleTitleChange(e){
        this.setState({ title: e.target.value });
    }
    handleDescriptionChange(e){
        this.setState({ description: e.target.value });
    }
    handleImageChange(e){
        this.setState({ image: e.target.files[0] });
    }
    addBook(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',this.state.title);
        formData.append('description',this.state.description);
        formData.append('image',this.state.image);

        axios.post('/books', formData,this.state.config)
            .then(() =>{
                this.setState(initialState);
                this.setState({ errors: []})
            })
            .catch( error => {
                console.dir(error.response)
                this.setState({ errors: Object.values(error.response.data.errors)})
            })
        

    }
    render(){
        if(!this.props.token){
            return <Redirect to='/signin'/>;
        }
        return (
            <form  className='add-book' onSubmit={ this.addBook }>
                <h2 className="title is-2 has-text-centered">Add book</h2>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input value={ this.state.title } onChange={ this.handleTitleChange } className="input" type="text" placeholder="Book title"/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea value={ this.state.description } rows='5'  onChange={ this.handleDescriptionChange } className="input" type="text" placeholder="Book description"></textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <input onChange={ this.handleImageChange }   className="input" type="file"/>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Submit</button>
                    </div>
                </div>
                { (this.state.errors.length !== 0)  && <div><article className="message is-danger"><div className="message-body">{ this.state.errors.map(( error, index )=>{
                    return (
                        <p key={ index }>{ error }</p>
                    )
                } )}</div></article></div>
                }
            </form>
            
        )
    }

} 