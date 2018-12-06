'use strict';

// Исходные данные (константы)
var ADVERTS_COUNT = 8;
var AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

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

// Поиск карты, списка и шаблона пина

var map = document.querySelector('.map');
var positionPin = map.querySelector('.map__pin');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Поиск секции и шаблона объявления

var positionAds = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

// Массив объявлений

var sampleAds = [];

// Функция генерации случайного целого числа

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция получения случайного элемента массива

var getRandomItem = function (array) {
  var indexRand = Math.floor(Math.random() * array.length);
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

// Функция создания массива случайных характеристик
// var mixFeatures = shuffleArray(FEATURES);

var makeRandFeatures = function (featuresArray) {
  var randomFeaturesArray = [];
  var number = Math.round(Math.random() * (FEATURES.length));
  for (var i = 0; i < number; i++) {
    randomFeaturesArray.push(featuresArray[i]);
  }
  return randomFeaturesArray;
};

var pinPosition = {
  x: getRandomInt(PINS_SIZE.WIDTH / 2, positionPin.clientWidth - PINS_SIZE.WIDTH / 2),
  y: getRandomInt(PINS_SIZE.POSITION_Y.MIN, PINS_SIZE.POSITION_Y.MAX)
};

// Функция перевода карты в активный режим

var showMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

// Функция генерации объявлений

var makeAd = function () {
  var adverds = {
    author: {
      avatar: getRandomItem(AVATAR) // Случайно сгенерир url из 8
    },
    offer: {
      title: getRandomItem(TITLES), // Случайно сгенерир url из 8
      address: pinPosition.x + ', ' + pinPosition.y, // '600, 350', // координаты
      price: getRandomInt(PRICE.MIN, PRICE.MAX), // 1200, // случайное число 1000 - 1000000
      type: getRandomItem(TYPES), // Случайное значение из 4
      rooms: getRandomInt(ROOMS.MIN, ROOMS.MAX), // Случайное число 1 - 5
      guests: getRandomInt(GUESTS.MIN, GUESTS.MAX), // Случайное число 1 - 12
      checkin: getRandomItem(TIME), // '13:00', // Случайное время из 3
      checkout: getRandomItem(TIME), // '12:00', // Случайное время из 3
      features: makeRandFeatures(FEATURES), // Массив случайной длины
      description: '', // Пустая строка
      photos: shuffleArray(PHOTOS) // ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'] // массив в случайном полядке
    },
    location: {
      x: getRandomInt(200, 800), // pinPosition.x, // 200, // Координата X ограничена размерами блока
      y: getRandomInt(130, 630) // pinPosition.y // 345 // Координата  y от 130 до 630
    }
  };
  return adverds;
};
var adverds = makeAd();

// Функция создания массива объявлений

var makeSampleAds = function (numer) {
  for (var i = 0; i < numer; i++) {

    sampleAds.push(adverds);
  }
  return sampleAds;
};

sampleAds = makeSampleAds(ADVERTS_COUNT);

var fragment = document.createDocumentFragment();

// Функции создания JS элементов

var renderPin = function (pinArray) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style = 'left: ' + pinArray.location.x + 'px; top:' + pinArray.location.y + 'px;';
  pinElement.querySelector('.map__pin').src = pinArray.author.avatar;
  pinElement.querySelector('.map__pin').alt = pinArray.offer.title;
  return pinElement;
};
//
// var renderAd = function (adArray) {
//   var adElement = pinTemplate.cloneNode(true);
//
//   adElement.querySelector('.popap__title').textContent = adArray.offer.title;
//   adElement.querySelector('.popup__text--address').textContent = adArray.offer.address;
//   adElement.querySelector('.popup__text--price').textContent = adArray.offer.price;
//   adElement.querySelector('.popup__type').textContent = adArray.offer.type;
//   adElement.querySelector('.popup__text--capacity').textContent = adArray.offer.rooms + ' комнаты для ' + adArray.offer.guests + ' гостей';
//   adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adArray.offer.checkin + ', выезд до ' + adArray.offer.checkout;
//   adElement.querySelector('.popup__features').textContent = adArray.offer.price;
//   adElement.querySelector('.popup__text--price').textContent = adArray.offer.price;
//   adElement.querySelector('.popup__description').textContent = adArray.offer.description;
//   adElement.querySelector('.popup__avatar').src = adArray.author.avatar;
//   adElement.querySelector('.popup__photos').src = adArray.author.photos;
//
//   return adElement;
// };


// Функция добавления JS элементов

var addPins = function (listElement, count) {
  for (var i = 0; i < count; i++) {
    fragment.appendChild(renderPin(sampleAds[i]));
  }
  listElement.appendChild(fragment);
};

// var addAds = function (listElement, count) {
//   for (var i = 0; i < count; i++) {
//     fragment.appendChild(renderAd(sampleAds[i]));
//   }
//   listElement.appendChild(fragment);
// };

showMap();
renderPin(sampleAds);
// renderAd(sampleAds);
// addAds(positionAds);
addPins(positionPin, ADVERTS_COUNT);

