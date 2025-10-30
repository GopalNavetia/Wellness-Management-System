let mockData = [
    // Case 1: Active + Paid → No notification
    {
        id: 1,
        name: "Ravi Kumar",
        membershipEndDate: "2025-11-30",  // Active
        paymentDueDate: null
    },

    // Case 2: Active + Pending → Payment alert if due date passed
    {
        id: 2,
        name: "Amit Sharma",
        membershipEndDate: "2025-11-15",  // Active
        paymentDueDate: "2025-10-18"      // Payment overdue
    },

    {
        id: 3,
        name: "Suresh Singh",
        membershipEndDate: "2025-12-01",  // Active
        paymentDueDate: "2025-11-25"      // Payment not yet due
    },

    // Case 3: Expired + Paid → Membership expired alert
    {
        id: 4,
        name: "Manoj Verma",
        membershipEndDate: "2025-10-10",  // Expired
        paymentDueDate: null
    },

    // Case 4: Expired + Pending → Both alerts
    {
        id: 5,
        name: "Rahul Mehta",
        membershipEndDate: "2025-10-05",  // Expired
        paymentDueDate: "2025-10-01"      // Payment overdue
    },

    {
        id: 6,
        name: "Karan Patel",
        membershipEndDate: "2025-09-30",  // Expired
        paymentDueDate: "2025-09-28"      // Payment overdue
    }
];

export default mockData;