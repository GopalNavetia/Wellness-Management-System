import './SalaryRecord.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddSalary from './AddSalary';
import EditSalary from './EditSalary';
import { useNavigate, useRoutes, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function SalaryRecord() {
    // Backend data and UI loading state
    const { trainerID } = useParams();

    // const [fetchData, setFetchData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchData = [
        {
            salary_id: 1,
            pay_date: "2025-11-30",
            pay_salary_month: "November 2025",
            mode: "Bank Transfer",
            amount: 25000
        },
        {
            salary_id: 2,
            pay_date: "2025-10-31",
            pay_salary_month: "October 2025",
            mode: "Cash",
            amount: 25000
        },
        {
            salary_id: 3,
            pay_date: "2025-09-30",
            pay_salary_month: "September 2025",
            mode: "UPI",
            amount: 26000
        },
        {
            salary_id: 4,
            pay_date: "2025-08-31",
            pay_salary_month: "August 2025",
            mode: "Bank Transfer",
            amount: 25500
        },
        {
            salary_id: 5,
            pay_date: "2025-07-31",
            pay_salary_month: "July 2025",
            mode: "Cash",
            amount: 25000
        }
    ];

    // Fetch Clients from backend
    // useEffect(() => {
    //     async function fetchSalary() {
    //         try {
    //             const result = await axiosInstance.get(`/MyProject/SalaryTableAPI?id=${trainerID}`, {
    //                 headers: { "ngrok-skip-browser-warning": "true" }
    //             });
    //             setFetchData(result.data || []);
    //         } catch (error) {
    //             console.log(error);
    //             setFetchData([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchSalary();
    // }, [trainerID]);



    // Navigation helpers
    const navigate = useNavigate();
    const handleCloseButton = () => navigate(`/gymdashboard/trainerpage/trainerprofile/${trainerID}`);
    const handleAddButton = () => navigate(`addsalary/${trainerID}`);
    const handleEditButton = () => {
        navigate(`editsalary/${trainerID}`);
    };
    const handleDeleteButton = async (salaryID) => {
        if (!window.confirm('Are you sure you want to delete this salary record?')) {
            return;
        }
        try {
            await axiosInstance.delete(`/MyProject/DeleteSalaryAPI?id=${salaryID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            setFetchData(prevData => prevData.filter(salary => salary.salary_id !== salaryID));
        } catch (error) {
            console.log(error);
        }
    }

    const renderPageContent = () => (
        <div className='salaryRecordContainer'>
            <div className='salaryRecordHeadSection'>
                <h1>Salary Record</h1>
                <div className='buttonsContainer'>
                    <button onClick={handleAddButton}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>

            <div className='salaryListContainer'>
                {loading ? (
                    <div>Loading salary...</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Pay Date</th>
                                <th>Salary Month</th>
                                <th>Mode</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(fetchData) && fetchData.length > 0 ? (
                                fetchData.map((salary) => {

                                    return (<tr key={salary.salary_id}>
                                        <td>{salary.pay_date}</td>
                                        <td>{salary.pay_salary_month}</td>
                                        <td>{salary.mode}</td>
                                        <td>{salary.amount}</td>
                                        <td>
                                            <button onClick={() => handleEditButton(salary.salary_id)}>Edit</button>
                                            <button onClick={() => handleDeleteButton(salary.salary_id)}>Delete</button>
                                        </td>
                                    </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                        No salary record found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );

    const MembershipRecordRoutes = () => {
        return useRoutes([
            { path: '/:trainerID', element: renderPageContent() },
            { path: ':trainerID/addsalary/:trainerID', element: <AddSalary /> },
            { path: ':trainerID/editsalary/:trainerID', element: <EditSalary /> }
        ]);
    };

    return <MembershipRecordRoutes />;
}