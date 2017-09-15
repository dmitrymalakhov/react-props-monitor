import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import propsFortuneteller from '../src';

const container = document.getElementById('container');

propsFortuneteller(React);

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    container
  );
});
