/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import styled from 'styled-components';

const PropsMonitorTabsStyled = styled.div`
  width: calc(100% - 250px);
`;

const PropsMonitorTabsListStyled = styled.div`
  background-color: #ECEFF7;
  display: flex;
  justify-content: flex-start;
`;

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
`;

class PropsMonitorTabs extends PureComponent {
  render() {
    return (
      <PropsMonitorTabsStyled>
        <PropsMonitorTabsListStyled>
          <PropsMonitorTabStyled>
            Tab1
          </PropsMonitorTabStyled>
          <PropsMonitorTabStyled>
            Tab2
          </PropsMonitorTabStyled>
        </PropsMonitorTabsListStyled>
      </PropsMonitorTabsStyled>
    );
  }
}

export default PropsMonitorTabs;
