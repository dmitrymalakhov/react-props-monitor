import React, { PureComponent } from 'react';
import TextBox from './components/TextBox';
import propsFortuneteller from '../src';

propsFortuneteller(React);

class Root extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Title as String',
    };

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.setState({
      title: this.state.title === 5 ? 'Title as String' : 5,
    });
  }

  render() {
    return (
      <div>
        <TextBox title={this.state.title} />
        <button onClick={this._handleClick}>Click Me!</button>
      </div>
    );
  }
}

Root.displayName = 'Root';

export default Root;
