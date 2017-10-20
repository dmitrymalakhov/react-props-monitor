/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PropsMonitorItem from './PropsMonitorItem';
import PropsMonitorGroup from './PropsMonitorGroup';
import { PropsMonitorListStyled } from './styled';
import { noop, camelize } from '../utils';

const propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.string,
  ),
  defaultValue: PropTypes.string,
  groups: PropTypes.arrayOf(
    PropTypes.func,
  ),
  onChange: PropTypes.func,
};

const defaultProps = {
  components: [],
  defaultValue: void 0,
  groups: void 0,
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

  _renderItemsBy(components) {
    const { defaultValue } = this.props;

    return components.map(name => (
      <PropsMonitorItem
        key={name}
        active={name === defaultValue}
        name={name}
        onClick={this._handleChange}
      />
    ));
  }

  _renderPropsMonitorList() {
    const { components, groups } = this.props;

    if (groups) {
      const UNGROUPED_GROUP = {
        key: 'withoutGroup',
        title: 'Without Group',
      };

      const groupedComponents = new Map([[
        UNGROUPED_GROUP.key,
        {
          title: UNGROUPED_GROUP.title,
          components: [],
        },
      ]]);

      components.forEach(componentName => {
        let isGroupedComponent = false;

        groups.forEach(groupFn => {
          const groupTitle = groupFn({ name: componentName });

          if (groupTitle) {
            if (typeof groupTitle === 'string') {
              const groupKey = camelize(groupTitle);
              
              isGroupedComponent = true;

              if (groupedComponents.has(groupKey)) {
                groupedComponents.get(groupKey).components.push(componentName);
              } else {
                groupedComponents.set(groupKey, {
                  components: [componentName],
                  title: groupTitle,
                });
              }
            } else {
              console.warn(
                `[REACT-PROPS-MONITOR] Warning: Wrong type of title group: supplied ${groupTitle}, but expected string.`
              );
            }
          }
        });

        if (!isGroupedComponent)
          groupedComponents.get(UNGROUPED_GROUP.key).components.push(componentName);
      });

      return Array.from(groupedComponents.keys()).map(groupName => {
        const group = groupedComponents.get(groupName);

        return (
          <PropsMonitorGroup key={groupName} title={group.title}>
            { this._renderItemsBy(group.components) }
          </PropsMonitorGroup>
        );
      });
    }

    return this._renderItemsBy(components);
  }

  render() {
    const propsMonitorItems = this._renderPropsMonitorList();

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
