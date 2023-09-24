import { paths } from './docs/paths.js';
import { schemas } from './docs/schemas.js';

const info = {
  version: '1.0.0',
  title: 'Linkr Api',
  description: 'Esta api está servindo a uma aplicação de rede social que tem como objetivo a interação entre usuários e compartilhamento de links!',
};

const swaggerDocs = {
  openapi: '3.0.0',
  info,
  paths,
  components: { schemas },
};

export default swaggerDocs;
