'use strict';

/**
 * Provides AWS CloudFront response instance and methods.
 *
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html#example-origin-response
 */
class RouterResponse {

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
   *   res.setHeader('Content-Type', 'mime/type');
   *   res.status(200).send(value);
   *     ..
   *
   *   res.setHeader('Content-Type', 'application/json');
   *   res.status(200).json({hello: 'world'});
   *     ..
   *
   *   res.setHeader('Content-Type', 'text/html');
   *   res.status(200).text('Hello World');
   *     ..
   *
   *   res.setHeader('Content-Type', 'image/jpeg');
   *   res.setHeader('Content-Length', buffer.byteLength.toString());
   *   res.status(200).data(buffer);
   */
  status(code) {
    this.data().status = code;

    // Chain response methods.
    return {
      data: buffer => {
        this.data().body = buffer;
      },
      json: (obj = {}) => {
        this.data().body = this.json(obj);
      },
      text: str => {
        this.data().body = this.text(str);
      },

      // Determine argument type.
      send: arg => {
        if (Buffer.isBuffer(arg)) {
          this.status(code).data(arg);
        } else if (Array.isArray(arg) || typeof arg === 'object') {
          this.status(code).json(arg);
        } else if (arg) {
          this.status(code).text(arg);
        }
      }
    };
  }
};

module.exports = RouterResponse;
