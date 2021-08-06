const connection = require('../database/connection');

module.exports = {
    async listar(request, response)  {
        

        const anos = await connection('entrada')
            .select(connection.raw('distinct Year(data_entrada) as anos'))
            .orderBy('anos', 'asc');
        
        return response.json(anos)

    
    }
}