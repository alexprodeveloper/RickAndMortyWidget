import React, {FC, useEffect, useRef, useState} from 'react';
import './CharacterModal.css';
import closeModal from '../../img/xmark-solid.svg';
import RickAndMortyService from "../../services/RickAndMortyService";
import Episodes from "../Episodes/Episodes";
import {Character, Episode, Place} from "../../interfaces/interfaces";

interface CharacterModalProps {
    character: Character;
    closeModal: Function;
}

const CharacterModal: FC<CharacterModalProps> = (props) => {
    const modal = useRef(null);
    const [locationInfo, setLocationInfo] = useState<Place>(Object);
    const [originInfo, setOriginInfo] = useState<Place>(Object);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    useEffect(() => {
        //@ts-ignore
        modal?.current?.focus();
        if (props.character?.location?.url) {
            const getLocation = async () => {
                const location: Place = await RickAndMortyService.getData(props.character?.location?.url ?? '');
                setLocationInfo(location);
            }
            getLocation();
        }
        if (props.character?.origin?.url) {
            if (props.character?.location?.url === props.character?.origin?.url) {
                setOriginInfo(locationInfo);
            } else {
                const getOrigin = async () => {
                    const origin: Place = await RickAndMortyService.getData(props.character?.origin?.url ?? '');
                    setOriginInfo(origin);
                }
                getOrigin();
            }

        }
        if (props.character.episode) {
            const getEpisodes = async () => {
                const episodes: Episode[] = await RickAndMortyService.getEpisodes(props.character.episode);
                setEpisodes(episodes);
            }
            getEpisodes();
        }
    }, []);

    function close(event: any): void {
        if (event.key === 'Escape' || event.target.classList.contains('modal__wrap')) {
            props.closeModal();
        }
    }

    return (
        <div className="modal__wrap" tabIndex={0} onKeyDown={(event => close(event))} onClick={(event => close(event))} ref={modal}>
            <div className="modal__container">
                <div className="modal">
                    <img src={closeModal} alt="" className="modal__close" onClick={() => props.closeModal()} />
                    <div className="modal__content">
                        <img  src={props.character.image} alt="" className="modal__img" />
                        <div className="modal__info">
                            <p className="text"><b>Name:</b> {props.character.name}</p>
                            <p className="text"><b>Status:</b> {props.character.status}</p>
                            <p className="text"><b>Gender:</b> {props.character.gender}</p>
                            <p className="text"><b>Species:</b> {props.character.species}</p>
                            {props.character.type && (
                                <div className="info">
                                    <p className="text"><b>Type:</b> {props.character.type}</p>
                                </div>
                            )}
                            <p className="text"><b>Location:</b> {props.character?.location?.name}</p>
                            {locationInfo?.name && (
                                <>
                                    <p className="text text__offset"><b>Type:</b> {locationInfo.type}</p>
                                    <p className="text text__offset"><b>Dimension:</b> {locationInfo.dimension}</p>
                                </>
                            )}
                            <p className="text"><b>Origin:</b> {props.character?.origin?.name}</p>
                            {originInfo?.name && (
                                <>
                                    <p className="text text__offset"><b>Type:</b> {originInfo.type}</p>
                                    <p className="text text__offset"><b>Dimension:</b> {originInfo.dimension}</p>
                                </>
                            )}
                            {!!episodes.length && (
                                <Episodes key="episodes" episodes={episodes} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterModal;