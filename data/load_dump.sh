#!/usr/bin/bash

if ! $(docker ps | grep -q database-container) ; then
    echo Database container not running
    exit 1
fi

pg_restore -h localhost -p 5432 -U postgres -d postgres -C $1