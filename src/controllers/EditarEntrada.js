const connection = require('../database/connection');

module.exports = {
    async listar(request, response){
        const {dataQ, valorQ, descricaoQ} = request.query;

        const listagens = {
            resultado:0,
            listaDescricao:0
        };
        
        if(dataQ === null && valorQ === nul && descricaoQ === null){
            listagens.resultado  = await connection('entrada')
            .select([
                'entrada.id_entrada',
                'entrada.data_entrada',
                'entrada.valor_entrada',
                'descricao.id_descricao_entrada',
                'descricao.nome_descricao_entrada'
            ])
            .orderBy('id_entrada','desc')
            .limit(10)

            

        }else{
            listagens.resultado  = await connection('entrada')
                .innerJoin('descricao', 'entrada.id_descricao_entrada', '=', 'descricao.id_descricao_entrada' )
                .select([
                    'entrada.id_entrada',
                    'entrada.data_entrada',
                    'entrada.valor_entrada',
                    'descricao.id_descricao_entrada',
                    'descricao.nome_descricao_entrada'
                ])
                .where(              
                    'entrada.data_entrada', 'like', `%${dataQ}%`          
                )
                .orWhere('entrada.valor_entrada', 'like', `%${valorQ}%`)
                .orWhere('entrada.id_descricao_entrada', 'like', `%${descricaoQ}%`)
                .orderBy('entrada.data_entrada','desc')
                .limit(10)
        
        
          
        }
    
    listagens.listaDescricao = await connection('descricao')
            .select('*')
            .orderBy('nome_descricao_entrada', 'asc')

        return response.json(listagens);
    },
    async deletar(request, response){
        const {id} = request.params;

         await connection('entrada')
            .where('id_entrada', id)
            .delete()

        console.log(id);
        return response.status(204).send();
    },
    async update(request, response){
        const {id} = request.params;
        const {dataU, valorU, descricaoU} = request.query;

         await connection('entrada')
         .where('id_entrada', '=',`${id}`)
         .update({
             'data_entrada': `${dataU}`,
            'valor_entrada': `${valorU}`,
             'id_descricao_entrada': `${descricaoU}`,
         })
            

        return response.status(204).send();
    }
    
}