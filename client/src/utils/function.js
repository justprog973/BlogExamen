import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

/**
 * first capitalize
 * @param string
 * @returns {string}
 */
export function capitalizeFirstLetter(string) {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : string;
}

/**
 * format date
 * @param date
 * @param type
 * @returns {string}
 */
export function momentFr(date, type= 'date') {
    //h:mm:ss
    if(type === 'date'){
        return moment(date).format(' Do MMMM  YYYY');
    }else{
        return moment(date).startOf('second').fromNow();
    }
}

/**
 * excerpt content post
 * @param content
 * @param wordlimit
 * @returns {string|*}
 */
export function getExcerpt(content, wordlimit=20) {
    const filter = content.replace(/\s+/g, ' '); // You can add more filters here
    const wordsarr = filter.split(' ');
    if (wordsarr.length < wordlimit) {
        return content;
    } else {
        let result = "";

        for (let i = 0; i < wordlimit; i++) {
            result = result + " " + wordsarr[i] + " ";
        }

        return result+'...';
    }
}

/**
 * get View all post
 * @param idPost
 * @param views
 * @returns {number}
 */
export function getViews(idPost, views){
    let i = 0;
    views && views.map( v => v.post === idPost && ++i);
    return i;
}

export function citations() {
        return [
            {citation  :"Le livre t'inspire, la télévision t'aspire.",
                auteur   :'Paul Carvel'},
            {citation :"Pour l'écrivain, la littérature est cette parole qui dit jusqu'à la mort : je ne commencerai pas à vivre avant de savoir quel est le sens de la vie.",
                auteur   :'Roland Barthes'},
            {citation :"Les mots qui font fortune appauvrissent la langue.",
                auteur   :'Sacha Guitry'},
            {citation :"Les sanglots longs des violons de l'automne blessent mon coeur d'une langueur monotone. Tout suffocant et bleme, quand sonne l'heure, je me souviens des jours anciens et je pleure.",
                auteur   : 'Paul Verlaine'},
            {citation :"On écrit parce que personne n'écoute.",
                auteur   :'Georges Rochefort'},
            {citation :"Académicien ? Non. Le costume coute trop cher. J'attendrai qu'il en meure un de ma taille.",
                auteur   :'Tristan Bernard'},
            {citation :"La premiére qualité du style, c'est la clarté.",
                auteur   :'Aristote'},
            {citation :"Vous faites accorder vos pianos ? Faites donc accorder vos participes.",
                auteur: 'Francis Blanche'},
            {citation : "Je ne trempe pas ma plume dans un encrier mais dans la vie.",
                auteur   :'Blaise Cendrars'},
            {citation :"L'orthographe est de respect ; c'est une sorte de politesse.",
                auteur   :'Alain'},
            {citation :"Les gouvernements suspectent la littérature parce qu'elle est une force qui leur échappe.",
                auteur   :'Emile Zola'},
            {citation :"C'est à l'audace de leurs fautes de grammaire que l'on reconnait les grands écrivains.",
                auteur   :'Henry de Montherlant'},
            {citation :"La plume est la langue de l'ame.",
                auteur   :'Miguel de Cervantés'},
            {citation :"Quand un philosophe me répond, je ne comprends plus ma question.",
                auteur   :'Pierre Desproges'},
            {citation :"Le mot ne manque jamais quand on posséde l'idée.",
                auteur   :'Gustave Flaubert'},
            {citation :"En littérature, le plus sur moyen d'avoir raison, c'est d'etre mort.",
                auteur   :'Victor Hugo'},
            {citation :"J'aime recevoir des lettres anonymes parce que je n'ai pas à répondre.",
                auteur   :'Jean Dutourd'},
            {citation :"Beauté de la littérature. Je perds une vache. J'écris sa mort et ça me rapporte de quoi acheter une autre vache.",
                auteur   :'Jules Renard'},
            {citation :"Je connais un critique qui est en meme temps auteur... ce qui le met en tant qu'auteur dans une situation critique !",
                auteur   :'Raymond Devos'},
            {citation : "Qui veut se connaitre, qu'il ouvre un livre.",
                auteur   :'Jean Paulhan'}
        ];
}