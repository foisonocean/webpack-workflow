# webpack-workflow
##### A boilerplate to write your multi-page sites in es7 and use modern modules manager.

## How to use?

```
git clone https://github.com/foisonocean/webpack-workflow.git
cd webpack-workflow
```

then install the dependencies:

```
npm install
```

or

```
yarn
```

Finally use `npm start` or `yarn start` to run the project, and visit <http://localhost:3000/hello-world.html> and <http://localhost:3000/demo.html> to see the sample pages.


## How to write the code?

You can write some `html` files in `/src` folder, webpack will automatically use the same name js file in `/src/js` folder for its entry point(*For example, `/src/demo.html` will automatically use `/src/js/demojs` for its entry point*), then you can visit `http://localhost:3000/[filename].html` to see the page.
Each `html` file **can only have one** entry point.


## Todos

- [x] basic webpack config
- [x] handle styles
- [ ] LESS、SASS、POSTCSS
- [ ] CSS Modules
