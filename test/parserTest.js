var assert = require('assert')
var tweetParser = require('../index.js')

describe('Twitter Parser', function () {
  let tweets = [
    'Migrating from Angular to React- an honest case study on @songkick by @Jack_Franklin. Watch here- http://bit.ly/2gD80W1  #reactlondon',
    'lalala @itsjoaosantos #stakeit @8798776gh @77fgfg6s'
  ]
  let users = ['123potato', 'alice']

  let expectedIssuer = '1736ujhbsjh'
  let expectedAgainst = '8798776gh'
  let expectedJudge = '77fgfg6s'
  var tweetBet = new tweetParser.TweetBet(expectedIssuer, expectedAgainst, expectedJudge)
  describe('TweetBet', function () {
    it('Issuer should be Alice', function () {
      assert.equal(tweetBet.issuer, expectedIssuer)
    })
    it('Against should be Bob', function () {
      assert.equal(tweetBet.against, expectedAgainst)
    })
    it('Judge should be Charlie', function () {
      assert.equal(tweetBet.judge, expectedJudge)
    })
  })
  describe('Parser', function () {
    let actualParsedTweet = tweetParser.parseTweet(expectedIssuer, tweets[1])
    it('Issuer should be Alice', function () {
      assert.equal(actualParsedTweet.issuer, expectedIssuer)
    })
    it('Against should be Bob', function () {
      assert.equal(actualParsedTweet.against, expectedAgainst)
    })
    it('Judge should be Charlie', function () {
      assert.equal(actualParsedTweet.judge, expectedJudge)
    })
  })
})
