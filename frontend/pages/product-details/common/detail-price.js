import React, { useState, useContext } from "react";
import Link from "next/link";
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
  const [modal, setModal] = useState(false);
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  const toggle = () => setModal(!modal);
  const product = item;
  const context = useContext(CartContext);
  const stock = context.stock;
  const plusQty = context.plusQty;
  const minusQty = context.minusQty;
  const quantity = context.quantity;
  const uniqueColor = [];
  const uniqueSize = [];

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <h2> {product.title} </h2>
        <h4>
          {product.variants.map((vari) => {
          var findItem = uniqueColor.find((x) => x.color === vari.color);
          if (!findItem) uniqueColor.push(vari);
          var findItemSize = uniqueSize.find((x) => x === vari.size);
          if (!findItemSize) uniqueSize.push(vari.size);
        })}
          <span>
          <div className="size-box">
                      {uniqueSize.map((data, i) => {
                        return (
                          <p>Size:{data}</p>
                        );
                      })}
                  </div>
          </span>
        </h4>
        <h3>
          {symbol}
          {product.price}
        </h3>
       
        {changeColorVar === undefined ? (
          <>
            {uniqueColor.some((vari) => vari.color) ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return <li className={vari.color} key={i} title={vari.color}></li>;
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            {uniqueColor.some((vari) => vari.color) ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return <li className={vari.color} key={i} title={vari.color} onClick={() => changeColorVar(i)}></li>;
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        )}
        <div className="product-description border-product">
        <h6 className="product-title">product details</h6>
            <p>{product.description}</p>
          <span className="instock-cls">{stock}</span>
          <h6 className="product-title">quantity</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button type="button" className="btn quantity-left-minus" onClick={minusQty} data-type="minus" data-field="">
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input type="text" name="quantity" value={quantity} onChange={changeQty} className="form-control input-number" />
              <span className="input-group-prepend">
                <button type="button" className="btn quantity-right-plus" onClick={() => plusQty(product)} data-type="plus" data-field="">
                  <i className="fa fa-angle-right"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="product-buttons">
          <a href={null} className="btn btn-solid" onClick={() => context.addToCart(product, quantity)}>
            add to cart
          </a>
          <Link href={`/page/account/checkout`} className="btn btn-solid" onClick={() => context.addToCart(product, quantity)}>
            buy now
          </Link>
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;
