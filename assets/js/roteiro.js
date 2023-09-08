//menu
import { setupMobileMenu } from './menu.js';
setupMobileMenu();
  

 //pexels
 const apiKey = 'Zi6kUS6fjKkyzmKQZdLBHuL9FQdCix2rqHG0i2IurtXwzUkZzz0wUCTt';

 const continentesCidades = {
     'America do Sul': [
       { name: 'Buenos Aires', keyword: 'Buenos Aires' },
       { name: 'Santiago', keyword: 'Santiago' },
       { name: 'São Paulo', keyword: 'São Paulo' },
       { name: 'Rio de Janeiro', keyword: 'Rio de Janeiro' }
     ],
     'America do Norte': [
       { name: 'Nova Iorque', keyword: 'statue of liberty' },
       { name: 'Los Angeles', keyword: 'Los Angeles' },
       { name: 'Calgary', keyword: 'Calgary' },
       { name: 'Miami', keyword: 'Miami' }
     ],
     'America Central': [
         { name: 'Granada', keyword: 'nicaragua granada' },
         { name: 'Léon', keyword: 'Manágua ' },
         { name: 'Antígua', keyword: 'Antígua Guatemala' },
         { name: 'Tegucigalpa', keyword: 'Tegucigalpa' }
       ],
     'Africa': [
         { name: 'Durban', keyword: 'Durban' },
         { name: 'Nairóbi', keyword: 'Nairóbi' },
         { name: 'Luanda', keyword: 'Luanda' },
         { name: 'Pretória', keyword: 'Pretoria' }
     ],
     'Asia': [
         { name: 'Tóquio', keyword: 'Tokyo' },
         { name: 'Bangalore', keyword: 'Bangalore' },
         { name: 'Pequim', keyword: 'Pequim china' },
         { name: 'Dubai', keyword: 'Dubai' }
     ],
     'Europa': [
         { name: 'Roma', keyword: 'Roma' },
         { name: 'Paris eiffel tower', keyword: 'Paris eiffel tower' },
         { name: 'Lisboa', keyword: 'Lisboa' },
         { name: 'Barcelona', keyword: ' Barcelona' }
     ],
     'Oceania': [
         { name: 'Sydney', keyword: 'Sydney' },
         { name: 'Melbourne', keyword: 'Melbourne' },
         { name: 'Wellington', keyword: 'Wellington' },
         { name: 'Auckland', keyword: 'Auckland' }
     ],
   };
   
   //buscar imagens das cidades usando a API
   async function fetchCityImages(city) {
     const apiUrl = `https://api.pexels.com/v1/search?query=${city.keyword}&per_page=1`;
   
     try {
       const response = await fetch(apiUrl, {
         headers: {
           Authorization: apiKey
         }
       });
       const data = await response.json();
   
       return data;
     } catch (error) {
       console.error('Erro ao buscar imagens:', error);
       throw error;
     }
   }
   
   //exibir um card de cidade
   function displayCityCard(cityName, imageUrl) {
     const cityCard = document.createElement('div');
     cityCard.className = 'city-card';

     const cityLink = document.createElement('a');
        cityLink.href = `./descricaoLocal.html?cidade=${encodeURIComponent(cityName)}`;
        cityLink.target = "_blank"
   
     const cityImage = document.createElement('img');
     cityImage.className = 'imagem-local';
     cityImage.src = imageUrl;
     cityImage.alt = cityName;
   
     const cityNameElement = document.createElement('h3');
     cityNameElement.textContent = cityName;
   
     cityCard.appendChild(cityImage);
     cityCard.appendChild(cityNameElement);
     cityLink.appendChild(cityCard);
   
     
     return cityLink;
   }
   
   // adicionar os cards de cidade a um continente
   function addCityCardsToContinent(continentId, cities) {
     const continentSection = document.getElementById(continentId);
     const cityCardsContainer = continentSection.querySelector('.city-cards-container');
   
     cities.forEach(city => {
       fetchCityImages(city)
         .then(data => {
           // Criar um card de cidade e adicionar ao contêiner
           const cityCard = displayCityCard(city.name, data.photos[0].src.medium);
           cityCardsContainer.appendChild(cityCard);
         })
         .catch(error => {
           console.error(`Erro ao buscar imagens para ${city.name}: ${error}`);
         });
     });
   }
   
   // Chamar a função addCityCardsToContinent para cada continente
   addCityCardsToContinent('america-sul', continentesCidades['America do Sul']);
   addCityCardsToContinent('america-norte', continentesCidades['America do Norte']);
   addCityCardsToContinent('america-central', continentesCidades['America Central']);
   addCityCardsToContinent('africa', continentesCidades['Africa']);
   addCityCardsToContinent('asia', continentesCidades['Asia']);
   addCityCardsToContinent('europa', continentesCidades['Europa']);
   addCityCardsToContinent('oceania', continentesCidades['Oceania']);


