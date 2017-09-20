/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import {
  PropsMonitorItemStyled,
  PropsMonitorItemButtonStyled,
} from './styled';

class PropsMonitorList extends PureComponent {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    const { name, onClick } = this.props;
    onClick(name);
  }

  render() {
    const { name } = this.props;

    return (
      <PropsMonitorItemStyled>
        <PropsMonitorItemButtonStyled onClick={this._handleClick}>
          { name }
        </PropsMonitorItemButtonStyled>
      </PropsMonitorItemStyled>
    );
  }
}

PropsMonitorList.displayName = 'PropsMonitorList';

export default PropsMonitorList;
