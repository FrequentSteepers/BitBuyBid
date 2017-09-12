/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "built/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _reactRedux = __webpack_require__(6);

	var _index = __webpack_require__(7);

	var _index2 = _interopRequireDefault(_index);

	var _renderFullHTMLPage = __webpack_require__(16);

	var _renderFullHTMLPage2 = _interopRequireDefault(_renderFullHTMLPage);

	var _app = __webpack_require__(17);

	var _app2 = _interopRequireDefault(_app);

	var _path = __webpack_require__(52);

	var _path2 = _interopRequireDefault(_path);

	var _StaticRouter = __webpack_require__(53);

	var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

	var _reactRouterConfig = __webpack_require__(35);

	var _routes = __webpack_require__(23);

	var _routes2 = _interopRequireDefault(_routes);

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var server = (0, _express2.default)();
	server.disable('x-powered-by');
	server.use('/images', _express2.default.static(_path2.default.join(__dirname, '../src/assets/images')));
	server.use('/scripts', _express2.default.static('built'));
	server.use('/styles', _express2.default.static('lib'));
	server.use('/built', _express2.default.static(_path2.default.join(__dirname, 'built')));
	server.use('/built', _express2.default.static('built'));
	server.use(_express2.default.static(_path2.default.join(__dirname, '../')));
	server.get('/favicon.ico', function (req, res) {
	  return res.send('');
	});

	server.get('*', function (req, res) {
	  var app = {
	    user: {
	      id: 1,
	      first: 'hello',
	      last: 'world',
	      username: 'hello from server'
	    }
	  };

	  var store = (0, _index2.default)({ app: app });

	  var branch = (0, _reactRouterConfig.matchRoutes)(_routes2.default, req.url);

	  var promises = branch.map(function (_ref) {
	    var route = _ref.route;

	    var fetchData = route.component.fetchData;
	    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
	  });

	  return Promise.all(promises).then(function (data) {
	    var context = {};
	    var content = (0, _server.renderToString)(_react2.default.createElement(
	      _reactRedux.Provider,
	      { store: store },
	      _react2.default.createElement(
	        _StaticRouter2.default,
	        { location: req.url, context: context },
	        (0, _reactRouterConfig.renderRoutes)(_routes2.default)
	      )
	    ));
	    if (context.status === 404) {
	      res.status(404);
	    }
	    if (context.status === 302) {
	      return res.redirect(302, context.url);
	    }

	    res.send((0, _renderFullHTMLPage2.default)(content, store.getState()));
	  });
	});

	var PORT = process.env.PORT || 3000;

	server.listen(PORT, function () {
	  return console.log('listening on ', PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("react-redux");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(8);

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _reduxThunk = __webpack_require__(15);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (initialState) {
	  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var enhancers = [];
	  var middleware = [_reduxThunk2.default];

	  var devToolsExtension = context.devToolsExtension;

	  if (typeof devToolsExtension === 'function') {
	    enhancers.push(devToolsExtension());
	  }

	  var composedEnhancers = _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, middleware)].concat(enhancers));
	  var store = (0, _redux.createStore)(_modules2.default, initialState, composedEnhancers);

	  if (false) {
	    module.hot.accept('./modules/index', function () {
	      /*eslint-disable*/
	      store.replaceReducer(require('./modules/index').default);
	      /*eslint-enable*/
	    });
	  }

	  return store;
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("redux");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(8);

	var _app = __webpack_require__(10);

	var _app2 = _interopRequireDefault(_app);

	var _products = __webpack_require__(13);

	var _products2 = _interopRequireDefault(_products);

	var _search = __webpack_require__(14);

	var _search2 = _interopRequireDefault(_search);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _redux.combineReducers)({ app: _app2.default, search: _search2.default, products: _products2.default });

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleSignup = exports.handleLogin = exports.setUser = exports.setTransactions = exports.appTypes = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _axios = __webpack_require__(11);

	var _axios2 = _interopRequireDefault(_axios);

	var _reactRouterRedux = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var appTypes = exports.appTypes = {
	  SET_USER: 'app/SET_USER',
	  SET_TRANSACTIONS: 'app/SET_TRANSACTIONS'
	};

	var initialState = {
	  user: null,
	  transactions: null
	};

	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var _ref = arguments[1];
	  var type = _ref.type,
	      payload = _ref.payload;

	  switch (type) {
	    case appTypes.SET_USER:
	      return _extends({}, state, {
	        user: payload
	      });
	    case appTypes.SET_TRANSACTIONS:
	      return _extends({}, state, {
	        transactions: payload
	      });
	    default:
	      return state;
	  }
	};

	var setTransactions = exports.setTransactions = function setTransactions(payload) {
	  return function (dispatch) {
	    _axios2.default.get('/api/transactions').then(function (transactions) {
	      dispatch({
	        type: appTypes.SET_TRANSACTIONS,
	        transactions: transactions
	      });
	    }).catch(function (e) {
	      return console.log('error getting transactions: ', e);
	    });
	  };
	};

	var setUser = exports.setUser = function setUser(payload) {
	  return {
	    type: appTypes.SET_USER,
	    payload: payload
	  };
	};

	var handleLogin = exports.handleLogin = function handleLogin(user) {
	  return function (dispatch) {
	    _axios2.default.post('/auth/login', user).then(function (results) {
	      dispatch({
	        type: appTypes.SET_USER,
	        payload: results.data
	      });
	    }).catch(function (err) {
	      alert('Incorrect user information or user does not exist');
	      console.log(err);
	    });
	  };
	};

	var handleSignup = exports.handleSignup = function handleSignup(user) {
	  return function (dispatch) {
	    _axios2.default.post('/auth/signup', user).then(function (_ref2) {
	      var data = _ref2.data;

	      if (data && data.first) {
	        dispatch({
	          type: appTypes.SET_USER,
	          payload: data
	        });
	        alert('you are logged in as ' + data.first + '!');
	      } else {
	        alert('signup failed!');
	      }
	    }).catch(console.error);
	  };
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("axios");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("react-router-redux");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.decrementItem = exports.removeFromCart = exports.addToCart = exports.createCart = exports.selectProduct = exports.checkout = exports.setProducts = exports.DECREMENT_ITEM = exports.REMOVE_FROM_CART = exports.ADD_TO_CART = exports.CREATE_CART = exports.SELECT_PRODUCT = exports.SET_PRODUCTS = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _axios = __webpack_require__(11);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Listings type
	 */
	var SET_PRODUCTS = exports.SET_PRODUCTS = 'listings/SET_PRODUCTS';
	var SELECT_PRODUCT = exports.SELECT_PRODUCT = 'listings/SELECT_PRODUCT';
	var CREATE_CART = exports.CREATE_CART = 'products/CREATE_CART';
	var ADD_TO_CART = exports.ADD_TO_CART = 'products/ADD_TO_CART';
	var REMOVE_FROM_CART = exports.REMOVE_FROM_CART = 'products/REMOVE_FROM_CART';
	var DECREMENT_ITEM = exports.DECREMENT_ITEM = 'products/DECREMENT_ITEM';

	var initialState = {
	  products: [],
	  selectedId: null,
	  cart: [],
	  quantities: {}
	};
	/**
	 * Listings reducer function
	 */

	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var _ref = arguments[1];
	  var type = _ref.type,
	      payload = _ref.payload;

	  switch (type) {
	    case SET_PRODUCTS:
	      return _extends({}, state, {
	        products: payload
	      });
	    case SELECT_PRODUCT:
	      return _extends({}, state, {
	        selectedId: payload
	      });
	    case CREATE_CART:
	      return _extends({}, state, {
	        cart: payload || []
	      });
	    case ADD_TO_CART:
	      var newQuantities = _extends({}, state.quantities);
	      var newCart = state.cart.concat([payload]).filter(function (val, i, self) {
	        return self.indexOf(val) === i;
	      });
	      [payload].map(function (product) {
	        newQuantities[product.prod_id] = (state.quantities[product.prod_id] || 0) + 1;
	      });
	      return _extends({}, state, {
	        cart: newCart,
	        quantities: newQuantities
	      });
	    case REMOVE_FROM_CART:
	      var newQuant = _extends({}, state.quantities);
	      newQuant[payload.prod_id] = undefined;
	      delete newQuant[payload.prod_id];
	      return _extends({}, state, {
	        cart: state.cart.filter(function (item) {
	          return item !== payload;
	        }),
	        quantities: newQuant
	      });
	    case DECREMENT_ITEM:
	      var decQuantities = _extends({}, state.quantities);
	      if (decQuantities[payload.prod_id] === 1) {
	        delete decQuantities[payload.prod_id];
	        var freshCart = state.cart.filter(function (item) {
	          return item !== payload;
	        });
	      } else {
	        decQuantities[payload.prod_id] = decQuantities[payload.prod_id] - 1;
	      }
	      return _extends({}, state, {
	        quantities: decQuantities,
	        cart: freshCart || state.cart
	      });
	    default:
	      return state;
	  }
	};

	/**
	 * Listings dispatchers
	 */

	var setProducts = exports.setProducts = function setProducts(searchTerm, dispatch) {
	  return function (dispatch) {
	    _axios2.default.post('/api/search', { searchTerm: searchTerm }).then(function (products) {
	      dispatch({
	        type: SET_PRODUCTS,
	        payload: products.data.results
	      });
	    }).catch(function (err) {
	      console.log('error dispatching the products');
	      throw err;
	    });
	  };
	};

	var checkout = exports.checkout = function checkout(payload, dispatch) {
	  return function (dispatch, getState) {
	    _axios2.default.post('/api/transactions', { cart: getState().products.cart, quantities: getState().products.quantities }).then(function (res) {
	      return console.log('successful checkout: ', res);
	    }).catch(function (err) {
	      return console.log('error in the checkout: ', err);
	    });
	  };
	};

	var selectProduct = exports.selectProduct = function selectProduct(payload) {
	  return {
	    type: SELECT_PRODUCT,
	    payload: payload
	  };
	};

	var createCart = exports.createCart = function createCart(payload) {
	  return {
	    type: CREATE_CART,
	    payload: payload
	  };
	};

	var addToCart = exports.addToCart = function addToCart(payload) {
	  return {
	    type: ADD_TO_CART,
	    payload: payload
	  };
	};

	var removeFromCart = exports.removeFromCart = function removeFromCart(payload) {
	  return {
	    type: REMOVE_FROM_CART,
	    payload: payload
	  };
	};

	var decrementItem = exports.decrementItem = function decrementItem(payload) {
	  return {
	    type: DECREMENT_ITEM,
	    payload: payload
	  };
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var searchTypes = exports.searchTypes = {
	  SET_SEARCH_TERM: 'app/SET_SEARCH_TERM'
	};

	var initialState = {
	  term: 'I WANT LIONS'
	};

	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var _ref = arguments[1];
	  var type = _ref.type,
	      payload = _ref.payload;

	  switch (type) {
	    case searchTypes.SET_SEARCH_TERM:
	      return _extends({}, state, { term: payload });
	    default:
	      return state;
	  }
	};

	var setSearchTerm = exports.setSearchTerm = function setSearchTerm(payload) {
	  return {
	    type: searchTypes.SET_SEARCH_TERM,
	    payload: payload
	  };
	};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("redux-thunk");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderFullHTMLPage;

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _server2 = _interopRequireDefault(_server);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function renderFullHTMLPage(stringifyHTML, initialState) {
	  return '<!doctype html>' + _server2.default.renderToStaticMarkup(_react2.default.createElement(
	    'html',
	    null,
	    _react2.default.createElement(
	      'head',
	      null,
	      _react2.default.createElement(
	        'title',
	        null,
	        'Bit Buy'
	      ),
	      _react2.default.createElement('link', { rel: 'stylesheet', type: 'text/css', href: '/scripts/style.css' })
	    ),
	    _react2.default.createElement(
	      'body',
	      null,
	      _react2.default.createElement('div', { id: 'root', dangerouslySetInnerHTML: { __html: stringifyHTML } }),
	      _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: 'window.__PRELOADED_STATE__ = ' + JSON.stringify(initialState) + ';' } }),
	      _react2.default.createElement('script', { src: '/scripts/bundle.js' })
	    )
	  ));
	}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(18);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(6);

	var _reactRouterDom = __webpack_require__(19);

	var _MuiThemeProvider = __webpack_require__(20);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _getMuiTheme = __webpack_require__(21);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

	var _lightBaseTheme = __webpack_require__(22);

	var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

	var _routes = __webpack_require__(23);

	var _routes2 = _interopRequireDefault(_routes);

	var _Home = __webpack_require__(36);

	var _Home2 = _interopRequireDefault(_Home);

	var _Product = __webpack_require__(39);

	var _Product2 = _interopRequireDefault(_Product);

	var _Cart = __webpack_require__(41);

	var _Cart2 = _interopRequireDefault(_Cart);

	var _Profile = __webpack_require__(45);

	var _Profile2 = _interopRequireDefault(_Profile);

	var _Login = __webpack_require__(37);

	var _Login2 = _interopRequireDefault(_Login);

	var _Signup = __webpack_require__(38);

	var _Signup2 = _interopRequireDefault(_Signup);

	var _Receipt = __webpack_require__(43);

	var _Receipt2 = _interopRequireDefault(_Receipt);

	var _Nav = __webpack_require__(47);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _reactRouterConfig = __webpack_require__(35);

	var _app = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	  }

	  _createClass(App, [{
	    key: 'render',


	    /*
	      the default route should always be last, as the interpreter
	      will render the first route that returns positive in the switch 
	      block as matching the path endpoint. therefor, the '/' will render
	      no matter what the chartacters after the URI are, serving as a 
	      kind of catch-all. 
	    */
	    value: function render() {
	      return _react2.default.createElement(
	        _MuiThemeProvider2.default,
	        { muiTheme: (0, _getMuiTheme2.default)({
	            theme: _lightBaseTheme2.default,
	            AppBar: {
	              position: 'relative',
	              padding: 0,
	              left: 0
	            }
	          }) },
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(_Nav2.default, null),
	          _react2.default.createElement(
	            _reactRouterDom.BrowserRouter,
	            null,
	            (0, _reactRouterConfig.renderRoutes)(_routes2.default)
	          )
	        )
	      );
	    }
	  }], [{
	    key: 'fetchData',
	    value: function fetchData(store) {
	      return store;
	    }
	  }]);

	  return App;
	}(_react2.default.Component);

	exports.default = App;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("react-dom");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = require("react-router-dom");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/styles/getMuiTheme");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/styles/baseThemes/lightBaseTheme");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _appRoot = __webpack_require__(24);

	var _appRoot2 = _interopRequireDefault(_appRoot);

	var _Home = __webpack_require__(36);

	var _Home2 = _interopRequireDefault(_Home);

	var _Login = __webpack_require__(37);

	var _Login2 = _interopRequireDefault(_Login);

	var _Signup = __webpack_require__(38);

	var _Signup2 = _interopRequireDefault(_Signup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = [{ component: _appRoot2.default,
	  routes: [{ path: '/',
	    exact: true,
	    component: _Home2.default
	  }, { path: '/login',
	    component: _Login2.default
	  }, { path: '/signup',
	    component: _Signup2.default
	  }]
	}];

	exports.default = routes;


	{/* <Route path='/receipt'> 
	   <Receipt />
	  </Route>
	  <Route path='/cart'>
	   <Cart />
	  </Route>
	  <Route path='/product'> 
	   <Product />
	  </Route>
	  <Route path='/profile'> 
	   <Profile />
	  </Route>
	  <Route path='/'>
	   <Home />
	  </Route> */}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Search = __webpack_require__(25);

	var _Search2 = _interopRequireDefault(_Search);

	var _CartWidget = __webpack_require__(29);

	var _CartWidget2 = _interopRequireDefault(_CartWidget);

	var _Route = __webpack_require__(34);

	var _Route2 = _interopRequireDefault(_Route);

	var _reactRouterConfig = __webpack_require__(35);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (_ref) {
	  var route = _ref.route;
	  return _react2.default.createElement('div', null);
	};
	// import Listings from '../components/Listings.jsx';

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _search = __webpack_require__(14);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(8);

	var _Card = __webpack_require__(26);

	var _RaisedButton = __webpack_require__(27);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _TextField = __webpack_require__(28);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _products = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var style = {
	  search: {
	    width: '50%',
	    position: 'fixed',
	    left: '25%',
	    margin: '0 auto'

	  },
	  form: {
	    textAlign: 'center',
	    paddingBottom: '10px'
	  }
	};

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    term: state.search.term
	  };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({
	    setSearchTerm: _search.setSearchTerm,
	    setProducts: _products.setProducts
	  }, dispatch);
	};

	var Search = function (_Component) {
	  _inherits(Search, _Component);

	  function Search(props) {
	    _classCallCheck(this, Search);

	    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

	    _this.handleSearch = _this.handleSearch.bind(_this);
	    return _this;
	  }

	  _createClass(Search, [{
	    key: 'handleSearch',
	    value: function handleSearch(e) {
	      if (e.key === 'Enter') {
	        e.preventDefault();
	        var text = e.target.value;
	        this.props.setSearchTerm(text);
	        this.props.setProducts(text);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { style: style.search },
	        _react2.default.createElement(
	          _Card.Card,
	          null,
	          _react2.default.createElement(
	            'form',
	            { style: style.form, onKeyPress: function onKeyPress(e) {
	                return _this2.handleSearch(e);
	              } },
	            _react2.default.createElement(_TextField2.default, { floatingLabelText: 'search for a product!' })
	          )
	        )
	      );
	    }
	  }]);

	  return Search;
	}(_react.Component);

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Search);

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/Card");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/RaisedButton");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/TextField");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Subtotal = __webpack_require__(30);

	var _Subtotal2 = _interopRequireDefault(_Subtotal);

	var _reactRouterDom = __webpack_require__(19);

	var _products = __webpack_require__(13);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(8);

	var _Card = __webpack_require__(26);

	var _GridList = __webpack_require__(31);

	var _Paper = __webpack_require__(32);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _styles = __webpack_require__(33);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import { Grid, Row, Col } from 'react-flexbox-grid';


	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    cart: state.products.cart,
	    quantities: state.products.quantities
	  };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({ selectProduct: _products.selectProduct }, dispatch);
	};

	var CartWidget = function (_Component) {
	  _inherits(CartWidget, _Component);

	  function CartWidget(props) {
	    _classCallCheck(this, CartWidget);

	    var _this = _possibleConstructorReturn(this, (CartWidget.__proto__ || Object.getPrototypeOf(CartWidget)).call(this, props));

	    _this.state = {
	      display: true
	    };
	    return _this;
	  }

	  _createClass(CartWidget, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return this.state.display ? _react2.default.createElement(
	        'div',
	        { style: _styles.style.root },
	        this.props.cart.length ? _react2.default.createElement(
	          _GridList.GridList,
	          { style: _styles.style.gridList },
	          _react2.default.createElement(
	            _Paper2.default,
	            { style: _styles.style.paper },
	            _react2.default.createElement(
	              'div',
	              { style: _styles.style.header },
	              _react2.default.createElement(
	                'div',
	                { style: _styles.style.cart },
	                'Cart'
	              ),
	              _react2.default.createElement(
	                'button',
	                { style: _styles.style.collapse, type: 'button', onClick: function onClick() {
	                    return _this2.setState({ display: false });
	                  } },
	                'collapse'
	              )
	            ),
	            _react2.default.createElement(
	              Grid,
	              { style: _styles.style.grid, fluid: true },
	              _react2.default.createElement(
	                Col,
	                { xs: 12 },
	                this.props.cart ? this.props.cart.map(function (product, i) {
	                  return _react2.default.createElement(
	                    'div',
	                    { key: i },
	                    i > 0 ? _react2.default.createElement('hr', null) : null,
	                    _react2.default.createElement(
	                      Row,
	                      { onClick: function onClick() {
	                          return _this2.props.selectProduct(i);
	                        }, style: _styles.style.row, start: 'xs' },
	                      _react2.default.createElement(
	                        Col,
	                        { style: _styles.style.imgHold, xs: 4 },
	                        _react2.default.createElement(
	                          _reactRouterDom.Link,
	                          { style: _styles.style.link, to: '/product?id=' + product.prod_id },
	                          _react2.default.createElement('img', { style: _styles.style.img, src: product.img_url_sm, alt: '' })
	                        )
	                      ),
	                      _react2.default.createElement(
	                        Col,
	                        { xs: 8 },
	                        _react2.default.createElement(
	                          _reactRouterDom.Link,
	                          { style: _styles.style.link, to: '/product?id=' + product.prod_id },
	                          _react2.default.createElement(_Card.CardTitle, { style: _styles.style.title, title: product.title })
	                        ),
	                        _react2.default.createElement(
	                          _Card.CardText,
	                          { style: _styles.style.text },
	                          product.description.slice(0, 40) + '...'
	                        )
	                      ),
	                      _react2.default.createElement(
	                        Row,
	                        null,
	                        _react2.default.createElement(
	                          Col,
	                          { style: _styles.style.priceCol },
	                          _react2.default.createElement(
	                            _Card.CardText,
	                            { style: _styles.style.price },
	                            '$',
	                            product.price ? Number(product.price).toFixed(2) : 0
	                          ),
	                          _react2.default.createElement(
	                            _Card.CardText,
	                            { style: _styles.style.delete },
	                            'delete\xA0\xA0\xA0quantity:',
	                            _this2.props.quantities[product.prod_id] || _this2.props.quantities[product.id]
	                          )
	                        )
	                      )
	                    )
	                  );
	                }) : false
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { style: _styles.style.subtotal },
	              _react2.default.createElement(
	                'div',
	                { style: _styles.style.subTitle },
	                _react2.default.createElement(
	                  'b',
	                  null,
	                  _react2.default.createElement(
	                    'i',
	                    null,
	                    'Subtotal:'
	                  )
	                ),
	                _react2.default.createElement(_Subtotal2.default, null)
	              ),
	              _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                  _reactRouterDom.Link,
	                  { to: '/cart' },
	                  _react2.default.createElement(
	                    'button',
	                    null,
	                    'Checkout'
	                  )
	                )
	              )
	            )
	          )
	        ) : false
	      ) : _react2.default.createElement(
	        'button',
	        { style: _styles.style.expand, type: 'button', onClick: function onClick() {
	            return _this2.setState({ display: true });
	          } },
	        'expand'
	      );
	    }
	  }]);

	  return CartWidget;
	}(_react.Component);

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CartWidget);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var style = {
	  subtotal: {
	    color: 'red'
	  }
	};

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    cart: state.products.cart,
	    quantities: state.products.quantities
	  };
	};

	var Subtotal = function (_Component) {
	  _inherits(Subtotal, _Component);

	  function Subtotal(props) {
	    _classCallCheck(this, Subtotal);

	    return _possibleConstructorReturn(this, (Subtotal.__proto__ || Object.getPrototypeOf(Subtotal)).call(this, props));
	  }

	  _createClass(Subtotal, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { style: style.subtotal },
	        '$',
	        this.props.cart.reduce(function (acc, product) {
	          return product.price ? acc += product.price * _this2.props.quantities[product.prod_id] : acc;
	        }, 0).toFixed(2)
	      );
	    }
	  }]);

	  return Subtotal;
	}(_react.Component);

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Subtotal);

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/GridList");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/Paper");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var style = exports.style = {
	  root: {
	    position: 'fixed',
	    top: '10%',
	    right: '5%',
	    float: 'right',
	    zIndex: 2,
	    paddingTop: '10px'
	  },
	  paper: {
	    width: '250px'
	  },
	  header: {
	    textAlign: 'center',
	    padding: '0px',
	    border: '2px solid black',
	    borderBottom: 'none'
	  },
	  title: {
	    padding: '0px',
	    whiteSpace: 'nowrap',
	    overflow: 'hidden'
	  },
	  text: {
	    padding: '0px',
	    fontStyle: 'italic'
	  },
	  grid: {
	    border: '2px solid black',
	    padding: '0px',
	    paddingTop: '5px'
	  },
	  img: {
	    position: 'relative',
	    width: '100%'
	  },
	  imgHold: {
	    padding: '0px',
	    margin: '0 auto'
	  },
	  price: {
	    color: 'seagreen',
	    float: 'left'
	  },
	  priceCol: {
	    display: 'inline-block'
	  },
	  delete: {
	    display: 'inline-block',
	    float: 'right',
	    color: 'maroon'
	  },
	  gridList: {
	    overflowY: 'auto'
	  },
	  subTitle: {
	    color: 'black'
	  },
	  subtotal: {
	    border: '2px solid black',
	    borderTop: 'none',
	    padding: '2px'
	  },
	  link: {
	    textDecoration: 'none'
	  },
	  expand: {
	    float: 'right',
	    position: 'fixed',
	    top: '10%',
	    right: '5%'
	  },
	  collapse: {
	    position: 'realtive',
	    display: 'inline-block',
	    float: 'right'
	  },
	  cart: {
	    display: 'inline-block'
	  }
	};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	module.exports = require("react-router-dom/Route");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	module.exports = require("react-router-config");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Search = __webpack_require__(25);

	var _Search2 = _interopRequireDefault(_Search);

	var _CartWidget = __webpack_require__(29);

	var _CartWidget2 = _interopRequireDefault(_CartWidget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import Listings from '../components/Listings.jsx';


	/*
	  here is where we will update the redux state, dispatching an event 
	  with the id of the item that was clicked
	*/

	var Home = function (_React$Component) {
	  _inherits(Home, _React$Component);

	  function Home() {
	    _classCallCheck(this, Home);

	    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));
	  }

	  _createClass(Home, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_CartWidget2.default, null),
	        _react2.default.createElement(_Search2.default, null)
	      );
	    }
	  }], [{
	    key: 'fetchData',
	    value: function fetchData(store) {
	      return store;
	    }
	  }]);

	  return Home;
	}(_react2.default.Component);

	exports.default = Home;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _app = __webpack_require__(10);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(8);

	var _reactRouterDom = __webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Login = function (_React$Component) {
	  _inherits(Login, _React$Component);

	  function Login(props) {
	    _classCallCheck(this, Login);

	    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

	    _this.state = {
	      password: '',
	      email: ''
	    };
	    _this.handleEmailChange = _this.handleEmailChange.bind(_this);
	    _this.handlePassChange = _this.handlePassChange.bind(_this);
	    return _this;
	  }

	  _createClass(Login, [{
	    key: 'handleEmailChange',
	    value: function handleEmailChange(e) {
	      this.setState({ email: e.target.value });
	    }
	  }, {
	    key: 'handlePassChange',
	    value: function handlePassChange(e) {
	      this.setState({ password: e.target.value });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { className: 'col-sm-6 col-sm-offset-3' },
	        _react2.default.createElement(
	          'h1',
	          null,
	          _react2.default.createElement('span', { className: 'fa fa-sign-in' }),
	          'Login'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Email'
	          ),
	          _react2.default.createElement('input', { onChange: this.handleEmailChange, type: 'text', className: 'form-control', name: 'email' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Password'
	          ),
	          _react2.default.createElement('input', { onChange: this.handlePassChange, type: 'password', className: 'form-control', name: 'password' })
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: function onClick() {
	              _this2.props.handleLogin({ email: _this2.state.email, password: _this2.state.password });
	            },
	            className: 'btn btn-warning btn-lg' },
	          'Login'
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Need to sign up for an account?'
	        ),
	        _react2.default.createElement(
	          _reactRouterDom.Link,
	          { to: '/signup' },
	          'Sign up Page'
	        )
	      );
	    }
	  }], [{
	    key: 'fetchData',
	    value: function fetchData(store) {
	      return store;
	    }
	  }]);

	  return Login;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    // term: state.search.term
	  };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({
	    handleLogin: _app.handleLogin
	  }, dispatch);
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _axios = __webpack_require__(11);

	var _axios2 = _interopRequireDefault(_axios);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(8);

	var _reactRouterDom = __webpack_require__(19);

	var _app = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Signup = function (_React$Component) {
	  _inherits(Signup, _React$Component);

	  function Signup(props) {
	    _classCallCheck(this, Signup);

	    var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

	    _this.state = {
	      email: '',
	      password: '',
	      first: '',
	      last: '',
	      username: ''
	    };
	    _this.handleEmailChange = _this.handleEmailChange.bind(_this);
	    _this.handlePassChange = _this.handlePassChange.bind(_this);
	    _this.handleFirstChange = _this.handleFirstChange.bind(_this);
	    _this.handleLastChange = _this.handleLastChange.bind(_this);
	    _this.handleUserChange = _this.handleUserChange.bind(_this);
	    _this.submitHandler = _this.submitHandler.bind(_this);
	    return _this;
	  }

	  _createClass(Signup, [{
	    key: 'handleEmailChange',
	    value: function handleEmailChange(e) {
	      this.setState({ email: e.target.value });
	    }
	  }, {
	    key: 'handlePassChange',
	    value: function handlePassChange(e) {
	      this.setState({ password: e.target.value });
	    }
	  }, {
	    key: 'handleFirstChange',
	    value: function handleFirstChange(e) {
	      this.setState({ first: e.target.value });
	    }
	  }, {
	    key: 'handleLastChange',
	    value: function handleLastChange(e) {
	      this.setState({ last: e.target.value });
	    }
	  }, {
	    key: 'handleUserChange',
	    value: function handleUserChange(e) {
	      this.setState({ username: e.target.value });
	    }
	  }, {
	    key: 'submitHandler',
	    value: function submitHandler() {
	      var fieldsValid = this.state.email && this.state.first && this.state.last && this.state.password && this.state.username;
	      if (fieldsValid) {
	        this.props.handleSignup(this.state);
	      } else {
	        alert('All fields must be filled');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'col-sm-6 col-sm-offset-3' },
	        _react2.default.createElement(
	          'h1',
	          null,
	          _react2.default.createElement('span', { className: 'fa fa-sign-in' }),
	          'Sign up'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Username'
	          ),
	          _react2.default.createElement('input', { onChange: this.handleUserChange, type: 'text', className: 'form-control', name: 'username' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'First'
	          ),
	          _react2.default.createElement('input', { onChange: this.handleFirstChange, type: 'text', className: 'form-control', name: 'first' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Last'
	          ),
	          _react2.default.createElement('input', { onChange: this.handleLastChange, type: 'text', className: 'form-control', name: 'last' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Email'
	          ),
	          _react2.default.createElement('input', { onChange: this.handleEmailChange, type: 'text', className: 'form-control', name: 'email' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Password'
	          ),
	          _react2.default.createElement('input', { onChange: this.handlePassChange, type: 'password', className: 'form-control', name: 'password' })
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.submitHandler, className: 'btn btn-warning btn-lg' },
	          'Sign up'
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Already have an account?'
	        ),
	        _react2.default.createElement(
	          _reactRouterDom.Link,
	          { to: '/login' },
	          'Login Page'
	        )
	      );
	    }
	  }]);

	  return Signup;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    // term: state.search.term
	  };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({
	    handleSignup: _app.handleSignup
	  }, dispatch);
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Signup);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _axios = __webpack_require__(11);

	var _axios2 = _interopRequireDefault(_axios);

	var _FeatListing = __webpack_require__(40);

	var _FeatListing2 = _interopRequireDefault(_FeatListing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/*
	  we need a way indicate which product to retrieve
	  detailed information on. 
	  Proposal: save the id in the redux store as 'currentProductId'
	  which can then be used to retrieve data from the servers
	  or our database
	*/

	var Product = function (_Component) {
	  _inherits(Product, _Component);

	  function Product() {
	    _classCallCheck(this, Product);

	    return _possibleConstructorReturn(this, (Product.__proto__ || Object.getPrototypeOf(Product)).apply(this, arguments));
	  }

	  _createClass(Product, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_FeatListing2.default, null)
	      );
	    }
	  }]);

	  return Product;
	}(_react.Component);

	exports.default = Product;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(6);

	var _Card = __webpack_require__(26);

	var _reactRouterDom = __webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// import { Grid, Row, Col } from 'react-flexbox-grid';


	var style = {
	  image: {
	    float: 'left',
	    left: '10px',
	    top: '10px',
	    margin: '0 auto',
	    maxHeight: '300px',
	    display: 'inline-block'
	  },
	  title: {
	    display: 'inline-block'
	  },
	  rating: {},
	  description: {}
	};

	var FeatListing = function (_Component) {
	  _inherits(FeatListing, _Component);

	  function FeatListing() {
	    _classCallCheck(this, FeatListing);

	    return _possibleConstructorReturn(this, (FeatListing.__proto__ || Object.getPrototypeOf(FeatListing)).apply(this, arguments));
	  }

	  _createClass(FeatListing, [{
	    key: 'render',
	    value: function render() {
	      var selected = this.props.products[this.props.selectedId];
	      return _react2.default.createElement(
	        'div',
	        null,
	        selected ? _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            _Card.Card,
	            null,
	            _react2.default.createElement('img', { src: selected.img_url_lg, style: style.image })
	          ),
	          _react2.default.createElement(
	            _Card.Card,
	            null,
	            _react2.default.createElement(
	              'h2',
	              { style: style.title },
	              selected.title
	            )
	          ),
	          _react2.default.createElement(
	            _Card.Card,
	            null,
	            _react2.default.createElement(
	              'div',
	              { style: style.rating },
	              'Rating: ',
	              selected.rating
	            )
	          ),
	          _react2.default.createElement(
	            _Card.Card,
	            null,
	            _react2.default.createElement(
	              'div',
	              { style: style.description },
	              selected.description
	            )
	          )
	        ) : _react2.default.createElement(
	          'div',
	          null,
	          'Product not found'
	        )
	      );
	    }
	  }]);

	  return FeatListing;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    products: state.products.products,
	    selectedId: state.products.selectedId
	  };
	};

	// const mapDispatchToProps = (dispatch) => {
	//   return bindActionCreators({}, dispatch);
	// };

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(FeatListing);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(8);

	var _products = __webpack_require__(13);

	var _Listing = __webpack_require__(42);

	var _Listing2 = _interopRequireDefault(_Listing);

	var _Receipt = __webpack_require__(43);

	var _Receipt2 = _interopRequireDefault(_Receipt);

	var _CartItem = __webpack_require__(44);

	var _CartItem2 = _interopRequireDefault(_CartItem);

	var _reactRouterDom = __webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Checkout = function (_Component) {
	  _inherits(Checkout, _Component);

	  function Checkout(props) {
	    _classCallCheck(this, Checkout);

	    return _possibleConstructorReturn(this, (Checkout.__proto__ || Object.getPrototypeOf(Checkout)).call(this, props));
	  }

	  _createClass(Checkout, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        _reactRouterDom.BrowserRouter,
	        null,
	        _react2.default.createElement(
	          'div',
	          null,
	          this.props.cart.map(function (item, i) {
	            return _react2.default.createElement(_CartItem2.default, { key: i, item: item });
	          }),
	          _react2.default.createElement(
	            'div',
	            null,
	            'Subtotal: $',
	            this.props.cart.reduce(function (acc, curr) {
	              return acc + Number(curr.price) * _this2.props.quantities[curr.prod_id];
	            }, 0).toFixed(2)
	          ),
	          _react2.default.createElement(
	            _reactRouterDom.Switch,
	            null,
	            _react2.default.createElement(
	              _reactRouterDom.Route,
	              { exact: true, path: '/cart/confirm' },
	              _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                  _reactRouterDom.Link,
	                  { to: '/receipt', onClick: function onClick() {
	                      return _this2.props.checkout();
	                    } },
	                  _react2.default.createElement(
	                    'button',
	                    null,
	                    'Confirm'
	                  )
	                ),
	                _react2.default.createElement(
	                  _reactRouterDom.Link,
	                  { to: '/cart' },
	                  _react2.default.createElement(
	                    'button',
	                    null,
	                    'Abort'
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              _reactRouterDom.Route,
	              { path: '/cart' },
	              _react2.default.createElement(
	                _reactRouterDom.Link,
	                { to: '/cart/confirm' },
	                _react2.default.createElement(
	                  'button',
	                  null,
	                  'Checkout'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              _reactRouterDom.Route,
	              { path: '/receipt' },
	              _react2.default.createElement(_Receipt2.default, null)
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Checkout;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    cart: state.products.cart,
	    quantities: state.products.quantities
	  };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({ createCart: _products.createCart, addToCart: _products.addToCart, removeFromCart: _products.removeFromCart, checkout: _products.checkout }, dispatch);
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Checkout);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouterDom = __webpack_require__(19);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(8);

	var _products = __webpack_require__(13);

	var _Card = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Listing = function Listing(_ref) {
	  var item = _ref.item,
	      addToCart = _ref.addToCart;

	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      _Card.Card,
	      null,
	      _react2.default.createElement(
	        'div',
	        null,
	        item.title,
	        _react2.default.createElement('br', null),
	        _react2.default.createElement(
	          _reactRouterDom.Link,
	          { to: '/product?id=' + item.id },
	          _react2.default.createElement('img', { src: item.img_url_sm })
	        ),
	        'Rating: ',
	        item.rating,
	        _react2.default.createElement(
	          'button',
	          { onClick: function onClick() {
	              addToCart(item);
	            } },
	          'Add to Cart!'
	        )
	      )
	    )
	  );
	};

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    cart: state.products.cart
	  };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({ addToCart: _products.addToCart }, dispatch);
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Listing);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Receipt = function (_Component) {
	  _inherits(Receipt, _Component);

	  function Receipt(props) {
	    _classCallCheck(this, Receipt);

	    return _possibleConstructorReturn(this, (Receipt.__proto__ || Object.getPrototypeOf(Receipt)).call(this, props));
	  }

	  _createClass(Receipt, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Thank you!'
	        ),
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Your product should be shipping shortly.'
	        ),
	        _react2.default.createElement(
	          'button',
	          null,
	          'Get Bitcoits'
	        ),
	        _react2.default.createElement(
	          'button',
	          null,
	          'Return to cart'
	        )
	      );
	    }
	  }]);

	  return Receipt;
	}(_react.Component);

	exports.default = Receipt;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouterDom = __webpack_require__(19);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(8);

	var _products = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

	var CartItem = function CartItem(_ref) {
	  var item = _ref.item,
	      addToCart = _ref.addToCart,
	      removeFromCart = _ref.removeFromCart,
	      quantities = _ref.quantities,
	      decrementItem = _ref.decrementItem;

	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h4',
	        null,
	        item.title
	      ),
	      ' ',
	      _react2.default.createElement('br', null),
	      _react2.default.createElement(
	        _reactRouterDom.Link,
	        { to: '/product?id=' + item.id },
	        _react2.default.createElement('img', { src: item.img_url_sm })
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: function onClick() {
	            addToCart(item);
	          } },
	        '+'
	      ),
	      _react2.default.createElement(
	        'span',
	        null,
	        ' ',
	        quantities[item.prod_id] || quantities[item.id],
	        ' '
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: function onClick() {
	            decrementItem(item);
	          } },
	        '-'
	      ),
	      _react2.default.createElement('br', null),
	      _react2.default.createElement(
	        'button',
	        { onClick: function onClick() {
	            removeFromCart(item);
	          } },
	        'Remove from Cart'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        '$',
	        item.price ? Number(item.price).toFixed(2) : 0
	      )
	    )
	  );
	};

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    quantities: state.products.quantities
	  };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({ addToCart: _products.addToCart, removeFromCart: _products.removeFromCart, decrementItem: _products.decrementItem }, dispatch);
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CartItem);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(8);

	var _reactRedux = __webpack_require__(6);

	var _Transactions = __webpack_require__(46);

	var _Transactions2 = _interopRequireDefault(_Transactions);

	var _Card = __webpack_require__(26);

	var _Paper = __webpack_require__(32);

	var _Paper2 = _interopRequireDefault(_Paper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    user: state.app.user
	  };
	};

	var Profile = function (_Component) {
	  _inherits(Profile, _Component);

	  function Profile(props) {
	    _classCallCheck(this, Profile);

	    return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));
	  }

	  _createClass(Profile, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _Paper2.default,
	          null,
	          _react2.default.createElement(
	            _Card.Card,
	            null,
	            _react2.default.createElement(
	              _Card.CardHeader,
	              null,
	              _react2.default.createElement(
	                'h1',
	                null,
	                this.props.user.first + ' ' + this.props.user.last
	              )
	            )
	          ),
	          _react2.default.createElement(
	            _Card.Card,
	            null,
	            _react2.default.createElement(_Transactions2.default, null)
	          )
	        )
	      );
	    }
	  }]);

	  return Profile;
	}(_react.Component);

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Profile);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(8);

	var _reactRedux = __webpack_require__(6);

	var _app = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    state: state.app.user.transactions
	  };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({
	    setTransactions: _app.setTransactions
	  }, dispatch);
	};

	var Transactions = function (_Component) {
	  _inherits(Transactions, _Component);

	  function Transactions(props) {
	    _classCallCheck(this, Transactions);

	    return _possibleConstructorReturn(this, (Transactions.__proto__ || Object.getPrototypeOf(Transactions)).call(this, props));
	  }

	  _createClass(Transactions, [{
	    key: 'render',
	    value: function render() {
	      this.props.setTransactions();
	      return _react2.default.createElement(
	        'div',
	        null,
	        'This will be the transactions!'
	      );
	    }
	  }]);

	  return Transactions;
	}(_react.Component);

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Transactions);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Drawer = __webpack_require__(48);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _MenuItem = __webpack_require__(49);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _AppBar = __webpack_require__(50);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(51);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _reactRouterDom = __webpack_require__(19);

	var _reactRedux = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var style = {
	  nav: {
	    position: 'fixed',
	    backgroundColor: 'teal',
	    fontFamily: 'Palatino,serif',
	    fontStyle: 'oblique',
	    textAlign: 'center',
	    zIndex: 2,
	    textDecorator: 'none'
	  },
	  navHolder: {
	    paddingBottom: '80px'
	  },
	  FlatButton: {
	    color: 'white'
	  },
	  link: {
	    textDecoration: 'none'
	  }
	};

	var Navbar = function (_React$Component) {
	  _inherits(Navbar, _React$Component);

	  function Navbar(props) {
	    _classCallCheck(this, Navbar);

	    var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

	    _this.state = {
	      open: false
	    };
	    _this.handleToggle = _this.handleToggle.bind(_this);
	    _this.handleClose = _this.handleClose.bind(_this);
	    if (_this.props.setToggle) {
	      _this.props.setToggle(_this.handleToggle);
	    }
	    if (_this.props.setClose) {
	      _this.props.setClose(_this.handleClose);
	    }
	    return _this;
	  }

	  _createClass(Navbar, [{
	    key: 'handleToggle',
	    value: function handleToggle() {
	      this.setState({ open: !this.state.open });
	    }
	  }, {
	    key: 'handleClose',
	    value: function handleClose() {
	      this.setState({ open: false });
	    }
	  }, {
	    key: 'redirectTo',
	    value: function redirectTo(url) {
	      if (!this.isCurrentUrl(url)) {
	        window.location.replace(url);
	      }
	    }
	  }, {
	    key: 'isCurrentUrl',
	    value: function isCurrentUrl(url) {
	      return window.location.pathname === url;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { id: 'nav', style: style.navHolder },
	        _react2.default.createElement(_AppBar2.default, {
	          style: style.nav,
	          title: 'Bit Buy',
	          onLeftIconButtonTouchTap: this.handleToggle,
	          iconElementRight: this.props.user ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              _reactRouterDom.Link,
	              { to: '/profile' },
	              _react2.default.createElement(_FlatButton2.default, { label: this.props.user.username, labelStyle: { color: 'white' } })
	            ),
	            _react2.default.createElement(
	              _reactRouterDom.Link,
	              { to: '/logout' },
	              _react2.default.createElement(_FlatButton2.default, { label: 'Logout', labelStyle: { color: 'white' } })
	            )
	          ) : _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              _reactRouterDom.Link,
	              { to: '/signup' },
	              _react2.default.createElement(_FlatButton2.default, { label: 'Signup', labelStyle: { color: 'white' } })
	            ),
	            _react2.default.createElement(
	              _reactRouterDom.Link,
	              { to: '/login' },
	              _react2.default.createElement(_FlatButton2.default, { label: 'Login', labelStyle: { color: 'white' } })
	            )
	          )
	        }),
	        _react2.default.createElement(
	          _Drawer2.default,
	          { docked: false, width: 250, open: this.state.open, onRequestChange: function onRequestChange(open) {
	              return _this2.setState({ open: open });
	            } },
	          _react2.default.createElement(
	            _reactRouterDom.Link,
	            { style: style.link, to: '/' },
	            _react2.default.createElement(
	              _MenuItem2.default,
	              null,
	              'Search'
	            )
	          ),
	          _react2.default.createElement(
	            _reactRouterDom.Link,
	            { style: style.link, to: '/profile' },
	            _react2.default.createElement(
	              _MenuItem2.default,
	              null,
	              'Profile'
	            )
	          ),
	          _react2.default.createElement(
	            _reactRouterDom.Link,
	            { style: style.link, to: '/cart' },
	            _react2.default.createElement(
	              _MenuItem2.default,
	              null,
	              'Cart'
	            )
	          ),
	          _react2.default.createElement(
	            _reactRouterDom.Link,
	            { style: style.link, to: '/logout' },
	            _react2.default.createElement(
	              _MenuItem2.default,
	              null,
	              'Logout'
	            )
	          ),
	          _react2.default.createElement(
	            _reactRouterDom.Link,
	            { style: style.link, to: '/login' },
	            _react2.default.createElement(
	              _MenuItem2.default,
	              null,
	              'Login'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Navbar;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(_ref) {
	  var app = _ref.app;
	  return {
	    user: app.user
	  };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Navbar);

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/Drawer");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/MenuItem");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/AppBar");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/FlatButton");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	module.exports = require("react-router-dom/StaticRouter");

/***/ })
/******/ ]);