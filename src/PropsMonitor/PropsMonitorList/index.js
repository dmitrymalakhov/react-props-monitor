/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropsMonitorItem from './PropsMonitorItem';

class PropsMonitorList extends PureComponent {
  _renderPropsMonitorItems() {
    const { components } = this.props;

    const items = [];

    components.forEach((value, name) => {
      items.push(
        <PropsMonitorItem key={name} name={name} />
      );
    });

    return items;
  }

  render() {
    const propsMonitorItems = this._renderPropsMonitorItems();

    return (
      <ul>
        { propsMonitorItems }
      </ul>
    );
  }
}

export default PropsMonitorList;
