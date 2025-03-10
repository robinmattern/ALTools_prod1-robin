#!/bin/bash
#*\
##=========+====================+================================================+
##RD         Main1              | ALTools Script Commands
##RFILE    +====================+=======+===============+======+=================+
##FD   ALT01_Main1_Script.sh    |  41543|  3/09/25 19:00|   629| p1.02`.50309.1900
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements ALTools commands
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2024 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#                               |
#            help               | Display this scripts commands
#            Sudo               | Run OS command if in unix systems
#            exit_wCR           | Exit with a blank line in unix systems
#            setOSvars          | Set vars: aOS, aBashrc, aBinDir, aTS
#            getReposDir        | Abort if not a Repos dir with .1_ dir
#            chkRepo            | Abort if not in a repo with a .git folder
#            getRepoDir         | Set var, aRepoDir, among others
#            getAI2codeDir      | Set var, aCoderDir
#                               |
#            help               |
#            init               |
#                               | AI202_Main-Program_u1.02.mjs
#                               | ----------------------------
#            getKeys            | ALT02  get  keys    ${aObj}     ${aItm}        ${mArgs}
#            Next Command       |
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50309.04   3/09/25 RAM  7:00p| Created ALT01_Main1_Script.sh
#.(50309.05   3/09/25 RAM  8:00p| Make usefull changes

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#*/
#========================================================================================================== #  ===============================  #
  
        aVDt="Mar 9, 2025 7:00p"; aVer="p1.01"; aVTitle="AITools by formR";                                               # .(41228.01.1).(41103.02.2 RAM Was: gitR1)
        aVer="$( echo "$0" | awk '{ match( $0, /_[dpstuv][0-9]+\.[0-9]+/ ); print substr( $0, RSTART+1, RLENGTH-1) }' )"  # .(21031.01.1 RAM Add [d...).(20416.03.8 "_p2.02", or _d1.09)

        LIB="ALT01"; LIB_LOG=${LIB}_LOG; LIB_USER=${LIB}_USER; Lib=${LIB}; aDir="$( cd "$( dirname "$0" )" && pwd)"       # .(41228.01.1).(41103.02.3).(41102.01.1 RAM Add JPT12_Main2Fns_p1.07.sh Beg).(80923.01.1)
        aFns="${aDir}/../JPTs/JPT12_Main2Fns_p1.07.sh"; if [ ! -f "${aFns}" ]; then   # It's in ._2/FRTs    # .(50309.04.3 RAM It is in JPTs)
        echo -e "\n ** ${LIB}[  35]  JPT Fns script, '${aFns}', NOT FOUND\n"; exit; fi; #fi
        source "${aFns}";                                                                                                 # .(41102.01.1 End)

        Begin "$@"                                                                                                        # .(41102.01.2)
 
# ---------------------------------------------------------------------------

  function  help() {                                                                                        # .(41228.01.2 RAM Add new Help)
     echo ""
     echo "  ${aVTitle} (${aVer})         (${aVDt})"
     echo "  --------------------------------------------  ---------------------------------"
     echo "    Get Keys  {Model}                           Get Keys for AI Program Scripts (1)"              # .(50122.01.1)
     echo ""
     echo "    (1)                                         Default object for command"
     echo "    [-b]                                        Show debug messages"
     echo "    [-d]                                        Doit, i.e. execute the command"
     exit_wCR
     }
# ---------------------------------------------------------------------------

  function  exit_wCR() {
  if [ "${OS:0:7}"     != "Windows" ]; then echo ""; fi                                 # .(41120.01.1 RAM Fix exit_wCR)
  if [ "$1" != "" ]; then exit $1; else exit; fi # ${1:-0}                              # .(50129.01.1 Check for $1 == nErr, even if VSCode complains)
     }
# ---------------------------------------------------------------------------

  function  setOSvars() {
     aTS=$( date '+%y%m%d.%H%M' ); aTS=${aTS:1}                                                             # .(41225.01.2)
#    aBashrc="$HOME/.bashrc"                                                                                ##.(41208.02c.1)
     if [ -f "$HOME/.bash_profile" ]; then aBashrc="$HOME/.bash_profile"; fi                                # .(41208.02c.1)
     if [ -f "$HOME/.bashrc"       ]; then aBashrc="$HOME/.bashrc"; fi                                      # .(41208.02c.2)
     aBinDir="/Home/._0/bin"
     aOS="linux"
  if [[ "${OS:0:7}" == "Windows" ]]; then
     aOS="windows";
     aBinDir="/C/Home/._0/bin"
     fi
  if [[ "${OSTYPE:0:6}" == "darwin" ]]; then
     aBashrc="$HOME/.zshrc"
     aBinDir="/Users/Shared/._0/bin"
     aOS="darwin"
     fi
     }
# -----------------------------------------------------------

  function  Sudo() {                                                                                        # .(41105.03.1 RAM Write Sudo)
  if [[ "${OS:0:7}" != "Windows" ]]; then if [ "${USERNAME}" != "root" ]; then sudo "$@"; fi; fi            # .(41105.03.12 RAM Was: "windows").(41105.03.2)
     }                                                                                                      # .(41105.03.3)
# -----------------------------------------------------------

# Initialize variables
     bDebug=0; bDoit=0;  mArgs=(); mARGs=($1)
     aArg1=$1; aArg2=$2; aArg3=$3; aArg4=$4; aArg5=$5; aArg6=$6; aCmd=""
     sayMsg  "ALT01[ 103]  \$aArg1: '$aArg1',   \$aArg2:    '$aArg2',  \$aArg3:    '$aArg3',    \$aArg4:    '$aArg4',  \$aArg5:    '$aArg5',  \$aArg6:    '$aArg6'" -1

while [[ $# -gt 0 ]]; do  # Loop through all arguments
    case "$1" in
        -debug|--debug)            bDebug=1 ;;                                          # .(41105.02.3 RAM -b Limited:       - AIC[ 999]  Msg)
        -debug-cmts|--debug-cmts)  bDebug=2 ;;                                          # .(50209.01.1 RAM -c Comments:      ' AIC[ 999]  Comment)
        -debug-errs|--debug-errs)  bDebug=3 ;;                                          # .(50209.01.2 RAM -e Errors:        * AIC[ 999]  Error)
        -debug-bugs|--debug-bugs)  bDebug=4 ;;                                          # .(50209.01.3 RAM -g Debugger Only: + AIC[ 999]  Msg)
        -debug-all|--debug-all)    bDebug=5 ;;                                          # .(50209.01.4 RAM -a All Messages)
        -doit|--doit)              bDoit=1  ;;                                          # .(41105.02.2 RAM Rewrite)
        -force|--force)            bForce=1 ;;                                          # .(41105.02.4)
        -quiet|--quiet)            bQuiet=1 ;;                                          # .(50125.02.4)
        -vebug1|--vebug1)          bVebug1=1 ;;                                         # .(50121.02.1 RAM -v => --inspect )
        -vebug2|--vebug2)          bVebug2=1 ;;                                         # .(50121.02.2 RAM -u => --inspect-brk ).(50121.02.1 RAM Different from -debug)
        -[bdfqvuaceg]*)  [[ "$1" =~ "b" ]] && bDebug=1;  [[ "$1" =~ "d" ]] && bDoit=1;  [[ "$1" =~ "f" ]] && bForce=1; [[ "$1" =~ "q" ]] && bQuiet=1     # .(50209.01.5).(50120.02.1).(41105.02.5)
                         [[ "$1" =~ "v" ]] && bVebug1=1; [[ "$1" =~ "u" ]] && bVebug2=1;                                                                 # .(50209.01.5).(50125.02.5)
                         [[ "$1" =~ "a" ]] && bDebug=5;  [[ "$1" =~ "c" ]] && bDebug=2; [[ "$1" =~ "e" ]] && bDebug=3; [[ "$1" =~ "g" ]] && bDebug=4; ;; # .(50209.01.5)                                                                # .(50209.01.1)
        *)
         mArgs+=("$( echo "${1:0:3}" | sed 'y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/')"); # mARGs+=("$1")
         mARGs+=("$1")
         i=${#mARGs[@]}
#        sayMsg  "ALT01[ 120]  \${mARGs[${i}]}: '${mARGs[${i}]}', \$$i: '$1'" 1
         ;;
    esac
    shift
  done
    set -- "${mArgs[@]}"  # Restore the command arguments, lower case, three letters
    aArg1="$1"; aArg2="$2"; aArg3="$3"; aArg4="$4"; aArg5="$5"; aArg6="$6"; aArg7="$7"; aArg8="$8"; aArg9="$9"

           bDebug_ALT01=0 ; "${bDebug}"                                                                         # .(50309.04.4 RAM For now)
   if [ "${bDebug_ALT01}" == "1" ]; then                                                                    # .(50213.03.14)
         sayMsg  "ALT01[ 190]  AI2code Tools: ${aVer}  (${aVDt})" -1                                        # .(50108.01.2 RAM Add version to debug)
         sayMsg  "ALT01[ 191]      \$1: '$1',     \$2: '$2',      \$3: '$3',      \$4: '$4',      \$5: '$5',      \$6: '$6',      \$7: '$7'" -1
         sayMsg  "ALT01[ 192]  \$aArg1: '$aArg1', \$aArg2: '$aArg2',  \$aArg3: '$aArg3',  \$aArg4: '$aArg4',  \$aArg5: '$aArg5',  \$aArg6: '$aArg6',  \$aArg7: '$aArg7'" -1
         sayMsg  "ALT01[ 193]  \$mARGs[3]: '${mARGs[3]}',  \$mARGs[4]: '${mARGs[4]}',  \$mARGs[5]: '${mARGs[5]}',  \$mARGs[6]: '${mARGs[6]}',  \$mARGs[7]: '${mARGs[7]}'" -1
         sayMsg  "ALT01[ 194]  \$bDoit: '$bDoit', \$bForce: '$bForce', \$bDebug: '$bDebug'" -1
         fi                                                                                                 # .(50213.03.15)

       if [ "${bVebug2}" == "1" ]; then aDebug=" --inspect-brk"; else aDebug="";fi      # .(50121.02b.1).(50121.02.3).(40727.01.2)
       if [ "${bVebug1}" == "1" ]; then aDebug=" --inspect"; fi                         # .(50121.02b.2 RAM Don't break on 1st line).(50121.02.4).(40727.01.2)

     export Debug="${bDebug}"
     export Doit="${bDoit}"
     export Force="${bForce}"
     export Quiet="${bQuiet}"                                                           # .(50125.02.6)

# ---------------------------------------------------------------------------

  if [ "$1" == "hel" ] || [ "$1" == ""    ]; then aCmd="help";          fi

  if [ "$1" == "get" ] && [ "$2" == "key" ]; then aCmd="getKeys";       fi 

     sayMsg  "" -1
     sayMsg  "ALT01[ 153]  aCmd: '${aCmd}', aArg1: '$aArg1', aArg2: '$aArg2', aArg3: '$aArg3', aArg4: '$aArg4', bDoit: '$bDoit', bForce: '$bForce', bQuiet: '$bQuiet'" -1 # .(50309.04.5 )
#    sayMsg  "ALT01[ 152]  aCmd: '${aCmd}', aArg1: '$aArg1', aArg2: '$aArg2', aArg3: '$aArg3', aArg4: '$aArg4', bDoit: '$bDoit', bForce: '$bForce'" ${bDebug_ALT01}       ##.(50213.03.16 ).(50309.04.5 )
  if [ "${aCmd}" == "" ]; then
#    aArgs="${aArg1} ${aArg2} ${aArg3} ${aArg4}"; aArgs="${aArgs// / }"                ##.(50309.05.1)
#    aArgs="$( echo "${aArg1} ${aArg2} ${aArg3} ${aArg4}" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//; s/[[:space:]]\+/ /g' )"  ##.(50309.05.1)
     aArgs="$( echo "${aArg1} ${aArg2} ${aArg3} ${aArg4}" | sed 's/^ *//; s/ *$//; s/ \+/ /g' )"                                # .(50309.05.1)
     echo -e "\n* Invalid command: '${aArgs}'. Use any of these."                      # .(50309.05.2 RAM Add trimmed aArgs)
     aCmd="help"
     fi
# ---------------------------------------------------------------------------

  function  QQ( ) {                                                                                         # .(50213.06.1 RAM Write QQ Beg)
    if [ "$1" != "" ]; then a="\"$1\""; fi
    if [ "$2" != "" ]; then a="${a} \"$2\""; fi
    if [ "$3" != "" ]; then a="${a} \"$3\""; fi
    if [ "$4" != "" ]; then a="${a} \"$4\""; fi
       echo "${a}"
    }                                                                                                       # .(50213.06.1 End)
# ---------------------------------------------------------------------------
  function  chkRepo() {                                                                                     # .(41103.03.3 RAM Write chkRepo Beg)

 if [ "${aRepoDir}" == "" ]; then
    echo "* You are not in a ${aProject}_/{StgDir} Git Repository"
    exit_wCR
  else
    echo "  RepoDir is: ${aRepoDir}, branch: ${aBranch}";   # exit_wCR
    fi
    }                                                                                                       # .(41103.03.3 End)
# ---------------------------------------------------------------------------

  function  getLIB_Dir() {   echo ""                                                                              # .(50309.05.3 RAM Was: getAI2codeDir)         
            aLIB="$1";    if [ "$1" == "" ]; then aLIB="alt";     fi                                        # .(50309.05.4 RAM Make it general)
            aLibDir="$2"; if [ "$1" == "" ]; then aLibDir="ALTs"; fi                                        # .(50309.05.5)
#                     cat "$( which ${aLIB} | awk '{ print; exit }' )"
#                     cat "$( which ${aLIB} | awk '{ print; exit }' )"  | awk '/'${aLibDir}'/ { sub( /^ */,  "" ); sub(  /"\$@"/,   "" ); print }'
            aPath="$( cat "$( which ${aLIB} | awk '{ print; exit }' )"  | awk '/'${aLibDir}'/ { sub( /^ */,  "" ); sub(  /"\$@"/,   "" ); print }' )"
#           echo   " cat \"$( which ${aLIB} | awk '{ print; exit }' )\" | awk '/${aLibDir}/   { sub( /^ */, \"\"); sub( /\"\$@\"/, \"\"); print }'"
#           aPath="$( cat "$( which alt | awk '{ print; exit }' )" | awk '/ALTs/ { sub( /^ */, ""); sub( /"\$@"/, ""); print }' )"
#           echo "1  aPath: '${aPath}'"
            aLIB_Dir="$( dirname "${aPath}" )"
#           echo "2  aLIB_Dir: '${aLIB_Dir}'"
#           aLIB_Dir="$( dirname "${aPath/${aLibDir}\//${aLibDir}/}" )"                                     ##.(50309.05.6 RAM Not working and not needed)                        
#           echo "3  aLIB_Dir: '${aLIB_Dir}'"                                                               
#           echo "${aLIB_Dir}"                                                                              # .(50309.05.7) 
            }
# ---------------------------------------------------------------------------

  function  getRepoDir() {

            aRepos="$( echo "$(pwd)"       | awk '{ match( $0, /.*[Rr][Ee][Pp][Oo][Ss]/); print substr($0,1,RLENGTH) }' )"
    if [ "${aRepos}" == "" ];        then aRepos="$( dirname $(pwd) )"; fi; # echo "  aRepos: '${aRepos}'"   # .(41129.05.1 RAM What if no Repos dir)
            aRepo="$( git remote -v        | awk '/origin.+push/ { sub( /.+\//, ""); sub( /\.git.+/, "" ); print }' )"
            aAWK='{ sub( "'${aRepos}'/", "" );  sub( /_\/*.+/, "" ); sub( /\/.+/, "" ); print }'; # echo "  aAWK: echo \"\$(pwd)\" | awk '${aAWK}'"
            aProject="$( echo "$(pwd)"     | awk "${aAWK}" )"
            aStgDir="$(  echo "$(pwd)"     | awk '{ sub( "'.+"${aProject}"'", "" ); print }' )"            # .(41103.04.1 RAM Added "{aProject}" based on ShellCheck)
            aStage="$(   echo "${aStgDir}" | awk '{ sub( "^[_/]+", "" ); print }' )"
            aRepoDir="${aRepos}/${aProject}${aStgDir}"
    if [ "${aRepo}" == "" ]; then aRepo="${aProject}${aStgDir}"; fi

            getBranch                                                                                       # .(41104.04.2)
#           bDebug=1
    if [ "${bDebug}" == "1" ]; then
            echo "  - aRepos:   '${aRepos}'"
            echo "  - aRepo:    '${aRepo}'"
            echo "  - aProject: '${aProject}'"
            echo "  - aStage:   '${aStage}'"
            echo "  - aBranch:  '${aBranch}'"                                                               # .(41102.02.2)
            echo "  - aRepoDir: '${aRepoDir}'"
            echo "  - aAcct:    '${aAcct}'"
            echo ""
#           exit_wCR
            fi
            } # eof getRepoDir
# ---------------------------------------------------------------------------

  function  getReposDir() {                                                                                 # .(41103.03b.1 RAM Write getReposDir for gitr Init Beg)

         aDir="$( pwd )"
         aREpos="$( echo "${aDir}" | awk '{ match( $0, /.*[Rr][Ee][Pp][Oo][Ss]/); print substr($0,1,RLENGTH) }' )"
         aRDirs="$( echo "${aDir}" | awk '{ match( $0, /.*[Rr][Ee][Pp][Oo][Ss]/); print substr($0,RLENGTH+2) }' )"

     if [ "${aREpos}" == "" ]; then
         echo -e "\n* You must be in a Repos folder."
         exit_wCR
         fi
     sayMsg  "ALT01[ 238]  aSDirs: '${aSDirs}'" -1

         aSDirs="$( find . -maxdepth 2 -type d -name "?1_*" | awk '{ print; exit }' )"
     if [ "${aRDirs}" != "" ]; then  # aRepos has no subfolder
        if [ "${aSDirs}" != "" ] || [ "$1" == "no-check" ]; then
           aREpos="${aREpos}/${aRDirs}"  # It is a Repos dir
         else
           if [ -d ".git" ]; then
              echo -e "\n* This project folder already contains a git repository"
              exit_wCR
              fi # eif .git exists
           echo -e "\n* You must be in a Repos folder with a subfolder: ._/!1_Support Files for ..."
           aREpos=""
           exit_wCR
           fi;  # eif aSDirs
       else
#        if [ "${aSDirs}" != "" ] || [ "$1" == "no-check" ]; then return; fi
         if [ "${aSDirs}" != "" ]; then return; fi
     sayMsg  "ALT01[ 256]  The Repos root folder does not contain a subfolder: ._/!1_Support Files for ..." -1
         fi

     sayMsg  "ALT01[ 259]  aRepos: '${aREpos}', aRDirs: '${aRDirs}'" -1
#       echo "${aREpos}"
        } # // eof getReposDir                                                                              # .(41103.03b.1 End)
#    -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

#       getAI2codeDir                                                                                       ##.(50309.05.8)
#       getLIB_Dir "alt" "ALTs"; exit_wCR 
        getLIB_Dir "alt" "ALTs"; # Assigns ${aLIB_Dir}=                                                     # .(50309.05.8 RAM Use it with args)
        sayMsg "ALT01[ 267]  aLIB_Dir: '${aLIB_Dir}'" -1  
  
#====== =================================================================================================== #  ===========
#>      ALT01 HELP                                                                                          # .(41228.01.3 RAM Add AI2code Init command Beg)
#====== =================================================================================================== #

  if [ "${aCmd}" == "help" ]; then                                                                          #
     sayMsg  "ALT01[ 274]  Help" -1
     help
     exit_wCR
     fi # eoc Help                                                                                          # .(41228.01.3 End)                                                                                        # .(41228.01.3 Beg RAM Add AI2code Init Beg)
#    -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

#====== =================================================================================================== #  ===========
#>      ALT01 INIT                                                                                          # .(41228.01.3 RAM Add AI2code Init command Beg)
#====== =================================================================================================== #

  if [ "${aCmd}" == "init" ]; then                                                                          #
     sayMsg  "ALT01[ 285]  Init" -1
     sayMsg  "ALT01[ 286]  init"  1

     exit_wCR
     fi # eoc Init                                                                                          # .(41228.01.3 End)                                                                                        # .(41228.01.3 Beg RAM Add AI2code Init Beg)
#    -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

#====== =================================================================================================== #  ===========
#>      ALT01 NEW APP                                                                                       # .(50124.03.4 RAM Add New Add Command Beg)
#====== =================================================================================================== #

  if [ "${aCmd}" == "getKeys" ]; then
     sayMsg  "ALT01[ 297]  Command: Get Keys" -1
     if [ "${aArg2}" != "app" ]; then mARGs[7]="${mARGs[6]}"; mARGs[6]="${mARGs[5]}"; mARGs[5]="${mARGs[4]}"; mARGs[4]="${mARGs[3]}"; mARGs[3]="${mARGs[2]}"; fi                    # .(50126.09.1 RAM Due to default cmd)
     aObj="${mARGs[3]}"       # aApp or aApp_AppName:               could be 3] App or full AppName
     aItm="${mARGs[4]}"       # aAppName or aMod or aMod_NodelName: could be 4] just AppNAme, Mod or full ModelName
     mArgs="$( QQ "${mARGs[5]}" "${mARGs[6]}" "${mARGs[7]}" )"                                                        # .(50201.09b.1 RAM Added)
     sayMsg  "ALT01[ 302]  getKeys( aObj: \"${aObj}\", aItm: \"${aItm}\", mArgs: ${mArgs} )" -1

     node ${aDebug} "${aLIB_Dir}/ALT02_Main1-Program_u1.01.mjs" "get" "keys" "${aObj}" "${aItm}" ${mArgs}
     exit_wCR
     fi # eoc newApp                                                                                        # .(50124.03.4 End)
#    -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

#====== =================================================================================================== #  ===========
#>      ALT01 NEXT COMMAND                                                                                  # .(20102.02.1 RAM Add Next Command Beg)
#====== =================================================================================================== #

  if [ "${aCmd}" == "Next Command" ]; then
     sayMsg  "ALT01[ 295]  Next Command" 1

     exit_wCR 0
     fi # eoc Next Command                                                                                  # .(20102.02.1 End)
#    -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

#====== =================================================================================================== #  ===========

# ------------------------------------------------------------------------------------
#       ALT01 END
#========================================================================================================== #  ===============================  #
#*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
#*/

