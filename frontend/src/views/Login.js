import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { commonHelper } from "../common/commonHelper";
import { useDispatch } from "react-redux";
import APICall from "../networking/AxiousServices";
import ApiTypes from "../networking/APItypes";
import { useState } from "react";
import { useEffect } from "react";

export default function Login() {
  document.title = process.env.REACT_APP_NAME + " | " + "Login";

  const location = useLocation();
  const query_params = new URLSearchParams(location.search);
  const redirectUrl = query_params.get("redirectUrl");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
    is_remember: false,
    current_date: new Date(),
  });

  useEffect(() => {
    let remember_data = commonHelper.getItem("remember_data")
      ? JSON.parse(commonHelper.getItem("remember_data"))
      : null;
    if (remember_data && remember_data.is_remember) {
      let thirtyDay = 60 * 1000;
      let first_date = new Date(remember_data.current_date);
      let last_date = new Date();
      var differenceInmin = (last_date - first_date) / thirtyDay;

      if (differenceInmin <= 60 * 24 * 30) {
        setFormInputs({
          ...formInputs,
          username: remember_data.username,
          password: remember_data.password,
          is_remember: remember_data.is_remember,
        });
      } else {
        localStorage.removeItem("remember_data");
      }
    } else {
      localStorage.removeItem("remember_data");
    }
  }, []);

  const [formInputsErrors, setFormInputsErrors] = useState({
    username: "",
    password: "",
  });

  const validationError = {
    username: "Email field is required.",
    password: "Password field is required.",
    validate_email: "Email is not valid",
    pass_valid: "Must be at least 8 characters.",
  };
  const validateForm = () => {
    let errorJson = {};
    let isValidate = true;

    Object.keys(formInputsErrors).forEach((form_er_key) => {
      if (formInputs[form_er_key] == "") {
        errorJson = {
          ...errorJson,
          [form_er_key]: validationError[form_er_key],
        };
        isValidate = false;
      }
      if (form_er_key === "username") {
        if (formInputs[form_er_key] !== "") {
          if (!pattern.test(formInputs.username)) {
            errorJson = {
              ...errorJson,
              [form_er_key]: validationError.validate_email,
            };
            isValidate = false;
          }
        }
      }
      if (form_er_key === "password") {
        if (
          formInputs[form_er_key] !== "" &&
          formInputs[form_er_key].length < 8
        ) {
          errorJson = {
            ...errorJson,
            [form_er_key]: validationError.pass_valid,
          };
          isValidate = false;
        }
      }
    });

    setFormInputsErrors(errorJson);
    return isValidate;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      let res = await APICall({
        url: ApiTypes.login,
        data: formInputs,
      });
      if (res.status === 1) {
        commonHelper.setItem("user", JSON.stringify(res.data));
        commonHelper.setItem("auth_token", res.data.auth_token);

        if (formInputs && formInputs.is_remember) {
          commonHelper.setItem("remember_data", JSON.stringify(formInputs));
        }

        dispatch({ type: "AUTH_TOKEN", payload: res.data.auth_token });
        dispatch({ type: "LOGGED_USER", payload: res.data });
        setLoading(false);
        localStorage.setItem("current_time", new Date());
        if (redirectUrl) {
          setTimeout(() => {
            navigate("/" + redirectUrl);
          }, 250);
        } else {
          navigate("/");
        }
      } else {
        if (res.data.type === "password") {
          setFormInputsErrors({
            username: "",
            password: res.data.message,
          });
          setLoading(false);
        } else {
          setFormInputsErrors({
            password: "",
            username: res.data.message,
          });
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="position-relative d-flex align-items-center justify-content-center vh-100">

      <div className="d-flex flex-column justify-content-sm-center">
        <h1 className="text-center">Sign in</h1>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              value={formInputs.username ? formInputs.username : ""}
              onChange={(e) => {
                setFormInputs({
                  ...formInputs,
                  username: e.target.value ? e.target.value : "",
                });
              }}
              placeholder="Email"
            />
            {formInputsErrors.username !== "" && (
              <Form.Text className="text-danger">
                {/* Must be at least 8 characters. */}
                {formInputsErrors.username}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Password <span className="required d-inline-block">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                setFormInputs({
                  ...formInputs,
                  password: e.target.value ? e.target.value : "",
                });
              }}
              value={formInputs.password ? formInputs.password : ""}
              type="password"
              placeholder="Password"
            />
            {formInputsErrors.password !== "" && (
              <Form.Text className="text-danger">
                {/* Must be at least 8 characters. */}
                {formInputsErrors.password}
              </Form.Text>
            )}
          </Form.Group>
          <div className="d-flex align-items-center justify-content-center mb-3">
            <span className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                id={`is_remember`}
                label=" Remember me"
                checked={
                  formInputs.is_remember ? formInputs.is_remember : false
                }
                onChange={(e) => {
                  setFormInputs({
                    ...formInputs,
                    is_remember: e.target.checked ? e.target.checked : false,
                  });
                }}
              />
            </span>
          </div>
          <div className="d-grid gap-3">
            {!loading ? (
              <Button variant="primary" type="submit">
                Login
              </Button>
            ) : (
              <Button variant="primary" type="button">
                <Spinner size="sm" />
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
