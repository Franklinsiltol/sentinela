// Dicionário AFINN adaptado para português
const AFINN_PT = {
    'abandonar': -2, 'abandonado': -2, 'abandono': -2,
    'abatido': -2, 'abominar': -3, 'abominação': -3,
    'abominável': -3, 'aborrecer': -2, 'aborrecido': -2,
    'aborrecimento': -2, 'abrasador': -1, 'abrasar': -1,
    'abrir': 1, 'absurdo': -2, 'abuso': -3,
    'abusar': -3, 'acalmar': 2, 'aceitar': 2,
    'aceitação': 2, 'acessível': 1, 'acolhedor': 2,
    'acolher': 2, 'acreditar': 1, 'acusar': -2,
    'adeus': -1, 'admirar': 3, 'admirável': 3,
    'adorei': 3, 'adoro': 3, 'adversário': -2,
    'adversidade': -2, 'agradável': 3, 'agradecer': 2,
    'agradecido': 2, 'agressão': -3, 'agressivo': -2,
    'ajuda': 2, 'ajudar': 2, 'alegrar': 3,
    'alegre': 3, 'alegria': 4, 'aliviado': 2,
    'amabilidade': 3, 'amar': 3, 'amargo': -2,
    'amigável': 2, 'amizade': 2, 'amor': 3,
    'angustiado': -3, 'angústia': -3, 'animado': 3,
    'ansiedade': -2, 'ansioso': -2, 'apavorado': -3,
    'apoiar': 2, 'apreciação': 2, 'apreensivo': -2,
    'apropriado': 2, 'aprovado': 2, 'assustado': -2,
    'assustador': -2, 'aterrorizado': -3, 'atraente': 2,
    'aviso': -1, 'bênção': 3, 'benéfico': 2,
    'bom': 3, 'bondade': 3, 'bravo': -3,
    'brilhante': 2, 'burlar': -2, 'cair': -1,
    'calmo': 1, 'cansaço': -2, 'cansado': -2,
    'capaz': 2, 'carinho': 3, 'catástrofe': -3,
    'chateado': -2, 'chato': -2, 'chocante': -2,
    'comemorar': 3, 'compreensão': 2, 'conforto': 2,
    'confortável': 2, 'confusão': -2, 'confuso': -2,
    'consertar': 2, 'consolo': 2, 'contente': 3,
    'coragem': 2, 'corajoso': 2, 'cuidado': 2,
    'culpa': -2, 'culpado': -2, 'danificar': -2,
    'danificado': -2, 'danoso': -3, 'decepcionado': -2,
    'decepção': -2, 'defeito': -2, 'defeituoso': -2,
    'deficiência': -2, 'degradar': -2, 'degradante': -2,
    'deixa': -1, 'deixar': -1, 'delícia': 3,
    'delicioso': 3, 'deprimido': -2, 'deprimente': -2,
    'derrota': -2, 'derrotar': -2, 'desafeto': -2,
    'desagradável': -2, 'desanimado': -2, 'desanimar': -2,
    'desapontado': -2, 'desastre': -3, 'desastrado': -2,
    'desconforto': -2, 'desconfortável': -2, 'desculpa': -1,
    'desejo': 1, 'desesperado': -3, 'desespero': -3,
    'desgostar': -2, 'desgosto': -2, 'desgraça': -3,
    'desgosto': -2, 'desilusão': -2, 'desistir': -2,
    'desleal': -3, 'desolado': -3, 'desonesto': -2,
    'desonra': -2, 'desordem': -2, 'desrespeito': -2,
    'desrespeitoso': -2, 'destruir': -3, 'destruição': -3,
    'deteriorar': -2, 'detestar': -3, 'deveria': 0,
    'devastado': -3, 'difícil': -1, 'digno': 2,
    'dilema': -1, 'diminuir': -1, 'dinâmico': 2,
    'direito': 2, 'disciplina': 1, 'disputa': -2,
    'distúrbio': -2, 'diversão': 3, 'divertido': 3,
    'doloroso': -2, 'dor': -2, 'dúvida': -1,
    'econômico': 1, 'eficaz': 2, 'elegante': 2,
    'elevar': 2, 'elogiar': 2, 'elogio': 2,
    'embaraçado': -2, 'embaraçoso': -2, 'emoção': 3,
    'empolgado': 3, 'encantador': 3, 'encorajar': 2,
    'energia': 2, 'energético': 2, 'enfurecer': -3,
    'engraçado': 3, 'enorme': 2, 'entusiasmado': 3,
    'entusiasmo': 3, 'errado': -2, 'erro': -2,
    'escolha': 1, 'escorregar': -1, 'esforço': 2,
    'esmagar': -2, 'especial': 2, 'esperança': 2,
    'esperançoso': 2, 'espantoso': 3, 'espetacular': 3,
    'esplêndido': 3, 'estável': 1, 'estragar': -2,
    'estranho': -1, 'estressado': -2, 'estresse': -2,
    'estúpido': -3, 'euforia': 4, 'euforico': 4,
    'evitar': -1, 'excelente': 3, 'excepcional': 3,
    'excitação': 3, 'excitado': 3, 'exigente': -1,
    'êxito': 3, 'experiência': 1, 'extraordinário': 3,
    'extremo': 1, 'facilidade': 1, 'fadiga': -2,
    'falha': -2, 'falar': 1, 'falso': -2,
    'falta': -1, 'faltar': -1, 'fantástico': 4,
    'favorito': 2, 'felicidade': 4, 'feliz': 3,
    'ficar': 1, 'fiel': 2, 'forte': 2,
    'fraco': -2, 'fraqueza': -2, 'frustração': -2,
    'frustrado': -2, 'fugir': -1, 'funciona': 2,
    'funcionando': 2, 'fundamental': 2, 'fúria': -3,
    'furioso': -3, 'ganhar': 2, 'generoso': 2,
    'genial': 3, 'gostar': 2, 'gostei': 2,
    'gosto': 2, 'grande': 2, 'gratidão': 3,
    'grato': 3, 'grave': -2, 'guerra': -3,
    'habilidade': 2, 'habilidoso': 2, 'harmonia': 2,
    'herói': 2, 'heroico': 2, 'honesto': 2,
    'honra': 2, 'horrível': -3, 'horror': -3,
    'hostil': -2, 'humilhar': -3, 'ideia': 1,
    'idiota': -3, 'ignorar': -2, 'ilegal': -3,
    'imoral': -3, 'importante': 2, 'impressionante': 3,
    'incapaz': -2, 'incerteza': -2, 'incerto': -2,
    'incidente': -1, 'incrível': 3, 'indeciso': -1,
    'indesejado': -2, 'ineficaz': -2, 'inferior': -2,
    'injustiça': -2, 'injusto': -2, 'inseguro': -2,
    'insensível': -2, 'insatisfeito': -2, 'insatisfação': -2,
    'insistir': -1, 'insucesso': -2, 'inteligente': 2,
    'interessante': 2, 'intriga': -1, 'inveja': -2,
    'invejoso': -2, 'irritado': -3, 'irritante': -2,
    'jovem': 1, 'julgamento': -1, 'justo': 2,
    'justiça': 2, 'legal': 2, 'liberdade': 2,
    'liberar': 1, 'livre': 2, 'loucura': -2,
    'lutar': -1, 'magnífico': 3, 'mal': -3,
    'maravilha': 3, 'maravilhoso': 4, 'mau': -3,
    'medo': -2, 'melhor': 3, 'melhorar': 2,
    'mentir': -3, 'mentira': -3, 'merecer': 2,
    'merecido': 2, 'merecimento': 2, 'miserável': -3,
    'miséria': -3, 'misterioso': -1, 'morte': -3,
    'morto': -3, 'motivar': 2, 'motivação': 2,
    'muito': 1, 'negligência': -2, 'negligente': -2,
    'negociar': 1, 'nervoso': -2, 'nobre': 2,
    'notável': 3, 'obrigado': 2, 'ódio': -3,
    'odiar': -3, 'ofensa': -2, 'ofender': -2,
    'ofensivo': -2, 'oportunidade': 2, 'optimismo': 2,
    'optimista': 2, 'orgulho': 2, 'orgulhoso': 2,
    'ostentar': -1, 'ousado': 2, 'paciência': 2,
    'paciente': 2, 'paz': 2, 'perda': -2,
    'perder': -2, 'perdido': -2, 'perfeito': 3,
    'perigo': -2, 'perigoso': -2, 'permitir': 1,
    'perseguir': -1, 'pessimismo': -2, 'pessimista': -2,
    'pior': -3, 'pobre': -2, 'poder': 2,
    'poderoso': 2, 'ponto': 1, 'popular': 2,
    'positivo': 2, 'possível': 1, 'preciso': 2,
    'preocupação': -2, 'preocupado': -2, 'preocupar': -2,
    'presa': -2, 'preso': -2, 'pressa': -1,
    'pressão': -1, 'prevenir': 1, 'primeiro': 2,
    'problema': -2, 'produtivo': 2, 'progresso': 2,
    'promessa': 1, 'promissor': 2, 'proteger': 2,
    'proteção': 2, 'prova': 1, 'qualidade': 2,
    'quebrar': -2, 'quebrado': -2, 'querer': 1,
    'raiva': -3, 'rancor': -2, 'rancoroso': -2,
    'raro': 2, 'realizar': 2, 'recusar': -2,
    'recusa': -2, 'rejeitar': -2, 'rejeição': -2,
    'relaxar': 2, 'relutante': -1, 'remorso': -2,
    'respeito': 2, 'respeitoso': 2, 'responsabilidade': 1,
    'responsável': 2, 'ressentimento': -2, 'ressuscitar': 2,
    'restaurar': 2, 'resultado': 1, 'reto': 2,
    'reunir': 1, 'reunião': 1, 'revelar': 1,
    'reverência': 2, 'ridículo': -2, 'risco': -2,
    'riscar': -1, 'rival': -1, 'roubar': -3,
    'ruim': -3, 'sábio': 2, 'sabedoria': 2,
    'saboroso': 2, 'sacanagem': -2, 'sacrificar': -1,
    'sacrifício': -1, 'sagrado': 2, 'salvar': 2,
    'satisfação': 3, 'satisfeito': 3, 'saudade': -1,
    'saudável': 2, 'segredo': -1, 'segurança': 2,
    'seguro': 2, 'sensacional': 4, 'sensato': 2,
    'senso': 1, 'sensual': 2, 'sentir': 1,
    'sereno': 2, 'sério': -1, 'servir': 1,
    'significativo': 2, 'simpatia': 2, 'simpático': 2,
    'sincero': 2, 'socorro': -2, 'solidão': -2,
    'solitude': -1, 'solitário': -2, 'soluço': -1,
    'solução': 2, 'solucionar': 2, 'sombrio': -2,
    'sonho': 1, 'sortudo': 3, 'sorte': 2,
    'sossego': 2, 'suave': 1, 'sucesso': 3,
    'sugerir': 1, 'super': 3, 'superar': 2,
    'supremo': 3, 'surpresa': 1, 'surpreendente': 3,
    'suspeita': -2, 'suspeitar': -2, 'suspeito': -2,
    'susto': -2, 'talentoso': 2, 'talento': 2,
    'temer': -2, 'temeroso': -2, 'tensão': -2,
    'tenso': -2, 'terrível': -3, 'terrivelmente': -3,
    'terror': -3, 'tolo': -2, 'tonto': -1,
    'torto': -2, 'trabalho': 1, 'traidor': -3,
    'trair': -3, 'traição': -3, 'tranquilidade': 2,
    'tranquilo': 2, 'triste': -2, 'tristeza': -2,
    'triste': -2, 'útil': 2, 'utilidade': 2,
    'vagaroso': -1, 'valioso': 2, 'valor': 2,
    'vantagem': 2, 'vantajoso': 2, 'vencer': 3,
    'venerar': 2, 'verdade': 2, 'verdadeiro': 2,
    'vergonha': -2, 'vergonhoso': -2, 'vibrante': 2,
    'vida': 2, 'vigor': 2, 'vigoroso': 2,
    'vil': -2, 'violação': -2, 'violar': -2,
    'violência': -3, 'violento': -3, 'virtude': 2,
    'virtuoso': 2, 'vital': 2, 'vitória': 3,
    'vitorioso': 3, 'vivo': 2, 'vontade': 1,
    'vulnerável': -1, 'zombar': -2, 'zombaria': -2
};

class SentimentAnalyzer {
    constructor() {
        this.afinn = AFINN_PT;
        this.negators = ['não', 'nem', 'nunca', 'jamais', 'sem'];
        this.intensifiers = {
            'muito': 1.5,
            'extremamente': 2.0,
            'totalmente': 1.8,
            'completamente': 1.8,
            'realmente': 1.3,
            'demais': 1.5
        };
    }

    analyze(text) {
        if (!text || typeof text !== 'string') {
            return { score: 0, comparative: 0, sentiment: 'Neutro', confidence: 0 };
        }

        const words = this.tokenize(text);
        let score = 0;
        let wordCount = 0;
        let negateNext = false;
        let intensifyNext = 1.0;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const nextWord = words[i + 1];

            // Verificar se é um negador
            if (this.negators.includes(word)) {
                negateNext = true;
                continue;
            }

            // Verificar se é um intensificador
            if (this.intensifiers[word]) {
                intensifyNext = this.intensifiers[word];
                continue;
            }

            // Verificar se a palavra está no dicionário
            if (this.afinn[word]) {
                let wordScore = this.afinn[word];
                
                // Aplicar intensificador
                wordScore *= intensifyNext;
                intensifyNext = 1.0;

                // Aplicar negador
                if (negateNext) {
                    wordScore = -wordScore;
                    negateNext = false;
                }

                score += wordScore;
                wordCount++;
            }
        }

        const comparative = wordCount > 0 ? score / wordCount : 0;
        const sentiment = this.getSentimentLabel(score, comparative);
        const confidence = this.calculateConfidence(score, wordCount);

        return {
            score: Math.round(score * 100) / 100,
            comparative: Math.round(comparative * 100) / 100,
            sentiment: sentiment,
            confidence: Math.round(confidence * 100) / 100,
            wordCount: wordCount
        };
    }

    tokenize(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\sàáâãèéêìíîòóôõùúûç]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 2);
    }

    getSentimentLabel(score, comparative) {
        if (score > 2) return 'Muito Positivo';
        if (score > 0.5) return 'Positivo';
        if (score > -0.5) return 'Neutro';
        if (score > -2) return 'Negativo';
        return 'Muito Negativo';
    }

    calculateConfidence(score, wordCount) {
        if (wordCount === 0) return 0;
        
        const baseConfidence = Math.min(Math.abs(score) / wordCount * 2, 1);
        const wordCountConfidence = Math.min(wordCount / 10, 1);
        
        return (baseConfidence * 0.7 + wordCountConfidence * 0.3);
    }

    // Análise em lote para múltiplos textos
    analyzeBatch(texts) {
        return texts.map(text => this.analyze(text));
    }
}

// Exportar para uso global
window.SentimentAnalyzer = SentimentAnalyzer;
