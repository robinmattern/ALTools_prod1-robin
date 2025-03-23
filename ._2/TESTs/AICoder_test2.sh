#!/bin/bash

#      ---  --------  =  --  =  ------------------------------------------------------  #

     	 aAIC="ai2"
         aAIC='alt'

     	 aApp="a01"
     	 aModel="sdf"
     	 aSNo="t001"
     	 aSNo2="t002.01"
     	 aAppName="AppName"
     	 aModelName="ModelName"
     	 aFileName="/E/Repos/Robin/Data/MarkdownFile.md"
#        aProject="$(pwd | rev | cut -d '/' -f1,2 | rev)"
         aProject="$(pwd | awk -F/ '{ print $(NF-1)"/"$NF }')"
         aTestFile="AICodeR_test2.sh"

     	 nTest="00"
         bLogIt="1"

#                                    aFlags="$2"; nTestOnly="$3"        ##.(50223.03.2)
       if [ "${2/-}" == "$2" ]; then aFlags="";   nTestOnly="$2"; fi    # .(50223.03.1 RAM If no flags)
       if [ "${2/-}" != "$2" ]; then aFlags="$2"; nTestOnly="$3"; fi    # .(50223.03.2)

         aTS="$( date '+%y%m%d.%H%M')"; aTS="${aTS:1}"

#      ---  --------  =  --  =  ------------------------------------------------------  #

#     	 aDebug="";        if [ "${1}"    == "-b" ]; then aDebug="-b"; fi
#     	                   if [ "${2}"    == "-b" ]; then aDebug="-b"; fi
#     	 aForce="";        if [ "${1}"    == "-f" ]; then aForce="-f"; fi
#     	                   if [ "${2}"    == "-f" ]; then aForce="-f"; fi
#     	 aBoth="";         if [ "${1}"   == "-bf" ]; then aBoth="-bf"; aForce="-f"; fi
#     	                   if [ "${2}"   == "-bf" ]; then aBoth="-bf"; aForce="-f"; fi
#     	                   if [ "${1}"   == "-fb" ]; then aBoth="-bf"; aForce="-f"; fi
#     	                   if [ "${2}"   == "-fb" ]; then aBoth="-bf"; aForce="-f"; fi#
#
#      ---  --------  =  --  =  ------------------------------------------------------  #

#      	    aBasedir="E:/Repos/Robin/AICoder_/dev06-robin"
     	    aBasedir2="$( cd "$( dirname "$0" )" && pwd)"

#     if [[ ${BASH_VERSINFO[0]} -lt 4 ]]; then
#           echo "This script requires Bash 4.0 or later."
#    	    exit 1
#    	    fi
#    	    declare -A pTests  # Populate the associative array

#           --------  =  --  =  ----------------------------------------------  #

  function  setTest() {
            pTests[${1}]="$2"
            }
  function  tess() {
            setTest "Test$1" "$2"
            }
  function  getTest() {
     local  aTest="Test$1"
            echo "${pTests[$aTest]}"
            }
  function  sayMsg( ) {
            echo "  - ${1}" 
            }            
#           --------  =  --  =  ----------------------------------------------  #

#           tess  221 'Set App  c02' 						# 'set app  c02'
#           tess  222 'Set App  c65' 						# 'set app  c65' # not added yet
#           tess  223 'Add App "c65", "1st-Client-App" -d'	# 'add app "c65", "1st-Client-App" -d'
#           tess  224 'New App  c66 "2nd Client App" -d'  	# 'new app  c66 "2nd Client App" -d'
#           tess  225 'New App "c66_2nd Client App"'		# 'new app "c66_2nd Client App" -d'
#           tess  226 'Set App  c66'						# 'set app  c66' # not necessary
#           tess  227 'List App "Client"'					# 'lis app  Client'
#           tess  228 'Show Var "MODEL"'  					# 'sho var  APPMODEL'

#    echo "  Test221: $( getTest 224 )";   exit
#      ---  --------  =  --  =  ------------------------------------------------------  #

  function  setLog() {
            aTS="$( date "+%y%m%d.%H%M" )"; aTS="${aTS:1}"
#           aLogFile="test2-jsh"
            aLogFile="test2-${aTests}_v${aTS}-jsh-bash${aFlags}"
#           aLogDir="/E/Repos/Robin/AICoder_/._/LOGs/Tests/_v${aTS:0:5}"
#           aLogDir="$( pwd | sed 's/\/[^/]*$//' )/._/LOGs/_v${aTS:0:5}/Tests"
            aLogDir="$( pwd | sed 's/\/[^/]*$//' )/._/LOGs/Tests/_v${aTS:0:5}"
            if [ ! -d "${aLogDir}" ]; then mkdir -p "${aLogDir}"; fi
#           aLogFile="${aLogDir}/${aLogFile}-bash_v${aTS}.log"
            aLogFile="${aLogDir}/${aLogFile}.log"
            sayMsg "TEST2[  89]  Setting logfile to: '${aLogFile}'"; # exit
#           echo "  Setting logfile to: '${aLogFile}'"; # exit
            }
#           --------  =  --  =  ----------------------------------------------  #

  function  eval2log( ) {
#           echo "    $1: ${aAWK}, ${aLOG}"; # return

            aTee=""; if [ "${aLOG}" == "log" ]; then aTee="| tee -a \"\${aLogFile}\""; fi
            aAwk=""; if [ "${aAWK}" == "awk" ]; then aAwk="| awk \"NR > ${nSkipLines}\""; fi
#                                    echo "--- eval \"$1\" ${aAwk} ${aTee}"; # return
        if [ "${aLOG}" != "log" ];                           then             eval "$1";    return; fi
        if [ "${aLOG}" == "log" ] && [ "${aAWK}" != "awk" ]; then aOutput="$( eval "$1" )"; fi
        if [ "${aLOG}" == "log" ] && [ "${aAWK}" == "awk" ]; then aOutput="$( eval "$1" | awk  "NR > ${nSkipLines}" )"; fi

             echo "${aOutput}" | tee -a "${aLogFile}";
             }
#           --------  =  --  =  ----------------------------------------------  #

  function  say( ) { aOutput=$( echo -e "$1" );
            if [ "${aLOG}" == "log" ]; then echo "${aOutput}" | tee -a "${aLogFile}"; else echo "${aOutput}"; fi
            }
#           --------  =  --  =  ----------------------------------------------  #

  function  copyJSONc() {
     		aTS="$( date "+%y%m%d.%H%M" )"; aTS="${aTS:1}"
     		aApps_n_Models0='._2/FRTs/AICodeR/templates/AIC80_Apps-n-Model-data_u1.04_template.jsonc'
       if [ -f "${aBasedir}/${aApps_n_Models0}" ]; then        
#    		aApps_n_Models1='._2/FRTs/AICodeR/metadata/AIC80_Apps-n-Model-data.jsonc'
     		aApps_n_Models2='data/JSONs/AIC80_Apps-n-Model-data.jsonc'
     		cp -p "${aBasedir}/${aApps_n_Models2}" "${aBasedir2}/${aApps_n_Models2/.jsonc/_v${aTS}.jsonc}"  # backup 
     		cp -p "${aBasedir}/${aApps_n_Models0}" "${aBasedir2}/${aApps_n_Models2}"

#    		say "\n* Copied new Apps-n-Model-data.jsonc file"
            sayMsg "TEST2[ 123]+ Copied new Apps-n-Model-data.jsonc file" 1
          else 
            sayMsg "TEST2[ 125]* The Apps-n-Model-data.jsonc file doesn't exist." 1
            fi   
         		}
#           --------  =  --  =  ----------------------------------------------  #

  function  tesn( ) {
            nTest=$1; shift
    if [ "${nTestOnly}" != ""  ]; then if [ "${nTestOnly}" == "${nTest/-}" ]; then nTest=${nTestOnly}; else nTest="-${nTest}"; fi; fi
#          echo "-- nTest: ${nTest}, nTestOnly: ${nTestOnly}"; return
    if [ "${nTest:0:1}" == "-" ]; then return; fi
#           testCmd "${aAIC} $@ ${aFlags}"
            testCmd "$@"
            }
#      ---  --------  =  --  =  ------------------------------------------------------  #

            nSkipLines=0

  function  testCmd( ) {

#-- aCmd: '   one   two   "three four"'		-- aArg1: 'one two', 		aArg2: '"three four"'
#-- aCmd: 'list    apps'						-- aArg1: 'list apps', 		aArg2: ''
#-- aCmd: 'set     app      c45'				-- aArg1: 'set app c45', 	aArg2: ''
#-- aCmd: 'add     app     "c45_App No. 45"'	-- aArg1: 'add app', 		aArg2: '"c45_App No. 45"'
#-- aCmd: 'new     app -d'					-- aArg1: 'new app -d', 	aArg2: ''

            aCmd="$1";  # aCmd='  one   two "three four"'
#           echo "-- aCmd:  '${aCmd}'";
#           IFS=' ' read -r aArg1 aArg2 <<< "$aCmd"; aArg2="\"$aArg2\""; echo "-- aArg1: '${aArg1}', aArg2: '${aArg2}'"; exit
            aArg1=$(echo "$aCmd" | sed 's/ *"[^"]*" *$//' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//'| tr -s ' ')
            aArg2=$(echo "$aCmd" | sed 's/^.* "\([^"]*\)".*$/"\1"/'); if [[ ${aCmd} != *\"* ]]; then aArg2=""; fi
#           echo "-- aArg1: '${aArg1}', aArg2: '${aArg2}'"; return

#           aArg1=$1; if [ "${aArg1/\"}" != "${aArg1}" ]; then aArg2="${aArg1/*\"}"; aArg1="${aArg1/\"*}"; echo "-- aArg2: '${Arg2}'"; fi
#           aCmd="$( echo "${aArg1}" | awk '{ sub( / +/g, " " ); print " " tolower($0) }' )";

#           echo "-- aArg1: '${aArg1}', aArg2: '${aArg2}'"; return

            aCmd="${aArg1}"
        if [ "${aArg2}" != "" ]; then
            aName="${aArg2}" # "${2// /}";
            aName="$( echo "${aName}" | awk '{ sub( / +$/, ""); print }' )";
            aName="$( echo "${aName}" | awk '{ sub( /{AppName}/,   "'"${aAppName}"'"   ); print $0 }' )";
            aName="$( echo "${aName}" | awk '{ sub( /{ModelName}/, "'"${aModelName}"'" ); print $0 }' )";
            aName="$( echo "${aName}" | awk '{ sub( /@{File}/,     "'"${aFileName}"'"  ); print $0 }' )";
#           aCmd="${aArg1} \"${aName}\"";
            aCmd="${aArg1} ${aName}";
            fi

#           echo "-- aCmd: ${aCmd}"; # return

            aCmd="$(  echo "${aCmd}"  | awk '{ sub( / \[{app}\]/, ""   ); print $0 }' )";
            aCmd="$(  echo "${aCmd}"  | awk '{ sub( / \[{app}\]/, ""   ); print $0 }' )";
            aCmd="$(  echo "${aCmd}"  | awk '{ sub( / \[{model}\]/, "" ); print $0 }' )";

#           aCmd="$(  echo "${aCmd}"  | awk '{ sub( /{aic}/,   "'"${aAIC}"'"   ); print $0 }' )";
#           aCmd="$(  echo "${aCmd}"  | awk '{ sub( /{aic}/,    '"${aAIC}"'    ); print $0 }' )";

            aCmd="$(  echo "${aCmd}"  | awk '{ sub( /{app}/,   "'"${aApp}"'"   ); print $0 }' )";
            aCmd="$(  echo "${aCmd}"  | awk '{ sub( /{model}/, "'"${aModel}"'" ); print $0 }' )";

            aCmd="$(  echo "${aCmd}"  | awk '{ sub( / \[prompt\]/, "" ); print $0 }' )";
            aCmd="$(  echo "${aCmd}"  | awk '{ sub( / \[next\]/,   "" ); print $0 }' )";
            aCmd="$(  echo "${aCmd}"  | awk '{ sub( / \[{sno\[.msgno\[.ts\]\]}\]/, "" ); print $0 }' )";
            aCmd="$(  echo "${aCmd}"  | awk '{ sub( / {sno\[.msgno\[.ts\]\]}/, " '"${aSNo}"'" ); print $0 }' )";

#           echo -e "\n -----\n -- aCmd: ${aCmd/-d}"; # return

#           if [ "${aDoit}" == "-d"  ] && [ "${aCmd/-d}" != "${aCmd}" ]; then aCmd="${aCmd/-d}"; fi

#           aFlags="${aDebug}"; if [ "${aForce}" == "-f" ]; then aFlags="-f"; fi; if [ "${aBoth}" == "-bf" ]; then aFlags="-bf"; fi
#                               if [ "${aDoit}" == "-d"  ]; then aFlags="${aFlag} -d"; fi

            aCmd="${aAIC} ${aCmd}"
            say ""
            say "\n--------------------------------------------------------------------------------------"
#           say "  - Test ${nTest}. $( echo "${aCmd}" | awk '{ sub( / +$/, "" ); }' ) ${aFlag}  OK:"; # return
            say "  - Test ${nTest}. ${aCmd} ${aFlags}: ${aLOG}, ${aAWK}.  Status:"; # return
            say "  - -----------------------------------------------------------------"

            eval2log "${aCmd} ${aFlags}" ${aAWK} ${aLOG}

#           eval  ${aCmd} -b | awk '/AI202\[ 188/ { sub( /.+188\]/, "" ); print "  " $0 }'

#           if [ "${aDebug}" == "-b" ]; then eval  ${aCmd} ${aDebug}; bDone=1; fi;
#           if [ "${aForce}" == "-f" ]; then eval  ${aCmd} ${aForce} | awk "NR > ${nSkipLines}"; bDone=1; fi
#           if [ "${aBoth}" == "-bf" ]; then eval  ${aCmd} ${aBoth}  | awk "NR > ${nSkipLines}"; bDone=1; fi
#           if [ "${aForce}" == "-f" ]; then # echo "${aCmd} ${aFlags}"
#           if [ "${aDebug}" == "-b" ]; then eval  ${aCmd} ${aFlags} | tee -a "${aLogFile}" ; bDone=1; fi;

#                                                     aAWK="awk"; aLOG=""; if [ "${bLogIt}" == "1" ]; then aLOG="log"; fi
#           if [ "${aFlags/f}" != "${aFlags}" ]; then aAWK="";    aLOG=""; fi # -f requested
#           if [ "${aFlags/b}" != "${aFlags}" ]; then aAWK=""; fi             # -b requested

#           if [ "${aFlags/b}" != "${aFlags}" ]; then bAWK=0; bSkipLines="0"; aFlags="${aFlags/f}f"; fi  # -b requested
#           if [ "${bLogIt}"   == "1"         ]; then bSkipLines="0"; aFlags="${aFlags/f}f"; fi

#           if [ "${bSkipLines}" == "1" ]; then eval2log "${aCmd} ${aFlags}" ${nSkipLines}
#                                          else eval2log "${aCmd} ${aFlags}"; fi

#           if [ "${aForce}" == "-f" ]; then eval  ${aCmd} ${aFlags} | awk "NR > ${nSkipLines}" | tee -a "${aLogFile}"; bDone=1; fi
#           if [ "${aBoth}" == "-bf" ]; then eval  ${aCmd} ${aFlags} | awk "NR > ${nSkipLines}" | tee -a "${aLogFile}"; bDone=1; fi

#           if [ "${bDone}" == "1" ]; then return; fi

#           if [ "${aDebug}" != "-b" ]; then eval "${aCmd}" | awk "NR > ${nSkipLines}" | tee -a "${aLogFile}" ; fi
#           if [ "${aDebug}" != "-b" ]; then eval "${aCmd}";  fi

#           echo ""
            }
#      ---  --------  =  --  =  ------------------------------------------------------  #

#           aFlags="$2"
     if [ "$1" != "" ]; then aTests="$1"; fi
     if [ "${1/-}" != "$1" ]; then aFlags="$1"; aTests="$2"; fi
#    if [ "${2/b}" != "$2" ]; then aDebug="-b"; fi
#    if [ "${2/f}" != "$2" ]; then aForce="-f"; fi
#    if [ "${2/d}" != "$2" ]; then aDoit="-d"; fi

     if [ "${aTests}" == "" ]; then
            aTests='0'
#           aTests='1'
            aTests='1a'
#           aTests='1m1'
#           aTests='1a1'
#           aTests='1a,1b'
            fi

    if [ "${aFlags}" == "" ]; then
#           aDebug="-b"
            aForce="-f"
            aDoit="-d"
            aFlags="${aDebug:1}${aForce:1}${aDoit:1}"; if [ "${aFlags}" != "" ]; then aFlags="-${aFlags}"; fi
            fi
#      ---  --------  =  --  =  ------------------------------------------------------  #

            clear
                                                aAWK="awk";
      if [ "${aFlags/f}" != "${aFlags}" ]; then aLOG="log";    echo "--- no input";  fi # -f requested
      if [ "${aFlags/b}" != "${aFlags}" ]; then aAWK="no awk"; echo "--- no awking"; fi # -b requested

      if [ "${aFlags/f}" == "${aFlags}" ]; then aLOG="no log"; echo "--- no logging"
            echo -e "\n  Can't log output due to user input.  Use -f to force responses."; # exit
#      else setLog; aLOG="log"; echo "--- ok to log"; fi
       else aLOG="log"; echo "--- ok to log"; setLog; fi

            aTests=",${aTests},"
#           say "\n  Running test2.sh. Tests: ${aTests:1} ${aFlags}: ${aAWK}, ${aLOG}, for ${aAIC} in ${aProject}, (${aTS}): "; # exit

      if [ "${aTests/z}" != "${aTests}" ]; then copyJSONc; aTests="${aTests/z}"; fi
      if [ "${aTests:1:1}" == "1" ] || [ "${aTests:1:1}" == "2" ]; then copyJSONc; fi

      if [ "${aTests/y}" != "${aTests}" ]; then node test2.mjs y | awk '/Deleted/'; aTests="${aTests/y}"; fi
      if [ "${aTests/x}" != "${aTests}" ]; then node test2.mjs x | awk '/Cleared/'; aTests="${aTests/x}"; fi

            say "\n  Running test2.sh. Tests: ${aTests:1} ${aFlags}: ${aAWK}, ${aLOG}, for ${aAIC} in ${aProject}, (${aTS}): "; # exit
#           say ""

#      ---  --------  =  --  =  ------------------------------------------------------  #

         if [ "${aTests/,0,/}" != "${aTests}" ]; then

#           tesn   45  'add     app    "c45_App No. 45" -d'
#           tesn   45  'add     app    "c45_App No. 45"'
#           tesn   33  'add     app    "c01_My App"'
#           tesn   33, 'add     app    "c01_my model"' 
#           tesn   33, 'add     app     c01_my model'   
            tesn  -34, 'new     app   "s01_my model api"'  
            fi
#      ---  --------  =  --  =  ------------------------------------------------------  #

         if [ "${aTests/,1a,/}" != "${aTests}" ]; then

            tesn   11  'list    keys'
            tesn   13  'list    keys   app                    '
            tesn   14  'list    keys   platform    app        '   
            tesn   15  'list    keys   platform    model   app'            
            tesn  -16  'save    key'                                        # Does not exist yet
            fi
#      ---  --------  =  --  =  ------------------------------------------------------  #

         if [ "${aTests/,1m,/}" != "${aTests}" ]; then
            sayMsg "TEST2[ 295]* No tests exist for Test1m." 1
            fi
#      ---  --------  =  --  =  ------------------------------------------------------  #

         if [ "${aTests/,1s,/}" != "${aTests}" ]; then
#           sayMsg "TEST2[ 311]* No tests exist for Test1s." 1
            tesn  -11  'save    keys'
            tesn  -13  'save    keys   app                    '
            tesn  -14  'save    keys   platform    app        '   
            tesn  -15  'save    keys   platform    model   app'            

            tesn   11  'save    keys' 
            tesn   12  'save    keys  "c21_My App"' 
            tesn   13  'save    keys   Ollama "c21_My App"' 
            tesn   15  'save    keys   Ollama "My Model" "c21_My App" '            

            tesn   14  'save    keys  "c21_My App" Ollama' 
            tesn   16  'save    keys   ollama "c21_My App" "My Model" '            
            tesn   17  'save    keys  "c21_My App" Ollama  "My Model" '            

            fi
#      ---  --------  =  --  =  ------------------------------------------------------  #

         if [ "${aTests/x/}" != "${aTests}" ]; then
            aTests="${aTests/x/}"
            fi
#      ---  --------  =  --  =  ------------------------------------------------------  #

         if [ "${aTests/,2a,/}" != "${aTests}" ]; then
            sayMsg "TEST2[ 310]* No tests exist for Test2a." 1
            fi
#      ---  --------  =  --  =  ------------------------------------------------------  #

        if [ "${aTests/ 3a /}" != "${aTests}" ]; then
            sayMsg "TEST2[ 315]* No tests exist for Test3a." 1
            fi
#      ---  --------  =  --  =  ------------------------------------------------------  #

        if [ "${aTests/ 2s /}" != "${aTests}" ]; then
            sayMsg "TEST2[ 320]* No tests exist for Test2s." 1
            fi
#      ---  --------  =  --  =  ------------------------------------------------------  #

     if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
