import React, { useState } from 'react';

const Search = (props) => {
	const [text, setText] = useState('');
	const [heroName, setHeroName] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		setHeroName(text);

		props.onSubmit(heroName);
	};
	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				value={text}
				placeholder="Superhero"
				onChange={(e) => {
					setText(e.target.value);
				}}
			/>
			<button>Submit</button>
		</form>
	);
};

export default Search;
