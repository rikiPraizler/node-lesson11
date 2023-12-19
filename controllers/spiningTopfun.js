const { default: mongoose } = require("mongoose");
const spiningTop = require("../models/spiningTopTable");
module.exports.getAllSpinings= async (req, res) => {
    try {

        let allSpining = await spiningTop.find({})
        res.json(allSpining);
    }
    catch (err) {
        res.status(400).send("problem in getting all spining")

    }
}
module.exports.getAllSpiningById= async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("invalid paramter id");
    try {
        let oneSpining = await spiningTop.findOne({ _id: req.params.id })

        if (!oneSpining)
            return res.status(404).send("no spining with such id");
        res.json(oneSpining);
    }
    catch (err) {
        res.status(400).send("problem im getting spining id " + req.params.id)

    }
}
module.exports.addSpining=async (req, res) => {
    if (!req.body.name || !req.body.price) {
        res.status(404);
        throw new Error("missing paramters")
        
    }
    let mySpining = new spiningTop({
        name: req.body.name
        , price: req.body.price
        ,color:req.body.color


    })
    try {
        await mySpining.save();
        res.status(201).json(mySpining);
    } catch (err) {
        res.status(400).send("cannot create this spining")
    }


}
module.exports.deleteSpining = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("��� �� ����");
    let deletedSpining = await SpiningTop.findByIdAndDelete(id)
    if (!deletedSpining)
        return res.status(404).send("�� ���� ������ �� ��� ��� ������")
    return res.json(deletedSpining);

}
module.exports.updateSpining = async (req, res) => {
    let { spiningid } = req.params;
    if (!mongoose.isValidObjectId(spiningid))
        return res.status(400).send("��� �� ����");
    try {
        let spiningToUpdate = await Book.findById(spiningid);
        if (!spiningToUpdate)
            return res.status(404).send("�� ���� ������ �� ��� ���")
        spiningToUpdate.name = req.body.name || spiningToUpdate.name;
        spiningToUpdate.color = req.body.color || spiningToUpdate.color;
        spiningToUpdate.price = req.body.price || spiningToUpdate.price;
        await spiningToUpdate.save();
        res.json(spiningToUpdate);
    } catch (err) {
        res.status(400).send("�� �����" + err)
    }

}