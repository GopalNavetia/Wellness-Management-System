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

    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Clients from backend
    useEffect(() => {
        async function fetchSalary() {
            try {
                const result = await axiosInstance.get(`/MyProject/SalaryRecordAPI?id=${trainerID}`, {
                    headers: { "ngrok-skip-browser-warning": "true" }
                });
                setFetchData(result.data || []);
            } catch (error) {
                console.log(error);
                setFetchData([]);
            } finally {
                setLoading(false);
            }
        }
        fetchSalary();
    }, [trainerID]);



    // Navigation helpers
    const navigate = useNavigate();
    const handleCloseButton = () => navigate(`/gymdashboard/trainerpage/trainerprofile/${trainerID}`);
    const handleAddButton = () => navigate(`addsalary/${trainerID}`);
    const handleEditButton = (salaryID) => {
        navigate(`editsalary/${salaryID}`);
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
            { path: ':trainerID/editsalary/:salaryID', element: <EditSalary /> }
        ]);
    };

    return <MembershipRecordRoutes />;
}