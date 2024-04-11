<template>
    <h2><i>{{ name }}</i></h2>
    <div v-if="loading && !error">
        <p>Generating graph..</p>
    </div>
    <Scatter v-if="!loading && !error" :options="chartOptions" :data="chartData" />
    <p v-if="error"> {{ error }}</p>
</template>

<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
} from 'chart.js'
import { Scatter } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
)

export default {
    // THIS WILL NOT LOAD SINCE THERE ARE NO DEVICES IF THE FIRST GROUP HAS NO DATA.
    components: { Scatter },
    props: {
        name: String,
        devices: Array,
        data: Object,
        yAxis: String

    },
    mounted() {
        this.loading = true;
        if (this.data.length === 0 || this.data === null || this.data === undefined) {
            this.error = "No data found"
            return false;
        }
        for (let i = 0; i < this.data.length; i++) {
            let addDataset = {
                label: this.devices[i],
                data: this.data[i],
                parsing: {
                    xAxisKey: "date",
                    yAxisKey: this.yAxis
                }
            }
            this.chartData.datasets.push(addDataset)

        }
        this.loading = false;
    },
    data() {
        return {
            loading: true,
            error: "",
            chartData: {
                datasets: []
            },
            chartOptions: {
                plugins: {
                    colors: { enabled: true },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                let date = new Date(context[0].raw.date)
                                return date.toLocaleString()
                            },
                            label: function (context) {
                                let label = context.dataset.label
                                let value = context.parsed.y
                                return label + ": " + value;
                            }
                        }
                    }
                },
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        ticks: {
                            callback: function (value, index, ticks) {
                                let date = new Date(value)
                                return date.toLocaleString()
                            }
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    }
}
</script>