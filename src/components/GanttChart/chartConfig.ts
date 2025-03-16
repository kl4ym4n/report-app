import { Task } from './GanttChart';
import { ApexOptions } from 'apexcharts';

export const getChartConfig = (tasks: Task[], handleTaskClick: (dataPointIndex: number) => void): ApexOptions => ({
    chart: {
        id: "gantt-chart",
        events: {
            click: function(event, chartContext, opts) {
                handleTaskClick(opts.dataPointIndex);
            }
        },
    },
    xaxis: {
        type: "datetime",
    },
    legend: {
        show: false
    },
    tooltip: {
        custom: ({
            dataPointIndex,
        }: any) => {
            const task = tasks[dataPointIndex];
            return `<div style="padding: 8px; background: white; border: 1px solid #ddd;">
                <strong>${task.name}</strong><br>
                Прогресс: ${task.progress}%
            </div>`;
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: '30%',
            rangeBarGroupRows: true,
            dataLabels: {
                hideOverflowingLabels: false,
            },
        },
    },
    grid: {
        row: {
            colors: ["#f3f4f5", "#fff"],
            opacity: 1,
        },
    },
    series: [
        {
            name: "Task",
            data: tasks.map((task) => ({
                id: task.id,
                x: task.name,
                y: [task.startDate.getTime(), task.endDate.getTime()],
                fillColor: task.color,
            })),
        },
        {
            name: "Progress",
            data: tasks.map((task) => ({
                id: task.id,
                x: task.name,
                y: [
                    task.startDate.getTime(),
                    task.startDate.getTime() +
                    ((task.endDate.getTime() - task.startDate.getTime()) * task.progress) / 100,
                ],
                fillColor: "rgba(0, 0, 0, 0.5)",
            })),
        },
    ],
}); 