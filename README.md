# Intel® IoT Examples Datastore

## Introduction

The Intel® IoT Examples Datastore is intended to provide a simple data store for example applications that are part of the Intel IoT Starter Kits examples.

It is a Node.js* application written using [Express][]. It uses a [Redis][] data store.

Although this data storage app was developed to deploy on Microsoft* Azure* since it is based on commonly used open-source modules, it should be easy to deploy on many different cloud hosts.

[Express]: https://github.com/strongloop/express
[Redis]: http://redis.io/

## How it works

The Intel IoT Examples Datastore application provides a simple REST API that allows authorized callers to store either log data, or incremental counter data.

It exposes two sets of routes, both using basic token authentication.

To authorize, provide the AUTH_TOKEN you set in the `X-Auth-Token` HTTP header.

Multiple clients can share the same Intel® IoT Examples Datastore by simply using a different route key for each application.

### Counter

The counter routes are used to increment an increasing counter.

- **GET /counter/:key** - gets the current value of a counter
- **GET /counter/:key/inc** - increments a counter by 1

### Logger

The logger routes wrap Redis* lists, and are used to keep a linear backlog of values.

- **GET /logger/:key** - gets the latest value of a log
- **PUT /logger/:key** - adds a value to a log (`value` param in POST body)
- **GET /logger/:key/all** - returns all values of a log

## Local setup

To install the application dependencies, use the following command:

    $ npm install

You'll also need to have Redis* installed.
For more information, see the [Redis* download page](http://redis.io/download).

## Configuration

Primary configuration for the application takes the form of the following `ENV` variables:

- `REDIS_URL` - the URL to use for Redis* communication
- `REDIS_AUTH` - authentication token for the Redis* backend
- `PORT` - port to serve the application on (defaults to `3000`)
- `AUTH_TOKEN` - authentication token for clients to use

## Deployment - Microsoft* Azure*

This guide covers setting up a deployment environment for the Intel® IoT Datastore on Microsoft* Azure*.

For other platforms, refer to the platform documentation.

Before we begin, ensure you have a [Microsoft* Azure* account](https://portal.azure.com/signin/index).

### Create a new web application

![Settings](images/azure/new-web-app.png)

1. Click **New** and select **Web + Mobile > Web App**.
2. Enter the name for your new web application.
3. Click **Create**.<br>
Your new web application is created.

### Create a new Redis* cache

![Settings](images/azure/new-redis-cache.png)

1. Click **New** and select **Data + Storage > Redis Cache**.
2. Enter the name for your new Redis* cache.
3. Click **Create**.<br>
Your new Redis* cache is created.

### Determine settings for Redis*

![Settings](images/redis-list.png)

1. In the left sidebar, select **Redis Caches** and click the name of the new Redis* cache you created in the previous step.<br>
![Settings](images/redis-properties.png)

2. Select **All settings > Properties**.
3. Write down or copy the value in the **HOST NAME** field so you can use it for the `REDIS_URL` setting for the web application.<br>
![Settings](images/redis-access-keys.png)

4. Select **All settings > Access keys**.
5. Write down or copy the value in the **PRIMARY** or **SECONDARY** field so you can use it for the `REDIS_AUTH` setting for the web application.<br>
![Settings](images/redis-access-ports.png)

6. Select **All settings > Access Ports**.
7. Set the **Allow access only via SSL** option to **No**.
8. Click **Save**.

### Configure the web application

![Settings](images/azure/web-list.png)

1. In the left sidebar, select **Web Apps** and click the name of the new web application you previously created.<br>
![Settings](images/azure/web-app-settings.png)

2. Select **All settings > Application settings**.
3. Scroll down to the **App settings** section.
4. Specify `REDIS_URL` by typing the value from the **HOST NAME** field above.
5. Specify `REDIS_AUTH` by typing the value from the **PRIMARY** field above.
6. Specify `AUTH_TOKEN` by typing whatever shared secret key you want.
7. Click **Save**.

Note: you don't need to set `PORT`, as the Microsoft* Azure* platform does that automatically.

### Deploy the web application

![Settings](images/new-deploy-credentials.png)

1. In the left sidebar, select **Web Apps** and click the name of the new web application you previously created.
2. Select **All settings > Continuous Deployment**.
3. Select **Choose Source > Local Git Repository**.
4. Click **Save**.
5. Select **All settings > Deployment credentials**.
6. Specify **FTP/deployment user name** and **Password**.
7. Click **Save**.
8. Select **All settings > Properties**.
9. Scroll down to the **Git URL** field and copy its contents.
10. In the directory you're using for this repository, use the command line to run the following Git* command that adds a Microsoft* Azure* server for deployment:

    git remote add azure <GitURL>

where `<gitURL>` is the value you obtained from the **Git URL** field on the **Properties** page.

Now you are ready to deploy the application. Run the following Git* command:

    git push azure master

You are prompted for the password you entered under **Deployment credentials**.

You should see output that ends like this:

    ...
    remote: Finished successfully.
    remote: Deployment successful.
    To https://username@my-intel-iot.scm.azurewebsites.net:443/my-intel-iot.git
      * [new branch]      master -> master

This means your application has been deployed to the Microsoft* Azure* cloud.

## Deployment - IBM Bluemix

This guide will cover setting up a deployment environment for the Datastore on IBM Bluemix.

For other platforms, please refer to the platform documentation.

Before we begin, please ensure you have an [IBM Bluemix account]().

### Create New Web App

![Settings](images/bluemix/start-dashboard.png)

Choose the "Space" to which you want to add the new web application, or create a new one.

Click on "Create App"

![Settings](images/bluemix/kind-of-app.png)

Under "What kind of app are you creating?" click on "WEB".

![Settings](images/bluemix/how-get-started.png)

Under "How do you want to get started?" click on "SDK for Node.js".

![Settings](images/bluemix/how-get-started-continue.png)

Click on the "Continue" button.

![Settings](images/bluemix/name-for-app.png)

Under "What do you want to name your new app?" enter a new name, then click on "FINISH".

After a few moments, your new web app will be created. Click on the "Back to Dashboard" link. You will see your new web app listed there.

### Create New Redis Cache

![Settings](images/bluemix/app-dashboard.png)

Click on the new application you created in the previous series of steps.

![Settings](images/bluemix/app-overview.png)

Click on the "Add a service or API".

![Settings](images/bluemix/app-add-services.png)

Click on "Redis Cloud" under "Data and Analytics" section.

![Settings](images/bluemix/add-redis-cloud.png)

Select a plan, then click on the "Create" button.

![Settings](images/bluemix/restage-app.png)

You may be prompted to "Restage Application", if so click on the "Restage" button.

After that, click on the "Back to Dashboard" link at the top left.

### Configure Web App

![Settings](images/bluemix/app-dashboard.png)

Click on the new application you created in the previous series of steps.

![Settings](images/bluemix/app-env-vars.png)

Click on the "Environment Variables" link to display the "Environment Variables" page for the new web app, then cllick on the "User-Defined" tab at the top.

Click on the "Add" button, and enter `AUTH_TOKEN` for the "Name" field, and whatever secret token you want to use for the "Value", then click on the "Save" button.

### Add Git To Web App

![Settings](images/bluemix/app-redis-dashboard.png)

Click on the "Overview" link to return to the "Overview" page for the new web app.

Click on the "Add Git" link located at the top right of the "Overview" page.

![Settings](images/bluemix/create-git.png)

The "Create Git Repository" dialog will be displayed. Make sure the checkbox for "Populate the repo with the starter app package and enable the Build and Deploy pipeline" is checked, then click on the "Continue" button.

![Settings](images/bluemix/create-git-success.png)

After a moment, the "Success!" message should be displayed. Click on the "Close" button.

![Settings](images/bluemix/git-url-overview.png)

The Git URL to the new Git repo will be displayed on the "Overview" page at the top right.

### Configure Git

Now, bring up the command line in the directory you use for this repo. Run the following Git command to add the IBM Bluemix server for deployment:

    git remote add bluemix <GitURL>

where `<gitURL>` is the value you displayed on the "Overview" page.

Now you are ready to deploy.

### Deploy Web App

To deploy your web app, run the following Git command:

    git push bluemix master -f

You will be prompted for your Bluemix username and password.

Once your git push is complete, your application has been deployed to the IBM Bluemix cloud. Please note that it may take a moment for your web app to restart.
