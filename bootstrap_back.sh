#!/bin/bash
if ! [ -L /home/vagrant/back ]; then
  rm -rf /home/vagrant/back
  ln -fs /vagrant/back /home/vagrant/back
fi
PROJECT_DIR=/home/vagrant/back
USER_HOME=/home/vagrant/

echo "Environment installation is beginning. This may take a few minutes.."

##
#	Install core components
##

echo "Updating package repositories.."
apt-get update

echo "Installing required packages.."
apt-get -y install git

echo "Installing and upgrading pip.."
apt-get -y install python-setuptools
easy_install -U pip

echo "Installing required packages for NFS file sharing for vagrant.."
apt-get -y install nfs-common

echo "Installing required packages for postgres.."
apt-get -y install postgresql

echo "Installing python dependencies"
apt-get install -y build-essential binutils-doc autoconf flex bison libjpeg-dev
apt-get install -y libfreetype6-dev zlib1g-dev libzmq3-dev libgdbm-dev libncurses5-dev
apt-get install -y automake libtool libffi-dev curl git tmux gettext

echo "Installing required packages for python ..."
apt-get install -y python3 python3-pip python-dev python3-dev python-pip

echo "Installing virtualenvwrapper from pip.."
pip install virtualenvwrapper

##
#	Setup the database
##

echo "Configuring postgres.."
sudo -u postgres psql -c "create user vagrant with password 'vagrant';"
sudo -u postgres psql -c "create database vagrant;"
sudo -u postgres psql -c "grant all privileges on database vagrant to vagrant;"

##
#	Setup virtualenvwrapper
##
echo "source /usr/local/bin/virtualenvwrapper.sh" >> ${USER_HOME}/.bashrc

##
#	Setup virtualenv
##
echo "Install the virtual environment.."
sudo su - vagrant /bin/bash -c "source /usr/local/bin/virtualenvwrapper.sh;cd ${PROJECT_DIR};mkvirtualenv -p /usr/bin/python3.4 back; deactivate;"

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