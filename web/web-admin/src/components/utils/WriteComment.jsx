// Packages
import { useState } from "react";

// Style
import style from "../../style/utils/WriteComment.module.css";

// Files
import { useAuth } from '../../../../shared/context/authContext';

const WriteComment = ({ postId }) => {
    const [comment, setComment] = useState("");

    const { user } = useAuth()

    const token = localStorage.getItem("token");

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
                method: "POST",
                body: JSON.stringify({comment}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }) 

            const result = await response.json();
            console.log(result)
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className={style.WriteComment}>
      <h2>Share something...</h2>
      <form onSubmit={handleSubmitComment}>
        <textarea name="comment" disabled={!user} onChange={(e) => setComment(e.target.value)}></textarea>
        <button type="submit" disabled={!user}>Comment</button>
      </form>
    </div>
  );
};
export default WriteComment;
