export function ResList({ srchRes, onAddBook }) {
    return <ul className="res-list">
        {srchRes.map((res, index) => {
            return <li key={index}>
                {res.volumeInfo.title} <button onClick={() => onAddBook(res)}>+</button>
            </li>
        })}
    </ul>
}