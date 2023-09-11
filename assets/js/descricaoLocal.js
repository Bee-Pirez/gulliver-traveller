import { setupMobileMenu } from './menu.js';
setupMobileMenu();

// obter o valor do parâmetro 'cidade' da URL
function getCityParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('cidade');
}

// Obter o nome da cidade da URL
const cityName = getCityParameter();

async function pegaCoordenada() {
  var apiGeo = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyA4qOJi5UVkVZlt35mMTyr2IXvEKIdJzHI`)
  var apiConvertida = await apiGeo.json();
  var latitude = apiConvertida.results[0].geometry.location.lat;
  var longitude = apiConvertida.results[0].geometry.location.lng;
  let map;

  async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 8,
    });
  }

  return initMap();
};

pegaCoordenada();

// Exibir o nome da cidade
const cidadeElement = document.getElementById('cityName');
if (cityName) {
  cidadeElement.textContent = cityName;
  cidadeElement.className = "cityName";
} else {
  cidadeElement.textContent = 'Cidade não encontrada';
}

async function fetchCityImages(cityName) {
  const apiUrl = `https://api.pexels.com/v1/search?query=${cityName}&per_page=1`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: 'Zi6kUS6fjKkyzmKQZdLBHuL9FQdCix2rqHG0i2IurtXwzUkZzz0wUCTt'
      }
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    throw error;
  }
}

// Exibir a imagem da cidade
async function displayCityImage() {
  // Obter a cidade da URL
  const cityName = getCityParameter();

  // Verificar se o nome da cidade foi passado na URL
  if (!cityName) {
    return;
  }

  // Buscar imagens da cidade usando a API
  try {
    const data = await fetchCityImages(cityName);

    if (data.photos) {
      const imageUrl = data.photos[0].src.medium;
      const cityImage = document.getElementById('imagem-local');
      cityImage.src = imageUrl;
      cityImage.alt = cityName;
      cityImage.className = "imagem-local";
    } else {
      console.error('Nenhuma imagem encontrada para a cidade:', cityName);
    }
  } catch (error) {
    console.error('Erro ao buscar imagens da cidade:', error);
  }
}

displayCityImage();
