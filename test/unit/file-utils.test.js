const {assert} = require('chai');
const fs = require('fs');
const utils = require('../../lib');
const {TEST_RESOURCES_PATH} = require("../test.utils");

describe('file-utils', function () {

    before(function() {
       let dir = TEST_RESOURCES_PATH + '/_temp_';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    });

    after(function () {
        fs.unlinkSync(TEST_RESOURCES_PATH + '/_temp_/write.json');
        fs.unlinkSync(TEST_RESOURCES_PATH + '/_temp_/write.txt');
        fs.unlinkSync(TEST_RESOURCES_PATH + '/copy/a.json');
        fs.unlinkSync(TEST_RESOURCES_PATH + '/copy/b.json');
    });

    it('#readJsonFileSync()', function () {
        let obj = utils.readJsonFileSync(TEST_RESOURCES_PATH + '/sample.json');
        assert.equal(obj.title, 'Hello');
    });

    it('#writeJsonFileSync()', function () {
        utils.writeJsonFileSync(TEST_RESOURCES_PATH + '/_temp_/write.json', {title: 'Write'});
        let obj = utils.readJsonFileSync(TEST_RESOURCES_PATH + '/_temp_/write.json');
        assert.equal(obj.title, 'Write');
    });

    it('#writeFileSync()', function () {
        utils.writeFileSync(TEST_RESOURCES_PATH + '/_temp_/write.txt', 'Write');
        let str = utils.readFileSync(TEST_RESOURCES_PATH + '/_temp_/write.txt');
        assert.equal(str, 'Write');
    });

    it('#readJsonFilesFromPathSync()', function () {
        let objs = utils.readJsonFilesFromPathSync(TEST_RESOURCES_PATH + '/path/**.json');
        assert.equal(objs[0].title, 'a');
        assert.equal(objs[1].title, 'b');
    });

    it('#copySync()', function () {
        utils.copySync(TEST_RESOURCES_PATH + '/path', TEST_RESOURCES_PATH + '/copy');
        let objs = utils.readJsonFilesFromPathSync(TEST_RESOURCES_PATH + '/copy/**.json');
        assert.equal(objs[0].title, 'a');
        assert.equal(objs[1].title, 'b');
    });

});
