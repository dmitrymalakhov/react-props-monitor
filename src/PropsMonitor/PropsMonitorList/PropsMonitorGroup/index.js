/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import {
  PropsMonitorGroupMenuStyled,
  PropsMonitorGroupTitleStyled,
} from './styled';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: '',
};

const PropsMonitorGroup = props => (
  <PropsMonitorGroupMenuStyled>
    <PropsMonitorGroupTitleStyled>
      {props.title}
    </PropsMonitorGroupTitleStyled>
    {props.children}
  </PropsMonitorGroupMenuStyled>
);

PropsMonitorGroup.propTypes = propTypes;
PropsMonitorGroup.defaultProps = defaultProps;
PropsMonitorGroup.displayName = 'PropsMonitorGroup';

export default PropsMonitorGroup;
