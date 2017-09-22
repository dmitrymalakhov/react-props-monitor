/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  PropsMonitorTabsStyled,
  PropsMonitorTabsListStyled,
  PropsMonitorTabsContentStyled,
} from './styled';

import PropsMonitorTab from './PropsMonitorTab';

const propTypes = {
  tabs: PropTypes.objectOf(
    PropTypes.element,
  ),
};

const defaultProps = {
  tabs: {
    name: <div />,
  },
};

class PropsMonitorTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tabName: Object.keys(props.tabs)[0],
    };

    this._handleOnClickTab = this._handleOnClickTab.bind(this);
  }

  _handleOnClickTab(tabName) {
    this.setState({
      tabName,
    });
  }

  _renderTabs() {
    const { tabs } = this.props,
      { tabName } = this.state;

    if (!tabs)
      return null;

    return Object.keys(tabs).map(name => (
      <PropsMonitorTab
        active={name === tabName}
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
        <PropsMonitorTabsContentStyled>
          {content}
        </PropsMonitorTabsContentStyled>
      </PropsMonitorTabsStyled>
    );
  }
}

PropsMonitorTabs.propTypes = propTypes;
PropsMonitorTabs.defaultProps = defaultProps;
PropsMonitorTabs.displayName = 'PropsMonitorTabs';

export default PropsMonitorTabs;
