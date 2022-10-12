const health = require("./action/health");
const signup = require("./action/signup");

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  healthCheck: health,
  signup: signup
};

