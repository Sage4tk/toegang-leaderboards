import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore"

export default function Admin({ firestore }) {
    //db
    const usersRef = firestore.collection("user");
    const query = usersRef.orderBy("numWins");

    //admin userRef
    const adminRef = firestore.collection('admin');

    const [board] = useCollectionData(query, {idField: 'id'});

    //input checker
    const [inputText, setInputText] = useState({
        name: "",
        password: ""
    })

    const inputChange = (e) => {
        setInputText({
            ...inputText,
            [e.target.name]: e.target.value
        })
    }
    
    //auth check
    const [logged, setLogged] = useState(false);



    if (!logged) return (
        <div>
            <form onSubmit={}>
                <input name="name" value={inputText.name} onChange={inputChange} />
                <input name="password" value={inputText.password} onChange={inputChange} />
                <button type="submit">LOG IN</button>
            </form>
        </div>
    )
    return (
        <div>
            <h1>Admin page</h1>
           {board && board.map(data => <PlayerEdit data={data} key={data.uid}/>)} 
        </div>
    )
}

const PlayerEdit = ({data}) => {
    return (
        <div>
            {data.user}
        </div>
    )
}