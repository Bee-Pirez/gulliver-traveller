import { setupMobileMenu } from './menu.js';
setupMobileMenu();

// obter o valor do parâmetro 'cidade' da URL
function getCityParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('cidade');
}

// Obter o nome da cidade da URL
const cityName = getCityParameter();

// Exibir o nome da cidade
const cidadeElement = document.getElementById('cityName');
if (cityName) {
  cidadeElement.textContent = cityName;
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
    } else {
      console.error('Nenhuma imagem encontrada para a cidade:', cityName);
    }
  } catch (error) {
    console.error('Erro ao buscar imagens da cidade:', error);
  }
}

displayCityImage();