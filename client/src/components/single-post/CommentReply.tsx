import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { planets } from "../../data/data";
import { setAlert } from "../../features/alert/alertActions";
import { ChildComment } from "../../features/post/postSlice";
import { AlertTypes } from "../../util/alertTypes";
import dateFormat from "dateformat";
import { useNavigate, useParams } from "react-router-dom";
import { deleteReply, updateReply } from "../../features/post/postActions";
import DeleteModal from "../modals/DeleteModal";

interface Props {
  reply: ChildComment;
}

const CommentReply = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { postId } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(props.reply.body);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const isOwner = isAuthenticated && user?._id === props.reply.user._id;

  const date = new Date(props.reply.createdAt);
  const dateString = dateFormat(date, "'Created' m/d/yy 'at' h:MMtt");

  const reportHandler = () => {
    dispatch(
      setAlert(
        "This site does not have any moderation, oh well",
        AlertTypes.DANGER
      )
    );
  };

  const editTextChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  };

  const onEditClicked = () => {
    setIsEdit(true);
    setEditText(props.reply.body);
  };

  const onEditCancel = () => {
    setIsEdit(false);
    setEditText(props.reply.body);
  };

  const editHandler = () => {
    dispatch(updateReply(postId!, props.reply._id, editText));
  };

  const deleteHandler = () => {
    dispatch(deleteReply(postId!, props.reply._id));
    setDeleteModalOpen(false);
  };

  const favPlanet = planets[props.reply.user.favPlanet - 1];
  return (
    <>
      <div className="mt-3 ml-6">
        <div className="flex flex-row gap-8 rounded-tl-lg border-l-[3px]  border-secondary-orange bg-black bg-opacity-70 p-3">
          <div className="flex flex-col items-center ">
            <h4 className="font-light tracking-wide opacity-80">
              {props.reply.user.username}
            </h4>
            <div className="w-16">
              <img src={`/img/planets/${favPlanet}.svg`} alt={favPlanet} />
            </div>
          </div>
          <div className="mt-2 flex w-full flex-col justify-between gap-2 text-lg">
            <p>{props.reply.body}</p>
            <div className="mt-2 mr-4 flex items-center justify-end gap-16">
              <p className="hidden self-end text-sm opacity-80 md:block">
                {dateString}
              </p>
              {isOwner && (
                <div className="flex gap-4">
                  {!isEdit ? (
                    <>
                      {/* Edit button */}
                      <div
                        onClick={() => onEditClicked()}
                        className="mt-2 cursor-pointer rounded-full p-2 hover:bg-gray-700 hover:bg-opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className=" h-6 w-6 text-secondary-orange "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Cancel edit button */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={() => onEditCancel()}
                        className="mt-2 h-10 w-10 cursor-pointer p-2 text-secondary-orange hover:rounded-full hover:bg-gray-700 hover:bg-opacity-50"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </>
                  )}

                  {/* Delete button */}
                  <div
                    className="self-end"
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mt-2 h-10 w-10 cursor-pointer rounded-full p-2 text-secondary-orange hover:bg-gray-700 hover:bg-opacity-50"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              )}

              <button
                className="font-light opacity-60"
                onClick={() => reportHandler()}
              >
                Report
              </button>
            </div>
          </div>
        </div>
        {isEdit && (
          <div className="mt-2 mb-8">
            {/* TextArea */}
            <textarea
              name="reply"
              placeholder="What are your thoughts?"
              value={editText}
              onChange={(e) => editTextChangeHandler(e)}
              className="
                min-h-[200px]
               w-full p-4 text-lg text-black opacity-90 placeholder:text-black placeholder:text-opacity-75"
            ></textarea>
            <div className=" flex flex-col-reverse justify-end gap-2 md:flex-row md:gap-24">
              <button
                className="p-2 text-2xl opacity-80"
                onClick={() => onEditCancel()}
              >
                Cancel
              </button>
              <button
                className="bg-secondary-orange py-3 px-24 text-2xl"
                onClick={() => editHandler()}
              >
                Update comment
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <DeleteModal
          onConfirm={() => deleteHandler()}
          onCancel={() => setDeleteModalOpen(false)}
          isOpen={deleteModalOpen}
          title="Delete Comment"
          body="Are you sure you want to delete your comment?"
        />
      </div>
    </>
  );
};

export default CommentReply;
