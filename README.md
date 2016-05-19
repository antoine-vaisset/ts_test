# Test usine logicielle pour Typescript


## Liste des steps :
    * Install nodeJs/npm
    * Initialiser le projet npm
    * Install & configure bower
    * Install typescript
    * Install gulp
    * Configure gulp tasks



## Install nodeJs/npm

Télécharger & installer NodeJs : (https://nodejs.org/en/).


## Initialiser le projet npm

NPM est utilisé pour gérer les dépendances aux outils de dev :
    - bower ==> dépendences libs JS
    - typescript/tsd/typings/tslint ==> compilation du code typescript
    - gulp/wiredep/del/brower-sync ==> task runner pour automatiser le build html/css/js


1. Initialiser le projet NPM avec la commande suivante (créé et pré-remplit le fichier package.json)
```
npm init
```

2. Renseigner les dépendances utiles dans le fichier ```package.json``` :

- Soit en modifiant le fichier à la main
```
  "devDependencies": {
    "bower": "^1.7.9",
    "browser-sync": "^2.12.5",
    "del": "^2.2.0",
    "gulp": "^3.9.1",
    "gulp-debug": "^2.1.2",
    "gulp-inject": "^4.0.0",
    "gulp-sass": "^2.3.1",
    "gulp-sourcemaps": "^1.6.0",
    "gulp-tslint": "^5.0.0",
    "gulp-typescript": "^2.13.0",
    "superstatic": "^4.0.2",
    "tslint": "^3.8.1",
    "typescript": "^1.8.10",
    "typings": "^0.8.1",
    "wiredep": "^4.0.0"
  }
```
puis en lancant un npm install global
```
npm install -g
```

- Soit en utilisant les commandes "npm install package -g --save-dev" (-g pour global et --save-dev pour ajouter la dépendence de dev au fichier package.json)
```
npm install bower -g --save-dev
npm install gulp -g --save-dev
...
```
Il faut installer les dépendences en global pour pouvoir ensuite utiliser bower, gulp, ... en ligne de commande


## Initialiser le projet bower

1. Initialiser le projet bower avec la commande suivante (créé et pré-remplit le fichier bower.json)
```
bower init
```

2. Renseigner les dépendances utiles dans le fichier ```bower.json``` :

- Soit en modifiant le fichier à la main
```
  "dependencies": {
    "angular": "^1.5.5",
    "lodash": "^4.12.0",
    "angular-route": "^1.5.5",
    "bootstrap": "^3.3.6"
  }
```
puis en lancant un npm install
```
bower install
```

- Soit en utilisant les commandes "bower install package --save" (--save pour ajouter la dépendence au fichier bower.json)
```
bower install angular --save
bower install lodash --save
...
```

## Initialiser le projet tsd (TypeScript Definition manager for DefinitelyTyped)

Lorsqu'on utilise typescript combiné à des libs JS externes, le compilateur typescript ne connait pas les objets/méthodes exposées par ces libs.
Il existe des fichiers (appelés typings définissants l'interface de ces libs maintenus par la communauté Typescript.
L'outil TSD permet de facilité la maintenance des dépendances vers ces fichiers.

1. Initialiser le projet TSD (créé et pré-remplit le fichier tsd.json)
```
tsd init
```

2. Ajouter les dépendences vers les fichiers de typings des libs externes

Ici je n'ai pas trouvé pour le moment de moyen de lister les dépendences avant de les résoudres, je les ai donc installer manuellement une par une
```
tsd install angular --save
tsd install lodash --save
...
```
