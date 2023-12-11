const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const typeDefs = require('./src/product/schema');
const resolvers = require('./src/product/resolver'); // Adjust path based on your project structure
const cors = require('cors');
const port = process.env.PORT || 4000;

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRouter'));

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
  console.log(`GraphQL server available at http://localhost:${port}${server.graphqlPath}`);
});
