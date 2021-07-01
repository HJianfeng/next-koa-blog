
import React, { Component } from 'react';
import './index.less';

class NProgress extends Component {
  static start() {
    const timer = setInterval(() => {
      this.setState((preProps) => {
        const setPercent = preProps.percent + 10;
        if (setPercent >= 100) {
          clearInterval(timer);
        }
        return {
          percent: setPercent >= 90 ? 90 : setPercent

        };
      });
    }, 1000);
    this.setState(() => ({ percent: 2, timer, showProgress: true }));
  }

  static stop() {
    const { timer } = this.state;
    if (timer) clearInterval(timer);
    this.setState({ percent: 100, timer: null });
    this.hide();
  }

  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      timer: null,
      showProgress: false,
      speed: props.speed || 1000
    };
    // static
    NProgress.start = NProgress.start.bind(this);
    NProgress.stop = NProgress.stop.bind(this);
    // react
    this.hide = this.hide.bind(this);
  }

  componentWillUnmount() {
    const { timer } = this.state;
    if (timer) clearTimeout(timer);
    this.setState({ percent: 0, showProgress: false });
  }

  hide() {
    this.setState({ percent: 100, speed: 500 });
    setTimeout(() => {
      this.setState({ showProgress: false, percent: 0 });
    }, 600);
  }

  style() {
    const {
      percent, speed, color
    } = this.state;
    const speedSecond = speed / 1000;
    return {
      backgroundColor: color || '#1890ff',
      width: `${percent}%`,
      transition: `all ${speedSecond}s ease`
    };
  }

  render() {
    const { showProgress } = this.state;
    if (showProgress) {
      return (
        <div className="NProgress-container">
          <div
            className="NProgress-content"
            style={this.style()}
          />
        </div>
      );
    }
    return null;
  }
}

export default NProgress;
