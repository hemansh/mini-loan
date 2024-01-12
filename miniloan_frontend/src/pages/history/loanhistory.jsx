import { useState,useEffect } from "react"
import { axiosInstance } from "../../config";
import { useNavigate } from "react-router-dom";

const LoanHistory=()=>{
    const [loans,setLoans] = useState([]);
    const navigate = useNavigate();
    const getloans=async()=>{
        try{
            const res = await axiosInstance.get('/customer/getpaidloans');
            if(res.status == 200){
                setLoans(res.data);
                console.log(loans)
            }
        } catch(err){
            if(err.response.status == 401){
                navigate('/login');
            }
            console.log(err);
        }
    }
    useEffect(() => {
        getloans();
    }, [])

    const util = (status) => {
        if (status == 'REQ') {
            return "Requested";
        } else if (status == 'APR') {
            return "Approved";
        } else if (status == 'PAID') {
            return "Paid";
        }
    }


    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-center">Paid loans</h3>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loans.map((repayment, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{repayment.userid}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{repayment.date.slice(0, 10)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${repayment.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{util(repayment.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default LoanHistory