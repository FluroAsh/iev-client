// describe("Main component", () => {
//     afterEach(() => {
//       global.fetch.mockRestore();
//     });
  
//     it("renders movies cards", async () => {
//       jest
//         // mock the fetch results to be successful both times
//         .spyOn(global, "fetch")
//         .mockResolvedValueOnce({
//           ok: true,
//           status: 200,
//           json: jest.fn().mockResolvedValue(cinemaWorldData),
//         })
//         .mockResolvedValueOnce({
//           ok: true,
//           status: 200,
//           json: jest.fn().mockResolvedValue(filmWorldData),
//         });
  
//       // Use the asynchronous version of act to apply resolved promises
//       const result = await act(async () => render(<Main />));
//       const titles = result.container.querySelectorAll(".title");
  
//       expect(titles[0].textContent).toBe("Rogue One: A Star Wars Story");
//       expect(titles[1].textContent).toBe("Solo: A Star Wars Story");
//     });
  
//     it("returns error message when one of the fetch request failed", async () => {
//       jest
//         // mock results to come back as 1 success and 1 fail
//         .spyOn(global, "fetch")
//         .mockResolvedValueOnce({
//           ok: true,
//           status: 200,
//           json: jest.fn().mockResolvedValue(cinemaWorldData),
//         })
//         .mockResolvedValue({
//           status: 404,
//         });
  
//       const result = await act(async () => render(<Main initialCounter={5} />));
  
//       expect(result.container.querySelector(".title").textContent).toBe(
//         "Rogue One: A Star Wars Story"
//       );
//       expect(result.container.querySelector(".errorMessage").textContent).toBe(
//         "Unable to fetch data from Film World, please try again later!"
//       );
//     });
  
//     it("returns error message when both of the fetch request failed", async () => {
//       // mock result to be failed both fetch
//       jest.spyOn(global, "fetch").mockResolvedValue({
//         status: 404,
//       });
  
//       const result = await act(async () => render(<Main initialCounter={5} />));
  
//       screen.debug();
  
//       expect(result.container.querySelector(".errorMessage").textContent).toBe(
//         "Unable to fetch data from Cinema World, Film World, please try again later!"
//       );
//     });
//   });







// describe("showPrice", () => {
//     // reset the global state of all data after each test
//     afterEach(() => {
//       global.fetch.mockRestore();
//     });
  
//     test("return correct prices and correct style class when fetch successful", async () => {
//       jest
//         .spyOn(global, "fetch")
//         .mockResolvedValueOnce({
//           ok: true,
//           status: 200,
//           json: jest.fn().mockResolvedValue(cinemaWorldData),
//         })
//         .mockResolvedValueOnce({
//           ok: true,
//           status: 200,
//           json: jest.fn().mockResolvedValue(filmWorldData),
//         });
  
//       const result = await act(async () => render(<Main initialCounter={5} />));
  
//       const pricesElement = result.container.querySelector(".prices");
//       const prices = pricesElement.querySelectorAll(".price");
  
//       expect(prices[0].textContent).toBe("$25.00");
//       expect(prices[1].textContent).toBe("$28.00");
//       expect(prices[0].className).toContain("cheaper");
//     });
  
//     test("return 1 price & Server Error when unsuccessfully fetched from one of the provider", async () => {
//       jest
//         .spyOn(global, "fetch")
//         .mockResolvedValueOnce({
//           ok: true,
//           status: 200,
//           json: jest.fn().mockResolvedValue(cinemaWorldData),
//         })
//         .mockResolvedValue({
//           status: 404,
//         });
  
//       const result = await act(async () => render(<Main initialCounter={5} />));
  
//       const pricesElement = result.container.querySelector(".prices");
//       const prices = pricesElement.querySelectorAll(".price");
  
//       expect(prices[0].textContent).toBe("$25.00");
//       expect(result.container.querySelector(".loadError").textContent).toBe(
//         "Load Error"
//       );
  
//       // More error messages tests are included in the Main.test.js doc.
//     });
//   });