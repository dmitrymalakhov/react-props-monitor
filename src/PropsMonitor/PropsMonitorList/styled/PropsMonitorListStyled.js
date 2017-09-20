/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

const PropsMonitorItemStyled = styled.menu`
  display: block;
  min-width: 200px;
  max-width: 300px;
  margin: 0;
  list-style-type: none;
  padding: 8px 0;
  padding-top: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  width: 250px;
  background-color: #ffffff;
  min-height: 40px;
  line-height: 1.5;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
`;

PropsMonitorItemStyled.displayName = 'PropsMonitorItemStyled';

export default PropsMonitorItemStyled;
