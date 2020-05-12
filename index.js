const copyToCanvas = image => {
	const canvas = document.createElement('canvas');
	canvas.width = image.naturalWidth || image.width;
	canvas.height = image.naturalHeight || image.height;
	canvas.ctx = canvas.getContext('2d');
	canvas.ctx.drawImage(image, 0, 0);
	return canvas;
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

const channels = image => {
	return {
		red: getChannel('red', image),
		green: getChannel('green', image),
		blue: getChannel('blue', image),
	};
};

const createCanvas = (w, h) => {
	const canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	canvas.ctx = canvas.getContext('2d');
	return canvas;
};

const image = document.querySelector('#source-image');
const output = document.querySelector('.output');

const RGB = channels(image);
const recombined = createCanvas(RGB.red.width, RGB.red.height);
const ctx = recombined.ctx;
const w = ctx.canvas.width;
const h = ctx.canvas.height;
let y = 0;
let x = 0;
let directionY = 'up';
let directionX = 'up';

const animateChannel = (channelName, x, y, delay) => {};
ctx.globalCompositeOperation = 'screen';

const animate = () => {
	requestAnimationFrame(animate);
	ctx.save();
	ctx.clearRect(0, 0, w, h);
	// Draw here
	directionY = y === 10 ? 'down' : y === -10 ? 'up' : directionY;
	directionX = x === 10 ? 'down' : x === -10 ? 'up' : directionX;
	directionY === 'up' ? y++ : y--;
	directionX === 'up' ? x++ : x--;

	ctx.drawImage(RGB.red, Math.floor(x * Math.random()), y);
	ctx.drawImage(RGB.green, x, Math.floor(y * Math.random()));
	ctx.drawImage(RGB.blue, Math.floor(x * Math.random()), Math.floor(y * Math.random()));
	ctx.restore();
};
animate();

output.append(recombined);
