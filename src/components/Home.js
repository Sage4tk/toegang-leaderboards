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

    const [board] = useCollectionData(query);

    //state for needed auth info
    const [authInfo, setAuthInfo] = useState({
        displayName: "",
        photoURL: "",
        uid: ""
    });

    //when login is called set the user state
    useEffect(() => {
        if(user) {
            setAuthInfo({
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid
            })
        }

        return () => {}
    }, [user])

    //check if user exist in db  
    const userQuery = usersRef.where("uid", '==', authInfo.uid);
    const [findUser] = useCollectionData(userQuery);

    // const checkUser = () => {
    //     if (findUser.length == 0)
    // }

    //const add user to db
    const joinList = async() => {
        //add user to db
        const addUser = await usersRef.add({
            user: authInfo.displayName,
            avatar: authInfo.photoURL,
            uid: authInfo.uid,
            numWins: 0
        })
    }

    return (
        <div className="home-page">
            <h1>TOES <span className="orange">SKRIBBL</span> <span className="yellow">LEADER</span><span className="orange">BOARDS</span></h1>
            
            <div className="home-page_board">
                {board && board.reverse().map((data, index) => (<PlayerCard data={data} key={data.uid} num={index}/>))}
            </div>
            <AddPlayer joinList={joinList} findUser={findUser} user={user} />
            <UserAuth auth={auth} setAuthInfo={setAuthInfo} />
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
        setAuthInfo({
            displayName: "",
            photoURL: "",
            uid: ""
        });
        auth.signOut()
    }

    if (auth.currentUser) return (
        <button onClick={signOut}>Sign-out</button>
    )

    return (
        <button onClick={googleSignIn}>Sign-in</button>
    )
}

function PlayerCard({data, num}) {
    return (
        <div className="leaderboard-card">
            <p>{num + 1}.</p>
            <p>{data.user}</p>
            <p>{data.numWins}</p>
        </div>
    )
}

function AddPlayer({ joinList, findUser, user }) {
    if (!findUser || findUser.length === 1 || !user) return (null)

    return (
        <button onClick={joinList}>ADD</button>
    )
}