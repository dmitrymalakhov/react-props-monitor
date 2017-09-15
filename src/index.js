import R from 'ramda';

const CHANNEL = '__REACT_PROPS_FORTUNETELLER_';

window[CHANNEL] = new Map();

const defaultExclude = ['TopLevelWrapper'];

const propsCollector = (type, nextProps, { exclude }) => {
  const { displayName } = type;

  if (
    !displayName ||
    (exclude && exclude.includes(displayName)) ||
    defaultExclude.includes(displayName)
  )
    return;

  if (window[CHANNEL].has(displayName)) {
    const propsSnapshots = window[CHANNEL].get(displayName),
      equalsFn = prevProps => R.equals(prevProps, nextProps),
      notNeededSnapshot = R.find(equalsFn)(propsSnapshots);

    if (!notNeededSnapshot) {
      propsSnapshots.push(nextProps);
      window[CHANNEL].set(displayName, propsSnapshots);
    }
  } else {
    window[CHANNEL].set(displayName, [nextProps]);
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
