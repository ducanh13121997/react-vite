import { useEffect, useState } from "react";
import { getComments } from "../../services/comments";
import Modal from "../Modal/Modal";
import CommentItem from "../CommentItem/CommentItem";
import Loading from "../Loading/Loading";
import NoData from "../NoData/NoData";
import { Comment } from "../../types/interfaces";
import { toast } from "react-toastify";

interface ModalCheckCommentsProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const ModalCheckComments = ({
  isModalOpen,
  setIsModalOpen,
}: ModalCheckCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const showWarningToast = (message: string) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const showSuccessToast = (id: string) => {
    toast.success(`Comment ${id} sent successfully!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const showInfoToast = (id: string) => {
    toast.info(`Comment ${id} deleted!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const getCheckedComments = () => {
    return comments.filter((comment) => comment.checked);
  };

  const removeCheckedComments = () => {
    setComments(comments.filter((comment) => !comment.checked));
  };

  const handleSendAll = () => {
    const checkedComments = getCheckedComments();
    if (checkedComments.length === 0) {
      showWarningToast("Please select comments to send");
      return;
    }

    // TODO: API - Send all checked comments
    checkedComments.forEach((comment) => {
      showSuccessToast(comment.id);
    });

    removeCheckedComments();
  };

  const handleDeleteAll = () => {
    const checkedComments = getCheckedComments();
    if (checkedComments.length === 0) {
      showWarningToast("Please select comments to delete");
      return;
    }

    // TODO: API - Delete all checked comments
    checkedComments.forEach((comment) => {
      showInfoToast(comment.id);
    });

    removeCheckedComments();
  };

  /**
   * Handle checking/unchecking all comments at once
   * @param checked - Boolean indicating whether to check or uncheck all comments
   */
  const handleCheckAll = (checked: boolean) => {
    setComments(
      comments.map((comment) => ({
        ...comment, // Spread existing comment properties
        checked, // Update checked status for all comments
      }))
    );
  };

  const handleCheckItem = (id: string, checked: boolean) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, checked } : comment
      )
    );
  };

  const handleUpdateContent = (id: string, newContent: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, content: newContent } : comment
      )
    );
  };

  const handleSendItem = (id: string) => {
    // TODO: API - Send single comment
    showSuccessToast(id);
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleDeleteItem = (id: string) => {
    // TODO: API - Delete single comment
    showInfoToast(id);
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const fetchedComments = await getComments();
      setComments(fetchedComments);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchComments();
    }
  }, [isModalOpen]);

  const onCloseModal = () => {
    setIsModalOpen(false);
    setComments([]);
  };

  const renderCommentsList = () => {
    if (isLoading) {
      return <Loading itemCount={3} />;
    }

    if (comments.length === 0) {
      return <NoData />;
    }

    return comments.map((comment) => (
      <CommentItem
        key={comment.id}
        {...comment}
        onCheck={(checked) => handleCheckItem(comment.id, checked)}
        onUpdateContent={handleUpdateContent}
        onSend={() => handleSendItem(comment.id)}
        onDelete={() => handleDeleteItem(comment.id)}
      />
    ));
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onCloseModal}
      title="Send Comments"
      onSendAll={handleSendAll}
      onDeleteAll={handleDeleteAll}
      savedCommentsCount={comments?.length || 0}
      onCheckAll={handleCheckAll}
      allChecked={
        comments?.length > 0 && comments.every((comment) => comment.checked)
      }
      isLoading={isLoading}
    >
      <div className="comments-list">{renderCommentsList()}</div>
    </Modal>
  );
};

export default ModalCheckComments;
