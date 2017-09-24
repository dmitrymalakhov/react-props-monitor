/**
 * @author Dmitry Malakhov
 */

'use strict';

import R from 'ramda';
import { CHANNEL } from './constants';

window[CHANNEL] = new Map();

const defaultExclude = [
  'TopLevelWrapper',
  'PropsMonitorList',
  'PropsMonitorTab',
  'PropsMonitorTabs',
  'SidebarBoxStyled',
  'PropsMonitorItemButtonStyled',
  'PropsMonitorTabStyled',
  'PropMonitorCheckbox',
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

  if (window[CHANNEL].has(name)) {
    const propsSnapshots = window[CHANNEL].get(name),
      len = propsSnapshots.length,
      notNeededSnapshot = R.equals(propsSnapshots[len - 1], nextProps);

    if (!notNeededSnapshot) {
      propsSnapshots.push(nextProps);
      window[CHANNEL].set(name, propsSnapshots);
    }
  } else {
    window[CHANNEL].set(name, [nextProps]);
  }
};

const propsFortuneteller = (React, opts = {}) => {
  const createElement = React.createElement;

  if (createElement) {
    // eslint-disable-next-line no-param-reassign
    React.createElement = (type, props, ...children) => {
      propsCollector(type, props, opts);
      return createElement.apply(React, R.flatten([type, props, children]));
    };
  }

  return React;
};

export default propsFortuneteller;
