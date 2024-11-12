import styles from './textComment.module.css';

const TextComment = ({ comm }) => {
    const cleanComment = (comm) => {
        if (!comm) return '';
        // Remove <p> tags and add target="_blank" to <a> tags
        const withoutParagraphs = comm.replace(/<\/?p>/g, '');
        return withoutParagraphs.replace(/<a /g, '<a target="_blank" class="' + styles.styledLink + '"');
      };
    
      const cleanedComm = cleanComment(comm);
    
    return (
        <>
            <div>

            <div dangerouslySetInnerHTML={{ __html: cleanedComm }} />

            </div>
        </>
    )
}
export default TextComment;