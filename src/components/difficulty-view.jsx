import React from 'react';
import {  } from 'react-bootstrap';
import { makeThreeColorGradient, rgbToCssString, rgbToCssStringAlpha } from './charts';

export default class DifficultyView extends React.Component {
  render() {
    return (
      <div>
        <h3 className="text-center big" style={{marginTop: "20px", marginBottom: "20px"}}>
          - {this.props.rating} -
        </h3>
        <div style={{width: '80%', height: '70px', margin: '0 auto'}}>
          <Scale numTicks={10} circleWidth={30} lineThickness={8} circleThickness={8}
                 endCircleWidth={50} specialEnd={true} highlightTick={this.props.rating} />
        </div>
      </div>
    );
  }
}

class Scale extends React.Component {
  render() {
    var colorGradient = makeThreeColorGradient(
      [0, 255, 0], [255, 255, 0], [255, 0, 0], 10);
    var tog = 0;
    var endCirclesContainer;
    if (this.props.specialEnd) {
      tog = 1;
      var endCircles = [];
      var endOffset = Math.round(
        (this.props.endCircleWidth - this.props.circleThickness) / 2);
      for (let i = 0; i < 2; i++) {
        let rgbString  = rgbToCssString(colorGradient[i * (this.props.numTicks - 1)]);
        let circleStyle = {
          display: 'inline-block',
          verticalAlign: 'middle',
          width: this.props.endCircleWidth,
          height: this.props.endCircleWidth,
          backgroundColor: rgbString,
          border: 'solid ' + this.props.circleThickness + 'px black',
          borderRadius: '50%',
          position: 'absolute',
          top: -endOffset,
          left: (i * 100) + '%',
        };
        endCircles.push(<div style={circleStyle}>
          <h4 style={{
            height: this.props.endCircleWidth - this.props.circleThickness * 2 + 'px',
            color: 'black',
            textAlign: 'center',
            lineHeight: this.props.endCircleWidth - this.props.circleThickness * 2 + 'px',
            marginTop: 0,
            marginBottom: 0,
          }}>
            <b>{1 + i * (this.props.numTicks - 1)}</b>
          </h4>
        </div>);
      }
      var endsContainerStyle = {
        width: '100%',
        position: 'absolute',
        left: -endOffset,
      };
      endCirclesContainer = <div style={endsContainerStyle}>{endCircles}</div>
    }
    console.log(colorGradient);
    /************************ Make highlight circle ****************************/
    let offset = Math.round((this.props.circleWidth - this.props.circleThickness) / 2);
    let increment = 100 / (this.props.numTicks - 1);
    console.log(this.props.highlightTick);
    let rgbstr  = rgbToCssString(colorGradient[this.props.highlightTick - 1]);
    let highlightWidth = (this.isEdgeIndex() ? this.props.endCircleWidth : this.props.circleWidth) +
      this.props.circleThickness*1.5 * 2;
    let highlightOffset = (this.isEdgeIndex() ? endOffset : offset) +
      this.props.circleThickness*1.5;
    console.log(rgbstr, highlightWidth, highlightOffset);
    let highlightStyle = {
      display: 'inline-block',
      verticalAlign: 'middle',
      width: highlightWidth,
      height: highlightWidth,
      backgroundColor: 'transparent',
      border: 'solid ' + this.props.circleThickness*1.5 + 'px ' + rgbstr,
      borderRadius: '50%',
      position: 'absolute',
      top: -highlightOffset,
      left: ((this.props.highlightTick - 1) * increment).toFixed(3) + '%',
    };
    var highlightContainerStyle = {
      width: '100%',
      position: 'absolute',
      left: -highlightOffset,
    };
    var highlightContainer = <div style={highlightContainerStyle}>
      <div style={highlightStyle} />
    </div>

    console.log('checkpoint 2');

    /*************************** Make middle circles *******************************/
    var tickCircles = [];
    for (let i = tog; i < this.props.numTicks - tog; i++) {
      let rgbString  = rgbToCssString(colorGradient[i]);
      let circleStyle = {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: this.props.circleWidth,
        height: this.props.circleWidth,
        backgroundColor: rgbString,
        border: 'solid ' + this.props.circleThickness + 'px black',
        borderRadius: '50%',
        position: 'absolute',
        top: -offset,
        //left: 'calc(' + (i * increment).toFixed(0) + '% ' + -offset + 'px)',
        left: (i * increment).toFixed(3) + '%',
      };
      tickCircles.push(<div style={circleStyle} />);
    }

    console.log('checkpoint 3');

    var circleContainerStyle = {
      width: '100%',
      position: 'absolute',
      left: -offset,
    };
    var lineStyle = {
      width: '100%',
      height: this.props.lineThickness,
      backgroundColor: 'black',
      position: 'absolute',
    };
    var containerStyle = {
      width: '100%',
      position: 'relative',
    };

    return (
      <div style={containerStyle}>
        <div style={lineStyle} />
        <div style={circleContainerStyle}>{tickCircles}</div>
        {endCirclesContainer}
        {highlightContainer}
      </div>
    );
  }
  isEdgeIndex() {
    return this.props.specialEnd &&
      (this.props.highlightTick == 1 || this.props.highlightTick == this.props.numTicks);
  }
}
