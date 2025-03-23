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

# Query the ApiKey table for apiKey field
if [ "shoKeys" == "shoKeys" ]; then 
sqlite3 "$db_path" "SELECT $field_name , id FROM $table_name;" 2>/dev/null || {
  echo "Error: Failed to query database. Check table ($table_name) and field ($field_name)."
  exit 1
  }; fi 

if [ "shoTables" != "shoTables" ]; then 
sqlite3 "$db_path" "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';" 2>/dev/null || {
  echo "Error: Failed to query database. Check table ($table_name) and field ($field_name)."
  exit 1
  }; fi 
