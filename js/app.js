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

const productImageIds = [
  'productone',
  'producttwo',
  'productthree',
];

let allProducts = [];

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
  for(let i = 0; i < productNameList.length; i++) {
    let productReference = productNameList[i].split('.');

    new ProductImage(productReference[0], productReference[1]);
  }
}

function showRandomProductImage() {
  let productImageCheck = [];

  for(let i = 0; i < productImageIds.length; i++) {
    let randomProductImage = randomize();
    let product = allProducts[randomProductImage];
    let productImage = document.getElementById(productImageIds[i]);

    productImageCheck.push(productImage);
    allProducts[randomProductImage].views++;

    // for(let j = 0; j < productImageCheck.length; j ++) {
    //   while(productImageCheck[j] === productImageCheck[j -1]) {
    //     randomProductImage = Math.floor(Math.random() *allProducts.length);
    //     console.log('duplicate found');
    //   }
    // }

    for(let j = 0; j < productImageCheck.length; j++) {
      let valuesSoFar = [];
      let value = productImageCheck[i].alt;
      if (valuesSoFar.indexOf(value) !== -1) {
        randomize();
      }
      valuesSoFar.push(value);
    }

    // while (productImageCheck.alt === product.name) {
    //   randomProductImage = randomize();
    //   console.log('duplicate found');
    // }

    // Object.assign() solution suggested by George Mauer with Operation Code
    Object.assign(productImage, {
      src: product.filepath,
      alt: product.name,
      title: product.name,
    });

    console.log(productImageIds[i]);
    console.log(productImage.alt);
    console.log(productImageCheck[i].alt);
    console.log(allProducts[randomProductImage].name);
  }
}

function randomize() {
  return Math.floor(Math.random() * allProducts.length);
}

showRandomProductImage();

//previous code for reference

// const productImageOne = document.getElementById('productone');
// const productImageTwo = document.getElementById('producttwo');
// const productImageThree = document.getElementById('productthree');

// function showRandomProductImage() {
//   let randomProductOne = Math.floor(Math.random() * allProducts.length);
//   let randomProductTwo = Math.floor(Math.random() * allProducts.length);
//   let randomProductThree = Math.floor(Math.random() * allProducts.length);


//   allProducts[randomProductOne].views++;
//   allProducts[randomProductTwo].views++;
//   allProducts[randomProductThree].views++;

//   while (productImageOne.alt === allProducts[randomProductOne].name) {
//     random = Math.floor(Math.random() * allProducts.length);
//     console.log('duplicate found');
//   }

//   productImageOne.src = allProducts[randomProductOne].filepath;
//   productImageOne.alt = allProducts[randomProductOne].name;
//   productImageOne.title = allProducts[randomProductOne].name;
//   productImageTwo.src = allProducts[randomProductTwo].filepath;
//   productImageTwo.alt = allProducts[randomProductTwo].name;
//   productImageTwo.title = allProducts[randomProductTwo].name;
//   productImageThree.src = allProducts[randomProductThree].filepath;
//   productImageThree.alt = allProducts[randomProductThree].name;
//   productImageThree.title = allProducts[randomProductThree].name;
// }

