const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const multer = require('multer');
const { authMiddleware } = require('./utils/auth');
const handleSlpSeed = require('./utils/slpHandles/handleSlpSeed')
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const fs = require('fs').promises


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/_tempSlps');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const slpRegex = /^.*\.(slp)$/
    if (file.originalname.match(slpRegex)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .slp files allowed!'));
    }
  }
});
// const handleSlpUpload  = require('./utils/handleSlpUpload')

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/data/upload', upload.array('slpFiles', 20), async function (req, res) {
  if(!req.files.length){
    return res.status(400).redirect('/data/upload')
  }
  const directory = `./upload/_tempSlps/`
  const response = await handleSlpSeed(directory, req.files)
  if (!response) {
    return res.status(500).send(`Error uploading files`)
  } else {
    // for (let file of req.files) {
    //   await fs.unlink(file.path)
    // }
    return res.status(200).redirect('/data/upload')
  }


  // console.log(`it's opening`)
  // for (let file of req.files.slpFiles) {
  //   console.log(file)
  //   const parsed = await handleSlpParse(`${directory}${file}`)
  //   if (!parsed) {
  //     console.log(`Error parsing .slp: ${file.filename}`)
  //     continue
  //   }
  //   const analyzed = await handleSlpAnalyze(parsed)
  //   if (!analyzed) {
  //     console.log(`Error analyzing parsed .slp: ${file}`)
  //     continue
  //   }
  //   const response = await handleSlpUpload(analyzed)
  //   if (!response) {
  //     console.log(`Error uploading analyzed .slp: ${file}`)
  //     continue
  //   }
  //   console.log(`File uploaded succesfully: ${file}`)
  //   continue
  // }
  // console.log(`Upload done, closing databse`)
  // res.status(200).send(`Success!`)
})
// if (!req.files || Object.keys(req.files).length === 0) {
//   return res.status(400).send(`No files wer uploaded`)
// }

// let uploadDir = `${__dirname}/utils/testSlps/_tempSlps/`

// const uploaded = await handleMoveSlps(uploadDir, req.files.slpFiles)
// if(!uploaded){
//   return res.status(500).send(`No files uploaded`)
// }
// const toDatabase = await handleSlpSeed(uploadDir)
// if(!toDatabase){
//   return res.status(500).send(`Error uploading to DB`)
// }
// return res.status(200).send(`Files uploaded succesfully!`)

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
