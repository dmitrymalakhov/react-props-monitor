/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropsMonitorItem from './PropsMonitorItem';
import { PropsMonitorListStyled } from './styled';

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
      <PropsMonitorListStyled>
        { propsMonitorItems }
      </PropsMonitorListStyled>
    );
  }
}

export default PropsMonitorList;
