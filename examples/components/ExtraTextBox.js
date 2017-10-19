/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  title: '',
};

const ExtraTextBox = props => (
  <span>
    {props.title}
  </span>
);

ExtraTextBox.propTypes = propTypes;
ExtraTextBox.defaultProps = defaultProps;
ExtraTextBox.displayName = 'ExtraTextBox';

export default ExtraTextBox;
