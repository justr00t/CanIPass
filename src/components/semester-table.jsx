import React from 'react';
import { Table, OverlayTrigger, Popover, Glyphicon } from 'react-bootstrap';

class SemesterTableRow extends React.Component {
  render() {
    if (!this.props.courseInfo) {
      return (
        <tr>
          {this.props.correspFields.map(field =>
            <td key={field}>&nbsp;.</td>)}
        </tr>
      );
    }

    return (
      <tr>
        {this.props.correspFields.map(field =>
          <td key={field}>{this.props.courseInfo[field]}</td>)}
      </tr>
    );
  }
}

export default class SemesterTable extends React.Component {
  render() {
    console.log(this.props);
    var headerRow = [];
    for (let i = 0; i < this.props.fields.length; i++) {
      let field = this.props.fields[i];
      if (this.props.fieldDescriptions[i]) {
        let popover = (
          <Popover id={'popover-' + this.props.fields[i]}>
            {this.props.fieldDescriptions[i]}
          </Popover>
        );
        headerRow.push(
          <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="top"
            overlay={popover}>
            <th key={field}>
              {field}&nbsp;
              <Glyphicon glyph="info-sign" />
            </th>
          </OverlayTrigger>
        );
      } else {
        headerRow.push(
          <th key={field}>{field}</th>
        );
      }
    }
    const tableHead = <thead><tr>{headerRow}</tr></thead>;

    var tableBody = [];
    if (this.props.courses) {
      tableBody = this.props.courses.map(course => (
        <SemesterTableRow
          key={course['course']}
          courseInfo={course}
          correspFields={this.props.correspFields}
        />))
    } else {
      for (let i = 0; i < this.props.numCourses; i++) {
        tableBody.push(
          <SemesterTableRow correspFields={this.props.correspFields} />);
      }
    }
    return (
      <Table responsive={true} bordered={true} condensed={false} hover={true}>
        {tableHead}
        <tbody>
        {tableBody}
        </tbody>
      </Table>
    );
  }
}

