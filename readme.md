<h1>Linkr Backend</h1>


<h3>Visão Geral</h3>
<hr></hr>

O Linkr é uma plataforma que permite aos usuários compartilhar e descobrir links interessantes. Com o Linkr, os usuários podem navegar pelos links compartilhados por outros usuários, adicionar seus próprios links e interagir com a comunidade

Este projeto foi construído em colaboração com:

- [Diego Becker](https://github.com/DiegoBeker)
- [Felipe Iasbik](https://github.com/felipeiasbik)
- [Filipe Tenedini](https://github.com/FilipeTenedini)

<h3>Tecnologias Utilizadas</h3>
<hr></hr>

- ***Joi***: Biblioteca JavaScript para validação de dados em aplicativos Node.js.
- ***Bcrypt***: Biblioteca de criptografia usada para proteger senhas em armazenamento.
- ***CORS (Cross-Origin Resource Sharing)***: Mecanismo de segurança para controlar solicitações entre origens diferentes em aplicativos web.
- ***Express***: Framework Node.js para criar servidores web e definir rotas em aplicativos web e APIs.
- ***PostgreSQL***: Sistema de gerenciamento de banco de dados relacional de código aberto.
- ***JWT (JSON Web Tokens)***: Formato de token de autenticação usado para autenticar e autorizar usuários em aplicativos web e APIs.

<h3>Configuração</h3>
<hr></hr>

***Primeiros passos*** :
- Para rodar este projeto localmente será necessário ter o PostgreSQL, pode ser deploy ou local. Disponibilizamos um arquivo `dump.sql` para que você possa restaurar o banco e já tenha acesso a modelagem e alguns exemplos de dados. Caso tenha dúvidas sobre como recuperar um banco através de um dump [clique aqui](https://www.postgresql.org/docs/current/backup-dump.html#BACKUP-DUMP-RESTORE) para ler a documentação oficial do PostgreSQL sobre isso.

***Clonando o Repositório*** :
- Para começar, você deve clonar este repositório para o seu ambiente local. Use o seguinte comando no seu terminal:

`git clone https://github.com/csjhonathan/linkr_backend`

***Instalando Dependências***:
- Navegue até o diretório do projeto e instale as dependências necessárias usando npm:

`cd linkr-backend` e depois `npm install` ou `npm i`

***Configurando Variáveis de Ambiente***:

- Crie um arquivo `.env` como mostra o arquivo `.env.example`
- Este projeto foi desenvolvido como um projeto fullstack, portanto existe uma interface própria para ele, o link para o repositório frontend da aplicação é este: [Linkr Frontend](https://github.com/csjhonathan/linkr_frotend)

<h3>Execução</h3>
<hr></hr>

No seu terminal digite o comando `npm start` ou `npm run dev` (caso deseje contar com o hot reload) e o projeto estará disponível no link http://localhost:5000 (ou na porta que você possa ter especificado). Feito isso a aplicação estará pronta para receber requisições.

<h3>Documentação</h3>
<hr></hr>

Caso tenha dúvidas sobre como fazer suas requisições, aqui está o link da documentação completa da api.

[Documentação Linkr Backend](https://linkr-api-wdhm.onrender.com/api-docs/)