import './ProgressLineChart.css'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressLineChart({ data }) {
    const ALL_KEYS = [
        'weight',
        'height',
        'bmi',
        'fat_percent',
        'muscle_percent',
        'chest',
        'back',
        'shoulder',
        'arms',
        'waist',
        'thighs'
    ];

    const LABELS = {
        weight: 'Weight',
        height: 'Height',
        bmi: 'BMI',
        fat_percent: 'Fat Percent',
        muscle_percent: 'Muscle Percent',
        chest: 'Chest',
        waist: 'Waist',
        shoulder: 'Shoulder',
        arms: 'Arms',
        thighs: 'Thighs',
        back: 'Back',
    };


    const [selectedPart, setSelectedPart] = useState('all');
    const [activeKeys, setActiveKeys] = useState(ALL_KEYS);
    const [graphData, setGraphData] = useState(data);
    const [formData, setFormData] = useState({ from_date: "", to_date: "" });

    // Common Input Change
    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        const newValue = e.target.value;

        setFormData((currData) => ({
            ...currData,
            [fieldName]: newValue
        }));
    };

    // Handle Submit Button
    let handleSubmit = () => {
        const { from_date, to_date } = formData;

        // if no dates selected, show all
        if (!from_date && !to_date) {
            setGraphData(data);
            return;
        }

        const fromTime = from_date ? new Date(from_date).getTime() : null;
        const toTime = to_date ? new Date(to_date).getTime() : null;

        const filtered = data.filter((item) => {
            const itemTime = new Date(item.date).getTime();

            if (fromTime && itemTime < fromTime) return false;
            if (toTime && itemTime > toTime) return false;

            return true;
        });

        setGraphData(filtered);
    };

    let handleReset = () => {
        setFormData({ from_date: "", to_date: "" })
    }

    useEffect(() => {
        handleSubmit();
    }, [formData]);

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

    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label, activeKeys }) => {
        if (!active || !payload || !payload.length) return null;

        const filtered = payload.filter(item => activeKeys.includes(item.dataKey));

        return (
            <div style={{ background: '#fff', border: '1px solid #ccc', padding: 4, fontSize: 14 }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
                {filtered.map(item => (
                    <p key={item.dataKey} style={{ margin: 0, color: item.color }}>
                        {LABELS[item.dataKey]}: {item.value}
                    </p>
                ))}
            </div>
        );
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
                        <option value="back">Back</option>
                        <option value="shoulder">Shoulder</option>
                        <option value="arms">Arms</option>
                        <option value="waist">Waist</option>
                        <option value="thighs">Thighs</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="from_date"><strong>From Date:</strong></label><br />
                    <input type="date" name="from_date" value={formData.from_date} id="from_date" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="to_date"><strong>To Date:</strong></label><br />
                    <input type="date" name="to_date" value={formData.to_date} id="to_date" onChange={handleInputChange} />
                </div>

                <button onClick={handleSubmit}>Apply</button>
                <button onClick={handleReset}>Reset</button>
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
                                        {LABELS[key]}
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
                                    {LABELS[selectedPart]}
                                </button>
                            );
                        })()
                    )}
                </div>

                <div className="lineChart">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={graphData}>
                            <CartesianGrid strokeDasharray="" strokeWidth="0.6" />
                            <XAxis dataKey="date" tickFormatter={formatDate} />
                            <YAxis />
                            <Tooltip content={(props) => (<CustomTooltip {...props} activeKeys={activeKeys} />)} />
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