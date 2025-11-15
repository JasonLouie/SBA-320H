import { useAuth } from "../../context/AuthContext";

export default function Sidebar({manga}) {
    const {state, dispatch } = useAuth();
    
    return (
        <>
            {state && <Button onClick={() => dispatch({ type: !state.favorites[id] ? "ADD_FAVORITE" : "REMOVE_FAVORITE", payload: { manga: { id: manga.id, title: manga.title, img: manga.img } } })}>{`${state.favorites[id] ? "Remove from" : "Add to"} Favorites`}</Button>}
        </>
    );
}