<<<<<<< HEAD
export default function TrainerPage() {
    return (
        <div>
            Trainer Page

import './TrainerPage.css'
import Card from './Card';
import TrainerTable from './TrainerTable'
import AddTrainer from '../trainer page/AddTrainer'
import TrainerProfile from './TrainerProfile'
import { useRoutes } from 'react-router-dom';
import { useState } from 'react';

export default function TrainerPage() {

    const TrainerPageRoutes = () => {
        return useRoutes([
            {
                path: '/',
                element: <>
                    <div className="infoCardContainer">
                        <Card title='Total Trainers' data='80' />
                        <Card title='Assigned Members' data='64' />
                        <Card title='Pending Salaries' data='16' />
                    </div>
                    <MemberTable onViewMember={setSelectedTrainerId} />
                </>
            },
            {
                path: '/addtrainer', element: <><AddTrainer /> <TrainerTable /></>
            },
            {
                path: '/trainerprofile/', element: <TrainerProfile memberID={selectedTrainerId} />,
            },
        ]);
    };

    // Get ID of Selected Trainer
    let [selectedTrainerId, setSelectedTrainerId] = useState(null);

    return (
        <div className="trainerPageContainer">
            <TrainerPageRoutes />
>>>>>>> 473d6a6dbf5dd4db5d8b1d750f1964d427e53e2b
        </div>
    );
}