import React, { useState } from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';

const App: React.FC = () => {
    const [shape, setShape] = useState<string>(''); // Инициализация состояния shape
    const [activeMode, setActiveMode] = useState<'add' | 'move' | 'delete' | null>(null); // Активный режим
    const [shapes, setShapes] = useState<any[]>([]); // Хранение добавленных фигур
    const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(null); // Индекс выбранной фигуры

    const handleShapeSelect = (selectedShape: string) => {
        setShape(selectedShape);
        setActiveMode('add'); // Устанавливаем режим добавления
        setSelectedShapeIndex(null); // Сбрасываем выбранную фигуру
        console.log("Selected shape:", selectedShape); // Проверка выбранной фигуры
    };

    const handleModeChange = (mode: 'add' | 'move' | 'delete') => {
        setActiveMode(mode);
        setShape(''); // Отключаем выбранную фигуру
        setSelectedShapeIndex(null); // Сбрасываем выбранную фигуру
        console.log("Active mode changed to:", mode); // Проверка
    };

    const handleDeleteShape = () => {
        if (selectedShapeIndex !== null) {
            setShapes(shapes.filter((_, index) => index !== selectedShapeIndex));
            setSelectedShapeIndex(null); // Сбрасываем выбранную фигуру
        }
    };

    return (
        <div>
            <Toolbar 
                onShapeSelect={handleShapeSelect} 
                activeMode={activeMode} 
                onModeChange={handleModeChange} 
                onDeleteShape={handleDeleteShape} 
            />
            <Canvas 
                shape={shape} 
                activeMode={activeMode} 
                shapes={shapes} 
                setShapes={setShapes} 
                setSelectedShapeIndex={setSelectedShapeIndex} 
            />
        </div>
    );
};

export default App;