# react-props-monitor

In-depth checking props in runtime for any React app.

[![npm](https://img.shields.io/npm/dm/react-props-monitor.svg)](https://www.npmjs.com/package/react-props-monitor)

## Install

```bash
yarn add -D react-props-monitor
```

or

```bash
npm install --save-dev react-props-monitor
```

## Usage

```javascript
import React from 'react';
import initPropsMonitor, { PropsMonitor } from 'react-props-monitor';

initPropsMonitor(React);

/../

render() {
  return (
    <div>
      <Root />
      <PropsMonitor />
    </div>
  );
}

```

> **ctrl+i** to open a monitor.

![react-props-monitor](docs/demo.gif)

## Catch error of validation

### PropTypes

PropsMonitor displays exactly which props caused the error based on PropTypes of component.

### Custom validation function

You can define any validation function for props, based on prevProps, nextProps and name of component.

```javascript
const costIsVerySmallNumber = ({ nextProps }) => {
  if (nextProps.value < 2000000)
    return 'Caution your cost prop is small a number.';

  return false;
};

const costShouldIncrease = ({ prevProps, nextProps, name }) => {
  if (
    name === 'TextBox' &&
    prevProps &&
    prevProps.cost > nextProps.cost
  ) {
    return 'Hey dude, I think you must to increase your cost.';
  }

  return false;
};

const validationFns = [
  costIsVerySmallNumber,
  costShouldIncrease,
];

/../

render() {
  return (
    <div>
      <Root />
      <PropsMonitor validation={validationFns} />
    </div>
  );
}

```

## Grouping components

For a list of components you can add grouping

![react-props-monitor](docs/groups.png)

```javascript

const groupExtraComponents = ({ name }) =>
  /^Extra/.test(name)
    ? `Extra`
    : null;

const groupsFns = [
  groupExtraComponents,
];

/../

render() {
  return (
    <div>
      <Root />
      <PropsMonitor groups={groupsFns} />
    </div>
  );
}

```

### Coming soon

- define and lock props
- forecast for types based on real props in runtime
