/* eslint-disable import/prefer-default-export */

export const getUserBySearchDoc = {
  get: {
    summary: 'Busca usuários pelo nome',
    tags: ['Search'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: 'query',
        name: 'name',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'Parâmetro para listar usuáros que atendam a pesquisa pelo nome',
        example: 'Fili',
      },
    ],
    responses: {
      200: {
        description: 'Array com todos os usuários que correspondem a busca',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                example: [
                  {
                    id: 2,
                    name: 'Filius',
                    photo: 'https://example.com/janesmith.jpg',
                    followingUser: false,
                  },
                  {
                    id: 3,
                    name: 'Filim',
                    photo: 'https://example.com/bobjohnson.jpg',
                    followingUser: true,

                  },
                  {
                    id: 22,
                    name: 'Filipe',
                    photo: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lulu_0.jpg',
                    followingUser: false,
                  },
                ],
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
