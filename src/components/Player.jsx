import React, { useState } from 'react'

const Player = ({initialName,symbol,isActive,nameCHange}) => {
const [isEditing , setIsEditing] = useState(false);
const [player , setPlayer] = useState(initialName);

const handleEditClick = () => {
    setIsEditing(wasEditing => !wasEditing);
    setPlayer(player);
    if(isEditing){
      nameCHange(symbol,player);
    }
}



  return (
    <li className={isActive ? ' active': ''}>
    <span className="player">
        {!isEditing ? <span className="player-name">{player}</span> : (<input  type='text' required value={player} placeholder='Enter name..' onChange={(e)=>setPlayer(e.target.value)}/>)}
      <span className="player-symbol">{symbol}</span>
    </span>
   <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
  </li>
  )
}

export default Player