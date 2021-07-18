/* React */
import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { MuuriComponent, getResponsiveStyle } from "muuri-react";
import { useMediaQuery } from "react-responsive";
import "./style.css";

export const ThemeContext = React.createContext(null);

// App.
function App() {
	const [ flipHorizontal, setFlipHorizontal ] = useState(false);
	const [ flipVertical, setFlipVertical ] = useState(false);
	const [ rotation, setRotation ] = useState(0);

	const rotateRight = () => {
		if(!flipHorizontal) {
			setRotation(rotation + 90);
		}
		if(!flipHorizontal && !flipVertical) {
			setRotation(rotation + 90);
		}
		else {
			setRotation(rotation - 90);
		}
	}

	const rotateLeft = () => {
		setRotation(rotation - 90);
		if(!flipHorizontal) {
			setRotation(rotation - 90);
		}
		if(!flipHorizontal && !flipVertical) {
			setRotation(rotation - 90);
		}
		else {
			setRotation(rotation + 90);
		}
	}
	const baseUrl = 'https://pool.pm/wallet/';
	const [ wallet, setWallet ] = useState("addr1q8s4m2knmfqg0ql54pq5fxrpyw7klf9k3lp6jz32xz4khuhzt50t3gkw5px9hvn85pzmzt4xxk3k3aqyfsm7vtmydgeqr8m5ja");
	const [ loading, setLoading ] = useState(wallet);
	const [ unsigs, setUnsigs ] = useState([]);

	useEffect(() => {
		async function loadData() {
			await axios
			.get(baseUrl+wallet)
			.then((res) => {
				const newUnsig = res.data.tokens.filter(item => item.policy === '0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04') 
				setUnsigs(newUnsig);
			})
		}

		loadData();
	}, [wallet]);


	return (
		<ThemeProvider>
			{unsigs.length > 0 &&
				<MuuriComponent
					dragEnabled
					dragFixed
					dragSortPredicate={{action: "swap"}}
					dragSortHeuristics={{ sortInterval: 0 }}>
					{unsigs.filter(item => item.metadata.unsigs.num_props === 6).map((item)=> <Item key={item} {...item}/>)}
				</MuuriComponent>
			}
		</ThemeProvider>
	);
};


const ThemeProvider = ({ children }) => {
	const isBigScreen = useMediaQuery({
		query: "(min-width: 824px)"
	});

	const style = useMemo(() => {
		return getResponsiveStyle({
			columns: isBigScreen ? 1 / 8 : 1 / 3,
			margin: "5",
			ratio: 1
		});
	}, [isBigScreen]);

	return (
		<ThemeContext.Provider value={style}>{children}</ThemeContext.Provider>
	);
};

const Item = ({ metadata, i }) => {
	const style = useContext(ThemeContext);
	const [ activeUnsig, setActiveUnsig ] = useState();
	// const [ activeUnsig, setActiveUnsig ] = useState(index);
	// className={"item " + (metadata.unsigs.index ? 'active' : '')}
	// onClick={()=> setActiveUnsig(console.log(metadata.unsigs.index, index))}

	{/* 
		const [ selectedIndex, setSelectedIndex ] = useState(-1);
		<Item 
			key={i} {...item}
			unsigIndex={selectedIndex}
			currentIndex={i}
			selectIndex={()=> setSelectedIndex(i)}/>
			onMouseOver={selectIndex}
		+ (unsigIndex === currentIndex ? '' : '')
	*/}
	return (
		<div style={style} className={"item " + (metadata.unsigs.index ? 'active' : '')} onClick={()=> setActiveUnsig(metadata.unsigs.index)}>
			<div className={"item-content"}>
				<img src={`https://s3-ap-northeast-1.amazonaws.com/unsigs.com/images/1024ds/${(metadata.title).slice(6,11)}.png`} alt={`${metadata.title}`} />
			</div>
		</div>
	);
};


export default App;

