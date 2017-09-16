import R from 'ramda';

const CHANNEL = '__REACT_PROPS_FORTUNETELLER_';

window[CHANNEL] = new Map();

const defaultExclude = ['TopLevelWrapper'];

const propsCollector = (type, nextProps, { exclude }) => {
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
