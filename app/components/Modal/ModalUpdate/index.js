//Third Party
import React from 'react'
import { 
    Row,
    Col,
    Modal, 
    Button, 
    FormControl, 
    FormGroup, 
    ControlLabel, 
    Label
} from 'react-bootstrap'

//Modal
class ModalUpdateComponent extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
            ...{tags: []},
            ...this.props.TODO
        };

        this.tags = [
            'Home', 'Work', 'Fun', 'Friends', 'Health', 'Vacations', '2017', '2018', 'Others', 'Important'
        ];
	}

    titleChange (event) {
        this.setState({
            title: event.target.value
        });
    }

	descriptionChange (event) {
		this.setState({
			description: event.target.value
		});
	}

    removeTag (event) {

        //Retrieve Tag from Clicked element
        const tag = event.target.getAttribute('tag');

        //Add tag to TODO
        this.tags.push(tag);

        //Remove TAG from list of available TAGS
        let tags = this.state.tags.slice();
            tags.splice(tags.indexOf(tag));
        this.setState({tags});
    }

    addTag (event) {

        //Retrieve Tag from Clicked element
        const tag = event.target.getAttribute('tag');

        //Remove TAG from list of available TAGS
        this.tags.splice(this.tags.indexOf(tag), 1);

        //Add tag to TODO
        let tags = this.state.tags.slice();
            tags.push(tag);
        this.setState({tags});
    }

	save () {
		this.props.saveModal(this.state);
	}

    render () {
        return (
            <Modal show={this.props.open}>
                <Modal.Header>
                    <Modal.Title>{`Updating TODO "${this.props.TODO.title}"`}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text" 
                            placeholder="Title" 
                            value={this.state.title} onChange={event => this.titleChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Description</ControlLabel>
                    	<FormControl 
                            type="text" 
                            placeholder="Description" 
                            value={this.state.description} onChange={event => this.descriptionChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Tags</ControlLabel>
                        <Row>
                            <Col xs={12}>
                                {
                                    this.state.tags.map(
                                        tag => <span>
                                                    <Label
                                                        key={tag}
                                                        bsStyle="success"
                                                        onClick={event => this.removeTag(event)}
                                                        tag={tag}>
                                                            {tag}
                                                    </Label>
                                                    { ' ' }
                                                </span>
                                    )
                                }
                                {
                                    this.tags.map(
                                        tag => <span>
                                                    <Label
                                                        key={tag}
                                                        bsStyle="info"
                                                        onClick={event => this.addTag(event)}
                                                        tag={tag}>
                                                            {tag}
                                                    </Label>
                                                    { ' ' }
                                                </span>
                                    )
                                }
                            </Col>
                        </Row>
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                	<Button onClick={() => this.save()}>Save</Button>
                	<Button onClick={event => this.props.close(event)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default ModalUpdateComponent