const pool = require("../config/pool");

const deleteCompany = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Check if company exists
        const [checkCompany] = await pool.query(
            'SELECT * FROM companies WHERE Id = ?',
            [id]
        );

        if (checkCompany.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }

        // Delete the company
        await pool.query(
            'DELETE FROM companies WHERE Id = ?',
            [id]
        );

        res.status(200).json({
            success: true,
            message: 'Company deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    deleteCompany
};