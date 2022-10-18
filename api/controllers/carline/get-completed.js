module.exports = {
  friendlyName: "Get CarLines by Campus id.",

  description:
    "Get all non-completed (archive, non-deleted) Carlines by Campus id.",

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
    noCarLines: {
      responseType: "notFound",
      description: "No previous Carlines were found by that Campus.",
    },
  },

  fn: async function ({ campusId }) {

    const foundCampus = await Campus.findOne({ id: campusId, deleted: false });
    if (!foundCampus) {
      return this.res.badRequest({ message: "Invalid Campus" });
    }

    const foundCarLines = await CarLine.find(
      {
        campus: campusId,
        completed: true,
      },
      { campus: true, cars: true }
    );
    if (!foundCarLines || foundCarLines.length === 0) {
      throw "noCarLines";
    }

    return foundCarLines;
  },
};
