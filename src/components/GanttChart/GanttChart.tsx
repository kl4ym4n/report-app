import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import TaskModal from "../../modals/TaskModal";
import TaskInfo from "../../components/TaskInfo";
import styled from "styled-components";
import { Edit, BarChart2, Trash2 } from "lucide-react";
import { getChartConfig } from './chartConfig';
import ProgressUpdateModal from "../../modals/ProgressUpdateModal";
import { api } from '../../services/api';

export interface ProgressUpdate {
    id: string;
    date: Date;
    description: string;
    progress: number;
}

export interface Task {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
    color: string;
    description: string;
    progressHistory: ProgressUpdate[];
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`;

const ChartWrapper = styled.div`
    flex: 1;
`;

const Sidebar = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-right: 2em;
`;

const AddButton = styled.button`
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background: #008FFB;
    color: white;
    width: 50%;
    border-radius: 5px;
    &:hover {
        opacity: 0.85;
    }
`;

const TaskActionButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

const ActionButton = styled.button`
    padding: 8px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background: #e0e0e0;
    }
`;

const GanttChart: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [progressModalOpen, setProgressModalOpen] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const tasks = await api.getTasks();
            setTasks(tasks);
        } catch (error) {
            setError('Failed to load tasks');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTask = async (taskData: Task) => {
        try {
            if (isEditMode && selectedTask) {
                const updatedTask = await api.updateTask(taskData);
                setTasks(tasks.map(task => 
                    task.id === selectedTask.id ? updatedTask : task
                ));
            } else {
                const newTask = await api.createTask(taskData);
                setTasks([...tasks, newTask]);
            }
            handleCloseModal();
        } catch (error) {
            setError('Failed to save task');
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setIsEditMode(false);
        setSelectedTask(null);
    };

    const handleTaskClick = (dataPointIndex: number) => {
        const task = tasks[dataPointIndex];
        setSelectedTask(task || null);
    };

    const handleEditTask = () => {
        if (selectedTask) {
            setIsEditMode(true);
            setModalIsOpen(true);
        }
    };

    const handleUpdateProgress = async (update: ProgressUpdate) => {
        if (selectedTask) {
            const newUpdate: ProgressUpdate = {
                ...update,
                id: Date.now().toString(),
                date: new Date()
            };

            const updatedTask = {
                ...selectedTask,
                progress: update.progress,
                progressHistory: [...(selectedTask.progressHistory || []), newUpdate]
            };
            
            try {
                const savedTask = await api.updateTask(updatedTask);
                setTasks(tasks.map(task => 
                    task.id === selectedTask.id ? savedTask : task
                ));
                setSelectedTask(savedTask);
            } catch (error) {
                setError('Failed to update progress');
                console.error(error);
            }
        }
    };

    const handleDeleteTask = async () => {
        if (selectedTask) {
            try {
                await api.deleteTask(selectedTask.id);
                setTasks(tasks.filter(task => task.id !== selectedTask.id));
                setSelectedTask(null);
            } catch (error) {
                setError('Failed to delete task');
                console.error(error);
            }
        }
    };

    const handleUpdateHistory = (taskId: string, newHistory: ProgressUpdate[]) => {
        setTasks(tasks.map(task =>
            task.id === taskId
                ? { ...task, progressHistory: newHistory }
                : task
        ));
        
        if (selectedTask?.id === taskId) {
            setSelectedTask(prev => 
                prev ? { ...prev, progressHistory: newHistory } : null
            );
        }
    };

    const chartData = getChartConfig(tasks, handleTaskClick);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            <ChartWrapper>
                <div id="chart">
                    <Chart options={chartData} series={chartData.series} type="rangeBar" width={1024} height={680} />
                </div>
            </ChartWrapper>

            <Sidebar>
                <AddButton onClick={() => setModalIsOpen(true)}>Добавить задачу</AddButton>
                {selectedTask && (
                    <TaskActionButtons>
                        <ActionButton onClick={handleEditTask} title="Редактировать">
                            <Edit size={16} />
                        </ActionButton>
                        <ActionButton onClick={() => setProgressModalOpen(true)} title="Обновить прогресс">
                            <BarChart2 size={16} />
                        </ActionButton>
                        <ActionButton onClick={handleDeleteTask} title="Удалить">
                            <Trash2 size={16} />
                        </ActionButton>
                    </TaskActionButtons>
                )}
                <TaskInfo 
                    task={selectedTask} 
                    onUpdateHistory={handleUpdateHistory}
                />
                <TaskModal 
                    isOpen={modalIsOpen} 
                    onClose={handleCloseModal} 
                    onSave={handleSaveTask}
                    task={isEditMode && selectedTask ? selectedTask : undefined}
                    isEditMode={isEditMode}
                />
            </Sidebar>
            <ProgressUpdateModal 
                isOpen={progressModalOpen}
                onClose={() => setProgressModalOpen(false)}
                onSave={handleUpdateProgress}
                currentProgress={selectedTask?.progress || 0}
            />
        </Container>
    );
};

export default GanttChart;
