'use strict';

const basicAuthHandler  = require('../../middleware/BasicAuthHandler');
const contentTypeHeader = require('../../middleware/ContentTypeHeader');

/**
 * @export {Object}
 */
module.exports = {
  middleware: [basicAuthHandler, contentTypeHeader],
  resource: ['create', 'update', 'delete'],

  /**
   * @openapi
   *
   * /api/example/private:
   *   get:
   *     description: Example using `Route.index` handler alias.
   *     responses:
   *       200:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *       401:
   *         description: Unauthorized
   *     security:
   *       basicAuth: []
   *     tags:
   *       - Protected route
   */
  index (req, res) {
    res.status(200).send({name: 'example/private:index'});
  },

  /**
   * @openapi
   *
   * /api/example/private/{resourceId}:
   *   put:
   *     description: Example using `Route.create` handler alias.
   *     parameters:
   *       - in: path
   *         name: resourceId
   *         default: 123456
   *         required: true
   *     responses:
   *       201:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *       401:
   *         description: Unauthorized
   *     security:
   *       basicAuth: []
   *     tags:
   *       - Protected route
   */
  create (req, res, id) {
    res.status(201).send({name: `example/private/${id}:create`});
  },

  /**
   * @openapi
   *
   * /api/example/private/{resourceId}:
   *   patch:
   *     description: Example using `Route.update` handler alias.
   *     parameters:
   *       - in: path
   *         name: resourceId
   *         default: 123456
   *         required: true
   *     responses:
   *       200:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *       401:
   *         description: Unauthorized
   *     security:
   *       basicAuth: []
   *     tags:
   *       - Protected route
   */
  update (req, res, id) {
    res.status(200).send({name: `example/private/${id}:update`});
  },

  /**
   * @openapi
   *
   * /api/example/private/{resourceId}:
   *   delete:
   *     description: Example using `Route.delete` handler method.
   *     parameters:
   *       - in: path
   *         name: resourceId
   *         default: 123456
   *         required: true
   *     responses:
   *       200:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *       401:
   *         description: Unauthorized
   *     security:
   *       basicAuth: []
   *     tags:
   *       - Protected route
   */
  delete (req, res, id) {
    res.status(200).send({name: `example/private/${id}:delete`});
  },

  /**
   * @openapi
   *
   * /api/example/private:
   *   post:
   *     description: Example using `Route.submit` handler alias.
   *     responses:
   *       200:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *       401:
   *         description: Unauthorized
   *     security:
   *       basicAuth: []
   *     tags:
   *       - Protected route
   */
  submit (req, res) {
    res.status(200).send({name: 'example/private:submit'});
  }
};
