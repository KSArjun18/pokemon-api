let header=document.createElement("div");
header.setAttribute("class","header");
let h1=document.createElement("h1");
h1.setAttribute("id","title");
h1.innerText="Pokemon";


header.append(h1);
const container = document.createElement("div");
container.classList.add("content-responsive");
const nav=document.createElement("div");
nav.setAttribute("class","page");



//  To get the 50 pokemon Names from pokeapi
async function PokemonName() {
    try {
      let res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      let data = await res.json();
      console.log(data);
  
      let pageContent = data.results;
      getPokemon(pageContent, 1);
      //  To create page buttons
      function createButtons(name) {
        let ButtonName = name;
        ButtonName = document.createElement("button");
        ButtonName.setAttribute("id", `${name}`);
        ButtonName.setAttribute("name", "pageButtons");
        ButtonName.innerText = `${name}`;
        return ButtonName;
      }
  
      let buttonBox = document.createElement("div");
      buttonBox.classList.add("buttons");
      buttonBox.setAttribute("id", "allButtons");
      const pages = ["First", "Previous"];
      for (let i = 1; i <= 10; i++) 
      pages.push(i);
      pages.push("Next");
      pages.push("Last");
      for (let buttons of pages) {
        buttons = createButtons(buttons);
        buttonBox.append(buttons);
      }
      nav.append(buttonBox);
      // adding page click functionality
      const btngroup = document.getElementsByName("pageButtons");
      let currentPage = 1;
      for (let buttons of btngroup) {
        buttons.addEventListener("click", () => {
          let temp = document.getElementById(currentPage.toString());
          let pageNumber;
          container.innerHTML = ``;
          switch (buttons.id) {
            case "First":
              pageNumber = 1;
              currentPage = 1;
              break;
            case "Last":
              pageNumber = 10;
              currentPage = 10;
              break;
            case "Previous":
              if (currentPage > 1) {
                pageNumber = currentPage - 1;
                currentPage = currentPage - 1;
              } else {
                pageNumber = currentPage;
              }
              break;
            case "Next":
              if (currentPage < 10) {
                pageNumber = currentPage + 1;
                currentPage = currentPage + 1;
              } else {
                pageNumber = currentPage;
              }
              break;
            default:
              currentPage = parseInt(buttons.id);
              pageNumber = currentPage;
          }
          let finish = document.getElementById(pageNumber);
          temp.classList.remove("active");
          finish.classList.add("active");
          getPokemon(pageContent, pageNumber);
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
  PokemonName();


// To get the data for each pokemon data
async function getPokemon(arrVal, page) {
  try {
    let start = page * 5 - 5;
    let end = page * 5;
    arrVal = arrVal.slice(start, end);
    arrVal.forEach(async (element) => {
      let pokemonName = element.name;

      // contentDiv.innerHTML = ``;
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      let data = await res.json();
      console.log(data);
    //   let name = PokemonName;
      let pokemonAbilities = [];
      let pokemonWeight = data.weight;
      let pokemonMoves = [];
      let pokemonImageSource = data.sprites.other.dream_world.front_default;
      console.log(pokemonImageSource);
      data.abilities.forEach((element) => {
        pokemonAbilities.push(element.ability.name);
      });
      data.moves.forEach((element) => {
        pokemonMoves.push(element.move.name);
      });
      $(function () {
        $('[data-toggle="popover"]').popover()
      }) 
    container.innerHTML  += `
      <div class="card">
      <div class="card-header"><b>Name: </b><span>${pokemonName}</span></div>
      <img src="${pokemonImageSource}" class="card-img-top" alt="${pokemonName}">
      <div class="card-body">
      <div class="abilities"><b>Abilities: </b><span>${pokemonAbilities}</span></div>
      <div class="weight"><b>Weight: </b> <span>${pokemonWeight}</span></div>
      <button type="button" id="btns" class="btn btn-secondary" data-container="body" title="Pokemon-moves" data-toggle="popover" 
      data-placement="right" data-content="MOVES: ${pokemonMoves}"> Click for Moves </button>
      </div></div>`;
    });
  }
   catch (err) {
    console.error(err);
  }
}

document.body.append(header,container,nav);