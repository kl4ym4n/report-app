import React from 'react';
import styled from 'styled-components';
import { ProgressUpdate } from './GanttChart/GanttChart';
import { Edit, Trash2 } from 'lucide-react';

const HistoryContainer = styled.div`
    margin-top: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
`;

const HistoryTitle = styled.h3`
    margin: 0 0 16px 0;
    color: #333;
    font-size: 18px;
`;

const HistoryList = styled.div`
    max-height: 300px;
    overflow-y: auto;
    padding-right: 8px;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
`;

const HistoryItem = styled.div`
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    
    &:last-child {
        border-bottom: none;
    }
`;

const HistoryDate = styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
`;

const HistoryProgress = styled.div`
    font-weight: 500;
    margin-bottom: 8px;
`;

const HistoryDescription = styled.div`
    font-size: 14px;
    color: #333;
    white-space: pre-wrap;
    text-align: left;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 8px 0;
    font-size: 14px;
    resize: vertical;
    min-height: 60px;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 15px;
`;

const ActionButton = styled.button`
    padding: 6px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    gap: 4px;
    
    &:hover {
        background: #e0e0e0;
    }
`;

const Label = styled.label`
    font-weight: 500;
    margin-right: 8px;
`;

const Input = styled.input`
    width: 60px;
    padding: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

interface TaskHistoryProps {
    history: ProgressUpdate[];
    onEdit?: (id: string, newDescription: string, newProgress: number) => void;
    onDelete?: (id: string) => void;
    isEditable?: boolean;
}

const TaskHistory: React.FC<TaskHistoryProps> = ({ 
    history, 
    onEdit, 
    onDelete,
    isEditable = false 
}) => {
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [editText, setEditText] = React.useState('');
    const [editProgress, setEditProgress] = React.useState(0);

    const handleEditClick = (update: ProgressUpdate) => {
        setEditingId(update.id);
        setEditText(update.description);
        setEditProgress(update.progress);
    };

    const handleSaveEdit = (id: string) => {
        if (onEdit) {
            onEdit(id, editText, editProgress);
        }
        setEditingId(null);
    };

    return (
        <HistoryContainer>
            <HistoryTitle>История изменений</HistoryTitle>
            <hr/>
            <HistoryList>
                {history.map((update) => (
                    <HistoryItem key={update.id}>
                        <HistoryDate>
                            {update.date.toLocaleString()}
                        </HistoryDate>
                        {editingId === update.id ? (
                            <>
                                <HistoryProgress>
                                    <Label>Прогресс:</Label>
                                    <Input
                                        type="number"
                                        value={editProgress}
                                        min="0"
                                        max="100"
                                        onChange={(e) => setEditProgress(Number(e.target.value))}
                                    />
                                </HistoryProgress>
                                <TextArea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <ActionButtons>
                                    <ActionButton onClick={() => handleSaveEdit(update.id)}>
                                        Сохранить
                                    </ActionButton>
                                    <ActionButton onClick={() => setEditingId(null)}>
                                        Отмена
                                    </ActionButton>
                                </ActionButtons>
                            </>
                        ) : (
                            <>
                                <HistoryProgress>
                                    Прогресс: {update.progress}%
                                </HistoryProgress>
                                <HistoryDescription>
                                    {update.description}
                                </HistoryDescription>
                                {isEditable && (
                                    <ActionButtons>
                                        <ActionButton 
                                            onClick={() => handleEditClick(update)}
                                            title="Редактировать"
                                        >
                                            <Edit size={14} />
                                        </ActionButton>
                                        <ActionButton 
                                            onClick={() => onDelete?.(update.id)}
                                            title="Удалить"
                                        >
                                            <Trash2 size={14} />
                                        </ActionButton>
                                    </ActionButtons>
                                )}
                            </>
                        )}
                    </HistoryItem>
                ))}
            </HistoryList>
        </HistoryContainer>
    );
};

export default TaskHistory; 