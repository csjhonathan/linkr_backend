export const createPostDoc = {
  post: {
    summary: 'Cria um novo post',
    tags: ['Posts'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      description: 'Dados do post que será criado',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreatePost',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Post criado com sucesso',
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

export const userTimelineDoc = {
  get: {
    summary: 'Lista os posts de um usuário específico',
    tags: ['Posts'],
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
        description: 'Id do usuário que deseja ver os posts!',
      },
      {
        in: 'query',
        name: 'offset',
        schema: {
          type: 'number',
        },
        required: false,
        description: 'Parâmetro para paginação dos posts (opcional)',
      },
    ],
    responses: {
      200: {
        description: 'Lista com os posts do usuário especificado ou um array vazio',
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
      400: {
        description: 'Caso a query string offset seja enviada e seja inválida',
      },
      401: {
        description: 'Token é inválido ou não fornecido',
      },
      404: {
        description: 'Usuário requisitado não encontrado',
      },
      500: {
        description: 'Erro interno no servidor',
      },
    },
  },
};

export const timelineDoc = {
  get: {
    summary: 'Lista os posts que o usuário logado pode ver',
    tags: ['Posts'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: 'query',
        name: 'offset',
        schema: {
          type: 'number',
        },
        required: false,
        description: 'Parâmetro para paginação dos posts (opcional)',
      },
    ],
    responses: {
      200: {
        description: 'Lista com os posts que o usuário logado pode ver ou um array vazio',
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
      400: {
        description: 'Caso a query string offset seja enviada e seja inválida',
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

export const deletePostDoc = {
  delete: {
    summary: 'Deletar o post e todos os reposts associados especificado pelo id',
    tags: ['Posts'],
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
        description: 'Id do post que deseja deletar!',
      },
    ],
    responses: {
      204: {
        description: 'Post deletado com sucesso',
      },
      400: {
        description: 'Caso a query string offset seja enviada e seja inválida',
      },
      401: {
        description: 'Token é inválido ou não fornecido',
      },
      404: {
        description: 'Post requisitado não existe',
      },
      500: {
        description: 'Erro interno no servidor',
      },
    },
  },
};

export const updatePostDoc = {
  patch: {
    summary: 'Atualizar o post especificado pelo id',
    tags: ['Posts'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      description: 'Novos dados para a atualização do post',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UpdatePost',
          },
        },
      },
    },
    parameters: [
      {
        in: 'path',
        name: 'postId',
        schema: {
          type: 'number',
        },
        required: true,
        description: 'Id do post que deseja editar!',
      },
    ],
    responses: {
      200: {
        description: 'Post atualizado com sucesso',
      },
      400: {
        description: 'Caso a query string offset seja enviada e seja inválida',
      },
      401: {
        description: 'Você tentou atualizar um post que não te pertence ou token é inválido/não fornecido',
      },
      404: {
        description: 'Post requisitado não existe',
      },
      500: {
        description: 'Erro interno no servidor',
      },
    },
  },
};
