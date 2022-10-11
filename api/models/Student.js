module.exports = {

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
    },
    lastName: {
      type: "string",
    },
    grade: {
      type: "number",
      required: true,
    },
    mode: {
      type: "string",
      required: true,
      isNotEmptyString: true,
      isIn: ["WALK", "BUS", "CAR"],
    },
    status: {
      type: "string",
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    campus: {
      model: "campus",
      required: true
    },
    teacher: {
      model: "user",
    },
    car: {
      model: "car",
    },
    bus: {
      type: "string"
    },
  },
};
