/** @class router/Response */

'use strict';

/**
 * Provides AWS CloudFront response instance and methods.
 *
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html#example-origin-response
 */
module.exports = class RouterResponse {

  /**
   * @param {Object|undefined} obj
   *   AWS response object (optional).
   */
  constructor(obj = {}) {
    this.obj = Object.assign({
      headers: {},
      status: null
    }, obj);
  }

  /**
   * Return the AWS response data.
   *
   * @return {Object}
   */
  data() {
    return this.obj;
  }

  /**
   * Return the data as JSON.
   *
   * @param {Object} data
   *   Data as object.
   *
   * @return {String}
   */
  json(data) {
    return JSON.stringify(data);
  }

  /**
   * Return the body text.
   *
   * @param {String} body
   *   Body as string.
   *
   * @return {String}
   */
  text(body) {
    return body.toString();
  }

  /**
   * Set HTTP response header.
   *
   * @param {String} key
   *   HTTP header key.
   *
   * @param {String} value
   *   HTTP header value.
   *
   * @example
   *   res.setHeader('Content-Type', 'text/html');
   */
  setHeader(key, value) {
    if (key && value) {
      Object.assign(this.data().headers, {
        [key.toLowerCase()]: [{key, value}]
      });
    }
  }

  /**
   * Return the AWS response data.
   *
   * @param {Number} code
   *   HTTP status code.
   *
   * @return {Object<Function>}
   *
   * @example
   *   res.setHeader('Content-Type', 'text/html');
   *   res.status(200).send('Hello World');
   *
   *     ..
   *
   *   res.setHeader('Content-Type', 'application/json');
   *   res.status(200).json({hello: 'world'});
   */
  status(code) {
    this.data().status = code;

    // Chain response methods.
    return {
      json: (data = {}) => {
        this.data().body = this.json(data);
      },
      send: body => {
        if (body) {
          this.data().body = this.text(body);
        }
      }
    };
  }
};
