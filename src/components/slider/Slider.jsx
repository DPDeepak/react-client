import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import { getRandomNumber, getNextRoundRobin } from '../../lib/utils';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
    };
  }

  componentDidMount() {
    const { duration, random } = this.props;
    this.interval = setInterval(() => {
      const { index } = this.state;
      if (random) {
        this.setState({
          index: getRandomNumber(6),
        });
        return;
      }
      const val = getNextRoundRobin(6, index);
      this.setState({
        index: val,
      });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      defaultBanner, banners, altText, height, ...rest
    } = this.props;
    const { index } = this.state;
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <img src={banners[index]} {...rest} alt={altText} height={height} />
        </div>
      </>
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string),
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

Slider.defaultProps = {
  altText: 'Default Banner',
  banners: '',
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 3000,
  height: 200,
  random: false,
};

export default Slider;
