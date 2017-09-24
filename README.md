# react-props-monitor

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

**ctrl+i to open a monitor.**

![react-props-monitor](docs/demo.gif)

### Coming soon

- custom error handler
- forecast for types based on real props in runtime
