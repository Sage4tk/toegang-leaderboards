import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="notfound-page">
            <div>
                <h1>PAGE NOT FOUND</h1>
                <Link to="/">Go Home</Link>
            </div>
        </div>
    )
}