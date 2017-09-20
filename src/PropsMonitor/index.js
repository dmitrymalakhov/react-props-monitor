/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import PropsMonitorList from './PropsMonitorList';
import { PropsMonitorStyled } from './styled';
import { CHANNEL } from '../constants';

const KEY_CODE_I = 73;

class PropsMonitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this._handleKeydown = this._handleKeydown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this._handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeydown);
  }

  _handleKeydown({ keyCode, ctrlKey }) {
    if (keyCode === KEY_CODE_I && ctrlKey)
      this.setState({ active: !this.state.active });
  }

  render() {
    const { active } = this.state;

    return (
      <PropsMonitorStyled active={active}>
        <PropsMonitorList components={window[CHANNEL]} />
      </PropsMonitorStyled>
    );
  }
}

PropsMonitor.displayName = 'PropsMonitor';

export default PropsMonitor;
