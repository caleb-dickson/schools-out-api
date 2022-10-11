module.exports = {
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    deleted: {
      type: "boolean",
      defaultsTo: false,
    },
    tag: {
      type: "number",
      required: true,
      min: 1000,
      max: 9999
    },
    lane: {
      type: "number",
      min: 0
    },
    position: {
      type: "number",
      min: 0
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    campuses: {
      collection: "campus",
      via: "cars"
    },
    driver: {
      model: "user"
    },
    authorizedGuardians: {
      collection: "user",
      via: "car"
    },
    students: {
      collection: "student",
      via: "car"
    },
    currentLine: {
      model: "carline"
    }


  },
};
