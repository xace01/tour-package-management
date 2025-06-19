const db = require('../connection');
const TourPackage = db.package;

const getAllPackages = async (req, res) => {
  try {
    const packages = await TourPackage.findAll();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPackageById = async (req, res) => {
  try {
    const tour = await TourPackage.findByPk(req.params.id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPackage = async (req, res) => {
  try {
    const { title, location, description, price, duration, imageUrl } = req.body;

    // Optional: basic validation
    if (!title || !location || !description || !price || !duration || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required including imageUrl' });
    }

    const newPackage = await TourPackage.create({
      title,
      location,
      description,
      price,
      duration,
      imageUrl
    });

    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  

  const updatePackage = async (req, res) => {
    const { title, location, description, price, duration, imageUrl } = req.body;
  
    // Basic manual validation
    if (!title || !location || !description || !price || !duration || !imageUrl) {
      return res.status(400).json({
        message: "All fields are required to update: title, location, description, price, duration, imageUrl"
      });
    }
  
    const pkg = await TourPackage.findByPk(req.params.id);
  
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
  
    const updated = await pkg.update({
      title,
      location,
      description,
      price,
      duration,
      imageUrl
    });
  
    res.status(200).json({
      message: 'Package updated successfully',
      data: updated
    });
  };
  

const deletePackage = async (req, res) => {
  try {
    await TourPackage.destroy({
      where: { id: req.params.id }
    });
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
};
