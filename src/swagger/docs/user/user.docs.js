export const signUpDoc = {
  post: {
    summary: 'Registrar um novo usuário',
    tags: ['Users'],
    requestBody: {
      description: 'Dados do usuário a ser registrado',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SignUp',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Usuário registrado com sucesso',
      },
      401: {
        description: 'Usuário já existe',
      },
      422: {
        description: 'Body enviado é inválido',
      },
      500: {
        description: 'Erro interno do servidor',
      },
    },
  },
};

export const signInDoc = {
  post: {
    summary: 'Autenticar um usuário',
    tags: ['Users'],
    requestBody: {
      description: 'Dados do usuário que deseja fazer login',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SignIn',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Usuário autenticado com sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      401: {
        description: 'Senha incorreta',
      },
      404: {
        description: 'Usuário não encontrado',
      },
      422: {
        description: 'Body enviado é inválido',
      },
      500: {
        description: 'Erro interno do servidor',
      },
    },
  },
};

export const signOutDoc = {
  post: {
    summary: 'Encerrar a sessão do usuário e exluir seu token!',
    tags: ['Users'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      204: {
        description: 'Sessão encerrada com sucesso',
      },
      401: {
        description: 'Token inválido ou não informado',
      },
      500: {
        description: 'Erro interno do servidor',
      },
    },
  },
};

export const getUserDoc = {
  get: {
    summary: 'Fornecer dados de um usuário',
    tags: ['Users'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: 'path',
        name: 'ID',
        required: true,
        schema: {
          type: 'number',
        },
      },
    ],
    responses: {
      200: {
        description: 'Resposta com os dados do usuário requisitado!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                },
                name: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                photo: {
                  type: 'string',
                },
                followingUser: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
      401: {
        description: 'Token inválido ou não informado!',
      },
      500: {
        description: 'Erro interno do servidor',
      },
    },
  },
};
