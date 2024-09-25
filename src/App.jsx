import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import SignIn from "./pages/SignIn";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import Edit from "./pages/Edit";
import SignUp from "./pages/SignUp";
import { auth } from "./firebase";
import { delay } from "./common";

function App() {
  // logic

  const [churead, setChuread] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true)

  const handlePost = (churead) => {
    setChuread(churead);
  };

  const init = async () => {
    //로그인을 감지하는 기능

    await delay(1000)
    await auth.authStateReady();
    console.log('인증 완료', auth)
    // 인증 준비 다 되면 로딩 false
    setIsLoading(false)
  }


  useEffect(() => {
    init();

  }, []);


  // if (isLoading) return <p>Loading...</p>;

  // view
  return (
    <div className="bg-churead-black h-full text-white overflow-auto">

      {isLoading ? <p>Loading...</p> :
        <div className="max-w-[572px] mx-auto h-full">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home churead={churead} onEdit={(data) => setEditItem(data)} editedItem={editedItem} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/post" element={<Post onPost={handlePost} />} />
              <Route path="/edit" element={<Edit editItem={editItem} onEdited={(data) => setEditedItem(data)} />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </div>}
    </div>

  );
}

export default App;
