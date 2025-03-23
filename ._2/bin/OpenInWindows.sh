#!/bin/bash

# Variables
remote_user="robin"
remote_host="10.0.0.126"  # Replace with your Windows PC's IP
remote_name="rm228-robin"
ssh_key="~/.ssh/Robin.Mattern@GitHub_ram_a210727_key"
remote_dir="E:/Repos/Robin/AIDocs_/._/EDIT Files"
remote_file="$remote_dir/$(basename "$1")"

windows_remote_dir=$( echo "$remote_dir"  | sed 's|/|\\|g')
windows_remote_file=$(echo "$remote_file" | sed 's|/|\\|g')

# echo "  windows_remote_dir: '${windows_remote_dir}'"; exit

local_file="$1"  # Passed from VSCode (${file})
aFilename=$(basename "$local_file")
aDirectory=$(dirname "$local_file")

aTS="$( date +%y%m%d.%H%M)"; aTS="${aTS:1}"
startTime=$(date +%s.%N)

#  echo ""
  echo "  Starting at:  ${aTS}"
  echo "  Sending file: ${aFilename}"
  echo "          from: ${aDirectory}" 
  echo "            to: ${remote_dir}" 

# Create local directory if it doesn’t exist (on Windows via SSH)
# echo "  ssh \"${remote_name}\" \"mkdir  \\\"${windows_remote_dir}\\\"\"" 
          ssh  "${remote_name}"   "mkdir    \"${windows_remote_dir}\" 2>NUL" || true
#    echo "* The remote folder probably alread exists, '${windows_remote_dir}'" 
#  echo "  [mkdir completed]"

# Copy file from Mac Mini to Windows PC
# echo "  scp -i \"$ssh_key\" \"$local_file\" \"$remote_user@$remote_host:$windows_remote_file\""; 
          scp -i  "$ssh_key"   "$local_file"   "$remote_user@$remote_host:$windows_remote_file" >/dev/null 2>&1 || {
    echo "* Error: Could not copy, '$local_file', to '$remote_host:$remote_file'"
    echo ""; exit 1
    }

 # echo "  [scp completed]"
endTime=$(date +%s.%N)
elapsedTime=$(echo "$endTime - $startTime" | bc)

  echo "  Completed in: ${elapsedTime} secs"
  exit 0

# Execute edit.sh on Windows to open TextPad
# echo "  ssh \"${remote_name}\" \"bash -c \\\"textpad \\\"${remote_file}\\\" &\""
# echo "  ssh \"${remote_name}\" \"bash -c \"textpad \\\"${remote_file}\\\"\" & \""
#        ssh  "${remote_name}"   "bash -c \"textpad \\\"${remote_file}\\\" &\"" || {
#    echo "^ Error: Could not open, '$remote_file', in TextPad"
#    echo ""; exit 1
#    }
   exit

# Execute textpad on Windows using nohup to detach
#echo "  ssh \"${remote_name}\" \"bash -c \\\"nohup textpad \\\"${windows_remote_file}\\\" > /dev/null 2>&1 &\\\"\""
#        ssh  "${remote_name}"   "bash -c   \"nohup textpad \\\"${windows_remote_file}\\\" > /dev/null 2>&1 &\"" || {
#    echo "^ Error: Could not open, '$remote_file', in TextPad"
#    echo ""; exit 1
#    }

    echo " bye"
