import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetInfoAboutComments } from "../../../../redux/slices/ListSlice";

const Comments = () => {
    const open = useSelector(state => state.open);
    const {comments} = useSelector(state => state.list);
    console.log('comments', comments);
    
    const dispatch = useDispatch();
    //console.log(open.kids);

    useEffect(() => {
        open.kids.forEach(item => dispatch(fetchGetInfoAboutComments(item)))
    }, [])

    return (
        <>
            <ul>
                {comments.map(item => {
                    return <li key={item.id}>
                        <p>{item.by}</p>
                        <p>{item.text}</p>
                        {item.kids.length !== 0 ? <Comments /> : false}
                    </li>
                })}
            </ul>

        </>
    )
}
export default Comments;
