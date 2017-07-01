Chatty App
=====================

A minimal and light dev environment for ReactJS.

## Final Product

![“Main Page”](https://github.com/tiantiandai/Chatty-App---React/blob/master/images/Screen%20Shot%202017-07-01%20at%203.41.21%20PM.png?raw=true)
![“MainPage: update user name and user count”](https://github.com/tiantiandai/Chatty-App---React/blob/master/images/Screen%20Shot%202017-07-01%20at%203.41.53%20PM.png?raw=true)
![“MainPage: real time chat”](https://github.com/tiantiandai/Chatty-App---React/blob/master/images/Screen%20Shot%202017-07-01%20at%203.42.31%20PM.png?raw=true)

## Getting Started

- Install all dependencies (using the `npm install` command).

- Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
