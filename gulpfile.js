var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');
    mix.scripts([
    	'app.js'
	], 'public/js/app.js');
    mix.scripts([
        'controllers/dashboardController.js',
    	'controllers/userController.js',
        'controllers/settingController.js',
        'controllers/blogController.js',
        'controllers/staticpageController.js',
        'controllers/userManagementController.js'
	], 'public/js/controllers.js');
    mix.scripts([
        'models/dashboardModel.js',
    	'models/userModel.js',
        'models/settingModel.js',
        'models/blogModel.js',
        'models/staticpageModel.js',
        'models/userManagementModel.js'
	], 'public/js/models.js');
});
