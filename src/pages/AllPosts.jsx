import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import Container from "../components/Container/Container";
import PostCard from "../components/PostCard";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await service.getPosts();
        setPosts(response.documents);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  // service.getPosts([]).then((posts)=>{
  //     if(posts){
  //         setPosts(posts.documents)
  //     }
  // })

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
