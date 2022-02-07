import firebase from "firebase/compat/app";

export default function Home({ auth }) {
    return (
        <div>
            <h1>Home</h1>
            <UserAuth auth={auth} />
            
        </div>
    )
}

function UserAuth({ auth }) {
    //sign in function
    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <button onClick={googleSignIn}>Sign-in</button>
    )
}