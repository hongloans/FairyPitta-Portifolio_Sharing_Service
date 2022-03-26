import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";
import { DispatchContext } from "../../App";
import OAuthButton from "../common/OAuthButton";

function LoginForm() {
  const navigate = useNavigate();
  const { userDispatch } = useContext(DispatchContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // userDispatch 함수를 이용해 로그인 성공 상태로 만듦.
      userDispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/network", { replace: true });
    } catch (err) {
      console.log("이메일 또는 비밀번호가 유효하지 않습니다.");
    }
  };

  return (
    <>
      <Container>
        <Row
          className="justify-content-md-center"
          style={{ paddingTop: "60px" }}
        >
          <img alt="로고" src="/image/logo.png" style={{ width: "25%" }} />
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="loginEmail">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="on"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && email.length !== 0 && (
                  <Form.Text className="text-success">
                    이메일 형식이 올바르지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="loginPassword" className="mt-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="on"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && password.length !== 0 && (
                  <Form.Text className="text-success">
                    비밀번호는 4글자 이상입니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Row} className="mt-5 mb-1 text-center">
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isFormValid}
                    style={{ width: "300px" }}
                  >
                    로그인
                  </Button>
                </Col>
              </Form.Group>
              <Col className="text-center" style={{ color: "gray" }}>
                또는
              </Col>
              <Form.Group as={Row} className="mb-1 text-center">
                <Col sm={{ span: 20 }} className="mb-2">
                  <Button
                    variant="light"
                    style={{ width: "300px" }}
                    onClick={() => navigate("/register")}
                  >
                    회원가입하기
                  </Button>
                </Col>
                <Col sm={{ span: 20 }}>
                  <OAuthButton />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ position: "fixed", bottom: "0", left: "0", right: "0" }}
        >
          <img
            alt="fotter"
            src="/image/footer_image.png"
            style={{ width: "15%" }}
          />
        </Row>
      </Container>
    </>
  );
}

export default LoginForm;
