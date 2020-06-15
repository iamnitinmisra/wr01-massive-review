module.exports = {
  getAllCars: async (req, res) => {
    const db = req.app.get("db");

    const results = await db.get_all_cars();
    res.status(200).send(results);
  },

  getCarsByMake: async (req, res) => {
    const db = req.app.get("db");
    let { make, name } = req.query;

    let results;

    // console.log("");
    // console.log("name", name);
    // console.log("name at index", name[0]);
    // console.log("make", make);
    // console.log("typeof", typeof name);
    // console.log("length", name.length);

    if (name === undefined) {
      name = [];
    }

    if (name[2] && typeof name === "object") {
    //   console.log("3 People Selected");
      results = await db
        .get_cars_by_make_person(make, name[0], name[1], name[2])
        .catch((err) => console.log(err));
    } else if (name[1] && typeof name === "object") {
    //   console.log("2 People Selected");

      results = await db
        .get_cars_by_make_person(make, name[0], name[1], "")
        .catch((err) => console.log(err));
    } else if (name && typeof name === "string") {
    //   console.log("1 Person Selected");

      results = await db
        .get_cars_by_make_person(make, name, "", "")
        .catch((err) => console.log(err));
    } else {
    //   console.log("0 Selected");

      results = await db
        .get_cars_by_make(make)
        .catch((err) => console.log(err));
    }
    // console.log("results", results);
    // console.log("");

    if (results.length) {
      res.status(200).send(results);
    } else {
      res.status(400).send(console.log('NO RESULTS FOUND'));
    }
  },
};
