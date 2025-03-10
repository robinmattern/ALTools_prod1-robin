#!/bin/bash
#*\
##=========+====================+================================================+
##RD         set-anyllm         | ALT Tools
##RFILE    +====================+=======+===============+======+=================+
##FD   set-anyllm.sh            |   1231| 10/16/24 09:24|      | v1.01`41016.0924
##FD   set-anyllm.sh            |   3777| 10/21/24 10:06|      | v1.03`41021.1006
##FD   set-anyllm.sh            |   5356| 10/22/24 08:10|      | v1.04`41022.0810
##FD   set-anyllm.sh            |   6240| 10/22/24 09:15|      | v1.04`41022.0915
##FD   set-anyllm.sh            |   6391| 10/23/24 07:25|      | v1.05`41023.0725
##FD   set-anyllm.sh            |   6401| 11/09/24 20:00|      | v1.05`41109.2000
##FD   set-anyllm.sh            |   6508| 11/11/24 10:22|   157| v1.05`41111.1022
##FD   set-anyllm.sh            |   6647| 11/11/24 22:00|   158| v1.05`41111.2200
##FD   set-anyllm.sh            |   6741| 11/12/24 08:35|   181| v1.05`41112.0830
##FD   set-anyllm.sh            |   7786| 11/14/24 10:39|   181| v1.05`41114.1030
##FD   set-anyllm.sh            |   9429| 11/25/24  9:00|   190| v1.05`41125.0900
##FD   set-anyllm.sh            |  10420| 12/24/24 11:00|   202| v1.05`41224.1100
##FD   set-anyllm.sh            |  10845|  3/07/25 10:05|   207| v1.05`50307.1005
##FD   set-anyllm.sh            |  11574|  3/10/25  7:45|   215| v1.05`50310.0745
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script saves anyllm command to ._0/bin.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2024 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#            help               |
#            setOSvars          |
#            showEm             |
#            mkScript           |
#            cpyToBin           |
#            Sudo               |
#                               |
##CHGS     .--------------------+----------------------------------------------+
# .(41016.01 10/16/24 RAM  9:24a|
# .(41021.01 10/21/24 RAM 10:06a|
# .(41022.01 10/22/24 RAM  8:10a|
# .(41022.01 10/22/24 RAM  9:15a|
# .(41023.01 10/23/24 RAM  7:25a|
# .(41109.06 11/09/24 RAM  3:40p| Add this heading and remove some stuff
# .(41109.13 11/09/24 RAM  8:00p| Remove copy of gitr.sh
# .(41111.03 11/11/24 RAM 10:22a| Add Show command and fix some stuff
# .(41111.10 11/11/24 RAM 10:00p| Fx OS == "Windows", not "windows"
# .(41112.01 11/12/24 RAM  8:00a| Show version and source
# .(41112.02 11/12/24 RAM  8:30a| Display anyllm version being installed
# .(41114.01 11/14/24 RAM 10:30a| Add back AnythingLLM's debug commands
# .(41120.02 11/25/24 RAM  9:00a| Ignore file permissions in this repo
# .(41224.01 12/24/24 RAM 11:00a| Add -doit and -d
# .(41224.02 12/24/24 RAM 11:30a| Check for Node and Yarn
# .(50307.04  3/07/25 RAM 10:05a| Set permission for run-app.sh too
# .(50310.01  3/10/25 RAM  7:45a| Copy ALT and ALTools scripts
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#*/
#========================================================================================================== #  ===============================  #

  aVer="v0.05.41022.0915"  # set-anyllm.sh
  aVer="v0.05.41023.0725"  # set-anyllm.sh
  aVer="v0.05.41109.2000"  # set-anyllm.sh
  aVer="v0.05.41111.1022"  # set-anyllm.sh
  aVer="v0.05.41112.0830"  # set-anyllm.sh
  aVer="v0.05.41114.1030"  # set-anyllm.sh
  aVer="v0.05.41224.1300"  # set-anyllm.sh
  aVer="v0.05.50307.1005"  # set-anyllm.sh
  aVer="v0.05.50310.0745"  # set-anyllm.sh

  echo ""

# ---------------------------------------------------------------------------

function help() {
  echo "  Run . ./set-anyllm.sh commands  (${aVer} OS: ${aOS})"
  echo "    help  This help"
  echo "    doit  Create command anyllm"                                                # .(41111.03.1)
# echo "    doit  Make folders"                                                         ##.(41111.03.2)
  echo "    show  Show commands and ${aBashrc} and \$PATH"                              # .(41111.03.3)
# echo "    wipe  Wipe all the setup"                                                   ##.(41111.03.4)
  }
# -----------------------------------------------------------

function exit_wCR() {
  if [[ "${aOS}" != "windows" ]]; then echo ""; fi
     }
# -----------------------------------------------------------

function setOSvars() {
     aTS=$( date '+%y%m%d.%H%M' ); aTS=${aTS:2}
     aBashrc="$HOME/.bashrc"
     aBinDir="/home/._0/bin"                                                            # .(41224.01.1 RAM Was Home)
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

function Sudo() {                                                                                           # .(41105.03.1 RAM Write Sudo)
  if [[ "${OS:0:7}" != "Windows" ]]; then if [ "${USERNAME}" != "root" ]; then sudo "$@"; fi; fi            # .(41111.10.1 RAM Was: "windows").(41105.03.2)
     }                                                                                                      # .(41105.03.3)
# -----------------------------------------------------------

                                     aCmd="help"
#  if [[ "$1" == ""         ]]; then aCmd="help";   fi
   if [[ "$1" == "help"     ]]; then aCmd="help";   fi
   if [[ "$1" == "doit"     ]]; then aCmd="doIt";   fi
   if [[ "${1:0:2}" == "-d" ]]; then aCmd="doIt";   fi                                  # .(41224.01.2 RAM Add -d or -doit)
   if [[ "$1" == "show"     ]]; then aCmd="showEm"; fi

# ---------------------------------------------------------------------------

function getBinVersion() {                                                                                  # .(41112.01.1 RAM Write getBinVersion Beg)
  aBinFile="$( cat "${aBinDir}/$1" | awk '/\.sh/ { sub( /"\$.+/, "" ); sub( /^ */, "" ); sub( / *$/, "" ); print }' )"
# aBinFile="$( cat "${aBinDir}/$1" | awk '/\.sh/' )"; echo "  '${aBinFile}'"; exit
  aBinVer="$(  cat "${aBinFile}"   | awk '/ aVer=/ { sub( /aVer=/, "" ); a = $1 }; END{ print a }' )"
  aBinVer="$(  cat "${aBinFile}"   | awk '/ aVer="?v[0-9]/ { sub( /aVer=/, "" ); a = $1 }; END{ print a }' )"
  }                                                                                                         # .(41112.01.1 End)
# -----------------------------------------------------------

function showEm() {
         getBinVersion "anyllm"                                                                             # .(41112.01.2 RAM Use it)

  echo "  aBinDir: '${aBinDir}'"
  if [ -d "${aBinDir}" ]; then ls -l "${aBinDir}" | awk 'NR > 1 { print "    " $0 }'; fi

  echo ""
  echo "  .Bashrc: '${aBashrc}'"
  if [ -f "${aBashrc}" ]; then cat  "${aBashrc}" | awk '{ print "    " $0 }'; fi
  echo -e "    -------\n"

  echo "  PATH:"
  echo "${PATH}" | awk '{ gsub( /:/, "\n" ); print}' | awk '/bin$/ { print "    " $0 }' | sort              # .(41111.03.4)

  echo ""                                                                                                   # .(41112.01.3)
  echo "  anyllm Version: ${aBinVer}"                                                                       # .(41112.01.4 RAM Display it)
  echo "  anyllm Location: ${aBinDir}/anyllm"                                                               # .(41112.01.5)
  echo "  anyllm Script:  '${aBinFile}'"                                                                    # .(41112.01.6)
  }
# -----------------------------------------------------------

function mkScript() {
# echo "    aAnyLLMscr:  $2/$3"
  echo "#!/bin/bash"   >"$2/$3"
  echo "  $1 \"\$@\"" >>"$2/$3"
  chmod 777 "$2/$3"
  }
# -----------------------------------------------------------

function cpyToBin() {
# return
   if [ ! $( which node 2>/dev/null ) ]; then                                           # .(41224.02.1 RAM Check for node and yarn Beg)
      echo -e "\n* You need to install NodeJS.  Use NVS to easily switch versions."
      exit_wCR
      fi
   if [ ! $( which yarn 2>/dev/null ) ]; then
      echo -e "\n  Installing YARN ..."
      npm install --global yarn
      fi                                                                                # .(41224.02.1 End)
  aJPTs_JDir="${aBinDir}"   # "/Users/Shared/._0/bin"
# aJPTs_GitR="${aRepo_Dir}/._2/JPTs/gitr.sh"                                            # .(41109.13.1 RAM Not needed )
  aAnyLLMscr="${aRepo_Dir}/run-anyllm.sh"
  aAnyAppScr="${aRepo_Dir}/run-app.sh"                                                  # .(50307.04.1)
  aALToolscr="${aRepo_Dir}/._2/ALTs/ALT00_Main1.sh"                                     # .(50310.01.1 RAM  Path to ALT Main Script)

# echo ""
# echo " aJPTs_JDir: ${aJPTs_JDir}";
# echo " aJPTs_GitR: ${aJPTs_GitR}";
# echo " alias gitr: ${aJPTs_JDir}/gitr.sh";
# echo " copying run-anyllm.sh and gitr to: \"${aJPTs_JDir}\""; echo ""

  if [ ! -d  "${aJPTs_JDir}" ]; then sudo mkdir -p  "${aJPTs_JDir}";                    echo "  Created: ${aJPTs_JDir}";
                                     Sudo chmod 755 "${aJPTs_JDir}"; fi                 # .(41111.03.5 RAM was sudo)

  if [   -f  "${aAnyLLMscr}" ]; then mkScript "${aAnyLLMscr}" "${aJPTs_JDir}" "anyllm";  echo "  Copied:  ${aJPTs_JDir}/anyllm";
                                     mkScript "${aALToolscr}" "${aJPTs_JDir}" "altools"; echo "  Copied:  ${aJPTs_JDir}/altools";  #  .(50310.01.2)
                                     mkScript "${aALToolscr}" "${aJPTs_JDir}" "alt"     # .(50310.01.3 RAM Copy altools and alt)
                                     Sudo chmod 755 "${aAnyAppScr}";                    # .(50307.04.2 RAM Set run-app.sh too)
                                     Sudo chmod 755 "${aAnyLLMscr}"; fi
                                     getBinVersion "anyllm"                             # .(41112.02.1)

   cd "${aRepo_Dir}/._2";            npm install                                        # .(50310.01.4 RAM Install dotev. in ._2)
   cd "${aRepo_Dir}"                                                                    # .(41120.02.3 RAM Need to be in FRTools repo)

   git config core.fileMode false                                                       # .(41120.02.2 RAM Ignore file permissions in this repo)

   echo "  Version: ${aBinVer//\"}"                                                     # .(41112.02.2 RAM Show version being installed)
  }
# ---------------------------------------------------------------------------

  aRepo_Dir="$(pwd)"
  cd ..
  aProj_Dir="$(pwd)"

  setOSvars; # echo "  OS: ${aOS}"

  if [[ "${aCmd}" == "help"   ]]; then help; fi
  if [[ "${aCmd}" == "showEm" ]]; then showEm; fi
# if [[ "${aCmd}" == "doIt"   ]]; then setBashrc; fi                                    ##.(41111.03.6)
  if [[ "${aCmd}" == "doIt"   ]]; then cpyToBin; fi

# ---------------------------------------------------------------------------

   cd "${aRepo_Dir}"                                                                    # .(41224.01.3 RAM Removed /)

   exit_wCR


