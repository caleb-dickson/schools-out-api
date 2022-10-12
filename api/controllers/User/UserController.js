const health = require("./action/health");
const login = require("./action/login");
const signup = require("./action/signup");
const logout = require("./action/logout");

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  healthCheck: health,
  signup: signup,
  login: login,
  logout: logout
};

