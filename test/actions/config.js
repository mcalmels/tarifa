var should = require('should'),
    Q = require('q'),
    os = require('os'),
    format = require('util').format,
    tmp = require('tmp'),
    path = require('path'),
    setupHelper = require('../helper/setup'),
    configAction = require('../../actions/config');

function testConfig(projectDefer) {
    describe('tarifa config', function () {
        it('tarifa config icons generate red dev', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return configAction.generateIcons('red', 'dev', false);
            });
        });

        it('tarifa config splashscreens red dev', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return configAction.generateSplashscreens('red', 'dev', false);
            });
        });

        it('tarifa config icons file test.png stage', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return configAction.generateIconsFromFile(path.resolve(__dirname, '..', 'fixtures', 'momo.png'), 'stage', false);
            });
        });

    });
}

if(module.parent.id.indexOf("mocha.js") > 0) {
    var projectDefer = Q.defer();
    before('create a empty project', setupHelper(tmp, projectDefer, format('create_response_%s.json', os.platform())));
    testConfig(projectDefer);
}

module.exports = testConfig;
