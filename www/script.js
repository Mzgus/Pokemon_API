let urltypes = "https://pokebuildapi.fr/api/v1/pokemon/type";
let urlGeneration = "https://pokebuildapi.fr/api/v1/pokemon/generation";
let defaultUrl = "https://pokebuildapi.fr/api/v1/pokemon";
let urlName = "https://pokebuildapi.fr/api/v1/pokemon";
let api;
let parentElement = document.getElementById("carteMain");
let soloElement = document.getElementById("carteSolo");
let position;

function refresh() {
  fetch(defaultUrl)
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("pokemon_TL", JSON.stringify(response));
      api = response;
    })
    .catch((error) => alert(error));
}

function CibleRefresh(url, nb) {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      localStorage.setItem("pokemon2_TL", JSON.stringify(response));
      api = response;
      if (nb == 1) {
        creerCardSolo(api);
        refresh();
      } else {
        creerCardHome(api);
      }
    })
    .catch((error) => alert(error));
}

function remove() {
  localStorage.removeItem("pokemon2");
}

function getTypes(element) {
  let type = element.textContent;
  let urltype = urltypes;
  urltype += "/" + type;
  CibleRefresh(urltype, 2);
  urltype = urltypes;
}

function getGeneration(element) {
  let nbgeneration = element.getAttribute("name");
  let urlgeneration = urlGeneration;
  urlgeneration += "/" + nbgeneration
  CibleRefresh(urlgeneration, 2);
  urlgeneration = urlGeneration;
}
function numberOfType(i, nb, api) {
  let type = 0;
  if (nb == 2) {
    for (let index in api[i].apiTypes) {
      type += 1;
    }
  } else {
    for (let index in api.apiTypes) {
      type += 1;
    }
  }
  return type;
}

function CardSolo(elem) {
  let id = elem.parentNode.parentNode.id;
  let getName = document.getElementById(id).querySelector("h5").textContent;
  let urlNameProv = urlName;
  urlNameProv += "/" + getName;
  CibleRefresh(urlNameProv, 1);
  urlNameProv = urlName;
}

function allPokemon() {
  if (localStorage.getItem("pokemon_TL")) {
    api = JSON.parse(localStorage.getItem("pokemon_TL"));
    creerCardHome(api);
  } else {
    CibleRefresh(defaultUrl, 2);
  }
}

function resistance(api) {
  for (let i in api.apiResistances) {
    if (api.apiResistances[i].damage_relation == "resistant") {
      document
        .getElementById("article3")
        .insertAdjacentHTML(
          "beforeend",
          `<p class="text-success">Resistant à ${api.apiResistances[i].name}</p>`
        );
    } else if (api.apiResistances[i].damage_relation == "vulnerable") {
      document
        .getElementById("article3")
        .insertAdjacentHTML(
          "beforeend",
          `<p class="text-danger">Vulnerable à ${api.apiResistances[i].name}</p>`
        );
    } else if (api.apiResistances[i].damage_relation == "twice_resistant") {
      document
        .getElementById("article3")
        .insertAdjacentHTML(
          "beforeend",
          `<p class="text-success">Très résistant à ${api.apiResistances[i].name}</p>`
        );
    } else if (api.apiResistances[i].damage_relation == "immune") {
      document
        .getElementById("article3")
        .insertAdjacentHTML(
          "beforeend",
          `<p >Immunisé à ${api.apiResistances[i].name}</p>`
        );
    } else if (api.apiResistances[i].damage_relation == "twice_vulnerable") {
      document
        .getElementById("article3")
        .insertAdjacentHTML(
          "beforeend",
          `<p class="text-danger">Très vulnerable à ${api.apiResistances[i].name}</p>`
        );
    }
  }
}

function creerCardSolo(api) {
  parentElement.innerHTML = "";
  soloElement.innerHTML = "";
  if (soloElement) {
    if (numberOfType(0, 1, api) == 2) {
      soloElement.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card col">
          <h5 class="card-title  text-center col" style="width: 100%">${api.name}</h5>
          <div class="bg-light row row-cols-4 text-center m-auto">
            <p class="col3">Evolution de</p>
            <p id="type1" class="col-3">${api.apiTypes[0].name}</p>
            <p id="type2" class="col-3">${api.apiTypes[1].name}</p>
            <p class="col-3">Génération</p>
            <h5 id="prevo" class="text-center col-3">${api.apiPreEvolution.name}</h5>
            <img style="width: 5rem" class="col-3 m-auto" src="${api.apiTypes[0].image}" alt="image type">
            <img style="width: 5rem" class="col-3 m-auto" src="${api.apiTypes[1].image}" alt="image type">
            <h2 id="generation" class="text-center col-3">${api.apiGeneration}</h2>
          </div>
          <div class="card-body row row-cols-3 text-center m-3" style="width: 100%">
            <article id="article1" class="col">
              <p>Points de vie : ${api.stats.HP}</p>
              <p>Attaque : ${api.stats.attack}</p>
              <p>Defense : ${api.stats.defense}</p>
              <p>Attaque spéciales : ${api.stats.special_attack}</p>
              <p>Défense spéciale : ${api.stats.special_defense}</p>
              <p>Vitesse : ${api.stats.speed}</p>
            </article>
            <article id="article2" class="col">
              <img src="${api.image}" style="width: 100%"alt="${api.name}" />
            </article>
            <article id="article3" class="col"></article>
          </div>
        </div>`
      );
      if (api.apiPreEvolution == "none") {
        document.getElementById("prevo").textContent = "Aucun";
      }
    } else {
      soloElement.insertAdjacentHTML(
        "beforeend",
        `        
        <div class="card col">
        <h5 class="card-title  text-center col" style="width: 100%">${api.name}</h5>
        <div class="bg-light row row-cols-4 text-center m-auto">
          <p class=" col-4">Evolution de</p>
          <p id="type1" class="col-4">${api.apiTypes[0].name}</p>
          <p class="col-4">Génération</p>
          <h5 id="prevo" class="text-center col-4">${api.apiPreEvolution.name}</h5>
          <img style="width: 5rem" class="col-4 m-auto" src="${api.apiTypes[0].image}" alt="image type">
          <h2 id="generation" class="text-center col-4">${api.apiGeneration}</h2>
        </div>
        <div class="card-body row row-cols-3 text-center m-3" style="width: 100%">
          <article id="article1" class="col">
            <p>Points de vie : ${api.stats.HP}</p>
            <p>Attaque : ${api.stats.attack}</p>
            <p>Defense : ${api.stats.defense}</p>
            <p>Attaque spéciales : ${api.stats.special_attack}</p>
            <p>Défense spéciale : ${api.stats.special_defense}</p>
            <p>Vitesse : ${api.stats.speed}</p>
          </article>
          <article id="article2" class="col">
            <img src="${api.image}" style="width: 100%"alt="${api.name}" />
          </article>
          <article id="article3" class="col"></article>
        </div>
      </div>`
      );
      if (api.apiPreEvolution == "none") {
        document.getElementById("prevo").textContent = "Aucun";
      }
    }
  } else {
    console.error("L'élément parent n'existe pas.");
  }
  resistance(api);
  position = 1;
  return position;
}

function creerCardHome(api) {
  parentElement.innerHTML = "";
  soloElement.innerHTML = "";
  if (parentElement) {
    for (let i in api) {
      if (numberOfType(i, 2, api) == 2) {
        parentElement.insertAdjacentHTML(
          "beforeend",
          `<div id="${api[i].id}" class="card col m-2" style="width: 18rem;">
        <img src="${api[i].image}" class="card-img-top" alt="${api[i].name}">
        <div  class="card-body m-auto">
          <h5 class="card-title text-center nameCard">${api[i].name}</h5>
          <img style="width: 3rem" class="d-inline m-1" src="${api[i].apiTypes[1].image}" alt="image type">
          <img style="width: 3rem" class="d-inline m-1" src="${api[i].apiTypes[0].image}" alt="image type">
          <buton href="#" class="btn btn-primary d-flex" onclick="CardSolo(this)">En savoir plus</buton>
        </div>
      </div>`
        );
      } else {
        parentElement.insertAdjacentHTML(
          "beforeend",
          `<div id="${api[i].id}" class="card col m-2" style="width: 18rem;">
          <img src="${api[i].image}" class="card-img-top" alt="${api[i].name}">
          <div  class="card-body m-auto">
            <h5 class="card-title text-center nameCard">${api[i].name}</h5>
            <img style="width: 3rem" class="d-flex m-2" src="${api[i].apiTypes[0].image}" alt="image type">
            <buton class="btn btn-primary d-flex" onclick="CardSolo(this)">En savoir plus</buton>
          </div>
        </div>`
        );
      }
    }
  } else {
    console.error("L'élément parent n'existe pas.");
  }
  position = 0;
  return position;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function pokemonHasard() {
  let indexPokemon = getRandomInt(898);
  let urlNameProv = urlName;
  urlNameProv += "/" + indexPokemon;
  CibleRefresh(urlNameProv, 1);
  urlNameProv = urlName;
}

function rechercherPokemon() {
  let searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("input", function () {
    let searchTerm = searchBar.value.toLowerCase();

    let filteredPokemon = api.filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(searchTerm);
    });

    creerCardHome(filteredPokemon);
  });
}

// Appelez la fonction de recherche au chargement de la page
rechercherPokemon();

if (localStorage.getItem("pokemon_TL")) {
  api = JSON.parse(localStorage.getItem("pokemon_TL"));
  creerCardHome(api);
} else {
  console.log("Pas de donnés en mémoire");
}
