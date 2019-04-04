import React from 'react';
import Text from './components/Text';
import Pound from './components/Pound';
import Button from './components/Button';
import Image from './components/Image';

export default function App() {
	return (
		<div className="app">
			<div className="header">
				<a 
					href="https://github.com/JonKelley88/react-gradient"
					target="blank"
				>
					<Text />
				</a>
			</div>
			<div className="content">
				<h2>
					<Pound /> Header Text
				</h2>

				<p>JSX:</p>
				<pre>
					<code className="language-jsx">
						{`
	<Gradient
		gradients={[
			['#FFFD00', '#9CA2FF'],
			['#FF47F4', '#6DFF5C'],
		]}
		property="text"
		element="h1"
		angle="30deg"
		className="text"
	>
		react-gradient
	</Gradient>
						`}
					</code>
				</pre>

				<p>CSS:</p>
				<pre>
					<code className="language-css">
						{`
	.text {
		font-family: 'Montserrat';
		font-size: 60px;
		font-weight: 800;
		font-style: italic;
		padding: 5px 10px;
		margin: 0;
	}
						`}
					</code>
				</pre>

				<p>Result:</p>
				<div className="content__example">
					<Text />
				</div>

				<h2>
					<Pound /> Button
				</h2>

				<p>JSX:</p>
				<pre>
					<code className="language-jsx">
						{`
	<Gradient
		gradients={[
			['lime', 'coral'],
			['magenta', 'gold'],
			['violet', 'royalblue']
		]}
		property="background"
		element="button"
		angle="90deg"
		transitionType="sequential"
		duration="3000"
		className="button"
	>
		button
	</Gradient>
						`}
					</code>
				</pre>

				<p>CSS:</p>
				<pre>
					<code className="language-css">
						{`
	.button {
		color: white;
		border: none;
		padding: 5px 35px;
		border-radius: 40px;
		font-size: 30px;
		font-weight: 100;
		box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
	}
						`}
					</code>
				</pre>

				<p>Result:</p>
				<div className="content__example">
					<Button />
				</div>

				<h2>
					<Pound /> Cat Picture Border
				</h2>

				<p>JSX:</p>
				<pre>
					<code className="language-jsx">
						{`
	<Gradient
		gradients={[
			['rgb(231, 75, 255)', 'rgb(255, 243, 75)'],
			['rgb(255, 78, 167)', 'rgb(167, 255, 78)'],
			['rgb(255, 127, 63)', 'rgb(63, 197, 255)'],
			['rgb(255, 228, 74)', 'rgb(195, 74, 255)']
		]}
		property="border"
		element="img"
		src="https://i.ibb.co/Z8GdxjM/kitty.jpg"
		className="image"
	/>
						`}
					</code>
				</pre>

				<p>CSS:</p>
				<pre>
					<code className="language-css">
						{`
	.image {
		width: 300px;
		border: 10px solid;
	}
						`}
					</code>
				</pre>

				<p>Result:</p>
				<div className="content__example">
					<Image />
				</div>
			</div>
		</div>
	);
};