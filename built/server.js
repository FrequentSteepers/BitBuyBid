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

	'use strict';

	var app = __webpack_require__(3);
	var models = __webpack_require__(71);
	var PORT = Number(process.env.PORT) || 3000;

	app.listen(PORT, function () {
	  console.log('Example app listening on port ' + PORT + '!');
	});

	// start cronjobs
	__webpack_require__(108)(models);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(4);

	var _express2 = _interopRequireDefault(_express);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	var _reactRedux = __webpack_require__(7);

	var _index = __webpack_require__(8);

	var _index2 = _interopRequireDefault(_index);

	var _renderFullHTMLPage = __webpack_require__(17);

	var _renderFullHTMLPage2 = _interopRequireDefault(_renderFullHTMLPage);

	var _app = __webpack_require__(18);

	var _app2 = _interopRequireDefault(_app);

	var _path = __webpack_require__(55);

	var _path2 = _interopRequireDefault(_path);

	var _StaticRouter = __webpack_require__(56);

	var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

	var _reactRouterConfig = __webpack_require__(35);

	var _routes = __webpack_require__(24);

	var _routes2 = _interopRequireDefault(_routes);

	var _modules = __webpack_require__(10);

	var _modules2 = _interopRequireDefault(_modules);

	var _index3 = __webpack_require__(57);

	var _middleware = __webpack_require__(60);

	var _middleware2 = _interopRequireDefault(_middleware);

	var _router = __webpack_require__(107);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	global.navigator = { userAgent: 'all' };

	// routes/controllers


	var app = (0, _express2.default)();

	app.use(_middleware2.default.morgan('dev'));
	app.use(_middleware2.default.cookieParser());
	app.use(_middleware2.default.bodyParser.urlencoded({ extended: true }));
	app.use(_middleware2.default.bodyParser.json());
	app.set('views', _path2.default.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

	app.use(_middleware2.default.auth.session);
	app.use(_middleware2.default.passport.initialize());
	app.use(_middleware2.default.passport.session());
	app.use(_middleware2.default.flash());

	app.use('/auth', _index3.auth);
	app.use('/api', _index3.api);
	app.use('/api/users', _index3.users);
	app.use('/api/products', _index3.products);
	app.use('/api/transactions', _index3.transactions);
	app.use('/api/search', _index3.search);

	app.disable('x-powered-by');
	app.use('/images', _express2.default.static(_path2.default.join(__dirname, '../src/assets/images')));
	app.use('/scripts', _express2.default.static('built'));
	app.use('/styles', _express2.default.static('lib'));
	app.use('/built', _express2.default.static(_path2.default.join(__dirname, 'built')));
	// app.use('/built', express.static('built'));
	app.use(_express2.default.static(_path2.default.join(__dirname, '../')));
	app.get('/favicon.ico', function (req, res) {
	  return res.send('');
	});

	app.use('/*', _router2.default);

	module.exports = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("react-redux");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(9);

	var _modules = __webpack_require__(10);

	var _modules2 = _interopRequireDefault(_modules);

	var _reduxThunk = __webpack_require__(16);

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
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("redux");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(9);

	var _app = __webpack_require__(11);

	var _app2 = _interopRequireDefault(_app);

	var _products = __webpack_require__(14);

	var _products2 = _interopRequireDefault(_products);

	var _search = __webpack_require__(15);

	var _search2 = _interopRequireDefault(_search);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _redux.combineReducers)({ app: _app2.default, search: _search2.default, products: _products2.default });

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleLogout = exports.handleSignup = exports.handleLogin = exports.setUser = exports.setTransactions = exports.appTypes = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _axios = __webpack_require__(12);

	var _axios2 = _interopRequireDefault(_axios);

	var _reactRouterRedux = __webpack_require__(13);

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

	var handleLogout = exports.handleLogout = function handleLogout() {
	  return function (dispatch) {
	    _axios2.default.get('/auth/logout').then(function (res) {
	      dispatch({
	        type: appTypes.SET_USER,
	        payload: null
	      });
	    });
	  };
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("axios");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("react-router-redux");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.decrementItem = exports.removeFromCart = exports.addToCart = exports.createCart = exports.selectProduct = exports.checkout = exports.setProducts = exports.DECREMENT_ITEM = exports.REMOVE_FROM_CART = exports.ADD_TO_CART = exports.CREATE_CART = exports.SELECT_PRODUCT = exports.SET_PRODUCTS = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _axios = __webpack_require__(12);

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
/* 15 */
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
/* 16 */
/***/ (function(module, exports) {

	module.exports = require("redux-thunk");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderFullHTMLPage;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(19);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(7);

	var _reactRouterDom = __webpack_require__(20);

	var _MuiThemeProvider = __webpack_require__(21);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _getMuiTheme = __webpack_require__(22);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

	var _lightBaseTheme = __webpack_require__(23);

	var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

	var _routes = __webpack_require__(24);

	var _routes2 = _interopRequireDefault(_routes);

	var _Home = __webpack_require__(46);

	var _Home2 = _interopRequireDefault(_Home);

	var _Product = __webpack_require__(36);

	var _Product2 = _interopRequireDefault(_Product);

	var _Cart = __webpack_require__(38);

	var _Cart2 = _interopRequireDefault(_Cart);

	var _Profile = __webpack_require__(42);

	var _Profile2 = _interopRequireDefault(_Profile);

	var _Login = __webpack_require__(44);

	var _Login2 = _interopRequireDefault(_Login);

	var _Signup = __webpack_require__(45);

	var _Signup2 = _interopRequireDefault(_Signup);

	var _Receipt = __webpack_require__(40);

	var _Receipt2 = _interopRequireDefault(_Receipt);

	var _Nav = __webpack_require__(50);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _reactRouterConfig = __webpack_require__(35);

	var _app = __webpack_require__(11);

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
	          _reactRouterDom.BrowserRouter,
	          null,
	          (0, _reactRouterConfig.renderRoutes)(_routes2.default)
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
/* 19 */
/***/ (function(module, exports) {

	module.exports = require("react-dom");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = require("react-router-dom");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/styles/getMuiTheme");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/styles/baseThemes/lightBaseTheme");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _appRoot = __webpack_require__(25);

	var _appRoot2 = _interopRequireDefault(_appRoot);

	var _Home = __webpack_require__(46);

	var _Home2 = _interopRequireDefault(_Home);

	var _Login = __webpack_require__(44);

	var _Login2 = _interopRequireDefault(_Login);

	var _Signup = __webpack_require__(45);

	var _Signup2 = _interopRequireDefault(_Signup);

	var _Logout = __webpack_require__(49);

	var _Logout2 = _interopRequireDefault(_Logout);

	var _Receipt = __webpack_require__(40);

	var _Receipt2 = _interopRequireDefault(_Receipt);

	var _Cart = __webpack_require__(38);

	var _Cart2 = _interopRequireDefault(_Cart);

	var _Product = __webpack_require__(36);

	var _Product2 = _interopRequireDefault(_Product);

	var _Profile = __webpack_require__(42);

	var _Profile2 = _interopRequireDefault(_Profile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = [{ component: _appRoot2.default,
	  routes: [{ path: '/',
	    exact: true,
	    component: _Home2.default
	  }, { path: '/login',
	    component: _Login2.default
	  }, { path: '/signup',
	    component: _Signup2.default
	  }, { path: '/logout',
	    component: _Logout2.default
	  }, { path: '/receipt',
	    component: _Receipt2.default
	  }, { path: '/cart',
	    component: _Cart2.default
	  }, { path: '/product',
	    component: _Product2.default
	  }, { path: '/profile',
	    component: _Profile2.default
	  }]
	}];

	exports.default = routes;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Search = __webpack_require__(26);

	var _Search2 = _interopRequireDefault(_Search);

	var _CartWidget = __webpack_require__(30);

	var _CartWidget2 = _interopRequireDefault(_CartWidget);

	var _reactRouterDom = __webpack_require__(20);

	var _MuiThemeProvider = __webpack_require__(21);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _reactRouterConfig = __webpack_require__(35);

	var _Product = __webpack_require__(36);

	var _Product2 = _interopRequireDefault(_Product);

	var _Cart = __webpack_require__(38);

	var _Cart2 = _interopRequireDefault(_Cart);

	var _Profile = __webpack_require__(42);

	var _Profile2 = _interopRequireDefault(_Profile);

	var _Login = __webpack_require__(44);

	var _Login2 = _interopRequireDefault(_Login);

	var _Signup = __webpack_require__(45);

	var _Signup2 = _interopRequireDefault(_Signup);

	var _Receipt = __webpack_require__(40);

	var _Receipt2 = _interopRequireDefault(_Receipt);

	var _Home = __webpack_require__(46);

	var _Home2 = _interopRequireDefault(_Home);

	var _Logout = __webpack_require__(49);

	var _Logout2 = _interopRequireDefault(_Logout);

	var _Nav = __webpack_require__(50);

	var _Nav2 = _interopRequireDefault(_Nav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (_ref) {
	  var route = _ref.route;
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(_Nav2.default, null),
	    _react2.default.createElement(
	      _reactRouterDom.Switch,
	      null,
	      _react2.default.createElement(
	        _reactRouterDom.Route,
	        { path: '/login' },
	        _react2.default.createElement(_Login2.default, null)
	      ),
	      _react2.default.createElement(
	        _reactRouterDom.Route,
	        { path: '/logout' },
	        _react2.default.createElement(_Logout2.default, null)
	      ),
	      _react2.default.createElement(
	        _reactRouterDom.Route,
	        { path: '/signup' },
	        _react2.default.createElement(_Signup2.default, null)
	      ),
	      _react2.default.createElement(
	        _reactRouterDom.Route,
	        { path: '/receipt' },
	        _react2.default.createElement(_Receipt2.default, null)
	      ),
	      _react2.default.createElement(
	        _reactRouterDom.Route,
	        { path: '/cart' },
	        _react2.default.createElement(_Cart2.default, null)
	      ),
	      _react2.default.createElement(
	        _reactRouterDom.Route,
	        { path: '/product' },
	        _react2.default.createElement(_Product2.default, null)
	      ),
	      _react2.default.createElement(
	        _reactRouterDom.Route,
	        { path: '/profile' },
	        _react2.default.createElement(_Profile2.default, null)
	      ),
	      _react2.default.createElement(
	        _reactRouterDom.Route,
	        { path: '/' },
	        _react2.default.createElement(_Home2.default, null)
	      )
	    )
	  );
	};
	// import Listings from '../components/Listings.jsx';

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _search = __webpack_require__(15);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(9);

	var _Card = __webpack_require__(27);

	var _RaisedButton = __webpack_require__(28);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _TextField = __webpack_require__(29);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _products = __webpack_require__(14);

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
/* 27 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/Card");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/RaisedButton");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/TextField");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Subtotal = __webpack_require__(31);

	var _Subtotal2 = _interopRequireDefault(_Subtotal);

	var _reactRouterDom = __webpack_require__(20);

	var _products = __webpack_require__(14);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(9);

	var _Card = __webpack_require__(27);

	var _GridList = __webpack_require__(32);

	var _Paper = __webpack_require__(33);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _styles = __webpack_require__(34);

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
	            this.props.cart ? this.props.cart.map(function (product, i) {
	              return _react2.default.createElement(
	                'div',
	                { key: i },
	                i > 0 ? _react2.default.createElement('hr', null) : null,
	                _react2.default.createElement(
	                  _reactRouterDom.Link,
	                  { style: _styles.style.link, to: '/product?id=' + product.prod_id },
	                  _react2.default.createElement('img', { style: _styles.style.img, src: product.img_url_sm, alt: '' })
	                ),
	                _react2.default.createElement(
	                  _reactRouterDom.Link,
	                  { style: _styles.style.link, to: '/product?id=' + product.prod_id },
	                  _react2.default.createElement(_Card.CardTitle, { style: _styles.style.title, title: product.title })
	                ),
	                _react2.default.createElement(
	                  _Card.CardText,
	                  { style: _styles.style.text },
	                  product.description.slice(0, 40) + '...'
	                ),
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
	              );
	            }) : false,
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

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
/* 32 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/GridList");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/Paper");

/***/ }),
/* 34 */
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

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _axios = __webpack_require__(12);

	var _axios2 = _interopRequireDefault(_axios);

	var _FeatListing = __webpack_require__(37);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _Card = __webpack_require__(27);

	var _reactRouterDom = __webpack_require__(20);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(9);

	var _products = __webpack_require__(14);

	var _Listing = __webpack_require__(39);

	var _Listing2 = _interopRequireDefault(_Listing);

	var _Receipt = __webpack_require__(40);

	var _Receipt2 = _interopRequireDefault(_Receipt);

	var _CartItem = __webpack_require__(41);

	var _CartItem2 = _interopRequireDefault(_CartItem);

	var _reactRouterDom = __webpack_require__(20);

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouterDom = __webpack_require__(20);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(9);

	var _products = __webpack_require__(14);

	var _Card = __webpack_require__(27);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouterDom = __webpack_require__(20);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(9);

	var _products = __webpack_require__(14);

	var _Card = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	      _Card.Card,
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(9);

	var _reactRedux = __webpack_require__(7);

	var _Transactions = __webpack_require__(43);

	var _Transactions2 = _interopRequireDefault(_Transactions);

	var _Card = __webpack_require__(27);

	var _Paper = __webpack_require__(33);

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
	                this.props.user && this.props.user.first + ' ' + this.props.user.last
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(9);

	var _reactRedux = __webpack_require__(7);

	var _app = __webpack_require__(11);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _app = __webpack_require__(11);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(9);

	var _reactRouterDom = __webpack_require__(20);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _axios = __webpack_require__(12);

	var _axios2 = _interopRequireDefault(_axios);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(9);

	var _reactRouterDom = __webpack_require__(20);

	var _app = __webpack_require__(11);

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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _Search = __webpack_require__(26);

	var _Search2 = _interopRequireDefault(_Search);

	var _Listings = __webpack_require__(47);

	var _Listings2 = _interopRequireDefault(_Listings);

	var _CartWidget = __webpack_require__(30);

	var _CartWidget2 = _interopRequireDefault(_CartWidget);

	var _SearchItem = __webpack_require__(48);

	var _SearchItem2 = _interopRequireDefault(_SearchItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/*
	  here is where we will update the redux state, dispatching an event 
	  with the id of the item that was clicked
	*/

	var Home = function (_React$Component) {
	  _inherits(Home, _React$Component);

	  function Home() {
	    _classCallCheck(this, Home);

	    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
	  }

	  _createClass(Home, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_CartWidget2.default, null),
	        _react2.default.createElement(_Search2.default, null),
	        this.props.products.map(function (p) {
	          return _react2.default.createElement(_SearchItem2.default, { item: p, key: p.id });
	        })
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

	var mapStateToProps = function mapStateToProps(_ref) {
	  var products = _ref.products;
	  return {
	    products: products.products
	  };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Home);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _axios = __webpack_require__(12);

	var _axios2 = _interopRequireDefault(_axios);

	var _products = __webpack_require__(14);

	var _redux = __webpack_require__(9);

	var _GridList = __webpack_require__(32);

	var _Listing = __webpack_require__(39);

	var _Listing2 = _interopRequireDefault(_Listing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import $ from 'jquery';
	// import { Grid, Row, Col } from 'react-flexbox-grid';


	var styles = {
	  root: {
	    paddingTop: '90px',
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-around'
	  }
	};

	var Listings = function Listings(props) {
	  return _react2.default.createElement(
	    'div',
	    { style: styles.root },
	    _react2.default.createElement(
	      Grid,
	      { fluid: true },
	      _react2.default.createElement(
	        Row,
	        null,
	        props.products.length ? props.products.map(function (product, i) {
	          return product.img_url_sm ? _react2.default.createElement(
	            Col,
	            { key: i, xs: 6, sm: 6, md: 4, lg: 3, onClick: function onClick() {
	                return props.selectProduct(i);
	              } },
	            _react2.default.createElement(_Listing2.default, { id: product.id, item: product })
	          ) : null;
	        }) : null
	      )
	    )
	  );
	};

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    products: state.products.products,
	    selectedId: state.products.selectedId
	  };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({ selectProduct: _products.selectProduct }, dispatch);
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Listings);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouterDom = __webpack_require__(20);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(9);

	var _products = __webpack_require__(14);

	var _Card = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SearchItem = function SearchItem(_ref) {
	  var item = _ref.item,
	      quantities = _ref.quantities,
	      addToCart = _ref.addToCart,
	      removeFromCart = _ref.removeFromCart,
	      decrementItem = _ref.decrementItem;
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      _Card.Card,
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
	          quantities && (quantities[item.prod_id] || quantities[item.id]),
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
	    )
	  );
	};

	var mapStateToProps = function mapStateToProps(_ref2) {
	  var products = _ref2.products;

	  return {
	    quantities: products.quantities
	  };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({
	    addToCart: _products.addToCart,
	    removeFromCart: _products.removeFromCart,
	    decrementItem: _products.decrementItem
	  }, dispatch);
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchItem);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(9);

	var _app = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Logout = function Logout(_ref) {
	  var user = _ref.user,
	      handleLogout = _ref.handleLogout;
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'h3',
	      null,
	      'click to logout ' + (user || {}).first
	    ),
	    _react2.default.createElement(
	      'button',
	      { onClick: function onClick() {
	          return handleLogout();
	        } },
	      ' Logout '
	    )
	  );
	};

	var mapStateToProps = function mapStateToProps(_ref2) {
	  var app = _ref2.app;

	  return {
	    user: app.user
	  };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({
	    handleLogout: _app.handleLogout
	  }, dispatch);
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Logout);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Drawer = __webpack_require__(51);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _MenuItem = __webpack_require__(52);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _AppBar = __webpack_require__(53);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(54);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _reactRouterDom = __webpack_require__(20);

	var _reactRedux = __webpack_require__(7);

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
/* 51 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/Drawer");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/MenuItem");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/AppBar");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	module.exports = require("material-ui/FlatButton");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	module.exports = require("react-router-dom/StaticRouter");

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports.api = __webpack_require__(58);
	module.exports.auth = __webpack_require__(59);
	module.exports.users = __webpack_require__(94);
	module.exports.products = __webpack_require__(104);
	module.exports.transactions = __webpack_require__(105);
	module.exports.search = __webpack_require__(106);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(4);
	var router = express.Router();

	router.route('/').get(function (req, res) {
	  res.status(200).send('Hello World!');
	}).post(function (req, res) {
	  console.log('in the correct route');
	  res.status(201).send({ data: 'Posted!' });
	});

	module.exports = router;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(4);
	var middleware = __webpack_require__(60);
	var urlencodedParser = __webpack_require__(91).urlencoded({ extended: false });

	var router = express.Router();
	// middleware.auth.verify, 
	// reenable middleware
	router.route('/').get(function (req, res) {
	  res.render('index.ejs');
	});

	router.route('/login').get(function (req, res) {
	  res.render('login.ejs', { message: req.flash('loginMessage') });
	}).post(urlencodedParser, middleware.passport.authenticate('local-login'), function (req, res) {
	  if (req.user) {
	    res.json(req.user);
	  } else {
	    res.status(401);
	  }
	});

	router.route('/signup').get(function (req, res) {
	  res.render('signup.ejs', { message: req.flash('signupMessage') });
	}).post(middleware.passport.authenticate('local-signup'), function (req, res) {
	  if (req.user) {
	    res.json(req.user);
	  } else {
	    res.status(401);
	  }
	});

	router.route('/logout').get(function (req, res) {
	  req.logout();
	  res.redirect('/');
	});

	router.get('/auth/google', middleware.passport.authenticate('google', {
	  scope: ['email', 'profile']
	}));

	router.get('/auth/google/callback', middleware.passport.authenticate('google', {
	  successRedirect: '/home',
	  failureRedirect: '/login'
	}));

	router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
	  scope: ['public_profile', 'email']
	}));

	router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
	  successRedirect: '/home',
	  failureRedirect: '/login',
	  failureFlash: true
	}));

	router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

	router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
	  successRedirect: '/profile',
	  failureRedirect: '/login'
	}));

	module.exports = router;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports.auth = __webpack_require__(61);
	module.exports.passport = __webpack_require__(65);
	module.exports.morgan = __webpack_require__(90);
	module.exports.bodyParser = __webpack_require__(91);
	module.exports.flash = __webpack_require__(92);
	module.exports.cookieParser = __webpack_require__(93);

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var session = __webpack_require__(62);
	var RedisStore = __webpack_require__(63)(session);
	var redisClient = __webpack_require__(64).createClient();

	module.exports.verify = function (req, res, next) {
	  if (req.isAuthenticated()) {
	    return next();
	  }
	  res.redirect('/login');
	};

	module.exports.session = session({
	  store: new RedisStore({
	    client: redisClient,
	    host: 'localhost',
	    port: 6379
	  }),
	  secret: 'more laughter, more love, more life',
	  resave: false,
	  saveUninitialized: false
	});

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = require("express-session");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = require("connect-redis");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports = require("redis");

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var passport = __webpack_require__(66);
	var LocalStrategy = __webpack_require__(67).Strategy;
	var GoogleStrategy = __webpack_require__(68).OAuth2Strategy;
	var FacebookStrategy = __webpack_require__(69).Strategy;
	var TwitterStrategy = __webpack_require__(70).Strategy;
	// const config = require('config')['passport'];
	var models = __webpack_require__(71);

	passport.serializeUser(function (profile, done) {
	  done(null, profile.id);
	});

	passport.deserializeUser(function (id, done) {
	  return models.User.where({ id: id }).fetch().then(function (profile) {
	    if (!profile) {
	      throw profile;
	    }
	    done(null, profile.serialize());
	  }).error(function (error) {
	    console.log('Error: ', error);
	    done(error, null);
	  }).catch(function () {
	    console.log('failed deserialization no user found');
	    done(null, null, { message: 'No user found' });
	  });
	});

	passport.use('local-signup', new LocalStrategy({
	  usernameField: 'email',
	  passwordField: 'password',
	  passReqToCallback: true
	}, function (req, email, password, done) {
	  // check to see if there is any account with this email address
	  return models.User.where({ email: email }).fetch().then(function (profile) {
	    // create a new profile if a profile does not exist
	    if (!profile) {
	      return models.User.forge({
	        email: email,
	        first: req.body.first,
	        last: req.body.last,
	        username: req.body.username
	      }).save();
	    }
	    // throw if any auth account already exists
	    if (profile) {
	      throw profile;
	    }

	    return profile;
	  }).tap(function (profile) {
	    // create a new local auth account with the user's profile id
	    return models.Auth.forge({
	      password: password,
	      type: 'local',
	      user_id: profile.get('id')
	    }).save();
	  }).then(function (profile) {
	    // serialize profile for session
	    done(null, profile.serialize());
	  }).error(function (error) {
	    console.error(error);
	    done(error, null);
	  }).catch(function (err) {
	    console.error(err);
	    done();
	  });
	}));

	passport.use('local-login', new LocalStrategy({
	  usernameField: 'email',
	  passwordField: 'password',
	  passReqToCallback: true
	}, function (req, email, password, done) {
	  // fetch any profiles that have a local auth account with this email address
	  return models.User.where({ email: email }).fetch({
	    withRelated: [{
	      auths: function auths(query) {
	        return query.where({ type: 'local' });
	      }
	    }]
	  }).then(function (profile) {
	    // if there is no profile with that email or if there is no local auth account with profile
	    if (!profile || !profile.related('auths').at(0)) {
	      throw Error('User not Found');
	    }

	    // check password and pass through account
	    return Promise.all([profile, profile.related('auths').at(0).comparePassword(password)]);
	  }).then(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        profile = _ref2[0],
	        match = _ref2[1];

	    if (!match) {
	      throw profile;
	    }
	    // if the password matches, pass on the profile
	    return profile;
	  }).then(function (profile) {
	    // call done with serialized profile to include in session
	    done(null, profile.serialize());
	  }).error(function (err) {
	    done();
	  }).catch(function (e) {
	    done(null, null, {
	      'message': 'Signing up requires an email address, \
	          please be sure there is an email address associated with your Facebook account \
	          and grant access when you register.' });
	  });
	}));

	module.exports = passport;

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports = require("passport");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

	module.exports = require("passport-local");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

	module.exports = require("passport-google-oauth");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	module.exports = require("passport-facebook");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	module.exports = require("passport-twitter");

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  Auth: __webpack_require__(72),
	  User: __webpack_require__(80),
	  Product: __webpack_require__(81),
	  Category: __webpack_require__(84),
	  Transaction: __webpack_require__(85),
	  Review: __webpack_require__(86),
	  Address: __webpack_require__(87),
	  Tag: __webpack_require__(88),
	  Purchase: __webpack_require__(89)
	};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var db = __webpack_require__(73);
	var Promise = __webpack_require__(78);
	var bcrypt = Promise.promisifyAll(__webpack_require__(79));

	var Auth = db.Model.extend({
	  tableName: 'auths',
	  profile: function profile() {
	    return this.belongsTo('User');
	  },
	  initialize: function initialize() {
	    var _this = this;

	    this.on('saving', function (user, attrs, options) {
	      if (user.get('type') === 'local') {
	        return _this.generatePassword(user.get('password')).then(function (hash) {
	          _this.set('password', hash);
	        }).error(function (err) {
	          return console.log(err);
	        });
	      }
	    });
	  },
	  comparePassword: function comparePassword(attempted) {
	    return bcrypt.compareAsync(attempted, this.get('password'));
	  },
	  generatePassword: function generatePassword(password) {
	    var _this2 = this;

	    return bcrypt.genSaltAsync(null).then(function (salt) {
	      _this2.set('salt', salt);
	      return bcrypt.hashAsync(password, salt, null);
	    });
	  }
	});

	module.exports = db.model('Auth', Auth);

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var knex = __webpack_require__(74)(__webpack_require__(75));
	var db = __webpack_require__(77)(knex);

	db.plugin('registry');

	module.exports = db;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

	module.exports = require("knex");

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(76);

	module.exports = config['knex'];

/***/ }),
/* 76 */
/***/ (function(module, exports) {

	module.exports = require("config");

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	module.exports = require("bookshelf");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

	module.exports = require("bluebird");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

	module.exports = require("bcrypt-nodejs");

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var db = __webpack_require__(73);

	var User = db.Model.extend({
	  tableName: 'users',
	  auths: function auths() {
	    return this.hasMany('Auth');
	  },
	  activeCart: function activeCart() {
	    return this.belongsTo('Transaction');
	  },
	  address: function address() {
	    return this.hasOne('Address');
	  }
	});

	module.exports = db.model('User', User);

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var db = __webpack_require__(73);
	var convert = __webpack_require__(82);
	var parseString = __webpack_require__(83).parseString;

	var Product = db.Model.extend({
	  tableName: 'products',
	  tags: function tags() {
	    return this.hasMany('Tag');
	  },
	  category: function category() {
	    return this.hasOne('Category');
	  }
	});

	var defaultImage = '';

	/**
	 * Bulk create products by fetching product data from overstock api
	 * and converting the data to json from xml.
	 *
	 * @todo associate inserted products to category/ tag.
	 */
	Product.fromOverstock = function (results) {
	  var parsed = JSON.parse(convert.xml2json(results.data, {
	    compact: true,
	    spaces: 2,
	    instructionHasAttributes: true
	  }))['cj-api'].products.product;

	  parsed.filter(function (p) {
	    return Number(p.price['_text']) && p['image-url']._text;
	  }).forEach(function (p) {
	    Product.query(function (qb) {
	      qb.whereRaw('prod_id = \'' + ((p['ad-id']._text || '') + (p['sku']._text || '') + (p['upc']._text || '')) + '|OVSOCK\'').andWhere('type', '=', 'ovsock').limit(1);
	    }).fetchAll().then(function (products) {
	      if (products && products.length > 0) {
	        // ovsock item found in db, skipping
	      } else {
	        // insert new item
	        Product.forge({
	          'prod_id': (p['ad-id']._text || '') + (p['sku']._text || '') + (p['upc']._text || '') + '|OVSOCK',
	          'ad-id': Number.parseInt(p['ad-id']._text || 0) || null,
	          'sku': Number.parseInt(p['sku']._text) || null,
	          'upc': Number.parseInt(p['upc']._text) || null,
	          'catalog_id': p['catalog-id']._text.replace(/\D/g, ''),
	          'price': Number(p.price['_text']),
	          'buy_url': p['buy-url']._text,
	          'type': 'ovsock',
	          'title': p.name._text,
	          'description': p.description._text,
	          'img_url_sm': p['image-url']._text || defaultImage,
	          'img_url_md': p['image-url']._text || defaultImage,
	          'img_url_lg': p['image-url']._text || defaultImage
	        }).save();
	      }
	    }).catch(function (e) {
	      console.log('error occured querying ovsock products');
	      console.error(e);
	    });
	  });
	};

	/**
	 * Given a response from amazon, upsert the new data into the database
	 * and return the newly created products.
	 * @todo refactor to xml-js
	 * @param {Object} - results of a get form amazon.
	 * @param {Promise} - resolves with the array of objects after being
	 * registered with the products table.
	 */
	Product.fromAmazon = function (results) {
	  var promiseArray;
	  parseString(results.data, function (err, result) {
	    var productListings = result.ItemSearchResponse.Items[0].Item;

	    promiseArray = productListings.filter(function (p) {
	      return p.ItemAttributes[0].ListPrice && (p.SmallImage || p.MediumImage || p.LargeImage);
	    }).map(function (product) {
	      return Product.query(function (qb) {
	        return qb.whereRaw('prod_id = \'' + product.ASIN[0] + '|AMZN\'').andWhere('type', '=', 'amzn').limit(1);
	      }).fetchAll().then(function (products) {
	        if (products && products.length > 0) {
	          return {
	            'id': products.models[0].id,
	            'prod_id': product.ASIN[0] + '|AMZN',
	            'asin': product.ASIN[0],
	            'img_url_sm': product.SmallImage ? product.SmallImage[0].URL[0] : defaultImage,
	            'img_url_md': product.MediumImage ? product.MediumImage[0].URL[0] : defaultImage,
	            'img_url_lg': product.LargeImage ? product.LargeImage[0].URL[0] : defaultImage,
	            'buy_url': product.DetailPageURL[0].substring(0, product.DetailPageURL[0].indexOf('?')),
	            'title': product.ItemAttributes[0].Title[0],
	            'price': product.ItemAttributes[0].ListPrice ? Number(product.ItemAttributes[0].ListPrice[0].FormattedPrice[0].slice(1)) : null,
	            'description': product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature.join('; ') : '',
	            'type': 'amzn'
	          };
	        } else {
	          // add new amazon product to db with title and ASIN:
	          // product.ItemAttributes[0].Title[0], product.ASIN[0]
	          return Product.forge({
	            'prod_id': product.ASIN[0] + '|AMZN',
	            'asin': product.ASIN[0],
	            'img_url_sm': product.SmallImage ? product.SmallImage[0].URL[0] : defaultImage,
	            'img_url_md': product.MediumImage ? product.MediumImage[0].URL[0] : defaultImage,
	            'img_url_lg': product.LargeImage ? product.LargeImage[0].URL[0] : defaultImage,
	            'buy_url': product.DetailPageURL[0].substring(0, product.DetailPageURL[0].indexOf('?')),
	            'title': product.ItemAttributes[0].Title[0],
	            'price': product.ItemAttributes[0].ListPrice ? Number(product.ItemAttributes[0].ListPrice[0].FormattedPrice[0].slice(1)) : null,
	            'description': product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature.join('; ') : '',
	            'type': 'amzn'
	          }).save().then(function (_ref) {
	            var id = _ref.id;

	            return {
	              id: id,
	              'prod_id': product.ASIN[0] + '|AMZN',
	              'asin': product.ASIN[0],
	              'img_url_sm': product.SmallImage ? product.SmallImage[0].URL[0] : defaultImage,
	              'img_url_md': product.MediumImage ? product.MediumImage[0].URL[0] : defaultImage,
	              'img_url_lg': product.LargeImage ? product.LargeImage[0].URL[0] : defaultImage,
	              'buy_url': product.DetailPageURL[0].substring(0, product.DetailPageURL[0].indexOf('?')),
	              'title': product.ItemAttributes[0].Title[0],
	              'price': product.ItemAttributes[0].ListPrice ? Number(product.ItemAttributes[0].ListPrice[0].FormattedPrice[0].slice(1)) : null,
	              'description': product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature.join('; ') : '',
	              'type': 'amzn'
	            };
	          });
	        }
	      }).catch(function (e) {
	        console.log('error occured querying amazon products');
	        console.error(e);
	      });
	    });
	  });
	  return Promise.all(promiseArray);
	};

	module.exports = db.model('Product', Product);

/***/ }),
/* 82 */
/***/ (function(module, exports) {

	module.exports = require("xml-js");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

	module.exports = require("xml2js");

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var db = __webpack_require__(73);

	var Category = db.Model.extend({
	  tableName: 'categories',
	  tags: function tags() {
	    return this.hasMany('Tag');
	  }
	});

	module.exports = db.model('Category', Category);

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var db = __webpack_require__(73);

	var Transaction = db.Model.extend({
	  tableName: 'transactions',
	  buyer: function buyer() {
	    return this.belongsTo('User', 'buyer_id');
	  },
	  cart: function cart() {
	    return this.belongsToMany('Product').through('Purchase');
	  }
	});

	module.exports = db.model('Transaction', Transaction);

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var db = __webpack_require__(73);

	var Review = db.Model.extend({
	  tableName: 'reviews',
	  author: function author() {
	    return this.hasMany('User', 'author_id');
	  },
	  product: function product() {
	    return this.hasMany('Product', 'seller_id');
	  },
	  transaction: function transaction() {
	    return this.hasOne('Transaction');
	  }
	});

	module.exports = db.model('Review', Review);

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var db = __webpack_require__(73);

	var Address = db.Model.extend({
	  tableName: 'addresses'
	});

	module.exports = db.model('Address', Address);

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var db = __webpack_require__(73);

	var Tag = db.Model.extend({
	  tableName: 'tags'
	});

	module.exports = db.model('Tag', Tag);

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var db = __webpack_require__(73);

	var Purchase = db.Model.extend({
	  tableName: 'purchases',
	  transaction: function transaction() {
	    return this.belongsTo('Transactions', 'transaction_id', 'id');
	  },
	  product: function product() {
	    return this.belongsTo('Products', 'product_id', 'id');
	  }
	});

	module.exports = db.model('Purchase', Purchase);

/***/ }),
/* 90 */
/***/ (function(module, exports) {

	module.exports = require("morgan");

/***/ }),
/* 91 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	module.exports = require("connect-flash");

/***/ }),
/* 93 */
/***/ (function(module, exports) {

	module.exports = require("cookie-parser");

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(4);
	var router = express.Router();

	var _require$Users = __webpack_require__(95).Users,
	    getAll = _require$Users.getAll,
	    getOne = _require$Users.getOne,
	    update = _require$Users.update;

	router.route('/').get(getAll);

	router.route('/:id').get(getOne).put(update);

	module.exports = router;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  Users: __webpack_require__(96),
	  Products: __webpack_require__(97),
	  Transactions: __webpack_require__(98),
	  Search: __webpack_require__(102)
	};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var models = __webpack_require__(71);

	module.exports.getAll = function (req, res) {
	  models.Users.fetchAll().then(function (profiles) {
	    res.status(200).send(profiles);
	  }).catch(function (err) {
	    // This code indicates an outside service (the database) did not respond in time
	    res.status(503).send(err);
	  });
	};

	module.exports.create = function (req, res) {
	  models.User.forge(req.body).save().then(function (result) {
	    res.status(201).send(result.omit('password'));
	  }).catch(function (err) {
	    if (err.constraint === 'users_username_unique') {
	      return res.status(403);
	    }
	    res.status(500).send(err);
	  });
	};

	module.exports.getOne = function (req, res) {
	  models.User.where({ id: req.params.id }).fetch().then(function (profile) {
	    if (!profile) {
	      throw profile;
	    }
	    res.status(200).send(profile);
	  }).error(function (err) {
	    res.status(500).send(err);
	  }).catch(function () {
	    res.sendStatus(404);
	  });
	};

	module.exports.update = function (req, res) {
	  models.User.where({ id: req.params.id }).fetch().then(function (profile) {
	    if (!profile) {
	      throw profile;
	    }
	    return profile.save(req.body, { method: 'update' });
	  }).then(function () {
	    res.sendStatus(201);
	  }).error(function (err) {
	    res.status(500).send(err);
	  }).catch(function () {
	    res.sendStatus(404);
	  });
	};

	// module.exports.deleteOne = (req, res) => {
	//   models.Profile.where({ id: req.params.id }).fetch()
	//     .then(profile => {
	//       if (!profile) {
	//         throw profile;
	//       }
	//       return profile.destroy();
	//     })
	//     .then(() => {
	//       res.sendStatus(200);
	//     })
	//     .error(err => {
	//       res.status(503).send(err);
	//     })
	//     .catch(() => {
	//       res.sendStatus(404);
	//     });
	// };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(71),
	    Product = _require.Product;

	module.exports.create = function (req, res) {
	  res.status(500);
	};

	module.exports.getAll = function (req, res) {
	  Product.where({}).query(function (qb) {
	    return qb.limit(100);
	  }).fetchAll().then(function (product) {
	    if (!product) {
	      throw product;
	    }
	    res.status(200).send({ results: product });
	  }).error(function (err) {
	    res.status(500).send(err);
	  }).catch(function (err) {
	    console.error(err);
	    res.sendStatus(404);
	  });
	};

	module.exports.getOne = function (req, res) {
	  Product.where({ id: req.params.id }).fetch().then(function (product) {
	    if (!product) {
	      throw product;
	    }
	    res.status(200).send({ results: product });
	  }).error(function (err) {
	    res.status(500).send(err);
	  }).catch(function (err) {
	    console.error(err);
	    res.sendStatus(404);
	  });
	};

	module.exports.update = function (req, res) {
	  Product.where({ id: req.params.id }).fetch().then(function (product) {
	    if (!product) {
	      throw product;
	    }
	    return product.save(req.body, { method: 'update' });
	  }).then(function () {
	    res.sendStatus(201);
	  }).error(function (err) {
	    res.status(500).send(err);
	  }).catch(function () {
	    res.sendStatus(404);
	  });
	};

	module.exports.deleteOne = function (req, res) {
	  models.Product.where({ id: req.params.id }).fetch().then(function (product) {
	    if (!product) {
	      throw product;
	    }
	    return product.destroy();
	  }).then(function () {
	    res.sendStatus(200);
	  }).error(function (err) {
	    res.status(503).send(err);
	  }).catch(function () {
	    res.sendStatus(404);
	  });
	};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(71),
	    Transaction = _require.Transaction,
	    Purchase = _require.Purchase;

	var axios = __webpack_require__(12);

	var _require2 = __webpack_require__(99),
	    overstock = _require2.overstock;

	axios.defaults.headers.common['Authorization'] = overstock.Authorization;
	var convert = __webpack_require__(82);

	module.exports.create = function (req, res) {
	  Transaction.forge({
	    buyer_id: req.user.id
	  }).save().then(function (result) {
	    return Promise.all(req.body.cart.map(function (p) {
	      Purchase.forge({
	        transaction_id: result.id,
	        product_id: p.id,
	        quantity: req.body.quantities[p.prod_id] || 1
	      }).save();
	    }));
	  }).then(function (result) {
	    res.status(201);
	  }).catch(function (err) {
	    console.error(err);
	    res.status(500).send(err);
	  });
	};

	module.exports.getAll = function (req, res) {
	  Transaction.where({ buyer_id: req.user.id }).fetchAll({
	    withRelated: ['cart', 'buyer']
	  }).then(function (transactions) {
	    res.status(200).send(transactions);
	  }).error(function (err) {
	    res.status(500).send(err);
	  }).catch(function () {
	    res.sendStatus(404);
	  });
	};

	module.exports.getOne = function (req, res) {
	  Transaction.where({ buyer_id: req.params.id }).fetch({
	    withRelated: ['cart', 'buyer']
	  }).then(function (transaction) {
	    if (!transaction) {
	      throw transaction;
	    }
	    res.status(200).send(transaction);
	  }).error(function (err) {
	    res.status(500).send(err);
	  }).catch(function () {
	    res.sendStatus(404);
	  });
	};

	module.exports.update = function (req, res) {
	  Transaction.where({ id: req.params.id }).fetch().then(function (transaction) {
	    if (!transaction) {
	      throw transaction;
	    }
	    return transaction.save(req.body, { method: 'update' });
	  }).then(function () {
	    res.sendStatus(201);
	  }).error(function (err) {
	    res.status(500).send(err);
	  }).catch(function () {
	    res.sendStatus(404);
	  });
	};

	module.exports.deleteOne = function (req, res) {
	  res.status(401).end();
	  //   Transaction.where({ id: req.params.id })
	  //     .fetch()
	  //     .then(transaction => {
	  //       if (!transaction) {
	  //         throw transaction;
	  //       }
	  //       return transaction.destroy();
	  //     })
	  //     .then(() => {
	  //       res.sendStatus(200);
	  //     })
	  //     .error(err => {
	  //       res.status(503).send(err);
	  //     })
	  //     .catch(() => {
	  //       res.sendStatus(404);
	  //     });
	};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	if (!process.env.TRAVIS) {
	  module.exports = {
	    overstock: __webpack_require__(100),
	    amazon: __webpack_require__(101)
	  };
	} else {
	  module.exports = {
	    overstock: {
	      'website-id': 'travis',
	      Authorization: 'travis'
	    },
	    amazon: {
	      associate_tag: 'travis',
	      access_key_id: 'travis',
	      secret_key: 'travis'
	    }
	  };
	}

/***/ }),
/* 100 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	  'website-id': 8425112,
	  Authorization: '00c32bd17328626a8b1a039e3c5786ed500ad7ecc0806ffc8668e3b037b042c7821f808b16e6fda92b32a16cfdd2e31cc1f7255ed343aeed47748a027e87715bd3/4531ccd13a192252ecc7299b9520861461b3ca0139c7fa4ca0f5506d7df53f0bd84aede7bea54b036c1f0288141e4ce1a43f81dae61d9411d2843684875515d9'
	};

/***/ }),
/* 101 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	  associate_tag: 'clarencebowen-20',
	  access_key_id: 'AKIAISDV5IAQ3ZVZKZAQ',
	  secret_key: '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'
	};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var axios = __webpack_require__(12);

	var _require = __webpack_require__(99),
	    overstock = _require.overstock,
	    amazon = _require.amazon;

	var _require2 = __webpack_require__(71),
	    Product = _require2.Product,
	    Transaction = _require2.Transaction;

	var convert = __webpack_require__(82);
	var parseString = __webpack_require__(83).parseString;
	var CryptoJS = __webpack_require__(103);
	var endpoint = 'webservices.amazon.com';
	var uri = '/onca/xml';
	var pairs = [];
	var product_list = [];

	var params = {
	  'Service': 'AWSECommerceService',
	  'Operation': 'ItemSearch',
	  'AWSAccessKeyId': amazon.access_key_id,
	  'AssociateTag': amazon.associate_tag,
	  'SearchIndex': 'All',
	  'Keywords': '',
	  'ResponseGroup': 'Images,ItemAttributes'
	};

	var defaultImage = '';

	var keys = void 0,
	    canonical_query_string = void 0,
	    string_to_sign = void 0,
	    hash = void 0,
	    signature = void 0,
	    request_url = void 0,
	    productListings = void 0;

	/**
	 * Search all apis with a given search term specified in the request body.
	 */
	module.exports.search = function (req, res) {

	  if (!req.body.searchTerm || req.body.searchTerm.trim().length < 2) {
	    console.log('search failed: requires body!');
	    res.status(400).end(); // bad request
	  }

	  Product.query(function (qb) {
	    qb.whereRaw('TRIM(LOWER(title)) LIKE \'%' + req.body.searchTerm.trim().toLowerCase() + '%\'').limit(20);
	  }).fetchAll().then(function (products) {
	    if (products.length === 0) {
	      console.log('searching foreign');
	      throw products;
	    }
	    console.log('searching local');
	    res.status(200).send({ results: products });
	  }).error(function (err) {
	    res.status(500).send(err);
	  }).catch(function (except) {
	    return searchAmazon(req.body.searchTerm);
	  }).then(function (responses) {
	    if (!responses) {
	      throw new Error('no response from amazon!');
	    }
	    return Product.fromAmazon(responses);
	  }).then(function (results) {
	    res.json({ results: results }).status(200);
	  }).catch(function () {
	    var _console;

	    (_console = console).error.apply(_console, arguments);
	    res.status(500).end();
	  }).error(function () {
	    var _console2;

	    (_console2 = console).error.apply(_console2, arguments);
	    res.status(500).end();
	  });
	};

	/**
	 * Search Amazon given a search term.
	 *  
	 * @param {string} searchTerm 
	 * @param {Promise} - Promise that resolves with a response from amazon
	 */
	var searchAmazon = function searchAmazon(searchTerm) {
	  params.Timestamp = new Date().toISOString();
	  params.Keywords = searchTerm;

	  pairs = [];
	  var keys = Object.keys(params);
	  keys.sort().forEach(function (key) {
	    return pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
	  });

	  canonical_query_string = pairs.join('&');

	  string_to_sign = 'GET\n' + endpoint + '\n' + uri + '\n' + canonical_query_string;

	  hash = CryptoJS.HmacSHA256(string_to_sign, amazon.secret_key);

	  signature = hash.toString(CryptoJS.enc.Base64);

	  request_url = 'http://' + endpoint + uri + '?' + canonical_query_string + '&Signature=' + encodeURIComponent(signature);

	  return axios.get(request_url);
	};

/***/ }),
/* 103 */
/***/ (function(module, exports) {

	module.exports = require("crypto-js");

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(4);
	var router = express.Router();

	var _require$Products = __webpack_require__(95).Products,
	    getAll = _require$Products.getAll,
	    getOne = _require$Products.getOne,
	    update = _require$Products.update,
	    deleteOne = _require$Products.deleteOne,
	    create = _require$Products.create;

	router.route('/').get(getAll).post(create);

	router.route('/:id').get(getOne).put(update).delete(deleteOne);

	module.exports = router;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(4);
	var router = express.Router();

	var _require$Transactions = __webpack_require__(95).Transactions,
	    create = _require$Transactions.create,
	    getAll = _require$Transactions.getAll,
	    getOne = _require$Transactions.getOne,
	    update = _require$Transactions.update,
	    deleteOne = _require$Transactions.deleteOne;

	router.route('/').all(function (req, res, next) {
	  if (req.isAuthenticated()) {
	    next();
	  } else {
	    res.status(401).end();
	  }
	}).get(getAll).post(create);

	router.route('/:id').all(function (req, res, next) {
	  if (req.isAuthenticated()) {
	    next();
	  } else {
	    res.status(401).end();
	  }
	}).get(getOne).put(update).delete(deleteOne);

	module.exports = router;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(4);
	var router = express.Router();

	var search = __webpack_require__(95).Search.search;

	router.route('/').get(search).post(search);

	module.exports = router;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(4);

	var _express2 = _interopRequireDefault(_express);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	var _reactRedux = __webpack_require__(7);

	var _path = __webpack_require__(55);

	var _path2 = _interopRequireDefault(_path);

	var _index = __webpack_require__(8);

	var _index2 = _interopRequireDefault(_index);

	var _renderFullHTMLPage = __webpack_require__(17);

	var _renderFullHTMLPage2 = _interopRequireDefault(_renderFullHTMLPage);

	var _app = __webpack_require__(18);

	var _app2 = _interopRequireDefault(_app);

	var _StaticRouter = __webpack_require__(56);

	var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

	var _MuiThemeProvider = __webpack_require__(21);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _getMuiTheme = __webpack_require__(22);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

	var _lightBaseTheme = __webpack_require__(23);

	var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

	var _routes = __webpack_require__(24);

	var _routes2 = _interopRequireDefault(_routes);

	var _middleware = __webpack_require__(60);

	var _middleware2 = _interopRequireDefault(_middleware);

	var _reactRouterConfig = __webpack_require__(35);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import appRouter from '../../src/router';

	// const reqRoutes = createRoutes(appRouter());


	var router = _express2.default.Router();

	router.get('/', function (req, res) {

	  console.log('user', req.user);

	  var app = {
	    user: req.isAuthenticated() ? req.user : null
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
	          _StaticRouter2.default,
	          { location: req.url, context: context },
	          (0, _reactRouterConfig.renderRoutes)(_routes2.default)
	        )
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

	exports.default = router;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (models) {
	  __webpack_require__(109)(models);
	  __webpack_require__(110)(models);

	  var CronJob = __webpack_require__(111).CronJob;

	  new CronJob('0 * * * *', function () {
	    __webpack_require__(109)(models);
	    __webpack_require__(110)(models);
	  }, null, true, 'America/Los_Angeles');
	};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var axios = __webpack_require__(12);

	var _require = __webpack_require__(99),
	    overstock = _require.overstock;

	axios.defaults.headers.common['Authorization'] = overstock.Authorization;
	var convert = __webpack_require__(82);

	/**
	 * Query overstock api with each category and insert the resulting
	 * data into the database.
	 */
	module.exports = function (_ref) {
	  var Product = _ref.Product;

	  axios.get('https://product-search.api.cj.com/v2/product-search?', {
	    params: {
	      'website-id': overstock['website-id'],
	      'keywords': 'laptop apple windows'
	    }
	  }).then(function (results) {
	    Product.fromOverstock(results);
	  }).catch(function (err) {
	    console.log(err);
	  });
	};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var db = __webpack_require__(73);
	var parseString = __webpack_require__(83).parseString;
	var CryptoJS = __webpack_require__(103);
	var axios = __webpack_require__(12);

	var _require = __webpack_require__(99),
	    amazon = _require.amazon;

	var endpoint = 'webservices.amazon.com';
	var uri = '/onca/xml';
	var searchTerm = 'electronics'; // default category tag
	var pairs = [];
	var product_list = [];
	var params = {
	  'Service': 'AWSECommerceService',
	  'Operation': 'ItemSearch',
	  'AWSAccessKeyId': amazon.access_key_id,
	  'AssociateTag': amazon.associate_tag,
	  'SearchIndex': 'All',
	  'Keywords': searchTerm,
	  'ResponseGroup': 'Images,ItemAttributes'
	};
	var defaultImage = '';

	var keys = void 0,
	    canonical_query_string = void 0,
	    string_to_sign = void 0,
	    hash = void 0,
	    signature = void 0,
	    request_url = void 0,
	    productListings = void 0;

	if (!params.hasOwnProperty('Timestamp')) {
	  params['Timestamp'] = new Date().toISOString();
	}

	keys = Object.keys(params).sort();

	keys.forEach(function (key) {
	  return pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
	});

	canonical_query_string = pairs.join('&');

	string_to_sign = 'GET\n' + endpoint + '\n' + uri + '\n' + canonical_query_string;

	hash = CryptoJS.HmacSHA256(string_to_sign, amazon.secret_key);

	signature = hash.toString(CryptoJS.enc.Base64);

	request_url = 'http://' + endpoint + uri + '?' + canonical_query_string + '&Signature=' + encodeURIComponent(signature);

	module.exports = function (_ref) {
	  var Product = _ref.Product;

	  axios.get(request_url).then(function (results) {
	    Product.fromAmazon(results).catch(console.error);
	  }).catch(function (err) {
	    console.log(err);
	  });
	};

/***/ }),
/* 111 */
/***/ (function(module, exports) {

	module.exports = require("cron");

/***/ })
/******/ ]);