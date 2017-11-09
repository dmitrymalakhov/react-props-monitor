
import PropTypes from 'prop-types';

import {
  uniq,
  compose,
  juxt,
  filter,
  concat,
} from 'ramda';

export const checkPropsErrors = (componentName, props, opt) => {
  const { propTypes, validation, onlyUniq } = opt,
    filteredFns = [something => something];

  if (onlyUniq)
    filteredFns.push(uniq);

  const filteredProps =
    compose(...filteredFns)(props);

  let prevProps = null;
  
  const errors = {};

  filteredProps.forEach((data, idx) => {
    const propTypesErrorMessages = [];

    /* eslint-disable no-console */
    if (propTypes) {
      const _originalConsoleError = console.error,
        hash = Math.random();

      console.error = e => {
        propTypesErrorMessages.push(e.replace(hash, ''));
      };

      PropTypes.checkPropTypes(
        propTypes,
        data,
        'prop',
        `${componentName}${hash}`,
      );

      console.error = _originalConsoleError;
    }
    /* eslint-enable no-console */

    const opt = {
      prevProps,
      nextProps: data,
      name: componentName,
    };

    const validator = juxt(validation),
      filterNotValid = value => filter(item => item, value),
      concatWithAnotherErrors = value => concat(propTypesErrorMessages, value);

    errors[idx] = compose(
      concatWithAnotherErrors,
      filterNotValid,
    )(validator(opt));

    prevProps = data;
  });

  return errors;
};
