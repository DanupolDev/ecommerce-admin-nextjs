import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <Layout>
      <h1>Orders</h1>
      {/* {orders.map((order, index) => (
        <h1>{order._id}</h1>
      ))} */}
      <table className="basic">
        <thead>
          <tr>
            <th>DATE</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {orders.length > 0 &&
            orders.map((order, index) => (
              <tr key={order._id}>
                {/* <td>{order.createdAt.replace("T", " ").substring(0, 16)}</td> */}
                <td>{new Date(order.createdAt).toLocaleString("ta-LK")}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "YES" : "NO"}
                </td>
                <td>
                  {order.name} {order.email} <br />
                  {order.city} {order.postalCode} {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data.product_data.name} x {l.quantity} <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
