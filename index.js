
/**
 * AdBoxMicroService connector
 * @param  {[type]} global [description]
 * @return {[type]}        [description]
 */
;(function(module) {

  'use strict';

  var promise     = require('promised-io/promise');
  var curl        = require('boxfishcurl');
  var consul      = require('boxfishconsul');

  /**
   * Constructor
   * @param {string} serviceName 
   */
  var AdBoxMicroService = function() { };

  /**
   * Initialise the service
   * @param  {[type]} serviceName [description]
   * @return {[type]}             [description]
   */
  AdBoxMicroService.prototype.init = function init(serviceName) {

    var self = this;
    var deferred = promise.defer();
    this.serviceName = serviceName;

    // discover the service 
    consul.findService(serviceName).then(function(api) { 
      // trying to get the API instance
      self.api = api;
      deferred.resolve(self);
    }, function(err) { 
      // API not available
      var message = 'Service ' + self.serviceName + ' is not available ... ' + err;
      console.log(message);
      deferred.reject(message);
    });

    return deferred;

  };

  /**
   * make a reqquest to the current isntance
   * @param  {[type]} path   [description]
   * @param  {[type]} method [description]
   * @param  {[type]} data   [description]
   * @return {[type]}        deferred promise
   */
  AdBoxMicroService.prototype.req = function req(path, method, data, headers) {

    return curl.req({
      host: this.api.Address || sails.config.consul.host,
      port: this.api.Port,
      path: path,
      method: method,
      data: data,
      headers: headers
    });

  };

  module.exports = AdBoxMicroService;

})(module); // jshint ignore:line