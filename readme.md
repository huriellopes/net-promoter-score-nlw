# 🤑 Net Promoter Score

> Aplicação proposta na semana 4° Semana Next Level Week realizada pela Rocketseat, ministrada pela Daniele Evangelista.

## Testando a aplicação:

> Você pode realizar o clone deste repositório ou baixar o arquivo .zip

### Clone este repositório:

````
git clone https://github.com/huriellopes/net-promoter-score-nlw.git
````
Para baixar o zip: https://github.com/huriellopes/net-promoter-score-nlw/archive/master.zip

## ⚡ Executando o projeto

> Caso deseje usar o docker, na raiz do projeto tem um arquivo docker-compose, faça a copia do arquivo:

````
cp docker-compose.example.yml docker-compose.yml
````

> Depois de copiado, configure com as credenciais:

````
environment:
      POSTGRES_USER: "postgres" # padrão
      POSTGRES_PASSWORD: "YOUR_PASSWORD"
      POSTGRES_DB: "DATABASE_NAME"
````

### Configure o .env, para isso execute o comando:

````
copy .env.example .env ou cp .env.example .env
````
> Em seguida configure o .env!

````
DB_CONNECTION="postgres"
DB_HOST="apidb" # ou localhost
DB_PORT=5432
DB_USER=
DB_PASS=
DB_NAME=
````

### Depois de configurado, rode o seguinte comando, para subir o ambiente docker:

````
# Cria e starta os containers docker
docker-compose up -d

# Em seguida acesse o container api:
docker exec -it api bash

# Dentro do container "api", rode o seguinte comando:
yarn typeorm migration:run

# Caso precise desfazer as migrações, execute o seguinte comando dentro do container:
yarn typeorm migration:revert
````

### Obs.: O docker já vai instalar as dependências.

-----------------------------------

## Caso deseje testar a api localmente, siga os passos a seguir:

### Na raiz do projeto, execute o comando:

````
yarn install ou npm install
````

### Para usar banco de dados, temos duas opções, docker ou local:

Caso for utilizar docker, rode os sequintes comandos:

````
# Container do PostgreSQL, altere **POSTGRES_PASSWORD=senha** para a senha desejada
docker run --name apidb -e POSTGRES_PASSWORD=senha -p 5432:5432 -d postgres
````

> Depois do container criado e startado, abra o postgreSQL em um Sgbd e crie um banco com o nome que configurou no .env.

Em seguida rode o seguinte comando para as migrations:

````
yarn typeorm migration:run ou npm typeorm migration:run
````

Caso precise desfazer as migrações, execute o seguinte comando:

````
yarn typeorm migration:revert ou npm typeorm migration:revert
````


## 🚀 Rodando o servidor

### Para rodar o servidor, execute o comando:

````
yarn dev
````

> Para ter certeza que o projeto está rodando, importe o arquivo json "requests-api" do insomnia, para ter todas requisições do projeto. E teste a rota "Test Api".

## 🔖 License

Este repositório está sob a linceça MIT. Veja aqui [Licença](LICENCE)
