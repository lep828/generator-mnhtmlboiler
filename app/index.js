'use strict';
var path       = require('path');
var generators = require('yeoman-generator');
var extend     = require('deep-extend');
var mkdirp     = require('mkdirp');
var chalk      = require('chalk');
var yosay      = require('yosay');

module.exports = generators.Base.extend({


  initializing : function(){
    this.answers = {};
    this.pkg     = require('../package.json');
    var self     = this;
  },


  /**
   * Prompts the user for project information
   */
  prompting : function(){

    var done = this.async();


    // Have Yeoman greet the user.
    this.log(yosay(chalk.red('Project Creator ') + '\n✌(-‿-)✌\n'));
    this.log(chalk.white.bgRed.bold(" Tip of the day: 1+1 !== '2' "));

    // Ask away
    var prompts = [
      {
        type     : 'input',
        name     : 'name',
        message  : 'Your project name',
        default  : this.appname,
        validate : function(input){
          return true; // actually need to validate
        }
      },
      {
        type     : 'checkbox',
        name     : 'libs',
        message  : 'Libs to install',
        choices  : [
          {
            name    : 'jquery',
            checked : true
          },
          {
            name : 'moment',
            checked : true
          },
          {
            name : 'firebase',
            checked : false
          }
        ],
        validate : function(input){
          return true; // actually need to validate
        }
      },
      {
        type    : "list",
        name    : "css",
        message : "CSS or SCSS",
        choices : ["CSS", "SCSS"]
      }
    ];


    // Parse answers
    this.prompt(prompts, function(answers){
      this.answers = answers;
      done();
    }.bind(this));

  },

  /**
   * handles the actual copying of files
   * **/
  writing : {

    html : function(){

      // index.html
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'),
        {}
      );

    },

    css : function(){

      // Styles
      if(this.answers.css === 'CSS'){
        this.fs.copyTpl(
          this.templatePath('_css/_styles.css'),
          this.destinationPath('css/styles.css')
        );
      } else{
        this.fs.copyTpl(
          this.templatePath('_css/_styles.scss'),
          this.destinationPath('css/styles.scss')
        );
      }

    },

    js : function(){

      // Scripts
      this.fs.copyTpl(
        this.templatePath('_js/_scripts.js'),
        this.destinationPath('js/scripts.js')
      );

    },

    readme : function(){

      // README.md
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        {
          'project_name' : this.answers.name
        }
      );

    },

    bower : function(){

      var bowerJson = {
        name         : this.appname,
        private      : true,
        dependencies : {}
      };

      this.fs.writeJSON('bower.json', bowerJson);

    }

  },

  /**
   * Installs deps for our project
   */

  install : function(){
    this.bowerInstall(this.answers.libs, {'save' : true});
  }

});