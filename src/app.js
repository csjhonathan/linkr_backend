import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index.routes.js';
import swaggerDocs from './swagger/swagger.js';

const app = express();

app
  .use(cors())
  .use(express.json())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  .use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${chalk.green(`http://localhost:${PORT}`)}`);
});
