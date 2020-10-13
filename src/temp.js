import React from "react";

export default () => {
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="아이디"
          required
          minlength={6}
          maxlength={20}
        ></input>
        <input
          type="password"
          placeholder="비밀번호"
          required
          minlength={6}
          maxlength={20}
        ></input>
        <input
          type="password"
          placeholder="비밀번호 확인"
          required
          minlength={6}
          maxlength={20}
        ></input>
        <input type="email" placeholder="이메일" required></input>
        <input type="email" placeholder="이메일 확인" required></input>
        <input
          type="text"
          placeholder="닉네임"
          minlength={2}
          maxlength={8}
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};
