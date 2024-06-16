import { useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import style from './InfiniteCanvas.module.css';

const supabaseUrl = 'https://xvavazwclobrrqqynkmb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2YXZhendjbG9icnJxcXlua21iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODEyMDQwMCwiZXhwIjoyMDMzNjk2NDAwfQ.22w87ILwxbkzH7S7VU-oF8Ty5Zxm1C-xWdMg9E0U6Rg';
const supabase = createClient(supabaseUrl, supabaseKey);

const InfiniteCanvas = () => {
    const canvasRef = useRef(null);
    const [drawings, setDrawings] = useState([]);
    const [positions, setPositions] = useState([]);
    const [zoom] = useState(2); // Add zoom state

    useEffect(() => {
        const fetchVectorData = async () => {
            const { data, error } = await supabase.from('drawings').select('vectors');
            if (error) {
                console.error('Error fetching vector data:', error);
            } else {
                const newDrawings = data.map(d => d.vectors);
                const newPositions = generateRandomPositions(newDrawings.length, newDrawings);
                setDrawings(newDrawings);
                setPositions(newPositions);
            }
        };
        fetchVectorData();
    }, []);

    const generateRandomPositions = (count, drawings) => {
        const positions = [];
        const maxOffset = 100;  // Reduced from 2000 to bring drawings closer
        const padding = 10; // Reduced padding to bring drawings closer together

        for (let i = 0; i < count; i++) {
            const drawing = drawings[i];
            const minX = Math.min(...drawing.map(v => Math.min(v.x1, v.x2)));
            const minY = Math.min(...drawing.map(v => Math.min(v.y1, v.y2)));
            const maxX = Math.max(...drawing.map(v => Math.max(v.x1, v.x2)));
            const maxY = Math.max(...drawing.map(v => Math.max(v.y1, v.y2)));

            const drawingWidth = maxX - minX;
            const drawingHeight = maxY - minY;

            positions.push({
                x: Math.random() * (maxOffset + drawingWidth - padding*2) + padding, // Adjusted for centering
                y: Math.random() * (maxOffset + drawingHeight - padding*2) + padding, // Adjusted for centering
            });
        }
        return positions;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error('Canvas not found');
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Canvas context not found');
            return;
        }

        // Calculate the canvas size based on positions
        const maxX = Math.max(...positions.map(p => p.x));
        const maxY = Math.max(...positions.map(p => p.y));

        canvas.width = maxX > canvas.clientWidth? maxX : canvas.clientWidth;
        canvas.height = maxY > canvas.clientHeight? maxY : canvas.clientHeight;

        ctx.scale(canvas.width / 1000, canvas.height / 1000); // Scale the canvas to fit more drawings

        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas before drawing

        // Draw each drawing at its scaled position
        drawings.forEach((drawing, index) => {
            const pos = positions[index];
            drawing.forEach(vector => {
                ctx.save(); // Save the current state of the canvas context
                ctx.translate(pos.x, pos.y); // Move the origin to the drawing position
                ctx.scale(1 / zoom, 1 / zoom); // Apply inverse scaling
                ctx.beginPath();
                ctx.moveTo(vector.x1, vector.y1);
                ctx.lineTo(vector.x2, vector.y2);
                ctx.lineWidth = vector.weight;
                ctx.strokeStyle = vector.isErasing? 'rgba(255, 255, 255, 1)' : vector.color;
                ctx.stroke();
                ctx.restore(); // Restore the context to its saved state
            });
        });
    }, [drawings, positions, zoom]);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>YOUR WORK!</h1>
                <img src="./images/heart-cat.png" alt="" />
            </div>
            <div className={style.canvasContainer}>
                <canvas className={style.canvas}  ref={canvasRef}></canvas>
            </div>
        </div>
    );
};

export default InfiniteCanvas;