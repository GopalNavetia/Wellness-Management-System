import './DietPlan.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function DietPlan() {
    const { memberID } = useParams();
    const [dietText, setDietText] = useState('');
    const [loading, setLoading] = useState(true);

    const [mode, setMode] = useState('view'); // view | edit
    const [draftText, setDraftText] = useState('');

    useEffect(() => {
        const sampleGymMealPlanText = `Meal 1 - Breakfast (7:00 AM)
Oats (60g), 4 egg whites + 1 whole egg, 1 banana

Meal 2 - Lunch (12:30 PM)
Grilled chicken breast (150g), brown rice (1 cup), mixed vegetables

Meal 3 - Pre/Post Workout (5:00 PM)
Whey protein shake (1 scoop), 1 apple, 10 almonds

Meal 4 - Dinner (8:30 PM)
Fish or paneer (150g), sweet potato (150g), salad`;

        setDietText(sampleGymMealPlanText);
        setLoading(false);
    }, [memberID]);

    const handleEdit = () => {
        setDraftText(dietText);
        setMode('edit');
    };

    const handleSave = () => {
        setDietText(draftText.trim());
        setMode('view');
        setDraftText('');
    };

    const handleCancel = () => {
        setMode('view');
        setDraftText('');
    };

    const handleClear = () => {
        setDietText('');
        setMode('view');
        setDraftText('');
    };

    const handleSend = () => {
        // Replace with API call later
        console.log('Sending diet plan:', dietText);
    };

    const renderPageContent = () => (
        <div className="dietRecord">
            <div className="dietRecordHeadSection">
                <h1>Diet Plan</h1>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button onClick={handleEdit} disabled={mode !== 'view'}>Edit</button>
                    <button onClick={handleClear} disabled={mode !== 'view' || !dietText}>Clear</button>
                    <button onClick={handleSend} disabled={mode !== 'view' || !dietText}>Send</button>
                </div>
            </div>

            <div className="dietRecordContainer">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {mode === 'view' ? (
                            <p style={{ whiteSpace: 'pre-line' }}>{dietText || 'No diet plan available.'}</p>
                        ) : (
                            <div>
                                <textarea
                                    value={draftText}
                                    onChange={(e) => setDraftText(e.target.value)}
                                    rows={12}
                                    style={{ width: '100%', resize: 'vertical' }}
                                    placeholder="Edit meal plan..."
                                />
                                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );

    return renderPageContent();
}