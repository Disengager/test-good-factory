'use strict';

var main = {
  currentTitle: "Тестовое задание Good Factory",
  currentUrl: "data.json"
}; 

var Wrapper = React.createClass({
  displayName: 'Wrapper',

  hide: function hide(val) {

  },
  show : function show(val) {

  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'main'},
    );
  }
});

ReactDOM.render(React.createElement(Wrapper, {}), document.body);  

