import React, {FC, useEffect, useState} from 'react';
import './Widget.css';
import Character from "../Character/Character";
import CharacterModal from "../CharacterModal/CharacterModal";
import Filter from "../Filter/Filter";
import {Character as CharacterInterface, Filter as FilterInterface, filterFields} from "../../interfaces/interfaces";
import RickAndMortyService from '../../services/RickAndMortyService';

interface WidgetProps {
    heading: string;
}

const Widget: FC<WidgetProps> = (props) => {
    const [characters, setCharacters] = useState<CharacterInterface[]>([]);
    const [charactersForRender, setCharactersForRender] = useState<CharacterInterface[]>([]);
    const [isNeedToShowCharacterModal, setIsNeedToShowCharacterModal] = useState(false);
    const [characterToShowInModal, setCharacterToShowInModal] = useState<CharacterInterface>(Object);
    const [types, setTypes] = useState<string[]>([]);
    const [species, setSpecies] = useState<string[]>([]);
    const [filters, setFilters] = useState<FilterInterface>({
        name: '',
        status: '',
        species: '',
        type: '',
        gender: '',
    });
    useEffect( () => {
        const getAllCharacters = async () => {
            const allCharacters = await RickAndMortyService.getAllCharacters();
            const allTypes: string[] = allCharacters.map((character: CharacterInterface) => character.type).filter(onlyUnique);
            allTypes.splice(allTypes.indexOf(""), 1);
            const allSpecies: string[] = allCharacters.map((character: CharacterInterface) => character.species).filter(onlyUnique);
            setSpecies(allSpecies);
            setTypes(allTypes);
            setCharacters(allCharacters);
            setCharactersForRender(allCharacters);
        }
        getAllCharacters();
    }, []);

    useEffect(() => {
        let newCharacters = characters;
        if (filters.name) {
            newCharacters = newCharacters.filter((character => character.name.toLocaleLowerCase().includes(filters.name.toLocaleLowerCase())));
        }
        if (filters.gender) {
            newCharacters = newCharacters.filter((character => character.gender.toLocaleLowerCase() === filters.gender));
        }
        if (filters.species) {
            newCharacters = newCharacters.filter((character => character.species === filters.species));
        }
        if (filters.status) {
            newCharacters = newCharacters.filter((character => character.status.toLocaleLowerCase() === filters.status));
        }
        if (filters.type) {
            newCharacters = newCharacters.filter((character => character.type === filters.type));
        }
        setCharactersForRender(newCharacters);
    }, [filters])

    function changeFilter(field: filterFields, value: string) {
        const newFilters: FilterInterface = Object.assign({}, filters);
        newFilters[field] = value;
        setFilters(newFilters);
    }

    function showCharacterModal(character: CharacterInterface) {
        setIsNeedToShowCharacterModal(true);
        setCharacterToShowInModal(character);
    }

    function closeCharacterModal() {
        setIsNeedToShowCharacterModal(false);
    }

    function onlyUnique(value: any, index: number, self: any[]) {
        return self.indexOf(value) === index;
    }

    return (
        <div className="widget">
            {isNeedToShowCharacterModal && (<CharacterModal key={`modal_${characterToShowInModal.id}`} character={characterToShowInModal} closeModal={closeCharacterModal} />)}
            <h2 className="heading">{props.heading}</h2>
            <Filter changeFilter={changeFilter} types={types} species={species} filters={filters} />
            <div className="characters">
                {charactersForRender.map(character => <Character key={character.id} character={character} showCharacterModal={showCharacterModal} />)}
            </div>
        </div>
    );
};

export default Widget;