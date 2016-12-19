'use strict';

(function() {

    class DetailAdminController {
        constructor(User, Auth, $http, $state) {
            // Use the User $resource to fetch all users
            // this.users = User.query();
            this.Auth = Auth;
            this.currentUser  = Auth.getCurrentUser();
            console.log('Current User', this.currentUser);
            this.$http = $http;
            this.$state = $state;
            this.params = this.$state.params.id;
            console.log('Params: ', this.params);
            // this.submitted = false;
            // get single user 
            this.$http.get('/api/users/' + this.params)
                .then(response => {
                    this.user = response.data;
                    this.user._id = this.params;
                    console.log('single User: ', this.user);
                });
        }

        updateUser(form1) {
            this.submitted = true;

            if (form1.$valid) {
                console.log('update user triggered');
                this.Auth.updateUser(this.user.firstname, this.user.name, this.user.role, this.user._id)
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
