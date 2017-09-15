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
  }

  _handleClick() {
    this.setState({
      title: 5,
    });
  }

  render() {
    return (
      <div>
        <TextBox title={this.state.title} />
        <button>Click Me!</button>
      </div>
    );
  }
}

Root.displayName = 'Root';

export default Root;
