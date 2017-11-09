/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { noop } from '../utils/misc';

const propTypes = {
  defaultChecked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  defaultChecked: false,
  label: '',
  onChange: noop,
};

class PropMonitorCheckbox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.defaultChecked,
    };

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange() {
    const checked = !this.state.checked;

    this.setState({ checked });
    this.props.onChange({ checked });
  }

  render() {
    const { label } = this.props,
      { checked } = this.state;

    return (
      <label>
        <span>
          <input
            type="checkbox"
            checked={checked}
            onChange={this._handleChange}
          />
          <span />
        </span>
        <span>{label}</span>
      </label>
    );
  }
}

PropMonitorCheckbox.propTypes = propTypes;
PropMonitorCheckbox.defaultProps = defaultProps;
PropMonitorCheckbox.displayName = 'PropMonitorCheckbox';

export default PropMonitorCheckbox;
