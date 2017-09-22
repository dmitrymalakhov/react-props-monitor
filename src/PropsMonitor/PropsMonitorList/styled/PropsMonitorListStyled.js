/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

const PropsMonitorItemStyled = styled.menu`
  width: 250px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #ffffff;
  min-height: 40px;
  line-height: 1.5;
  z-index: 2;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
`;

PropsMonitorItemStyled.displayName = 'PropsMonitorItemStyled';

export default PropsMonitorItemStyled;
