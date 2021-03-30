import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete,
{ createFilterOptions } from '@material-ui/lab/Autocomplete';
const filter = createFilterOptions();

const App = () => {

// Our sample dropdown options
const options = ['One', 'Two', 'Three', 'Four']

return (
	<div style={{ marginLeft: '40%', marginTop: '60px' }}>
	<h3>Greetings from GeeksforGeeks!</h3>
	<Autocomplete
		filterOptions={(options, params) => {
		const filtered = filter(options, params);
		// Suggest the creation of a new value
		if (params.inputValue !== '') {
			filtered.push(`Add "${params.inputValue}"`);
		}
		return filtered;
		}}
		selectOnFocus
		clearOnBlur
		handleHomeEndKeys
		options={options}
		renderOption={(option) => option}
		style={{ width: 300 }}
		freeSolo
		renderInput={(params) => (
		<TextField {...params} label="Enter Something"
			variant="outlined" />
		)}
	/>
	</div>
);
}

export default App
