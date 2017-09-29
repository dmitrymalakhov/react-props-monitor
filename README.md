# react-props-monitor

[![npm](https://img.shields.io/npm/dm/react-props-monitor.svg)](https://www.npmjs.com/package/react-props-monitor)

Analysis props in any React app.

### Install

```bash
yarn add -D react-props-monitor
```

or

```bash
npm install --save-dev react-props-monitor
```

### Usage

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

### Error catch

PropsMonitor displays exactly which props caused the error on based PropTypes of component.

### Coming soon

- custom error handler
- define and lock props
- forecast for types based on real props in runtime
