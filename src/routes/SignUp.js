import { authService, dbService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "nickname") {
      setNickname(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // await authService
      // .createUserWithEmailAndPassword(email, password)
      // .then(history.push("/"));

      await authService.createUserWithEmailAndPassword(email, password);

      // 주의 - uid도 db에 저장하기 위해서, 이 코드는 여기에 위치해야함
      await dbService
        .collection("userDB")
        .doc(email)
        .set({ uid: authService.currentUser.uid, email, password, nickname });

      history.push("/");
      // window.location.replace("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="SignUp">
      <div>가입 페이지</div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={email}
            name="email"
            placeholder="이메일 입력"
            type="text"
            required
          ></input>
          <input
            onChange={onChange}
            value={nickname}
            name="nickname"
            placeholder="닉네임 입력"
            required
            minLength="2"
            maxLength="8"
          ></input>
          <input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="패스워드 입력, 6자 이상"
            type="password"
            required
            minLength="6"
          ></input>
          <input type="submit" value="가입하기"></input>
        </form>
        {error}
      </div>
    </div>
  );
};

export default SignUp;
