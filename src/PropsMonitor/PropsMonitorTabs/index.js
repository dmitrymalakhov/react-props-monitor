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

`;

const PropsMonitorTabStyled = styled.button`

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
