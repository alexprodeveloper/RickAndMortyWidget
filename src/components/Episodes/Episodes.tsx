import React, {FC, useState} from 'react';
import './Episodes.css';
import {Episode} from "../../interfaces/interfaces";

interface EpisodesProps {
    episodes: Episode[];
}

const Episodes: FC<EpisodesProps> = (props) => {
    const [isNeedToShowEpisodes, setIsNeedToShowEpisodes] = useState(false);
    return (
        <>
            <p className="text text__episodes" onClick={() => setIsNeedToShowEpisodes(!isNeedToShowEpisodes)}>Episodes:</p>
            {isNeedToShowEpisodes && (
                <div className="episodes__container">
                    {props.episodes.map((episode, index) => (
                        <div className="episode" key={`episode_${index}`}>
                            <p className="text text__offset"><b>Name:</b> {episode.name}</p>
                            <p className="text text__offset"><b>Air date:</b> {episode.air_date}</p>
                            <p className="text text__offset"><b>Episode:</b> {episode.episode}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Episodes;