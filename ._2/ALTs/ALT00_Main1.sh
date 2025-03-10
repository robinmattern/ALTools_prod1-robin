#!/bin/bash
# ALTools Launch Script on rm228p-w11p

         JPT_Scr=ALT01_Main1-Script_u1.01.sh 
         JPT_Dir="$( cd "$( dirname "$0" )" && pwd )"                  
#echo "" 
#echo  "$JPT_Dir/$JPT_Scr" "$@"                                        
       "$JPT_Dir/$JPT_Scr" "$@"                                        
