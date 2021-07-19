/* React */
import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import { MuuriComponent, getResponsiveStyle } from "muuri-react";
import { useMediaQuery } from "react-responsive";
import Popup from 'reactjs-popup';
import axios from "axios";
import GlobalStyle, { MenuContainer, StartScreen } from './styles';
import { gradientBody } from './data';

export const ThemeContext = React.createContext(null);

// App.
function App() {
	const baseUrl = 'https://pool.pm/wallet/';
	const [ wallet, setWallet ] = useState("");
	const input = useRef(null);

	const [ loading, setLoading ] = useState(wallet);
	const [ unsigs, setUnsigs ] = useState([]);
	const [ menuTop, setMenuTop ] = useState(0);

	const [ randomImage, setRandomImage ] = useState();
	const [ randomBg, setRandomBg ] = useState(0);

	const loadRandomLogo = () => {
		const randomLogo = Math.floor(Math.random() * 10000);
		const randomBackground = Math.floor(Math.random() * gradientBody.length);
		setRandomBg(randomBackground);
		setRandomImage(randomLogo);
	}

	const [ loadCollectionScreen, setCollectionScreen ] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setCollectionScreen(true);
		setWallet(input.current.value);
	}

	useEffect(() => {
		async function loadData() {
			setLoading(true);
			await axios
			.get(baseUrl+wallet)
			.then((res) => {
				setUnsigs(res.data.tokens.filter(item => item.policy === '0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04'));
				setLoading(false);
			})
		}

		loadData();
		loadRandomLogo();
	}, [wallet]);

	return (
		<div className="wrapper" style={{'backgroundImage':`linear-gradient(0deg, ${gradientBody[randomBg].color1} 0%, ${gradientBody[randomBg].color2} 100%)`}}>
			<GlobalStyle/>
			{!loadCollectionScreen ?
				<StartScreen>
					<div>
						<div className="circle"></div>
						<div className="image-container">
							{randomImage < 100 &&
								<div className="logo-image" style={{'backgroundImage':`url(https://s3-ap-northeast-1.amazonaws.com/unsigs.com/images/1024ds/000${randomImage}.png)`}}></div>
							}
							{randomImage > 100 && randomImage < 1000 &&
								<div className="logo-image" style={{'backgroundImage':`url(https://s3-ap-northeast-1.amazonaws.com/unsigs.com/images/1024ds/00${randomImage}.png)`}}></div>
							}
							{randomImage > 1000 &&
								<div className="logo-image" style={{'backgroundImage':`url(https://s3-ap-northeast-1.amazonaws.com/unsigs.com/images/1024ds/0${randomImage}.png)`}}></div>
							}
						</div>
						<label htmlFor="">Paste your address and load your unsigs_collection</label>
						<form onSubmit={handleSubmit}>
							<input type="text" ref={input} placeholder="your ada address..."/>
							<button onClick={handleSubmit}>Load</button>
						</form>
					</div>
				</StartScreen>
				:
				<>
				{loading ?
					<div className="loader">loading...</div>
					:
					<>
						<MenuContainer>
							<div className="mini-logo">
								{randomImage < 100 &&
									<img src={`https://s3-ap-northeast-1.amazonaws.com/unsigs.com/images/256/000${randomImage}.png`} alt="logo"/>
								}
								{randomImage > 100 && randomImage < 1000 &&
									<img src={`https://s3-ap-northeast-1.amazonaws.com/unsigs.com/images/256/00${randomImage}.png`} alt="logo"/>
								}
								{randomImage > 1000 &&
									<img src={`https://s3-ap-northeast-1.amazonaws.com/unsigs.com/images/256/0${randomImage}.png`} alt="logo"/>
								}
							</div>
							<div>
								<div className="menutop" style={{'width':'340px'}}>
									<span>filter by props: </span>
									<div onClick={()=> setMenuTop(0)} className={menuTop === 0 ? 'active' : '' + (unsigs.filter(item => item.metadata.unsigs.num_props).length < 1 ? ' disabled' : '')}>all</div>
									<div onClick={()=> setMenuTop(1)} className={menuTop === 1 ? 'active' : '' + (unsigs.filter(item => item.metadata.unsigs.num_props === 1).length < 1 ? ' disabled' : '')}>1</div>
									<div onClick={()=> setMenuTop(2)} className={menuTop === 2 ? 'active' : '' + (unsigs.filter(item => item.metadata.unsigs.num_props === 2).length < 1 ? ' disabled' : '')}>2</div>
									<div onClick={()=> setMenuTop(3)} className={menuTop === 3 ? 'active' : '' + (unsigs.filter(item => item.metadata.unsigs.num_props === 3).length < 1 ? ' disabled' : '')}>3</div>
									<div onClick={()=> setMenuTop(4)} className={menuTop === 4 ? 'active' : '' + (unsigs.filter(item => item.metadata.unsigs.num_props === 4).length < 1 ? ' disabled' : '')}>4</div>
									<div onClick={()=> setMenuTop(5)} className={menuTop === 5 ? 'active' : '' + (unsigs.filter(item => item.metadata.unsigs.num_props === 5).length < 1 ? ' disabled' : '')}>5</div>
									<div onClick={()=> setMenuTop(6)} className={menuTop === 6 ? 'active' : '' + (unsigs.filter(item => item.metadata.unsigs.num_props === 6).length < 1 ? ' disabled' : '')}>6</div>
								</div>

								<div className="menutop" style={{'width':'100px'}}>
									<span>total: </span>
									{menuTop === 0 &&
										<>{unsigs.filter(item => item.metadata.unsigs.num_props).length}</>
									}
									{menuTop !== 0 &&
										<>{unsigs.filter(item => item.metadata.unsigs.num_props === menuTop).length}</>
									}
								</div>
							</div>

							<Popup trigger={<div className="beer"></div>} modal nested>
								{close => (
									<div className="modal">
										<button className="close" onClick={close}>x</button>
										<div className="header">Hello!</div>
										<div className="content">
											If you think this web app was helpful or simply liked it and <br />
											feel like buying me a beer that would be great! no pressure though...<br /><br />
											<span>My ADA address:</span> <br />
											addr1qyd0v4rds0u7grhuzkpulvzd5npgdrq9z689qf3jt5eunwh2z343utptszdyuhuqktry3qsjtfrr0k3fqlz476xcpxhqsvy80p
											<br /><br />
											<a href="https://twitter.com/marcioseo" target="_blank" rel="noreferrer">👉 Twitter</a>
										</div>
									</div>
								)}
							</Popup>
						</MenuContainer>

						<ThemeProvider>
							{unsigs.length > 0 && menuTop === 0 &&
								<MuuriComponent
									dragEnabled
									dragFixed
									dragSortPredicate={{action: "swap"}}
									dragSortHeuristics={{ sortInterval: 0 }}>
										{unsigs.map((item, i)=>
											<Item key={i} {...item}/>
										)}
								</MuuriComponent>
							}

							{unsigs.length > 0 && menuTop === 1 &&
								<MuuriComponent
									dragEnabled
									dragFixed
									dragSortPredicate={{action: "swap"}}
									dragSortHeuristics={{ sortInterval: 0 }}>
										{unsigs.filter(item => item.metadata.unsigs.num_props === 1).map((item, i)=>
											<Item key={i} {...item}/>
										)}
								</MuuriComponent>
							}

							{unsigs.length > 0 && menuTop === 2 &&
								<MuuriComponent
									dragEnabled
									dragFixed
									dragSortPredicate={{action: "swap"}}
									dragSortHeuristics={{ sortInterval: 0 }}>
										{unsigs.filter(item => item.metadata.unsigs.num_props === 2).map((item, i)=>
											<Item key={i} {...item}/>
										)}
								</MuuriComponent>
							}

							{unsigs.length > 0 && menuTop === 3 &&
								<MuuriComponent
									dragEnabled
									dragFixed
									dragSortPredicate={{action: "swap"}}
									dragSortHeuristics={{ sortInterval: 0 }}>
										{unsigs.filter(item => item.metadata.unsigs.num_props === 3).map((item, i)=>
											<Item key={i} {...item}/>
										)}
								</MuuriComponent>
							}

							{unsigs.length > 0 && menuTop === 4 &&
								<MuuriComponent
									dragEnabled
									dragFixed
									dragSortPredicate={{action: "swap"}}
									dragSortHeuristics={{ sortInterval: 0 }}>
										{unsigs.filter(item => item.metadata.unsigs.num_props === 4).map((item, i)=>
											<Item key={i} {...item}/>
										)}
								</MuuriComponent>
							}

							{unsigs.length > 0 && menuTop === 5 &&
								<MuuriComponent
									dragEnabled
									dragFixed
									dragSortPredicate={{action: "swap"}}
									dragSortHeuristics={{ sortInterval: 0 }}>
										{unsigs.filter(item => item.metadata.unsigs.num_props === 5).map((item, i)=>
											<Item key={i} {...item}/>
										)}
								</MuuriComponent>
							}

							{unsigs.length > 0 && menuTop === 6 &&
								<MuuriComponent
									dragEnabled
									dragFixed
									dragSortPredicate={{action: "swap"}}
									dragSortHeuristics={{ sortInterval: 0 }}>
										{unsigs.filter(item => item.metadata.unsigs.num_props === 6).map((item, i)=>
											<Item key={i} {...item}/>
										)}
								</MuuriComponent>
							}
						</ThemeProvider>
					</>
				}
				</>
			}
		</div>
	);
};

const ThemeProvider = ({ children }) => {
	const isBigScreen = useMediaQuery({ query: "(min-width: 824px)" });

	const style = useMemo(() => {
		return getResponsiveStyle({
			columns: isBigScreen ? 1 / 8 : 1 / 3,
			margin: "0",
			ratio: 1
		});
	}, [isBigScreen]);

	return (
		<ThemeContext.Provider value={style}>{children}</ThemeContext.Provider>
	);
};

const Item = ({ metadata }) => {
	const style = useContext(ThemeContext);
	const [ showTools, setShowTools ] = useState(false);
	const [rotate, setRotate] = useState(0);

	const [ flipHorizontal, setFlipHorizontal ] = useState(false);
	const toggleFlipHorizontal = () => setFlipHorizontal(!flipHorizontal);

	const [ flipVertical, setFlipVertical ] = useState(false);
	const toggleFlipVertical = () => setFlipVertical(!flipVertical);

	const rotateR = () => {
		if(flipHorizontal === true) {
			setRotate(rotate - 90);
		}
		else {
			setRotate(rotate + 90);
		}
	}

	return (
		<div style={style}>
			<div className={"item-content "} onMouseOver={()=>setShowTools(true)} onMouseLeave={()=>setShowTools(false)}>
				{/* image */}
				<div className={'horizontal ' + (!flipHorizontal ? '' : 'active')}>
					<div className={'vertical ' + (!flipVertical ? '' : 'active')}>
						<img
							src={`https://s3-ap-northeast-1.amazonaws.com/unsigs.com/images/1024/${(metadata.title).slice(6,11)}.png`}
							style={{
								'transform':`rotate(${rotate}deg)`,
								'transition':'.3s'
							}}
							alt={`${metadata.title}`}/>
					</div>
				</div>

				<a href={`https://www.unsigs.com/details/${(metadata.title).slice(6,11)}`} target="_blank" className={showTools ? 'active' : ''} rel="noreferrer">#{metadata.title.slice(6,11)}</a>

				{/* tools */}
				<div className={"tools " + (showTools ? 'active' : '')}>
					<div className="flip-horizontal" onClick={toggleFlipHorizontal}></div>
					<div className="flip-vertical" onClick={toggleFlipVertical}></div>
					<div className="rotate" onClick={rotateR}></div>
				</div>
			</div>
		</div>
	);
};

export default App;

