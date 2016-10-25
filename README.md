# [react-webpack-example](https://github.com/StevenIseki/react-webpack-example)

An extremely minimal example of using react, webpack and css modules in production with universal rendering and in development with live reloading...

![](images/react.png)
![](images/cssmodules.png)
![](images/webpack.png)

## Dependencies

* **react** `15.3.1`
* **babel** `6.7.6`
* **webpack** `1.13.2`
* **webpack-dev-server** `1.16.2`
* **express** `4.13.4`
* **css modules**

## Run Dev

* webpack dev server with hot reloading, no server rendering

```
npm install
npm run dev
open http://127.0.0.1:5000
```

## Run Prod

* Universal server side rendering!

```
npm install
npm run build
npm run prod
open http://127.0.0.1:3000
```

## Testing

* Using Enzyme, Tape and Jsdom

```
npm install
npm test
```

## License

[MIT](http://isekivacenz.mit-license.org/)
