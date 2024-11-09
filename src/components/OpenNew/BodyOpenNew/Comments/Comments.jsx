import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetInfoAboutComments, fetchInfoCommensKids } from "../../../../redux/slices/ListSlice";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Box from '@mui/material/Box';
import styles from './comments.module.css';


const Comments = ({ kidsIds = [] }) => {
    const dispatch = useDispatch();
    // const open = useSelector(state => state.open);
    //console.log(open);
    const { comments } = useSelector(state => state.list);
    console.log(comments);
    //const { kids } = useSelector(state => state.list);
    //console.log('kids', kids);

    useEffect(() => {
        kidsIds.forEach(id => dispatch(fetchGetInfoAboutComments(id)));
    }, [kidsIds, dispatch]);


    return (
        <Box 
        // sx={{ minHeight: 352, minWidth: 150 }} 
        >
        {kidsIds.map((id, index) => {
            const comment = comments.find(c => c.id === id);
            if (!comment) return null;

            return (
                <SimpleTreeView key={comment.id ?? `tree-${index}`} >
                    <TreeItem
                        key={comment.id ?? `item-${index}`}
                        itemId={comment.id ? `${comment.id}` : 'no-id'}
                        label={
                            <>
                                <span style={{ fontWeight: 'bold' }}>{comment?.by ?? 'Deleted comment'}</span>
                                <p style={{ fontStyle: 'italic', margin: 0 }}>{comment.text}</p>
                            </>
                        }
                        disabled={comment?.deleted ?? false}
                        className={styles.boxComments}
                    >
                        {comment.kids && comment.kids.length > 0 && (
                            <Comments kidsIds={comment.kids} />
                        )}
                    </TreeItem>
                </SimpleTreeView>
            );
        })}
    </Box>

    )
}
const CommentsWrapper = () => {
    const open = useSelector(state => state.open);
    return open.kids ? <Comments kidsIds={open.kids} /> : null;
};

export default CommentsWrapper;
