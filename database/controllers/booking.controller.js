const db = require('../connection');
const Booking = db.booking;

const getAllBookings = async (req, res) => {
    const { status, paymentStatus, userEmail } = req.query;
  
    const filter = {};
  
    if (status) {
      filter.status = status;
    }
  
    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }
  
    if (userEmail) {
      filter.userEmail = userEmail;
    }
  
    const bookings = await Booking.findAll({ where: filter });
  
    res.status(200).json({
      message: 'Filtered bookings',
      data: bookings
    });
  };
  

const getBookingById = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.status(200).json({ message: 'Booking found', data: booking });
};

// const createBooking = async (req, res) => {
//   const { fullName, userEmail, numberofPersons, travelDate, paymentMethod } = req.body;

//   // Basic required field validation
//   if (!fullName || !userEmail || !numberofPersons || !travelDate) {
//     return res.status(400).json({
//       message: 'Required fields: fullName, userEmail, numberofPersons, travelDate'
//     });
//   }

//   // Email format check
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(userEmail)) {
//     return res.status(400).json({ message: 'Invalid email format' });
//   }

//   // Person count check
//   if (isNaN(numberofPersons) || numberofPersons < 1) {
//     return res.status(400).json({ message: 'numberofPersons must be at least 1' });
//   }

//   const newBooking = await Booking.create({
//     fullName,
//     userEmail,
//     numberofPersons,
//     travelDate,
//     paymentMethod,
//     status: 'pending',
//     paymentStatus: 'unpaid',
//     paymentId: null
//   });

//   res.status(201).json({ message: 'Booking created successfully', data: newBooking });
// };
const createBooking = async (req, res) => {
  try {
    const { fullName, userEmail, numberofPersons, travelDate, paymentMethod } = req.body;

    if (!fullName || !userEmail || !numberofPersons || !travelDate || !paymentMethod) {
      return res.status(400).json({
        message: 'Required fields: fullName, userEmail, numberofPersons, travelDate, paymentMethod'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (isNaN(numberofPersons) || numberofPersons < 1) {
      return res.status(400).json({ message: 'numberofPersons must be at least 1' });
    }

    const newBooking = await Booking.create({
      fullName,
      userEmail,
      numberofPersons,
      travelDate,
      status: 'pending',
      paymentStatus: 'unpaid',
      paymentId: null,
      paymentMethod
    });

    res.status(201).json({ message: 'Booking created successfully', data: newBooking });
  } catch (err) {
    console.error('❌ Booking error:', err);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};


const updateBooking = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  const { fullName, userEmail, numberofPersons, travelDate } = req.body;

  // Optional validation if you require full data for update
  if (!fullName || !userEmail || !numberofPersons || !travelDate) {
    return res.status(400).json({
      message: 'All fields required for update: fullName, userEmail, numberofPersons, travelDate'
    });
  }

  const updated = await booking.update(req.body);
  res.status(200).json({ message: 'Booking updated successfully', data: updated });
};

const deleteBooking = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  await booking.destroy();
  res.status(200).json({ message: 'Booking deleted successfully' });
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};
