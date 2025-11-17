import './PaymentRecord.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackendURL from '../../../../../utils/BackendURL'

export default function PaymentRecord({ membershipID }) {

    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch Backend Data 
    useEffect(() => {
        if (!membershipID) {
            console.warn("membershipID is null or undefined");
            setFetchData({ error: "No membership selected" });
            setLoading(false);
            return;
        }

        async function fetchPaymentRecord() {
            try {
                // console.log("send ID in record:", membershipID);
                const result = await axios.get(`${BackendURL}/MyProject/PaymentRecordFetch?membership_id=${membershipID}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                // console.log(result.data);
                setFetchData(result.data);
            } catch (error) {
                console.log(error);
                setFetchData({ error: "Network or Server Error" });
            } finally {
                setLoading(false);
            }
        }
        fetchPaymentRecord();

    }, [membershipID]);

    const navigate = useNavigate()
    let handleEditButton = () => navigate('editpayment')

    return (
        <div className="paymentRecord">
            <div className="paymentRecordHeadSection">
                <h1>Payment Record</h1>
            </div>

            <div className="paymentRecordContainer">
                {loading ? (<p>Loading...</p>) : (

                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Mode</th>
                                <th>Due Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(fetchData) && fetchData.length > 0 ? (
                                fetchData.map((payment) => (
                                    <tr key={payment.pay_id}>
                                        <td>{payment.pay_date}</td>
                                        <td>{payment.amount}</td>
                                        <td>{payment.mode}</td>
                                        <td>{payment.due_date}</td>
                                        <td>
                                            <button onClick={handleEditButton}>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                        No payments found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
