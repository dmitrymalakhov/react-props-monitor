/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';

const container = document.getElementById('container');

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    container
  );
});
