
exports.up = function(knex) {
    return knex.schema.createTable('users', user => {
        user.increments('id').primary()
        user.string('username')
        user.string('password_hash')
        user.string('hueAddress')
        user.string('hueUsername')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
}
