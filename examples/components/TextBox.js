/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';

const TextBox = props => (
  <span>
    {props.title}
  </span>
);

TextBox.displayName = 'TextBox';

export default TextBox;
