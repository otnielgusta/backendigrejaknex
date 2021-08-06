const connection = require('../database/connection');

module.exports = {
    async criar(request, response){
        const {id_descricao_saida, data_saida, valor_saida} = request.body;

        await connection('saida').insert({
            id_descricao_saida,
            data_saida,
            valor_saida
        });

        return response.json();
    },
    async listarDescricao(request, response){
        const descricao = await connection('descricaosaida')
            .select('*')
            .orderBy('nome_descricao_saida', 'asc')

        return response.json(descricao);
    }
}