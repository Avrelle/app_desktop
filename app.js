const riotApiKey = ('RGAPI-3a699c9e-8f96-4709-bda0-709c8d9d25a4');
let idSum = document.getElementById("idSum");
let usernameVal = document.getElementById("username");
let name = document.getElementById("name");
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


let button = document.getElementById("button");

const profil = async () =>{
let linkSumValue = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${usernameVal.value}?api_key=${riotApiKey}`;
let resultSumValue = await fetch(linkSumValue);
let dataSumValue = await resultSumValue.json()
nameUser.textContent = dataSumValue.name;
let profileIcon = `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${dataSumValue.profileIconId}.png`
sumIcon.src = profileIcon; 

let linkRank = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${dataSumValue.id}?api_key=${riotApiKey}`;
let resultRank = await fetch(linkRank);
let dataRank = await resultRank.json();
// let RankValueSolo =  dataRank[0].tier;
// let RankValueFlex = dataRank[1].tier;
//console.log(dataRank);
//console.log(RankValueSolo);
//console.log(RankValueFlex);

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
//console.log(Rank);
 for (let i = 0; i<8; i++){
  if(dataRank[0].queueType === "RANKED_SOLO_5x5"){
    if (Rank[i].levelName === dataRank[0].tier) {
            titleRankSolo.innerHTML = "Solo/Duo"
            rankSolo.src = Rank[i].levelPicture
            break
    } else if(dataRank === []) {
      titleRankSolo.innerHTML = "Solo/Duo"
      rankSolo.src = "./ranked-emblem/emblem-unranked.png"
      break
  }
} else if (dataRank[1].queueType === "RANKED_SOLO_5x5"){
    if(Rank[i].levelName === dataRank[1].tier) {
        titleRankSolo.innerHTML = "Solo/Duo"
        rankSolo.src +=  Rank[i].levelPicture
        break
     } else if(dataRank === []) {
        titleRankSolo.innerHTML = "Solo/Duo"
        rankSolo.src += "./ranked-emblem/emblem-unranked.png"
        break
    }
}
}

for (let i = 0; i<8; i++){
if(dataRank[0].queueType === "RANKED_FLEX_SR")  {
    console.log("toto");
    if (Rank[i].levelName === dataRank[0].tier) {
            titleRankFlex.innerHTML = "Flexible"
            rankFlex.src = Rank[i].levelPicture
            break
    } else if(dataRank === []) {
      titleRankFlex.innerHTML = "Flexible"
      rankSolo.src += "./ranked-emblem/emblem-unranked.png"
      break
  }
} else if (dataRank[1].queueType === "RANKED_FLEX_SR"){
    if(Rank[i].levelName === dataRank[1].tier) {
        titleRankFlex.innerHTML = "Flexible"
        rankFlex.src =Rank[i].levelPicture
        break
     } else if (dataRank === []){
        titleRankFlex.innerHTML = "Flexible"
        rankSolo.src += "./ranked-emblem/emblem-unranked.png"
        break
     }
}
}



let linkSumMasteryChamp = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${dataSumValue.id}?api_key=${riotApiKey}`;
let resultSumMasteryChamp = await fetch(linkSumMasteryChamp);
let dataSumMasteryChamp = await resultSumMasteryChamp.json();




let linkChampion = `http://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json`
let resultchamp = await fetch(linkChampion);
let datachamp = await resultchamp.json();
//console.log(dataSumMasteryChamp);
for (let i = 0; i < 1; i++) {
    let mostPlayedChamp = [dataSumMasteryChamp[0].championId, dataSumMasteryChamp[1].championId, dataSumMasteryChamp[2].championId, dataSumMasteryChamp[3].championId];
    for(const champ in datachamp.data){
        //console.log(datachamp.data[champ].key);
        //console.log(mostPlayedChamp[3]);
        if (datachamp.data[champ].key === mostPlayedChamp[0].toString()) {
            //console.log(datachamp.data[champ]);
            //console.log(datachamp.data[champ].image.full);
            let linkMasteryPoint = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${dataSumValue.id}/by-champion/${datachamp.data[champ].key}?api_key=${riotApiKey}`
            let resultMasteryChampPoint = await fetch(linkMasteryPoint);
            let dataMasteryChampPoint = await resultMasteryChampPoint.json();
            imgChamp1.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${datachamp.data[champ].id}_0.jpg`
            MasteryPoint1.innerText = dataMasteryChampPoint.championPoints + " " + "Mastery points"
            

        }
        if (datachamp.data[champ].key === mostPlayedChamp[1].toString()) {
            let linkMasteryPoint = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${dataSumValue.id}/by-champion/${datachamp.data[champ].key}?api_key=${riotApiKey}`
            let resultMasteryChampPoint = await fetch(linkMasteryPoint);
            let dataMasteryChampPoint = await resultMasteryChampPoint.json();
            imgChamp2.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${datachamp.data[champ].id}_0.jpg`
            MasteryPoint2.innerText = dataMasteryChampPoint.championPoints + " " + "Mastery points"
            //console.log(datachamp.data[champ]);
        }
        if (datachamp.data[champ].key === mostPlayedChamp[2].toString()) {
            let linkMasteryPoint = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${dataSumValue.id}/by-champion/${datachamp.data[champ].key}?api_key=${riotApiKey}`
            let resultMasteryChampPoint = await fetch(linkMasteryPoint);
            let dataMasteryChampPoint = await resultMasteryChampPoint.json();
            imgChamp3.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${datachamp.data[champ].id}_0.jpg`
            MasteryPoint3.innerText = dataMasteryChampPoint.championPoints + " " + "Mastery points"
            //console.log(datachamp.data[champ]);
        }
    }
}













}



button.addEventListener("click", profil);