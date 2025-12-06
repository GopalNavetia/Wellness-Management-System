import './TrainerPage.css'
import Card from './Card';
import TrainerTable from './TrainerTable'
import AddTrainer from '../trainer page/AddTrainer'
import TrainerProfile from './TrainerProfile'
import { useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance'

export default function TrainerPage() {

    // ----- API CODE -----
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTrainerCardData() {
            try {
                const response = await axiosInstance.get("/MyProject/TrainerCardDetailAPI", {
                    headers: { "ngrok-skip-browser-warning": "true" }
                });
                setFetchData(response.data);
            } catch (error) {
                console.error('Error fetching member data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTrainerCardData();
    }, []);

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    // Trainer Page Routes
    const routes = useRoutes([
        {
            path: '/',
            element: <>
                <div className="infoCardContainer">

                    <Card title='Total Trainers' data={fetchData.total_trainers} />
                    <Card title='Active Trainers' data={fetchData.active_trainers} />
                    <Card title='Inactive Trainers' data={fetchData.inactive_trainers} />

                    {/* <Card title='Total Trainers' data='5' />
                    <Card title='Active Trainers' data='4' />
                    <Card title='Inactive Trainers' data='1' /> */}
                </div>
                <TrainerTable />
            </>
        },
        {
            path: 'addtrainer', element: <AddTrainer />
        },
        {
            path: 'trainerprofile/:trainerID/*', element: <TrainerProfile />,
        },
    ]);

    return (
        <div className="trainerPageContainer">
            {routes}
        </div>
    );
}