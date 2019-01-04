import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class SemesterSubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value
      + " with a rating of " + this.props.rating);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} method="post">
        <FormGroup>
          <ControlLabel>Semester Name</ControlLabel>
          <FormControl type="text" name="name"
                       placeholder="Enter a name for this semester."
                       value={this.state.value}
                       onChange={this.handleChange} />
          <HelpBlock>
            Semester name cannot be the same as other semesters you've saved.
          </HelpBlock>
          <FormControl type="hidden" name="courseInfo"
                        value={JSON.stringify(this.props.courses)} />
          <FormControl type="hidden" name="ourRating"
                       value={this.props.rating} />
        </FormGroup>
        <Button type="submit">
          Save Semester
        </Button>
      </form>
    );
  }
}

const semesterNames = [
  'Fall 2017',
  'Summer 2017',
  'Spring 2017',
  'Fall 2016',
  'Summer 2016',
  'Spring 2016',
  'Fall 2015',
  'Summer 2015',
  'Spring 2015',
  'Fall 2014',
  'Summer 2014',
  'Spring 2014',
];

