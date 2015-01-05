var Q = require('q'),
    settings = require('../../../../lib/settings'),
    print = require('../../../../lib/helper/print'),
    pathHelper = require('../../../../lib/helper/path')
    exec = require('child_process').exec,
    path = require('path');

module.exports = function (msg) {
    var manifestPath = path.join(pathHelper.app(), 'platforms', 'android'),
        cmd = "android -s update project -p '" + manifestPath + "' -s",
        options = {
            timeout : 0,
            maxBuffer: 1024 * 400
        },
        defer = Q.defer();

    var child = exec(cmd, options, function (err, stdout, stderr) {
        if(err) {
            if(msg.verbose) {
                print.error('command: %s', cmd);
                print.error('android stderr %s', stderr);
            }
            defer.reject('android ' + err);
            return;
        }
        if(msg.verbose) print.success('updated android project!');
        defer.resolve(msg);
    });
    if (msg.verbose) {
        child.stdout.pipe(process.stderr);
    }
    return defer.promise;
};
