import React from 'react';
import { Stage, Layer, Circle, Rect, Line } from 'react-konva';

const isPointInTriangle = (point: { x: number; y: number }, triangle: number[]) => {
    const [x1, y1, x2, y2, x3, y3] = triangle;

    const area = (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2;
    const area1 = (point.x * (y2 - y3) + x2 * (y3 - point.y) + x3 * (point.y - y2)) / 2;
    const area2 = (x1 * (point.y - y3) + point.x * (y3 - y1) + x3 * (y1 - point.y)) / 2;
    const area3 = (x1 * (y2 - point.y) + x2 * (point.y - y1) + point.x * (y1 - y2)) / 2;

    return area === area1 + area2 + area3;
};

const Canvas: React.FC<{ 
    shape: string; 
    activeMode: 'add' | 'move' | 'delete' | null; 
    shapes: any[]; 
    setShapes: (shapes: any[]) => void; 
    setSelectedShapeIndex: (index: number | null) => void; 
}> = ({ shape, activeMode, shapes, setShapes, setSelectedShapeIndex }) => {
    const handleClick = (e: any) => {
        const stage = e.target.getStage();
        const pointerPosition = stage.getPointerPosition();

        if (activeMode === 'add') {
            if (shape === 'circle') {
                setShapes([...shapes, { shape: 'circle', x: pointerPosition.x, y: pointerPosition.y }]);
            } else if (shape === 'rectangle') {
                setShapes([...shapes, { shape: 'rectangle', x: pointerPosition.x - 30, y: pointerPosition.y - 30 }]);
            } else if (shape === 'triangle') {
                const trianglePoints = [
                    pointerPosition.x, pointerPosition.y - 30, // верхняя точка
                    pointerPosition.x - 30, pointerPosition.y + 30, // нижний левый угол
                    pointerPosition.x + 30, pointerPosition.y + 30  // нижний правый угол
                ];
                setShapes([...shapes, { shape: 'triangle', points: trianglePoints }]);
            }
        } else if (activeMode === 'move') {
            const clickedShapeIndex = shapes.findIndex(shape => {
                if (shape.shape === 'circle') {
                    return Math.abs(pointerPosition.x - shape.x) < 30 && Math.abs(pointerPosition.y - shape.y) < 30;
                } else if (shape.shape === 'rectangle') {
                    return (
                        pointerPosition.x > shape.x &&
                        pointerPosition.x < shape.x + 60 &&
                        pointerPosition.y > shape.y &&
                        pointerPosition.y < shape.y + 60
                    );
                } else if (shape.shape === 'triangle') {
                    return isPointInTriangle(pointerPosition, shape.points);
                }
                return false;
            });

            if (clickedShapeIndex !== -1) {
                setSelectedShapeIndex(clickedShapeIndex); // Устанавливаем индекс выбранной фигуры
            } else {
                setSelectedShapeIndex(null); // Сбрасываем выбранную фигуру
            }
        } else if (activeMode === 'delete') {
            const clickedShapeIndex = shapes.findIndex(shape => {
                if (shape.shape === 'circle') {
                    return Math.abs(pointerPosition.x - shape.x) < 30 && Math.abs(pointerPosition.y - shape.y) < 30;
                } else if (shape.shape === 'rectangle') {
                    return (
                        pointerPosition.x > shape.x &&
                        pointerPosition.x < shape.x + 60 &&
                        pointerPosition.y > shape.y &&
                        pointerPosition.y < shape.y + 60
                    );
                } else if (shape.shape === 'triangle') {
                    return isPointInTriangle(pointerPosition, shape.points);
                }
                return false;
            });

            if (clickedShapeIndex !== -1) {
                setShapes(shapes.filter((_, index) => index !== clickedShapeIndex)); // Удаляем фигуру
                setSelectedShapeIndex(null); // Сбрасываем выбранную фигуру
            }
        }
    };

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onClick={handleClick}
        >
            <Layer>
                {shapes.map((s, index) => {
                    const draggable = activeMode === 'move'; // Устанавливаем draggable в зависимости от режима
                    if (s.shape === 'circle') {
                        return <Circle key={index} x={s.x} y={s.y} radius={30} fill="red" draggable={draggable} />;
                    } else if (s.shape === 'rectangle') {
                        return <Rect key={index} x={s.x} y={s.y} width={60} height={60} fill="blue" draggable={draggable} />;
                    } else if (s.shape === 'triangle') {
                        return (
                            <Line key={index} points={s.points} fill="darkcyan" closed draggable={draggable} />
                        );
                    }
                    return null;
                })}
            </Layer>
        </Stage>
    );
};

export default Canvas;