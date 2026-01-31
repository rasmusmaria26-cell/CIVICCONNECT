const prisma = require('../prisma');

exports.createComplaint = async (req, res) => {
    try {
        const { title, description, category, latitude, longitude, imageUrl } = req.body;
        const complaint = await prisma.complaint.create({
            data: {
                title,
                description,
                category,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                imageUrl,
                citizenId: req.user.id
            }
        });

        // Initial Status Log
        await prisma.statusLog.create({
            data: {
                complaintId: complaint.id,
                status: 'PENDING',
                remarks: 'Complaint submitted by citizen',
                authorRole: 'CITIZEN'
            }
        });

        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getComplaints = async (req, res) => {
    try {
        let complaints;
        if (req.user.role === 'AUTHORITY' || req.user.role === 'ADMIN') {
            complaints = await prisma.complaint.findMany({
                include: { citizen: { select: { name: true, email: true } }, logs: true },
                orderBy: { createdAt: 'desc' }
            });
        } else {
            complaints = await prisma.complaint.findMany({
                where: { citizenId: req.user.id },
                include: { logs: true },
                orderBy: { createdAt: 'desc' }
            });
        }
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remarks } = req.body;

        const complaint = await prisma.complaint.update({
            where: { id },
            data: { status }
        });

        await prisma.statusLog.create({
            data: {
                complaintId: id,
                status,
                remarks,
                authorRole: req.user.role
            }
        });

        res.json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
