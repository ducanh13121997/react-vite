import { useState } from "react";
import { useForm } from "react-hook-form";
import EditIcon from "../../assets/icons/edit";
import TrashIcon from "../../assets/icons/trash";
import SendIcon from "../../assets/icons/send";
import { CommentStatus } from "../../types/enums";
import "./CommentItem.scss";

interface CommentItemProps {
  id: string;
  filename: string;
  type: string;
  content: string;
  image: string;
  checked?: boolean;
  status: CommentStatus;
  onCheck: (checked: boolean) => void;
  onUpdateContent: (id: string, content: string) => void;
  onSend: () => void;
  onDelete: () => void;
}

interface FormInputs {
  content: string;
}

const CommentItem = ({
  id,
  filename,
  type,
  content,
  image,
  checked = false,
  status,
  onCheck,
  onUpdateContent,
  onSend,
  onDelete,
}: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: { content },
  });

  const handleSubmitForm = (data: FormInputs) => {
    onUpdateContent(id, data.content);
    setIsEditing(false);
  };

  const handleImageLoad = () => {
    const LOADING_DELAY = 1000;
    setTimeout(() => setImageLoading(false), LOADING_DELAY);
  };

  const renderEditForm = () => (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="edit-form">
      <textarea
        {...register("content", {
          required: "Content is required",
          minLength: {
            value: 10,
            message: "Content must be at least 10 characters",
          },
          maxLength: {
            value: 500,
            message: "Content must not exceed 500 characters",
          },
        })}
        className={errors.content ? "error" : ""}
      />
      {errors.content && (
        <span className="error-message">{errors.content.message}</span>
      )}
      <div className="edit-actions">
        <button type="submit" className="save-btn">
          Save
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderCommentContent = () => (
    <div className="comment-content">
      <div className="filename">{filename}</div>
      {status === CommentStatus.REMOVE && (
        <div className="remove-badge">
          <div className="dot" />
          <span>Remove</span>
        </div>
      )}
      <div className="comment-container">
        <div className="comment-type">{type}</div>
        {!isEditing && <div className="comment-text">{content}</div>}
      </div>
      {isEditing && renderEditForm()}
    </div>
  );

  const renderActionButtons = () => (
    <div className="comment-actions">
      <button
        className="action-btn edit-btn"
        onClick={() => setIsEditing(true)}
      >
        <EditIcon />
      </button>
      <button className="action-btn trash-btn" onClick={onDelete}>
        <TrashIcon />
      </button>
      <button className="action-btn send-btn" onClick={onSend}>
        <SendIcon />
      </button>
    </div>
  );

  return (
    <div className="comment-item">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheck(e.target.checked)}
      />
      <div className="content-image">
        {imageLoading && (
          <div className="image-loading">
            <div className="loading-skeleton" />
          </div>
        )}
        <img src={image} alt={filename} onLoad={handleImageLoad} />
      </div>
      {renderCommentContent()}
      {renderActionButtons()}
    </div>
  );
};

export default CommentItem;
