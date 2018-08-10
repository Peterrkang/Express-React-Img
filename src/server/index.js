const express = require("express");
const mergeImg = require("merge-img");
const multer = require("multer");
const fs = require("fs");

//upload directory destination
const upload = multer({ dest: `${__dirname}/public/images` });
const app = express();
//serves the index.html
app.use(express.static(`${__dirname}./../../`));

app.post("/upload", upload.any(), (req, res) => {
  //grab the file path of images
  const imagePaths = req.files.map(file => file.path);
  mergeImg(imagePaths)
    .then(img => {
      //create merged image
      img.write(`${__dirname}/public/images/merged.png`, err => {
        if (err) throw new Error(err);
        fs.readFile(`${__dirname}/public/images/merged.png`, (err, data) => {
          if (err) throw new Error(err);
          //convert image file to base64-encoded string
          const base64Image = new Buffer(data, "binary").toString("base64");
          res.send(`data:image/png;base64,${base64Image}`);
        });
      });
    })
    .then(() => {
      //delete images
      imagePaths.forEach(img =>
        fs.unlink(img, () => console.log(`Removed ${img}`))
      );
    })
    .catch(err => {
      res.status(400).send(err);
      console.log(err);
    });
});

//listens on port 3000 -> http://localhost:3000/
app.listen(3000, () => console.log(`Listening on Port 3000`));
