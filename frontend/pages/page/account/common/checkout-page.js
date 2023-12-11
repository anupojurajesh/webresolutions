import React, { useContext, useState } from "react";
import { Media, Container, Form, Row, Col } from "reactstrap";
import CartContext from "../../../../helpers/cart";
import paypal from "../../../../public/assets/images/paypal.png";
// import { PayPalButton } from "react-paypal-button-v2";
import { PayPalScriptProvider, BraintreePayPalButtons, PayPalButtons } from "@paypal/react-paypal-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";

const CheckoutPage = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const [obj, setObj] = useState({});
  const [payment, setPayment] = useState("cod");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // initialise the hook
  const router = useRouter();

  const checkhandle = (value) => {
    setPayment(value);
  };

  const onSubmit = (data) => {
    if (data !== "") {
      alert("You submitted the form and stuff!");
      router.push({
        pathname: "/page/order-success",
        state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
      });
    } else {
      errors.showMessages();
    }
  };1

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value;
    setObj(obj);
  };

  console.log("cartItems", cartItems);
  // Calculate the surcharge (2% of the subtotal)
const surcharge = (cartTotal * 0.02).toFixed(2); // Assuming cartTotal is a number
const totalval= (parseFloat(cartTotal) + parseFloat(surcharge)).toFixed(2);
  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg="6" sm="12" xs="12">
                  <div className="checkout-title">
                    <h3>Billing Details</h3>
                  </div>
                  <div className="row check-out">
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">First Name</div>
                      <input type="text" className={`${errors.firstName ? "error_border" : ""}`} name="first_name" {...register("first_name", { required: true })} />
                      <span className="error-message">{errors.firstName && "First name is required"}</span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Last Name</div>
                      <input type="text" className={`${errors.last_name ? "error_border" : ""}`} name="last_name" {...register("last_name", { required: true })} />
                      <span className="error-message">{errors.last_name && "Last name is required"}</span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Phone</div>
                      <input type="text" name="phone" className={`${errors.phone ? "error_border" : ""}`} {...register("phone", { pattern: /\d+/ })} />
                      <span className="error-message">{errors.phone && "Please enter number for phone."}</span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Email Address</div>
                      <input
                        //className="form-control"
                        className={`${errors.email ? "error_border" : ""}`}
                        type="text"
                        name="email"
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                      />
                      <span className="error-message">{errors.email && "Please enter proper email address ."}</span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Country</div>
                      <select name="country" {...register("country", { required: true })}>
                        <option>India</option>
                        <option>South Africa</option>
                        <option>United State</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Address</div>
                      <input
                        //className="form-control"
                        className={`${errors.address ? "error_border" : ""}`}
                        type="text"
                        name="address"
                        {...register("address", { required: true, min: 20, max: 120 })}
                        placeholder="Street address"
                      />
                      <span className="error-message">{errors.address && "Please right your address ."}</span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Town/City</div>
                      <input
                        //className="form-control"
                        type="text"
                        className={`${errors.city ? "error_border" : ""}`}
                        name="city"
                        {...register("city", { required: true })}
                        onChange={setStateFromInput}
                      />
                      <span className="error-message">{errors.city && "select one city"}</span>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">State / County</div>
                      <input
                        //className="form-control"
                        type="text"
                        className={`${errors.state ? "error_border" : ""}`}
                        name="state"
                        {...register("state", { required: true })}
                        onChange={setStateFromInput}
                      />
                      <span className="error-message">{errors.state && "select one state"}</span>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Postal Code</div>
                      <input
                        //className="form-control"
                        type="text"
                        name="pincode"
                        className={`${errors.pincode ? "error_border" : ""}`}
                        {...register("pincode", { pattern: /\d+/ })}
                      />
                      <span className="error-message">{errors.pincode && "Required integer"}</span>
                    </div>
                    <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <input type="checkbox" name="create_account" id="account-option" />
                      &ensp; <label htmlFor="account-option">Create An Account?</label>
                    </div>
                  </div>
                </Col>
                <Col lg="6" sm="12" xs="12">
                  {cartItems && cartItems.length > 0 > 0 ? (
                    <div className="checkout-details">
                     <div className="order-box">
    <div className="title-box">
      <div>
        Product <span>Total</span>
      </div>
    </div>
    <ul className="qty">
      {cartItems.map((item, index) => (
        <li key={index}>
          {item.title} × {item.qty}{" "}
          <span>
            {symbol}
            {item.total}
          </span>
        </li>
      ))}
    </ul>
    <ul className="sub-total">
      <li>
        Subtotal{" "}
        <span className="count">
          {symbol}
          {cartTotal}
        </span>
      </li>
      <li>
        Surcharge (2%){" "}
        <span className="count">
          {symbol}
          {surcharge}
        </span>
      </li>
      {/* <li>
        Shipping
        <div className="shipping">
          Your shipping options
        </div>
      </li> */}
    </ul>
    <ul className="total">
      <li>
      
        Total{" "}
        <span className="count">
          {symbol}
          {totalval}
        </span>
      </li>
    </ul>
  </div>
                      <div className="payment-box">
                        <div className="upper-box">
                          <div className="payment-options">
                            <ul>
                              <li>
                                <div className="radio-option stripe">
                                  <input type="radio" name="payment-group" id="payment-2" defaultChecked={true} onClick={() => checkhandle("cod")} />
                                  <label htmlFor="payment-2">COD</label>
                                </div>
                              </li>
                              <li>
                                <div className="radio-option paypal">
                                  <input type="radio" name="payment-group" id="payment-1" onClick={() => checkhandle("paypal")} />
                                  <label htmlFor="payment-1">
                                    PayPal
                                    <span className="image">
                                      <Media src={paypal.src} alt="" />
                                    </span>
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {cartTotal !== 0 ? (
                          <div className="text-end">
                            {payment === "cod" ? (
                              <button type="submit" className="btn-solid btn">
                                Place Order
                              </button>
                            ) : (
                              <PayPalScriptProvider options={{ clientId: "ASLNeYeHop3eKogMqs62AKd55apQvHx7ZRUdppqIeBHBJ-5_PUXxwnemrMLPLgJveO3xUTthmH2FnjHd" }}>
                                <PayPalButtons
                                  createOrder={(data, actions) => {
                                    return actions.order.create({
                                      purchase_units: [
                                        {
                                          amount: {
                                            value: totalval.toString(), // Set the total amount from your cart
                                            currency_code: "USD", // Change this to your desired currency code
                                          },
                                        },
                                      ],
                                    });
                                  }}
                                  // onApprove={(data, actions) => {
                                  //   return actions.order.capture().then((details) => { 
                                      
                                  //   const order_number= Math.floor(100000 + Math.random() * 900000);
                                  //     const name = details.payer.name.given_name;
                                  //     alert(`Transaction completed by ${name+ ' ordernumber: #'+ order_number} full details ${JSON.stringify(details)}`);
                                      
                                  //   });
                                  // }}

                                  onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => { 
                                      const order_number = Math.floor(100000 + Math.random() * 900000);
                                      const name = details.payer.name.given_name;
                                      const cartorderItems = cartItems.map(item => ({
                                        id: item.id,
                                        title: item.title,
                                        qty: item.qty,
                                        total: item.total
                                      }));
                                      // Prepare order data
                                      const orderData = {
                                        user_id: '3456789',
                                        order_number: order_number,
                                        order_items: JSON.stringify(cartorderItems),
                                        amount: cartTotal,
                                        payment_mode: 'symbol22',
                                        order_status: 'Order Placed',
                                        // currency_code:'USD'
                                        // You may need to extract more details from the 'details' object if necessary
                                      };
                                  
                                      // Make a POST request to your backend endpoint
                                      fetch('http://localhost:4000/api/orders/placeorder', {
                                        method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(orderData),
                                      })
                                      .then(response => response.json())
                                      .then(responseData => {
                                        // Handle the response from your backend if needed
                                        console.log('Order placed successfully:', responseData);
                                        alert(`Transaction completed by ${name + ' ordernumber: #' + order_number} 
                                          full details ${JSON.stringify(details)}`);
                                      })
                                      .catch(error => {
                                        // Handle errors during the request
                                        console.error('Error placing order:', error);
                                        alert('Error placing order. Please try again.');
                                      });
                                    });
                                  }}
                                  
                                />
                              </PayPalScriptProvider>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
