const fs = require('fs');
const path = require('path');

fs.mkdir(
	path.join(__dirname, 'project-dist'),
	{ recursive: true },
	(err) => err
);

let copyAssets = path.join(__dirname, 'project-dist', 'assets');
fs.mkdir(copyAssets, { recursive: true }, (err) => err);

const fileBund = fs.createWriteStream(
	path.join(__dirname, 'project-dist', 'style.css')
);
const fileIndex = fs.createWriteStream(
	path.join(__dirname, 'project-dist', 'index.html')
);

const templateHtml = fs.createReadStream(
	path.join(__dirname, 'template.html'),
	'utf-8'
);

function copyFileFunc(item, folder = '') {
	fs.readdir(item, { withFileTypes: true }, (err, files) => {
		if (err) return err;
		files.forEach((file) => {
			if (file.isFile()) {
				fs.copyFile(
					item + '/' + file.name,
					copyAssets + '/' + folder + '/' + file.name,
					(err) => err
				);
			} else {
				fs.mkdir(
					path.join(__dirname, 'project-dist', 'assets', file.name),
					{ recursive: true },
					(err) => err
				);
				copyFileFunc(item + '/' + file.name, file.name);
			}
		});
	});
}

copyFileFunc(path.join('06-build-page', 'assets'));

function copyStyles(item) {
	fs.readdir(item, (err, files) => {
		if (err) return err;
		files.forEach((file) => {
			let forma = path.extname(item + file);
			if (forma == '.css') {
				appendCssStyles(file);
			}
		});
	});
}

function appendCssStyles(item) {
	const rs = fs.createReadStream(path.join(__dirname + '/styles/' + item));
	rs.pipe(fileBund);
	rs.on('error', (err) => console.log(err));
}

copyStyles('06-build-page/styles');

let data = '';

templateHtml.on('data', (chunk) => (data += chunk));
templateHtml.on('end', () => {
	let arr2 = data.split('\n');
	let arr = data.match(/{{(.*?)}}/g);
	let arr3 = [];
	arr2.forEach((el) => {
		let str = el.trim();
		arr3.push(str);
	});
	arr.forEach((el, index) => {
		let a = el.replace('{{', '').replace('}}', '');
		readHtmlFile(a, el, arr.length);
		console.log(arr.length);
	});
});
templateHtml.on('error', (error) => console.log('Error', error.message));

let count = 0;
function readHtmlFile(name, fullName, len) {
	fs.readFile(
		path.join(__dirname, 'components', `${name}.html`),
		'utf-8',
		(err, dataFile) => {
			if (err) console.log(err);
			data = data.replace(fullName, dataFile);
			if (!data.includes(fullName)) {
				count++;
				if (count == len) {
					writeIndex(data);
				}
			}
		}
	);
}

function writeIndex(text) {
	fileIndex.write(text);
}
