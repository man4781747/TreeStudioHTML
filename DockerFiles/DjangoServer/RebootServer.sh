containerName=tree_studio_server
port_out=8801
port_in=8000
dockerfilePath=$(pwd)/../../Volume/DjangoServer/TreeStudio
# echo $dockerfilePath

if [ -d $dockerfilePath ]; then
    echo 'Django folder exists :'$containerName
else
    echo 'Django folder not exists :'$containerName
    exit 1
fi

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
echo "Try to reboot server..."
sudo docker run -tid --name $containerName -p $port_out:$port_in \
-v $dockerfilePath:/code \
treestudiohtml_web sudo sh runServerBash.sh

echo "Reboot server DONE"

exit 0