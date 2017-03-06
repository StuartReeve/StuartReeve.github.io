let summonerSearch = (function() {
    "use strict";

    //global privates
    let riotHandler = riotApiHandler();
    let profileContainer = document.getElementById("summonerProfile");
    let searchField = document.getElementById("summonerSearch");
    let regionSelect = document.getElementById("regionSelect");
    let summonerName = searchField.value;
    let region = regionSelect.value;

    function lookupSummoner() {
        //reset resetMatchListContainer info
        resetProfileContainer();

        let summonerEndpoint = buildSummonerEndpoint(summonerName, region);

        riotHandler.queryRiotApi(summonerEndpoint, function(data) {

            //get the string ready to use with json
            let summonerNameNoSpaces = summonerName.replace(/ /g, "");
            summonerNameNoSpaces = summonerNameNoSpaces.toLocaleLowerCase().trim();

            //Grab the summoner ID
            let summonerId = data[summonerNameNoSpaces].id;

            let profileBuilder = matchlistBuilder();
            profileBuilder.buildProfile(summonerId, summonerName, region);
        });
    }


    //Use the region and summoner name to build a url for the api
    function buildSummonerEndpoint(summonerName, region) {
        summonerName = encodeURIComponent(summonerName);
        return `https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${summonerName}`;
    }

    function resetProfileContainer() {
        while (profileContainer.firstChild) {
            profileContainer.removeChild(profileContainer.firstChild);
        }
    }

    //return an object exposing public information
    return {
        lookupSummoner: lookupSummoner
    }

});