/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PropsMonitorItem from './PropsMonitorItem';
import { PropsMonitorListStyled } from './styled';
import { noop } from '../utils';

const propTypes = {
  components: PropTypes.object,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  components: new Map(),
  defaultValue: void 0,
  onChange: noop,
};

class PropsMonitorList extends PureComponent {
  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(value) {
    this.props.onChange(value);
  }

  _renderPropsMonitorItems() {
    const { components, defaultValue } = this.props;

    const items = [];
    components.forEach((value, name) => {
      items.push(
        <PropsMonitorItem
          key={name}
          active={name === defaultValue}
          name={name}
          onClick={this._handleChange}
        />
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

PropsMonitorList.propTypes = propTypes;
PropsMonitorList.defaultProps = defaultProps;
PropsMonitorList.displayName = 'PropsMonitorList';

export default PropsMonitorList;
