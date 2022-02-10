//backend
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";

//hooks
import { useCollectionData } from "react-firebase-hooks/firestore"

//db


export default function Home({ auth, user, firestore }) {    
    //firebase db
    const usersRef = firestore.collection("user");
    const query = usersRef.orderBy("numWins");

    const [board] = useCollectionData(query, {idField: 'id'});

    //state for needed auth info
    const [authInfo, setAuthInfo] = useState(null);

    //when login is called set the user state
    useEffect(() => {
        if(user) {
            setAuthInfo({
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid
            })
        }
    }, [user])

    //const add user to db
    const joinList = async() => {
        await usersRef.add({
            user: authInfo.displayName,
            avatar: authInfo.photoURL,
            uid: authInfo.uid,
            numWins: 0
        })
    }

    return (
        <div>
            <h1>Home</h1>
            <UserAuth auth={auth} setAuthInfo={setAuthInfo} />
            <div>
                {board && board.map(data => (<PlayerCard data={data} key={data.uid}/>))}
            </div>
            {user && <button onClick={joinList}>JOIN LIST</button>}
        </div>
    )
}

function UserAuth({ auth, setAuthInfo }) {
    //sign in function
    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    //signout function
    const signOut = () => {
        setAuthInfo(null);
        auth.signOut()
    }

    if (auth.currentUser) return (
        <button onClick={signOut}>Sign-out</button>
    )

    return (
        <button onClick={googleSignIn}>Sign-in</button>
    )
}

function PlayerCard({data}) {
    return (
        <div>
            <p>{data.user}</p>
            <p>{data.numWins}</p>
        </div>
    )
}