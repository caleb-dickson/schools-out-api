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
    },
    token: {
      type: "string" // FIXME: required: true
    },
    role: {
      type: "string",
      required: true,
      isNotEmptyString: true,
      isIn: ["ADMIN", "TEACHER", "GUARDIAN"],
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    campus: {
      collection: "campus",
      via: "users"
    },
    car: {
      model: "car",
    },
  },
};
