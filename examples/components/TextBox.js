/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  title: '',
};

const TextBox = props => (
  <span>
    {props.title}
  </span>
);

TextBox.propTypes = propTypes;
TextBox.defaultProps = defaultProps;
TextBox.displayName = 'TextBox';

export default TextBox;
