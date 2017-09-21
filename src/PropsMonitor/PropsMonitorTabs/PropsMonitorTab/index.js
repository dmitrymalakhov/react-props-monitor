/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PropsMonitorTabStyled } from './styled';
import { noop } from '../../utils';

const propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  name: '',
  onClick: noop,
};

class PropsMonitorTab extends PureComponent {
  constructor(props) {
    super(props);

    this._handleOnClick = this._handleOnClick.bind(this);
  }

  _handleOnClick() {
    this.props.onClick(this.props.name);
  }

  render() {
    return (
      <PropsMonitorTabStyled onClick={this._handleOnClick}>
        {this.props.name}
      </PropsMonitorTabStyled>
    );
  }
}

PropsMonitorTab.propTypes = propTypes;
PropsMonitorTab.defaultProps = defaultProps;
PropsMonitorTab.displayName = 'PropsMonitorTab';

export default PropsMonitorTab;
