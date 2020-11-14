import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGN_UP_REQUEST } from "redux/types";
import { dbService } from "fbase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [signUpSwitch, setSignUpSwitch] = useState(false);

  const dispatch = useDispatch();

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

    // console.log("기입한 닉네임:", nickname);

    const checkExistNickname = await dbService
      .collection("userDB")
      .where("nickname", "==", nickname)
      .get();

    let getAlreadyUseNickname;

    await checkExistNickname.forEach((doc) => {
      getAlreadyUseNickname = doc.data().nickname;
    });

    // console.log(getAlreadyUseNickname);

    if (getAlreadyUseNickname) {
      alert("이미 사용하고 있는 닉네임입니다. 다른 닉네임을 입력하여주세요.");
      return false;
    } else {
      if (signUpSwitch === false) {
        setSignUpSwitch(true);

        const signUpUser = {
          email,
          nickname,
          password,
        };

        dispatch({
          type: SIGN_UP_REQUEST,
          payload: signUpUser,
        });

        history.push("/");
      }
    }
  };

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     // await authService
  //     // .createUserWithEmailAndPassword(email, password)
  //     // .then(history.push("/"));

  //     const signUpDay = moment().format("YYYY-MM-DD HH:mm:ss");

  //     await authService.createUserWithEmailAndPassword(email, password);

  //     // 주의 - uid도 db에 저장하기 위해서, 이 코드는 여기에 위치해야함
  //     await dbService.collection("userDB").doc(email).set({
  //       uid: authService.currentUser.uid,
  //       email,
  //       password,
  //       nickname,
  //       signUpDay,
  //       permission: "user",
  //     });

  //     history.push("/");
  //     // window.location.replace("/");
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

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
      </div>
    </div>
  );
};

export default SignUp;
