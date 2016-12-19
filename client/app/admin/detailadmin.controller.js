'use strict';

(function() {

  class DetailAdminController {
    constructor(User, Auth) {
      // Use the User $resource to fetch all users
      this.users = User.query();
      this.Auth = Auth;
      this.submitted = false;
    }

    delete(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }
  

  updateUser(form1, user) {
    this.submitted = true;

    if (form1.$valid) {
      console.log('update user triggered');
      this.Auth.updateUser(user.firstname, user.name, user.role)
        .then(() => {
          this.message = 'User updated successfully.';
        })
        .catch(() => {
          this.message = 'something went wrong';
        });
    }
  }

  }

  angular.module('weindbApp.detailadmin')
    .controller('AdminController', DetailAdminController);
})();
