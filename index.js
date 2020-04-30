function copyToCanvas(image) {
	const can = document.createElement('canvas');

	can.width = image.naturalWidth || image.width;
	can.height = image.naturalHeight || image.height;
	can.ctx = can.getContext('2d');
	can.ctx.drawImage(image, 0, 0);
	return can;
}

const channels = {
	red: '#F00',
	green: '#0F0',
	blue: '#00F',
};

function getChannel(channelName, image) {
	const copy = copyToCanvas(image);
	const ctx = copy.ctx;
	ctx.fillStyle = channels[channelName];
	ctx.globalComposietOperation = 'multiply';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.globalComposietOperation = 'destination-in';
	ctx.drawImage(image, 0, 0);
	ctx.globalComposietOperation = 'source-over';
	return copy;
}

function seperateRGB(image) {
	return {
		red: getChannel('red', image),
		green: getChannel('green', image),
		blue: getChannel('blue', image),
	};
}

function createCanvas(w, h) {
	const can = document.createElement('canvas');
	can.width = w;
	can.height = h;
	can.ctx = can.getContext('2d');
	return can;
}

const image = document.querySelector('#source-image');
const output = document.querySelector('.output');

const RGB = seperateRGB(image);
const recombined = createCanvas(RGB.red.width, RGB.red.height);
const ctx = recombined.ctx;

ctx.drawImage(RGB.red, -2, -2);
ctx.globalCompositeOperation = 'lighter';
ctx.drawImage(RGB.green, 0, 0);
ctx.drawImage(RGB.blue, 2, 2);
ctx.globalCompositeOperation = 'destination-in';
ctx.drawImage(image, 0, 0);
ctx.globalCompositeOperation = 'source-over';

output.append(recombined);
