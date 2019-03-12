# [react-webpack-example](https://github.com/StevenIseki/react-webpack-example)

An extremely minimal example of using react, webpack and styled components in production with universal rendering and in development with live reloading...

Styled components server rendering setup inspired by Dennis Brotzky [guide-to-server-side-rendering-react-with-styled-components](https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf)

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
yarn dev
open http://127.0.0.1:3000
```

## Run Server

* Universal server side rendering!

```
yarn
yarn build
yarn prod
open http://127.0.0.1:3000
```

## Testing

* Using Enzyme, Tape and Jsdom

```
yarn
yarn test
```

## License

[MIT](http://isekivacenz.mit-license.org/)
