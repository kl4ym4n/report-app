import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import {Task, ProgressUpdate} from "../components/GanttChart/GanttChart";


interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Task) => void;
    task?: Task;
    isEditMode?: boolean;
}

const ModalContent = styled.div`
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: white;
`;

const Label = styled.label`
    font-weight: bold;
    margin-top: 10px;
`;

const Input = styled.input`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ColorInput = styled.input<{ color: string }>`
    padding: 6px;
    //border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    height: 40px;
    cursor: pointer;
    background-color: ${(props) => props.color}; 
`;

const TextArea = styled.textarea`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-height: 80px;
`;

const Button = styled.button<{ primary?: boolean }>`
    padding: 10px 12px;
    cursor: pointer;
    border: none;
    font-size: 16px;
    border-radius: 5px;
    background: ${(props) => (props.primary ? "#008FFB" : "#FF4560")};
    color: white;
    margin-top: 10px;
    &:hover {
        opacity: 0.85;
    }
`;

Modal.setAppElement("#root");

const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
};

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, task, isEditMode }) => {
    const [newTask, setNewTask] = React.useState<Task>({
        id: "",
        name: "",
        startDate: new Date(),
        endDate: new Date(),
        progress: 0,
        color: "#008FFB",
        description: "",
        progressHistory: [],
    });

    const [progressHistory, setProgressHistory] = useState<ProgressUpdate[]>(
        task?.progressHistory || []
    );

    React.useEffect(() => {
        if (task && isEditMode) {
            setNewTask(task);
        } else {
            setNewTask({
                id: Date.now().toString(),
                name: "",
                startDate: new Date(),
                endDate: new Date(),
                progress: 0,
                color: "#008FFB",
                description: "",
                progressHistory: [],
            });
        }
    }, [task, isEditMode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave({
            ...newTask,
            progressHistory
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={{ content: { background: "white", border: "none", display: "flex", justifyContent: "center" } }}>
            <ModalContent>
                <h2>{isEditMode ? 'Редактировать задачу' : 'Добавить задачу'}</h2>
                <Label>Название:</Label>
                <Input type="text" name="name" value={newTask.name} onChange={handleInputChange} />

                <Label>Дата начала:</Label>
                <Input 
                    type="date" 
                    name="startDate" 
                    value={formatDateForInput(newTask.startDate)}
                    onChange={(e) => setNewTask((prev) => ({ 
                        ...prev, 
                        startDate: new Date(e.target.value) 
                    }))}
                />

                <Label>Дата завершения:</Label>
                <Input 
                    type="date" 
                    name="endDate" 
                    value={formatDateForInput(newTask.endDate)}
                    onChange={(e) => setNewTask((prev) => ({ 
                        ...prev, 
                        endDate: new Date(e.target.value) 
                    }))}
                />

                <Label>Цвет:</Label>
                <ColorInput
                    type="color"
                    name="color"
                    value={newTask.color}
                    color={newTask.color}
                    onChange={handleInputChange}
                />

                <Label>Описание:</Label>
                <TextArea name="description" value={newTask.description} onChange={handleInputChange} />

                <Label>Прогресс (%):</Label>
                <Input type="number" name="progress" value={newTask.progress} min="0" max="100" onChange={handleInputChange} />

                <Button primary onClick={handleSave}>{isEditMode ? 'Сохранить' : 'Создать'}</Button>
                <Button onClick={onClose}>Отмена</Button>
            </ModalContent>
        </Modal>
    );
};

export default TaskModal;
