#!/usr/bin/env

# If the no KEG_DOCKER_EXEC env is set, just sleep forever
# This is to keep our container running forever
if [[ -z "$KEG_DOCKER_EXEC" ]]; then
  tail -f /dev/null
  exit 0

else

  # Ensure the DOC_APP_PATH is set
  if [[ -z "$DOC_APP_PATH" ]]; then
    DOC_APP_PATH=/keg/tap
  fi

  # cd into the tap repo
  cd $DOC_APP_PATH

  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="tap:start"
  fi

  # This is a temp fix until we are able to update expo
  if [[ -d "$DOC_APP_PATH/node_modules/keg-core/.expo" ]]; then
    rm -rf $DOC_APP_PATH/node_modules/keg-core/.expo
  fi

  # Start the tap instance
  echo $"[ KEG-CLI ] Running command 'yarn $KEG_EXEC_CMD'" >&2
  yarn $KEG_EXEC_CMD

fi
