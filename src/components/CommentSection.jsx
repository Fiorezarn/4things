import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Accordion, Label, Textarea, Button } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CommentSection = ({ review, BASE_URL }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fungsi untuk mengambil data komentar
  async function fetchComments() {
    try {
      const res = await axios.get(`${BASE_URL}/review/${review.product_id}`);
      setComments(res.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  // Memanggil API untuk mengambil data komentar saat komponen dimount atau ada perubahan pada `review.product_id`
  useEffect(() => {
    fetchComments();
  }, [review.product_id]); // Memanggil ulang setiap kali `review.product_id` berubah

  // Fungsi untuk menambah komentar baru
  const handleCommentSubmit = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const user_id = userInfo?.user_id;
    const created_by = userInfo?.username;

    if (!user_id || !created_by) {
      navigate("/login");
      return;
    }

    const newCommentData = {
      user_id,
      review_value: newComment,
      product_id: review.product_id,
      created_by,
    };

    try {
      const res = await axios.post(`${BASE_URL}/review`, newCommentData);
      setNewComment(""); // Kosongkan textarea setelah submit
      fetchComments(); // Ambil ulang data komentar setelah komentar baru ditambahkan
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Fungsi untuk menghapus komentar
  const handleDeleteComment = async (review_id) => {
    const user_id = JSON.parse(sessionStorage.getItem("userInfo"))?.user_id;

    try {
      await axios.delete(`${BASE_URL}/review/${review_id}`);
      setComments(
        comments.filter((comment) => comment.review_id !== review_id)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Render komentar
  const renderComments = () => {
    const currentUser = JSON.parse(
      sessionStorage.getItem("userInfo")
    )?.username;

    if (comments.length === 0) {
      return <p>No comments yet.</p>;
    }

    return (
      <Accordion collapseAll>
        {comments.map((comment, index) => (
          <Accordion.Panel key={index}>
            <Accordion.Title className="bg-transparent hover:bg-transparent focus:ring-transparent flex justify-between items-center">
              Comment by {comment.created_by}
              {comment.created_by === currentUser && (
                <AiOutlineDelete
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteComment(comment.review_id)}
                />
              )}
            </Accordion.Title>
            <Accordion.Content className="px-5 py-3">
              <div className="comments pb-4">
                <div className="profile flex mr-4 items-center mb-2">
                  <CgProfile className="text-3xl mr-3" />
                  <p>{comment.created_by}</p>
                </div>
                <p>{comment.review_value}</p>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    );
  };

  return (
    <div className="max-w-full">
      {renderComments()}
      <div className="mb-2 block">
        <Label htmlFor={`comment-${review.product_id}`} value="Your comment" />
      </div>
      <Textarea
        id={`comment-${review.product_id}`}
        placeholder="Leave a comment..."
        rows={4}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={handleCommentSubmit} className="mt-2">
        Submit Comment
      </Button>
    </div>
  );
};

export default CommentSection;
