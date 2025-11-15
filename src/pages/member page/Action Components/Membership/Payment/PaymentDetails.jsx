import "./PaymentDetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useRoutes, useLocation } from 'react-router-dom';
import PaymentRecord from './PaymentRecord';
import AddPayment from './AddPayment';
import EditPayment from './EditPayment';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PaymentDetails({ membershipID: propMembershipID }) {
    // If using route location.state for membershipID (for robustness)
    const location = useLocation();
    // Prefer location.state first, fallback to prop
    const membershipID = location.state?.membershipID || propMembershipID;

    const API_BASE_URL = 'https://admonitorial-cinderella-hungerly.ngrok-free.dev';
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!membershipID) {
            console.warn("membershipID is null or undefined");
            setFetchData({ error: "No membership selected" });
            setLoading(false);
            return;
        }
        async function fetchPaymentDetail() {
            try {
                console.log("send ID:", membershipID);
                const result = await axios.get(`${API_BASE_URL}/MyProject/PaymentDetail?id=${membershipID}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                console.log(result.data);
                setFetchData(result.data);
            } catch (error) {
                console.log(error);
                setFetchData({ error: "Network or Server Error" });
            } finally {
                setLoading(false);
            }
        }
        fetchPaymentDetail();
    }, [membershipID]);

    const navigate = useNavigate();
    const handleAddButton = () => navigate('addpayment');
    const handleClose = () => navigate(-1);

    // UI rendering logic: shows loading, error, or payment data
    const renderPageContent = () => (
        <>
            <div className="paymentDetails">
                <div className="paymentDetailsHeadSection">
                    <h1>Payment Details</h1>
                    <div className='buttonsContainer'>
                        <button onClick={handleAddButton}>Add</button>
                        <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
                    </div>
                </div>

                <div className="infoContainer">
                    {loading && <p>Loading...</p>}
                    {fetchData && fetchData.error && (
                        <p className="error">{fetchData.error}</p>
                    )}
                    {fetchData && !fetchData.error && (
                        <>
                            <div>
                                <p className="title">Total Fee:</p>
                                <p className="data">{fetchData.total_fee}</p>
                            </div>
                            <div>
                                <p className="title">Paid Amount:</p>
                                <p className="data">{fetchData.paid_fee}</p>
                            </div>
                            <div>
                                <p className="title">Pending Amount:</p>
                                <p className="data">{fetchData.pending_fee}</p>
                            </div>
                            <div>
                                <p className="title">Next Due Date:</p>
                                <p className="data">{fetchData.due_date}</p>
                            </div>
                            <div>
                                <p className="title">Status:</p>
                                <p className="data">{fetchData.status}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <PaymentRecord />
        </>
    );

    // Routing logic remains unchanged
    const PaymentDetailsRoutes = () => {
        return useRoutes([
            { path: '/', element: renderPageContent() },
            { path: 'addpayment', element: <><AddPayment />{renderPageContent()}</> },
            { path: 'editpayment', element: <><EditPayment />{renderPageContent()}</> },
        ]);
    };

    return <PaymentDetailsRoutes />;
}
