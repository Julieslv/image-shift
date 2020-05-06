const copyToCanvas = image => {
	const can = document.createElement('canvas');
	can.width = image.naturalWidth || image.width;
	can.height = image.naturalHeight || image.height;
	can.ctx = can.getContext('2d');
	can.ctx.drawImage(image, 0, 0);
	return can;
};

const getNewChannelData = (channelName, data) => {
	let newChannelData = data.map((element, index) => {
		if (channelName === 'red' && (index % 4 === 1 || index % 4 === 2)) {
			return (element = 0);
		} else if (channelName === 'green' && (index % 4 === 0 || index % 4 === 2)) {
			return (element = 0);
		} else if (channelName === 'blue' && (index % 4 === 0 || index % 4 === 1)) {
			return (element = 0);
		} else {
			return element;
		}
	});
	return newChannelData;
};

const getChannel = (channelName, image) => {
	const copy = copyToCanvas(image);
	const ctx = copy.ctx;
	const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	const data = imageData.data;
	const newImageData = getNewChannelData(channelName, data);
	data.set(newImageData);
	ctx.putImageData(imageData, 0, 0);
	return copy;
};

const seperateRGB = image => {
	return {
		red: getChannel('red', image),
		green: getChannel('green', image),
		blue: getChannel('blue', image),
	};
};

const createCanvas = (w, h) => {
	const can = document.createElement('canvas');
	can.width = w;
	can.height = h;
	can.ctx = can.getContext('2d');
	return can;
};

const image = document.querySelector('#source-image');
const output = document.querySelector('.output');

const RGB = seperateRGB(image);
const recombined = createCanvas(RGB.red.width, RGB.red.height);
const ctx = recombined.ctx;
const w = ctx.canvas.width;
const h = ctx.canvas.height;
let y = 0;
let x = 10;
let directionY = 'up';
let directionX = 'up';
ctx.globalCompositeOperation = 'screen';

const animate = () => {
	ctx.save();
	ctx.clearRect(0, 0, w, h);
	// Draw here
	console.log(`x: ${x}`);
	// console.log(`y: ${y}`);
	directionY = y === 40 ? 'down' : y === 0 ? 'up' : directionY;
	directionX = x === 20 ? 'down' : x === 0 ? 'up' : directionX;
	console.log(directionX);
	directionY === 'up' ? y++ : y--;
	directionX === 'up' ? x++ : x--;
	console.log(`x after up: ${x}`);
	ctx.drawImage(RGB.red, x, y);
	ctx.drawImage(RGB.green, 10, 10);
	ctx.drawImage(RGB.blue, 20, 20);
	// x < 30 ? x++ : x--;
	// x = 0;
	ctx.restore();
};

const animateInterval = setInterval(animate, 30);

ctx.drawImage(RGB.red, 0, 0);
ctx.drawImage(RGB.green, 10, 10);
ctx.drawImage(RGB.blue, 20, 20);

output.append(recombined);
