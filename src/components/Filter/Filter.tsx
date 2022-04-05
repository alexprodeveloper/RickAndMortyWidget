import React, {FC} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import './Filter.css';
import TextField from "@mui/material/TextField";
import {Filter as FilterInterface} from "../../interfaces/interfaces";

interface FilterProps {
    changeFilter: Function;
    filters: FilterInterface;
    species: string[];
    types: string[];
}

const Filter: FC<FilterProps> = (props) => {
    return (
        <div className="filter__container">
            <div className="filter filter__offset">
                <TextField id="name__input" label="Name" variant="outlined" onChange={(event) => props.changeFilter('name', event.target.value)} />
            </div>
            <div className="filter filter__offset">
                <FormControl fullWidth={true}>
                    <InputLabel id="filter__status">Status</InputLabel>
                    <Select
                        labelId="filter__status"
                        id="filter__status_select"
                        label="Status"
                        onChange={(event) => props.changeFilter('status', event.target.value)}
                        value={props.filters.status}
                    >
                        <MenuItem key={`filter__status_none`} value="">None</MenuItem>
                        <MenuItem key={`filter__status_alive`} value="alive">Alive</MenuItem>
                        <MenuItem key={`filter__status_dead`} value="dead">Dead</MenuItem>
                        <MenuItem key={`filter__status_unknown`} value="unknown">Unknown</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="filter filter__offset">
                <FormControl fullWidth={true}>
                    <InputLabel id="filter__species">Species</InputLabel>
                    <Select
                        labelId="filter__species"
                        id="filter__species_select"
                        label="Species"
                        onChange={(event) => props.changeFilter('species', event.target.value)}
                        value={props.filters.species}
                    >
                        <MenuItem value="">None</MenuItem>
                        {props.species.map((specie, index) => (
                            <MenuItem key={`filter__species_${index}`} value={specie}>{specie}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="filter filter__center">
                <FormControl fullWidth={true}>
                    <InputLabel id="filter__type">Type</InputLabel>
                    <Select
                        labelId="filter__type"
                        id="filter__type_select"
                        label="Type"
                        onChange={(event) => props.changeFilter('type', event.target.value)}
                        value={props.filters.type}
                    >
                        <MenuItem value="">None</MenuItem>
                        {props.types.map((type, index) => (
                            <MenuItem key={`filter__type_${index}`} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="filter filter__center">
                <FormControl fullWidth={true}>
                    <InputLabel id="filter__gender">Gender</InputLabel>
                    <Select
                        labelId="filter__gender"
                        id="filter__type_gender"
                        label="Gender"
                        onChange={(event) => props.changeFilter('gender', event.target.value)}
                        value={props.filters.gender}
                    >
                        <MenuItem key={`filter__gender_none`} value="">None</MenuItem>
                        <MenuItem key={`filter__gender_male`} value="male">Male</MenuItem>
                        <MenuItem key={`filter__gender_female`} value="female">Female</MenuItem>
                        <MenuItem key={`filter__gender_unknown`} value="unknown">Unknown</MenuItem>
                        <MenuItem key={`filter__gender_genderless`} value="genderless">Genderless</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default Filter;