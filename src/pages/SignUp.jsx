import React, { useState } from "react";
import InputField from "../components/InputField";
import LoginButton from "../components/LoginButton";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import { auth } from "../firebase";
import { message } from '../../node_modules/@firebase/messaging/dist/esm/index.sw.esm2017';
import { name } from '../../node_modules/ci-info/index.d';

// TODO: 파일면 SignUp으로 바꾸기, path도 바꾸기
const SignUp = () => {
  const history = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleInputChange = (inputValue, field) => {
    // field: 'email', 'password'
    // const newFormData = { ...formData, [field]: inputValue };
    // setFormData(newFormData);

    if (field === 'name') {
      setName(inputValue);
    } else if (field === 'email') {
      setEmail(inputValue)
    }
    else {
      setPassword(inputValue);
    }
  };
  // logic

  const handleSignUp = async (event) => {
    event.preventDefault(); // 폼 제출시 새로고침 방지 메소드

    setErrorMessage("");

    //사용자가 name, email, password 값을 입력 안하면 작동 안함
    if (isLoading || !name || !email || !password) return

    console.log('name', name);
    console.log('email', email);
    console.log('password', password);

    setIsLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);


      console.log("🚀 ~ handleSignUp ~ credential:", credential)

      await updateCurrentUser(credential.user, { displayName: name });

      history("/")
      //비동기 처리 성공시
    }


    catch (error) {
      //비동기 처리에서 에러난 경우
      console.error('code!!!', error.code)
      console.error(error.message)
      setErrorMessage(error.message)
    }
    finally {

      setIsLoading(false)
    }

    // TODO: 로그인 기능 구현
  };



  // view
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="text-center px-6">
        <h1 className="flex justify-center">
          <img src="./images/logo.svg" alt="churead로고" />
        </h1>
        <h3 className="text-red font-bold text-base py-6">
          Churead에서 소통해보세요
        </h3>
        {/* START: 폼 영역 */}
        <form id="login-form" className="text-center flex flex-col gap-2" onSubmit={handleSignUp}>
          <InputField type="text" field="name" onChange={handleInputChange} />
          <InputField type="text" field="email" onChange={handleInputChange} />
          <InputField type="password" field="password" onChange={handleInputChange} />

          {errorMessage && <p className="text-red-800"> {errorMessage} </p>}

          <LoginButton category="login" text={isLoading ? "Loading..." : "Create Account"} />
        </form>
        {/* END: 폼 영역 */}
        <div className="flex justify-center gap-1 py-6">
          <p className="text-churead-gray-600">계정이 있으신가요?</p>
          <Link to="/login" className="text-churead-blue">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
