import { useState, useEffect } from "react";
import { axiosInstance } from "../../config.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('');
    const [scheduledRepayments, setScheduledRepayments] = useState([]);
    const [customAmount, setCustomAmount] = useState('');
    const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
    const [curridx, setCurridx] = useState('');
    const navigate = useNavigate();

    const handleCustomAmount = (idx) => {
        setCurridx(idx)
        setShowCustomAmountModal(true);
    };

    const handleCloseCustomAmountModal = () => {
        setShowCustomAmountModal(false);
        setCurridx("");
    };

    const getscheduledRepayments = async () => {
        try {
            const res = await axiosInstance.get('/customer/getloans');
            if (res.status == 200) {
                setScheduledRepayments(res.data);
                // console.log(res.data);
            }
        } catch (err) {
            if (err.response.status == 401) {
                navigate('/login');
            } else {
                console.log(err);
            }
        }
    }

    const submitloan = async () => {
        const data = {
            "amount": amount,
            "status": "REQ",
            "term": term
        }
        try {
            const res = await axiosInstance.post('/customer/requestloan', data);
            if (res.status == 200) {
                alert("successs");
                getscheduledRepayments();
            }
        } catch (err) {
            console.log(err);
        }

    }

    const handleRepay = async(id)=>{
        try{
            const res = await axiosInstance.post("/customer/repay",{"id":id});
            if(res.status == 200){
                alert("Payment Done ThankYou");
                getscheduledRepayments();
            }
        } catch(err){
            console.log(err);
        }
    }
    const util = (status) => {
        if (status == 'REQ') {
            return "Requested";
        } else if (status == 'APR') {
            return "Approved";
        } else if (status == 'PAID') {
            return "Paid";
        }
    }

    const handleCustomAmountSubmit=async()=>{
        if(customAmount < scheduledRepayments[curridx].amount){
            alert("custom amount must be greater tha equal to outstanding amount");
        }
        try{
            const res = await axiosInstance.post("/customer/customrepay",{"id":scheduledRepayments[curridx].id,"amount":customAmount});
            if(res.status == 200){
                alert("Payment Done ThankYou");
                getscheduledRepayments();
                handleCloseCustomAmountModal();
            }
        } catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        getscheduledRepayments();
    }, [])

    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-2xl mx-auto bg-white p-8 border shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Loan Request</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Amount:
                    </label>
                    <input
                        type="number"
                        id="amount"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter loan amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="term">
                        Term (in weeks):
                    </label>
                    <input
                        type="number"
                        id="term"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter loan term"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>

                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => { submitloan(); }}>
                    Submit Loan Request
                </button>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Scheduled Repayments</h3>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    NEXT Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {scheduledRepayments.map((repayment, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{repayment.date.slice(0, 10)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${repayment.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{util(repayment.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {repayment.status === 'APR' && (
                                            <><button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => { handleRepay(repayment.id); } }>
                                                Repay
                                            </button><button className="bg-blue-500 text-white py-2 ml-2 px-4 rounded hover:bg-blue-600" onClick={()=>{handleCustomAmount(index)} }>
                                                Custom amount
                                                </button></>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showCustomAmountModal && (
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>

                            
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white p-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customAmount">
                                        Enter Custom Amount:
                                    </label>
                                    <input
                                        type="number"
                                        id="customAmount"
                                        className="border rounded w-full py-2 px-3 mb-4"
                                        placeholder="Enter custom amount"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                    />
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                        onClick={() => handleCustomAmountSubmit()}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
                                        onClick={handleCloseCustomAmountModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Home;