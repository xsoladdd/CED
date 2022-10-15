#!/bin/sh


if [[ ! `which yarn` ]];
then
    # run code if app not installed
    echo "Please install yarn to proceed"
fi

# echo `node --version`

yarn install

echo "Brewing Latte 🐸"
cd ./packages/latte && yarn install
echo "Making Espresso 🐸"
cd ../espresso && yarn install
echo "Brewing Americano 🐸"
cd ../americano && yarn install
echo "Serving Affogato 🐸"
cd ../affogato && yarn install

echo "Done. Enjoy your coffee"