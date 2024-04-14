/**
 * @swagger
 * /users/get-users:
 *  get:
 *      description: responses
 *      tags: [User]
 *      responses:
 *          200: 
 *              description: success   
 */

/**
 * @swagger
 * /users/update/{id}:
 *  put:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: id
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *      responses:
 *          200: 
 *              description: res   
 */