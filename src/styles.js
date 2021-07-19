import styled, { createGlobalStyle } from 'styled-components';

import openSans200 from './fonts/opensans-200.ttf';
import openSans300 from './fonts/opensans-300.ttf';
import openSans400 from './fonts/opensans-400.ttf';
import openSans600 from './fonts/opensans-600.ttf';

import flipHorizontal 	from './images/flip-horizontal.svg';
import flipVertical 	from './images/flip-vertical.svg';
import rotateIcon 		from './images/rotation.svg';
import Loader 			from './images/loader.png';
import BeerImg 			from './images/beer.png';

export default createGlobalStyle`
	@font-face {
		font-family: 'opensans light';
		font-style: normal;
		font-weight: 200;
		src: url(${openSans200});
	}

	@font-face {
		font-family: 'openSans regular';
		font-style: normal;
		font-weight: 300;
		src: url(${openSans300});
	}

	@font-face {
		font-family: 'opensans semibold';
		font-style: normal;
		font-weight: 400;
		src: url(${openSans400});
	}

	@font-face {
		font-family: 'opensans bold';
		font-style: normal;
		font-weight: 600;
		src: url(${openSans600});
	}

	* {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
	}

	html {
		position: relative;
		line-height: 1.5;
		color: #6e6e6e;
		overflow-y: scroll;

		@media (max-width: 600px) {
			section.demo {
				border-top: 0;
			}
		}
	}

	body {
		-webkit-font-smoothing: antialiased;
		overflow: hidden;
	}

	#root {
		position: relative;
		height: 100vh;
		overflow: auto;

		.wrapper {
			position: relative;
			display: table;
			width: 100%;
			height: 100vh;
			margin:  auto 0 auto;
			padding: 120px 0 20px 0;
			padding-bottom: 10px;

			@keyframes flip-with-rotate {
				from   	{ transform: rotate(0deg); }
				to 		{ transform: rotate(360deg); }
			}

			.loader {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 100px;
				height: 100px;
				border-radius: 100%;
				font-family: 'opensans light';
				font-size: 13px;
				text-align: center;
				color: #fff;

				&:after {
					content: "";
					display: inline-block;
					position: absolute;
					top: -6px;
					left: -6px;
					width: 108px;
					height: 108px;
					border: 2px dashed #fff;
					border-radius: 100%;
				}

				&:before {
					content: "";
					display: inline-block;
					width: 100px;
					height: 100px;
					border-radius: 100%;
					overflow: hidden;
					background-image: url(${Loader});
					background-size: 100px;
					background-repeat: no-repeat;
					background-position: center;
					transition: .3s;
					animation: flip-with-rotate 15s infinite linear;
				}
			}
		}

		.muuri {
			position: absolute;
			margin: 0 20px;
			background-color: #fff;
			border-radius: 5px;
			z-index: 1;
		}
	}

	.grid { max-width: 1000px; }

	.item {
		z-index: 1;
		cursor: pointer;

		.muuri-item-positioning { /* z-index: 2; */ }
		.muuri-item-dragging,
		.muuri-item-releasing 	{ /* z-index: 3; */ }
		.muuri-item-dragging 	{ cursor: move;}
		.muuri-item-hidden 		{ /* z-index: 0; */ }
		.w2 					{ width: 100px; }
	}

	.item-content {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		font-size: 24px;
		font-weight: 300;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 4px;
		overflow: hidden;
		margin: 3px;

		> div {

			&.horizontal {
				position: relative;
				transition: .3s;
				transform: rotateY(0deg);

				&.active {
					transform: rotateY(180deg);
				}

				div {
					&.vertical {
						position: relative;
						transition: .3s;
						margin-top: 0px;

						&.active {
							transform: rotateX(180deg);
							margin-top: -10px;
						}
					}
				}
			}
		}

		img {
			width: 100%;
			transition: .3s;
			cursor: move;

			&.active {
				margin-top: -10px;
			}
		}

		.tools {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			bottom: -20px;
			left: 0;
			width: 100%;
			height: 20px;
			transition: .3s;

			.flip-horizontal,
			.flip-vertical,
			.rotate {
				display: block;
				float: left;
				width: 20px;
				height: 20px;
				background-position: center;
				background-repeat: no-repeat;
				border-radius: 100%;
				background-color: #fff;
				cursor: pointer;
			}

			.flip-horizontal {
				background-image: url(${flipHorizontal});
				background-size: 14px;
			}

			.flip-vertical {
				margin: 0 10px;
				background-image: url(${flipVertical});
				background-size: 8px;
			}

			.rotate {
				background-image: url(${rotateIcon});
				background-size: 14px;
			}

			&.active {
				bottom: 3px;
			}
		}

		a {
			position: absolute;
			top: 5px;
			right: 5px;
			font-family: 'opensans bold';
			font-size: 12px;
			text-shadow: 0px 0px 1px #000000;
			color: #fff;
			transition: .3s;
			opacity: 0;
			text-decoration: none;

			&.active {
				opacity: 1;
			}
		}

		&.active {
			transition: .4s;
			border: 5px solid;
		}
	}

	.popup-content {
		margin: auto;
		background: #fff;
		width: 53%;
		padding: 5px;
		border-radius: 10px;
		user-select: auto;
	}

	.popup-overlay { background: rgba(0, 0, 0, 0.5); }

	.modal {
		.header {
			width: 100%;
			font-family: 'opensans semibold';
			font-size: 13px;
			color: #000;
			font-size: 18px;
			text-align: center;
			padding: 5px;
		}

		.content {
			width: 100%;
			padding: 10px 5px;
			font-family: 'opensans light';
			font-size: 13px;
			text-align: center;
			user-select: text!important;

			a, span {
				font-family: 'opensans semibold';
				text-decoration: none;
				color: #000;
			}
		}

		.actions {
			width: 100%;
			padding: 10px 5px;
			margin: auto;
			text-align: center;
		}

		.close {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			right: -10px;
			top: -10px;
			width: 25px;
			height: 25px;
			cursor: pointer;
			font-size: 14px;
			background: #ffffff;
			border: 1px solid transparent;
			border-radius: 100%;
		}
	}
`

export const StartScreen = styled.div `
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 650px;

	@keyframes rotation {
		from   	{ transform: rotate(0deg); }
		to 		{ transform: rotate(360deg); }
	}

	@keyframes rotation2 {
		from   	{ transform: rotate(360deg); }
		to 		{ transform: rotate(0deg); }
	}

	.image-container {
		position: relative;
		width: 300px;
		height: 300px;
		margin: 50px auto 50px auto;
		border-radius: 100%;
		overflow: hidden;
	}

	.logo-image {
		width: 300px;
		height: 300px;
		background-size: 100%;
		animation: rotation 30s infinite linear;
	}

	.circle {
		position: absolute;
		top: 30px;
		left: calc(50% - 170px);
		transform: translate(-50%, 10px);
		width: 340px;
		height: 340px;
		border-radius: 100%;
		border: 3px dashed #fff;
		animation: rotation2 30s infinite linear;
	}

	label {
		display: inline-block;
		width: 100%;
		font-family: 'opensans-light';
		color: #fff;
		font-size: 28px;
		text-align: center;
	}

	input {
		display: block;
		width: 940px;
		height: 60px;
		margin: 30px auto;
		font-family: 'opensans-bold';
		font-size: 15px;
		text-align: center;
		border: 1px solid rgba(0,0,0,0.2);
		border-radius: 5px;

		@media (max-width: 420px) {
			width: 90%;
		}
	}

	button {
		display: block;
		width: 100px;
		height: 50px;
		font-family: 'opensans-bold';
		font-size: 15px;
		background-color: #fff;
		color: #000;
		border: 0;
		border-radius: 40px;
		margin: auto;
		transition: .3s;
		cursor: pointer;

		&:hover {
			background-color: #1633AA;
			color: #fff;
		}
	}
`

export const MenuContainer = styled.div `
	position: fixed;
	top: 0;
	left: 0;
	display: grid;
	grid-template-columns: 372px auto 40px;
	grid-row: 100px;
	align-items: center;
	justify-items: center;
	width: 100%;
	height: 100px;
	padding: 10px;
	background-color: #1633AA;
	z-index: 4;

	@media (max-width: 414px) {
	}

	> div {
		position: relative;
		width: 100%;
		height: 100%;

		&:nth-child(2) {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

		.main-logo {
			position: absolute;
			top: 25px;
			left: 60px;
			font-family: 'opensans bold';
			font-size: 20px;
			color: #fff;
		}

		@keyframes rotation {
			from   	{ transform: rotate(0deg); }
			to 		{ transform: rotate(360deg); }
		}

		.mini-logo {
			position: absolute;
			top: 23px;
			left: 25px;
			width: 30px;
			height: 30px;
			border-radius: 100%;
			overflow: hidden;
			animation: rotation 30s infinite linear;

			img {
				width: 100%;
			}
		}
	}

	.beer {
		display: inline-block;
		position: absolute;
		top: 15px;
		right: 0px;
		width: 40px;
		height: 40px;
		transition: .3s;
		cursor: pointer;
		background-image: url(${BeerImg});
		background-position: center;
		background-repeat: no-repeat;
		background-size: 40px;
		transition: .3s;

		&:hover {
			transform: rotate(-30deg);
		}
	}

	.menutop {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
		height: 40px;
		margin: 0 5px;
		font-family: 'opensans light';
		font-size: 12px;
		background-color: #fff;
		border-radius: 5px;
		padding: 0;

		&:nth-child(1) { width: 340px }
		&:nth-child(2) { width: 100px }

		span {
			display: inline-block;
			font-family: 'opensans semibold';
			margin: 0 5px 0 0;
		}

		> div {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 30px;
			height: 30px;
			margin: 0 2px;
			text-align: center;
			border-radius: 100%;
			cursor: pointer;
			transition: .3s;

			&.active {
				background-color: #1633AA;
				color: #fff;
			}

			&.disabled {
				opacity: .4;
				pointer-events: none;
				text-decoration: line-through red;
				border: 1px solid #888;
			}
		}
	}
`


export const MainContent = styled.div `
    position: absolute;
    top: 100px;
    left: 0;
	display: block;
	width: 100%;
	height: calc(100% - 100px);
	background-color: #fff;
	overflow: auto;
`

export const UnsigContainer = styled.div `
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
	grid-auto-rows: 190px;
	column-gap: 25px;
	row-gap: 10px;
	align-items: flex-start;
	justify-items: center;
	float: left;
	width: calc(100% - 650px);
	height: 100%;
	overflow-y: auto;
	padding: 20px;
	background-color: #f2f2f2;
`
