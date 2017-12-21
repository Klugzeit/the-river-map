import React, { Component } from 'react';
// import '../css/App.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/input-range/input-range.css';


class MonthSlider extends Component {
  constructor(props) {
    super(props);

    this.minValue = 1;    
    this.maxValue = 12;

    this.month = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    }

    this.state = {
      value: this.props.defaultSliderRange
    };
  }

  getLabel(value, type) {
    if (type === 'value') {
      return this.month[value];
    } else if (type === 'min') {
      return 'January';
    } else if (type === 'max') {
      return 'December';
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