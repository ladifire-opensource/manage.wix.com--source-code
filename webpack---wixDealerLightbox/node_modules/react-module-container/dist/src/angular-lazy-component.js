'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _moduleRegistry = require('./module-registry');

var _moduleRegistry2 = _interopRequireDefault(_moduleRegistry);

var _baseLazyComponent = require('./base-lazy-component');

var _baseLazyComponent2 = _interopRequireDefault(_baseLazyComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddRouterContext = function (_React$Component) {
  _inherits(AddRouterContext, _React$Component);

  function AddRouterContext() {
    _classCallCheck(this, AddRouterContext);

    return _possibleConstructorReturn(this, (AddRouterContext.__proto__ || Object.getPrototypeOf(AddRouterContext)).apply(this, arguments));
  }

  _createClass(AddRouterContext, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { router: this.props.router };
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return AddRouterContext;
}(_react2.default.Component);

AddRouterContext.childContextTypes = {
  router: _propTypes2.default.any
};
AddRouterContext.propTypes = {
  router: _propTypes2.default.any,
  children: _propTypes2.default.any
};

var AngularLazyComponent = function (_BaseLazyComponent) {
  _inherits(AngularLazyComponent, _BaseLazyComponent);

  function AngularLazyComponent() {
    _classCallCheck(this, AngularLazyComponent);

    return _possibleConstructorReturn(this, (AngularLazyComponent.__proto__ || Object.getPrototypeOf(AngularLazyComponent)).apply(this, arguments));
  }

  _createClass(AngularLazyComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.mounted = true;
      this.resourceLoader.then(function () {
        if (_this3.mounted) {
          var component = '<' + _this3.manifest.component + '></' + _this3.manifest.component + '>';
          _this3.$injector = angular.bootstrap(component, [_this3.manifest.module, ['$provide', '$compileProvider', function ($provide, $compileProvider) {
            $provide.factory('props', function () {
              return function () {
                return _this3.mergedProps;
              };
            });
            $compileProvider.directive('moduleRegistry', function () {
              return {
                scope: { component: '@', props: '<' },
                controller: ['$scope', '$element', function ($scope, $element) {
                  var Component = _moduleRegistry2.default.component($scope.component);
                  $scope.$watch(function () {
                    return $scope.props;
                  }, function () {
                    (0, _reactDom.render)(_react2.default.createElement(
                      AddRouterContext,
                      { router: _this3.props.router },
                      _react2.default.createElement(Component, $scope.props)
                    ), $element[0]);
                  }, true);
                  $scope.$on('$destroy', function () {
                    return (0, _reactDom.unmountComponentAtNode)($element[0]);
                  });
                  //super hack to prevent angular from preventing external route changes
                  $element.on('click', function (e) {
                    return e.preventDefault = function () {
                      return delete e.preventDefault;
                    };
                  });
                }]
              };
            });
            $compileProvider.directive('routerLink', function () {
              return {
                transclude: true,
                scope: { to: '@' },
                template: '<a ng-href="{{to}}" ng-click="handleClick($event)"><ng-transclude></ng-transclude></a>',
                controller: ['$scope', function ($scope) {
                  $scope.handleClick = function (event) {
                    if (event.ctrlKey || event.metaKey || event.shiftKey || event.which === 2 || event.button === 2) {
                      return;
                    } else {
                      _this3.props.router.push($scope.to);
                      event.preventDefault();
                    }
                  };
                }]
              };
            });
          }]]);
          _this3.node.appendChild(_this3.$injector.get('$rootElement')[0]);
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      if (this.$injector) {
        this.$injector.get('$rootScope').$destroy();
        this.$injector = null;
      }
      _get(AngularLazyComponent.prototype.__proto__ || Object.getPrototypeOf(AngularLazyComponent.prototype), 'componentWillUnmount', this).call(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.$injector && !this.$injector.get('$rootScope').$$phase) {
        this.$injector.get('$rootScope').$digest();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement('div', { ref: function ref(node) {
          return _this4.node = node;
        } });
    }
  }]);

  return AngularLazyComponent;
}(_baseLazyComponent2.default);

AngularLazyComponent.propTypes = {
  router: _propTypes2.default.any
};

exports.default = AngularLazyComponent;