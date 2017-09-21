/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';

import {
  PropsMonitorTabsStyled,
  PropsMonitorTabsListStyled,
} from './styled';

import PropsMonitorTab from './PropsMonitorTab';

class PropsMonitorTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tabName: Object.keys(props.tabs)[0],
    }

    this._handleOnClickTab = this._handleOnClickTab.bind(this);
  }

  _handleOnClickTab(tabName) {
    this.setState({
      tabName,
    });
  }

  _renderTabs() {
    const { tabs } = this.props;

    if (!tabs)
      return null;

    return Object.keys(tabs).map(name => (
      <PropsMonitorTab
        key={name}
        name={name}
        onClick={this._handleOnClickTab}
      />
    ));
  }

  render() {
    const content = this.props.tabs[this.state.tabName];

    const tabs = this._renderTabs();

    return (
      <PropsMonitorTabsStyled>
        <PropsMonitorTabsListStyled>
          {tabs}
        </PropsMonitorTabsListStyled>
        {content}
      </PropsMonitorTabsStyled>
    );
  }
}

export default PropsMonitorTabs;
