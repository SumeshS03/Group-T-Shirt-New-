import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { IoPersonSharp } from "react-icons/io5";

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (storedCustomer) {
      const parsedCustomer = JSON.parse(storedCustomer);
      setCustomer(parsedCustomer);
      console.log("customerdetail", parsedCustomer);
    }
  }, []);

  if (!customer) {
    return <div>Loading customer details...</div>;
  }

  return (
   <>
   <div className='container d-flex justify-content-center'>
    <div className='row w-75'>

    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      className="mb-5 container"
    >
      <Card
        title={
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IoPersonSharp size={20} color="#1890ff" />
            Customer Details
          </span>
        }
        bordered={false}
        style={{
          
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
        extra={
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
          >
            Edit
          </Button>
        }
      >
        <Descriptions column={1} size="middle">
          <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
          <Descriptions.Item label="Mobile">{customer.mobile}</Descriptions.Item>
          <Descriptions.Item label="Address">{customer.address}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
   </div>
   </div>
   
   
   </>
    
  );
};

export default CustomerDetails;
