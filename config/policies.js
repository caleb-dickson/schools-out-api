/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/
  "*": "is-authenticated", // Require user to be authenticated/logged in to access any action not otherwise mapped in this config

  "user/health": true, // Always allow access to the server health check action, and so on...
  "user/signup": true,
  "user/login": true,

  "campus/create-one": "is-admin",
  "campus/update-one": "is-admin",
  "campus/delete-one": "is-admin",

  "student/create-one": "is-faculty",
  "student/create-many": "is-faculty",
  /* GET Student also has checks to ensure only Guardians in the same Car may receieve Student data. */
  "student/update-one": "is-faculty",
  "student/delete-one": "is-faculty",

};
