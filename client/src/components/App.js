import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';

const App = () => {
	const [superheroes, setSuperheroes] = useState({});
	const [heroName, setHeroName] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let url = `http://localhost:3001/?`;

		if (heroName.length) {
			url = url.concat(`superhero=${heroName}`);
		}
		(async () => {
			const { data } = await axios.get(url);
			setSuperheroes(data);
			setLoading(false);
		})();
	}, [superheroes]);

	const handleSubmit = (hero) => {
		setHeroName(hero);
	};

	const renderComponent = () => {
		return superheroes.map((object) => {
			return (
				<div>
					<p>{object.superhero}</p>
				</div>
			);
		});
	};

	if (loading) {
		return <div>Wrangling Heroes!</div>;
	} else {
		return (
			<div>
				<div>
					<Search onSubmit={(hero) => handleSubmit(hero)} />
				</div>
				{renderComponent()}
			</div>
		);
	}
};

export default App;
