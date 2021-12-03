## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

## DOCKER-COMPOSE

Commandes à lancer dans le repository front au niveau du docker compose :

- pour build l'image en environement de dev : docker-compose -f docker-compose.dev.yml up --build
- pour lancer l'image en environement de dev: docker-compose -f docker-compose.dev.yml up

- listing des problèmes (logs): docker logs -f (container id)
- pour stoper le container: docker compose stop
- pour détruire les containers et les images (cache): docker system prune -a
- pour vérifier les images: docker image ls
- pour vérifier les containers qui tournent: docker ps
- pour supprimer une image: (vérifier que l'image ne tourne pas) docker image rm (id de l'image)
- pour stoper un container avec l'id: docker stop (id du container)

- pour vérifier la connection en se connectant au container mongodb :
  docker exec -it mongodb bash
  mongo
  use (le nom de la bdd)
  show collections
  db.(le nom de la collection).find().pretty()
  exit
  exit

# TO EXECUTE FIXTURES 
  If you want to execute without docker :
  . for user :
  node -e 'require("./src/fixtures/userData.js").createUser()'
  . for module :
  node -e 'require("./src/fixtures/moduleData.js").createModule()'

  With docker, go to the root of the back repository and execute this command :
  . for user :
  docker exec -it agowork_back node -e 'require("./src/fixtures/userData.js").createUser()'

  . for module: 
  docker exec -it agowork_back node -e 'require("./src/fixtures/moduleData.js").createModule()'

  . for production:
  docker exec -it 2104-wns-paris-agowork-front_server_1 node -e 'require("./src/fixtures/userData.js").createUser()'

### docker ps : list all running docker containers
### docker kill containerID
### To add graphql faker to the client Dockerfile : COPY schema.faker.graphql

# TO SETUP ENVIRONMENT 
Create .env.local and .env on the front end root repository with the following information :
  - GATEWAY_PORT : le port pour le server nginx pour l'environement de prod
  - FILE_BACK : name of the file where is the back end 
  - FILE_FRONT : name of the file where is the front end 
  -> Don't forget to check in the Dockercompose files that variables are set 
  
  - DB_DATABASE : name of the database if secret
  - DB_PASS : password of the database 

Create .env.local and .env on the back end root repository with the following information : 
  - DB_DATABASE : name of the database if secret
  - DB_PASS : password of the database 
  - DB_LINK : nom de l'image docker ou localhost si lancement du projet sans docker et en environement de developpement 
  - SECRET_JWT : Secret for connection (JWT) 
  -> Don't forget to check in the src/config/environment.dev.ts that variables are set 
