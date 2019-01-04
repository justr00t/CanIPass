import React from 'react';
import { Grid, Row, Col, Jumbotron, Panel } from 'react-bootstrap';
import SemesterTable from './semester-table';
import { CourseBarGraph } from './charts';
import DifficultyView from './difficulty-view';
import AnalysisExplanation from './analysis-explanation';
import SemesterSubmitForm from './semester-submit';

export default class AnalysisRoot extends React.Component {
  render() {
    var submitForm;
    if (this.props.loggedIn) {
      submitForm = <Panel header={<h2>Save Your Semester</h2>}>
        <SemesterSubmitForm courses={this.props.courses}
                            rating={this.props.rating} />
      </Panel>
    }

    var gpas = [];
    this.props.courses.map(course => gpas.push(course['gpa']));
    return (
      <Grid fluid={true}>
        <Row>
          <Col md={6} mdOffset={1}>
            <Panel header={<h2>Your Semester Difficulty</h2>} bsStyle="primary">
              <DifficultyView rating={this.props.rating} />
            </Panel>
          </Col>
          <Col md={4}>
            <Panel header={<h2>Analysis</h2>} bsStyle="info">
              <AnalysisExplanation reasons={this.props.reasons} />
            </Panel>
            {submitForm}
          </Col>
        </Row>
        <Row>
          <Col md={5} mdOffset={1}>
            <Panel header={<h2>Your Courses</h2>}>
              <SemesterTable {...this.props} />
            </Panel>
          </Col>
          <Col md={5}>
            <Panel header={<h2>GPA Frequency</h2>}>
              <CourseBarGraph numBaskets={10} gpas={gpas} />
            </Panel>
          </Col>
        </Row>
        <Row style={{height: 50}}/>
      </Grid>
    );
  }
}