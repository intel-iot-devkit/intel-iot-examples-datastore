# Intel® IoT Examples Datastore

## Introduction

The Intel® IoT Examples Datastore is intended to provide a simple data store for example applications that are part of the Intel® IoT Starter Kits examples.

It is a Node.js* application written using [Express][]. It uses a [Redis][] data store.

Although this data storage app has been developed to deploy on Microsoft* Azure*, IBM* Bluemix*, or Amazon* Elastic Beanstalk*, since it is based on commonly used open-source modules, it should be easy to deploy on many different cloud hosts.

[Express]: https://github.com/strongloop/express
[Redis]: http://redis.io/

## How it works

The Intel® IoT Examples Datastore application provides a simple REST API that allows authorized callers to store either log data, or incremental counter data.

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

Before we begin, ensure you have a Microsoft* Azure* account:

[https://portal.azure.com/signin/index](https://portal.azure.com/signin/index)

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

## Deployment - IBM* Bluemix*

This guide covers setting up a deployment environment for the Intel® IoT Examples Datastore on IBM* Bluemix*.

For other platforms, refer to the platform documentation.

Before we begin, please ensure you have an IBM* Bluemix* account:

[https://console.ng.bluemix.net/home/auth/bluemix](https://console.ng.bluemix.net/home/auth/bluemix)

### Create a new web application

![Settings](images/bluemix/start-dashboard.png)

Choose the **Space** where you want to add a new web application, or create a new one.

1. Click **Create App**.<br>
![Settings](images/bluemix/kind-of-app.png)

2. Under **What kind of app are you creating?**, click **WEB**.<br>
![Settings](images/bluemix/how-get-started.png)

3. Under **How do you want to get started?**, click **SDK for Node.js™**.<br>
![Settings](images/bluemix/how-get-started-continue.png)

4. Click **Continue**.<br>
![Settings](images/bluemix/name-for-app.png)

5. Under **What do you want to name your new app?**, type a new name.
6. Click **FINISH**.

After a few moments, your new web app is created. Click the **Back to Dashboard** link. You can see your new web app listed there.

### Create a new Redis* cache

![Settings](images/bluemix/app-dashboard.png)

1. Click the new application you created in the previous series of steps.<br>
![Settings](images/bluemix/app-overview.png)

2. Click **Add a service or API**.<br>
![Settings](images/bluemix/app-add-services.png)

3. Under **Data and Analytics**, click **Redis Cloud**.<br>
![Settings](images/bluemix/add-redis-cloud.png)

4. Select a plan.
5. Click **Create**.

![Settings](images/bluemix/restage-app.png)

You may be prompted to restage your application. If so, click **Restage**.

### Configure the web application

![Settings](images/bluemix/app-redis-dashboard.png)

1. Click the **Overview** link to return to the **Overview** page for the new web app.
2. Click the **Add Git** link at the top right of the **Overview** page.

![Settings](images/bluemix/create-git.png)

3. The **Create Git Repository** dialog box is displayed. Make sure the **Populate the repo with the starter app package and enable the Build and Deploy pipeline** check box is selected.
4. Click **Continue**.

![Settings](images/bluemix/create-git-success.png)

5. In the **Success!** message box, click **Close**.

![Settings](images/bluemix/git-url-overview.png)

URL to the new Git* repository is displayed at the top right of the **Overview** page.

### Configure Git*

Bring up the command line in the directory you're using for this repository. Run the following Git* command to add the IBM* Bluemix* server for deployment:

    git remote add bluemix <GitURL>

where `<GitURL>` is the value displayed at the top right of the **Overview** page.

Now you are ready to deploy the application.

### Deploy the web application

To deploy your web application, run the following Git* command:

    git push bluemix master -f

You are prompted for your IBM* Bluemix* username and password.

Once the operation is complete, your application has been deployed to the IBM* Bluemix* cloud.

Note: it may take a moment for your web application to restart.

## Deployment - Amazon* Elastic Beanstalk*

This guide covers setting up a deployment environment for the Intel® IoT Examples Datastore on Amazon* Web Services using Elastic Beanstalk*.

For other platforms, refer to the platform documentation.

Before we begin, please ensure you have an Amazon* Web Services account:

[http://aws.amazon.com/](http://aws.amazon.com/)

### Install Amazon* Elastic Beanstalk* CLI tools

To deploy the Intel® IoT Examples Datastore on Amazon* Web Services using Elastic Beanstalk*, you must first install the EB CLI tools.

[http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)

### Create a new web application

Bring up the command line in the directory you're using for this repository. Run the following EB command to create a new Amazon* Web Services application:

```
eb init
```

When you are prompted for the Elastic Beanstalk region, type the number of the region you wish, or go ahead and choose the default.

When you are prompted for the Elastic Beanstalk application to use, type the number corresponding to the option **Create new Application**.

When prompted, type **y** if you want to set up Secure Shell (SSH) to connect to your instances. Type **n** if you do not want to set up SSH.

### Deploy your web application

Now, you can create your running environment, by typing the folloing command:

```
eb create
```

When you are prompted for the Elastic Beanstalk* environment name, type the name of the environment. If you want to accept the default, press **Enter**.

When you are prompted to provide a CNAME prefix, type the CNAME prefix you want to use. If you want to accept the default, press **Enter**.

### Configure your web application

Most of the configuration settings are automatically determined by the Intel® IoT Examples Datastore application itself when running under Amazon* Elastic Beanstalk*. To set the `AUTH_TOKEN`, type the following command, substituting your desired token:

```
eb setenv AUTH_TOKEN=<your token>
```
