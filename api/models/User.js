module.exports = {
  tableName: "user_table",

  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    deleted: {
      type: "boolean",
      defaultsTo: false,
    },
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      isNotEmptyString: true,
      isEmail: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
      protect: true
    },
    token: {
      type: "string", // For driver authentication on pickup - FIXME: required: true
    },
    role: {
      type: "string",
      required: true,
      isNotEmptyString: true,
      isIn: ["ADMIN", "TEACHER", "GUARDIAN"],
    },
    lastSeenAt: {
      type: "number",
      description:
        "A JS timestamp (epoch ms) representing the moment at which this user most recently interacted with the backend while logged in (or 0 if they have not interacted with the backend at all yet).",
      example: 1502844074211,
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    campus: {
      collection: "campus",
      via: "users",
    },
    car: {
      model: "car",
    },
  },
};
