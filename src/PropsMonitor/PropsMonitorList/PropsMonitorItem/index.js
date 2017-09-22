/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  PropsMonitorItemStyled,
  PropsMonitorItemButtonStyled,
} from './styled';

import { noop } from '../../utils';

const propTypes = {
  name: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  name: '',
  active: false,
  onClick: noop,
};

class PropsMonitorList extends PureComponent {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    const { name, onClick } = this.props;
    onClick({ value: name });
  }

  render() {
    const { name, active } = this.props;

    return (
      <PropsMonitorItemStyled>
        <PropsMonitorItemButtonStyled
          active={active}
          onClick={this._handleClick}
        >
          { name }
        </PropsMonitorItemButtonStyled>
      </PropsMonitorItemStyled>
    );
  }
}

PropsMonitorList.propTypes = propTypes;
PropsMonitorList.defaultProps = defaultProps;
PropsMonitorList.displayName = 'PropsMonitorList';

export default PropsMonitorList;
