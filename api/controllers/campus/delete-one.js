module.exports = {
  friendlyName: "Delete one Campus",

  description: "Marks a Campus as 'deleted'.",

  inputs: {
    campusId: {
      type: "number",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Campus was successfully deleted.",
    },
    notFound: {
      responseType: "notFound",
      description: "No campus was found by that id.",
    },
  },

  fn: async function ({ campusId }) {

    const deletedCampus = await Campus.updateOne({ id: campusId, deleted: false }).set({
      deleted: true
    });

    if (!deletedCampus) {
      throw "notFound";
    }

    return deletedCampus;
  },
};
