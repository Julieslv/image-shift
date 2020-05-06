function copyToCanvas(image) {
	const can = document.createElement('canvas');
	can.width = image.naturalWidth || image.width;
	can.height = image.naturalHeight || image.height;
	can.ctx = can.getContext('2d');
	can.ctx.drawImage(image, 0, 0);
	return can;
}

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

function getChannel(channelName, image) {
	const copy = copyToCanvas(image);
	const ctx = copy.ctx;
	const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	const data = imageData.data;
	const newImageData = getNewChannelData(channelName, data);
	data.set(newImageData);
	ctx.putImageData(imageData, 0, 0);
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

ctx.globalCompositeOperation = 'screen';
ctx.drawImage(RGB.red, 0, 0);
ctx.drawImage(RGB.green, 10, 10);
ctx.drawImage(RGB.blue, 20, 20);

output.append(recombined);
