const usernameregex = {regex : /^[a-zA-Z0-9-_]{4,10}$/, message : `L'username doit être comprise entre 4 et 10 caractéres sans espace.(ex: _exAmple9)`};
const emailregex     = {regex : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: `Le champ email doit être comforme.(ex :example@gmail.com)`};
const passwordregex = {regex: /^(?=.*\d).{6,}$/, message: `Le champ mot de passe doit avoir minimun 6 caratéres et doit contenir au moins un chiffre.(ex: voiture3)`};
const ipregex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

module.exports = {usernameregex,emailregex,passwordregex,ipregex};