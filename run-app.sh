#!/bin/bash

   		 aOwnr="AnyLLM"
         aRepo="AnyLLM"

       __basedir="/home/shared/repos/${aRepo}"

         aArg1=$1; aArg2=$2; aArg3=$3
if [ "${#aArg1}" != "3" ]; then
         aArg1=$2; aArg2=$1; fi
#echo "  aArg1: '${aArg1:0:3}', aArg2: '${aArg2:0:4}'"; # exit

# ------------------------------------------------------------------------------

function help() {
    if [ "$1" != "2" ]; then
    echo ""
    echo "  Use any of the following apps in ${aRepo}:"
    echo "    server"
    echo "    collector"
    echo "    frontend"
    echo ""
    fi
    aIt="it"; if [ "${aApp}" != "" ]; then aIt="'${aApp}'"; fi
    echo "  Use ${aIt} with any of the following PM2 commands:"
    echo "    status            Show all running PM2 apps"
    echo "    start  all        Start all Apps in ${aRepo}"
    echo "    start {App}       Start an {App} in ${aRepo}"
    echo "    stop  {App}       Suspend a running {App}"
    echo "    restart {App}     Restart a suspended {App}"
    echo "    kill  {App}       Delete {App} from PM2's memory"
    echo "    info  {App}       Display {App} properties"
    echo "    logs  {App} {Cnt} Display stream of last {Cnt} log lines"
    echo "    save              Save PM2 configuration for startup"
    echo ""
    }
# -----------------------------------------------------

function doAll() {
    local aApps=$1                              # Comma-separated list of apps (e.g., "app1,app2,app3")
    local aCmd=$2                               # Command to execute (e.g., "run")
    local script_path="$(realpath "$0")"
    if [ "${aCmd}" == "" ]; then echo ""; help 2; exit; fi

    IFS=',' read -r -a apps_array <<< "$aApps"  # Split the comma-separated list into an array

    for app in "${apps_array[@]}"; do           # Loop through each app in the list
        app=$( echo "$app" | xargs )            # Trim whitespace from the app name
        if [ -n "$app" ]; then                  # Check if the app name is not empty
#       echo -e "\n  calling $script_path   $app   $aCmd"
            bash "$script_path" "$app" "$aCmd"  # Call the script with its full path, the current app, and the command
        fi
    done
    }
# -----------------------------------------------------

function  setDir() {
    if [ "${1:0:3}"      == "all"  ]; then aApp="all"; fi
    if [ "${1:0:3}"      == "ser"  ]; then aApp="ser"; aName="AnyLLM_Server-3001";    aPort="3000"; aAppDir="server";    fi
    if [ "${1:0:3}"      == "col"  ]; then aApp="col"; aName="AnyLLM_Collector-8888"; aPort="8888"; aAppDir="collector"; fi
    if [ "${1:0:3}"      == "fro"  ]; then aApp="fro"; aName="AnyLLM_Frontend-3000";  aPort="3001"; aAppDir="frontend";  fi
#   echo "  aApp:  '${aApp}', aName: '${aName}', aAppDir='${aAppDir}', aArg2: '${aArg2}'" ; # exit
    cd "${__basedir}/${aAppDir}"
    }

    if [ "${aArg2:0:4}"  == "save" ]; then echo ""; pm2 save;   echo ""; exit; fi
    if [ "${aArg2:0:4}"  == "stat" ]; then          pm2 status; echo ""; exit; fi
#   if [ "${aArg2:0:4}"  == "star" ]; then aApp="all"; fi

          setDir ${aArg1}
    if [ "${aApp}"       == ""     ]; then help; exit; fi
    if [ "${aApp}"       == "hel"  ]; then help; exit; fi
    if [ "${aApp}"       == "all"  ]; then doAll "ser,col,fro" ${aArg2}; exit; fi

    echo ""
#   cd "${__basedir}/${aAppDir}"
    if [ "${aArg2:0:4}"  == "star" ]; then bCmd="1";
         if [ "${aApp}"  == "ser"  ]; then setDir ser; pm2 start npm --name "${aName}" -- run dev ; fi
         if [ "${aApp}"  == "col"  ]; then setDir col; pm2 start npm --name "${aName}" -- run dev ; fi
         if [ "${aApp}"  == "fro"  ]; then setDir fro; pm2 start npm --name "${aName}" -- run dev ; fi
    fi
    if [ "${aArg2:0:4}"  == "save" ]; then bCmd="1";   pm2 save;    fi
    if [ "${aArg2:0:4}"  == "stat" ]; then bCmd="1";   pm2 status;  fi
    if [ "${aArg2:0:4}"  == "stop" ]; then bCmd="1";   pm2 stop    "${aName}"; fi
    if [ "${aArg2:0:4}"  == "rest" ]; then bCmd="1";   pm2 restart "${aName}"; fi
    if [ "${aArg2:0:4}"  == "info" ]; then bCmd="1";   pm2 info    "${aName}"; fi
    if [ "${aArg2:0:4}"  == "kill" ]; then bCmd="1";   pm2 delete  "${aName}"; fi
    if [ "${aArg2:0:4}"  == "dele" ]; then bCmd="1";   pm2 delete  "${aName}"; fi
    if [ "${aArg2:0:4}"  == "logs" ]; then bCmd="1";   pm2 logs    "${aName}" --lines ${aArg3}; fi

    if [ "${bCmd}" != "1" ]; then help 2; exit; fi
    echo ""

# ------------------------------------------------------------------------------
