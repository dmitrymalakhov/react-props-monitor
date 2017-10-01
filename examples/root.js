/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextBox from './components/TextBox';
import initPropsMonitor, { PropsMonitor } from '../src';

initPropsMonitor(React);

const titleIsVerySmallNumber = ({ nextProps }) => {
  if (nextProps.title < 2000000)
    return 'Caution your title prop is small a number.';

  return false;
};

const titleShouldIncrease = ({ prevProps, nextProps }) => {
  if (prevProps && prevProps.title > nextProps.title)
    return 'Hey dude, I think you must to increase your title.';

  return false;
};

const validationFns = [
  titleIsVerySmallNumber,
  titleShouldIncrease,
];

const RootStyled = styled.div``;

class Root extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Title as String',
    };

    this._handleClickBoolean = this._handleClickBoolean.bind(this);
    this._handleClickString = this._handleClickString.bind(this);
    this._handleClickNumber0 = this._handleClickNumber0.bind(this);
    this._handleClickNumber1 = this._handleClickNumber1.bind(this);
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

  _handleClickNumber0() {
    this.setState({
      title: 1000000,
    });
  }

  _handleClickNumber1() {
    this.setState({
      title: 3000000,
    });
  }

  render() {
    return (
      <RootStyled>
        <TextBox title={this.state.title} />
        <button onClick={this._handleClickBoolean}>SetBoolean</button>
        <button onClick={this._handleClickString}>SetString</button>
        <button onClick={this._handleClickNumber0}>SetNumber0</button>
        <button onClick={this._handleClickNumber1}>SetNumber1</button>
        <PropsMonitor validation={validationFns} />
      </RootStyled>
    );
  }
}

Root.displayName = 'Root';

export default Root;
