import React from "react";
import { Link } from "react-router-dom";

export const QuestionsItem = ({
  content,
  authorId,
}: {
  content: string;
  authorId: string;
}) => {
  const handleSave = () => {
    console.log("Save !");
  };

  return (
    <Link to={`/question/${authorId}`}>
      <div className="bg-gray rounded py-3 px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8">
            <img
              className="rounded-full"
              alt="profile_picture"
              src="https://randomuser.me/portraits/men/52.jpg"
            />
          </div>
          <div>
            <div className="text-sm hover:text-white pb-1">Leopold-V</div>
            <div className="text-xs text-muted hover:text-white pb-1">
              Jun 6 2021
            </div>
          </div>
        </div>
        <div className="text-white ml-10 hover:text-blue text-2xl font-bold py-3">
          {content}
        </div>
        <div className="flex justify-between">
          <ul className="flex items-center ml-10 space-x-2 text-muted text-sm">
            <li>#javascript</li>
            <li>#react</li>
            <li>#beginner</li>
          </ul>
          <button onClick={handleSave} className="btn-save w-16">
            Save
          </button>
        </div>
      </div>
    </Link>
  );
};