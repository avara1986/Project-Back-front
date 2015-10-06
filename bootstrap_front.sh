#!/bin/bash
if ! [ -L /home/vagrant/front ]; then
  rm -rf /home/vagrant/front
  ln -fs /vagrant/front /home/vagrant/front
fi
PROJECT_DIR=/home/vagrant/front
USER_HOME=/home/vagrant/front

echo "Environment installation is beginning. This may take a few minutes.."

##
#	Install core components
##

echo "Updating package repositories.."
apt-get update
apt-get -y install build-essential

echo "Installing required packages.."
apt-get -y install git
apt-get -y install curl


echo "Installing and Nodejs.."
curl -sL https://deb.nodesource.com/setup | bash -
apt-get -y install nodejs

echo "Installing and npm..."
apt-get -y install npm

echo "Installing Yeoman, Gulp and Bower..."
npm install -g yo gulp bower
npm install -g browser-sync

npm install -g gulp-protractor
npm install -g wiredep
npm install -g karma
npm install -g gulp-sass
npm install -g gulp-eslint
npm install -g gulp-autoprefixer
npm install -g gulp-rev

echo "Installing Gulp Angular Generator"
npm install -g generator-gulp-angular
##
#	Setup is complete.
##
echo ""
echo "The environment has been installed."
echo ""
echo "You can start the machine by running: vagrant up"
echo "You can ssh to the machine by running: vagrant ssh"
echo "You can stop the machine by running: vagrant halt"
echo "You can delete the machine by running: vagrant destroy"
echo ""
exit 0