module.exports = {
  friendlyName: "Create one new Student",

  inputs: {
    firstName: {
      required: true,
      type: "string",
    },
    lastName: {
      required: true,
      type: "string",
    },
    grade: {
      type: "number",
      required: true,
    },
    mode: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
    },
    campus: {
      type: "number",
      required: true,
    },
    teacher: {
      type: "number",
      required: true,
    },
    car: {
      type: "number",
    },
    bus: {
      type: "string",
    },
  },

  exits: {
    success: {
      description: "New Student was created successfully.",
    },
  },

  fn: async function ({
    firstName,
    lastName,
    grade,
    mode,
    status,
    campus,
    teacher,
    car,
    bus,
  }) {
    let foundCampus;
    let foundTeacher;
    let foundCar;
    // let foundBus;

    if (campus) {
      foundCampus = await Campus.findOne({ id: campus, deleted: false });
      if (!foundCampus) {
        return this.res.badRequest({
          message: "Provided Campus invalid",
        });
      }
    }
    if (teacher) {
      foundTeacher = await User.findOne({
        id: teacher,
        deleted: false,
        role: "TEACHER",
      });
      if (!foundTeacher) {
        return this.res.badRequest({
          message: "Provided Teacher invalid",
        });
      }
    }
    if (car) {
      foundCar = await Car.findOne({ id: car, deleted: false });
      if (!foundCar) {
        return this.res.badRequest({
          message: "Provided Car invalid",
        });
      }
    }
    // if (bus) {
    //   foundBus = await Bus.findOne({ id: bus });
    //   if (!foundBus) {
    //     return this.res.badRequest({
    //       message: "Provided Bus invalid"
    //     })
    //   }
    // }

    const newStudentRecord = await Student.create({
      firstName: firstName,
      lastName: lastName,
      grade: grade,
      mode: mode,
      status: status,
      campus: campus,
      teacher: teacher,
      car: car,
      bus: bus,
    }).fetch();

    const populatedStudentRecord = await Student.findOne(
      {
        id: newStudentRecord.id,
        deleted: false
      },
      {
        campus: true,
        teacher: true,
        car: true,
      }
    );

    sails.helpers.redactUser(populatedStudentRecord.teacher);

    return populatedStudentRecord;
  }
};
