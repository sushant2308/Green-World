# About The Project
![alt text](https://i.ibb.co/pW12SCD/Screenshot-44.png)
<br>
<br>
Green-World is an E-commerce web app in which a user can both sell as well as buy products. Since its a development project there is no payment gateway.
Following are some of the features in this webapp:

* Authentication
* Authorization
* CRUD operations for product
* Purchase History

# Getting started

## Prerequisites

* Install [Node](https://nodejs.org/en/)
* Install [Python](https://www.python.org/)

## Setup

```sh
$ git clone https://github.com/sushant2308/Green-World.git
$ cd Green-World
```
For backend
```sh
$ virtualenv2 --no-site-packages env
$ source env/bin/activate
(env)$ pip install -r requirements.txt
(env)$ cd backend
(env)$ python manage.py makemigrations
(env)$ python manage.py migrate
(env)$ python manage.py runserver
```

For Frontend
```sh
$ cd frontend
$ npm install
$ npm run
```

# Code Overview

## Dependencies

- [Django](https://docs.djangoproject.com/en/3.2/) - The server for handling and routing HTTP requests
- [Django Rest Framework](https://www.django-rest-framework.org/) - Framework for creating REST Apis
- [React](https://reactjs.org/) - Javascript Library for creating user interface
- [Axios](https://github.com/axios/axios) - HTTP Client for making requests to backend server
- [React-router](https://github.com/remix-run/react-router) - Routing for react App
