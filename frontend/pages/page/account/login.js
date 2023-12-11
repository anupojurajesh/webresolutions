import React, {useState} from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { useRouter } from "next/router";
import { Container, Row, Form, Label, Input, Col } from "reactstrap";

const Login = () => {
  const router = useRouter();

  // State to manage form inputs
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });
    // Handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      // alert(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
     alert(JSON.stringify(formData)  );

    try {
        // Send login data to backend
        const response = await fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // If login is successful, redirect to checkout page
            localStorage.setItem("user", true);
            router.push(`/page/account/checkout`);
        } else {
            // Handle error or display appropriate message
            alert('Login failed'+response.status);
        }
    } catch (error) {
        alert('Error:'+error);
    }
};
  return (
    <CommonLayout parent="home" title="login">
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>Login</h3>
              <div className="theme-card">
                <Form className="theme-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <Input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                  </div>
                  <div className="form-group">
                    <Label className="form-label" for="review">
                      Password
                    </Label>
                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                  </div>
                  <button type="submit" className="btn btn-solid">Login</button>
                </Form>
              </div>
            </Col>
            <Col lg="6" className="right-login"> 
              <h3>New Customer</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Create A Account</h6>
                <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be able to order from our shop. To start shopping click register.</p>
                <a href="#" className="btn btn-solid">
                  Create an Account
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Login;
