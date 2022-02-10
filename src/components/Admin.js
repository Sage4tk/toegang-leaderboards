import { useCollectionData } from "react-firebase-hooks/firestore"

export default function Admin({ firestore }) {
    //db
    const usersRef = firestore.collection("user");
    const query = usersRef.orderBy("numWins");

    const [board] = useCollectionData(query, {idField: 'id'});
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