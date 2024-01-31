import { MongoClient } from "mongodb";
async function myfunc(app) {
  const urid =
    "mongodb+srv://vprime:vprime5@vprime.qleekyr.mongodb.net/?retryWrites=true&w=majority";
  let result = [];
  MongoClient.connect(urid, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log("error occured in mongodb routine");
    console.log("Connected successfully to routine server");
    const myDB = client.db("Vprime").collection("routine");
    myDB.find({}).toArray((err, items) => {
      app.get("/api", (req, res) => {
        res.json({ items });
      });
      client.close();
    });

    // console.log(myDB.find({}));
  });
}
export { myfunc };
