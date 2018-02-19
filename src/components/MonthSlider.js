import React, { Component } from 'react';
import InputRange from 'react-input-range';
import months from './months';
import '../css/input-range.css';
/*import 'react-input-range/lib/css/input-range/input-range.css';*/


class MonthSlider extends Component {
  constructor(props) {
    super(props);

    this.minValue = 1;    
    this.maxValue = 12;

    this.state = {
      value: this.props.defaultSliderRange
    };
  }

  getLabel(value, type) {
    if (type === 'value') {
      return months[value].short;
    } else if (type === 'min') {
      return months[1].short;
    } else if (type === 'max') {
      return months[12].short;
    }
  }

  handleSliderChange(value) {
    this.setState({value: value});
    if (this.props.onSliderChange) {
      this.props.onSliderChange(value);
    }
  }

  render() {
    return (
      <div className='sliderBox'>
        <InputRange
          maxValue={this.maxValue}
          minValue={this.minValue}
          value={this.state.value}
          formatLabel={this.getLabel.bind(this)}
          onChange={this.handleSliderChange.bind(this)} />
      </div>
    );
  }
}

export default MonthSlider;