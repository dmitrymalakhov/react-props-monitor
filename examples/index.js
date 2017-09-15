import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';

const container = document.getElementById('container');

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root title="TEST" />,
    container
  );
});
