'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $translate) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.$translate = $translate;
  }

  onInit() {}

  changeLanguage(langKey) {
    this.$translate.use(langKey);
  };

}

angular.module('weindbApp')
  .controller('NavbarController', NavbarController);
