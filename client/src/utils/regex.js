export const usernameRegex = {
    regex: /^[a-zA-Z0-9-_]{4,11}$/,
    message: `L'username doit être compris entre 4 et 10 caractéres sans espace.(ex: _exAmple9).`
};
export const emailRegex = {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: `L'email doit être comforme.(ex :example@gmail.com).`
};
export const passwordRegex = {
    regex: /^(?=.*\d).{6,}$/,
    message: `Le mot de passe doit avoir minimun 6 caratéres et doit contenir au moins un chiffre.(ex: voiture3).`
};
export const categoryRegex = {
    regex: /^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ]{4,21}$/,
    message: 'Le nom doit contenir entre 4 et 20 caratéres sans espace ni caractéres speciaux sauf espace.'
};
export const nameRegex = {
    regex: /^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ]{2,51}$/,
    message: 'Le nom ou prénom doit contenir entre 2 et 50 caratéres sans espace ni caractéres speciaux sauf espace.'
};
//export const ipregex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
