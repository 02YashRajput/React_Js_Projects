import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function CheckoutPage() {
  const [addressInput, setAddressInput] = useState<string>("");
  const handleAddressInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddressInput(event.target.value);
  };
  const [selectedPayment, setSelectedPayment] = useState<string>("");
 
  const handlePaymentChange = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSelectedPayment(value);
  };

  const value = useContext(AppContext);
  const data = value.pageData.filter((item) =>
    value.checkoutList.includes(item.id)
  );
  const count = data.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="flex flex-col justify-between pt-24 min-h-screen">
      <Header />
      <div className="flex flex-col flex-wrap p-10 justify-center items-center   gap-8">
        <div className="flex flex-col  w-[60%] gap-5 p-5 ">
          {data.length === 0
            ? null
            : data.map((item, index) => [
                <div key={item.id} className=" flex  gap-5 ">
                  <div className="dark:text-yellow-300 text-yellow-700">
                    {index + 1}
                  </div>
                  <div>{item.title} ---</div>
                  <div className="font-bold">{item.price}$</div>
                </div>,
              ])}
          <div className="flex justify-center items-center">
            <div className="font-bold">Total = {count}$</div>
          </div>
        </div>
        <div className="flex flex-col   w-[60%] gap-5 p-5">
          <label className="flex gap-5">
            <h1>Enter Address</h1>
            <textarea
              value={addressInput}
              onChange={handleAddressInputChange}
              className="border border-slate-500 resize-none h-full"
            />
          </label>
          <div className="h-0.5 w-[80%] bg-slate-500 "></div>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl">Payment Method</h1>
            <div className="px-4">
              <label className="text-2xl flex items-center gap-4">
                <input
                  type="radio"
                  name="payment"
                  onClick={handlePaymentChange}
                  value={"debit"}
                  className="w-5 h-5"
                />
                Debit Card
              </label>
              <label className="text-2xl flex items-center gap-4">
                <input
                  type="radio"
                  name="payment"
                  onClick={handlePaymentChange}
                  value={"credit"}
                  className="w-5 h-5"
                />
                Credit Card
              </label>
              <label className="text-2xl flex items-center gap-4">
                <input
                  type="radio"
                  name="payment"
                  onClick={handlePaymentChange}
                  value={"upi"}
                  className="w-5 h-5"
                />
                UPI
              </label>
              <label className="text-2xl flex items-center gap-4">
                <input
                  type="radio"
                  name="payment"
                  onClick={handlePaymentChange}
                  value={"net_banking"}
                  className="w-5 h-5"
                />
                Net Banking
              </label>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                if (addressInput !== "" && selectedPayment !== "") {
                  toast.success("Thank You for your order", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                } else if (addressInput === "") {
                  toast.error("Please enter address", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                } else {
                  toast.error("Please select payment method", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                }
              }}
              className="bg-yellow-500 text-white p-3 text-xl flex-none  rounded-sm"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutPage;
