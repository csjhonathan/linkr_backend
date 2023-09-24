export const createCommentDoc = {
  post: {
    summary: 'Cria um novo comentário no post requisitado',
    tags: ['Comments'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: 'query',
        name: 'postId',
        schema: {
          type: 'number',
        },
        required: false,
        description: 'Parâmetro referente ao post que deseja comentar',
      },
    ],
    requestBody: {
      description: 'Dados do comentário que será criado',
      content: {
        'application/json': {
          example: {
            description: 'Lorem ipsum lor ipsum lore ip',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Comentário criado com sucesso',
      },
      401: {
        description: 'Token é inválido ou não fornecido',
      },
      422: {
        description: 'Body enviado para a criação é inválido',
      },
      500: {
        description: 'Erro interno no servidor',
      },
    },
  },
};

export const getCommentsDoc = {
  get: {
    summary: 'Lista todos os comentários do post requisitado',
    tags: ['Comments'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: 'query',
        name: 'postId',
        schema: {
          type: 'number',
        },
        required: false,
        description: 'Parâmetro referente ao post que deseja comentar',
      },
    ],
    responses: {
      200: {
        description: 'Lista de comentários referente ao post requisitado ou um array vazio',
        content: {
          'application/json': {
            example: [
              {
                id: 23,
                description: 'Lorem ipsum lor ipsum lore ip',
                photo: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lulu_0.jpg',
                name: 'Phill',
                followingUser: false,
              },
              {
                id: 44,
                description: 'Lorem ipsum lor ipsum lore ip',
                photo: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lulu_0.jpg',
                name: 'John Doe',
                followingUser: true,
              },
              {
                id: 21,
                description: 'Lorem ipsum lor ipsum lore ip',
                photo: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lulu_0.jpg',
                name: 'Carl',
                followingUser: false,
              },
            ],
          },
        },
      },
      401: {
        description: 'Token é inválido ou não fornecido',
      },
      500: {
        description: 'Erro interno no servidor',
      },
    },
  },
};
