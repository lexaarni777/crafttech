import React from 'react';

const Toolbar: React.FC<{ 
    onShapeSelect: (shape: string) => void; 
    activeMode: 'add' | 'move' | 'delete' | null; 
    onModeChange: (mode: 'add' | 'move' | 'delete') => void; 
    onDeleteShape: () => void; 
}> = ({ onShapeSelect, activeMode, onModeChange, onDeleteShape }) => {
    const [selectedShape, setSelectedShape] = React.useState('');

    const handleShapeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const shape = e.target.value;
        setSelectedShape(shape);
        onShapeSelect(shape); // Передаем выбранную фигуру
    };

    return (
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'white', padding: '10px', zIndex: 1000, borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
            <select value={selectedShape} onChange={handleShapeChange} style={{ marginRight: '10px', padding: '5px' }}>
                <option value="">Выберите фигуру</option>
                <option value="circle">Круг</option>
                <option value="rectangle">Прямоугольник</option>
                <option value="triangle">треугольник</option>
            </select>
            <button 
                onClick={() => onModeChange('add')} 
                style={{ 
                    backgroundColor: activeMode === 'add' ? '#007BFF' : '#FFFFFF', 
                    color: activeMode === 'add' ? '#FFFFFF' : '#000000', 
                    border: '1px solid #007BFF', 
                    borderRadius: '5px', 
                    padding: '5px 10px', 
                    cursor: 'pointer', 
                    transition: 'background-color 0.3s, color 0.3s',
                    marginLeft: '5px'
                }}
            >
                Добавить фигуру
            </button>
            <button 
                onClick={() => onModeChange('move')} 
                style={{ 
                    backgroundColor: activeMode === 'move' ? '#007BFF' : '#FFFFFF', 
                    color: activeMode === 'move' ? '#FFFFFF' : '#000000', 
                    border: '1px solid #007BFF', 
                    borderRadius: '5px', 
                    padding: '5px 10px', 
                    cursor: 'pointer', 
                    transition: 'background-color 0.3s, color 0.3s',
                    marginLeft: '5px'
                }}
            >
                Переместить фигуру
            </button>
            <button 
                onClick={() => onModeChange('delete')} 
                style={{ 
                    backgroundColor: activeMode === 'delete' ? '#FF4136' : '#FFFFFF', 
                    color: activeMode === 'delete' ? '#FFFFFF' : '#000000', 
                    border: '1px solid #FF4136', 
                    borderRadius: '5px', 
                    padding: '5px 10px', 
                    cursor: 'pointer', 
                    transition: 'background-color 0.3s, color 0.3s',
                    marginLeft: '5px'
                }}
            >
                Удалить фигуру
            </button>
        </div>
    );
};

export default Toolbar;