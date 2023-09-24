export const getTrendingListDoc = {
  get: {
    summary: 'Lista as tags mais usadas pelos usuários',
    tags: ['Trending'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: 'Lista de tags',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                properties: {
                  tag: {
                    type: 'string',
                  },
                  amount: {
                    type: 'number',
                  },
                },
              },
            },
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

export const getTrendingDoc = {
  get: {
    summary: 'Lista todos os posts da hastag especificada',
    tags: ['Trending'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: 'path',
        name: 'hashtag',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'Hashtag para listar os posts compatíveis com a busca',
      },
    ],
    responses: {
      200: {
        description: 'Lista com os posts que correspondem a busca pela hashtag ou um array vazio',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Post',
              },
            },
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
