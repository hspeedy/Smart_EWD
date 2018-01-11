const fs = require('fs');
const execSync = require('child_process').execSync;

module.exports = function(context) {
    console.log('Building TestWeb application into "./www" directory.');
    const basePath = context.opts.projectRoot;
    const baseWWW = basePath + '/www';

    console.log(execSync(
        'ng build --target=production --environment=cordova --base-href . --output-path ./../App/www/',
        //'ng build --target=development --environment=cordova --base-href . --output-path ./../App/www/',
        {
            maxBuffer: 1024 * 1024,
            cwd: basePath + '/../WebUI'
        }).toString('utf8'));
};