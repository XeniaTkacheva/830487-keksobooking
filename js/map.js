'use strict';
// Исходные данные (константы)

var ADVERTS_COUNT = 8;

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var PRICE = {
  MIN: 1000,
  MAX: 1000000
};
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var ROOMS = {
  MIN: 1,
  MAX: 5
};
var GUESTS = {
  MIN: 0,
  MAX: 12
};
var TIME = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PINS_SIZE = {
  WIDTH: 50,
  HEIGHT: 70,
  POSITION_Y: {
    MIN: 130,
    MAX: 630
  }
};

var ROOM_NAMES = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var avatarImg = ['01', '02', '03', '04', '05', '06', '07', '08'];

// Поиск карты, списка и шаблона пина

var map = document.querySelector('.map');
var containerPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Поиск секции и шаблона объявления

var containerAds = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

// Массив объявлений

var sampleAds = [];

// Функция генерации случайного целого числа

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция получения случайного элемента массива

var getRandomItem = function (array, unique) {
  var indexRand = Math.floor(Math.random() * array.length);
  if (unique) {
    return array.splice(indexRand, 1);
  }
  return array[indexRand];
};

// Функция перемешивания массива

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Функция получения массива случайной длины

var getRandArrLength = function (array) {
  var cutArray = array.slice();

  cutArray.length = getRandomInt(1, cutArray.length);

  return cutArray;
};

// Функция перевода карты в активный режим

var showMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};
showMap();
// Функция генерации объявлений

var makeAd = function () {
  return {
    author: {
      avatar: 'img/avatars/user' + getRandomItem(avatarImg, true) + '.png' // Случайно сгенерир url из 8
    },
    offer: {
      title: getRandomItem(TITLES, true), // Случайно сгенерир url из 8
      address: getRandomInt(0, 1200) + ', ' + getRandomInt(350, 630), // '600, 350', // координаты
      price: getRandomInt(PRICE.MIN, PRICE.MAX), // 1200, // случайное число 1000 - 1000000
      type: getRandomItem(TYPES), // Случайное значение из 4
      rooms: getRandomInt(ROOMS.MIN, ROOMS.MAX), // Случайное число 1 - 5
      guests: getRandomInt(GUESTS.MIN, GUESTS.MAX), // Случайное число 1 - 12
      checkin: getRandomItem(TIME), // '13:00', // Случайное время из 3
      checkout: getRandomItem(TIME), // '12:00', // Случайное время из 3
      features: getRandArrLength(FEATURES), // Массив случайной длины
      description: '', // Пустая строка
      photos: shuffleArray(PHOTOS) // ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'] // массив в случайном полядке
    },
    location: {
      x: getRandomInt(0, 1200) - PINS_SIZE.WIDTH / 2, // 200, // Координата X ограничена размерами блока
      y: getRandomInt(130, 630) - PINS_SIZE.HEIGHT// pinPosition.y // 345 // Координата  y от 130 до 630
    }
  };
};

// Функция создания массива объявлений

var makeSampleAds = function (number) {
  for (var i = 0; i < number; i++) {
    sampleAds.push(makeAd());
  }
  return sampleAds;
};

sampleAds = makeSampleAds(ADVERTS_COUNT);

// Функция для задания характеристик

var setFeatures = function (featuresArr, adElement) {
  var featuresList = adElement.querySelector('.popup__features');
  var featuresElements = adElement.querySelectorAll('.popup__feature');
  for (var i = 0; i < featuresArr.length; i++) {
    if (!featuresElements[i].classList.contains(featuresArr[i])) {
      featuresList.removeChild(featuresElements[featuresArr.length - i]);
    }
  }
};

// Функция для создания фото

var createPhotos = function (photosArr, adElement) {
  var fragment = document.createDocumentFragment();
  var photosList = adElement.querySelector('.popup__photos');
  var photoTemplate = photosList.querySelector('.popup__photo');
  photosList.removeChild(photoTemplate);

  for (var i = 0; i < PHOTOS.length; i++) {
    var adPhoto = photoTemplate.cloneNode(true);
    adPhoto.src = PHOTOS[i];
    fragment.appendChild(adPhoto);
  }
  photosList.appendChild(fragment);
};

// Функции создания JS элементов

var renderPin = function (pinArray) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pinArray.location.x + 'px';
  pinElement.style.top = pinArray.location.y + 'px';
  pinElement.querySelector('img').src = pinArray.author.avatar;
  pinElement.querySelector('img').alt = pinArray.offer.title;
  return pinElement;
};

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  containerPins.appendChild(fragment);
};
renderPins(sampleAds);

var renderAd = function (adArray) {
  var adElement = cardTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = adArray.offer.title;
  adElement.querySelector('.popup__text--address').textContent = adArray.offer.address;
  adElement.querySelector('.popup__text--price').textContent = adArray.offer.price;
  adElement.querySelector('.popup__type').textContent = ROOM_NAMES[adArray.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = adArray.offer.rooms + ' комнаты для ' + adArray.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adArray.offer.checkin + ', выезд до ' + adArray.offer.checkout;
  setFeatures(adArray.offer.features, adElement);
  adElement.querySelector('.popup__text--price').textContent = adArray.offer.price + ' ₽/ночь';
  adElement.querySelector('.popup__description').textContent = adArray.offer.description;
  adElement.querySelector('.popup__avatar').src = adArray.author.avatar;
  createPhotos(adArray.offer.photos, adElement);

  return adElement;
};

// Функция добавления JS элементов
var renderAds = function (ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAd(ads[i]));
  }
  containerAds.appendChild(fragment);
};
renderAds(sampleAds);
