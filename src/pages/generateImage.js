import React, { Component } from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

export default class ImageGenerator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imgSrc: '',
			className: 'img-container hidden',
		};
	}

	generateImage = async () => {
		//Generate the image HERE
		const img = await axios.get('http://localhost:8001/api/img/random');
		this.setState({ imgSrc: img.data.message, className: 'img-container' });
	};
	render() {
		return (
			<div className="container">
				<CssBaseline />
				<h2>Click the button to generate a new picture</h2>
				<Button
					variant="contained"
					onClick={this.generateImage}
					className="button"
				>
					Click Me!
				</Button>
				<img
					src={this.state.imgSrc}
					alt="Random dog image"
					className={this.state.className}
					id="imgContainer"
				/>
			</div>
		);
	}
}
