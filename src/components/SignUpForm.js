import React from "react";
import { Form, Button } from "react-bootstrap";

const SignUpForm = () => {
    return (
        <Form>

          <Form.Group>
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" placeholder="아이디 입력 - 6자 이상 10자 이하" required minlength={6} maxlength={10} />
          </Form.Group>

          <Form.Group>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호 입력 - 6자 이상 20자 이하" required minlength={6} maxlength={20} />
          </Form.Group>

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
            Submit
          </Button>
          
        </Form>
    )
}

export default SignUpForm;