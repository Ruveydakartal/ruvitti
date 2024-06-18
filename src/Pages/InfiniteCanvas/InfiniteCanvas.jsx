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
    const [zoom] = useState(2);
    
    useEffect(() => {
        const fetchVectorData = async () => {
            const { data, error } = await supabase.from('drawings').select('vectors');
            if (error) {
                console.error('Error fetching vector data:', error);
            } else {
                const newDrawings = data.map(d => d.vectors);
                const newPositions = generateGridPositions(newDrawings.length);
                setDrawings(newDrawings);
                setPositions(newPositions);
            }
        };
        fetchVectorData();
    
        const channel = supabase.channel('custom-all-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'drawings' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    const newDrawing = payload.new.vectors;
                    setDrawings(prevDrawings => {
                        const updatedDrawings = [...prevDrawings, newDrawing];
                        const newPositions = generateGridPositions(updatedDrawings.length);
                        setPositions(newPositions);
                        return updatedDrawings;
                    });
                }
            })
            .subscribe();
    
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);
    
    const generateGridPositions = (count) => {
        const positions = [];
        for (let i = 0; i < count; i++) {
            const position = generateGridPosition(i);
            positions.push(position);
        }
        return positions;
    };
    
    const generateGridPosition = (index) => {
        const drawingsPerRow = 4;
        const padding = 10;
        const drawingWidth = 200; // assumed width of each drawing
        const drawingHeight = 200; // assumed height of each drawing
    
        const x = (index % drawingsPerRow) * (drawingWidth + padding) + padding;
        const y = Math.floor(index / drawingsPerRow) * (drawingHeight + padding) + padding;
    
        return { x, y };
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
    
        const maxX = Math.max(...positions.map(p => p.x)) + 300; // added drawing width for canvas size
        const maxY = Math.max(...positions.map(p => p.y)) + 200; // added drawing height for canvas size
    
        canvas.width = maxX > canvas.clientWidth ? maxX : canvas.clientWidth;
        canvas.height = maxY > canvas.clientHeight ? maxY : canvas.clientHeight;
    
        ctx.scale(canvas.width / 1000, canvas.height / 1000);
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        drawings.forEach((drawing, index) => {
            const pos = positions[index];
            drawing.forEach(vector => {
                ctx.save();
                ctx.translate(pos.x, pos.y);
                ctx.scale(1 / zoom, 1 / zoom);
                ctx.beginPath();
                ctx.moveTo(vector.x1, vector.y1);
                ctx.lineTo(vector.x2, vector.y2);
                ctx.lineWidth = vector.weight;
                ctx.strokeStyle = vector.isErasing ? 'rgba(255, 255, 255, 1)' : vector.color;
                ctx.stroke();
                ctx.restore();
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
                <canvas className={style.canvas} ref={canvasRef}></canvas>
            </div>
        </div>
    );
    };
    
    export default InfiniteCanvas;