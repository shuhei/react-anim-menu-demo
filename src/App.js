import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import logo from './logo.svg';
import './App.css';

const SubMenu = () => (
  <div className="SubMenu">
    <ul>
      <li key="0">Yay</li>
      <li key="1">Yay</li>
      <li key="2">Yay</li>
      <li key="3">Yay</li>
    </ul>
  </div>
);

class MenuItem extends Component {
  constructor(...args) {
    super(...args);

    this.select = this.select.bind(this);
    this.unselect = this.unselect.bind(this);
  }

  select() {
    this.props.selectItem(this.props.item);
  }

  unselect() {
    this.props.selectItem(null);
  }

  render() {
    const { item, selected } = this.props;
    return (
      <li
        className="MenuItem"
        onMouseEnter={this.select}
        onMouseLeave={this.unselect}
      >
        <span className="MenuItem-text">{item}</span>
        <ReactCSSTransitionGroup
          transitionName="SubMenu"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {selected && <SubMenu />}
        </ReactCSSTransitionGroup>
      </li>
    );
  }
}

const Menu = ({ items, selectItem, selectedItem }) => {
  const lis = items.map(item =>
    <MenuItem
      key={item}
      item={item}
      selected={item === selectedItem}
      selectItem={selectItem}
    />
  );
  return (
    <ul className="Menu">{lis}</ul>
  );
};

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedItem: null,
    };
    this.items = [
      'foo',
      'bar',
      'baz',
      'yes',
      'no',
    ];

    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(item) {
    this.setState({
      selectedItem: item,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Menu
          items={this.items}
          selectedItem={this.state.selectedItem}
          selectItem={this.selectItem}
        />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
