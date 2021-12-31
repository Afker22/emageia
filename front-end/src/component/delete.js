import * as React from 'react';
import Axios from 'axios';
import { Modal, Button } from "react-bootstrap";

 
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
        }
        // console.log(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            name: nextProps.name
        });
    }

    handleSave() {
        const item = this.state;
        this.deleteModalDetails(item)
    }
    async deleteModalDetails(item) {

        Axios.delete(`http://localhost:3001/delete/${item.id}`)
            .then((res)=>{
              console.log(res);
              this.closeModal();
              alert("Contact has been deleted successfully!");

        });
        
    }

    closeModal = () => this.props.handleModalClose();


    render() {
        return (
            <div className="static-modal">
                <Modal show={this.props.show} onHide={this.closeModal} backdrop="static">
                    <Modal.Header className="bg-danger">
                        <Modal.Title>
                            <h5 className="modal-title bg-danger text-white">Contact #{this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)}</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group required">
                            <label htmlFor="description" className="control-label">Are you sure want to delete the contact? </label><br></br>
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <div className="modal-footer pt-3">
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                        <button type="button" className="btn btn-md btn-primary" onClick={() => { this.handleSave() }}>Confirm</button>
                    </div>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}