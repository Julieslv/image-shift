

const image = document.querySelector('#source-image');

const canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');


 const drawImage = (image) => {
  // Set the canvas the same width and height of the image
  console.info(image.clientHeight);
  console.info(image.clientWidth);
  canvas.width = image.width;
  canvas.height = image.height;
  // ctx.filter = 'opacity(50%)';
  ctx.globalCompositeOperation = 'multiply';
  ctx.drawImage(image, 0, 0);
}

drawImage(image);

// Or
  // var image = new Image();
  // image.onload = function () {
  //    drawImage(image);
  // }
  // image.src = 'image.jpg';

// let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

image.data = new Uint8ClampedArray(); // WRONG
image.data[1] = 0; // CORRECT


const imageDataRed = ctx.getImageData(0, 0, canvas.width, canvas.height);
const imageDataGreen = ctx.getImageData(0, 0, canvas.width, canvas.height);
const imageDataBlue = ctx.getImageData(0, 0, canvas.width, canvas.height);
console.info(imageDataRed);
const redAlphaChanel = (data) =>   {
  console.info(data);
  data.forEach((item, i)=>{
    i < 100 ? console.info(i+= 4) : null;
  });
  for (var i = 0; i < data.length; i+= 4) {
    i < 100 ? console.info(i+= 4) : null;
    data[i] = data[i]; // Red
    data[i+1] = 0; // Green
    data[i+2] = 0; // Blue
  }
}
const greenAlphaChanel = (data) =>   {
  console.info(data);
  data.forEach((item, i)=>{
    i < 100 ? console.info(i+= 4) : null;
  });
  for (var i = 0; i < data.length; i+= 4) {
    i < 100 ? console.info(i+= 4) : null;
    data[i] = 0; // Red
    data[i+1] = data[i + 1]; // Green
    data[i+2] = 0; // Blue
  }
}
const blueAlphaChanel = (data) =>   {
  console.info(data);
  data.forEach((item, i)=>{
    i < 100 ? console.info(i+= 4) : null;
  });
  for (var i = 0; i < data.length; i+= 4) {
    i < 100 ? console.info(i+= 4) : null;
    data[i] = 0; //  Red
    data[i+1] = 0//  Green
    data[i+2] = data[i + 2]; //  Blue
  }
}

redAlphaChanel(imageDataRed.data);
greenAlphaChanel(imageDataGreen.data);
blueAlphaChanel(imageDataBlue.data);


  // Update the canvas with the new data


  ctx.putImageData(imageDataRed, 0, 0);
  ctx.putImageData(imageDataGreen, 20, 20);
  ctx.putImageData(imageDataBlue, 40, 40);
