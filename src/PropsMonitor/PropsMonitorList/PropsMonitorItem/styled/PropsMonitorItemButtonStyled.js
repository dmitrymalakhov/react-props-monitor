/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

const PropsMonitorItemButtonStyled = styled.a`
  width: 100%;
  margin: 0;
  user-select: none;
  cursor: pointer;
  display: block;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 16px;
  transition-property: background-color;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
  transition-delay: 0ms;

  &:hover,
  &:focus {
    background-color: #f5f5f5;
    outline: none;
    box-shadow: none;
  }
`;

PropsMonitorItemButtonStyled.displayName = 'PropsMonitorItemButtonStyled';

export default PropsMonitorItemButtonStyled;
