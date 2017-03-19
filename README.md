# Montrack
Django Blog project based on [wagtail](https://wagtail.io/) and [materialize](http://materializecss.com/) css framework. Each blog entry has a related Track

Setup
=======
### Dependencies
It is a django project, so you need have installed python3. Apart from python you need to have the following programs installed, in order you can compile js and css:
* [Nodejs](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [Gulp](http://gulpjs.com/)
* [Compass](http://compass-style.org/)
* [Sass](http://sass-lang.com/)


### Install
Once you have all the dependencies installed, you can run the following commands:

    $git clone https://github.com/carsolcas/montrack.git
    $cd montrack
    $virtualenv venv -p python3
    $source venv/bin/activate
    $pip install -r requirements.txt
    $npm install

### Util commands
You can compile the css files with the following command:

    $gulp compass

You can run the django web server:

    $source venv/bin/activate
    $npm run server