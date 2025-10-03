// Processador de dados - Para organizar funções de manipulação de dados

class DataProcessor {
    constructor() {
        this.supportedFormats = ['csv', 'xlsx', 'xls'];
    }

    // Validar estrutura dos dados
    validateDataStructure(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return { isValid: false, error: 'Dados vazios ou em formato inválido' };
        }

        const requiredFields = ['Agente', 'Data', 'Texto'];
        const sample = data[0];
        
        const missingFields = requiredFields.filter(field => !(field in sample));
        
        if (missingFields.length > 0) {
            return {
                isValid: false,
                error: `Campos obrigatórios faltando: ${missingFields.join(', ')}`
            };
        }

        return { isValid: true };
    }

    // Normalizar dados de diferentes fontes
    normalizeData(data, sourceType) {
        switch (sourceType) {
            case 'google_sheets':
                return this.normalizeGoogleSheetsData(data);
            case 'csv':
                return this.normalizeCSVData(data);
            case 'excel':
                return this.normalizeExcelData(data);
            default:
                return data;
        }
    }

    normalizeGoogleSheetsData(data) {
        return data.map(row => ({
            Agente: row.Agente || row.agente || row['Email do Agente'] || 'N/A',
            Data: row.Data || row.data || row.Date || 'N/A',
            Hora: row.Hora || row.hora || row.Time || 'N/A',
            Texto: row.Texto || row.texto || row.Message || row.Mensagem || ''
        }));
    }

    normalizeCSVData(data) {
        return data.map(row => ({
            Agente: row.Agente || row.agente || row['Email do Agente'] || 'N/A',
            Data: row.Data || row.data || row.Date || 'N/A',
            Hora: row.Hora || row.hora || row.Time || 'N/A',
            Texto: row.Texto || row.texto || row.Message || row.Mensagem || ''
        }));
    }

    normalizeExcelData(data) {
        return data.map(row => ({
            Agente: row.Agente || row.agente || row['Email do Agente'] || 'N/A',
            Data: row.Data || row.data || row.Date || 'N/A',
            Hora: row.Hora || row.hora || row.Time || 'N/A',
            Texto: row.Texto || row.texto || row.Message || row.Mensagem || ''
        }));
    }

    // Filtrar dados por data
    filterByDate(data, startDate, endDate) {
        if (!startDate || !endDate) return data;

        const start = new Date(startDate);
        const end = new Date(endDate);

        return data.filter(item => {
            const itemDate = this.parseDate(item.Data);
            return itemDate >= start && itemDate <= end;
        });
    }

    // Converter data para formato padrão
    parseDate(dateString) {
        // Tentar diferentes formatos de data
        const formats = [
            'DD/MM/YYYY',
            'YYYY-MM-DD',
            'MM/DD/YYYY',
            'DD-MM-YYYY'
        ];

        for (let format of formats) {
            const parsed = this.parseDateWithFormat(dateString, format);
            if (parsed) return parsed;
        }

        return new Date(); // Fallback
    }

    parseDateWithFormat(dateString, format) {
        try {
            if (format === 'DD/MM/YYYY') {
                const parts = dateString.split('/');
                if (parts.length === 3) {
                    return new Date(parts[2], parts[1] - 1, parts[0]);
                }
            } else if (format === 'YYYY-MM-DD') {
                return new Date(dateString);
            }
        } catch (e) {
            return null;
        }
        return null;
    }

    // Estatísticas dos dados
    calculateStatistics(data) {
        const agents = [...new Set(data.map(item => item.Agente))];
        const dates = [...new Set(data.map(item => item.Data))];
        
        return {
            totalMessages: data.length,
            uniqueAgents: agents.length,
            dateRange: {
                start: dates.length > 0 ? Math.min(...dates.map(d => new Date(d))) : null,
                end: dates.length > 0 ? Math.max(...dates.map(d => new Date(d))) : null
            },
            messagesPerAgent: this.calculateMessagesPerAgent(data),
            activityByDate: this.calculateActivityByDate(data)
        };
    }

    calculateMessagesPerAgent(data) {
        const agentCounts = {};
        data.forEach(item => {
            agentCounts[item.Agente] = (agentCounts[item.Agente] || 0) + 1;
        });
        return agentCounts;
    }

    calculateActivityByDate(data) {
        const dateCounts = {};
        data.forEach(item => {
            dateCounts[item.Data] = (dateCounts[item.Data] || 0) + 1;
        });
        return dateCounts;
    }
}

// Exportar para uso global
window.DataProcessor = DataProcessor;
