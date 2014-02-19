# grunt-gss

> Google Stylesheets plugin for Grunt.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gss --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gss');
```

## The "gss" task

### Overview
In your project's Gruntfile, add a section named `gss` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gss: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.compilerPath
Type: `String`
Default value: `'.'`

A string value that is used to locate closure-stylesheets.jar.

#### options.flags
Type: `String`
Default value: `''`

Any additional parameters to closure-stylesheets.jar should be written here.

#### options.closureRenaming.rename
Type: `Boolean`
Default value: `false`

If set, stylesheets will processed with --rename CLOSURE paramter.

#### options.closureRenaming.outputFile
Type: `String`
Default value: `'cssMap.js'`

File name where css name mapping will be saved.

#### options.closureRenaming.excludeRenameClasses
Type: `Array.<String>`
Default value: `[]`

List of names to exclude when minifying gss.

### Usage Examples

```js
  grunt.initConfig({
    gss: {
      options: {
        compilerPath: '.'
      },
      dev: {
        src: ['css/styles.gss'],
        dest: 'css/styles.css',
        options: {
          flags: ['--pretty-print']
        }
      },
      prod: {
        src: ['css/styles.gss'],
        dest: 'css/styles.css',
        options: {
          closureRenaming: {
            rename: true,
            excludeRenameClasses: ['excluded-class-name'],
            outputFile: 'cssMap.js'
          }
        }
      }
    }
  });
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
