const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const multer = require('multer');
const { authMiddleware } = require('./utils/auth');
const handleSlpSeed = require('./utils/slpHandles/handleSlpSeed')
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('upload'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './upload/_tempSlps'));
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


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// handling .slp file uploads
app.post('/data/upload', upload.array('slpFiles', 10), async function (req, res) {
  if (!req.files.length) {
    return res.status(400).redirect('/data/upload')
  }
  const directory = path.join(__dirname, './upload/_tempSlps/')
  const response = await handleSlpSeed(directory, req.files)
  if (!response) {
    return res.status(500).send(`Error uploading files`)
  } else {
    return res.status(200).redirect('/data/upload')
  }
})

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
