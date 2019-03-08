# [react-webpack-example](https://github.com/StevenIseki/react-webpack-example)

An extremely minimal example of using react, webpack and styled components in production with universal rendering and in development with live reloading...

![](images/react.png)
![](images/styled-components.png)
![](images/webpack.png)

## Dependencies

* **react** `16.0.0`
* **babel** `7.3.3`
* **webpack** `4.29.4`
* **styled components** `4.1.3`

## Run Dev

* webpack dev server with hot reloading, no server rendering

```
yarn
npm run dev
open http://127.0.0.1:5000
```

## Run Prod

* Universal server side rendering!

```
yarn
npm run build
npm run prod
open http://127.0.0.1:3000
```

## Testing

* Using Enzyme, Tape and Jsdom

```
yarn
npm test
```

## License

[MIT](http://isekivacenz.mit-license.org/)
