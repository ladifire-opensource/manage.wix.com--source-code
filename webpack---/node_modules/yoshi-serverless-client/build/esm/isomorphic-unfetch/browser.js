module.exports =
  // eslint-disable-next-line import/no-extraneous-dependencies
  this.fetch || (this.fetch = require('unfetch').default || require('unfetch'));
