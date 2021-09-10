var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import { getDefaults, setDefaults, getI18n, setI18n } from './context';
import I18n from './I18n';

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export default function translate(namespaces) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  return function Wrapper(WrappedComponent) {
    var Translate = function (_Component) {
      _inherits(Translate, _Component);

      function Translate(props, context) {
        _classCallCheck(this, Translate);

        var _this = _possibleConstructorReturn(this, (Translate.__proto__ || Object.getPrototypeOf(Translate)).call(this, props, context));

        _this.i18n = context.i18n || props.i18n || options.i18n || getI18n();
        namespaces = namespaces || _this.i18n.options.defaultNS;
        if (typeof namespaces === 'string') namespaces = [namespaces];

        var i18nOptions = _this.i18n && _this.i18n.options.react || {};
        _this.options = _extends({}, getDefaults(), i18nOptions, options);

        _this.getWrappedInstance = _this.getWrappedInstance.bind(_this);
        return _this;
      }

      _createClass(Translate, [{
        key: 'getWrappedInstance',
        value: function getWrappedInstance() {
          if (!this.options.withRef) {
            // eslint-disable-next-line no-console
            console.error('To access the wrapped instance, you need to specify ' + '{ withRef: true } as the second argument of the translate() call.');
          }

          /* eslint react/no-string-refs: 1 */
          return this.wrappedInstance;
        }
      }, {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var extraProps = {};

          if (this.options.withRef) {
            extraProps.ref = function (c) {
              _this2.wrappedInstance = c;
            };
          }

          return React.createElement(I18n, _extends({ ns: namespaces }, this.options, this.props, { i18n: this.i18n }), function (t, context) {
            return React.createElement(WrappedComponent, _extends({}, _this2.props, extraProps, context));
          });
        }
      }]);

      return Translate;
    }(Component);

    Translate.WrappedComponent = WrappedComponent;

    Translate.contextTypes = {
      i18n: PropTypes.object
    };

    Translate.displayName = 'Translate(' + getDisplayName(WrappedComponent) + ')';

    Translate.namespaces = namespaces;

    return hoistStatics(Translate, WrappedComponent);
  };
}

translate.setDefaults = setDefaults;

translate.setI18n = setI18n;