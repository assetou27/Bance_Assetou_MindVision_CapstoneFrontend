// src/api/mockApi.ts
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockSessions = {
  coach: [
    { 
      _id: "1", 
      date: new Date().toISOString(), 
      duration: 60, 
      clientId: { name: "John Smith", _id: "c1" }, 
      status: "Scheduled" 
    },
    { 
      _id: "2", 
      date: new Date(Date.now() + 86400000).toISOString(), 
      duration: 45, 
      clientId: { name: "Emily Johnson", _id: "c2" }, 
      status: "Pending" 
    }
  ],
  client: [
    { 
      _id: "3", 
      date: new Date().toISOString(), 
      duration: 60, 
      coachId: { name: "Coach Sarah", _id: "co1" }, 
      status: "Scheduled" 
    },
    { 
      _id: "4", 
      date: new Date(Date.now() + 86400000 * 2).toISOString(), 
      duration: 30, 
      coachId: { name: "Coach Michael", _id: "co2" }, 
      status: "Confirmed" 
    }
  ]
};

// Mock API functions
const mockApi = {
  // Authentication functions
  async login(email: string, password: string) {
    await delay(500); // Simulate network delay
    
    // For demo purposes, accept any login
    return {
      userId: "67e1db80097acc8403033b92",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockToken",
      role: email.includes("coach") ? "coach" : "client",
      name: email.includes("coach") ? "Coach User" : "Client User"
    };
  },
  
  // Session functions
  async getCoachSessions(coachId: string) {
    await delay(500);
    return mockSessions.coach;
  },
  
  async getClientSessions(clientId: string) {
    await delay(500);
    return mockSessions.client;
  },
  
  // Other API functions as needed...
};

export default mockApi;