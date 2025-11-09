import "./PaymentDetails.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useRoutes } from 'react-router-dom';
import PaymentRecord from './PaymentRecord'
import AddPayment from './AddPayment'
import EditPayment from './EditPayment'

export default function PaymentDetails() {
    const navigate = useNavigate();
    let handleAddButton = () => navigate('addpayment');
    let handleClose = () => navigate(-1);

    let renderPageContent = () => (
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
                    <div>
                        <p className="title">Total Fee:</p>
                        <p className="data">10000</p>
                    </div>

                    <div>
                        <p className="title">Paid Amount:</p>
                        <p className="data">7000</p>
                    </div>

                    <div>
                        <p className="title">Pending Amount:</p>
                        <p className="data">3000</p>
                    </div>

                    <div>
                        <p className="title">Next Due Date:</p>
                        <p className="data">1 Sep 2025</p>
                    </div>

                    <div>
                        <p className="title">Status:</p>
                        <p className="data">Pending</p>
                    </div>

                </div>
            </div>
            <PaymentRecord />
        </>
    );

    let PaymentDetailsRoutes = () => {
        return useRoutes([
            { path: '/', element: renderPageContent() },
            { path: 'addpayment', element: <> <AddPayment /> {renderPageContent()}</> },
            { path: 'editpayment', element: <> <EditPayment /> {renderPageContent()}</> },
        ])
    };

    return <PaymentDetailsRoutes />;
}