#!/bin/bash

HERE=`pwd`
NODE_MODULES=$HERE/node_modules

ALGORITHMS=$HERE/rpieit-algorithms
HARDWARE=$HERE/rpieit-hardware
WEB=$HERE/rpieit-web

install_dependencies(){
	npm install
}

run_server(){
	npm start
}

check_app(){
	# echo $ALGORITHMS
	# echo $HARDWARE
	# echo $WEB

	if [ -d $ALGORITHMS ]; then
		echo -e "Program for image reconstruction was exist\n"
	else
		echo -e "Error, program for image reconstruction don't exist, application terminated\n"
		exit
	fi
}

run_app(){
	if [ -d $NODE_MODULES ]; then
		echo -e "Node modules installed, running server\n"
		run_server
	else
		echo -e "Installing node modules...\n"
		install_dependencies
	fi
}

check_app
run_app

