import React, { Component} from 'react';
import { post } from 'axios';
let initialState = {
    title : '',
    description: '',
    categories: [],
    image: ''
};
export default class AddBook extends Component{

    constructor(props) {

        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.addBook = this.addBook.bind(this);

        this.state = initialState;
    }
    handleTitleChange(e){
        this.setState({ title: e.target.value });
    }
    handleDescriptionChange(e){
        this.setState({ description: e.target.value });
    }
    handleCategoriesChange(e){
        var options = e.target.options;
        var value = [];
                for (var i = 0, l = options.length; i < l; i++) {
                  if (options[i].selected) {
                    value.push(options[i].value);
                  }
                }
          this.setState({categories: value});
    }
    handleImageChange(e){
        this.setState({ image: e.target.files[0] });
    }
    addBook(e){

        e.preventDefault();
        const url = 'http://reading.loc/api/books';
        const formData = new FormData();
        formData.append('title',this.state.title);
        formData.append('description',this.state.description);
        formData.append('image',this.state.image);

        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU5ZDljMzEyNDlmNTM2MDQ0OGIzNmQ4ZmZmMDQyZTc2OTFiMjJlNDZlOGZhMWJiYjdmOTk0ZThiMTkwMjFkYzE4YWQ5NDA1NjdiNWYxZjgzIn0.eyJhdWQiOiIxIiwianRpIjoiZTlkOWMzMTI0OWY1MzYwNDQ4YjM2ZDhmZmYwNDJlNzY5MWIyMmU0NmU4ZmExYmJiN2Y5OTRlOGIxOTAyMWRjMThhZDk0MDU2N2I1ZjFmODMiLCJpYXQiOjE1NDI1MzA3MTcsIm5iZiI6MTU0MjUzMDcxNywiZXhwIjoxNTc0MDY2NzE3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.gVPpIxVbQSyzmCVGKEuo7pd3e6ru-wotd1m8js0Sfgma1SzT9cPTGf_rT2rX-LdM9voLfmcVk7Yo0FUaLttTm9IIaJ3nykZ7MrS166OWO3nrhF6eoLIxSuc7GUNnIrZsVowJSbOCRTWhgPhjySTDrO6sUPoc_Z7YxStNncrsr5wuXikcmfkyCBNmL5cQE0S4m2dLGtGniunvNYQ-tNW8E5zVaY2ZRVwy4PDk-9pAB419GZgJKNQhBAbLamMhZh-MG2KEaafI9mKgJix0JFgh6LRT8L5m2PlQwfjMx1VsRsDeTzJid_Meyl-Uz0_gl-d9l86bHMWXyUZk7Q4AyB2wSF9rJXQenf3HHvohxZdZpu-AYjnRkl49LhYGgB-uY__0or498zRBdTHiPUGa9jTtYXZnLPikIpmHTsC_WT0vK6Tqxq2LzaZg06RamMaLJE5MLLk4i_WFHYpjY0TrMBFb8NgbIl8p3Jb9kSN99AZ7o1U2iLdFaInKmc6d_-kCPubWrwfPMAboshCAsd5VroVzfeX-iJrfE8hrj8U0KdxaLl3qbxke5rKVGRfpLM-NwByBfSEWODhc9IJg7BVK4CTv5TKjWOIfGxFCaesHepR-HtYAYvhLBIJs0UOb_HrwNIzZE_ykO-pr7g6D3d_n5u3Nzlqb_WRwcpD1R92_yo5XijA';

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': "Bearer " + token
            }
        }
        return  post(url, formData,config).then(() =>{
            this.setState(initialState);
        });
        

    }
    render(){
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
                    <label className="label">Categories</label>
                    <div className="control">
                    
                        <div className="select is-multiple">
                            <select multiple value={ this.state.categories } onChange={ this.handleCategoriesChange }>
                                <option value="1">Category1</option>
                                <option value="2">Category2</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <input onChange={ this.handleImageChange } className="input" type="file"/>
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