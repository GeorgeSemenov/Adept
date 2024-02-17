const db = {
  companies: [
    {
      id: 1,
      name: "Horns and hooves",
      staff: [
        {
          id: 1,
          companyId: 1,
          name: "Gregor",
          surname: "Zamsa",
          position: "programmer",
        },
        {
          id: 2,
          companyId: 1,
          name: "Jojo",
          surname: "Ba",
          position: "cleaner",
        },
      ],
      adress: "Russian Federation",
    },
    {
      id: 2,
      name: "Big Deal",
      staff: [
        {
          id: 1,
          companyId: 2,
          name: "Ivan",
          surname: "Zamsa",
          position: "boss",
        },
        {
          id: 2,
          companyId: 2,
          name: "Fedor",
          surname: "Pupkov",
          position: "director",
        },
      ],
      adress: "Saint Petersburg",
    },
  ],
};

export default db;
