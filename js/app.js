// ++++++++++++++++++++++++++++++++++++++++++++
// DATA - Variable declarations
// ++++++++++++++++++++++++++++++++++++++++++++

let allProducts = [];
let allProductsStringified;
let previousProductImage = [];
let currentProductImage = [];
let clickCount = 0;

// ++++++++++++++++++++++++++++++++++++++++++++
// DATA - Constructor and instances
// ++++++++++++++++++++++++++++++++++++++++++++

function ProductImage(name, extension) {
  this.extension = extension;
  this.filepath = `./../assets/${name}.${extension}`;
  this.name = name;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

createProductReference();

function createProductReference() {
  const productNameList = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg',
  ];

  for(let i = 0; i < productNameList.length; i++) {
    let productReference = productNameList[i].split('.');

    new ProductImage(productReference[0], productReference[1]);
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// ++++++++++++++++++++++++++++++++++++++++++++
function productPageLoad() {
  allProductsStringified = JSON.parse(localStorage.getItem('marketData'));

  if(allProductsStringified) {
    allProducts = Object.values(allProductsStringified);
    showRandomProductImage();
    updateChartData();
  } else {
    showRandomProductImage();
  }
}

function showRandomProductImage() {
  const productImageIds = [
    'productone',
    'producttwo',
    'productthree',
  ];

  previousProductImage = currentProductImage;
  currentProductImage = [];

  for(let i = 0; i < productImageIds.length; i++) {
    let randomProductImage = Math.floor(Math.random() * allProducts.length);

    while(previousProductImage.includes(randomProductImage) || currentProductImage.includes(randomProductImage)) {
      randomProductImage = Math.floor(Math.random() * allProducts.length);
    }

    currentProductImage.push(randomProductImage);

    let product = allProducts[randomProductImage];
    let productImage = document.getElementById(productImageIds[i]);

    allProducts[randomProductImage].views++;

    // Object.assign() solution suggested by George Mauer with Operation Code
    Object.assign(productImage, {
      src: product.filepath,
      alt: product.name,
      title: product.name,
    });
  }
  allProductsStringified = allProducts;
}

function handleProductImageClick() {
  if (clickCount <= 25) {
    showRandomProductImage();
    clickCount++;
  } else {
    document.getElementById('votingsection').removeEventListener('click', voteEventHandler);
    allProductsStringified = JSON.stringify(allProducts);
    localStorage.setItem('marketData', allProductsStringified);
  }
}

function aggregateVote(product) {
  for (var i = 0; i < allProducts.length; i++) {
    if (product === allProducts[i].name) {
      allProducts[i].votes++;
      // console.log(allProducts[i].votes);
      updateChartData();
    }
  }
}

function voteEventHandler(event) {
  if (event.target.id !== 'votingsection') {
    aggregateVote(event.target.alt);
  }

  if (chartRendered) {
    productChart.update();
  }

  handleProductImageClick();
}

// ++++++++++++++++++++++++++++++++++++++++++++
// CHART
// Charts rendered using Chart JS v.2.6.0
// http://www.chartjs.org/
// ++++++++++++++++++++++++++++++++++++++++++++

let chartRendered = false;
let productChart;
let votes = [];
let names = [];

const data = {
  labels: names, // names array we declared earlier
  datasets: [{
    data: votes, // votes array we declared earlier
    backgroundColor: [
      '#e6194b',
      '#3cb44b',
      '#ffe119',
      '#4363d8',
      '#f58231',
      '#911eb4',
      '#46f0f0',
      '#f032e6',
      '#bcf60c',
      '#fabebe',
      '#008080',
      '#e6beff',
      '#9a6324',
      '#fffac8',
      '#800000',
      '#aaffc3',
      '#808000',
      '#ffd8b1',
      '#000075',
      '#808080',
      '#ffffff',
      '#000000'
    ],
    hoverBackgroundColor: [
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
      '#97978F',
    ]
  }]
};

function updateChartData() {
  for (var i = 0; i < allProducts.length; i++) {
    names[i] = allProducts[i].name;
    votes[i] = allProducts[i].votes;
  }
}

function renderChart() {
  const ctx = document.getElementById('product-chart').getContext('2d');
  productChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
  chartRendered = true;
}

function clearChart() {
  votes = [];
  names = [];
  data.labels = names;
  data.datasets.votes = votes;
  productChart.destroy();
}

// function resetChart() {
//   votes = [];
//   names = [];
//   data.labels = names;
//   data.datasets.votes = votes;
//   productChart.reset();
// }

productPageLoad();
// ++++++++++++++++++++++++++++++++++++++++++++
// EVENT LISTENERS
// ++++++++++++++++++++++++++++++++++++++++++++

document.getElementById('votingsection').addEventListener('click', voteEventHandler);

document.getElementById('render-chart').addEventListener('click', function() {
  renderChart();
});

document.getElementById('clear-chart').addEventListener('click', function() {
  clearChart();
});

// document.getElementById('reset-chart').addEventListener('click', function() {
//   resetChart();
// });
