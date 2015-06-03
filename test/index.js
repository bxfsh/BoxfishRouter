var should = require('chai').should();
var assert = require('chai').assert;
var Router = require('../index');
    
describe('BoxfishRouter', function() {

	var token = 'your token';
	var options =  {
	  host: 'localhost',
	  port: 8080
	};
	
	it('should have the same token', function() {
		var router = new Router(token, options);
    assert.equal(token, router.token, 'token properly set');
  });

  it('it should login', function(done) {
		var router = new Router(token, options);
		router.req({
			path: '/user/login',
			data: { "email" : "clatko@boxfish.com", "password": "123123" },
			headers: { 'Content-Type': 'application/json' }
		}, true).then(function() {
			done();
		}, done);
  });

  it('it should FAIL to login', function(done) {
		var router = new Router(token, options);
		router.req({
			path: '/user/login',
			data: { "email" : "no-a-user", "password": "123" },
			headers: { 'Content-Type': 'application/json' }
		}, true).then(done, function() {
			done();
		});
  });
	
});