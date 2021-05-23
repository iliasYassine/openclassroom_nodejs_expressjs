/// cest ici ou on place lapplication express
/// lapplication express est generer ici dans cette page 

/// les middlware = series focntion chacune recoit les objet repsoonse et request et methode next

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/// faire attention le models reviens au models du dossier models et things cest le fichier things.js dc bien ecrire sinn connexion marche pas
const Thing = require('./models/things');



mongoose.connect('mongodb+srv://test:root@cluster0.rxoak.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  
  const app = express();

  /// premiere middlware necessaire a lexecution du second
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
  /// retirer le champs avec de copier lobjet
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });


  /// enregsitre l'objet ds la base 
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});



  //// tableau avec deux image et prixtt sa mis dans le tableau stuff
  app.use('/api/stuff', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });

module.exports = app;