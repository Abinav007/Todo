# ToDo

ToDo is a Web Application used to monitor the task to be done.

## Technology Stack

Picture For App Representation



## Deployment
### Docker
Build a couple of  Docker image:
Picture for Frontend and Backend
```python
$ cd Deploy/Docker
```
Build the image for Frontend
```python
$ docker build -f Dockerfile-frontend -t abinavram/todoappangular .

$ docker build -f Dockerfile-backend -t abinavram/todoappnode .
```
Run the Docker image using Container:
Need to specify the port to access the app outside the container and view in Browser
```python
$ docker run -p 4200:4200 abinavram/todoappangular
$ docker run -p 8080:8080 abinavram/todoappnode
```
Push the image to Docker Hub
```python
$ docker push abinavram/todoappangular
$ docker push abinavram/todoappnode
```
Successfully build the two images for both frontend and Backend :)
## Docker-Compose
Docker - Compose will run the multiple images in a multiple container . So that Containers can be accessable.
```python
$ docker-compose up
```
Above command will run three images : abinavram/todoappangular, abinavram/todoappnode and mongo.
Picture for Representation three images
## Kubernetes
Picture for Frontend and Backend

Start the minikube in Local Machine
```python
$ minikube start
$ cd Deploy/Minikube
```
Create a Deployment in Minikube 
```python
$ kubectl create -f angular.yaml,node-deploment.yaml,node-service.yaml,mongo-deployment.yaml,mongo-service.yaml
```
Check the Pods and Services are created
```python
$ kubectl get pods
$ kubectl get services
```
Successfully created Services Pods and Deployment,
Name of Service created: 
mongo-service , node-service and angular-service.
```python
$ minikube service angular-service
```
You can able to view the application in Browser.
