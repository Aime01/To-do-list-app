import React,{useState,useEffect} from 'react';
import { FcLike } from "react-icons/fc";

function Footer() {
    const [teams,setTeams] = useState([]);
    const url='https://onlineprojectsgit.github.io/API/WDEndpoint.json';

    useEffect(()=>{
        try{
            fetch(url)
            .then(response => {
                if(response.ok){
                    const jsonResponse = response.json();
                    return jsonResponse;
                }
                else{
                    throw new Error('request failed');
                }
            })
            .then(data=>{
                const students = data.info.students;
            //    console.log(students);
               setTeams([students[9]]);
               setTeams(teams=>[...teams,students[11]]);
               setTeams(teams=>[...teams,students[13]]);
                
            })

        }
        catch(e){
            console.error(e);
        }
       
    },[]);
   console.log(teams); 

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