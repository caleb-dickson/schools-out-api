module.exports = {
  friendlyName: "Update one campus.",

  inputs: {
    campusId: {
      type: "number",
      required: true,
    },
    name: {
      type: "string",
    },
    admin: {
      type: "number",
    },
    carLine: {
      type: "number",
    },
  },

  exits: {
    success: {
      description: "Campus was found and updated as requested.",
    },
    notFound: {
      statusCode: 404,
      description: "No campus was found by that id.",
    },
    forbidden: {
      statusCode: 403,
      description:
        "The Campus Admin provided isn't yet an Admin User. Please upgrade this User's role to Admin to add them as the new Admin for this Campus.",
    },
  },

  fn: async function ({ campusId, name, admin, carLine }) {
    const foundAdmin = await User.findOne({ id: admin });
    if (!foundAdmin) {
      throw "forbidden";
    }

    const updatedCampus = await Campus.updateOne({ id: campusId }).set({
      name: name,
      admin: admin,
      carLine: carLine,
    });
    if (!updatedCampus) {
      throw "notFound";
    }

    const populatedCampus = await Campus.findOne(
      { id: campusId },
      {
        admin: true,
        users: true,
        students: true,
        cars: true,
        carLine: true,
      }
    );

    sails.helpers.redactUser(populatedCampus.admin);
    populatedCampus.users.forEach((u) => sails.helpers.redactUser(u));


    return populatedCampus;
  },
};
