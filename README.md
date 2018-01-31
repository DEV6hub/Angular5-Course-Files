# Angular5-Course-Files
Course files for the Angular 5 course.

### Demos

To run the demo code for a specific module:

```
$ cd demos
$ ng serve --app ${directory_name}
```
e.g. 
```
$ ng serve --app getting-started
```

App server will be available at localhost:4200


### Completed Exercises

To run the completed exercise code for a specific module:

```
$ cd completed
$ ng serve --app ${directory_name}
```
e.g. 
```
$ ng serve --app component-styling
```

### Server

Some modules involve making an async call to a server. This server is available in the following location.

```
$ cd exercise/resources/server
$ node server.js
```

When running, the app will be able to hit the server at localhost:9000. All modules that make async calls rely on the same server.

### Student Code

Throughout the course, students should be writing code within the "exercise" folder and extending the application with each module. To run this code, they should only have to run `ng serve`