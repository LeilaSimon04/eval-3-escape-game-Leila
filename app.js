let options={
    method: "GET"
}

fetch("./escape-game.json",options)
//Fetch a besoin de ce then pour aller chercher et attendre de tout avoir avant de donner une réponse
.then(response=>{
    console.log(response)
    return response.json()
})
.then(data=>{
    // ici j'ai accès à ma donnée
    //Comme ce qui se trouve dans json n'est pas un tableau mais un OBJET je le transforme en tableau en notant data.entreprise
    console.log(data.entreprise)
    remplirHero(data.entreprise)
    remplirContainerSalles(data.entreprise.activites)
    remplirContainerCriteres(data.entreprise.avantagesClients)
    remplirAvis(data.entreprise.temoignages)
})
// Pour remplir le HERO
function remplirHero(hero){
    let zone = document.querySelector(".hero")
    zone.innerHTML+= `
        <div class="accroche flex justifyBetween alignCenter">
            <div class="width10">
                <img src="./asset/Eye.png" alt="Oeil ouvert dessiné">
            </div>
            <h2>${hero.nomCommercial}</h2>
            <h1>${hero.phraseAccroche}</h1>
            <a href="#pageReservationduSite" class="bouton">${hero.texteAppelAction}</a>
        </div>
        `     
}
// Pour remplir la section des SALLES
function remplirContainerSalles(activite){
    let zone = document.getElementById("artSalles")
    activite.forEach(activite=>{
    zone.innerHTML+= `
    <article class="salle width25 backgroundCard">
        <img src="./asset/${activite.image}" alt="">
        <div>
            <h4>${activite.nom}</h4>
            <p>${activite.description}</p>
            <a href="#pageReservationduSitepourceLieu" class="bouton">Réservez cette salle</a>
        </div>
    </article>
        ` 
    })    
}
// Pour remplir la section des CRITERES
function remplirContainerCriteres(critere){ 
    let zone = document.querySelector(".containerCriteres")
    critere.forEach(critere=>{
    zone.innerHTML+= `
    <article class="critere width10">
    <div class="width40">
        <img src="./asset/${critere.picto}" alt="">
    </div>
    <p>${critere.texte}</p>
    </article>` 
})    
}
// Pour remplir la section des AVIS TEMOIGNAGES
function remplirAvis(avis){ 
    let zone = document.getElementById("divAvis")
    avis.forEach(avis=>{
    zone.innerHTML+= `
    <article class="avis width25 backgroundCard flex justifyBetween alignCenter">
        <div class="imgAvis">
            <img src="./asset/${avis.photo}" alt="">
        </div>
        <div class="identiteAvis">
            <h4>${avis.prenom}</h4>
            <span>${avis.typeExperience}</span>
            <p class="etoile">${noteAvis(avis.note)}</p>
        </div>
        <p>${avis.commentaire}</p>
    </article>
    ` 
})    
}
//Pour les étoiles des avis
//Fonction pour connaître la note de l'avis qui se trouve dans un objet Entreprise puis tableau Témoignages puis objet note
//Je nomme le paramètre de ma fonction NOTE
function noteAvis (note) {
    //Ma fonction va chercher les étoiles pleines pour l'instant c'est vide
    let chaineEtoiles="" 
    //Ma fonction boucle pour ajouter le nombre d'étoile pleine à ma variable au-dessus
    for (let i = 1; i <= note; i++) {
        chaineEtoiles+= "★"; 
    }
    //Ma fonction va chercher les étoiles vides qui correspond au maximum de la note 5 - la note donnée
    let nombreEtoilesVide = 5 -note
    //Ma fonction boucle pour connaître le nombre d'étoile vide
    for(let i=0; i<nombreEtoilesVide; i++ ){
        chaineEtoiles+= "☆"
    }
    //Ma fonction retourne la chaîne d'étoiles pour que je puisse m'en servir quand je vais l'appeler plus haut
    return chaineEtoiles
    //Attention : J'appelle ma fonction directement là où j'en ai besoin c'est à dire dans le paragraphe de l'avis.
}