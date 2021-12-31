
import React, { Component } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
import View from "./component/view";
import Add from "./component/add";
import Delete from "./component/delete";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.retrieveContacts = this.retrieveContacts.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      contacts: [],
      filteredData: [],
      currentEmployee: null,
      currentIndex: -1,
      showAdd: false,
      showEdit: false,
      showDelete: false,
      row: [],
      id: '',
      name: '',
      text: ""
    };
  }

  componentDidMount() {
    this.retrieveContacts();
    console.log(this.state.contacts);
  }

  onChangeSearch(e) {
    const text = e.target.value;
    console.log(text);

    this.setState({
      text: text,
    });

    this.search(text);
  }

  retrieveContacts() {
    Axios.get('http://localhost:3001/read')
    .then((res)=>{
      // console.log(res);
        this.setState({
          contacts: res.data,
          filteredData: res.data
        });
    });
  }


  search(text) {

  	let filtered = this.state.contacts.filter(item => item.name.toLowerCase().includes(text) 
  		|| item.phone.includes(text) || item.email.includes(text));

        this.setState({
          filteredData: filtered
        });
        // console.log(filtered);
        // console.log(this.state.contacts);
        // console.log(text);
  }

  handleEditModalClose = ()=>{
    this.setState({showEdit: false});
    this.retrieveContacts();
  }

  handleAddModalClose = ()=>{
    this.setState({showAdd: false});
    this.retrieveContacts();
  }

  handleDeleteModalClose = ()=>{
    this.setState({showDelete: false, id: '', name: ''});
    this.retrieveContacts();
  }

  handleshowDelete = () => {
  	this.setState({showEdit: false});
  	this.setState({showDelete: true, id: this.state.row.id, name: this.state.row.name});
  }



  render() {
    const {
      text,
      contacts,
      filteredData
    } = this.state;

      const handleCloseAdd = () => this.setState({
	      showAdd: false
	    });
	  const handleShowAdd = () =>  this.setState({
	      showAdd: true
	    });

    return (


      <div>

        <Add
            show={this.state.showAdd}
            handleModalClose={this.handleAddModalClose}
        />

        <View
            show={this.state.showEdit}
              row={this.state.row}
              showDelete={this.handleshowDelete}
              handleModalClose={this.handleEditModalClose}
            />
        <Delete
              show={this.state.showDelete}
              id={this.state.id}
              name={this.state.name}
              handleModalClose={this.handleDeleteModalClose}
            />


      <div className="container mt-4">
	      <div className="mb-4"><h2>Contact Management App</h2></div>
      <div className="row">
        <div className="col-md-4">
	        <input type="button" onClick={() => this.setState({ showAdd: true })} value="Add New"/>
        </div>
		<div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Firstname"
              value={text}
              onChange={this.onChangeSearch}
            />
            
          </div>
        </div>
       </div>
       <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((row, index) => (
                  <tr>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td style={{width: '200px'}}>
                        <button
				            className="btn btn-sm btn-primary"
				            onClick={() => this.setState({ showEdit: true, row: row })}
				          >
				            View
				          </button>
				          
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

        </div>
        </div>
        </div>

      </div>
    );
  }
}

