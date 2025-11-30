let mockData = [
    // Case 1: Active + Paid → No notification
    {
        id: 1,
        name: "Ravi Kumar",
        membershipEndDate: "2025-12-15",  // Active (future)
        paymentDueDate: null
    },

    // Case 2: Active + Pending → Payment alert if due date passed
    {
        id: 2,
        name: "Amit Sharma",
        membershipEndDate: "2025-12-10",  // Active (future)
        paymentDueDate: "2025-11-20"      // Payment overdue
    },

    {
        id: 3,
        name: "Suresh Singh",
        membershipEndDate: "2025-12-05",  // Active (future)
        paymentDueDate: "2025-11-25"      // Payment overdue
    },

    // Case 3: Recently Expired + Paid → Membership expired alert (within 10 days)
    {
        id: 4,
        name: "Manoj Verma",
        membershipEndDate: "2025-11-25",  // Recently expired (4 days ago)
        paymentDueDate: null
    },

    // Case 4: Recently Expired + Pending → Both alerts (within 10 days)
    {
        id: 5,
        name: "Rahul Mehta",
        membershipEndDate: "2025-11-22",  // Recently expired (7 days ago)
        paymentDueDate: "2025-11-10"      // Payment overdue
    },

    // Case 5: Long Expired → Will be null from backend, but keeping for testing
    {
        id: 6,
        name: "Karan Patel",
        membershipEndDate: null,           // Long expired (>10 days)
        paymentDueDate: "2025-11-15"       // Payment overdue
    }
];

export default mockData;