/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import TextBox from './components/TextBox';
import initPropsMonitor, { PropsMonitor } from '../src';

initPropsMonitor(React);

class Root extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Title as String',
    };

    this._handleClickBoolean = this._handleClickBoolean.bind(this);
    this._handleClickString = this._handleClickString.bind(this);
    this._handleClickNumber = this._handleClickNumber.bind(this);
  }

  _handleClickBoolean() {
    this.setState({
      title: true,
    });
  }

  _handleClickString() {
    this.setState({
      title: 'The pen is mightier than the sword',
    });
  }

  _handleClickNumber() {
    this.setState({
      title: 1000000,
    });
  }

  render() {
    return (
      <div>
        <TextBox title={this.state.title} />
        <button onClick={this._handleClickBoolean}>SetBoolean</button>
        <button onClick={this._handleClickString}>SetString</button>
        <button onClick={this._handleClickNumber}>SetNumber</button>
        <PropsMonitor />
      </div>
    );
  }
}

Root.displayName = 'Root';

export default Root;
