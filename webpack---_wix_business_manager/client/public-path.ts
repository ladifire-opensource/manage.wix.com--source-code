/*
If `css` from webpack is ever injected via `<style>` tag, any relative path
references in the `css` will become incorrect.

To solve this, Webpack allows defining a bundle scope global (i.e., not on window!)
that allows defining the path base for such assets.

`window__WEBPACK_PUBLIC_PATH__` is not actually read by webpack and is only
used to pass the information to the module. Just for saftey and to prevent
confusion we delete it after use.
*/
declare let __webpack_public_path__: any;
__webpack_public_path__ = window.__WEBPACK_PUBLIC_PATH__;

delete window.__WEBPACK_PUBLIC_PATH__;
