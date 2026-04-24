import './DietPlan.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axiosInstance from '../../../../utils/AxiosInstance'

export default function DietPlan({ phone }) {
    const { memberID } = useParams();
    const [dietText, setDietText] = useState('');
    const [loading, setLoading] = useState(true);

    const [mode, setMode] = useState('view'); // view | add | edit
    const [draftText, setDraftText] = useState('');

    // Extract phone from props
    const phoneNumber = phone;

    useEffect(() => {
        async function fetchDietPlanData() {
            try {
                const response = await axiosInstance.get(
                    `/MyProject/DietPlanFetch?member_id=${memberID}`,
                    {
                        headers: { "ngrok-skip-browser-warning": "true" }
                    }
                );

                // API response example: { diet_text: "dsdsdsad", status: "success" }
                setDietText(response?.data?.diet_text || '');
            } catch (error) {
                console.error('Error fetching diet data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchDietPlanData();
    }, []);

    const handleAdd = () => {
        setDraftText('');
        setMode('add');
    };

    const handleEdit = () => {
        setDraftText(dietText);
        setMode('edit');
    };

    const handleInsert = async () => {
        const trimmedText = draftText.trim();
        if (!trimmedText) return;

        try {
            const response = await axiosInstance.post(
                `/MyProject/DietPlanAPI?member_id=${memberID}`,
                { diet_text: trimmedText },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                }
            );

            const isSuccess =
                response?.data?.success === true ||
                response?.data?.status === 'success';

            if (isSuccess) {
                setDietText(trimmedText);
                setMode('view');
                setDraftText('');
                alert(response?.data?.message || 'Diet plan inserted successfully.');
            } else {
                alert('Failed to insert diet plan: ' + (response?.data?.message || 'Unknown error'));
            }
        } catch (error) {
            alert(error?.response?.data?.message || 'Failed to insert diet plan.');
        }
    };

    const handleSave = async () => {
        const trimmedText = draftText.trim();
        if (!trimmedText) return;

        try {
            const response = await axiosInstance.post(
                `/MyProject/EditDietPlanAPI?member_id=${memberID}`,
                { diet_text: trimmedText },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                }
            );

            const isSuccess =
                response?.data?.success === true ||
                response?.data?.status === 'success';

            if (isSuccess) {
                setDietText(trimmedText);
                setMode('view');
                setDraftText('');
                alert(response?.data?.message || 'Diet plan saved successfully.');
            } else {
                alert('Failed to save diet plan: ' + (response?.data?.message || 'Unknown error'));
            }
        } catch (error) {
            alert(error?.response?.data?.message || 'Failed to save diet plan.');
        }
    };

    const handleCancel = () => {
        setMode('view');
        setDraftText('');
    };

    const handleClearDraft = () => {
        setDraftText('');
    };

    const handleSend = () => {
        if (!phoneNumber || !dietText) {
            alert('Phone number or diet text is missing.');
            return;
        }

        const encodedMessage = encodeURIComponent(dietText);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    const renderPageContent = () => (
        <div className="dietRecord">
            <div className="dietRecordHeadSection">
                <h1>Diet Plan</h1>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button onClick={handleAdd} disabled={mode !== 'view'}>Add</button>
                    <button onClick={handleEdit} disabled={mode !== 'view'}>Edit</button>
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
                                    {mode === 'add' ? (
                                        <button onClick={handleInsert}>Insert</button>
                                    ) : (
                                        <button onClick={handleSave}>Save</button>
                                    )}
                                    <button onClick={handleCancel}>Cancel</button>
                                    <button onClick={handleClearDraft} disabled={!draftText}>Clear</button>
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