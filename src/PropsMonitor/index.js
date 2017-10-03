/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import styled from 'styled-components';
import R from 'ramda';
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
};

const defaultProps = {
  validation: [],
};

class PropsMonitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      currentComponent: void 0,
      uniqueProps: false,
      componentsNames: [],
    };

    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleChangeComponent = this._handleChangeComponent.bind(this);
    this._handleChangeUniq = this._handleChangeUniq.bind(this);
  }

  componentWillMount() {
    // const { subscribe } = window[CHANNEL].broadcast;
    // this._unsubscribe = subscribe(componentsNames => {
    //   this.setState({
    //     componentsNames,
    //   });
    // });
  }

  componentDidMount() {
    if (this._unsubscribe) this._unsubscribe();
    window.addEventListener('keydown', this._handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeydown);
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
      fns.push(R.uniq);

    const props = window[CHANNEL].props.get(currentComponent),
      types = window[CHANNEL].types.get(currentComponent);

    const filtered =
      R.compose(...fns)(props);

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

      const validator = R.juxt(this.props.validation),
        filterNotValid = value => R.filter(item => item, value),
        concatWithAnotherErrors = value => R.concat(errorMessages, value);

      const createMessage = msg => (
        <PropsMonitorProblemMessageStyled key={msg}>
          {msg}
        </PropsMonitorProblemMessageStyled>
      );

      const mapMessageToComponent = errors => R.map(createMessage, errors);

      const errors = R.compose(
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
          {`Problems: ${problemCount}`}
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
    const { active, currentComponent, componentsNames } = this.state;

    const tabs = {
      history: this._getHistoryContent(),
      forecast: <ContentStyled>Coming soon</ContentStyled>,
    };

    return (
      <PropsMonitorStyled active={active}>
        <PropsMonitorList
          defaultValue={currentComponent}
          components={componentsNames}
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
