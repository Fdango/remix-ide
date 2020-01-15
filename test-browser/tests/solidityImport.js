'use strict'
var init = require('../helpers/init')
var sauce = require('./sauce')

module.exports = {
  before: function (browser, done) {
    init(browser, done)
  },
  '@sources': function () {
    return sources
  },
  'Test Simple Contract': function (browser) {
    browser.testContracts('Untitled.sol', sources[0]['browser/Untitled.sol'], ['test1', 'test2'])
  },
  'Test Success Import': function (browser) {
    browser.addFile('Untitled1.sol', sources[1]['browser/Untitled1.sol'])
          .addFile('Untitled2.sol', sources[1]['browser/Untitled2.sol'])
          .switchFile('browser/Untitled1.sol')
          .verifyContracts(['test6', 'test4', 'test5'])
  },

  'Test Failed Import': function (browser) {
    browser.addFile('Untitled3.sol', sources[2]['browser/Untitled3.sol'])
          .clickLaunchIcon('solidity')
          .assert.containsText('#compileTabView .error pre', 'Unable to import "browser/Untitled11.sol": File not found')
          .end()
  },

  'Test Github Import': function (browser) {
    browser.addFile('Untitled4.sol', sources[3]['browser/Untitled4.sol'])
          .verifyContracts(['test7', 'ERC20', 'SafeMath'])
          .end()
  },
  tearDown: sauce
}

var sources = [
  {
    'browser/Untitled.sol': {content: 'contract test1 {} contract test2 {}'}
  },
  {
    'browser/Untitled1.sol': {content: 'import "./Untitled2.sol"; contract test6 {}'},
    'browser/Untitled2.sol': {content: 'contract test4 {} contract test5 {}'}
  },
  {
    'browser/Untitled3.sol': {content: 'import "./Untitled11.sol"; contract test6 {}'}
  },
  {
    'browser/Untitled4.sol': {content: 'import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol"; contract test7 {}'}
  }
]
