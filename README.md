# react-gradient
  
A React component with built-in functionality to animate simple gradients

[Examples](https://jonkelley88.github.io/react-gradient/)

## Installation

**react-gradient** is available as an [npm package.](https://www.npmjs.com/package/react-gradient)
```bash
$ npm install react-gradient
```

## Usage

```js
import React from 'react';
import { Gradient } from 'react-gradient';

const gradients = [
	['#bd19d6', '#ea7d10'],
	['#ff2121', '#25c668'],
];

export default function App() {
	return (
		<div className="app">
			<Gradient
				gradients={ gradients } // required
				property="background"
				duration={ 3000 }
				angle="45deg"
			/>
		</div>
	);
}
```

## Props

All options for the Gradient component are passed through props

| Props                          | Type         | Default    | Description   | Values                                      
| :-----------------------       | :----:       | :----:     | :------------ | :-----
| gradients **(required)**       | array        |            | List of gradients to transition between | 
| property                       | string       | background | CSS property to apply the gradient to | `background`, <br> `border`, <br> `text`
| gradientType                   | string       | linear     | Fill type of the gradient | `linear`, <br> `radial`
| duration                       | number       | 5000       | How long each transition will take from one gradient to the next in milliseconds | milliseconds
| angle                          | string       | 0deg       | Angle of direction for the gradient's line <i>(Only applies to linear gradients)<i> | [angle units](https://developer.mozilla.org/en-US/docs/Web/CSS/angle)
| transitionType                 | string       | parallel   | How the transition is calculated | `parallel`, <br> `sequential`
| element                        | string       | div        | Type of element to create Gradient with | most [html elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
	


The `gradients` prop accepts gradient arrays. A gradient array must hold two colors, i.e., `[color1, color2]`

The following are acceptable color formats:

| Format   | Type   | Example
| :------- | :----- | :---------------
| keyword  | string | `"SkyBlue"`
| HEX      | string | `"#87ceeb"`
| HSL      | array  | `[197, "71%", "73%"]`
| HSL      | string  | `"hsl(197, 71%, 73%)"`
| RGB      | array  | `[135, 206, 235]`
| RGB      | string | `"rgb(135, 206, 235)"`

## License

MIT License

Copyright (c) 2019 Jon Kelley

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
