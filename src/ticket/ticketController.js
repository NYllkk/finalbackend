const { RES, STATUS } = require("../../common/common");
const Employee = require("../../db/models/Employee");
const Ticket = require("../../db/models/Ticket");

const CreateTicket = async (req, res) => {
    try {
        const { title, description, department, priority, EmployeeId } = req.body;
        if (!EmployeeId) {
            return res.status(400).json({ error: 'EmployeeId is required' });
        }
        const employee = await Employee.findByPk(EmployeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        const ticket = await Ticket.create({
            title,
            description,
            department,
            priority,
            EmployeeId,
        });
        res.status(201).json({ message: 'Ticket created successfully', ticket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { title, description, department, priority } = req.body;
    try {
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        ticket.title = title;
        ticket.description = description;
        ticket.department = department;
        ticket.priority = priority;
        await ticket.save();
        return res.status(200).json({ message: 'Updated successfully', ticket });
    } catch (error) {
        console.error('Error updating ticket:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).json({ error: 'ID not found' });
        }
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        await ticket.destroy();
        return res.status(200).json({ message: 'Ticket deleted successfully', ticket });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const findTicket = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({});
        return res.status(200).json({ message: 'Got tickets', tickets });
    } catch (error) {
        console.error('Error finding tickets:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = { CreateTicket, updateTicket, deleteTicket, findTicket }



