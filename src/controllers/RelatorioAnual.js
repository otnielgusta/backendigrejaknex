const connection = require('../database/connection');

module.exports = {
    async listar(request, response)  {
        const {ano} = request.query;
        

        const valor = { 
                        entradas:0,
                        saidas:0,
                        totalentradas:0,
                        totalsaidas:0
                        
                    };

        valor.entradas = await connection('entrada')         
            .innerJoin('descricao', 'entrada.id_descricao_entrada', 'descricao.id_descricao_entrada')
            .select('descricao.nome_descricao_entrada')
            .sum({valor_entrada: 'entrada.valor_entrada'}) 
            .whereRaw(`Year(entrada.data_entrada) = "${ano}"`)
            .groupBy('descricao.id_descricao_entrada')
            .orderBy('descricao.nome_descricao_entrada', 'asc')
    
        valor.saidas = await connection('saida')       
            .innerJoin('descricaosaida', 'saida.id_descricao_saida', 'descricaosaida.id_descricao_saida')
            .select('descricaosaida.nome_descricao_saida')
            .sum({valor_saida: 'saida.valor_saida'}) 
            .whereRaw(`Year(saida.data_saida) = "${ano}"`)
            .groupBy('descricaosaida.id_descricao_saida')
            .orderBy('descricaosaida.nome_descricao_saida', 'asc')

        valor.totalentradas = await connection('entrada')
            .sum({valor_entrada: 'entrada.valor_entrada'})
            .whereRaw(`Year(entrada.data_entrada) = "${ano}"`)
           

        valor.totalsaidas = await connection('saida')
            .sum({valor_saida: 'saida.valor_saida'}) 
            .whereRaw(`Year(saida.data_saida) = "${ano}"`)
            

        
        
    return response.json(valor)

    
}
}