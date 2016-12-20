'use strict';

(function() {

  function UserResource($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      updateUser: {
        method: 'PUT'
      },
      updateUserRole: {
        method: 'PUT',
        params: {
          controller: 'role'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  }

  angular.module('weindbApp.auth')
    .factory('User', UserResource);
})();
