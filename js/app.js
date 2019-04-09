const productone = document.getElementById('productone');
const producttwo = document.getElementById('producttwo');
const productthree = document.getElementById('productthree');

let allProducts = [];
let previousProductImage = [];
let currentProductImage = [];

function ProductImage(name, extension) {
  this.extension = extension;
  this.filepath = `../assets/${name}.${extension}`;
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
}

function handleProductImageClick() {
  showRandomProductImage();
}

function aggregateVote(product) {
  for (var i = 0; i < allProducts.length; i++) {
    if (product === allProducts[i].name) {
      allProducts[i].votes++;
      console.log(allProducts[i].votes);
      // updateChartArrays();
    }
  }
}

showRandomProductImage();

productone.addEventListener('click', handleProductImageClick);
producttwo.addEventListener('click', handleProductImageClick);
productthree.addEventListener('click', handleProductImageClick);

document.getElementById('votingsection').addEventListener('click', function(event) {
  if (event.target.id !== 'votingsection') {
    aggregateVote(event.target.alt);
  }

  // if (chartDrawn) {
  //   songChart.update();
  // }
});
