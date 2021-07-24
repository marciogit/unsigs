/* React */
import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import { MuuriComponent, getResponsiveStyle } from "muuri-react";
import { useMediaQuery } from "react-responsive";
import Popup from 'reactjs-popup';
import { dataAPI } from './utils';
import GlobalStyle, { MenuContainer, StartScreen } from './styles';
import { Form, Select, Popover, Switch } from 'antd';
import 'antd/dist/antd.css';
const { Option } = Select;

export const ThemeContext = React.createContext(null);

// App.
function App() {
	const [ wallet, setWallet ] = useState("");
	const input = useRef(null);
	const [ inputError, setInputError ] = useState(false);

	const [ loading, setLoading ] = useState(wallet);
	const [ unsigs, setUnsigs ] = useState([]);
	const [ menuTop, setMenuTop ] = useState(0);

	const [ randomImage, setRandomImage ] = useState();

	const loadRandomLogo = () => {
		const randomLogo = Math.floor(Math.random() * 10000);
		setRandomImage(randomLogo);
	}

	const [ loadCollectionScreen, setCollectionScreen ] = useState(false);

	function onChange(checked) {
		console.log(`switch to ${checked}`);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (input.current.value === '') {
			setInputError(true);
		} else {
			setWallet(input.current.value);
			setCollectionScreen(true);
			setInputError(false);
		}
	}

	const handleChange = (value) => {
		switch (value) {
			case 'all': setMenuTop(0); break;
			case '01 props': setMenuTop(1); break;
			case '02 props': setMenuTop(2); break;
			case '03 props': setMenuTop(3); break;
			case '04 props': setMenuTop(4); break;
			case '05 props': setMenuTop(5); break;
			case '06 props': setMenuTop(6); break;
			default: break;
		}
		console.log(value)
	}

	useEffect(() => {
		async function loadData() {
			setLoading(true);
			dataAPI
			.get(wallet)
			.then((res) => {
				setUnsigs(res.data.tokens.filter(item => item.policy === '0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04'));
				setLoading(false);
			})
		}

		loadData();
		loadRandomLogo();
	}, [wallet]);

	const content = (
		<div>
			<p>
				<a href="https://iohk.zendesk.com/hc/en-us/articles/360010477394-Send-and-receive-ada" target="_blank" rel="noreferrer">Daedalus</a>
			</p>
			<p>
				<a href="https://iohk.zendesk.com/hc/en-us/articles/360010477394-Send-and-receive-ada" target="_blank" rel="noreferrer">Yoroi</a>
			</p>
		</div>
	);

	return (
		<div className="wrapper">
			<GlobalStyle/>

			{/* Navigation Top*/}

			<MenuContainer>
				<div>
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

						<div className="main-logo"></div>
					</div>
					<div className="main-logo">Unsigs_Explorer</div>
				</div>

				<div>
					<Form.Item label="Filter by props n&deg;:">
					<Select defaultValue={!loading ? "" : "All"} style={{ width: 120 }} onChange={handleChange}>
						<Option value="all" 	 disabled={(unsigs.filter(item => item.metadata.unsigs.num_props).length < 1 ? true : false)}>All</Option>
						<Option value="01 prop"  disabled={(unsigs.filter(item => item.metadata.unsigs.num_props === 1).length < 1 ? true : false)}>01 prop</Option>
						<Option value="02 props" disabled={(unsigs.filter(item => item.metadata.unsigs.num_props === 2).length < 1 ? true : false)}>02 props</Option>
						<Option value="03 props" disabled={(unsigs.filter(item => item.metadata.unsigs.num_props === 3).length < 1 ? true : false)}>03 props</Option>
						<Option value="04 props" disabled={(unsigs.filter(item => item.metadata.unsigs.num_props === 4).length < 1 ? true : false)}>04 props</Option>
						<Option value="05 props" disabled={(unsigs.filter(item => item.metadata.unsigs.num_props === 5).length < 1 ? true : false)}>05 props</Option>
						<Option value="06 props" disabled={(unsigs.filter(item => item.metadata.unsigs.num_props === 6).length < 1 ? true : false)}>06 props</Option>
					</Select>
					</Form.Item>

					<div className="menutop">
						<span>total: </span>
						{menuTop === 0 &&
							<>{unsigs.filter(item => item.metadata.unsigs.num_props).length}</>
						}
						{menuTop !== 0 &&
							<>{unsigs.filter(item => item.metadata.unsigs.num_props === menuTop).length}</>
						}
					</div>
					<Switch onChange={onChange}/>
				</div>

				<div>

					<Popover placement="bottom" content={content} trigger="click">
						<a href="#" rel="noreferrer">Finding you address</a>
					</Popover>

					<Popup trigger={<a href="#" rel="noreferrer">Beer time?</a>} modal nested>
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
				</div>
			</MenuContainer>


			{!loadCollectionScreen ?
				<StartScreen className={!loadCollectionScreen ? "" : "active"}>
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
						<label htmlFor="">Unsigs_Explorer</label>
						<form onSubmit={handleSubmit}>
							<input className={inputError ? "error" : ""} type="text" ref={input} value="addr1q8s4m2knmfqg0ql54pq5fxrpyw7klf9k3lp6jz32xz4khuhzt50t3gkw5px9hvn85pzmzt4xxk3k3aqyfsm7vtmydgeqr8m5ja" placeholder={inputError ? "please provide a valid address" : "₳da address"}/>
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
			margin: "10",
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

