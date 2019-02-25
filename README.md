<h1 align="center">react-gradient</h1>
  
<p align="center">A React component with built-in functionality to transition between gradients</p>

## Installation

<b>react-gradient</b> is available as an [npm package.](link-to-published-npm-page)
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

const properties = ['background'];

export default function App() {
	return (
		<div className="app">
			<Gradient
				gradients={ gradients } // required
				properties={ properties } // required
				duration={ 3000 }
				angle="45deg"
			/>
		</div>
	);
}
```

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
