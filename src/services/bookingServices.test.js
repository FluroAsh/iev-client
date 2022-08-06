// const ievAPI = require("../config/api");
// const { getUserBookings, getUserBookingRequests, createUserBookingRequest, rejectUserRequest, approveUserRequest, confirmBooking, cancelBooking} = require("./bookingServices");

// jest.mock("../config/api", () => ({
//   get: jest.fn(),
//   post: jest.fn(),
//   put: jest.fn(),
//   delete: jest.fn(),
//   patch: jest.fn(),
// }));

// describe("getUserBookings function", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   it("call a axios get API request", async () => {

//     // Mock axios get request
//     const apiSpy = jest.spyOn(ievAPI, "get");

//     await getUserBookings();
//     expect(apiSpy).toHaveBeenCalledTimes(1);
//   });

  
// });

// describe("getUserBookingRequests function", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   it("call a axios post API request", async () => {

//     // Mock axios get request
//     const apiSpy = jest.spyOn(ievAPI, "get");

//     await getUserBookingRequests();
//     expect(apiSpy).toHaveBeenCalledTimes(1);
//   });

  
// });

// describe("createUserBookingRequest function", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   it("call a axios put API request", async () => {

//     // Mock axios get request
//     const apiSpy = jest.spyOn(ievAPI, "post");

//     await createUserBookingRequest();
//     expect(apiSpy).toHaveBeenCalledTimes(1);
//   });

  
// });

// describe("rejectUserRequest function", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   it("call a axios delete API request", async () => {

//     // Mock axios get request
//     const apiSpy = jest.spyOn(ievAPI, "put");

//     await rejectUserRequest();
//     expect(apiSpy).toHaveBeenCalledTimes(1);
//   });

  
// });

// describe("updateChargerStatus function", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   it("call a axios patch API request", async () => {

//     // Mock axios get request
//     const apiSpy = jest.spyOn(ievAPI, "patch");

//     await updateChargerStatus();
//     expect(apiSpy).toHaveBeenCalledTimes(1);
//   });

  
// });

 
// describe("approveUserRequest function", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   it("call a axios get API request", async () => {

//     // Mock axios get request
//     const apiSpy = jest.spyOn(ievAPI, "put");

//     await approveUserRequest();
//     expect(apiSpy).toHaveBeenCalledTimes(1);
//   });

  
// });

// describe("cancelBooking function", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   it("call a axios get API request", async () => {

//     // Mock axios get request
//     const apiSpy = jest.spyOn(ievAPI, "put");

//     await cancelBooking();
//     expect(apiSpy).toHaveBeenCalledTimes(1);
//   });

  
// });

// describe("confirmBooking function", () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//     });
//     it("call a axios get API request", async () => {
  
//       // Mock axios get request
//       const apiSpy = jest.spyOn(ievAPI, "put");
  
//       await confirmBooking();
//       expect(apiSpy).toHaveBeenCalledTimes(1);
//     });
  
    
//   });

