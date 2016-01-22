'use strict';

var products = ['img/bag.jpg', 'img/banana.jpg', 'img/boots.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.jpg', 'img/unicorn.jpg','img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var prodArray=[];
var counterClicks = 0;
var resultsButton = document.getElementById('buttonResults');
resultsButton.className = 'hideButton';
var barChartLabels = [];
var barChartData = [];

var firstPic = document.getElementById('first');
var secondPic = document.getElementById('second');
var thirdPic = document.getElementById('third');
var results = document.getElementById('results');

var clicksOnFirst = 0;
var clicksOnSecond = 0;
var clicksOnThird = 0;
var clearLS = document.getElementById('buttonClear');


firstPic.addEventListener('click', handleClick);
secondPic.addEventListener('click', handleClick);
thirdPic.addEventListener('click', handleClick);
clearLS.addEventListener('click', clearStorage);

function Product(filePath) {
  this.filePath = filePath;
  this.clicks = 0;
}

function initObjArray() {
  for(var i = 0; i < products.length; i++) {
    var image = new Product(products[i]);
    prodArray.push(image);
  }
}

function getRandomImage() {
  var i = 0;
  var a = Math.floor(Math.random()*products.length);
  var b = Math.floor(Math.random()*products.length);
  var c= Math.floor(Math.random()*products.length);

  while(a==b) {
    b = Math.floor(Math.random()*products.length);}

  while((a==c) || (b==c)) {
    c = Math.floor(Math.random()*products.length);
  }
  firstPic.src = prodArray[a].filePath;
  secondPic.src = prodArray[b].filePath;
  thirdPic.src = prodArray[c].filePath;
}

function handleClick() {
  ++counterClicks;
  for (var i = 0; i < prodArray.length;i++) {
    if(this.src.indexOf(prodArray[i].filePath) >= 0 ) {
      prodArray[i].clicks++;
    }
  }
  getRandomImage();

  if (counterClicks == 15) {
    resultsButton.className = 'showButton';
    for(var i = 0; i < prodArray.length; i++) {
      localStorage.setItem(prodArray[i].filePath,JSON.stringify(prodArray[i].clicks));
    }
  }
}

function showResult() {
  barChart();

}

function barChart() {
  var ctx = document.getElementById('votes').getContext('2d');
  for(var i = 0; i < prodArray.length; i++) {
    barChartLabels.push(prodArray[i].filePath);

    var storedClicks = localStorage.getItem(prodArray[i].filePath);
    if (storedClicks) {
      var retrievedClicks = JSON.parse(storedClicks);
      prodArray[i].clicks +=retrievedClicks;
      barChartData.push(prodArray[i].clicks);
    } else {
      barChartData.push(prodArray[i].clicks);
    }
  }

  for(var i = 0; i < products.length; i++) {
    barChartLabels[i] = barChartLabels[i].replace('img/','');
    barChartLabels[i] = barChartLabels[i].replace('.jpg','');
  }
  var  data = {
    labels: barChartLabels,
    datasets: [
      {
        fillColor: 'darkblue',
        responsive: true,
        scaleLineColor: 'rgba(0,0,0,.1)',
        scaleFontColor: '##2d2d20',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        data: barChartData
      }
    ]
  };
  var myBarChart = new Chart(ctx).Bar(data);
}

function clearStorage() {
  console.log('cleariing Local Storage');
  localStorage.clear();
}

initObjArray();
getRandomImage();
