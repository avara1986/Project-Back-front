# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  config.vm.define "back" do |back|
    back.vm.box = "hashicorp/precise64"

    back.vm.provision :shell, :path => "bootstrap_back.sh"

    back.vm.network "private_network", ip: "192.168.100.3"

    back.vm.network "public_network"

  end
  config.vm.define "front" do |front|
    front.vm.box = "hashicorp/precise64"

    front.vm.provision :shell, :path => "bootstrap_front.sh"

    front.vm.network "private_network", ip: "192.168.100.4"

    front.vm.network "public_network"

  end
end
