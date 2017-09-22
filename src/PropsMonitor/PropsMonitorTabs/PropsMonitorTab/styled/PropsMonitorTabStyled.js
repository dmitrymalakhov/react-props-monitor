/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

const active = ({ active }) => active
  ? `
    &:after {
      display: block;
      content: '';
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      background-color: #d9003f;
      height: 4px;
    }
  `
  : null;


const PropsMonitorTabStyled = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  user-select: none;
  position: relative;
  font-size: 13px;
  line-height: 1.25;
  text-transform: uppercase;
  min-height: 48px;
  min-width: 120px;
  max-width: 320px;
  padding-top: 4px;
  padding-bottom: 4px;
  transition-property: color,background-color,opacity;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
  transition-delay: 0ms;
  cursor: pointer;
  ${active}

  &:hover {
    color: #212121;
    background-color: rgba(0,0,0,0.1);
    font-weight: 400;
    opacity: 0.9;
  }


`;

PropsMonitorTabStyled.displayName = 'PropsMonitorTabStyled';

export default PropsMonitorTabStyled;
