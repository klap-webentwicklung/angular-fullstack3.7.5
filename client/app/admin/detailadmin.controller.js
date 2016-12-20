'use strict';

(function() {

    class DetailAdminController {
        constructor(User, Auth, $http, $state) {

            this.Auth = Auth;
            this.$http = $http;
            this.$state = $state;
            // grab the state-params from url
            this.params = this.$state.params.id;
            // get single user 
            this.$http.get('/api/users/' + this.params)
                .then(response => {
                    this.user = response.data;
                    // add id to the user obj
                    this.user._id = this.params;
                });
        }

        updateUser(form1) {
            this.submitted = true;

            if (form1.$valid) {
                this.Auth.updateUserRole(this.user.role, this.user._id)
                    .then(() => {
                        this.message = 'User updated successfully.';
                    })
                    .catch(() => {
                        this.message = 'something went wrong';
                    });
            }
        }

    }

    angular.module('weindbApp.admin')
        .controller('DetailAdminController', DetailAdminController);
})();
