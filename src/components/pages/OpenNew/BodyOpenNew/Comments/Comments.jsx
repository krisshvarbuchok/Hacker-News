import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Box from '@mui/material/Box';
import styles from './comments.module.css';
import { fetchGetInfoAboutComments } from "../../../../../redux/slices/ListSlice";
import { Skeleton, Stack } from "@mui/material";


const Comments = ({ kidsIds = [] }) => {
   
    const dispatch = useDispatch();
    const { comments } = useSelector(state => state.list);

    useEffect(() => {
        kidsIds.forEach(id => dispatch(fetchGetInfoAboutComments(id)));
    }, [kidsIds, dispatch, comments]);


    return (
        <Box>
            {
                kidsIds.map((id, index) => {
                    const comment = comments.find(c => c.id === id);

                    if (!comment) {
                        return (
                            <Stack key={index} sx={{ pt: '20px', ml: '30px' }}>
                                <Skeleton width="70%" height="18px" />
                                <Skeleton width="90%" height="16px" />
                                <Skeleton width="40%" height="16px" />
                            </Stack>
                        );
                    }



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
                                {comment.kids &&
                                    <Comments kidsIds={comment.kids} />
                                }
                            </TreeItem>
                        </SimpleTreeView>

                    );
                })

            }
        </Box>
    )
}
export default Comments;
