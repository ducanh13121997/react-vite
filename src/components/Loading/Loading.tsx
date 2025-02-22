import "./Loading.scss";

interface LoadingProps {
  itemCount: number;
}

const Loading = ({ itemCount = 3 }: LoadingProps) => {
  return (
    <>
      <div className="loading-skeletons">
        {Array(itemCount).fill(0).map((_, index) => (
          <div key={index} className="loading-comment-item">
            <div className="loading-checkbox" />
            <div className="loading-image" />
            <div className="loading-content">
              <div className="loading-title" />
              <div className="loading-type" />
              <div className="loading-text" />
              <div className="loading-text" />
            </div>
            <div className="loading-actions">
              <div className="loading-action" />
              <div className="loading-action" />
              <div className="loading-action" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Loading; 