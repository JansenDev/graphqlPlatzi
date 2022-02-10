const coursesList = [
  {
    _id: "anyid",
    title: "dev",
    teacher: "janssen",
    description: "una description",
    topic: "Programacion",
  },
  {
    _id: "anyid2",
    title: "dev 2",
    teacher: "janssen 2",
    description: "una description 2",
    topic: "Programacion 2",
  },
  {
    _id: "anyid3",
    title: "dev3 ",
    teacher: "janssen3 ",
    description: "una description3 ",
    topic: "Programacion3 ",
  },
];

const resolvers = {
  Query: {
    getCourses: () => {
      return coursesList;
    },
    getCourse: (_, { id }) => {
      return coursesList.filter((course) => course._id === id).pop();
    },

    hello: () => "hello world",
    gretting: () => "Hola",
  },
  // Mutation: {},
};

module.exports = resolvers;
