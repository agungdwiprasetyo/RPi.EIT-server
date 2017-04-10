#!/bin/bash

HERE=`pwd`
NODE_MODULES=$HERE/node_modules

ALGORITHMS=$HERE/RPi.EIT-algorithms
HARDWARE=$HERE/RPi.EIT-hardware
WEB=$HERE/RPi.EIT-web

install_dependencies(){
	npm install
}

run_server(){
	npm start
	#pm2 start app.js --watch
}

check_app(){
	# echo $ALGORITHMS
	# echo $HARDWARE
	# echo $WEB

	if [ -d $ALGORITHMS ]; then
		echo -e "> Program for image reconstruction is exist"
	else
		echo -e "> Program for image reconstruction don't exist,"
		echo -e "> Cloning RPi.EIT-algorithms..."
		git clone https://github.com/agungdwiprasetyo/RPi.EIT-algorithms
	fi

	if [ -d $WEB ]; then
		echo -e "> Program for web is exist\n"
	else
		echo -e "> Web source don't exist"
		echo -e "> Cloning RPi.EIT-web..."
		git clone https://github.com/agungdwiprasetyo/RPi.EIT-web
	fi
}

run_app(){
	if [ -d $NODE_MODULES ]; then
		echo -e "> Node modules installed, running server\n"
		run_server
	else
		echo -e "> Installing node modules...\n"
		install_dependencies
	fi
}

check_app
run_app

