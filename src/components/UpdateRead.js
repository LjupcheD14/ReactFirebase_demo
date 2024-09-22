import React, {useState} from 'react'
import app from "../firebaseConf"
import {getDatabase, ref, get} from "firebase/database"
import {useNavigate} from "react-router-dom";

function UpdateRead() {

    const navigate = useNavigate();

    let [fruitArray, setFruitArray] = useState([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "nature/fruits");
        const snapshot = await get(dbRef);
        if(snapshot.exists()){

            const myData = snapshot.val();
            const temporaryArray = Object.keys(myData).map(myFireId => {
                return {
                    ...myData[myFireId],
                    fruitId: myFireId
                }
            });

            setFruitArray(temporaryArray);
        } else {
            alert("error")
        }
    }

    return (
        <div>
            <h1>UPDATE</h1>
            <button onClick={fetchData}>Display Data</button>
            <ul>
                {fruitArray.map((item, index) => (
                    <li key={index}>
                        {item.fruitName}: {item.fruitDefinition} : {item.fruitId}
                    </li>
                ))}
            </ul>
            <button className='button1' onClick={ () => navigate("/")}>HOME PAGE</button>
            <button className='button1' onClick={() => navigate("/read")}>READ PAGE</button>
        </div>
    )
}

export default UpdateRead