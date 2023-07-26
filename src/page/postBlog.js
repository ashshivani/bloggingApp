import {useEffect,React} from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Blog = () => {
    const navigate = useNavigate();
    if (auth?.currentUser?.email) {
        console.log("signed in ")
    } else {
        navigate("/Auth");
    }
    
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
  const [blog, setBlog] = useState("");
   
   
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully")
            navigate("/Auth");
        }).catch((error) => {
            // An error happened.
        });
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(title)
            console.log(blog)
            console.log(JSON.stringify({
                name: "hello ",
                "title":title,
                "blog":blog,
                "userId":auth?.currentUser?.uid
                }))
            const data = new FormData();
            data.append("title", title);
            data.append("blog", blog);
          let res = await fetch("http://localhost:3000/post",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            "name": "hello ",
            "title":title,
            "blog":blog,
            "userId":auth?.currentUser?.uid
            }),
          });
          let resJson = await res.json();
          console.log(resJson)
          if (res.status === 201) {
            setTitle("");
            setBlog("");
            console.log(res)
          }
        } catch (err) {
          console.log(err);
        }
      };

      const [users, setUsers] = useState([])
      const [comments, setComments] = useState([])
  const fetchData = () => {
    fetch("http://localhost:3000/post")
      .then(response => {
        console.log(response.body)
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }
  
let postComment=async (id)=>{
    let res = await fetch("http://localhost:3000/comments",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        "userId":auth?.currentUser?.uid,
        "comment":comment,
        "blogId":id,
        
        }),
      });
      let resJson = await res.json();
      console.log(resJson)
}
let fetchComment = async (id)=>{
    fetch("http://localhost:3000/comments?postId="+id)
    .then(response => {
      console.log(response.body)
      return response.json()
    })
    .then(data => {
      setComments(data)
    })
}
  useEffect(() => {
    fetchData()
  }, [])    

  let goToHome = () =>{
    navigate("/")
  }
    return (
        <>
       
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={goToHome}>Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={goToHome}>Home</Nav.Link>
            <Nav.Link href="#link">My Posts</Nav.Link>
            <NavDropdown title={auth?.currentUser?.displayName} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout} >logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

   <h1 className='text-center mt-5'>Post your blog now  </h1>
    <div className='text-center m-5'>
            <form onSubmit={handleSubmit}>
            <br></br>
        <input
        className=' w-50 mb-3'
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
         
        />
<br></br>
          <textarea
          type="blog"
          className=' w-50 h-100'
          value={blog}
          placeholder="Blog it now"
          onChange={(e) => setBlog(e.target.value)}
        />
       
<br></br>
        <button className='btn btn-primary mt-4' type="submit">Create</button>
      </form>
      </div>
        </>
    )
}

export default Blog