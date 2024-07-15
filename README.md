Para este projeto foi utilizado Node.js e dependencias express,mongoose,bcrypt e jsonwebtoken.
O projeto foi estruturado em controllers e routes de usuario, autenticação(Login) e report.
Foi usado também o software de banco de dados mongoDB, especificações em config no projeto.
Para a criação do report de csv foi criado um middleware para autenticação do nivel do usuario.

Representação de um swagger:
Rota de Autenticação
[POST] /login
Entrada: email , password
Saída: JWT token
Ex: POST.http://localhost:5000/api/auth/login
{
  "email": "matheusnorth2@hotmail.com",
  "password": "norteador2"
}
Response: <jwt-token>


2. Rotas CRUD de Usuários
[POST] /users
Criação de um novo usuário.
EX: POST.http://localhost:5000/api/users
{
  "name": "Marcos",
  "email": "marcos2002@hotmail.com",
  "password": "m2002",
  "level": 4
}
Response:Usuário criado
[GET] /users
Listagem de todos os usuários.
EX: GET.http://localhost:5000/api/users
Response:
{
    "_id": "6694e1a02eb40226e6808f5a",
    "name": "Marcos",
    "email": "marcos2002@hotmail.com",
    "password": "$2b$10$UZkZsr3A0Hgo6k8CjKDss.TEe88Zpq8lecZ7u6A7QepE7oFmMQ18G",
    "level": 4,
    "__v": 0
  }
[GET] /users/:id
Detalhes de um usuário específico.
EX: GET.http://localhost:5000/api/users/6694e1a02eb40226e6808f5a
Response:
{
  "_id": "6694e1a02eb40226e6808f5a",
  "name": "Marcos1",
  "email": "marcos2001@hotmail.com",
  "password": "$2b$10$wQe.qHiHCfzZsDezNSOXf.wUkTQ3MelWCgUGfXQsq.iZ.RLSs35ee",
  "level": 4,
  "__v": 0
}
[PUT] /users/:id
Atualização de um usuário específico.
EX: PUT.http://localhost:5000/api/users/6694e1a02eb40226e6808f5a
{
  "name": "Marcos1",
  "email": "marcos2001@hotmail.com",
  "password": "m2001",
  "level": 4
}
Response:
{
  "_id": "6694e1a02eb40226e6808f5a",
  "name": "Marcos1",
  "email": "marcos2001@hotmail.com",
  "password": "$2b$10$wQe.qHiHCfzZsDezNSOXf.wUkTQ3MelWCgUGfXQsq.iZ.RLSs35ee",
  "level": 4,
  "__v": 0
}
[DELETE] /users/:id
Exclusão de um usuário específico.
EX: DELETE.http://localhost:5000/api/users/6694e1a02eb40226e6808f5a
Response:Usuário deletado
3. **Rota Privada para Geração de Relatórios


[GET] /users/report
Geração de relatório em PDF ou CSV.
Somente acessível para usuários com nível >= 4.
Somente acessível se estiver logado
EX: http://localhost:5000/api/reports/generate?format=csv
Headers:
x-auth-token <jwt-token>
Response:
Nome,Email,Nível
Manuel Gomes,manuelgomes29@gmail.com,
Matheus Norte,matheusnorth2@hotmail.com,
