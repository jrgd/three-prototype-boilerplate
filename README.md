# Threejs Prototyping boilerplate [wip]

Components
- Three JS
- Webpack
- PostCSS 

```yarn dev``` - injects scss compiled into the page; reloads the page on file change (js, html)
```yarn build``` - will copy assets from ./src to ./dist

Webpack configured to resolve 'three' from ./node_modules

      |- dist
      |
      |- src
         |- assets
         |  |- fonts
         |  |- images
         |  |- models
         |
         |- index.html
         |- index.js
         |- index.scss
      