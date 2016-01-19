'use strict';

var products = ['img/bag.jpg', 'img/banana.jpg', 'img/boots.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.jpg', 'img/unicorn.jpg','img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var prodArray=[];
var counterClicks = 0;

var firstPic = document.getElementById('first');
var secondPic = document.getElementById('second');
var thirdPic = document.getElementById('third');
var results = document.getElementById('results');

var clicksOnFirst = 0;
var clicksOnSecond = 0;
var clicksOnThird = 0;

firstPic.addEventListener('click', handleClick);
secondPic.addEventListener('click', handleClick);
thirdPic.addEventListener('click', handleClick);


function Product(filePath) {
    this.filePath = filePath;
    this.clicks = 0;
    this.lastSeen = false;

    };

function initObjArray() {
  for(var i = 0; i < products.length; i++) {
    var image = new Product(products[i]);
    prodArray.push(image);
  }

};

function getRandomImage() {
    var i = 0;
    var a = Math.floor(Math.random()*products.length);
    var b = Math.floor(Math.random()*products.length);
    var c= Math.floor(Math.random()*products.length);

    while(a==b) {
        b = Math.floor(Math.random()*products.length);
    }

    while((a==c) || (b==c)) {
        c = Math.floor(Math.random()*products.length);
    }
      firstPic.src = prodArray[a].filePath;
      secondPic.src = prodArray[b].filePath;
      thirdPic.src = prodArray[c].filePath;
    };

    function handleClick() {
      ++counterClicks;
      for (var i = 0; i < prodArray.length;i++) {
        if(this.src.indexOf(prodArray[i].filePath) >= 0 ) {
          prodArray[i].clicks++;
          console.log('counter ' + prodArray[i].clicks);
          console.log('path '+this.src);
        }
      }
      getRandomImage();

      if (counterClicks < 15) {
         var resultsButton = document.getElementById('buttonResults');
         resultsButton.className = 'hideButton';
       } else {
         resultsButton.className = 'showButton';
       }
    };

    function showResult() {
      var tblEl = document.createElement('table');
      var trEl = document.createElement('tr');
      var thEl = document.createElement('th');
      thEl.textContent = 'Product';
      trEl.appendChild(thEl);
      thEl = document.createElement('th');
      thEl.textContent = 'Votes';
      trEl.appendChild(thEl);
      tblEl.appendChild(trEl);
      results.appendChild(tblEl);

      for(var i = 0; i < prodArray.length; i++) {
        var trEl = document.createElement('tr');
        var thEl = document.createElement('th');
        thEl.innerHTML = '<img src="'+ prodArray[i].filePath + '" width="100" height="100">';
                            // <img src="    smiley.gif"               height="42" width="42">
        trEl.appendChild(thEl);
        tblEl.appendChild(trEl);
        results.appendChild(tblEl);

        var tdEl = document.createElement('td');
            tdEl.textContent = prodArray[i].clicks;
            console.log('test' + prodArray[i].clicks);
            trEl.appendChild(tdEl);
            tblEl.appendChild(trEl);
            results.appendChild(tblEl);
      }
    }

initObjArray();
getRandomImage();
