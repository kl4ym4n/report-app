import React, { useState } from 'react';
import Modal from "react-modal";
import styled from "styled-components";
import { ProgressUpdate } from '../components/GanttChart/GanttChart';

interface ProgressUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (update: ProgressUpdate) => void;
    currentProgress: number;
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

const ProgressUpdateModal: React.FC<ProgressUpdateModalProps> = ({ 
    isOpen, 
    onClose, 
    onSave,
    currentProgress 
}) => {
    const [update, setUpdate] = useState<ProgressUpdate>({
        id: Date.now().toString(),
        date: new Date(),
        description: '',
        progress: currentProgress
    });

    const handleSave = () => {
        onSave(update);
        onClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            style={{ 
                content: { 
                    background: "white", 
                    border: "none", 
                    display: "flex", 
                    justifyContent: "center" 
                } 
            }}
        >
            <ModalContent>
                <h2>Обновление прогресса</h2>
                
                <Label>Прогресс (%):</Label>
                <Input 
                    type="number" 
                    value={update.progress}
                    min="0"
                    max="100"
                    onChange={(e) => setUpdate(prev => ({
                        ...prev,
                        progress: Number(e.target.value)
                    }))}
                />

                <Label>Описание изменений:</Label>
                <TextArea 
                    value={update.description}
                    onChange={(e) => setUpdate(prev => ({
                        ...prev,
                        description: e.target.value
                    }))}
                />

                <Button primary onClick={handleSave}>Сохранить</Button>
                <Button onClick={onClose}>Отмена</Button>
            </ModalContent>
        </Modal>
    );
};

export default ProgressUpdateModal; 