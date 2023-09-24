// eslint-disable-next-line import/prefer-default-export
export const repostDoc = {
  post: {
    summary: 'Reposta o post requisitado',
    tags: ['Repost'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      description: 'Id do post que deseja repostar',
      content: {
        'application/json': {
          example: {
            postId: 2,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Repost criado com sucesso',
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
