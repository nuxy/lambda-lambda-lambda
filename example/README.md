# restfulApiHandler

Handler example with preconfigured routes and middleware.

## Dependencies

- [Visual Studio Code](https://code.visualstudio.com/download)
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org)

### VS Code extensions

- [Remote-Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Running your app

In the VS Code _Command Palette_ choose "Open Folder in Container" which will launch your application in a Docker container allowing for realtime development and testing.  Once launched, the application can be accessed at - [http://localhost:3000/api](http://localhost:3000/api)

## Deploying to AWS

    $ ./deploy

## References

- [Setting IAM Permissions and Roles](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-permissions.html)
- [lambda-lambda-lambda](https://github.com/nuxy/lambda-lambda-lambda)
