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

const returnChannel = (channelName, data) => {
	console.log(typeof channelName);
	// console.info(channelName, data);

	/* 	for (var i = 0; i < data.length; i += 4) {
		data[i] = data[i]; // Red
		data[i + 1] = 0; // Green
		data[i + 2] = 0; // Blue
	} */
	/* 	function isBigEnough(element, i, data) {
		i < 48 && i % 4 === 0 ? console.info(element) : null;
		return element >= 10;
	} */

	let arr = [19, 29, 39, 255, 18, 28, 38, 255, 15, 25, 35, 255, 14, 24, 34, 255, 13, 23, 33, 255, 16, 26, 36, 255, 17, 27, 37, 255, 15, 25, 35, 255, 16, 26, 36, 255, 16, 26, 36, 255, 16, 26, 36, 255, 16, 26, 36, 255, 15];

	console.log(`arr: ${arr}`);
	let newArr = arr.map((element, index) => {
		// createLayer.red(element);
		//red
		/* 		const renderRed = channelName === 'red' && (index % 4 === 1 || index % 4 === 2);
		const renderGreen = channelName === 'green' && (index % 4 === 0 || index % 4 === 2);
		const renderBlue = channelName === 'blue' && (index % 4 === 0 || index % 4 === 1);
		console.log(renderRed);
		// console.log(`${channelName} ${element} red: ${renderRed}, green:${renderGreen}, blue: ${renderBlue}`);
		// index % 4 === 0 || index % 4 === 3 ? null : (element = 0);
		switch ((element, index)) {
		case 'renderRed':
			return (element = 0);
		case 'renderGreen':
			console.log(`${channelName} element`);
			return (element = 0);
		case 'renderBlue':
			console.log(`${channelName} element`);
			return (element = 0);

		default:
			return element;
						// break;
		} */

		if (channelName === 'red' && (index % 4 === 1 || index % 4 === 2)) {
			return (element = 0);
		} else if (channelName === 'green' && (index % 4 === 0 || index % 4 === 2)) {
			return (element = 0);
		} else if (channelName === 'blue' && (index % 4 === 0 || index % 4 === 1)) {
			return (element = 0);
		} else {
			return element;
		}
		//green
		// channelName === 'green' && index % 4 === 1 ? console.log(`${channelName}: ${index}`) : null;
		//blue
		// channelName === 'blue' && index % 4 === 2 ? console.log(`${channelName}: ${index}`) : null;
		// index % 4 === 3 ? element = 1 :
	});
	console.log(`newArr: ${newArr}`);

	/* 	for (const [i, v] of data.entries()) {
		if (channelName === 'red') {
			// i % 1 === 0 ||
		}
	} */
	// console.info(data);
};

function getChannel(channelName, image) {
	const copy = copyToCanvas(image);
	const ctx = copy.ctx;

	const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

	// console.info(imageData.data);
	const data = imageData.data;
	returnChannel(channelName, data);

	ctx.putImageData(imageData, 0, 0);

	// ctx.globalComposietOperation = 'screen';
	// ctx.fillStyle = channels[channelName];
	// ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	// ctx.drawImage(image, 0, 0);
	// ctx.globalComposietOperation = 'destination-in';
	// ctx.globalComposietOperation = 'source-over';
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

ctx.globalCompositeOperation = 'multiply';
ctx.drawImage(RGB.red, 0, 0);
// ctx.globalCompositeOperation = 'overlay';
ctx.drawImage(RGB.green, 10, 10);
// ctx.drawImage(RGB.blue, 20, 20);
// ctx.globalCompositeOperation = 'overlay';
// ctx.drawImage(image, 0, 0);
// ctx.globalCompositeOperation = 'overlay';

output.append(recombined);
