import React from 'react';
import styled from 'styled-components';
import { Task, ProgressUpdate } from './GanttChart/GanttChart';
import TaskHistory from './TaskHistory';

const InfoContainer = styled.div`
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
`;

const TaskDetails = styled.div`
    margin-bottom: 20px;
`;

const TaskTitle = styled.h2`
    margin: 0 0 16px 0;
    color: #333;
`;

const TaskDetail = styled.div`
    margin-bottom: 8px;
    
    span {
        font-weight: 500;
        margin-right: 8px;
    }
`;

interface TaskInfoProps {
    task: Task | null;
    onUpdateHistory?: (taskId: string, history: ProgressUpdate[]) => void;
}

const TaskInfo: React.FC<TaskInfoProps> = ({ task, onUpdateHistory }) => {
    if (!task) return null;

    const handleEditHistory = (updateId: string, newDescription: string, newProgress: number) => {
        if (!onUpdateHistory) return;
        
        const newHistory = task.progressHistory.map(update =>
            update.id === updateId 
                ? { ...update, description: newDescription, progress: newProgress }
                : update
        );
        
        onUpdateHistory(task.id, newHistory);
    };

    const handleDeleteHistory = (updateId: string) => {
        if (!onUpdateHistory) return;
        
        const newHistory = task.progressHistory.filter(
            update => update.id !== updateId
        );
        
        onUpdateHistory(task.id, newHistory);
    };

    return (
        <InfoContainer>
            <TaskDetails>
                <TaskTitle>{task.name}</TaskTitle>
                <TaskDetail>
                    <span>Прогресс:</span> {task.progress}%
                </TaskDetail>
                <TaskDetail>
                    <span>Начало:</span> 
                    {task.startDate.toLocaleDateString()}
                </TaskDetail>
                <TaskDetail>
                    <span>Окончание:</span> 
                    {task.endDate.toLocaleDateString()}
                </TaskDetail>
                <TaskDetail>
                    <span>Описание:</span> 
                    {task.description}
                </TaskDetail>
            </TaskDetails>

            <TaskHistory
                history={task.progressHistory}
                onEdit={handleEditHistory}
                onDelete={handleDeleteHistory}
                isEditable={true}
            />
        </InfoContainer>
    );
};

export default TaskInfo;
