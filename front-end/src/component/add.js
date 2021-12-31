import * as React from 'react';
import Axios from 'axios';
import { Modal, Button } from "react-bootstrap";
// import validate from "./component/validate";

 interface ModalProps {
      show: boolean; 
      id: Number;
  }
 interface ModalState{
}
// <ModalProps, ModalState>
export default class View extends React.Component<ModalProps, ModalState>{
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            id: 0,
            name: '',
            phone: '',
            address: '',
            email: '',
            
            fields: {},
            errors: {}
        }
        // console.log(this.props.id);
    }

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if(!fields["name"]){
            formIsValid = false;
            errors["errName"] = "Please fill out this field.";
        }
        if(!fields["phone"]){
            formIsValid = false;
            errors["errPhone"] = "Please fill out this field.";
        }

        if (typeof fields["phone"] !== "undefined") {
            var patternPhone = new RegExp(/^[0-9\b]+$/);
            if (!patternPhone.test(fields["phone"])) {
              formIsValid = false;
              errors["errPhone"] = "Please enter only number.";
            }else if(fields["phone"].length !== 10){
              formIsValid = false;
              errors["errPhone"] = "Please enter valid phone number.";
            }
        }

        if(!fields["address"]){
            formIsValid = false;
            errors["errAddress"] = "Please fill out this field.";
        }
        if(!fields["email"]){
            formIsValid = false;
            errors["errEmail"] = "Please fill out this field.";
        }
        if (typeof fields["email"] !== "undefined") {
            var patternEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!patternEmail.test(fields["email"])) {
              formIsValid = false;
              errors["errEmail"] = "Please enter valid email address.";
            }
        }

        this.setState({errors: errors});
        if(formIsValid === true){
            return true;
        }else{
            return false;
        }
    }
    handleSave() {
        if(this.handleValidation()){
            const item = this.state;
            this.addDetails(item)
        }else{
            return false;
        }
    }
    async addDetails(item) {

         Axios.post('http://localhost:3001/create',
            {
              name:item.name.charAt(0).toUpperCase() + this.state.name.slice(1),
              phone:item.phone,
              address:item.address,
              email:item.email
            })
            .then((res)=>{
                if(res.data === true){
                    this.closeModal();
                    alert("New contact has been added successfully!");
                }else{
                    console.log(res.data);
                    alert(res.data);      
                }
              
            });
        
    }

    closeModal = () => this.props.handleModalClose();


    render() {
        return (
            <div className="static-modal">
                <Modal show={this.props.show} onHide={this.closeModal} backdrop="static">
                    <Modal.Header>
                        <Modal.Title><h5 className="modal-title">Add new contact</h5></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <div className="form-group required">
                            <label htmlFor="name" className="control-label">Name</label>
                            <input value={this.state.name} className="form-control" data-field-name="name" type="text" required="required" onChange={(e) => this.setState({ name: e.target.value })}/>
                            <span style={{color: "red"}}>{this.state.errors["errName"]}</span>
                        </div>
                        <div className="form-group required">
                            <label htmlFor="phone" className="control-label">Phone</label>
                            <input value={this.state.phone} className="form-control" maxlength="10" data-field-name="phone" type="number" required="required" onChange={(e) => this.setState({ phone: e.target.value })}/>
                            <span style={{color: "red"}}>{this.state.errors["errPhone"]}</span>
                        </div>
                        <div className="form-group required">
                            <label htmlFor="address" className="control-label">Address</label>
                            <input value={this.state.address} className="form-control" data-field-name="address" type="text" required="required" onChange={(e) => this.setState({ address: e.target.value })}/>
                            <span style={{color: "red"}}>{this.state.errors["errAddress"]}</span>
                        </div>
                        <div className="form-group required">
                            <label htmlFor="email" className="control-label">Email</label>
                            <input value={this.state.email} className="form-control" data-field-name="email" type="email" required="required" onChange={(e) => this.setState({ email: e.target.value })}/>
                            <span style={{color: "red"}}>{this.state.errors["errEmail"]}</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <div className="modal-footer pt-3">
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                        <button type="button" className="btn btn-md btn-primary" onClick={() => { this.handleSave() }}>Save changes</button>
                    </div>
                    </Modal.Footer>
                </Modal>
            </div>


        );
    }
}