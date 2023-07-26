import {useEffect,React} from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';

const Home = () => {
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

 let goToCreateBlog = () =>{
    navigate("/blog")
  }
  let goToHome = () =>{
    navigate("/")
  }
    return (
        <>

        
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => goToHome()}>Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  onClick={() => goToHome()}>Home</Nav.Link>
            <Nav.Link href="#link">My Posts</Nav.Link>
            <NavDropdown title={auth?.currentUser?.displayName} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout} >logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="text-center mt-5 mb-5 " >
    <button className='btn btn-primary' onClick={() => goToCreateBlog()}> Post a Blog </button>
    </div>
<div className='mt-5 mb-5 '> 
    <h1 className='mt-5 mb-5 text-center'>Recent Top Blogs</h1>

   <div className="text-center m-5">
    {users.map(user => (
        
         <Card className="text-center mb-5 w-100" style={{ width: '18rem' }}>
           <Card.Body > 
              <Card.Subtitle className="mb-2 text-muted">UserName: {user.name}</Card.Subtitle>   
            <div><h6></h6></div> 
            <Card.Title>Title: {user.title}</Card.Title>
            
            <Card.Text><h6>Blog:{user.blog}</h6></Card.Text> <input type="text" value={comment} placeholder="comment" onChange={(e) => setComment(e.target.value)}/> <button className='btn btn-success' onClick={() => postComment(user.id)} >Post</button> 
            <div onLoad={() => fetchComment(user.id)}></div>
            <label></label>
            {comments.map(comment => (
                <>
                <label>{comment.comment}</label>
                </>
            ))}
            </Card.Body>
          
            </Card>
          ))}

     </div>
   


      {users.length > 0 && (
        <ul>
         
        </ul>
      )}
    </div>
        </>
    )
}

export default Home