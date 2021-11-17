containerName=tree_studio_server

echo 'Try to get container ID which name is '$containerName

containerID=$(sudo docker ps -a --filter "NAME=$containerName" --format "{{.ID}}")
if ["$containerID" = ""]
then
    echo "Can't find container: $containerName"
else
    echo "container ID: "$containerID
    echo "Stop server..."
    sudo docker rm -f $containerID
    echo "Stop server DONE"
fi

exit 0