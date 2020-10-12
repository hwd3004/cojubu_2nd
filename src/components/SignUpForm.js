import React from "react";
import { Form, Button } from "react-bootstrap";
import { authService } from "../fbase";

const SignUpForm = () => {
    return (
      <div id="SignUpForm">
        <Form>
          <h1>먼저 테스트</h1>
          <Form.Group>
            <Form.Label>이메일</Form.Label>
            <Form.Control type="text" placeholder="이메일 입력" />
          </Form.Group>
          <Form.Group>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호 입력 - 6자 이상 20자 이하" />
          </Form.Group>
          <Button variant="primary" type="submit">
            가입
          </Button>
        </Form>
        <div>
          <br/>
          <br/>
          <br/>
        </div>
        <Form>

          <Form.Group>
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" placeholder="아이디 입력 - 6자 이상 10자 이하" required minLength={6} maxLength={10} />
          </Form.Group>

          <Form.Group>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호 입력 - 6자 이상 20자 이하" required minLength={6} maxLength={20} />          </Form.Group>

          <Form.Group>
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control type="password" placeholder="비밀번호 확인" required minlength={6} maxlength={20} />
          </Form.Group>

          <Form.Group>
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="이메일 입력" required minlength={4} maxlength={30} />
          </Form.Group>

          <Form.Group>
            <Form.Label>이메일 확인</Form.Label>
            <Form.Control type="email" placeholder="이메일 확인" required minlength={4} maxlength={30} />
          </Form.Group>

          <Form.Group>
            <Form.Label>닉네임</Form.Label>
            <Form.Control type="email" placeholder="닉네임 입력" required minlength={4} maxlength={30} />
          </Form.Group>

          <Form.Group>
            <Form.Label>이메일 확인</Form.Label>
            <Form.Control type="email" placeholder="이메일 확인" required minlength={4} maxlength={30} />
          </Form.Group>

          <Button variant="primary" type="submit">
            가입
          </Button>
          
        </Form>
      </div>
    )
}

export default SignUpForm;