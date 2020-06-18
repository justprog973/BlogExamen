const router = require('express').Router();



const article = {
    results: [
        {
            id: 1,
            title: 'Some One',
            content: `Un jour de pleine lune un petit batard eu l'idée de ce rapprocher de certainer personne et ce vu fracasser par tout ces cauchemard`,
            created_at: new Date()
        },
        {
            id: 2,
            title: 'Some Two',
            content: `Un jour de pleine lune un petit batard eu l'idée de ce rapprocher de certainer personne et ce vu fracasser par tout ces cauchemard`,
            created_at: new Date()
        },
        {
            id: 3,
            title: 'Some Therre',
            content: `Un jour de pleine lune un petit batard eu l'idée de ce rapprocher de certainer personne et ce vu fracasser par tout ces cauchemard`,
            created_at: new Date()
        }
    ]
}


router.get('/',(req,res)=>{
    res.status(200).json(article);
});

module.exports = router;