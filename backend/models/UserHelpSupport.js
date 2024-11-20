import mongoose from 'mongoose';

const helpAndSupportSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      // ref: 'User', // Reference to the User collection if needed
    },
    subject: {
      type: String,
      required: true,
      maxlength: 100,
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ['user', 'support'],
        //   required: true,
        },
        content: {
          type: String,
        //   required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

// Pre-save middleware to update `updatedAt`
helpAndSupportSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model using ES module syntax
export default mongoose.model('HelpAndSupport', helpAndSupportSchema);
