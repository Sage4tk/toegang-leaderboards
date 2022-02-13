import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Admin({ firestore }) {
    //db
    const usersRef = firestore.collection("user");
    
    const [customUser, setCustomUser] = useState(null);

    //admin userRef
    const adminRef = firestore.collection('admin');

    //data set
    useEffect(() => {
        const updateState = async() => {
            const find = await usersRef.get();
            const info = [];
            find.forEach(doc => {
                const data = doc.data();
                //add id to data
                data.id = doc.id;
                info.push(data)
            })

            setCustomUser(info);
        }
        updateState();
    }, [])

    

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
    const [wrongPass, setWrongPass] = useState(false);

    const authAdmin = async(e) => {
        e.preventDefault();
        let data;
        const searchAdmin = await adminRef.where('user', "==", inputText.name).get();
        searchAdmin.forEach(doc => {
            data = doc.data()
        })

        //validify 
        if (!data) {
            setWrongPass(true);
        } else {
            if (data.password !== inputText.password) {
                setWrongPass(true);
            } else {
                setWrongPass(false);
                setLogged(true);
            }
        }
    }

    //visuals for current wins
    const query = usersRef.orderBy("numWins");

    const [board] = useCollectionData(query);

    if (!logged) return (
        <div>
            <form onSubmit={authAdmin}>
                <input name="name" value={inputText.name} onChange={inputChange} type="text" />
                <input name="password" value={inputText.password} onChange={inputChange} type="password" />
                <button type="submit">LOG IN</button>
                {wrongPass && <p>Invalid username or password.</p>}
            </form>
        </div>
    )
    return (
        <div>
            <h1>Admin page</h1>
            <div>
                {board && board.map(data => (
                    <div key={data.uid}>
                        <p>{data.user}</p>
                        <p>{data.numWins}</p>
                    </div>
                ))}
            </div>
           {customUser && customUser.map(data => <PlayerEdit data={data} key={data.uid} usersRef={usersRef} />)} 
        </div>
    )
}

const PlayerEdit = ({ data, usersRef }) => {
    //update win function
    const updateWinsADD = async () => {
        await usersRef.doc(data.id).update({
            ...data,
            numWins: ++data.numWins
        })
    }
    const updateWinsMINUS = async () => {
        await usersRef.doc(data.id).update({
            ...data,
            numWins: --data.numWins
        })
    }

    return (
        <div>
            <p>{data.user}</p>
            <button onClick={updateWinsMINUS}>-</button>
            <button onClick={updateWinsADD}>+</button>
        </div>
    )
}