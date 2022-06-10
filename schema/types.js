const { ObjectId } = require("mongodb");
const connectionDB = require("../db/db");

module.exports = {
  // Populate Course.student: 'student' es un iterador que contiene todos los arrays del 'campo student' de todos los Course
  Course: {
    student: async ({ student }) => {
      db = await connectionDB();
      //   Si es null algun Course.student se agrega [] por defecto,
      // si existe Array se convierte a objct
      ids = student ? student.map((student) => ObjectId(student._id)) : [];

      studentData =
        ids.length > 0
          ? await db
              .collection("student")
              .find({ _id: { $in: ids } })
              .toArray()
          : [];

      return studentData;
    },
  },
};
