export const createFollowDoc = {
  post: {
    summary: 'Segue o usuário requisitado',
    tags: ['Follows'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: 'path',
        name: 'ID',
        schema: {
          type: 'number',
        },
        required: true,
        description: 'Id do usuário que deseja seguir',
      },
    ],
    responses: {
      200: {
        description: 'Seguindo o usuário requisitado com sucesso',
        content: {
          'application/json': {
            example: {
              message: 'Following!',
            },
          },
        },
      },
      401: {
        description: 'Token é inválido ou não fornecido',
      },
      409: {
        description: 'Você já segue o usuário requisitado ou tentou seguir a si próprio',
        content: {
          'application/json': {
            example: {
              message: 'You already follow this user!',
            },
          },
        },
      },
      500: {
        description: 'Erro interno no servidor',
      },
    },
  },
};

export const deleteFollowDoc = {
  delete: {
    summary: 'Deixa de seguir o usuário requisitado',
    tags: ['Follows'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: 'path',
        name: 'ID',
        schema: {
          type: 'number',
        },
        required: true,
        description: 'Id do usuário que deseja deixar de seguir',
      },
    ],
    responses: {
      204: {
        description: 'Deixou de seguir o usuário requisitado com sucesso.',
      },
      401: {
        description: 'Token é inválido ou não fornecido',
      },
      409: {
        description: 'Você não segue o usuário requisitado ou tentou deixar de seguir a si próprio',
        content: {
          'application/json': {
            example: {
              message: 'You cannot perform this action on yourself!',
            },
          },
        },
      },
      500: {
        description: 'Erro interno no servidor',
      },
    },
  },
};

export const getFollowingsDoc = {
  get: {
    summary: 'Fornece a quantidade de pessoas que o usuário logado segue',
    tags: ['Follows'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: 'Numero de pessoas que o usuário logado segue.',
        content: {
          'application/json': {
            example: {
              followingsCount: 23,
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
