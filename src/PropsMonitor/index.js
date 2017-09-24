/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import JSONTree from 'react-json-tree';
import styled from 'styled-components';
import PropsMonitorList from './PropsMonitorList';
import PropsMonitorTabs from './PropsMonitorTabs';
import { PropsMonitorStyled } from './styled';
import { CHANNEL } from '../constants';

const KEY_CODE_I = 73;

const DefaultContentStyled = styled.div`
  padding: 10px;
`;

const theme = {
  scheme: 'google',
  author: 'seth wright (http://sethawright.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#CC342B',
  base09: '#F96A38',
  base0A: '#FBA922',
  base0B: '#198844',
  base0C: '#3971ED',
  base0D: '#3971ED',
  base0E: '#A36AC7',
  base0F: '#3971ED',
};

class PropsMonitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      currentComponent: void 0,
    };

    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleChangeComponent = this._handleChangeComponent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this._handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeydown);
  }

  _getHistoryContent() {
    const { currentComponent } = this.state;

    if (!currentComponent) {
      return (
        <DefaultContentStyled>
          Please select component from list
        </DefaultContentStyled>
      );
    }

    return window[CHANNEL].get(currentComponent).map((data, idx) => (
      <JSONTree key={idx} theme={theme} data={data} />
    ));
  }

  _handleKeydown({ keyCode, ctrlKey }) {
    if (keyCode === KEY_CODE_I && ctrlKey)
      this.setState({ active: !this.state.active });
  }

  _handleChangeComponent({ value }) {
    this.setState({
      currentComponent: value,
    });
  }

  render() {
    const { active, currentComponent } = this.state;

    const tabs = {
      history: this._getHistoryContent(),
      forecast: <DefaultContentStyled>Coming soon</DefaultContentStyled>,
    };

    return (
      <PropsMonitorStyled active={active}>
        <PropsMonitorList
          defaultValue={currentComponent}
          components={window[CHANNEL]}
          onChange={this._handleChangeComponent}
        />
        <PropsMonitorTabs tabs={tabs} />
      </PropsMonitorStyled>
    );
  }
}

PropsMonitor.displayName = 'PropsMonitor';

export default PropsMonitor;
