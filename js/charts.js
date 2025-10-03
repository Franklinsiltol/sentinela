// Gerenciador de gráficos - Para organizar funções de visualização

class ChartsManager {
    constructor() {
        this.colors = {
            positive: ['#2E7D32', '#4CAF50', '#81C784'],
            negative: ['#C62828', '#F44336', '#E57373'],
            neutral: ['#FFC107', '#FFD54F', '#FFECB3'],
            agents: ['#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50']
        };
    }

    // Inicializar gráficos vazios
    initializeEmptyCharts() {
        const emptyData = [{
            x: [],
            y: [],
            type: 'bar'
        }];
        
        const emptyLayout = {
            title: '',
            height: 300,
            xaxis: { title: '' },
            yaxis: { title: '' }
        };
        
        const chartIds = [
            'sentimentChart', 'agentsChart', 'contentChart', 
            'temporalChart', 'trendsChart', 'correlationChart',
            'wordFrequencyChart'
        ];
        
        chartIds.forEach(id => {
            if (document.getElementById(id)) {
                Plotly.newPlot(id, emptyData, emptyLayout, { displayModeBar: false });
            }
        });
    }

    // Atualizar todos os gráficos
    updateAllCharts(data, metrics) {
        this.updateSentimentChart(data);
        this.updateAgentsChart(data);
        this.updateContentChart(metrics);
        this.updateTemporalChart(data);
    }

    // Gráfico de tendências temporal
    updateTrendsChart(data) {
        if (!data || data.length === 0) return;

        // Agrupar por data e calcular métricas
        const dailyMetrics = this.calculateDailyMetrics(data);
        
        const trace1 = {
            x: dailyMetrics.dates,
            y: dailyMetrics.positivePercentage,
            type: 'scatter',
            mode: 'lines+markers',
            name: '% Positivo',
            line: { color: this.colors.positive[0], width: 3 }
        };
        
        const trace2 = {
            x: dailyMetrics.dates,
            y: dailyMetrics.problems,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Problemas',
            line: { color: this.colors.negative[0], width: 3 },
            yaxis: 'y2'
        };

        const dataPlot = [trace1, trace2];
        
        const layout = {
            height: 400,
            margin: { t: 0, b: 50, l: 50, r: 50 },
            legend: { orientation: 'h', y: -0.2 },
            yaxis: {
                title: 'Positividade (%)',
                range: [0, 100]
            },
            yaxis2: {
                title: 'Problemas',
                overlaying: 'y',
                side: 'right'
            }
        };

        Plotly.newPlot('trendsChart', dataPlot, layout, { displayModeBar: false });
    }

    // Calcular métricas diárias
    calculateDailyMetrics(data) {
        const dailyData = {};
        
        data.forEach(item => {
            const date = item.Data;
            if (!dailyData[date]) {
                dailyData[date] = {
                    total: 0,
                    positive: 0,
                    problems: 0
                };
            }
            
            dailyData[date].total++;
            if (item.Sentimento === 'Positivo' || item.Sentimento === 'Muito Positivo') {
                dailyData[date].positive++;
            }
            if (item.Problemas) {
                dailyData[date].problems++;
            }
        });

        const dates = Object.keys(dailyData).sort();
        const positivePercentage = dates.map(date => 
            (dailyData[date].positive / dailyData[date].total) * 100
        );
        const problems = dates.map(date => dailyData[date].problems);

        return {
            dates: dates,
            positivePercentage: positivePercentage,
            problems: problems
        };
    }

    // Gráfico de correlação
    updateCorrelationChart(metrics) {
        const data = [{
            z: [[1, 0.7, 0.3, -0.5, 0.2],
                [0.7, 1, 0.5, -0.3, 0.6],
                [0.3, 0.5, 1, -0.1, 0.4],
                [-0.5, -0.3, -0.1, 1, -0.2],
                [0.2, 0.6, 0.4, -0.2, 1]],
            x: ['Satisfação', 'Problemas', 'Soluções', 'Tempo Resposta', 'Resolução'],
            y: ['Satisfação', 'Problemas', 'Soluções', 'Tempo Resposta', 'Resolução'],
            type: 'heatmap',
            colorscale: 'RdBu',
            reversescale: true,
            showscale: true
        }];
        
        const layout = {
            height: 400,
            margin: { t: 0, b: 50, l: 50, r: 0 }
        };
        
        Plotly.newPlot('correlationChart', data, layout, { displayModeBar: false });
    }

    // Gráfico de frequência de palavras
    updateWordFrequencyChart(texts, stopWords = []) {
        if (!texts || texts.length === 0) return;

        // Extrair e contar palavras
        const wordFreq = this.extractWordFrequency(texts, stopWords);
        const topWords = wordFreq.slice(0, 10);

        const data = [{
            x: topWords.map(w => w.word),
            y: topWords.map(w => w.frequency),
            type: 'bar',
            marker: {
                color: this.colors.agents[0]
            }
        }];
        
        const layout = {
            height: 300,
            margin: { t: 0, b: 50, l: 50, r: 0 }
        };
        
        Plotly.newPlot('wordFrequencyChart', data, layout, { displayModeBar: false });
    }

    // Extrair frequência de palavras
    extractWordFrequency(texts, stopWords = []) {
        const allText = texts.map(t => t.Texto || t).join(' ').toLowerCase();
        const words = allText
            .replace(/[^\w\sàáâãèéêìíîòóôõùúûç]/g, '')
            .split(/\s+/)
            .filter(word => 
                word.length > 2 && 
                !stopWords.includes(word) &&
                !this.isCommonWord(word)
            );

        const wordCount = {};
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });

        return Object.entries(wordCount)
            .map(([word, frequency]) => ({ word, frequency }))
            .sort((a, b) => b.frequency - a.frequency);
    }

    // Verificar se é palavra comum
    isCommonWord(word) {
        const commonWords = [
            'para', 'com', 'por', 'que', 'não', 'sim', 'como',
            'mais', 'mas', 'essa', 'esse', 'isso', 'aquele'
        ];
        return commonWords.includes(word);
    }
}

// Exportar para uso global
window.ChartsManager = ChartsManager;
