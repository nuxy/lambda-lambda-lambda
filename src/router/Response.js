/**
 *  lambda-lambda-lambda
 *  AWS Lambda@Edge serverless application router.
 *
 *  Copyright 2021-2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Provides AWS CloudFront response instance and methods.
 *
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html#example-origin-response
 */
class RouterResponse {

  /**
   * @param {CloudFrontResponse|undefined} cfResObj
   *   CloudFront response object (optional).
   */
  constructor(cfResObj = {}) {
    this.cfResObj = Object.assign({
      headers: {},
      status: null
    }, cfResObj);

    Object.seal(this);
  }

  /**
   * Return the CloudFront response data.
   *
   * @return {CloudFrontResponse}
   */
  data() {
    return this.cfResObj;
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
   * res.setHeader('Content-Type', 'text/html');
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
   * res.setHeader('Content-Type', 'mime/type');
   * res.status(200).send(value);
   *   ..
   *
   * res.setHeader('Content-Type', 'application/json');
   * res.status(200).json({hello: 'world'});
   *   ..
   *
   * res.setHeader('Content-Type', 'text/html');
   * res.status(200).text('Hello World');
   *   ..
   *
   * res.setHeader('Content-Type', 'image/jpeg; charset=utf-8');
   * res.status(200).data(buffer);
   */
  status(code) {
    this.data().status = code;

    // Chain response methods.
    return {
      data: buffer => {
        this.data().body = buffer.toString('base64');
        this.data().bodyEncoding = 'base64';
      },
      json: (obj = {}) => {
        this.data().body = this.json(obj);
        this.data().bodyEncoding = 'text';
      },
      text: str => {
        this.data().body = this.text(str);
        this.data().bodyEncoding = 'text';
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
