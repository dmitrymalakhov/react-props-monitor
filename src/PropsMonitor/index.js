/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import styled from 'styled-components';

import {
  uniq,
  compose,
  juxt,
  filter,
  concat,
  map,
} from 'ramda';

import PropsMonitorList from './PropsMonitorList';
import PropsMonitorTabs from './PropsMonitorTabs';
import PropMonitorCheckbox from './PropMonitorCheckbox';

import {
  PropsMonitorStyled,
  PropsMonitorToolbarStyled,
  PropsMonitorProblemMessageStyled,
} from './styled';

import { CHANNEL } from '../constants';

const KEY_CODE_I = 73;

const ContentStyled = styled.div`
  padding: 10px;
`;

const theme = {
  scheme: 'google',
  author: 'seth wright (http://sethawright.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#CC342B',
  base09: '#F96A38',
  base0A: '#FBA922',
  base0B: '#198844',
  base0C: '#3971ED',
  base0D: '#3971ED',
  base0E: '#A36AC7',
  base0F: '#3971ED',
};

const propTypes = {
  validation: PropTypes.arrayOf(
    PropTypes.func,
  ),
  groups: PropTypes.arrayOf(
    PropTypes.func,
  ),
  syncTimeout: PropTypes.number,
};

const defaultProps = {
  validation: [],
  groups: [],
  syncTimeout: 200,
};

class PropsMonitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      currentComponent: void 0,
      uniqueProps: false,
      componentsNames: [],
      propsCounter: {},
    };

    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleChangeComponent = this._handleChangeComponent.bind(this);
    this._handleChangeUniq = this._handleChangeUniq.bind(this);
    this._checkChannel = this._checkChannel.bind(this);

    this._timer = null;
  }

  componentWillMount() {
    this._checkChannel();
  }

  componentDidMount() {
    window.addEventListener('keydown', this._handleKeydown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.active !== this.state.active) {
      if (this.state.active)
        this._timer = setTimeout(this._checkChannel, this.props.syncTimeout);
      else
        clearTimeout(this._timer);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
    window.removeEventListener('keydown', this._handleKeydown);
  }

  _checkChannel() {
    const propsHistory = window[CHANNEL].props;

    const newState = {
      propsCounter: {},
    };

    let neededUpdate = false;

    if (propsHistory.size !== this.state.componentsNames.length) {
      neededUpdate = true;
      newState.componentsNames = Array.from(propsHistory.keys());
    }

    propsHistory.forEach((props, componentName) => {
      const componentPropsCount = this.state.propsCounter[componentName];

      if (componentPropsCount !== props.length)
        neededUpdate = true;

      newState.propsCounter[componentName] = props.length;
    });

    if (neededUpdate)
      this.setState(newState);

    if (this.state.active)
      this._timer = setTimeout(this._checkChannel, 200);
  }

  _getHistoryContent() {
    const { currentComponent, uniqueProps } = this.state;

    if (!currentComponent) {
      return (
        <ContentStyled>
          Please select component from list
        </ContentStyled>
      );
    }

    const fns = [something => something];

    if (uniqueProps)
      fns.push(uniq);

    const props = window[CHANNEL].props.get(currentComponent),
      types = window[CHANNEL].types.get(currentComponent);

    const filtered =
      compose(...fns)(props);

    let problemCount = 0,
      prevProps = null;

    const propsList = filtered.map((data, idx) => {
      const errorMessages = [];

      /* eslint-disable no-console */
      if (types) {
        const _originalConsoleError = console.error,
          hash = Math.random();

        console.error = e => { errorMessages.push(e.replace(hash, '')); };

        PropTypes.checkPropTypes(
          types,
          data,
          'prop',
          `${currentComponent}${hash}`,
        );

        console.error = _originalConsoleError;
      }
      /* eslint-enable no-console */

      const opt = {
        prevProps,
        nextProps: data,
        name: currentComponent,
      };

      const validator = juxt(this.props.validation),
        filterNotValid = value => filter(item => item, value),
        concatWithAnotherErrors = value => concat(errorMessages, value);

      const createMessage = msg => (
        <PropsMonitorProblemMessageStyled key={msg}>
          {msg}
        </PropsMonitorProblemMessageStyled>
      );

      const mapMessageToComponent = errors => map(createMessage, errors);

      const errors = compose(
        mapMessageToComponent,
        concatWithAnotherErrors,
        filterNotValid,
      )(validator(opt));

      problemCount += errors.length;
      prevProps = data;

      return (
        <div key={idx}>
          {errors}
          <JSONTree theme={theme} data={data} />
        </div>
      );
    });

    return (
      <ContentStyled>
        <PropsMonitorToolbarStyled>
          <PropMonitorCheckbox
            label="Unique"
            defaultChecked={uniqueProps}
            onChange={this._handleChangeUniq}
          />
          <span>
            {`Call: ${propsList.length}`}
          </span>
          <span>
            {`Problems: ${problemCount}`}
          </span>
        </PropsMonitorToolbarStyled>
        {propsList}
      </ContentStyled>
    );
  }

  _handleChangeUniq({ checked }) {
    this.setState({
      uniqueProps: checked,
    });
  }

  _handleKeydown({ keyCode, ctrlKey }) {
    if (keyCode === KEY_CODE_I && ctrlKey)
      this.setState({ active: !this.state.active });
  }

  _handleChangeComponent({ value }) {
    this.setState({
      currentComponent: value,
    });
  }

  render() {
    const {
      active,
      currentComponent,
      componentsNames,
      propsCounter,
    } = this.state;

    const { groups } = this.props;

    const tabs = {
      history: this._getHistoryContent(),
      forecast: <ContentStyled>Coming soon</ContentStyled>,
    };

    return (
      <PropsMonitorStyled active={active}>
        <PropsMonitorList
          groups={groups}
          defaultValue={currentComponent}
          components={componentsNames}
          propsCounter={propsCounter}
          onChange={this._handleChangeComponent}
        />
        <PropsMonitorTabs tabs={tabs} />
      </PropsMonitorStyled>
    );
  }
}

PropsMonitor.propTypes = propTypes;
PropsMonitor.defaultProps = defaultProps;
PropsMonitor.displayName = 'PropsMonitor';

export default PropsMonitor;
