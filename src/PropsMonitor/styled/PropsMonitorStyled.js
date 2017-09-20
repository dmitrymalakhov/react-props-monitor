/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

const display = ({ active }) => `
  display: ${active ? 'block' : 'none'};
`;

const PropsMonitorStyled = styled.div`
  font-family: Roboto, sans-serif;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
  ${display}
`;

PropsMonitorStyled.displayName = 'SidebarBoxStyled';

export default PropsMonitorStyled;
