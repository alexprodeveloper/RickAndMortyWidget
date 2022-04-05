import React, {FC} from 'react';
import './Character.css';
import {Character as CharacterInterface} from "../../interfaces/interfaces";

interface CharacterProps {
    character: CharacterInterface;
    showCharacterModal: Function;
}

const Character: FC<CharacterProps> = (props) => {
    return (
        <div className="character" onClick={() => props.showCharacterModal(props.character)}>
            <img src={props.character.image} alt="" className="img" />
            <div className="info__block">
                <div className="info">
                    <p className="text"><b>Name:</b> {props.character.name}</p>
                </div>
                <div className="info">
                    <p className="text"><b>Status:</b> {props.character.status}</p>
                </div>
                <div className="info">
                    <p className="text"><b>Gender:</b> {props.character.gender}</p>
                </div>
                <div className="info">
                    <p className="text"><b>Species:</b> {props.character.species}</p>
                </div>
                {props.character.type && (
                    <div className="info">
                        <p className="text"><b>Type:</b> {props.character.type}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Character;