module.exports = {
  friendlyName: "Test auth",

  description: "Verifies that the current user is authenticated.",

  extendedDescription: "Returns 200 OK if authenticated; 401 Unauthorized if not.",

  exits: {
    success: {
      description:
        "The requesting user agent is currently logged in.",
    },
  },

  fn: async function () {
    sails.log(this.req.session);
    sails.log("||||||||||||||||");
    sails.log(this.req.me);
  },
};
