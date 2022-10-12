module.exports = {
  friendlyName: "Health",

  description: "Health check.",

  inputs: {},

  exits: {},

  fn: async function () {
    return { message: "Server is up and running!" };
  },
};
