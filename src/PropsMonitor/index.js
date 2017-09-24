/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import JSONTree from 'react-json-tree';
import PropsMonitorList from './PropsMonitorList';
import PropsMonitorTabs from './PropsMonitorTabs';
import { PropsMonitorStyled } from './styled';
import { CHANNEL } from '../constants';

const KEY_CODE_I = 73;

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

    if (!currentComponent)
      return <div>history</div>;

    return window[CHANNEL].get(currentComponent).map((data, idx) => (
      <JSONTree key={idx} data={data} />
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
      forecast: <div>coming soon</div>,
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
