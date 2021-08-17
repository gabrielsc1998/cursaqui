const fs = require('fs');
const path = require('path');

const { 

} = require('./doc')

const getTagRefByDir = (dir) => {
	const TAGS_REF = {

  };
  return TAGS_REF[dir] || '';
}

module.exports = (dirName) => {
	// dirName != undefined ? dirName = `${__dirname}/${dirName}` : dirName = __dirname;
	fs
		.readdirSync(dirName)
		.sort((a, b) => fs.statSync(`${dirName}/${a}`).mtime.getTime() - fs.statSync(`${dirName}/${b}`).mtime.getTime())
		.forEach(subDir => {
			if(subDir.indexOf('.js') === -1) {
				const files = fs.readdirSync(`${dirName}/${subDir}`);
				if(files.length != 0) {
					const readIndexJs = files.filter(file => file === 'index.js').toString();
					
					const pathResolved = path.resolve(`${dirName}/${subDir}`, readIndexJs);
					
					const read = fs.readFileSync(pathResolved, 'utf8');

					const REGEX = /#swagger.tags = \['[a-z 0-9 \wÀ-ú ._-]*'\]/ig;
					const TAG_REF = getTagRefByDir(subDir);
					const fileChanged = read.replace(REGEX, `#swagger.tags = ['${TAG_REF}']`);
					fs.writeFileSync(pathResolved, fileChanged, 'utf8', function (err) {
						if (err) return console.log(err);
					});
				}
			}
		});
};

