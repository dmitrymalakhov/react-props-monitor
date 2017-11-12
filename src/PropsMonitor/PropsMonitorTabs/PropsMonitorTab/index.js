/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PropsMonitorTabStyled } from './styled';
import { noop } from '../../utils/misc';

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

class PropsMonitorTab extends PureComponent {
  constructor(props) {
    super(props);

    this._handleOnClick = this._handleOnClick.bind(this);
  }

  _handleOnClick() {
    this.props.onClick(this.props.name);
  }

  render() {
    const { active } = this.props;

    return (
      <PropsMonitorTabStyled active={active} onClick={this._handleOnClick}>
        {this.props.name}
      </PropsMonitorTabStyled>
    );
  }
}

PropsMonitorTab.propTypes = propTypes;
PropsMonitorTab.defaultProps = defaultProps;
PropsMonitorTab.displayName = 'PropsMonitorTab';

export default PropsMonitorTab;
