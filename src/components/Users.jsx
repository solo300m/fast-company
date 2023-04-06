import React, {useState} from 'react';
import API from "../api/API";

export const Users = () => {
    const arrUsers = API.users.fetchAll();
    const [users, setUser] = useState(arrUsers);
    //console.log(arrUsers[0]);

    const formatCount = () => {
        let count = users.length;
        return count === 0 ? 'Ни кто не ' : count;
    }

    const formatHuman = (count) => {
        console.log(count);
        
        if(Math.floor(count/10) === 0 && count%10 === 1) return 'человек';
        if(Math.floor(count/10) === 0 && count%10 === 2) return 'человека';
        if(Math.floor(count/10) === 0 && count%10 === 3) return 'человека';
        if(Math.floor(count/10) === 0 && count%10 === 4) return 'человека';
        if(Math.floor(count/10) === 0 && (count%10 > 4 && count%10 < 10)) return 'человек';
        if(Math.floor(count/10) === 1 && (count%10 >= 0  && count%10 <= 10)) return 'человек';
        if(Math.floor(count/10) > 1 && count%10 === 1) return 'человек';
        if(Math.floor(count/10) > 1 && count%10 === 2) return 'человека';   
        if(Math.floor(count/10) > 1 && count%10 === 3) return 'человека';  
        if(Math.floor(count/10) > 1 && count%10 === 4) return 'человека';  
                 
    }
        
    

    const getHeadTable = () => {
        return (
            <tr>
                <th scope="col">№ п/п</th>    
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Удалить</th>
            </tr>
        );
    }

    const setColorBadge = (color) =>{
        let classes = 'badge m-2 p-2 shadow text-center fw-normal ';
        switch (color) {
            case 'Нудила':{
                classes += 'bg-primary';
                break;
            }
            case 'Странный':{
                classes += 'bg-secondary';
                break;
            }
            case 'Троль':{
                classes += 'bg-success';
                break;
            }
            case 'Алкоголик':{
                classes += 'bg-danger';
                break;
            }
            case 'Красавчик':{
                classes += 'bg-info';
                break;
            }
            case 'Неуверенный':{
                classes += 'bg-dark';
                break;
            }
            default:{
                classes += 'bg-primary';
                break;
            }
        }
        return classes;
    }

    const handleDeleteRow = (id) => {
        //console.log(id);        
        setUser(prevState => prevState.filter(users => users !== id));
        //formatHuman(users.length - 1);
        
    }
    
    const getRowsTable = () => {
        return users.map((user, index) => (
            <tr>
                <th scope="row">{index+1}</th>
                <td key={index}>{user.name}</td>
                <td key={index}>{
                    user.qualities.map((quality) => (
                        <span className={setColorBadge(quality.name)}>{quality.name}</span>
                    ))
                }</td>
                <td key={index}>{user.profession.name}</td>
                <td key={index}>{user.completedMeetings}</td>
                <td key={index}>{user.rate}</td>
                <td key={index}>{
                    <button className='btn btn-danger shadow' onClick={() => handleDeleteRow(user)
                    }>Delete</button>
                }</td>
            </tr>
        ));
    }

    const getTable = () => {
        return (            
            <table className='table table-striped'>
                <thead>
                    {getHeadTable()}
                </thead>
                <tbody className='table-group-divider'>
                    {getRowsTable()}                                    
                </tbody>
            </table>
        )
    }

    const getTitleInfo = () => {
        return (
            <div>        
                <span className='badge bg-primary pb-2 shadow text-center fs-5 fw-normal'>{formatCount()} {formatHuman(users.length)} тусанет с тобой сегодня!</span>
            </div>
        );

    }

    return (
        <>
            {getTitleInfo()}
            {getTable()}
        </>
    )
}