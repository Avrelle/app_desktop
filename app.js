//clé API
const riotApiKey = ('');

//variables html
let idSum = document.getElementById("idSum");
let usernameVal = document.getElementById("username");
let name = document.getElementById("name");
let lvl = document.getElementById("lvl");
let sumIcon = document.getElementById("sumIcon");
let idChamp = document.getElementById("idChamp");
let imgChamp1 = document.getElementById("imgChamp1");
let imgChamp2 = document.getElementById("imgChamp2");
let imgChamp3 = document.getElementById("imgChamp3");
let MasteryPoint1 = document.getElementById("MasteryPoint1");
let MasteryPoint2 = document.getElementById("MasteryPoint2");
let MasteryPoint3 = document.getElementById("MasteryPoint3");
let rankSolo = document.getElementById("rankSolo");
let rankFlex = document.getElementById("rankFlex");
const titleRankSolo = document.getElementById("titleRankSolo");
const titleRankFlex = document.getElementById("titleRankFlex");
let linkDesc = document.getElementById("linkDesc");
let button = document.getElementById("button");


//fonction qui affiche les éléments du profil
const profil = async () =>{

// datas principale du profil    
let linkSumValue = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${usernameVal.value}?api_key=${riotApiKey}`;
let resultSumValue = await fetch(linkSumValue);
let dataSumValue = await resultSumValue.json()

// affichage du nom du profil + le niveau 
nameUser.textContent = dataSumValue.name + " (" + "lvl : " + dataSumValue.summonerLevel + ")";
//lvl.textContent = dataSumValue.summonerLevel;

// affichage l'icone du profil
let profileIcon = `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${dataSumValue.profileIconId}.png`
sumIcon.src = profileIcon; 

// datas sur les ranks du profil
let linkRank = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${dataSumValue.id}?api_key=${riotApiKey}`;
let resultRank = await fetch(linkRank);
let dataRank = await resultRank.json();

// tableau d'affiche des emblemes de rank
const Rank = [
  
    {
        levelName : 
            'FER'
        ,
        levelPicture : 
            './ranked-emblem/emblem-iron.png'
        
    },
    {
        levelName : 
            'BRONZE'
        ,
        levelPicture : 
            './ranked-emblem/emblem-bronze.png'
        
    },
    {
        levelName : 
            'SILVER'
        ,
        levelPicture : 
            './ranked-emblem/emblem-silver.png'
        
    },
    {
        levelName : 
            'GOLD'
        ,
        levelPicture : 
            './ranked-emblem/emblem-silver.png'
        
    },
    {
        levelName : 
            'PLATINUM'
        ,
        levelPicture : 
            './ranked-emblem/emblem-platinum.png'
        
    },
    {
        levelName : 
            'DIAMOND'
        ,
        levelPicture : 
            './ranked-emblem/emblem-diamond.png'
        
    },
    {
        levelName : 
            'MASTER'
        ,
        levelPicture : 
            './ranked-emblem/emblem-master.png'
        
    },
    {
        levelName : 
            'GRANDMASTER'
        ,
        levelPicture : 
            './ranked-emblem/emblem-grandmaster.png'
        
    },
    {
        levelName : 
            'CHALLENGER',
        levelPicture : 
            './ranked-emblem/emblem-challenger.png',
        
    },
    

]


// boucle d'affichages des ranks solo
 for (let i = 0; i<8; i++){

  if(dataRank[0].queueType === "RANKED_SOLO_5x5"){
    if (Rank[i].levelName === dataRank[0].tier) {
            titleRankSolo.innerHTML = "Solo/Duo"
            rankSolo.src = Rank[i].levelPicture
            
            
    }/*else {
        console.log("toto1");
      titleRankSolo.innerHTML = "Solo/Duo"
      rankSolo.src = "/ranked-emblem/emblem-unranked.png"
      break
  }*/
} else if (dataRank[1].queueType === "RANKED_SOLO_5x5"){
    if(Rank[i].levelName === dataRank[1].tier) {
        titleRankSolo.innerHTML = "Solo/Duo"
        rankSolo.src =  Rank[i].levelPicture
        
     } /*else{
        console.log("toto2");
        titleRankSolo.innerHTML = "Solo/Duo"
        rankSolo.src += "/ranked-emblem/emblem-unranked.png"
        break
    }*/
}

}


// boucle d'affichages des ranks flexs
for (let i = 0; i<8; i++){
if(dataRank[0].queueType === "RANKED_FLEX_SR")  {
    if (Rank[i].levelName === dataRank[0].tier) {
            titleRankFlex.innerHTML = "Flexible"
            rankFlex.src = Rank[i].levelPicture
        
    } /*else {
        console.log("toto4");
      titleRankFlex.innerHTML = "Flexible"
      rankFlex.src += "/ranked-emblem/emblem-unranked.png"
      break
  }*/
} else if (dataRank[1].queueType === "RANKED_FLEX_SR"){
    if(Rank[i].levelName === dataRank[1].tier) {
        titleRankFlex.innerHTML = "Flexible"
        rankFlex.src =Rank[i].levelPicture
        
     } /*else {
        console.log("toto5");
        titleRankFlex.innerHTML = "Flexible"
        rankFlex.src += "/ranked-emblem/emblem-unranked.png"
        break
     }*/
}
}


//donnée sur les chapions joués du profil
let linkSumMasteryChamp = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${dataSumValue.id}?api_key=${riotApiKey}`;
let resultSumMasteryChamp = await fetch(linkSumMasteryChamp);
let dataSumMasteryChamp = await resultSumMasteryChamp.json();

let linkChampion = `http://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json`
let resultchamp = await fetch(linkChampion);
let datachamp = await resultchamp.json();

// boucles d'affiches des images des champions les plus joués

for (let i = 0; i < 1; i++) {
    let mostPlayedChamp = [dataSumMasteryChamp[0].championId, dataSumMasteryChamp[1].championId, dataSumMasteryChamp[2].championId, dataSumMasteryChamp[3].championId];
    for(const champ in datachamp.data){
        
        if (datachamp.data[champ].key === mostPlayedChamp[0].toString()) {
            console.log(champ);
            let linkMasteryPoint = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${dataSumValue.id}/by-champion/${datachamp.data[champ].key}?api_key=${riotApiKey}`
            //console.log(datachamp.data[champ]);
            let resultMasteryChampPoint = await fetch(linkMasteryPoint);
            let dataMasteryChampPoint = await resultMasteryChampPoint.json();
            imgChamp1.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${datachamp.data[champ].id}_0.jpg`
            MasteryPoint1.innerText = dataMasteryChampPoint.championPoints + " " + "Mastery points"
            
            document.getElementById("linkDesc").href = "desciptionChamp.html?id=" + champ//datachamp.data[champ].id 
            

        }
        if (datachamp.data[champ].key === mostPlayedChamp[1].toString()) {
            let linkMasteryPoint = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${dataSumValue.id}/by-champion/${datachamp.data[champ].key}?api_key=${riotApiKey}`
            let resultMasteryChampPoint = await fetch(linkMasteryPoint);
            let dataMasteryChampPoint = await resultMasteryChampPoint.json();
            imgChamp2.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${datachamp.data[champ].id}_0.jpg`
            MasteryPoint2.innerText = dataMasteryChampPoint.championPoints + " " + "Mastery points"
           
                document.getElementById("linkDesc2").href = "desciptionChamp.html?id=" + champ//datachamp.data[champ].id 
                
            
        }
        if (datachamp.data[champ].key === mostPlayedChamp[2].toString()) {
            let linkMasteryPoint = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${dataSumValue.id}/by-champion/${datachamp.data[champ].key}?api_key=${riotApiKey}`
            let resultMasteryChampPoint = await fetch(linkMasteryPoint);
            let dataMasteryChampPoint = await resultMasteryChampPoint.json();
            imgChamp3.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${datachamp.data[champ].id}_0.jpg`
            MasteryPoint3.innerText = dataMasteryChampPoint.championPoints + " " + "Mastery points"
           
                document.getElementById("linkDesc3").href = "desciptionChamp.html?id=" + champ//datachamp.data[champ].id 
                
        }
        
     
    }
   
}


// Description des champions les plus joués par profil


}


const descriptionChampion = async () =>{
    let descChampImg = document.getElementById("descChampImg")
    let desc = document.getElementById("desc")
    let nameChamp = document.getElementById("nameChamp")
    //console.log("toto");
 console.log(window.location.href);
 const param = window.location.search
 const paramResult = new URLSearchParams(param)
 const champId = paramResult.get('id')
 console.log(champId);
descChampImg.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_0.jpg`;
let descChamp = `http://ddragon.leagueoflegends.com/cdn/9.19.1/data/en_US/champion/${champId}.json`
let descValue = await fetch(descChamp);
let resutlDesc = await descValue.json();
console.log(resutlDesc.data[champId]);
nameChamp.innerHTML = resutlDesc.data[champId].id;
desc.innerHTML = resutlDesc.data[champId].blurb;
                   
            }
        
        let url = window.location.href;
        let urldesc = `file:///Users/antondelahaye/my-electron-app/desciptionChamp.html`

if(url.indexOf(urldesc)>=0){
    descriptionChampion()
}







 if (button) {
    button.addEventListener("click", profil);
 }
 

 
