/**
 * @author Dmitry Malakhov
 */

'use strict';

import R from 'ramda';
import { CHANNEL } from './constants';
import createBroadcast from './create-broadcast';

const broadcast = createBroadcast();

window[CHANNEL] = {
  props: new Map(),
  types: new Map(),
  broadcast,
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
  'PropsMonitor',
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
      notNeededSnapshot = R.equals(propsSnapshots[len - 1], nextProps);

    if (!notNeededSnapshot) {
      propsSnapshots.push(R.clone(nextProps));
      window[CHANNEL].props.set(name, propsSnapshots);
    }
  } else {
    window[CHANNEL].props.set(name, [R.clone(nextProps)]);
    window[CHANNEL].types.set(name, type.propTypes);
  }

  broadcast.publish(Array.from(window[CHANNEL].props.keys()));
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
