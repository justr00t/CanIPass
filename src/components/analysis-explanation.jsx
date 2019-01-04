import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class AnalysisExplanation extends React.Component {
  render() {
    var reasonList = this.props.reasons.map(reason => <ListGroupItem>{reason}</ListGroupItem>);
    return (
      <ListGroup>
        {reasonList}
      </ListGroup>
    );
  }
}

