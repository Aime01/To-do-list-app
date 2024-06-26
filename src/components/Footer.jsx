import React, {useEffect,useState} from 'react';
import { FcLike } from "react-icons/fc";
import { fetchTeams } from '../utils/api';



function Footer() {
     const [teams,setTeams] = useState([]); 

    useEffect(()=>{
        try{
        fetchTeams().then(response =>{
            
        const students = response.data.info.students;
        setTeams([students[9]]);
        setTeams(teams=>[...teams,students[11]]);  // push students into array.
        setTeams(teams=>[...teams,students[13]]);
        
    });
    } catch(error){
    console.log(error);
    }

},[]); // call api during initial render.
   
    
  return (
    <div className='footer'>
    <div>Created with <FcLike /> by </div>
    {teams.length && teams.map((team, index)=>(
            <div key={index} className='team'> {team}</div>
        ))
    }  
    </div>
    
  );
    
}

export default Footer;