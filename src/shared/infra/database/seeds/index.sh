#!/bin/bash

execute() {
    local command="$1"

    eval $command & # Roda o comando que foi passado como string em background
    pid=$! # Captura o PID do processo que está sendo executado em background

    wait $pid # Similar ao `await` do JavaScript, espera o processo em background terminar
    status=$? # $? pega o status de retorno do último comando executado

    if [ $status -ne 0 ]; then # -ne é o operador de comparação "not equal"
        exit 1 # Se o status for diferente de 0, encerra o script e "quebra" o terminal
    fi
}

DIR_PATH="./dist/shared/infra/database/seeds"

execute "node $DIR_PATH/checkDatabaseReady.js"

execute "node $DIR_PATH/admin.js"

node $DIR_PATH/end.js
