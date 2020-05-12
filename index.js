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
	canvas.width = w - 6;
	canvas.height = h - 6;
	canvas.ctx = canvas.getContext('2d');
	return canvas;
};

const image = document.querySelector('#source-image');
const output = document.querySelector('.output');

const RGB = channels(image);
const newCanvas = createCanvas(RGB.red.width, RGB.red.height);
output.append(newCanvas);

const ctx = newCanvas.ctx;
const w = ctx.canvas.width;
const h = ctx.canvas.height;

const animateChannel = (channelName, x, y, delay) => {};
ctx.globalCompositeOperation = 'screen';

let fps, fpsInterval, startTime, now, then, elapsed;

const animate = () => {
	// calc elapsed time since last loop
	now = Date.now();
	elapsed = now - then;
	// if enough time has elapsed, draw the next frame
	if (elapsed > fpsInterval) {
		// Get ready for next frame by setting then=now, but...
		// Also, adjust for fpsInterval not being multiple of 16.67
		then = now - elapsed % fpsInterval;
		// draw stuff here
		ctx.save();
		ctx.clearRect(0, 0, w, h);

		let angle = 0;
		let cx = 6;
		let cy = 6;
		let radius = 3;

		angle += 1;

		let x = cx + radius * Math.cos(angle);
		let y = cy + radius * Math.sin(angle);

		ctx.drawImage(RGB.red, Math.floor(x * Math.random()), Math.floor(y * Math.random()));
		ctx.drawImage(RGB.green, Math.floor(x * Math.random()), Math.floor(y * Math.random()));
		ctx.drawImage(RGB.blue, Math.floor(x * Math.random()), Math.floor(y * Math.random()));
		ctx.restore();
	}
	requestAnimationFrame(animate);
};
const startAnimating = fps => {
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;
	animate();
};

startAnimating(8);
