# react-fabricjs-whiteboard ( 👷‍♀️ 🔨)

React whiteboard component based on [Fabric.js](http://fabricjs.com/) and [React-PDF](https://github.com/wojtekmaj/react-pdf#readme).

Demo page: https://vigorous-heisenberg-7f8730.netlify.app/

<br/>

## Compatibility
React 17

<br/>

## Installation
```shell
npm install react-fabricjs-whiteboard
```

or

```shell
yarn add react-fabricjs-whiteboard
```

<br/>

## Usage
```javascript
import { Whiteboard } from "react-fabricjs-whiteboard";

const App = () => {
  return <Whiteboard aspectRatio={4 / 3}/>
};
```

<br/>

## props
| Name        | Type    |  Default 	|  Description 	|
|---	        |---  	  |---      	|---	          |
| aspectRatio |  number |   4/3	    |  An aspect ratio(width/height) of the canvas. You can resize the canvas with the same aspect ratio. |
