//backend
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

//hooks
import { useCollectionData } from "react-firebase-hooks/firestore"

//db


export default function Home({ auth, user, firestore }) {

    
    //firebase db
    const usersRef = firestore.collection("user");
    const query = usersRef.orderBy("numWins");

    const [board] = useCollectionData(query, {idField: 'id'});

    return (
        <div>
            <h1>Home</h1>
            <UserAuth auth={auth} />
            <ul>
                {board && board.map(data => (<PlayerCard />))}
            </ul>
            <AddPlayer user={user} />
        </div>
    )
}

function UserAuth({ auth }) {
    //sign in function
    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    if (auth.currentUser) return (
        <button onClick={() => auth.signOut()}>Sign-out</button>
    )

    return (
        <button onClick={googleSignIn}>Sign-in</button>
    )
}

function PlayerCard() {
    return (
        <li>

        </li>
    )
}

//add player component
function AddPlayer({user}) {
    if (!user) return (null);
    return(
        <button>JOIN LEADERBOARDS</button>
    )
}