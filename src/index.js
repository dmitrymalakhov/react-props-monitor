const CHANNEL = '__REACT_PROPS_FORTUNETELLER_';

window[CHANNEL] = new Map();

const propsFortuneteller = React => {
  const createElement = React.createElement;

  if (createElement) {
    // eslint-disable-next-line no-param-reassign
    React.createElement = (type, props, children) => {
      window[CHANNEL].set(type.displayName, props);
      return createElement.call(React, type, props, children);
    };
  }

  return React;
};

export default propsFortuneteller;
