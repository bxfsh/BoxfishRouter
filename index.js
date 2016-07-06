var curl = require('boxfishcurl');

;(function(global) {

  'use strict';

  /**
   * ad box is the micro service router
   *
   * more info: https://boxfish.atlassian.net/wiki/pages/viewpage.action?pageId=48136284
   */
  var AdBoxService = function(token, options) {
    this.token = token;
    this.options = options;
  };

  /**
   * [Type description]
   *
   *    curl -i -X GET
   *    -H "Content-Type:application/json"
   *    -H "token:c1a25bb8-8f4f-4033-818e-7f3c3729977b"
   *    http://staging-microservices.boxfish.com:8080/epg/programs/search/walking
   *
   * @param {object} curl options
   * @param {bool} whether authetication is required or not
   * @type {object} deferred
   *
   */
  AdBoxService.prototype.req = function req(options, requireAuth) { //jshint ignore:line

    var headers = {};

    headers = options.headers || {};

    // we add the token by default
    if (typeof requireAuth == 'undefined' || requireAuth) {
      headers.token = this.token;
    }

    // if (typeof sails !== 'undefined') sails.log.debug(`[boxfish-router][req][new Date()]`);

    // if (typeof sails !== 'undefined') sails.log.debug({
    //   host: this.options.host,
    //   port: this.options.port,
    //   path: options.path,
    //   method: options.method || 'GET',
    //   data: options.data,
    //   headers: headers
    // });

    console.log({
      host: this.options.host,
      port: this.options.port,
      ssl: this.options.protocol && this.options.protocol === 'https',
      path: options.path,
      method: options.method || 'GET',
      data: options.data,
      headers: headers
    });

    return curl.req({
      host: this.options.host,
      port: this.options.port,
      ssh: this.options.protocol && this.options.protocol === 'https',
      ssl: this.options.protocol && this.options.protocol === 'https',
      path: options.path,
      method: options.method || 'GET',
      data: options.data,
      headers: headers
    });

  };

  global.AdBoxService = AdBoxService;

})(this);

module.exports = this.AdBoxService;
