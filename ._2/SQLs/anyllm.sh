#!/bin/bash

# getApiKeys.sh (in /Users/Shared/Repos/AnyLLM)
     db_path="/Users/Shared/Repos/AnyLLM/server/storage/anythingllm.db"
     table_name="api_keys"  # "ApiKey"
     field_name="secret"    # "apiKey"

# Check if sqlite3 is installed
if ! command -v sqlite3 >/dev/null 2>&1; then
     echo "Error: sqlite3 not found. Install it with 'brew install sqlite' on macOS."
     exit 1
     fi

# Check if the database file exists
if [ ! -f "$db_path" ]; then
     echo "Error: Database not found at $db_path"
     exit 1
     fi
# ---------------------------------------------------------------------------

  function  genLine() {
     local  fmt_string="$1"
     local  col_widths=()
     local  col_lines=""
     local  i=0

    while [[ $fmt_string =~ (%[-+]?[0-9]*[sd]) ]]; do
        local  specifier="${BASH_REMATCH[1]}"
        local  width=$(echo "$specifier" | sed 's/[^0-9]//g')
        if [ -z "$width" ]; then
            width=0
        fi
        col_widths[$i]=$width
        fmt_string=${fmt_string#*"${BASH_REMATCH[0]}"}
        ((i++))
    done
    for ((i=0; i<${#col_widths[@]}; i++)); do
        local dashes=$(printf "%${col_widths[$i]}s" | tr ' ' '-')
        if [ $i -eq 0 ]; then
            col_lines="$dashes"
        else
            col_lines="$col_lines,$dashes"
        fi
    done
    echo "$col_lines"
    }
# ---------------------------------------------------------------------------

  function  genFlds() {
     local  col_list="$1"
     local  col_count=$(echo "$col_list" | tr ',' ' ' | wc -w | tr -d ' ')
#       echo "   col_count: '${col_count}'" 
     local  placeholders=""
     for ((i=1; i<=col_count; i++)); do
        if [ $i -eq 1 ]; then
            placeholders="\$1"
        else
            placeholders="$placeholders, \$$i"
        fi
#       echo "   placeholders: '${placeholders}'" 
    done
    echo "$placeholders"
   }
# -----------------------------------------------------------------------------

  function  runSQL() {
       if [ "$1" == "-b" ]; then  echo "  CMD: sqlite3 \"$db_path\" \"${aSQL}\""; fi 

   mRows=$( sqlite3 "$db_path" "${aSQL}" 2>/dev/null ) || {
     echo -e "Error: Failed to query database. Check table (${aTable}) and columns(s) (${Colms}).\n"; exit 1 
     }

#  echo "  genFlds: $( genFlds "${aWdts}" )"
   aAWKscr='
BEGIN{ printf "    '${aWdts//d/s}'\n", "'${aCols//,/\",\ \"}'" 
       printf "    '${aWdts//d/s}'\n", "'${aLine//,/\",\ \"}'" 
       }
     { printf "    '${aWdts}'\n", '$( genFlds "${aWdts}" )' }
END  { }
'         
 if [ "$1" == "-b" ]; then echo "  AWK: ${aAWKscr}"; fi # exit  
#  echo "${mRows}" | awk '{ print "    " $0 }'  

#  echo "${mRows}" | awk -F '|' '{ printf "    '${aWdths}'\n", $1, $2, $3, $4, ( $5 == "" ? "-" : $5 ), $6 }'

#  aAWKscr='{ printf "    '${aWdts}'\n",  $1, $2, $3, $4 }'
#  aAWKsch='{ printf "    '${aWdts}'\n", "num", $1, $2, $3 }'
#  aAWKlin='{ printf "    '${aWdts}'\n", "---", $1, $2, $3 }'

#  aAWKscr='{ printf "    '${aWdts}'\n",  $1, $2, $3, $4 }'
#  aAWKsch='{ printf "    '${aWdts}'\n",  $1, $2, $3, $4 }'
#  aAWKlin='{ printf "    '${aWdts}'\n",  $1, $2, $3, $4 }'

#  echo " awk: '{ printf \"    ${aWdths}\\n\", NR, \$1, \$2, \$3 }'" 
#  echo " awk: ${aAWKscr}" 

#  echo "${mRows}" | awk '{ print "    " $0 }'  
#  echo "${aCols}" | awk -F ',' "${aAWKsch}"
#  echo "${aLine}" | awk -F ',' "${aAWKlin}"

   echo "${mRows}" | awk -F '|' "${aAWKscr}"
   }
# -----------------------------------------------------------------------------

            aCmd="$( echo "$1" | awk '{ print tolower(substr($1,1,1)) tolower(substr($1,2,2)) }' )"
#           aObj="$( echo "$2" | awk '{ print toupper(substr($1,1,1)) tolower(substr($1,2,2)) }' )s"
            aObj="$( echo "$2" | awk '{ print toupper(substr($1,1,1)) tolower(substr($1,2,2)) }' )s"

            echo -e "\n  Executing: '${aCmd}${aObj}' $3"

# -----------------------------------------------------------------------------

      if [ "staPris" == "${aCmd}${aObj}" ]; then 
            cd /Users/Shared/Repos/AnyLLM/server/models
            npx prisma studio 
            fi 
# -----------------------------------------------------------------------------

      if [ "shoKeys" == "${aCmd}${aObj}" ]; then 
#        0  id                        INTEGER        1                     1    4
#        1  secret                    TEXT           0                     0   31
#        2  createdBy                 INTEGER        0                     0    5
#        3  createdAt                 DATETIME       1  CURRENT_TIMESTAMP  0   13
#        4  lastUpdatedAt             DATETIME       1  CURRENT_TIMESTAMP  0   13

            aTable="api_keys"
            aCols="id,secret,createdBy,createdAt,lastUpdatedAt"
            aWdts="%3d  %-31s %9s %-13s %-13s"
            aLine="---,-------------------------------,---------,-------------,-------------" 
            aSQL="SELECT ${aCols} FROM ${aTable} ORDER BY ID DESC LIMIT 10;"
            echo "  SQL: ${aSQL}" 
            echo "  Result: "
                    runSQL -b 
            echo "" 
            fi 
# -----------------------------------------------------------------------------
      if [ "shoDocs" == "${aCmd}${aObj}" ]; then 
#     cid  name                      type     notnull  dflt_value        pk#
#     ---  ------------------------- -------- -------  ----------------- --
#       0  id                        INTEGER        1                     1
#       1  docId                     TEXT           1                     0
#       2  filename                  TEXT           1                     0
#       3  docpath                   TEXT           1                     0
#       4  workspaceId               INTEGER        1                     0
#       5  metadata                  TEXT           0                     0
#       6  createdAt                 DATETIME       1  CURRENT_TIMESTAMP  0
#       7  lastUpdatedAt             DATETIME       1  CURRENT_TIMESTAMP  0
#       8  pinned                    BOOLEAN        0  false              0
#       9  watched                   BOOLEAN        0  false              0

            aTable="workspaces"
            aCols="id,name,vectorTag,createdAt,lastUpdatedAt,chatModel,openAiTemp,TopN,similarityThreshold"
            aWdts="%3d  %-31s %9s %-13s %-13s %-9s %10d %4d %19d"
#           aLine="---,-------------------------------,---------,-------------,-------------,---------,----------,----,-------------------" 
            aLine="$( genLine "${aWdts}" )"
            aSQL="SELECT ${aCols} FROM ${aTable} ORDER BY ID DESC LIMIT 10;"
            echo "  SQL: ${aSQL}" 
            echo "  Result: "
                    runSQL -b 
            echo "" 
            fi 

      if [ "shoWors" == "${aCmd}${aObj}" ]; then 
#      cid  name                      type     notnull  dflt_value        pk
#      ---  ------------------------- -------- -------  ----------------- --
#        0  id                        INTEGER        1                     1  4
#        1  name                      TEXT           1                     0
#        2  slug                      TEXT           1                     0
#        3  vectorTag                 TEXT           0                     0
#        4  createdAt                 DATETIME       1  CURRENT_TIMESTAMP  0  13
#        5  openAiTemp                REAL           0                     0
#        6  openAiHistory             INTEGER        1  20                 0
#        7  lastUpdatedAt             DATETIME       1  CURRENT_TIMESTAMP  0
#        8  openAiPrompt              TEXT           0                     0
#        9  similarityThreshold       REAL           0  0.25               0
#       10  chatModel                 TEXT           0                     0
#       11  topN                      INTEGER        0  4                  0
#       12  chatMode                  TEXT           0  'chat'             0
#       13  pfpFilename               TEXT           0                     0
#       14  chatProvider              TEXT           0                     0
#       15  agentModel                TEXT           0                     0
#       16  agentProvider             TEXT           0                     0
#       17  queryRefusalResponse      TEXT           0                     0
#       18  vectorSearchMode          TEXT           0  'default'          0

            aTable="workspaces"
            aCols="id,name,vectorTag,createdAt,lastUpdatedAt,chatModel,openAiTemp,TopN,similarityThreshold"
            aWdts="%3d  %-31s %9s %-13s %-13s %-9s %10d %4d %19d"
#           aLine="---,-------------------------------,---------,-------------,-------------,---------,----------,----,-------------------" 
            aLine="$( genLine "${aWdts}" )"
            aSQL="SELECT ${aCols} FROM ${aTable} ORDER BY ID DESC LIMIT 10;"
            echo "  SQL: ${aSQL}" 
            echo "  Result: "
                    runSQL # -b 
            echo "" 
            fi 
# -----------------------------------------------------------------------------

      if [ "shoCols" == "${aCmd}${aObj}" ]; then 
            aTableName="$3"
            aTable="pragma_table_info"
            aCols="cid,name,type,notnull,dflt_value,pk"
            aWdts="%4d  %-25s %-8s %7d  %-17s %2d"
            aLine="---,-------------------------,--------,-------,-----------------,--" 
            aSQL="SELECT * FROM ${aTable}('${aTableName}');"
            echo "  SQL: ${aSQL}" 
            echo "  Result: "
                    runSQL
            echo "" 
            fi 
# ------------------------------------------------------------------------------------------------------------------------------

      if [ "shoTabs" == "${aCmd}${aObj}" ]; then 
            aTable="sqlite_master"
            aCols="num,name,tbl_name,rootpage"
            aWdts="%4s  %-30s %-30s %3s"
            aLine="----,------------------------------,------------------------------,--------"
            aSQL="SELECT ROW_NUMBER() OVER (ORDER BY name) AS ${aCols} FROM ${aTable} WHERE type='table' AND name NOT LIKE 'sqlite_%';"
            echo "  SQL: ${aSQL}" 
            echo "  Result: "
                    runSQL
            echo "" 
            fi 
# ------------------------------------------------------------------------------------------------------------------------------



