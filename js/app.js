'use strict';

var main = {
  currentTitle: "Тестовое задание Good Factory",
  currentUrl: "data3.json",
  currentMenu: 3,
  pageShow: true,
  data: {},
}; 

var Search = React.createClass({
  displayName: 'Search' ,

  render: function render() {
    return React.createElement(
      'div',
      {className: 'module', id: 'search'},
        React.createElement('div', {className: 'module__content'},
          React.createElement('label', {htmlFor: 'search'},
            React.createElement('svg', {xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"0.564cm",height:"0.564cm"},
              React.createElement('path', {fillRule:"evenodd", fill:"rgb(22, 122, 222)",d:"M15.023,15.988 C14.762,15.988 14.517,15.887 14.334,15.705 L11.582,12.958 L11.447,13.056 C10.213,13.955 8.749,14.429 7.213,14.429 C3.229,14.429 -0.012,11.195 -0.012,7.219 C-0.012,3.243 3.229,0.007 7.213,0.007 C11.197,0.007 14.439,3.243 14.439,7.219 C14.439,8.750 13.962,10.211 13.061,11.445 L12.963,11.579 L15.714,14.325 C15.898,14.511 16.000,14.756 16.000,15.015 C16.000,15.274 15.898,15.519 15.714,15.704 C15.530,15.887 15.285,15.988 15.023,15.988 ZM7.213,1.956 C4.306,1.956 1.941,4.317 1.941,7.219 C1.941,10.121 4.306,12.481 7.213,12.481 C10.120,12.481 12.485,10.121 12.485,7.219 C12.485,4.317 10.120,1.956 7.213,1.956 Z"})
            )
          ),
          React.createElement('input', {type: 'text', name: 'search', placeholder: 'Поиск'}),
          React.createElement('div', {className: 'ext-btn'})
        )
    )
  }
});

var BreadCrumb = React.createClass({
  displayName: 'BreadCrumb' ,

  render: function render() {
    return React.createElement(
      'div',
      {className: 'module', id: 'breadcrumb'},
        React.createElement('div', {className: 'module__content'},
          React.createElement('span', {}, 'Главная'),
          '/', 
          React.createElement('span', {}, 'Поиск'),
        )
    )
  }
});

var HideBtnGray = React.createClass({
  displayName: 'HideBtnGray' ,
  render: function render() {{
    var select = this.props.select,
        show = this.props.show;
    return React.createElement('div', {className: 'hide-btn-gray', onClick: function onClick() { return show(select); }})
  }}
});

var ShowBtnGray = React.createClass({
  displayName: 'ShowBtnGray' ,
  render: function render() {{
    var select = this.props.select,
        show = this.props.show;
    return React.createElement('div', {className: 'show-btn-gray',  onClick: function onClick() { return show(select); }})
  }}
});

var HideBtn = React.createClass({
  displayName: 'HideBtn' ,
  render: function render() {{
    var select = this.props.select,
        show = this.props.show;
    return React.createElement('div', {className: 'hide-btn', onClick: function onClick() { return show(select); }})
  }}
});

var ShowBtn = React.createClass({
  displayName: 'ShowBtn' ,
  render: function render() {{
    var select = this.props.select,
        show = this.props.show;
    return React.createElement('div', {className: 'show-btn', onClick: function onClick() { return show(select); }})
  }}
});

var Content = React.createClass({
  displayName: 'Content',

  render: function render() {
    if(main.pageShow)
      var button = React.createElement(HideBtnGray, {show: this.props.show, select: 'pageShow'}) 
    else
      var button = React.createElement(ShowBtnGray, {show: this.props.show, select: 'pageShow'}) 

    
    var items = '';

    var content = this;

    if(main.data.length > 0) {
      var blocks = [];
      main.data.map(function(item) {
        main[item['Id']] = main[item['Id']] == undefined? false : main[item['Id']];
        var subblocks = [];
        if(item['Sections'].length > 0) {
          item['Sections'].map(function(section, id) {
            subblocks.push(
              React.createElement('span', {className: 'module__row'},
                React.createElement('label', {},
                  React.createElement('a', {href: '#'}, 'Раздел ' + (parseInt(id)+1) + '. '),
                  section['Name'],
                  React.createElement('input', {type:'checkbox'}),
                  React.createElement('span')
                )
              )
            )
          });
        }
        
        if(main[item['Id']])
          var block_button = React.createElement(HideBtn, {show: content.props.show, select: item['Id']}) 
        else
          var block_button = React.createElement(ShowBtn, {show: content.props.show, select: item['Id']}) 

        blocks.push(
          React.createElement('div', {className: 'checkbox-tree__main', key: item['Id']},
            React.createElement('span', {className: 'module__row'},
              React.createElement('label', {className: ''}, 
                item['Name'],
                React.createElement('input', {type: 'checkbox'}),
                React.createElement('span')
              ),
              block_button
            ),
            React.createElement('div', {className: 'checkbox-tree__sub' + (main[item['Id']]?'': ' hide-block')},
              subblocks
            )
          )
        )
      });
      blocks.map(function(item) {
        items = React.createElement('div', {className: 'checkbox-tree'},
          blocks
        );
      });

      console.log(items);
    } 

    return React.createElement(
      'div',
      {className: 'module', id: 'content'},
      React.createElement('div', {className: 'module__title'},
        React.createElement('h2', {}, "Заголовок"),
        button
      ),
      React.createElement('div', {className: 'module__content' + (main.pageShow?'':' hide-block')},
        React.createElement('div', {className: 'module__row'},
          React.createElement('span', {className: 'custom-select__search', contentEditable: 'true'},
            React.createElement('span', {}, 'Форма поиска'),
            React.createElement('select', {name: 'search_in_content', id: 'content-search'})
          ),

          React.createElement('span', {className: 'custom-select__function'},
            React.createElement('span', {}, 'Сформировать отчёт'),
            React.createElement('select', {name: 'search-function', id: 'content-function'},
              React.createElement('option', {value: '0'}, 'Сформировать отчёт')
            )
          )
        ),
        items
      )
    )
  }
});

var Page = React.createClass({
  displayName: 'Page',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'block', id: 'page' },
        React.createElement(Search, {}),
        React.createElement(BreadCrumb, {}),
        React.createElement(Content, {show: this.props.show})
    );
  }
});

var ModuleMenu = React.createClass({
  displayName: 'ModuleMenu',

  render: function render() {
    var menuClick = this.props.menuClick;
    if(this.props.menu.length > 0)
      var items = this.props.menu.map(function (item, id) {
        return React.createElement('div', {onClick: function onClick() { return menuClick(id); }, key: id, className: 'module__item' + (id == main.currentMenu? '  current_item': '')},
          React.createElement('svg', item.svg,
            React.createElement('path', item.path)
          ),
          React.createElement('span', {}, item.text)
        );
      });
    else 
      var items = null;
    return React.createElement('div', { className: 'module' },
      React.createElement('div', {className: 'module__title'}, 'Лого'),
      React.createElement('div', {className: 'module__content'},
        items
      ),
    );
  }
});

var Nav = React.createClass({
  displayName: 'Nav',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'block', id: 'menu' },
      React.createElement(ModuleMenu, {menu: this.props.menu, menuClick: this.props.menuClick}),
    );
  }
});

var Wrapper = React.createClass({
  displayName: 'Wrapper',
  menu: [
    {svg:{xmlns:"http://www.w3.org/2000/svg", xmlnsXlink:"http://www.w3.org/1999/xlink", width:"0.6cm", height:"0.67cm"}, path: {fillRule:"evenodd",  opacity:"0.322", fill:"rgb(255, 255, 255)", d:"M14.276,18.997 L2.695,18.997 C1.213,18.997 0.007,17.830 0.007,16.395 L0.007,7.583 C0.007,7.277 0.156,6.981 0.406,6.793 L7.851,1.186 C8.032,1.050 8.257,0.976 8.486,0.976 C8.714,0.976 8.939,1.050 9.120,1.185 L16.565,6.794 C16.815,6.981 16.964,7.277 16.964,7.583 L16.964,16.395 C16.964,17.830 15.759,18.997 14.276,18.997 ZM7.037,16.997 L9.934,16.997 L9.934,10.987 L7.037,10.987 L7.037,16.997 ZM14.897,8.073 L8.486,3.244 L2.074,8.073 L2.074,16.395 C2.074,16.726 2.353,16.997 2.695,16.997 L4.971,16.997 L4.971,9.986 C4.971,9.435 5.434,8.986 6.004,8.986 L10.967,8.986 C11.537,8.986 12.001,9.435 12.001,9.986 L12.001,16.997 L14.276,16.997 C14.618,16.997 14.897,16.726 14.897,16.395 L14.897,8.073 Z"}, text: 'Главная'},
    {svg:{xmlns:"http://www.w3.org/2000/svg", xmlnsXlink:"http://www.w3.org/1999/xlink", width:"0.564cm", height:"0.564cm"}, path: {fillRule:"evenodd",  opacity:"0.322", fill:"rgb(255, 255, 255)", d:"M15.023,15.988 C14.762,15.988 14.517,15.887 14.334,15.705 L11.582,12.958 L11.447,13.056 C10.213,13.955 8.749,14.429 7.213,14.429 C3.229,14.429 -0.012,11.195 -0.012,7.219 C-0.012,3.243 3.229,0.007 7.213,0.007 C11.197,0.007 14.439,3.243 14.439,7.219 C14.439,8.750 13.962,10.211 13.061,11.445 L12.963,11.579 L15.714,14.325 C15.898,14.511 16.000,14.756 16.000,15.015 C16.000,15.275 15.898,15.519 15.714,15.704 C15.530,15.887 15.285,15.988 15.023,15.988 ZM7.213,1.956 C4.306,1.956 1.941,4.317 1.941,7.219 C1.941,10.121 4.306,12.481 7.213,12.481 C10.120,12.481 12.485,10.121 12.485,7.219 C12.485,4.317 10.120,1.956 7.213,1.956 Z"},text: 'Пункт меню'},
    {svg:{xmlns:"http://www.w3.org/2000/svg", xmlnsXlink:"http://www.w3.org/1999/xlink", width:"0.6cm", height:"0.6cm"}, path: {fillRule:"evenodd",  opacity:"0.322", fill:"rgb(255, 255, 255)", d:"M12.499,17.000 L9.000,17.000 C8.182,17.000 7.515,16.342 7.500,15.527 C7.486,16.342 6.818,17.000 6.000,17.000 L1.500,17.000 C0.673,17.000 -0.000,16.327 -0.000,15.499 L-0.000,11.000 C-0.000,10.181 0.658,9.514 1.473,9.499 C0.658,9.485 -0.000,8.818 -0.000,7.999 L-0.000,4.501 C-0.000,3.674 0.673,3.000 1.500,3.000 L4.500,2.999 C4.500,1.346 5.845,-0.000 7.499,-0.000 C9.154,-0.000 10.501,1.346 10.501,2.999 L10.501,3.000 L12.499,3.000 C13.326,3.000 14.000,3.674 14.000,4.501 L14.000,6.498 C15.654,6.498 17.000,7.845 17.000,9.501 C17.000,11.155 15.654,12.500 14.000,12.500 L14.000,12.500 L14.000,15.499 C14.000,16.327 13.326,17.000 12.499,17.000 ZM9.500,15.000 L12.000,15.000 L12.000,10.500 L14.000,10.500 C14.552,10.500 15.000,10.052 15.000,9.501 C15.000,8.948 14.552,8.498 14.000,8.498 L12.000,8.498 L12.000,5.000 L8.501,5.000 L8.501,2.999 C8.501,2.448 8.052,2.000 7.499,2.000 C6.948,2.000 6.500,2.448 6.500,2.999 L6.500,5.000 L2.000,5.000 L2.000,7.500 L3.000,7.500 C4.103,7.500 5.000,8.398 5.000,9.501 C5.000,10.603 4.103,11.499 3.000,11.499 L2.000,11.499 L2.000,15.000 L5.500,15.000 L5.500,14.000 C5.500,12.897 6.397,11.999 7.499,11.999 C8.602,11.999 9.500,12.897 9.500,14.000 L9.500,15.000 Z"}, text: 'Пункт меню'},
    {svg:{xmlns:"http://www.w3.org/2000/svg", xmlnsXlink:"http://www.w3.org/1999/xlink", width:"0.494cm", height:"0.6cm"}, path: {fillRule:"evenodd", opacity:"0.322", fill:"rgb(255, 255, 255)",d:"M14.013,6.244 L14.013,14.537 C14.013,15.904 12.900,17.015 11.532,17.015 L2.474,17.015 C1.107,17.015 -0.006,15.904 -0.006,14.537 L-0.006,2.473 C-0.006,1.107 1.107,-0.004 2.474,-0.004 L7.758,-0.004 C7.890,-0.004 8.017,0.022 8.134,0.072 C8.199,0.099 8.250,0.147 8.307,0.187 C8.353,0.219 8.405,0.239 8.445,0.280 L13.729,5.558 C13.747,5.576 13.754,5.601 13.771,5.621 C13.836,5.697 13.898,5.776 13.937,5.870 C13.986,5.988 14.013,6.115 14.013,6.244 ZM1.936,2.473 L1.936,14.537 C1.936,14.833 2.178,15.075 2.474,15.075 L11.532,15.075 C11.829,15.075 12.071,14.833 12.071,14.537 L12.071,7.213 L7.758,7.213 C7.223,7.213 6.787,6.778 6.787,6.244 L6.787,1.936 L2.474,1.936 C2.178,1.936 1.936,2.177 1.936,2.473 ZM10.698,5.273 L8.729,3.307 L8.729,5.273 L10.698,5.273 Z"}, text: 'Пункт меню'},
    {svg:{xmlns:"http://www.w3.org/2000/svg", xmlnsXlink:"http://www.w3.org/1999/xlink", width:"0.635cm", height:"0.67cm"}, path: {fillRule:"evenodd",  opacity:"0.322", fill:"rgb(255, 255, 255)", d:"M14.998,18.962 L3.417,18.962 C1.935,18.962 0.729,17.795 0.729,16.359 L0.729,13.956 C0.729,13.404 1.193,12.955 1.763,12.955 C2.333,12.955 2.796,13.404 2.796,13.956 L2.796,16.359 C2.796,16.691 3.075,16.961 3.417,16.961 L14.998,16.961 C15.341,16.961 15.620,16.691 15.620,16.359 L15.620,13.956 C15.620,13.404 16.083,12.955 16.653,12.955 C17.223,12.955 17.686,13.404 17.686,13.956 L17.686,16.359 C17.686,17.795 16.481,18.962 14.998,18.962 ZM9.939,13.862 C9.937,13.864 9.935,13.864 9.934,13.866 C9.840,13.955 9.730,14.028 9.607,14.078 C9.482,14.129 9.347,14.156 9.208,14.156 C9.068,14.156 8.934,14.129 8.809,14.078 C8.684,14.027 8.571,13.954 8.477,13.862 C8.477,13.862 8.477,13.862 8.477,13.862 L5.168,10.658 C4.973,10.470 4.865,10.219 4.865,9.951 C4.865,9.684 4.973,9.432 5.168,9.244 C5.363,9.055 5.622,8.950 5.899,8.950 C6.175,8.950 6.435,9.055 6.630,9.244 L8.174,10.740 L8.174,1.941 C8.174,1.390 8.638,0.940 9.208,0.940 C9.778,0.940 10.241,1.390 10.241,1.941 L10.241,10.740 L11.786,9.244 C11.981,9.055 12.240,8.950 12.517,8.950 C12.793,8.950 13.052,9.055 13.247,9.244 C13.443,9.432 13.550,9.684 13.550,9.951 C13.550,10.219 13.443,10.470 13.247,10.658 L9.939,13.862 Z"},text: 'Пункт меню в две строки'},
    {svg:{xmlns:"http://www.w3.org/2000/svg", xmlnsXlink:"http://www.w3.org/1999/xlink", width:"0.564cm", height:"0.564cm"}, path: {fillRule:"evenodd",  opacity:"0.322", fill:"rgb(255, 255, 255)", d:"M0.912,16.000 C0.792,16.000 0.674,15.977 0.563,15.931 C0.221,15.789 -0.000,15.458 -0.000,15.088 L-0.000,2.487 C-0.000,1.115 1.115,-0.000 2.487,-0.000 L13.513,-0.000 C14.885,-0.000 16.000,1.115 16.000,2.487 L16.000,10.362 C16.000,11.734 14.885,12.850 13.513,12.850 L4.440,12.850 L1.557,15.733 C1.384,15.905 1.155,16.000 0.912,16.000 ZM2.487,1.823 C2.121,1.823 1.824,2.121 1.824,2.487 L1.824,12.886 L3.417,11.293 C3.587,11.123 3.822,11.026 4.062,11.026 L13.513,11.026 C13.879,11.026 14.176,10.728 14.176,10.362 L14.176,2.487 C14.176,2.121 13.879,1.823 13.513,1.823 L2.487,1.823 Z"}, text: 'Пункт меню'}
  ],

  hide: function hide(val) {

  },
  show : function show(select) {
    var temp = {};
    temp[select] = main[select] == true? false : true;
    main[select] = temp[select];
    this.setState(temp);
  },
  menuClick: function menuClick(id) {
    main.currentMenu = id; 
    main.currentUrl = 'data' + id + '.json';
    this.setState({currentMenu: main.currentMenu});
    this.componentDidMount();
  },
  componentDidMount: function componentDidMount () {
    var mainObj = this;
    $.getJSON( main.currentUrl, function( data ) {
        main.data = data['Data'];
        mainObj.setState({data: main.data});
    });
    
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'main'},
      React.createElement(Nav, {menu: this.menu, menuClick: this.menuClick}),
      React.createElement(Page,{show: this.show}),
    );
  }
});

ReactDOM.render(React.createElement(Wrapper, {}), document.body);  

