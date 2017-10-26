/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  PropsMonitorGroupMenuStyled,
  PropsMonitorGroupTitleStyled,
  PropsMonitorGroupContentStyled,
} from './styled';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: '',
};

class PropsMonitorGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  _renderItems() {
    if (!this.state.expanded)
      return null;

    return (
      <PropsMonitorGroupContentStyled expanded={this.state.expanded}>
        {this.props.children}
      </PropsMonitorGroupContentStyled>
    );
  }

  render() {
    const { title, children } = this.props;

    const amountItems = React.Children.count(children);

    const items = this._renderItems();

    return (
      <PropsMonitorGroupMenuStyled>
        <PropsMonitorGroupTitleStyled onClick={this._handleClick}>
          {`${title} (${amountItems})`}
        </PropsMonitorGroupTitleStyled>
        { items }
      </PropsMonitorGroupMenuStyled>
    );
  }
}

PropsMonitorGroup.propTypes = propTypes;
PropsMonitorGroup.defaultProps = defaultProps;
PropsMonitorGroup.displayName = 'PropsMonitorGroup';

export default PropsMonitorGroup;
