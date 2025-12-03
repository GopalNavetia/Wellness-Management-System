import './TrainerTable.css'
import TrainerData from '../../mocks/TrainerData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/AxiosInstance.jsx'

export default function TrainerTable() {

    // API CODE  
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchMemberTableData() {
            try {
                const result = await axiosInstance.get(`/MyProject/TrainerDashboardAPI`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                setFetchData(result.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMemberTableData();
    }, []);

    // Stored Data For Validation
    let storedTrainers = fetchData || [];
    // let storedTrainers = TrainerData;

    // Pagination state
    let [pageNo, setPageNo] = useState(1);
    let trainersPerPage = 8;

    // Search form state
    let [formData, setFormData] = useState({ trainername: "", phone: "" });

    // Common Input Change
    let handleInputChange = (e) => {
        let fieldName = e.target.name;
        let newValue = e.target.value;

        setFormData((currData) => {
            return {
                ...currData,
                [fieldName]: newValue
            }
        });
        setPageNo(1);
    };

    // Filter members based on search inputs
    let filteredTrainers = storedTrainers.filter(trainer => {
        const nameMatch = formData.trainername.trim() === '' || trainer.name.toLowerCase().includes(formData.trainername.toLowerCase());
        const phoneMatch = formData.phone.trim() === '' || trainer.phone.toLowerCase().includes(formData.phone.toLowerCase());
        return nameMatch && phoneMatch;
    });

    // Pagination Calculation
    let totalPages = Math.ceil(filteredTrainers.length / trainersPerPage);
    let startIdx = (pageNo - 1) * trainersPerPage;
    let endIdx = startIdx + trainersPerPage;
    let trainersDataPrint = filteredTrainers.slice(startIdx, endIdx);

    // Handle Right Angle Button
    let handleRightButton = () => {
        if (pageNo < totalPages) {
            setPageNo(pageNo + 1);
        }
    }

    // Handle Left Angle Button
    let handleLeftButton = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1);
        }
    }

    const navigate = useNavigate();
    // Add trainer Button
    function handleAddTrainerButton() {
        navigate('/gymdashboard/trainerpage/addtrainer');
    }

    // View Button
    function handleViewButton(trainerID) {
        navigate(`/gymdashboard/trainerpage/trainerprofile/${trainerID}`);
    }

    function generateTrainersData() {
        return trainersDataPrint.map(trainer => {
            return (
                <tr key={trainer.id}>
                    <td>{trainer.name}</td>
                    <td>{trainer.assigned_members}</td>
                    <td>{trainer.status}</td>
                    <td>{trainer.contact}</td>
                    <td><button onClick={() => handleViewButton(trainer.id)}>View</button></td>
                </tr>
            );
        });
    }

    return (
        <div className='trainerTableContainer'>
            <div className="headContainer">
                <h1>Trainer List</h1>
                {/*  Search Container  */}
                <div className="searchContainer">
                    <input type="text" name="trainername" value={formData.name} id="name" placeholder="Search by Name" onChange={handleInputChange} />
                    <input type="text" name="phone" value={formData.phone} id="phone" placeholder="Search by Phone " onChange={handleInputChange} />
                    <button onClick={handleAddTrainerButton}>Add</button>
                </div>
            </div>

            {loading ? (
                <div>Loading Trainers...</div> // Loading indicator/message
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Assigned Members</th>
                            <th>Status</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {generateTrainersData()}
                    </tbody>
                </table>
            )}

            <div className="pagination">
                <p><span className='leftIcon' onClick={handleLeftButton}><FontAwesomeIcon icon={faAngleLeft} /></span> Showing Page {pageNo} out of {totalPages} <span className='rightIcon' onClick={handleRightButton}><FontAwesomeIcon icon={faAngleRight} /></span></p>
            </div>
        </div>
    );
}