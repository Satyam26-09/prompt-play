"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetchPost();
  }, [session?.user.id]);

  const handelEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handelDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt???"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page.Share your exceptional prompts and inspire others with the power of your imagination"
      data={posts}
      handelEdit={handelEdit}
      handelDelete={handelDelete}
    />
  );
};

export default MyProfile;
