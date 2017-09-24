/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

const display = ({ active }) => `
  display: ${active ? 'flex' : 'none'};
`;

const PropsMonitorStyled = styled.div`
  font-family: Roboto, sans-serif;
  flex-direction: row;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  width: 40%;
  border: 1px solid rgb(232, 232, 232);
  backgroud: white;
  z-index: 9999;
  ${display}
`;

PropsMonitorStyled.displayName = 'SidebarBoxStyled';

export default PropsMonitorStyled;
