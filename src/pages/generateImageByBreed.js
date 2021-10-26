import React, { Component } from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

export default class ImageGenerator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breeds: [],
			imgSrc: '',
			className: 'img-container hidden',
		};
	}

	//Populate the selct's options
	componentDidMount() {
		fetch('http://localhost:8001/api/breeds')
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					breeds: Object.keys(json.message),
					imgSrc: '',
					className: 'img-container hidden',
				});
			});
	}

	generateImage = async (e) => {
		//Generate the image HERE
		const img = await axios.get(
			`http://localhost:8001/api/img/${e.target.value}`
		);
		const { breeds } = this.state;
		this.setState({
			imgSrc: img.data.message,
			className: 'img-container',
			breeds: breeds,
		});
	};

	render() {
		const { breeds } = this.state;
		return (
			<div className="container">
				<CssBaseline />
				<h2>Select a breed to generate an image</h2>
				<select id="list" onChange={this.generateImage} className="select">
					<option value="">Select a breed</option>
					{breeds &&
						breeds.map((breed) => (
							<option value={breed} key={breed}>
								{breed}
							</option>
						))}
				</select>
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
