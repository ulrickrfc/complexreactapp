import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Axios from 'axios'
import LoadingDotsIcon from './LoadingDotsIcon'
import Post from './Post'


function ProfilePosts() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: ourRequest.token })

        setPosts(response.data)

        setIsLoading(false)

      } catch (e) {
        console.log(e);
        console.log("Ocorreu um erro")
      }
    }
    fetchPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [username])

  if (isLoading) return <LoadingDotsIcon />

  return (
    <div className="list-group">

      {posts.map((post) => {

        const date = new Date(post.createdDate)
        const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

        return <Post post = {post} key = {post._id} noAuthor = {true}/>
      })}

    </div>
  )
}

export default ProfilePosts