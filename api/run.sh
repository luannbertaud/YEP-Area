#!/usr/bin/env bash

EXEC_PATH=$(cd $(dirname "$0") && pwd)

echo "-> Executing directory is [$EXEC_PATH]"

if [[ "$SERV_ENABLE_SSL" == true ]] ; 
then
    echo "-> Running with SSL ..."
    if [ ! -f $EXEC_PATH/certificates/fullchain.pem ];
    then
        echo "-> Error missing SSL certificate file ($EXEC_PATH/certificates/fullchain.pem)."
        exit
    fi
    if [ ! -f $EXEC_PATH/certificates/privkey.pem ];
    then
        echo "-> Error missing SSL key file ($EXEC_PATH/certificates/privkey.pem)."
        exit
    fi
    python3 -m flask run --host 0.0.0.0 --cert=$EXEC_PATH/certificates/fullchain.pem --key=$EXEC_PATH/certificates/privkey.pem
else
    echo "-> Running without SSL ..."
    python3 -m flask run --host 0.0.0.0
fi