import './ProgressLineChart.css'
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressLineChart({ data }) {
    const data1 = [
        { date: '2025-01-01', weight: 68.2, thighs: 19.1, chest: 37.2, back: 14.3, arms: 13.1, waist: 31.4, shoulder: 43.2, bmi: 23.6, fat_percent: 17.1, muscle_percent: 39.2 },
        { date: '2025-02-01', weight: 67.8, thighs: 19.3, chest: 37.4, back: 14.1, arms: 13.4, waist: 31.2, shoulder: 43.5, bmi: 23.4, fat_percent: 16.9, muscle_percent: 39.5 },
        { date: '2025-03-01', weight: 69.5, thighs: 19.8, chest: 38.1, back: 14.6, arms: 13.7, waist: 32.1, shoulder: 44.1, bmi: 24.0, fat_percent: 18.2, muscle_percent: 40.1 },
        { date: '2025-04-01', weight: 70.3, thighs: 20.2, chest: 38.4, back: 15.0, arms: 14.0, waist: 32.6, shoulder: 44.4, bmi: 24.3, fat_percent: 18.5, muscle_percent: 40.4 },
        { date: '2025-05-01', weight: 69.1, thighs: 20.0, chest: 38.2, back: 14.8, arms: 13.9, waist: 32.3, shoulder: 44.2, bmi: 23.9, fat_percent: 17.8, muscle_percent: 40.2 },
        { date: '2025-06-01', weight: 71.2, thighs: 21.1, chest: 39.3, back: 15.4, arms: 14.6, waist: 33.2, shoulder: 45.3, bmi: 24.6, fat_percent: 19.1, muscle_percent: 41.3 },
        { date: '2025-07-01', weight: 70.8, thighs: 21.0, chest: 39.1, back: 15.2, arms: 14.5, waist: 33.0, shoulder: 45.1, bmi: 24.5, fat_percent: 18.9, muscle_percent: 41.1 },
        { date: '2025-08-01', weight: 72.4, thighs: 22.0, chest: 40.2, back: 16.1, arms: 15.2, waist: 34.1, shoulder: 46.2, bmi: 25.0, fat_percent: 19.8, muscle_percent: 42.0 },
        { date: '2025-09-01', weight: 71.6, thighs: 21.8, chest: 40.0, back: 15.9, arms: 15.1, waist: 33.9, shoulder: 46.0, bmi: 24.7, fat_percent: 19.5, muscle_percent: 41.8 },
        { date: '2025-10-01', weight: 73.1, thighs: 22.6, chest: 41.1, back: 16.5, arms: 15.7, waist: 34.6, shoulder: 46.8, bmi: 25.3, fat_percent: 20.3, muscle_percent: 42.6 },
        { date: '2025-11-01', weight: 72.9, thighs: 22.5, chest: 41.0, back: 16.4, arms: 15.6, waist: 34.5, shoulder: 46.7, bmi: 25.2, fat_percent: 20.1, muscle_percent: 42.5 },
        { date: '2025-12-01', weight: 74.2, thighs: 23.2, chest: 41.8, back: 17.0, arms: 16.2, waist: 35.1, shoulder: 47.4, bmi: 25.6, fat_percent: 20.9, muscle_percent: 43.2 }
    ];

    const ALL_KEYS = [
        'weight',
        'bmi',
        'fat_percent',
        'muscle_percent',
        'chest',
        'waist',
        'shoulder',
        'arms',
        'thighs',
        'back',
        'height'
    ];

    const [selectedPart, setSelectedPart] = useState('all');
    const [activeKeys, setActiveKeys] = useState(ALL_KEYS);

    // Helper Function
    const handleToggle = (key) => {
        setActiveKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const shouldShowLine = (key) => {
        if (selectedPart === 'all') {
            return activeKeys.includes(key);
        }

        return selectedPart === key;
    };

    // Date Formater
    const formatDate = (value) =>
        new Date(value).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
        });

    return (
        <div className="progressChart">
            <div className="progressChartHeadSection">
                <h1>Progress Graph</h1>
            </div>

            <div className="formContainer">
                <div>
                    <label htmlFor="type"><strong>Body Part:</strong></label>
                    <select name="type" value={selectedPart} id="type" onChange={(e) => setSelectedPart(e.target.value)}>
                        <option value="all">All Combined</option>
                        <option value="weight">Weight</option>
                        <option value="height">Height</option>
                        <option value="bmi">BMI</option>
                        <option value="fat_percent">Body Fat %</option>
                        <option value="muscle_percent">Muscle Mass %</option>
                        <option value="chest">Chest</option>
                        <option value="waist">Waist</option>
                        <option value="shoulder">Shoulder</option>
                        <option value="arms">Arms</option>
                        <option value="thighs">Thighs</option>
                        <option value="back">Back</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="from_date"><strong>From Date:</strong></label><br />
                    <input type="date" name="from_date" value={''} id="from_date" onChange={''} />
                </div>

                <div>
                    <label htmlFor="to_date"><strong>To Date:</strong></label><br />
                    <input type="date" name="to_date" value={''} id="to_date" onChange={''} />
                </div>

                <button>Apply</button>
            </div>

            <div className="lineChartContainer">

                {/* CUSTOM LEGEND - Always shows all buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1%', padding: '1%' }}>
                    {selectedPart === 'all' ? (
                        // When dropdown = "All Combined", show all 10 buttons
                        ALL_KEYS.map((key) => {
                            // Find the color for this key from our Line colors
                            const colorMap = {
                                weight: '#8884d8',
                                thighs: '#82ca9d',
                                chest: '#ff7300',
                                back: '#ff0000',
                                arms: '#00bcd4',
                                waist: '#9c27b0',
                                shoulder: '#4caf50',
                                bmi: '#795548',
                                fat_percent: '#3f51b5',
                                muscle_percent: '#ff5722',
                                height: '#ffc107'
                            };

                            const isActive = activeKeys.includes(key);
                            const color = colorMap[key];

                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleToggle(key)}
                                    style={{
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        border: `2px solid ${color}`,
                                        backgroundColor: isActive ? color : '#fff',
                                        color: isActive ? '#fff' : color,
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <span style={isActive ? {} : { textDecoration: 'line-through' }}>
                                        {key.toUpperCase().replace('_', ' ')}
                                    </span>
                                </button>
                            );
                        })
                    ) : (
                        // When dropdown = specific part, show only that one button
                        (() => {
                            const colorMap = {
                                weight: '#8884d8',
                                thighs: '#82ca9d',
                                chest: '#ff7300',
                                back: '#ff0000',
                                arms: '#00bcd4',
                                waist: '#9c27b0',
                                shoulder: '#4caf50',
                                bmi: '#795548',
                                fat_percent: '#3f51b5',
                                muscle_percent: '#ff5722',
                                height: '#ffc107'
                            };

                            const color = colorMap[selectedPart];

                            return (
                                <button
                                    key={selectedPart}
                                    type="button"
                                    disabled
                                    style={{
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        border: `2px solid ${color}`,
                                        backgroundColor: color,
                                        color: '#fff',
                                        fontSize: '12px',
                                        cursor: 'default',
                                    }}
                                >
                                    {selectedPart.toUpperCase().replace('_', ' ')}
                                </button>
                            );
                        })()
                    )}
                </div>

                <div className="lineChart">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="" strokeWidth="0.6" />
                            <XAxis dataKey="date" tickFormatter={formatDate} />
                            <YAxis />
                            <Tooltip />
                            {shouldShowLine('weight') && (<Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                            {shouldShowLine('height') && (<Line type="monotone" dataKey="height" stroke="#ffc107" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                            {shouldShowLine('thighs') && (<Line type="monotone" dataKey="thighs" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                            {shouldShowLine('chest') && (<Line type="monotone" dataKey="chest" stroke="#ff7300" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                            {shouldShowLine('back') && (<Line type="monotone" dataKey="back" stroke="#ff0000" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                            {shouldShowLine('arms') && (<Line type="monotone" dataKey="arms" stroke="#00bcd4" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                            {shouldShowLine('waist') && (<Line type="monotone" dataKey="waist" stroke="#9c27b0" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                            {shouldShowLine('shoulder') && (<Line type="monotone" dataKey="shoulder" stroke="#4caf50" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                            {shouldShowLine('bmi') && (<Line type="monotone" dataKey="bmi" stroke="#795548" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                            {shouldShowLine('fat_percent') && (<Line type="monotone" dataKey="fat_percent" stroke="#3f51b5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                            {shouldShowLine('muscle_percent') && (<Line type="monotone" dataKey="muscle_percent" stroke="#ff5722" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />)}

                        </LineChart>
                    </ ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}