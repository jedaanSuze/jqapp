var fs = require('fs');
module.exports = function (done) {
    let dir = './_tmp';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log('📁  folder created:', dir);
        done();
    } else {
        done();
    }
};
