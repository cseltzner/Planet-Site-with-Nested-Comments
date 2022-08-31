import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAlert } from "../../features/alert/alertActions";
import { getPost } from "../../features/post/postActions";
import { AlertTypes } from "../../util/alertTypes";
import PostComments from "./PostComments";

const Post = () => {
  const dispatch = useAppDispatch();
  const { loading, post, error } = useAppSelector((state) => state.post);
  const { planet, postId } = useParams();

  useEffect(() => {
    dispatch(getPost(postId!));
  }, []);

  useEffect(() => {
    if (error.msg) {
      dispatch(setAlert(error.msg, AlertTypes.DANGER));
    }
  }, []);

  return (
    <>
      <div className="flex flex-col p-2 text-white sm:p-12 lg:px-24">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-24">
          <div className="flex flex-col items-center self-start">
            <h1 className="text-7xl opacity-90 lg:text-8xl">{planet}</h1>
            <div>
              <img
                src={`/img/planets/${planet}.svg`}
                alt={`${planet}`}
                className="md:w-sm hidden max-w-sm md:block md:w-52 lg:w-72"
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="text-5xl tracking-tight opacity-95">
              I bet you never learned this Jupiter fact...
            </h2>
            <p className="text-xl font-light leading-7 tracking-wide opacity-90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
              praesentium possimus et culpa error harum. Eligendi ab voluptatem
              iste ducimus pariatur similique omnis deleniti debitis dolorum
              eaque. Libero exercitationem, porro unde quia quas velit corporis
              officia quae ab veniam animi tempora accusantium atque repellendus
              aut dolorem voluptatibus reiciendis illum architecto. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Hic corrupti,
              repellendus est quam debitis et perferendis placeat, nostrum, quod
              quaerat aut optio odit impedit quasi culpa aperiam nobis facilis
              porro quo magnam consequuntur officia. Ut iusto voluptatibus vero
              illo aspernatur doloremque eaque nostrum nobis consequuntur hic
              pariatur tempora laborum, ipsa veritatis facere eos excepturi
              labore dolores enim explicabo voluptates culpa quasi aliquam
              accusantium? Cum placeat rem velit sequi cumque aliquid vitae
              ipsum! Cum quaerat molestias eaque, dolorum perferendis distinctio
              expedita omnis, facilis commodi nihil numquam, non dignissimos
              maiores reprehenderit vitae ratione sapiente voluptatibus illo ex
              sit amet! Doloremque, ad deserunt.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center md:items-end">
          <textarea
            name="comment"
            placeholder="What are your thoughts?"
            className="w-full p-4 text-lg text-black opacity-80 placeholder:text-black placeholder:text-opacity-75"
          ></textarea>
          <button className="mt-4 w-full border border-white border-opacity-50 px-8 py-3 text-2xl hover:bg-white hover:bg-opacity-50 hover:text-primary-purple md:w-fit">
            Submit
          </button>
        </div>

        <PostComments />
      </div>
    </>
  );
};

export default Post;
