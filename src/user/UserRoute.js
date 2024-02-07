const express = require("express");
const router = express.Router();
const { createUser, deleteUser, updateUser, getUser } = require("../user/Userontroller")


router.post('/', createUser);
router.delete("/:UserId", deleteUser)
router.put("/:id", updateUser)
router.get("/:id", getUser)



module.exports = router;






















// router.delete("/:id", async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await User.findByPk(userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         await user.destroy();
//         res.json({ message: "User Deleted Successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
