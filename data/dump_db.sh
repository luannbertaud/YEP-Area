#!/usr/bin/bash

dump_name="Area_$((1000 + $RANDOM % 10000)).dump"

if ! $(docker ps | grep -q database-container) ; then
    echo Database container not running
    exit 1
fi

pg_dump -h localhost -p 5432 -U postgres -Fc Area > $dump_name && echo "-> $dump_name"
