# react-props-monitor

Simple solution to analysis props in your React project.

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

**ctrl+i** to open a monitor.
