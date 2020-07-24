const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// const caminho = __dirname + 'src/assets';

// type: buffer => binary
const sharp = require('sharp');
const multer = require('multer')
const upload = multer({
  dest: 'src/assets',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
    if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
      return cb(new Error('Please upload a Word document'))
    }
    cb(undefined, true)
  }
})

app.post('/upload', upload.single('upload'), function (req, res) {
  res.send('ok')
}, (error, req, res, next)=>{
  res.status(400).send({error: error.message})
})

app.post('/uploadwithsharp', upload.single('upload'), async (res,res) =>{
  const buffer = await sharp(req.file.buffer).resize({width: 450, height: 450}).png().toBuffer()
  res.send('ok')
}, (error, req, res, next)=>{
  res.status(400).send({error: error.message})
})

app.get('/getimage', upload.single('upload'), function (req, res) {
  //res.set('Content-Type', 'image/jpg') return only image in broweser
  res.send('exemplo.avatar')
})

var port = process.env.PORT || 3000;

module.exports = app.listen(port, () => {
  console.log('Serve is running in port 3000.');
});