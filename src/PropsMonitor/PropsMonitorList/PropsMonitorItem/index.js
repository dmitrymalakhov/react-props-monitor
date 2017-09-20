/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';

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
      <li>
        <a onClick={this._handleClick}>{ name }</a>
      </li>
    );
  }
}

export default PropsMonitorList;
