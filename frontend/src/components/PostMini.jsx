import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";

export const PostMini = ({ post }) => {
  const { deletePost } = usePosts();
  //console.log(post);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 bg-opacity-30 max-w-md w-full p-10 rounded-md">
        <form>

        <label htmlFor="author">Author</label>
          <div className="flex items-center my-2">
            <img
              src={post.author.avatarURL}
              className="w-10 h-10 rounded-full object-cover mr-2"
              alt="Author Avatar"
            />
            <input
              id="author"
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md bg-opacity-25"
              type="text"
              placeholder="Author"
              value={post.author.username}
            />
          </div>

          <label htmlFor="title">Post Title</label>
          <input
            id="title"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 bg-opacity-25"
            type="text"
            placeholder="Post Title"
            value={post.title}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 bg-opacity-25"
            rows="3"
            placeholder="Description"
            value={post.description}
          ></textarea>

          <div className="relative">
            <img
              src={post.imageURL}
              alt="Post Image"
              className="w-full h-40 rounded-md my-2 object-cover"
            />
            <Link
              to={`/postprivate/${post._id}`}
              className="absolute bottom-0 right-0 p-2 bg-zinc-600 text-white rounded-md bg-opacity-30 border border-white"
            >
              View Post
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
