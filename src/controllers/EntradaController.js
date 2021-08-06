const connection = require('../database/connection');

module.exports = {
    async criar(request, response){
        const {id_descricao_entrada, data_entrada, valor_entrada} = request.body;

        await connection('entrada').insert({
            id_descricao_entrada,
            data_entrada,
            valor_entrada
        });

        return response.json();
    },

    async listarDescricao(request, response){
        const descricao = await connection('descricao')
            .select('*')
            .orderBy('nome_descricao_entrada', 'asc')

        return response.json(descricao);
    }
}