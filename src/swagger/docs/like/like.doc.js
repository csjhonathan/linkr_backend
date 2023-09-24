export const createLikeDoc = {
  post: {
    summary: 'Curte o post especificado pelo id',
    tags: ['Likes'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: 'path',
        name: 'postId',
        schema: {
          type: 'number',
        },
        required: true,
        description: 'Id do post que deseja curtir',
      },
    ],
    responses: {
      201: {
        description: 'Curtida adicionada com sucesso',
      },
      401: {
        description: 'Token é inválido ou não fornecido',
      },
      409: {
        description: 'O usuário já curtiu o post requisitado',
      },
      500: {
        description: 'Erro interno no servidor',
      },
    },
  },
};

export const deleteLikeDoc = {
  delete: {
    summary: 'Remove a curtida do post especificado pelo id',
    tags: ['Likes'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: 'path',
        name: 'postId',
        schema: {
          type: 'number',
        },
        required: true,
        description: 'Id do post que deseja remover a curtida',
      },
    ],
    responses: {
      204: {
        description: 'Curtida removida com sucesso',
      },
      401: {
        description: 'Token é inválido ou não fornecido',
      },
      404: {
        description: 'O usuário não curtiu o post requisitado',
      },
      500: {
        description: 'Erro interno no servidor',
      },
    },
  },
};
