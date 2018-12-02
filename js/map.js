'use strict';

var ADVERTS_COUNT = 8;

var OFFERS_DATA = {
  TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  PRICES: {
    MIN: 1000,
    MAX: 1000000
  },
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  ROOMS: {
    MIN: 1,
    MAX: 5
  },
  GUESTS: {
    MIN: 0,
    MAX: 12
  },
  TIME: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
};
var PINS_SIZE = {
  WIDTH: 50,
  HEIGHT: 70,
  COORDINATE_Y: {
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

// Функция генерации случайного целого числа

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция генерации случайного целого числа с ведущим нулем

var getRandomInt0 = function (min, max) {
  var intRand0 = Math.floor(Math.random() * (max - min)) + min;
  if (intRand0 < 10) {
    return '0' + intRand0;
  }
  return intRand0;
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Функция перевода карты в активный режим

var showMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

// Поиск списка и шаблона пина

var pinElement = document.querySelector('.map__pin');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// Поиск секции и шаблона объявления

var cardElement = document.querySelector('.map');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map');

// Генерация массива из 8 объявлений

var adverts = [
  {
    author: {
      avatar: 'img/avatars/user08.png' // Случайно сгенерир url из 8
    },
    offer: {
      title: 'Огромный прекрасный дворец', // Случайно сгенерир url из 8
      address: '600, 350', // координаты
      price: 1200, // случайное число 1000 - 1000000
      type: ROOM_NAMES.flat, //Случайное значение из 4
      rooms: 2, // Случайное число 1 - 5
      guests: 3, // Случайное число 1 - 12
      checkin: '13:00', // Случайное время из 3
      checkout: '12:00', // Случайное время из 3
      features: ['wif', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'], // Массив случайной длины
      description: '', // Пустая строка
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'] // массив в случайном полядке
    },
    location: {
      x: 200, // Координата X ограничена размерами блока
      y: 345 // Координата  y от 130 до 630
    }
  }
];

var fragment = document.createDocumentFragment();

// Функции создания JS элементов

var renderPin = function (pinArray) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style = 'left:'  + adverts.location.x + 'px; top:' + adverts.location.y + 'px;';
  pinElement.querySelector('.map__pin').src = adverts.author.avatar;
  pinElement.querySelector('.map__pin').alt = adverts.offer.title;
  return pinElement;
};

var renderAd = function (adArray) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.querySelector('.popap__title').textContent = adverts.offer.title;
  adElement.querySelector('.popup__text--address').textContent = adverts.offer.address;
  adElement.querySelector('.popup__text--price').textContent = adverts.offer.price;
  adElement.querySelector('.popup__type').textContent = adverts.offer.type;
  adElement.querySelector('.popup__text--capacity').textContent = adverts.offer.rooms + ' комнаты для ' + adverts.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adverts.offer.checkin + ', выезд до ' + adverts.offer.checkout;
  adElement.querySelector('.popup__features').textContent = adverts.offer.price;
  adElement.querySelector('.popup__text--price').textContent = adverts.offer.price;

  return adElement;
};


// Функция добавления JS элементов

showMap();

