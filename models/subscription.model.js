import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number, 
        required: [true, "Subscription price is required"],
        min: [0, "Price must be greater than zero"]
    },
    currency: {
        type: String,
        enum: ["INR", "USD", "EUR"],
        default: "INR"
    },
    frequency:{
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category:{
        type: String,
        enum: ["sports", "entertainment", "education", "health", "technology"],
        required:  true
    },
    paymentMethod: {
        type: String, 
        required: true, 
        trim: true
    },
    status:{
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: "Start date cannot be in the future"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value >= this.startDate;
            },
            message: "Renewal date must be after the start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
}, {timestamps: true});

// Auto-Calcullate renewal date if missing

subscriptionSchema.pre("save", function(next){
    if(!this.renewalDate){
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

    // Auto-update the status if renewal date has passed
    if(this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;