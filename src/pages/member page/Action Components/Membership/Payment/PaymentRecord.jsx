import './PaymentRecord.css'
import { useNavigate } from 'react-router-dom';

export default function PaymentRecord() {

    const navigate = useNavigate()
    let handleEditButton = () => navigate('editpayment')

    return (
        <div className="paymentRecord">
            <div className="paymentRecordHeadSection">
                <h1>Payment Record</h1>
            </div>

            <div className="paymentRecordContainer">
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Mode</th>
                        <th>Due Date</th>
                        <th>Action</th>
                    </tr>

                    <tr>
                        <td>01 Aug 2025</td>
                        <td>7000</td>
                        <td>UPI</td>
                        <td>01 Sep 2025</td>
                        <td><button onClick={handleEditButton}>Edit</button> <button>Delete</button></td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
