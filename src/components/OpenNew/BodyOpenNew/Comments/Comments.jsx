import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetInfoAboutComments, fetchInfoCommensKids } from "../../../../redux/slices/ListSlice";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Box from '@mui/material/Box';


const Comments = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.open);
    console.log(open);
    const { comments } = useSelector(state => state.list);
console.log(comments);
const {kids} = useSelector(state => state.list);
console.log(kids);


    useEffect(() => {
        open.kids.forEach(id => dispatch(fetchGetInfoAboutComments(id)));
    }, [open]);
    useEffect(()=>{
        comments.forEach(item => item.kids ? item.kids.forEach(id => dispatch(fetchInfoCommensKids(id))) : false)
    }, [comments])

    return (

        <Box sx={{ minHeight: 352, minWidth: 250 }}>
            <SimpleTreeView>
                {comments.map(item => {
                    //const comment = comments.find(c => c.id === id);
                    //if (!comment) return null;

                    return (
                        <TreeItem key={item.id} itemId={`${item.id}`} 
                        label={
                            <>
                              <span style={{ fontWeight: 'bold' }}>{item?.by ?? 'Deleted comment'}</span>
                              <p style={{ fontStyle: 'italic', margin: 0 }}>{item.text}</p>
                            </>
                          } 
                        disabled={item?.deleted ?? false} >
                           
                            {/* {item.kids && <Comments  />} */}
                        </TreeItem>
                    );
                })}
            </SimpleTreeView>
        </Box>

    )
}
// export default Comments;
const CommentsWrapper = () => {
    // const open = useSelector(state => state.open);

    // return open.kids ? <Comments commentIds={open.kids} /> : null;
    return <Comments  />
};

export default CommentsWrapper;
