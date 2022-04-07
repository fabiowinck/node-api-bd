const { user } = require('pg/lib/defaults');
const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req, res) {
        // Encontrar todos os usuários que tem email que termina com @gmail.com
        // Desses usuários eu quero encontrar todos que moram na rua "Helmuth Messer"
        // Desses usuários eu quero buscar as tecnologias que começam com Node

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.iLike]: '%gmail.com',
                }
            },
            include: [
                { association: 'addresses', where: { street: 'Helmuth Messer' } },
                {
                    association: 'techs',
                    required: false,
                    where: {
                        name: {
                            [Op.iLike]: 'React%'
                        }
                    }
                },
            ]
        })

        return res.json(users);
    }
};