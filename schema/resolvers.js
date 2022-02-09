const resolvers = {
  getCourses: () => {
    return [
      {
        _id: "anyid",
        title: "dev",
        teacher: "janssen",
        description: "una description",
        topic: "Programacion",
      },
      {
        _id: "anyid",
        title: "dev 2",
        teacher: "janssen 2",
        description: "una description 2",
        topic: "Programacion 2",
      },
      {
        _id: "anyid3 ",
        title: "dev3 ",
        teacher: "janssen3 ",
        description: "una description3 ",
        topic: "Programacion3 ",
      },
    ];
  },

  hello: () => "hello world",
  gretting: ()=>"Hola"
};

module.exports = resolvers;
