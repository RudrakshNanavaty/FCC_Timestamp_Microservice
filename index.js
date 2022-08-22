var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// sending the current date if no date is provided
app.get("/api", (req, res) => {
  const currentDate = Date.now();

  res.status(200).send({
    unix: currentDate,
    utc: new Date(currentDate).toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  // initializing variables
  const givenDate = req.params.date;
  let date;

  // convert date to number
  const checkUnix = givenDate * 1;

  // storing the result of Date() constructor in date
  date = isNaN(checkUnix) ? new Date(givenDate) : new Date(checkUnix);

  // sending appropriate json according to the date format recieved
  if (date == "Invalid Date") {
    res.status(422).json({ error: "Invalid Date" });
  } else {
    res.status(200).json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// listen for requests
var listener = app.listen(3000, function () {
  console.log("Listening on port " + listener.address().port);
});