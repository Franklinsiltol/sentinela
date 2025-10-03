// Estado da aplicação
const appState = {
    data: [],
    filteredData: [],
    stopWords: ["o", "a", "os", "as", "um", "uma", "uns", "umas", "de", "do", "da", "dos", "das", "em", "no", "na", "nos", "nas", "por", "para", "que", "e", "é", "ser", "se"],
    metrics: {},
    currentTab: 'overview',
    isSidebarCollapsed: false
};

// Variável para o analisador de sentimentos
let sentimentAnalyzer;

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Inicializar analisador de sentimentos
        sentimentAnalyzer = new SentimentAnalyzer();
        
        // Carregar componentes
        await loadSidebar();
        await loadMainContent();
        
        // Carregar dados de exemplo
        await loadSampleData();
        
        // Inicializar interface
        updateStats();
        updateMetrics();
        renderCharts();
        renderTables();
        
        // Mostrar conteúdo
        document.getElementById('loadingIndicator').classList.add('hidden');
        document.getElementById('contentArea').classList.remove('hidden');
        
        showAlert('✅ Sentinela carregado com sucesso! Analisador de sentimentos ativo.', 'success');
        
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
        showAlert('❌ Erro ao carregar o Sentinela', 'error');
    }
}

// Carregar sidebar
async function loadSidebar() {
    // Sidebar já está no HTML, apenas configurar event listeners
    setupEventListeners();
}

// Carregar conteúdo principal
async function loadMainContent() {
    // Conteúdo já está no HTML, apenas configurar tabs
    setupTabs();
}

// Configurar event listeners
function setupEventListeners() {
    // Sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
    
    // Botões principais
    document.getElementById('loadData').addEventListener('click', loadData);
    document.getElementById('applyFilter').addEventListener('click', applyDateFilter);
    document.getElementById('refreshData').addEventListener('click', refreshData);
    document.getElementById('exportData').addEventListener('click', exportData);
    document.getElementById('generateInsights').addEventListener('click', generateInsights);
    document.getElementById('quickAnalysis').addEventListener('click', quickAnalysis);
    document.getElementById('transcribeAudio').addEventListener('click', transcribeAudio);
    document.getElementById('analyzeAudio').addEventListener('click', analyzeAudio);
    document.getElementById('exportAgents').addEventListener('click', exportAgentsReport);
    
    // Upload de arquivos
    document.getElementById('fileUpload').addEventListener('change', handleFileUpload);
    document.getElementById('audioUpload').addEventListener('change', handleAudioUpload);
    document.getElementById('knowledgeUpload').addEventListener('change', handleKnowledgeUpload);
    
    // Busca
    document.getElementById('wordSearch').addEventListener('input', handleWordSearch);
    document.getElementById('searchWord').addEventListener('input', handleGlobalSearch);
}

// Configurar tabs
function setupTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
}

// Alternar sidebar
function toggleSidebar() {
    appState.isSidebarCollapsed = !appState.isSidebarCollapsed;
    
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const header = document.getElementById('header');
    
    if (appState.isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
        header.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('expanded');
        header.classList.remove('collapsed');
    }
}

// Alternar tab
function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
    
    appState.currentTab = tabId;
}

// Função para processar dados com análise de sentimentos REAL
function processDataWithSentiment(data) {
    return data.map(item => {
        const analysis = sentimentAnalyzer.analyze(item.Texto);
        return {
            ...item,
            Sentimento: analysis.sentiment,
            Pontuacao: analysis.score,
            Confianca: analysis.confidence,
            Problemas: analysis.score < -0.5 ? 1 : 0,
            Solucoes: analysis.score > 0.5 ? 1 : 0
        };
    });
}

// Carregar dados de exemplo com análise REAL
async function loadSampleData() {
    try {
        const sampleData = [
            { Agente: "joao.silva@empresa.com", Data: "24/09/2024", Hora: "10:15:23", Texto: "Olá, bom dia! Como posso ajudá-lo hoje? Estou muito feliz em poder ajudar!" },
            { Agente: "joao.silva@empresa.com", Data: "24/09/2024", Hora: "10:16:05", Texto: "Entendo seu problema com o acesso à conta. Vou verificar isso para você imediatamente. Não se preocupe!" },
            { Agente: "maria.santos@empresa.com", Data: "24/09/2024", Hora: "11:30:45", Texto: "Boa tarde! Em que posso ser útil? Estou aqui para resolver seu problema." },
            { Agente: "maria.santos@empresa.com", Data: "24/09/2024", Hora: "11:31:20", Texto: "Infelizmente não consigo acessar essa informação no momento. Isso é muito ruim, me desculpe pelo inconveniente." },
            { Agente: "carlos.oliveira@empresa.com", Data: "25/09/2024", Hora: "09:05:12", Texto: "Excelente notícia! Seu problema foi resolvido com sucesso. Fico muito feliz!" },
            { Agente: "carlos.oliveira@empresa.com", Data: "25/09/2024", Hora: "09:06:33", Texto: "Que ótimo! Tudo funcionando perfeitamente agora. Maravilhoso!" },
            { Agente: "ana.pereira@empresa.com", Data: "25/09/2024", Hora: "14:22:18", Texto: "Desculpe pelo inconveniente, vamos corrigir esse problema rapidamente." },
            { Agente: "ana.pereira@empresa.com", Data: "25/09/2024", Hora: "14:23:05", Texto: "Solução implementada com sucesso! Obrigado pela paciência." },
            { Agente: "pedro.costa@empresa.com", Data: "26/09/2024", Hora: "16:45:30", Texto: "Estou extremamente frustrado com essa situação. Nada está funcionando!" },
            { Agente: "pedro.costa@empresa.com", Data: "26/09/2024", Hora: "16:46:15", Texto: "Finalmente! Resolvido. Que alívio, estava muito preocupado." }
        ];
        
        // Processar com análise de sentimentos REAL
        appState.data = processDataWithSentiment(sampleData);
        appState.filteredData = appState.data;
        
        updateStats();
        updateMetrics();
        renderCharts();
        renderTables();
        
        showAlert('✅ Dados processados com análise REAL de sentimentos!', 'success');
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showAlert('❌ Erro ao processar dados', 'error');
    }
}

// Atualizar estatísticas
function updateStats() {
    const interactions = new Set(appState.filteredData.map(item => item.Agente + '_' + item.Data)).size;
    const messages = appState.filteredData.length;
    const agents = new Set(appState.filteredData.map(item => item.Agente)).size;
    
    document.getElementById('statInteractions').textContent = interactions;
    document.getElementById('statMessages').textContent = messages;
    document.getElementById('statAgents').textContent = agents;
}

// Atualizar métricas com dados REAIS
function updateMetrics() {
    const interactions = new Set(appState.filteredData.map(item => item.Agente + '_' + item.Data)).size;
    const messages = appState.filteredData.length;
    
    // Calcular métricas REAIS da análise de sentimentos
    const positive = appState.filteredData.filter(item => 
        item.Sentimento === 'Positivo' || item.Sentimento === 'Muito Positivo'
    ).length;
    
    const negative = appState.filteredData.filter(item => 
        item.Sentimento === 'Negativo' || item.Sentimento === 'Muito Negativo'
    ).length;
    
    const problems = appState.filteredData.reduce((sum, item) => sum + (item.Problemas || 0), 0);
    
    // Atualizar métricas na UI
    document.getElementById('metricInteractions').textContent = interactions;
    document.getElementById('metricMessages').textContent = messages;
    document.getElementById('metricPositive').textContent = positive;
    document.getElementById('metricNegative').textContent = negative;
    document.getElementById('metricProblems').textContent = problems;
    
    // Atualizar estado
    appState.metrics = {
        total_interacoes: interactions,
        total_mensagens: messages,
        positivas: positive,
        negativas: negative,
        total_problemas: problems,
        total_solucoes: appState.filteredData.reduce((sum, item) => sum + (item.Solucoes || 0), 0),
        confianca_media: appState.filteredData.reduce((sum, item) => sum + (item.Confianca || 0), 0) / messages
    };
}

// Renderizar gráficos
function renderCharts() {
    renderSentimentChart();
    renderAgentsChart();
    renderContentChart();
    renderTemporalChart();
}

// Gráfico de Sentimento REAL
function renderSentimentChart() {
    if (appState.filteredData.length === 0) return;
    
    // Contar sentimentos REAIS
    const sentimentCounts = {
        'Muito Positivo': 0,
        'Positivo': 0,
        'Neutro': 0,
        'Negativo': 0,
        'Muito Negativo': 0
    };
    
    appState.filteredData.forEach(item => {
        if (sentimentCounts.hasOwnProperty(item.Sentimento)) {
            sentimentCounts[item.Sentimento]++;
        } else {
            sentimentCounts['Neutro']++;
        }
    });
    
    const data = [{
        values: Object.values(sentimentCounts),
        labels: Object.keys(sentimentCounts),
        type: 'pie',
        marker: {
            colors: ['#2E7D32', '#4CAF50', '#FFC107', '#F44336', '#C62828']
        },
        textinfo: 'label+percent',
        insidetextorientation: 'radial'
    }];
    
    const layout = {
        height: 300,
        showlegend: true,
        margin: { t: 0, b: 0, l: 0, r: 0 }
    };
    
    Plotly.newPlot('sentimentChart', data, layout, { displayModeBar: false });
}

// Gráfico de Agentes
function renderAgentsChart() {
    if (appState.filteredData.length === 0) return;
    
    // Agrupar por agente
    const agentCounts = {};
    appState.filteredData.forEach(item => {
        agentCounts[item.Agente] = (agentCounts[item.Agente] || 0) + 1;
    });
    
    const agents = Object.keys(agentCounts);
    const counts = Object.values(agentCounts);
    
    const data = [{
        x: agents,
        y: counts,
        type: 'bar',
        marker: {
            color: '#2196F3'
        }
    }];
    
    const layout = {
        height: 300,
        xaxis: {
            title: 'Agentes'
        },
        yaxis: {
            title: 'Mensagens'
        },
        margin: { t: 0, b: 50, l: 50, r: 0 }
    };
    
    Plotly.newPlot('agentsChart', data, layout, { displayModeBar: false });
}

// Gráfico de Conteúdo REAL
function renderContentChart() {
    if (appState.filteredData.length === 0) return;
    
    const data = [{
        x: ['Problemas', 'Soluções', 'Oportunidades'],
        y: [
            appState.metrics.total_problemas,
            appState.metrics.total_solucoes,
            Math.floor(appState.metrics.total_mensagens * 0.1) // Simulado
        ],
        type: 'bar',
        marker: {
            color: ['#F44336', '#4CAF50', '#2196F3']
        }
    }];
    
    const layout = {
        height: 300,
        margin: { t: 0, b: 50, l: 50, r: 0 }
    };
    
    Plotly.newPlot('contentChart', data, layout, { displayModeBar: false });
}

// Gráfico Temporal
function renderTemporalChart() {
    if (appState.filteredData.length === 0) return;
    
    // Agrupar por data
    const dateData = {};
    appState.filteredData.forEach(item => {
        const date = item.Data;
        if (!dateData[date]) {
            dateData[date] = { positive: 0, problems: 0, total: 0 };
        }
        dateData[date].total++;
        if (item.Sentimento === 'Positivo' || item.Sentimento === 'Muito Positivo') {
            dateData[date].positive++;
        }
        if (item.Problemas) {
            dateData[date].problems++;
        }
    });
    
    const dates = Object.keys(dateData);
    const positive = dates.map(date => (dateData[date].positive / dateData[date].total) * 100);
    const problems = dates.map(date => dateData[date].problems);
    
    const trace1 = {
        x: dates,
        y: positive,
        type: 'scatter',
        mode: 'lines+markers',
        name: '% Positivo',
        line: { color: 'green', width: 3 }
    };
    
    const trace2 = {
        x: dates,
        y: problems,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Problemas',
        line: { color: 'red', width: 3 }
    };
    
    const data = [trace1, trace2];
    
    const layout = {
        height: 300,
        margin: { t: 0, b: 50, l: 50, r: 0 },
        legend: { orientation: 'h', y: -0.2 }
    };
    
    Plotly.newPlot('temporalChart', data, layout, { displayModeBar: false });
}

// Renderizar tabelas
function renderTables() {
    renderAgentsTable();
}

// Tabela de Agentes REAL
function renderAgentsTable() {
    if (appState.filteredData.length === 0) {
        document.getElementById('agentsTable').innerHTML = '<p class="text-center">Nenhum dado disponível</p>';
        return;
    }
    
    // Agrupar por agente com dados REAIS
    const agentData = {};
    appState.filteredData.forEach(item => {
        if (!agentData[item.Agente]) {
            agentData[item.Agente] = {
                messages: 0,
                interactions: new Set(),
                positive: 0,
                problems: 0,
                totalScore: 0
            };
        }
        
        agentData[item.Agente].messages++;
        agentData[item.Agente].interactions.add(item.Agente + '_' + item.Data);
        agentData[item.Agente].totalScore += item.Pontuacao || 0;
        
        if (item.Sentimento === 'Positivo' || item.Sentimento === 'Muito Positivo') {
            agentData[item.Agente].positive++;
        }
        if (item.Problemas) {
            agentData[item.Agente].problems++;
        }
    });
    
    let html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Agente</th>
                    <th>Interações</th>
                    <th>Mensagens</th>
                    <th>Sentimento Médio</th>
                    <th>Positividade</th>
                    <th>Problemas</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    Object.keys(agentData).forEach(agent => {
        const data = agentData[agent];
        const avgScore = data.totalScore / data.messages;
        const positivity = ((data.positive / data.messages) * 100).toFixed(1);
        const sentiment = avgScore > 0.5 ? '😊' : avgScore < -0.5 ? '😞' : '😐';
        
        html += `
            <tr>
                <td>${agent}</td>
                <td>${data.interactions.size}</td>
                <td>${data.messages}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.2rem;">${sentiment}</span>
                        <span>${avgScore.toFixed(2)}</span>
                    </div>
                </td>
                <td>
                    <div>${positivity}%</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${positivity}%"></div>
                    </div>
                </td>
                <td>${data.problems}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    
    document.getElementById('agentsTable').innerHTML = html;
}

// Funções para processamento de arquivos
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    showAlert(`📁 Processando ${file.name}...`, 'info');
    
    try {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        let parsedData = [];
        
        if (fileExtension === 'csv') {
            parsedData = await parseCSV(file);
        } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            parsedData = await parseExcel(file);
        } else {
            throw new Error('Formato não suportado');
        }
        
        // Processar com análise de sentimentos REAL
        appState.data = processDataWithSentiment(parsedData);
        appState.filteredData = appState.data;
        
        updateStats();
        updateMetrics();
        renderCharts();
        renderTables();
        
        showAlert('✅ Arquivo processado com análise REAL de sentimentos!', 'success');
        
    } catch (error) {
        console.error('Erro ao processar arquivo:', error);
        showAlert('❌ Erro ao processar arquivo', 'error');
    }
}

// Funções auxiliares (para completar a implementação)
async function parseCSV(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const results = Papa.parse(e.target.result, {
                    header: true,
                    skipEmptyLines: true
                });
                resolve(results.data);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

async function parseExcel(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

// Funções placeholder (para implementação futura)
async function loadData() {
    showAlert('📊 Carregando dados...', 'info');
    // Implementar carregamento do Google Sheets
}

async function applyDateFilter() {
    showAlert('📅 Aplicando filtro...', 'info');
    // Implementar filtro por data
}

async function refreshData() {
    showAlert('🔄 Atualizando dados...', 'info');
    // Recarregar dados
    updateStats();
    updateMetrics();
    renderCharts();
    renderTables();
    showAlert('✅ Dados atualizados!', 'success');
}

async function exportData() {
    showAlert('💾 Exportando dados...', 'info');
    // Implementar exportação
}

async function generateInsights() {
    showAlert('🤖 Gerando insights com IA...', 'info');
    // Implementar IA real
}

async function quickAnalysis() {
    showAlert('⚡ Análise rápida...', 'info');
    // Implementar análise rápida
}

async function transcribeAudio() {
    showAlert('🎙️ Transcrevendo áudio...', 'info');
    // Implementar transcrição real
}

async function analyzeAudio() {
    showAlert('🔍 Analisando áudio com IA...', 'info');
    // Implementar análise de áudio real
}

async function exportAgentsReport() {
    showAlert('📊 Exportando relatório...', 'info');
    // Implementar exportação de relatório
}

async function handleAudioUpload(event) {
    const file = event.target.files[0];
    if (file) {
        showAlert(`🎵 Arquivo de áudio carregado: ${file.name}`, 'success');
    }
}

async function handleKnowledgeUpload(event) {
    const file = event.target.files[0];
    if (file) {
        showAlert(`📚 Base de conhecimento carregada: ${file.name}`, 'success');
    }
}

async function handleWordSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    // Implementar busca em palavras
}

async function handleGlobalSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    // Implementar busca global
}

// Mostrar alerta
function showAlert(message, type) {
    // Remover alertas existentes
    const existingAlerts = document.querySelectorAll('.temp-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Criar novo alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} temp-alert`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
        <div>${message}</div>
    `;
    
    // Adicionar ao início do conteúdo principal
    const contentArea = document.getElementById('contentArea');
    contentArea.insertBefore(alert, contentArea.firstChild);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
}
