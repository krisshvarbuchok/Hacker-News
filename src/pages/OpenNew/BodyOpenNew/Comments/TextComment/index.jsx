import styles from "./index.module.css";

const TextComment = ({ comm }) => {
  const cleanComment = (comm) => {
    if (!comm) return "";
    // Remove <p> tags and add target="_blank" to <a> tags
    const withoutParagraphs = comm.replace(/<\/?p>/g, "");
    return withoutParagraphs.replace(
      /<a /g,
      '<a target="_blank" class="' + styles.styledLink + '"'
    );
  };

  const cleanedComm = cleanComment(comm);

  return <div dangerouslySetInnerHTML={{ __html: cleanedComm }} />;
};
export default TextComment;
