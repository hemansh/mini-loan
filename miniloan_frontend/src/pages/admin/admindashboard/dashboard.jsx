import React from "react";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../config";




const Dashboard = () => {
    const [loans, setloans] = useState([]);
    const [loanState, setLoanState] = useState('PENDING');

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/admin/getloans')
            console.log(response.data);
            setloans(response.data);
        } catch (error) {
            console.error('Error fetching loan details:', error);
        }
    };

    const util = (status) => {
        if (status == 'REQ') {
            return "Requested";
        } else if (status == 'APR') {
            return "Approved";
        } else if (status == 'PAID') {
            return "Paid";
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprove = async (id,idx) => {
        try {
            const res = await axiosInstance.put('/admin/updateloan',{"id":id});
            if (res.status == 200) {
                alert("loan approved");
                loans[idx].status="APR";
                fetchData();
            } else {
                alert('Failed to approve loan');
            }
        } catch (error) {
            console.error('Error approving loan:', error);
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-center">All loans</h3>
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
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
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
                            <td className="px-6 py-4 whitespace-nowrap">
                                {repayment.status === 'REQ' && (
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={()=>{handleApprove(repayment.id,index)}}>
                                        Approve
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;