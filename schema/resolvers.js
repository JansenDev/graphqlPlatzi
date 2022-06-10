const service = require("../service");
const types = require('./types')

const resolvers = {
  Query: {
    getCourses: () => service.getCourses(),
    getCourse: (_, { id }) => service.getCourse(id),
    getStudents: () => service.getStudents(),
    getStudentById: (_, { id }) => service.getStudentById(id),
    hello: () => "hello world",
    gretting: () => "Hola",
  },
  Mutation: {
    addCourse: (_, { input }) => service.addCourse(input),
    addStudent: (_, { input }) => service.addStudent(input),
    deleteStudentById: (_, { id }) => service.deleteStudentById(id),
    editStudent: (_, { id, input }) => service.editStudent(id, input),
    addStudentInACourse: (_, { idCourse, idStudent }) =>
      service.addStudentInACourse(idCourse, idStudent),
  },
  ...types

};

module.exports = resolvers;
