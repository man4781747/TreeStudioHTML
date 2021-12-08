dockerfolderPath=$(pwd)/DockerFiles/DjangoServer
dockerfilePath=$dockerfolderPath/dockerfile

if [ -f $dockerfilePath ]; then
    cd $dockerfolderPath
else
    echo 'dockerfile not exists :'$dockerfilePath
    exit 1
fi

containerName=tree_studio_server
port_out=8999
port_in=8000
imageName=django-server:latest

djangofilePath=$(pwd)/../../Volume/DjangoServer/TreeStudio
# echo $djangofilePath

if [ -d $djangofilePath ]; then
    echo 'Django folder exists :'$containerName
else
    echo 'Django folder not exists :'$containerName
    exit 1
fi

echo 'Try to get container ID which name is '$containerName

containerID=$(docker ps -a --filter "NAME=$containerName" --format "{{.ID}}")
if ["$containerID" = ""]
then
    echo "Can't find container: $containerName"
else
    echo "container ID: "$containerID
    echo "Stop server..."
    docker rm -f $containerID
    echo "Stop server DONE"
fi


echo "Try to reboot server..."
docker run -tid --name $containerName -p $port_out:$port_in \
-v $djangofilePath:/code \
$imageName sudo python manage.py runserver 0.0.0.0:$port_in --insecure

echo "Reboot server DONE"

exit 0