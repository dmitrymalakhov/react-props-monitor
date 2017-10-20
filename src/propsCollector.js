/**
 * @author Dmitry Malakhov
 */

'use strict';

import { flatten, equals } from 'ramda';
import { CHANNEL } from './constants';

window[CHANNEL] = {
  props: new Map(),
  types: new Map(),
};

const defaultExclude = [
  'TopLevelWrapper',
  'PropsMonitorList',
  'PropsMonitorTab',
  'PropsMonitorTabs',
  'SidebarBoxStyled',
  'PropsMonitorItemButtonStyled',
  'PropsMonitorTabStyled',
  'PropMonitorCheckbox',
  'PropsMonitorStyled',
  'PropsMonitorProblemMessageStyled',
  'PropsMonitorGroupTitleStyled',
  'PropsMonitorGroupMenuStyled',
  'PropsMonitorGroupContentStyled',
  'PropsMonitor',
  'PropsMonitorGroup',
  'JSONTree',
  'JSONNode',
  'JSONObjectNode',
  'JSONNestedNode',
  'JSONArrow',
  'JSONValueNode',
];

const propsCollector = (type, nextProps, { exclude }) => {
  if (!type)
    return;

  const name = type.displayName || type.name;

  if (
    !name ||
    !nextProps ||
    (exclude && exclude.includes(name)) ||
    defaultExclude.includes(name)
  )
    return;

  if (window[CHANNEL].props.has(name)) {
    const propsSnapshots = window[CHANNEL].props.get(name),
      len = propsSnapshots.length,
      notNeededSnapshot = equals(propsSnapshots[len - 1], nextProps);

    if (!notNeededSnapshot) {
      propsSnapshots.push(nextProps);
      window[CHANNEL].props.set(name, propsSnapshots);
    }
  } else {
    window[CHANNEL].props.set(name, [nextProps]);
    window[CHANNEL].types.set(name, type.propTypes);
  }
};

const propsFortuneteller = (React, opts = {}) => {
  const createElement = React.createElement;

  if (createElement) {
    // eslint-disable-next-line no-param-reassign
    React.createElement = (type, props, ...children) => {
      propsCollector(type, props, opts);
      return createElement.apply(React, flatten([type, props, children]));
    };
  }

  return React;
};

export default propsFortuneteller;
