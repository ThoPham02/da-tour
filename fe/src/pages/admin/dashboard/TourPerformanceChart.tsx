import React, { useEffect, useRef } from 'react';

// Mock data for the chart
const tourData = [
  { month: 'Jan', bookings: 65 },
  { month: 'Feb', bookings: 59 },
  { month: 'Mar', bookings: 80 },
  { month: 'Apr', bookings: 81 },
  { month: 'May', bookings: 56 },
  { month: 'Jun', bookings: 55 },
  { month: 'Jul', bookings: 40 },
  { month: 'Aug', bookings: 70 },
  { month: 'Sep', bookings: 90 },
  { month: 'Oct', bookings: 110 },
  { month: 'Nov', bookings: 120 },
  { month: 'Dec', bookings: 130 },
];

const TourPerformanceChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate dimensions
    const padding = 40;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - (padding * 2);
    const maxBookings = Math.max(...tourData.map(d => d.bookings));
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw bars
    const barWidth = chartWidth / tourData.length * 0.6;
    const barSpacing = chartWidth / tourData.length * 0.4;
    
    tourData.forEach((data, index) => {
      const x = padding + (index * (barWidth + barSpacing)) + barSpacing/2;
      const barHeight = (data.bookings / maxBookings) * chartHeight;
      const y = canvas.height - padding - barHeight;
      
      // Draw bar
      ctx.beginPath();
      ctx.fillStyle = '#dc2626';
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
      ctx.fill();
      
      // Draw month label
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(data.month, x + barWidth/2, canvas.height - padding + 15);
    });
    
    // Draw y-axis labels
    for (let i = 0; i <= 4; i++) {
      const value = Math.round(maxBookings * (i/4));
      const y = canvas.height - padding - (chartHeight * (i/4));
      
      ctx.fillStyle = '#9ca3af';
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(value.toString(), padding - 10, y + 4);
      
      // Draw horizontal grid line
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.strokeStyle = '#f3f4f6';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, []);
  
  return (
    <div className="w-full h-64">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={300} 
        className="w-full h-full"
      ></canvas>
    </div>
  );
};

export default TourPerformanceChart;