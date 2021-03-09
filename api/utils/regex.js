const usernameRegex = {regex : /^[a-zA-Z0-9-_]{4,11}$/, message : `L'username doit être compris entre 4 et 10 caractéres sans espace.(ex: _exAmple9)`};
const emailRegex    = {regex : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: `Le champ email doit être comforme.(ex :example@gmail.com)`};
const passwordRegex = {regex: /^(?=.*\d).{6,}$/, message: `Le champ mot de passe doit avoir minimun 6 caratéres et doit contenir au moins un chiffre.(ex: voiture3)`};
//const ipregex       = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const titlePostRegex     = {regex: /^[a-zA-Z '.!?-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ]{4,31}$/, message: 'Le titre doit contenir aucun chiffre.'};
const categoryRegex = {regex : /^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ]{4,21}$/, message: 'Le nom de la catégorie doit contenir entre 4 et 20 caratéres sans espace ni caractéres speciaux.'};


module.exports = {usernameRegex: usernameRegex, emailRegex: emailRegex, passwordRegex: passwordRegex, titlePost: titlePostRegex, categoryRegex};