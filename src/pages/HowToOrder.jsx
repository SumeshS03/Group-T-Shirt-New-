import React from 'react'
import "./HowToOrder.css"

const HowToOrder = () => {
  return (
    <div className="we-work-box p-4">
  <h1 className="text-center mb-5 fw-bold text-gradient">How To Order</h1>

  <div className="row g-5">
    {/* Below 12 Section */}
    <div className="col-lg-6">
      <h2 className="text-center fw-bold mb-4 orderdetailtext">Order Quantity Below 12</h2>
      <ul className="timeline">
        <li><span>1</span> Choose from <b>ready stock</b> (subject to availability)</li>
        <li><span>2</span> Upload your <b>logo</b> & specify its position</li>
        <li><span>3</span> Make <b>full payment</b> & provide billing/shipping details</li>
        <li><span>4</span> Approve the <b>design</b> we send you</li>
        <li><span>5</span> Order will be <b>shipped immediately</b> after production</li>
      </ul>
    </div>

    {/* Above 12 Section */}
    <div className="col-lg-6">
      <h2 className="text-center fw-bold mb-4 orderdetailtext">Order Quantity Above 12</h2>
      <ul className="timeline">
        <li><span>1</span> Choose from wide range (MOQ starts at 12)</li>
        <li><span>2</span> Provide <b>quantity, logos, colors & size breakup</b></li>
        <li><span>3</span> Pick from available customization options</li>
        <li><span>4</span> Add to cart & enter billing/shipping details</li>
        <li><span>5</span> Make <b>advance payment</b></li>
        <li><span>6</span> Approve the <b>design</b> before production</li>
        <li><span>7</span> Complete <b>balance payment</b> after order is ready</li>
        <li><span>8</span> Order will be <b>shipped after payment</b></li>
      </ul>
    </div>
  </div>
</div>


  )
}

export default HowToOrder