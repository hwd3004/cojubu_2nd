import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGN_UP_REQUEST } from "redux/types";
import { authService, dbService } from "fbase";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from "react-bootstrap";

const SignUp = () => {
  const [signUpSwitch, setSignUpSwitch] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const [signUpForm, setSignUpForm] = useState({
    email: null,
    password: null,
    checkPassword: null,
    nickname: null,
  });

  const onChangeSignUpForm = (event) => {
    const {
      target: { name, value },
    } = event;

    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
  };

  const onSubmitSignUpForm = async (event) => {
    event.preventDefault();

    const { nickname, password, checkPassword } = signUpForm;

    const checkExistNickname = await dbService
      .collection("userDB")
      .where("nickname", "==", nickname)
      .get();

    let getAlreadyUseNickname;

    await checkExistNickname.forEach((doc) => {
      getAlreadyUseNickname = doc.data().nickname;
    });

    if (getAlreadyUseNickname) {
      alert("이미 사용하고 있는 닉네임입니다. 다른 닉네임을 입력하여주세요.");
      return false;
    } else if (password !== checkPassword) {
      alert("비밀번호를 확인하여주세요");
      return false;
    } else {
      if (signUpSwitch === false) {
        setSignUpSwitch(true);

        dispatch({
          type: SIGN_UP_REQUEST,
          payload: signUpForm,
        });

        // history.push("/");
      }
    }
  };

  return (
    <div className="SignUp">
      <br></br>
      {!signUpSwitch || authService.currentUser ? (
        <Form onSubmit={onSubmitSignUpForm}>
          {/* <Form.Group controlId="formBasicEmail"></Form.Group> */}
          {/* controlId? is it necessary? */}
          {/* no. I don't think so */}
          <FormGroup>
            <FormLabel>이메일 주소</FormLabel>
            <FormControl
              onChange={onChangeSignUpForm}
              name="email"
              type="email"
              placeholder="이메일 주소를 입력하여주세요"
              required
            ></FormControl>
            <FormText>
              기입한 이메일 주소로 이메일 인증 확인 메일을 보내드립니다
            </FormText>
          </FormGroup>

          <FormGroup>
            <FormLabel>비밀번호</FormLabel>
            <FormControl
              onChange={onChangeSignUpForm}
              name="password"
              type="password"
              placeholder="비밀번호를 6자 이상 입력하여 주세요"
              minLength="6"
              required
            ></FormControl>
          </FormGroup>

          <FormGroup>
            <FormLabel>비밀번호</FormLabel>
            <FormControl
              onChange={onChangeSignUpForm}
              name="checkPassword"
              type="password"
              placeholder="비밀번호를 확인하여 주세요"
              minLength="6"
              required
            ></FormControl>
          </FormGroup>

          <FormGroup>
            <FormLabel>닉네임</FormLabel>
            <FormControl
              onChange={onChangeSignUpForm}
              name="nickname"
              type="text"
              placeholder="닉네임을 2자 이상, 10자 이하 입력하여주세요"
              minLength="2"
              maxLength="10"
              required
            ></FormControl>
          </FormGroup>

          <Button type="submit">가입</Button>
        </Form>
      ) : (
        <>
          <div>
            <Card bg="dark" text="white" className="text-center">
              <Card.Header>
                <Card.Title>가입 안내</Card.Title>
              </Card.Header>
              <br></br>
              <Card.Text>
                기입한 이메일로 인증 안내 메일을 보냈습니다.<br></br>
                <br></br>
                이메일을 확인하여 주시기 바랍니다.<br></br>
                <br></br>
                <Button onClick={() => history.push("/")}>홈으로 이동</Button>
              </Card.Text>
              <br></br>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
