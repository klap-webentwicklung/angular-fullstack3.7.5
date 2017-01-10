# weindb
This project was generated with [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.5.

###Job description

Implementing a reset password procedure. Some thing like that: (feel free to suggest diffrent procedure if not acurate).

1. User navigates to /forgotpass where he can enter his email, which gets verified, if ok, send mail with nodemailer and notify usser with msg on screen.

2. The email contains a link, which contains a token which was genereted and which expires in some time.

3. By clicking the link in the email the user gets to /resetpass, where he can set a new password, if token is valid.

4. User is redirected to the login page and is notified that new password has been set and he should login with it.

###Current progress

Nodemailer is installed and works. Angular-UI-Bootstrap is instlled, directive "modal" has to be used for the user notifications.

###Expected deliverables

A working secure procedure as described with the given dependencies.

###Deadline

13/1

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
