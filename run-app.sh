#!/bin/bash
#*\
##=========+====================+================================================+
##RD         run-app            | AnyLLM PM2 Commands
##RFILE    +====================+=======+===============+======+=================+
##FD   run-app.sh               |   8331|  3/03/25 10:15|   178| v1.05`50303.1015
##FD   run-app.sh               |  10455|  3/04/25 17:45|   225| v1.05`50304.1745
##FD   run-app.sh               |  14190|  3/04/25  6:30|   266| v1.05`50306.0630
##FD   run-app.sh               |  14190|  3/08/25 19:45|   266| v1.05`50308.1945
##FD   run-app.sh               |  14190|  3/09/25 12:45|   266| v1.05`50309.1245
#
#DESC     .---------------------+-------+---------------+------+-----------------+
#            This script runs AnyLLM PM2 Commands
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#            help               |
#            setDir             |
#            setRepos           |
#            doPM2              |
#            doAll              |

#            exit_wCR           |
#                               |
##CHGS     .--------------------+----------------------------------------------+

#.(50303.02   3/03/25 RAM  4:00p| Add $aIt to help
#.(50303.02b  3/05/25 RAM  4:00p| Add another $aIt to help
#.(50304.06   3/04/25 RAM  9:45a| Display invalid command & other Opps
#.(50304.05   3/04/25 RAM  5:45p| Improve logs commands
#.(50305.01   3/05/25 RAM  7:00a| Add pm2 app commands
#.(50306.01   3/06/25 RAM  6:00a| Test pm2 all commands
#.(50306.02   3/06/25 RAM  6:30a| Add pm2 arg to be called from anyllm
#.(50308.02   3/08/25 RAM  7:45p| Fix path the ecosystem.config.cjs file
#.(50309.01   3/09/25 RAM 12:45p| Add chkPM2 and install PM2

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#*/
#========================================================================================================== #  ===============================  #

  aVer="v0.01.50304.1015"  # run-app.sh
  aVer="v0.01.50304.1745"  # run-app.sh
  aVer="v0.01.50306.0630"  # run-app.sh
  aVer="v0.01.50308.1945"  # run-app.sh
  aVer="v0.01.50309.1245"  # run-app.sh

function exit_wCR() {
      if [ "${OS:0:7}" != "Windows" ]; then echo ""; fi
         exit
         }
function setRepos() {
         aDir="$( pwd )";
         aPath="$( pwd | tr '[:upper:]' '[:lower:]' )";
         if [[ "${aPath}" =~ ^(.*repos/(robin|test)) ]]; then
             nLen="${#BASH_REMATCH[1]}"
             aRepos="${aDir:0:nLen}"
             fi
         aRepo="${aDir/${aRepos}/}"; aRepo="${aRepo:1}"
 #       echo "  aGitPath: '${aRepos}/${aRepo}/.git'"
         if [ ! -d "${aRepos}/${aRepo}/.git" ]; then
         echo -e "\n* You are not in a Repos folder."
         exit_wCR
         fi
       __basedir="${aRepos}/${aRepo}"
         }
# ------------------------------------------------------------------------------

   		 aOwnr="AnyLLM"
         setRepos

#       echo -e "\n  The current Repo folder is: ${__basedir}";  exit
#       echo "p0 aArg1: '$1', aArg2: '$2', aArg3: '$3', aArg4: '$4'"

                                       aArg1=$1; aArg2=$2; aArg3=$3; aArg4=$4; b2=0;    # .(50304.05.1 RAM Add aArg4 for log -f)
 if [ "${aArg1}"     == "pm2"  ]; then aArg1=$2; aArg2=$3; aArg3=$4; aArg4=$5; b2=1; fi # .(50306.02.1 RAM Only want to be called from anyllm)
 if [ "${aArg1:0:3}" == "col"  ]; then aArg1="col"; fi
 if [ "${aArg1:0:3}" == "fro"  ]; then aArg1="fro"; fi
 if [ "${aArg1:0:3}" == "ser"  ]; then aArg1="ser"; fi
 if [ "${aArg1}"     == ""     ]; then aArg1="help"; fi                                 # .(50304.06.x RAM Add Help)
 if [ "${aArg1:0:3}" == "hel"  ]; then aArg1="help"; fi                                 # .(50304.06.x RAM Add Help)

 if [ "${aArg1:0:3}" == "log"  ]; then aArg1="logs"; fi                                 # .(50304.05.2 RAM All 'log'; 3 letters)
 if [ "${aArg2:0:3}" == "log"  ]; then aArg2="logs"; fi                                 # .(50304.05.3)
 if [ "${aArg3}"     == "-f"   ]; then bFollow=1; aArg3="${aArg4}"; fi                  # .(50304.05.4)
 if [ "${aArg4}"     == "-f"   ]; then bFollow=1; fi                                    # .(50304.05.5)
 if [ "${#aArg1}"    != "3"    ]; then a1=${aArg1}; aArg1=${aArg2}; aArg2=${a1}; fi     # .(50304.05.6 RAM set aArg2 if aArg1 not an App, ie. length is 3)
 if [ "${aArg3}"     == ""     ]; then aArg3=15;  fi                                    # .(50304.05.7 RAM --lines default)

#       echo "p1 aArg1: '${aArg1:0:3}', aArg2: '${aArg2:0:4}', aArg3: '${aArg3}', aArg4: '${aArg4}',  bFollow: '${bFollow}'";  # exit

# ------------------------------------------------------------------------------

function help() {
    a1="$1"; a2="$2"
#   echo "p4 aCmd: '${aCmd}', aApp: '${aApp}', a1: '${a1}', a2: '${a2}'"
    if [ "${a1}" == "3" ] && [ "${a2}" == ""     ]; then   a1=""; a2=""; fi             # .(50305.01.6)
    if [ "${a1}" == "3" ] && [ "${a2}" != "help" ]; then aApp="${a2}"; a1=2; fi         ##.(50305.01.7).(50306.01.1)
#   if [ "${a1}" == "3" ] && [ "${a2}" != "help" ]; then aApp="${a2}"; a1=; fi          ##.(50306.01.1 RAM Was: a1=2)
#   echo "p5 aCmd: '${aCmd}', aApp: '${aApp}', aArg1: '${aArg1}', a1: '${a1}', a2: '${a2}'"
    if [ "${a1}" != "2" ] && [ "${a1}" != "3"    ]; then                                # .(50305.01.7 RAM Add "$1" != 3)

#   echo ""                                                                             # .(50309.01.1 RAM ??)
    echo "  Use any of the following apps in ${aRepo}:"
    echo "    server"
    echo "    collector"
    echo "    frontend"
    echo ""
    fi
    aIt="it"; if [ "${aApp}" != "" ]; then aIt="'${aApp}'"; fi
    echo "  Use ${aIt} with any of the following PM2 commands ($aVer}):"                # .(50303.02.1 )
    echo "    status              Show all running PM2 apps"
              if [ "${aIt}" == "it" ]; then aIt="{App}"; else aIt=" ${aApp} "; fi       # .(50303b.02.1 )
    echo "    start    all        Start all Apps in ${aRepo}"
    echo "    start   ${aIt}       Start an {App} in ${aRepo}"
    echo "    stop    ${aIt}       Suspend a running {App}"
    echo "    restart ${aIt}       Restart a suspended {App}"
    echo "    kill    ${aIt}       Delete {App} from PM2's memory"
    echo "    info    ${aIt}       Display {App} properties"
    echo "    logs    ${aIt} {Cnt} Display last {Cnt} log lines, or stream them with -f" # .(50304.05.8)
    echo "    install             Install PM2"                                          # .(50309.01.2)
    echo "    save                Save PM2 configuration for startup"

#   if [ "${a1}"  != "2"  ];                         then exit_wCR; fi                  ##.(50306.01.1).(50306.01.2)
#   if [ "${a1}"  != "2"  ] && [ "${a1}"  != "3"  ]; then exit_wCR; fi                  ##.(50306.01.1 RAM Add a1 != 3 ).(50306.01.2)
#   if [ "${a1}"  != "2"  ] && [ "${a1}"  != "3"  ]; then exit_wCR; fi                  ##.(50306.01.1 RAM Add a1 != 3 ).(50306.01.2)
    if [ "${a1}"  == ""   ];                         then exit_wCR; fi                  # .(50306.01.2 RAM Now a1 == '' )
#   if                         [ "${aIt}" != "it" ]; then bCmd="1"; aName="?"; exit; fi ##.(50305.01.8).(50306.01.2)
#   if [ "$1"     != "2"  ] && [ "${aIt}" == "it" ]; then exit_wCR; fi                  ##.(50305.01.9).(50306.01.2)
    }
# -----------------------------------------------------

function chkPM2( ) {                                                                    # .(50309.01.3 RAM Write chkPM2 Beg)
#   if ! command -v pm2 >/dev/null 2>&1; then
    if [ -z "$(command -v pm2)" ]; then
       echo -e "\n* You don't have PM2 installed.  Run: anyllm pm2 install -d"
       exit_wCR; fi 
       }                                                                                # .(50309.01.3 End)
# -----------------------------------------------------

function installPM2( ) {                                                                # .(50309.01.4 RAM Write installPM2 Beg)
    if [ -z "$(command -v pm2)" ]; then 
    if [ "${bDoit}" == "1" ]; then 
       echo -e "\n  npm install pm2 -g"
                    npm install pm2 -g
       else 
       echo -e "\n  anyllm pm2 install  # Add -d to doit"
       fi 
     else 
       echo -e "\n* PM2 is already installed."
       fi   
       exit_wCR             
       }                                                                                # .(50309.01.4 End)
# -----------------------------------------------------

function doAll() {
    local aApps=$1                              # Comma-separated list of apps (e.g., "app1,app2,app3")
    local aCmd=$2                               # Command to execute (e.g., "run")
    local script_path="$(realpath "$0")"
#   if [ "${aCmd}" == "" ]; then echo ""; help 2; exit; fi                              ##.(50306.01.3)
    if [ "${aCmd}" == "" ]; then echo ""; help;   exit; fi                              # .(50306.01.3 RAM Was help 2)

    IFS=',' read -r -a apps_array <<< "$aApps"  # Split the comma-separated list into an array

    for app in "${apps_array[@]}"; do           # Loop through each app in the list
        app=$( echo "$app" | xargs )            # Trim whitespace from the app name
        if [ -n "$app" ]; then                  # Check if the app name is not empty
#       echo -e "\n  calling $script_path  $app $aCmd"
            bash "$script_path" "$app" "$aCmd"  # Call the script with its full path, the current app, and the command
        fi
    done
    }
# -----------------------------------------------------

function doPM2() {
#   aPython="$( which python3 )"
#   aCmd="${2/python3/${aPython}}"
#   echo "  aCmd: $1, aApp: '$2', nLines: '$4', bFollow: '${bFollow}'"
 if [ "$2" == '' ]; then return; fi                                                     # .(50305.01.10)

 if [ "$1" == "logs"  ] && [ "${bFollow}" != "1" ]; then                                # .(50304.05.9 RAM Cmd: logs without -follow Beg)
            aLogFile1="$( pm2 show "$2" | grep 'out log'   | awk '{ print $6 }' )"
            aLogFile2="$( pm2 show "$2" | grep 'error log' | awk '{ print $6 }' )"
    echo "  -------------------------------------------------------------------------"
    echo "  tail -n $4 '${aLogFile2}'"
    echo "  -------------------------------------------------------------------------"
            tail -n $4 "${aLogFile2}" | awk '{ print "    " $0 }'; echo ""
    echo "  -------------------------------------------------------------------------"
    echo "  tail -n $4 '${aLogFile1}'"
    echo "  -------------------------------------------------------------------------"
            tail -n $4 "${aLogFile1}" | awk '{ print "    " $0 }'
    echo "  -------------------------------------------------------------------------"
            return
    fi # eif logs without -f                                                            # .(50304.05.9 End)

 if [ "$1" == "start" ]; then
    echo "  pm2 start "./ecosystem.config.cjs" --only \"${aName}\""; echo ""
            pm2 start "${__basedir}/ecosystem.config.cjs" --only  "${aName}"            # .(50308.03.1 RAM Was ../ecosystem.config.cjs) 
 else
    if [ "${aName}" == "" ]; then return; fi                                            # .(50304.06.2)
    echo "  pm2 $1 \"${aName}\" $3 $4"; echo ""
            pm2 $1  "${aName}"  $3 $4
    fi
    }
# -----------------------------------------------------

function  setDir() {
    if [ "${1:0:3}"      == "all"  ]; then aApp="all"; fi
    if [ "${1:0:3}"      == "ser"  ]; then aApp="ser"; aName="AnyLLM_Server-3001";    aPort="3000"; aAppDir="server";    fi
    if [ "${1:0:3}"      == "col"  ]; then aApp="col"; aName="AnyLLM_Collector-8888"; aPort="8888"; aAppDir="collector"; fi
    if [ "${1:0:3}"      == "fro"  ]; then aApp="fro"; aName="AnyLLM_Frontend-3000";  aPort="3001"; aAppDir="frontend";  fi
    if [ "${1:0:3}"      == "c13"  ]; then aApp="c13"; aName="AnyLLM_c13-8013";       aPort="8013"; aAppDir="server1/s13_aidocs-anyllm-api";  fi  # .(50308.04.1 RAM Add new apps)
    if [ "${1:0:3}"      == "s13"  ]; then aApp="s13"; aName="AnyLLM_s13-8113";       aPort="8113"; aAppDir="server1/s13_aidocs-anyllm-api";  fi  # .(50308.04.2)

#   echo "p2 aApp:  '${aApp}', aName: '${aName}', aAppDir='${aAppDir}', aArg2: '${aArg2}'" ; # exit
#   echo "  aDir: '${__basedir}/${aAppDir}'" ; # exit

#   if [ ! -d "${__basedir}/${aAppDir}" ]; then
#   echo -e "\n* Can't find an App folder for ${1:0:3}."
#   exit_wCR
#   fi
#   echo "    cd: '${__basedir}/${aAppDir}'"

    cd "${__basedir}/${aAppDir}" || exit_wCR


#   echo "  The current App  folder is: ./${aAppDir}"
    }
# -----------------------------------------------------

    if [ "${aArg2:0:4}"  == "save" ]; then echo "";   pm2 save;   exit_wCR; fi
    if [ "${aArg2:0:4}"  == "stat" ]; then            pm2 status; exit_wCR; fi
    if [ "${aArg2:0:4}"  == "inst" ]; then            installPM2; fi                    # .(50309.01.5)

#   if [ "${aArg2:0:4}"  == "star" ]; then aApp="all"; fi

          setDir ${aArg1}
    if [ "$1"            == ""     ]; then help; exit; fi                               # .(50304.06.3 RAM Opps)
    if [ "${aApp:0:3}"   == "hel"  ]; then help; echo "--- Are we here"; exit; fi
    if [ "${aApp}"       == "all"  ]; then doAll "ser,col,fro" ${aArg2}; exit; fi

    echo ""
#   cd "${__basedir}/${aAppDir}"
    if [ "${aArg2:0:4}"  == "star" ]; then bCmd="1";
         if [ "${aApp}"  == "ser"  ]; then setDir ser; doPM2 start "${aName}"; fi
         if [ "${aApp}"  == "col"  ]; then setDir col; doPM2 start "${aName}"; fi
         if [ "${aApp}"  == "fro"  ]; then setDir fro; doPM2 start "${aName}"; fi
         if [ "${aApp}"  == "c13"  ]; then setDir c13; doPM2 start "${aName}"; fi       # .(50308.04.3) 
         if [ "${aApp}"  == "s13"  ]; then setDir s13; doPM2 start "${aName}"; fi       # .(50308.04.4) 
    fi
#   echo ""
    if [ "${aArg2:0:4}"  == "help" ]; then bCmd="1";  help ${aArg1} ${aArg3};   fi      # .(50305.01.11)
    if [ "${aArg2:0:4}"  == "save" ]; then bCmd="1";  doPM2 save;    fi
    if [ "${aArg2:0:4}"  == "stat" ]; then bCmd="1";  doPM2 status;  fi
#   if [ "${aArg2:0:4}"  == "inst" ]; then            installPM2; fi                    ##.(50309.01.5)

    if [ "${aArg2:0:4}"  == "stop" ]; then bCmd="1";  doPM2 stop    "${aName}"; fi
    if [ "${aArg2:0:4}"  == "rest" ]; then bCmd="1";  doPM2 restart "${aName}"; fi
    if [ "${aArg2:0:4}"  == "info" ]; then bCmd="1";  doPM2 info    "${aName}"; fi
    if [ "${aArg2:0:4}"  == "kill" ]; then bCmd="1";  doPM2 delete  "${aName}"; fi
    if [ "${aArg2:0:4}"  == "dele" ]; then bCmd="1";  doPM2 delete  "${aName}"; fi
    if [ "${aArg2:0:4}"  == "logs" ]; then bCmd="1";  doPM2 logs    "${aName}" --lines ${aArg3}; fi         # .(50304.05.2 RAM Was: $$)

#     echo "p3 bCmd: '${bCmd}', aName: '${aName}', aCmd: '${aArg2}', aApp: '${aArg1}', bCmd: '${bCmd}'"

    if [ "${aArg2}" == "help" ]; then exit_wCR; fi                                      # .(50306.01.4 RAM Not here)

       chkPM2                                                                           # .(50309.01.6 RAM Use it) 

   if [ "${bCmd}" == "1" ] && [ "${aName}"  == "" ]; then a="*"
       if [ "${aArg1}" != ""  ]; then echo -e "\n* You entered an invalid App: ${aArg1}."; a=" "; fi
                                      echo -e "${a} Please use one of the folling Apps: server, collector, frontend.";
                                      exit_wCR;
       fi
    if [ "${bCmd}" != "1" ]; then
       if [ "${aName}" == ""  ]; then help 4; else help 2; exit_wCR; fi                 # .(50306.01.4 RAM Was Help 2)
       if [ "${aArg1}" != ""  ]; then echo -e "\n* You entered an invalid App: ${aArg1}.";
                                      echo -e "  Please use one of the folling Apps: server, collector, frontend.";
       else
                                      echo -e "\n* You entered an invalid command: $1."  # .(50304.06.5 RAM Display invalid command)
       fi;
       exit_wCR
       fi                                                                               # .(50304.06.6)
#      if [ "${b2}" == "0" ]; then exit_wCR; fi                                         ##.(50306.02.2)
       exit_wCR;                                                                        # .(50306.02.2)

# ------------------------------------------------------------------------------
