import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { planets } from "../../data/data";
import { setAlert } from "../../features/alert/alertActions";
import { ChildComment } from "../../features/post/postSlice";
import { AlertTypes } from "../../util/alertTypes";
import dateFormat from "dateformat";

interface Props {
  reply: ChildComment;
}

const CommentReply = (props: Props) => {
  const dispatch = useAppDispatch();

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
            <div className="mt-2 mr-4 flex justify-end gap-16">
              <p className="self-end text-sm opacity-80">{dateString}</p>
              <button
                className="font-light opacity-60"
                onClick={() => reportHandler()}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentReply;
