'use strict';

/**
 * Provides AWS CloudFront Request instance and methods.
 *
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html#example-origin-request
 */
module.exports = class RouterRequest {

  /**
   * @param {Object} obj
   *   AWS Request object.
   */
  constructor(obj) {
    this.obj = obj;
  }

  /**
   * Return CloudFront supported Request object.
   *
   * @return {Object}
   */
  data() {
    return this.obj;
  }

  /**
   * Return value for given HTTP header name.
   *
   * @param {String} name
   *   HTTP header name.
   *
   * @return {Boolean}
   *
   * @example
   *   const value = req.header('Content-Type');
   *   // text/html
   */
  header(name) {
    const headers = this.getHeaders();

    let value;
    Object.keys(headers).forEach(function(key) {
      if (key === name.toLowerCase()) {
        value = headers[key][0].value;
      }
    });
    return value;
  }

  /**
   * Check Accept matches the given value.
   *
   * @param {String} mimeType
   *   MIME type value.
   *
   * @return {Boolean}
   *
   * @example
   *   const value = req.is('text/html');
   *   // true
   */
  is(mimeType) {
    return (this.header('Accept') === mimeType);
  }

  /**
   * Return the HTTP method of the request.
   *
   * @return {String}
   */
  method() {
    return this.data().method;
  }

  /**
   * Return the query string, if any, in the request.
   *
   * @return {String}
   */
  queryString() {
    return this.data().querystring;
  }

  /**
   * Return the relative path of the requested object.
   *
   * @return {String}
   */
  uri() {
    return this.data().uri;
  }

  /**
   * Return the HTTP client IP (remote address).
   *
   * @return {String}
   */
  clientIp() {
    return this.data().clientIp;
  }

  /**
   * Return the headers of the request.
   *
   * @return {Array<Object|undefined>}
   */
  getHeaders() {
    return this.data().headers;
  }
};
