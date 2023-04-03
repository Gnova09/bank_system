


const PostNewCuotasBancos = () => async (req, res) => {

    await Cliente.findAll()
        .then((cliente) => {
            res.json(cliente);
        })
        .catch((err) => {
            console.log('Error al cargar el cliente:' + err);
            res.status(400).json('Error al cargar el cliente');
        })

}

module.exports = {
    PostNewCuotasBancos
}