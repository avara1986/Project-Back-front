
Requirements
============

The project need vagrant to run the instances.

Installing Virtualbox
---------------------
    
    sudo apt-get install virtualbox

Installing Vagrant
------------------

    sudo apt-get install vagrant
    
Install the dkms package to ensure that the VirtualBox host kernel modules (vboxdrv, vboxnetflt and vboxnetadp) are properly updated if the Linux kernel version changes during the next apt-get upgrade.

    sudo apt-get install virtualbox-dkms
    
    

Install the project
===================

    vagrant up
    
Access the front-end:
    
    vagrant ssh front

Access the back-end:
    
    vagrant ssh back
    
    
Front End
=========
https://github.com/Swiip/generator-gulp-angular

Start server:

    vagrant ssh front
    cd front
    bower install
    npm install
    gulp serve

URL
^^^

    http://192.168.100.4:3000/
    
Back End
=========
https://github.com/Swiip/generator-gulp-angular

Start server:

    vagrant ssh back
    workon back
    cd back
    pip install -r requirements-dev.txt 
    ./manage.py runserver 0.0.0.0:8000

URL
^^^

    http://192.168.100.3:8000/
