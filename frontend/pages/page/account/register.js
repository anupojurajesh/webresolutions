import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CommonLayout from '../../../components/shop/common-layout';
import { Input, Container, Row, Form, Label, Col } from 'reactstrap'; // Import NavLink from reactstrap

const Register = () => {
    const router = useRouter();

    // State to manage form inputs
    const [formData, setFormData] = useState({
        name: '',
        phone:'',
        email: '',
        password: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // alert(formData);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
         alert(JSON.stringify(formData)  );

        try {
            // Send registration data to backend
            const response = await fetch('http://localhost:4000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // If registration is successful, redirect to checkout page
                localStorage.setItem("user", true);
                router.push(`/page/account/checkout`);
            } else {
                // Handle error or display appropriate message
                alert('Registration failed'+response.status);
            }
        } catch (error) {
            alert('Error:'+error);
        }
    };

    return (
        <CommonLayout parent="home" title="register">
            <section className="register-page section-b-space">
            <Container>
                    <Row>
                        <Col lg="12">
                            <h3>Create Account</h3>
                            <div className="theme-card">

                                <Form className="theme-form" onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md="6">
                                            <Label className="form-label" for="email">Name</Label>
                                            <Input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                        </Col>
                                        <Col md="6">
                                            <Label className="form-label" for="review">Phone Number</Label>
                                            <Input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Label className="form-label" for="email">email</Label>
                                            <Input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                        </Col>
                                        <Col md="6">
                                            <Label className="form-label" for="review">Password</Label>
                                            <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                        </Col>
                                        <Col md="12">
                                        <button type="submit" className="btn btn-solid w-auto">Create Account</button>
                                        </Col>
                                    </Row>
                                </Form>
                                <div className="text-center mt-4">
                                    <p>Already have an account? Login</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default Register;
