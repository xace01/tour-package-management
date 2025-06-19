module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberofPersons: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 }
      },
      travelDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: { isIn: [['pending', 'confirmed', 'cancelled']] }
      },
  
      // 🔽 New fields for payment
      paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unpaid',
        validate: {
          isIn: [['unpaid', 'paid', 'failed']]
        }
      },
      paymentId: {
        type: DataTypes.STRING,
        allowNull: true // Filled after payment is successful
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Cash',
        validate: {
          isIn: [['Cash', 'Esewa', 'Khalti']]
        }
      }   
    });
  
    return Booking;
  };
  