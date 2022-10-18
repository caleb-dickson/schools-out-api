module.exports = {
  friendlyName: "Get Campus by id.",

  description: "Get one Campus by matching id and not deleted.",

  inputs: {
    campusId: {
      type: "number",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Campus was found.",
    },
    notFound: {
      responseType: "notFound",
      description: "No campus was found by that id.",
    },
  },

  fn: async function ({ campusId }) {
    const foundCampus = await Campus.findOne({ id: campusId, deleted: false });
    if (!foundCampus) {
      throw "notFound";
    }

    return foundCampus;
  }
};
