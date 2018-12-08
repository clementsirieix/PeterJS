<p align="center">
  <img width="348" height="117" src="logo.png">
</p>

Peter is a dead simple thumbnail generator for your node app, using [sharp](https://github.com/lovell/sharp).

## Installation
To install the latest version:
```
yarn add peter-generator
```
Or if you are using npm:
```
npm install --save peter-generator
```

## Let’s Get Started!
Adding the library to your project is that easy!
```
import { ThumbnailGenerator } from 'peter-generator'

const gen = new ThumbnailGenerator()
gen.generate(imgBuffer)
    .then(resBuffer => {
        // Handle result
    })
 ```
 
 You can pass options to improve the quality/performance of the generation:
 ```
new ThumbnailGenerator({
    sizeLimit: '200kB',
})
 ```
 
You can find more information [here](http://www.clementsirieix.fr/PeterJS/).
