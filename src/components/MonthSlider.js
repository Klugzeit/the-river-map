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
      1: { name: 'January', short: 'Jan' } ,
      2: { name: 'February', short: 'Feb' },
      3: { name: 'March', short: 'Mar' },
      4: { name: 'April', short: 'Apr' },
      5: { name: 'May', short: 'May' },
      6: { name : 'June', short: 'Jun' },
      7: { name: 'July', short: 'Jul' },
      8: { name: 'August', short: 'August' },
      9: { name: 'September', short: 'Sep' },
      10: { name: 'October', short: 'Oct' },
      11: { name: 'November', short: 'Nov' },
      12: { name: 'December', short: 'Dec' }
    }

    this.state = {
      value: this.props.defaultSliderRange
    };
  }

  getLabel(value, type) {
    if (type === 'value') {
      return this.month[value].short;
    } else if (type === 'min') {
      return this.month[1].short;
    } else if (type === 'max') {
      return this.month[12].short;
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